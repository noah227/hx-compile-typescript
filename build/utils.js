module.exports = {
    getVersionList() {
        const pkg = require("../package.json")
        // 本插件没装其他的东西，这个简单的过滤足够了
        return Object.keys(pkg.dependencies).filter(k => k.startsWith("ts-")).sort().reverse().map(k => ({
            version: k.split("-")[1]
        }))
    }
}
