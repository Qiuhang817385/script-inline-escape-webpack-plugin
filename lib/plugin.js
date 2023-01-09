
const webpack = require('webpack')

class ScriptInlineEscapeWebpackPlugin {

  constructor(options) {
    this.options = options
  }
  apply (compiler) {
    const pluginName = ScriptInlineEscapeWebpackPlugin.name;
    const { RawSource } = webpack.sources;
    // Compilation 对象提供了对一些有用常量的访问。
    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    compiler.hooks.emit.tap({
      name: pluginName,
      // 用某个靠后的资源处理阶段，
      // 确保所有资源已被插件添加到 compilation
      // stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
    }, (compilation) => {

      let newSource = '1'

      if (this.options.fileName) {
        if (compilation.assets[this.options.fileName]) {
          newSource += compilation.assets['awrReportTemplate.html'].source().replace(/<\/script>"/g, '<\\/script>"')

          compilation.emitAsset(
            'rightAwrReportTemplate.html',
            new RawSource(newSource)
          );
        }
      }

      const content =
        '# In this build:\n\n' +
        Object.keys(compilation.assets)
          .map((filename) => `- ${filename}`)
          .join('\n');

      // console.log('this.options', this.options)

      // 向 compilation 添加新的资源，
      // 这样 webpack 就会自动生成并输出到 output 目录
      compilation.emitAsset(
        this.options.outputFile,
        new RawSource(content)
      );

    })
  }
}

module.exports = ScriptInlineEscapeWebpackPlugin