/**
 * 生产打包
 */

module.exports = async function() {
  const buildFn = this.getBuilderFn();
  const { webpackCustom = {} } = this.getConfigs();
  this.console("开始打包...");
  buildFn({ env: "production" }, webpackCustom);
};
