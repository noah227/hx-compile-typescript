/** 生成配置内容 */

const pkg = require("../package.json")

const {getVersionList} = require("./utils")

const privateConfig = {
	// "latest": {
	// 	name: "编译typescript",
	// 	showInParentMenu: true
	// }
}

// 更多关于变量的说明：右键任意文件 > 外部命令 > 自定义外部命令，会打开具有相关提示和示例的文件
const build = () => {
	const versionList = getVersionList()
	const items = versionList.map(({
		version
	}) => ({
		"id": `ts-compile-${version}`,
		"name": `typescript@${version}`,
		"command": [
			"node",
			"${programPath}",
			"-t",
			"2.9.2",
			"-f",
			"${file}",
			"-p",
			"${projectDir}"
		],
		"extensions": "ts",
		"key": "",
		"showInParentMenu": false,
		"onDidSaveExecution": false,
		...privateConfig[version]
	}))
	pkg.external.commands = items
	const fs = require("fs")
	fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 4), {encoding: "utf-8"})
	console.log("构建完成")
}

build()