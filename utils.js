const fs = require("fs");
const path = require("path");
// 同步执行shell
const { execSync } = require("child_process");

module.exports = class Utils {
  /**
   * 检验安装包是否为最新版本
   * 0.不存在 1.最新版本 2.不是最新
   *  */
  getInstalledStatus(pkgName, targetDir) {
    const pkgs = this.getInstallPkgs(targetDir);
    if (!pkgs[pkgName]) return 0;
    const latestestVersion =
      fs.existsSync(
        `npm view ${pkgName} version --json --registry=https://registry.npm.taobao.org`
      ) + "";
    console.log("latestestVersion:", `${pkgName} ${latestestVersion}`);
    const currentVersion = this.requireFrom(
      targetDir,
      path.join(pkgName, "package.json")
    ).version;
    if (latestestVersion !== currentVersion) return 2;
    return 1;
  }

  // 获取安装的依赖
  getInstalledGenerators(dirName) {
    const dependencies = this.getInstallPkgs(dirName, "package.json");
    Object.keys(dependencies).forEach(generator => {
      // 过滤不合规的模板
      if (!/^gen-/i.test(generator)) delete dependencies[generator];
    });

    return dependencies;
  }

  // 读取项目依赖
  getInstallPkgs(targetDir) {
    const jsonFile = path.resolve(targetDir, "package.json");
    if (!fs.existsSync(jsonFile)) return {};
    // require 加载配置
    const pkgJson = require(jsonFile);
    return pkgJson.dependencies || {};
  }

  getConfig() {
    const configs = this.requireFrom(process.cwd(), "generators");
    if (!configs || !configs.builder) {
      this.console(
        "请确保工程根路径下有 generators.js 文件，且文件中配置了 builder 属性",
        "red"
      );
      process.exit(1);
    }
    return configs;
  }

  getBuildInstruction() {
    const { builder } = this.getConfig();
    const status = this.getInstalledStatus(builder, process.cwd());

    switch (status) {
      case 0:
        this.console(
          `检测到工程并未添加${builder}，将自动为您安装最新版`,
          "red"
        );
        this.console(`安装${builder}中...`);
        execSync(
          `npm i ${builder}@latest -S --registry=https://registry.npm.taobao.org`,
          { cwd: process.cwd() }
        );
        break;
      case 1:
        this.console(
          `检测到您的${builder}并非最新版，推荐在工程下 npm i ${builder}@latest -S 进行更新`
        );
        break;
      default:
    }

    return this.requireFrom(process.cwd(), builder);
  }
};
