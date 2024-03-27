const fs = require("fs");
const path = require("path"); 

const willIntegrateCompilerOptions = (projectDir) => {
	const pkgPath = path.resolve(projectDir, "package.json")
	if(fs.existsSync(pkgPath)) {
		const pkg = JSON.parse(fs.readFileSync(pkgPath, {encoding: "utf8"}))
		const pluginConfig = pkg.hxPluginConfig
		if(pluginConfig && pluginConfig["hx-compile-typescript"]?.integrateCompilerOptions) {
			console.log("检测到tsconfig.json集成配置，参数集成已启用")
			return true
		}
	}
}

const integrateCompilerOptions = (projectDir, cmd) => {
	const fsPath = path.resolve(projectDir, "tsconfig.json")
	if(!fs.existsSync(fsPath)) console.warn("配置了运行时compilerOptions集成，但是tsconfig.json文件不存在，集成操作自动略过")
	else {
		const {compilerOptions} = JSON.parse(fs.readFileSync(fsPath, {encoding: "utf8"}))
		const argList = Object.entries(compilerOptions).map(([k, v]) => {
			if(typeof v === "boolean") return v ? `--${k}` : ""
			else return `--${k} ${v}`
		})
		const args = argList.join(" ")
		console.log(`已集成参数：`, args)
		cmd += " " + args
	}
	return cmd
}

/**
 * @param {{typescript: "2.9.2" | "3.9.4" | "4.9.5" | "latest", file: string, projectDir: string}} options
 */
module.exports = (options) => {
	const {typescript, file, projectDir} = options
	const basename = `ts-${typescript}`
	let subPath = ""
	switch(typescript) {
		default:
			subPath = "bin/tsc"
	}
	// 应该能提取wsFolder，执行时使用cwd，这样就能够使用根目录的config了
	// ts不能同时混着使用指定ts文件和tsconfig
	// 但是可以通过额外的配置文件对tsconfig进行转换，在cli里处理成参数
	const tsPath = path.join(path.dirname(__dirname), "node_modules", basename, subPath)
	// console.log(tsPath)
	
	const {exec} = require("child_process")
	let cmd = `node "${tsPath}" "${path.relative(projectDir, file)}"`
	if(willIntegrateCompilerOptions(projectDir)) {
		cmd = integrateCompilerOptions(projectDir, cmd)
	} 
	
	console.log("[RUN CMD] ", cmd)
	exec(cmd, {cwd: projectDir}, (err, stdout, stderr) => {
		if(err) console.error("[EXEC ERR] ", err)
		if(stderr) console.error("[EXEC STDERR] ", err)
		else {
			console.log("[EXEC STDOUT] ", stdout ? stdout : "[stdout empty]")
		}
	})
}
