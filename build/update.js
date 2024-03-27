/** 更新ts文件依赖 */

const {getVersionList} = require("./utils");

const versionList = getVersionList()
const cmdList = versionList.map(({version}) => `ts-${version}@npm:typescript@${version}`)

const {execSync} = require("child_process")
execSync(`npm i ${cmdList.join(" ")}`)
