const install = require("./install.js");

module.exports = async function() {
  const generators = this.getInstalledGenerators(this.dir.tpl);

  if (!Object.keys(generators).length) {
    this.console(`您还没有安装任何 generator，请先执行 install 命令安装`);
    return;
  }

  const { tpl: pkgName } = await this.inquirer.prompt({
    message: "请选择一个模版",
    type: "list",
    name: "tpl",
    choices: Object.keys(generators)
  });

  const status = this.getInstalledStatus(pkgName, this.dir.tpl);

  if (status !== 2) {
    const { shouldUpdate } = await this.inquirer.prompt({
      message: "有最新模版是否更新",
      type: "list",
      name: "needUpdate",
      choices: ["是", "否"]
    });

    if (shouldUpdate === "是") {
      await install.call(this, package);
    }
  }

  this.yeomanEnv.register(this.resolveFrom(this.dir.tpl, pkgName), pkgName);
  this.yeomanEnv.run(pkgName, (e, d) => {
    d && this.console("happy coding", "white");
  });
};
