
const webpack = require('webpack')

class ScriptInlineEscapeWebpackPlugin {

  constructor(options) {
    this.options = Object.assign({
      fileName: '',
    }, options)
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
      let newSource = ''
      if (this.options.fileName) {

        // console.log('compilation.assets', compilation.assets)

        if (compilation.assets[this.options.fileName]) {
          newSource += compilation.assets[this.options.fileName].source().replace(/<\/script>"/g, '<\\/script>"')
          compilation.updateAsset(
            this.options.fileName,
            new RawSource(newSource)
          );
        }
      }
    })
  }
}

module.exports = ScriptInlineEscapeWebpackPlugin