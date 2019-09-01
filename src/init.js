const install = require("./install.js");

module.exports = async function() {
  const generators = this.getInstalledGenerators(this.dir.tpl);

  if (!Object.keys(generators).length) {
    this.console(`您还没有安装任何 generator，请先执行 install 命令安装`);
    return;
  }
};
