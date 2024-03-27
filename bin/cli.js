#!/usr/bin/env node

const {Command} = require("commander")
const program = new Command()

// 注册版本及描述信息
program
    .name("hx-compile-typescript")
    .description("hx typescript编译")
    .version(`${require("../package.json").version}`)

// 注册支持的命令及执行函数
program 
    .option("-t, --typescript [tsVersion]", "use specific typescript version")
    .option("-f, --file [filePath]", "file path")
    .option("-p, --project-dir [projectDir]", "project dir")
    .action((options) => {
        require("./core")(options)
    })

// 执行参数处理
program.parse()
