const hx = require("hbuilderx")
const {exec} = require("child_process")


const getCwd = (activatedType, context) => {
	switch (activatedType) {
		case "contextFile":
			return context.workspaceFolder.uri.fsPath
		case "activeTextEditor":
			return context.document.workspaceFolder.uri.fsPath
	}
}

const getFilePath = (activatedType, context) => {
	switch (activatedType) {
		case "contextFile":
			return context.fsPath
		case "activeTextEditor":
			return context.document.uri.fsPath
	}
}

module.exports = {
	runTs(activatedType, context){
		const cwd = getCwd(activatedType, context)
		const fp = getFilePath(activatedType, context)
		// todo tsx直接使用插件本身安装的 **/tsx
		// todo 运行命令的输出能直接输出到HBuilderX的终端吗
		const cmd = `node E:\\Documents\\HBuilderProjects\\hx-run-typescript\\node_modules\\tsx\\dist\\cli.mjs ${fp}`
		exec(cmd, {cwd}, (err, stdout, stderr) => {
			if(err) console.error(err)
			console.log("STDOUT", stdout)
		})
	}
}