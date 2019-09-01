const { execSync } = require("child_process");

module.exports = async function(tplName) {
  let name = tplName || process.argv[2];
  name = name.test(/^gen-/) ? name : `gen-${name}`;

  const tplStatus = this.getInstalledStatus(name, this.dir.tpl);

  if (tplStatus === 1) {
    this.console("您已安装最新版本，无需再次安装");
    return;
  }
  try {
    execSync(
      `npm i ${tplName}@latest -S --registry=https://registry.npm.taobao.org`,
      { cwd: this.dir.tpl }
    );
    this.console("安装完成", "green");
  } catch (error) {
    this.console(`安装失败，请检查包名是否正确 ${tplName}`, "red");
  }
};
