# script-inline-escape-webpack-plugin

## Summary

该插件用于修正 html 文件内联的 `script` 标签，标签内部字符串 '</script>' 未转义的场景，修正逻辑 `</script> -> <\/script>`

例如：使用 script-ext-html-webpack-plugin 插件后，配置 option:{ inline:[]}，部分场景下生成错误内容，使用此插件可对未转义的字符串进行修正

## Installation

Install the plugin with npm:

```shell
$ npm install script-inline-escape-webpack-plugin
```
