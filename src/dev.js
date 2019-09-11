/**
 * 本地开发环境
 */

module.exports = function() {
  const buildFn = this.getBuilderFn();
  const { webpackCustom = {} } = this.getConfigs();
  this.console("正在构建...");
  buildFn({ env: "development" }, webpackCustom);
};
