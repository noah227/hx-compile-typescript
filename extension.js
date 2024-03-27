var hx = require("hbuilderx");

const regList = [
	["run_ts_contextFile", "contextFile"],
	["run_ts_activeTextEditor", "activeTextEditor"]
]

const main = require("./main.js")
//该方法将在插件激活的时候调用
function activate(context) {
	// regList.forEach(([id, arg]) => {
	// 	context.subscriptions.push(hx.commands.registerCommand(`extension.${id}`, (ctx) => {
	// 		main.runTs(arg, ctx)
	// 	}))
	// })
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
