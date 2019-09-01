const path = require("path");
const fs = require("fs");
const mkdir = require("mkdirp");
const homeDir = require("osenv").home();
const minimist = require("minimist");
const { execSync } = require("child_process");
const Utils = require("./utils.js");
const cliPkg = require("./package.json");
const instructionsDirName = "src";
const args = minimist(process.argv);

class Instance extends Utils {
  constructor(args) {
    super();
    // 为实例绑定资源
    this.bindTools();
    // 创建package.json
    this.checkTplDir();
    const instruction = process.argv[2];
    this.instruction = instruction;
    // 检验指令是否存在
    this.checkInstruction(instruction);
    // 检验cli是否需要更新
    this.checkCliUpdate();
    // 校验通过，执行命令
    const instructionDetail = path.resolve(
      __dirname,
      instructionsDirName,
      instruction
    );
    instructionDetail.call(this);
  }

  bindTools() {
    this.chalk = require("chalk");
    this.resolveFrom = require("resolve-from").silent;
    this.requireFrom = require("import-from").silent;
    this.dir = {
      home: homeDir,
      tpl: path.resolve(homeDir, ".generators"),
      cwd: process.cwd()
    };
    this.yeomanEnv = require("yeoman-environment").createEnv();
    this.inquirer = require("inquirer");
  }

  checkTplDir() {
    mkdir(this.dir.tpl);
    const pkgFile = path.resolve(this.dir.tpl, "package.json");
    if (!fs.existSync(pkgFile)) {
      fs.writeFileSync(
        pkgFile,
        JSON.stringify({
          name: "_",
          description: "_",
          repository: "_",
          license: "MIT"
        })
      );
    }
  }

  checkInstruction(instruction) {
    const instructions = fs
      .readdirSync(path.resolve(__dirname, instructionsDirName))
      .map(fileName => fileName.split(".")[0]);
    if (!instructions.includes(instruction)) {
      throw new Error(
        `没有该指令${instruction},请使用以下指令${JSON.stringify(instructions)}`
      );
    }
  }

  checkCliUpdate() {
    const name = cliPkg.name;
    const version = cliPkg.version;
    const latestVersion =
      execSync(
        `npm view ${this.instruction} version --registry=https://registry.npm.taobao.org`
      ) + "";
    if (latestVersion.trim() !== version) {
      this.console(
        `cli 版本过旧，建议执行 npm i -g ${pkgName}@latest 升级 cli： ${version} -> ${ltsVersion} `
      );
    }
  }

  console(log, color = "grey") {
    console.log(chalk[color](log));
  }
}

module.exports = new Instance(args);
