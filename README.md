# cbml-processor
基于cbml parser和cbml规范实现的CBML构建工具

> Author：alanchenchen

## Quote
* [CBML定义](https://github.com/cbml/cbml)
* [CBML Parser](https://github.com/cbml/cbmljs)
* [CBML工具jdists](https://github.com/zswang/jdists)

## Using scenes
[使用场景](./docs/using-scene.md)

## Feature
* CBML规范不影响代码的编译器或解释器执行流程
* CBML可以高度定制processor来扩展任何tag
* 补全CBML缺少的generater
* cbml-processor可以和任何构建工具集成，例如webpack的loader和rollup的plugin
* 如果你在使用babel的AST转换发现难度，那么使用CBML的AST一定会更简单

## Install
本地安装cbml-processor
```bash
npm install -D @alanchenchen/cbml-processor
```
## Usage
### build
根据配置文件构建，会执行插件，转换源文件到目标文件

### parseCBMLEle
CBML的parser工具，转换code到CBML的AST tree
> 参数类型，见`parser.ts`

### generateCode
CBML的generate工具，转换CBML的AST tree到code
> 参数类型，见`generater.ts`

## Plugins
cbml-processor的build方法天然支持插件机制，具体开发见[详情](./src/plugins)

当前具备的插件清单：
- [plugin-visible-code](./src/plugins/plugin-visible-code.ts) *动态展示/隐藏visible注释块内部的代码块*
- [plugin-clean-comment](./src/plugins/plugin-clean-comment.ts) *清除CBML的注释块*

## Contribution
[贡献](./docs/contribution.md)

## CHANGELOG
[更新](./CHANGELOG.md)
## license
* MIT
