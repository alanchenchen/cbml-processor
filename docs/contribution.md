# 开发指南

### 介绍

感谢你使用 cbml-processor。

以下是关于向cbml-processor 提交反馈或代码的指南。在向 cbml-processor 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下文字。

## 参与开发

### 本地开发

按照下面的步骤操作，即可在本地开发 cbml-processor。

```bash
# 克隆仓库
# 默认为 main 分支，你需要切换到develop分支，包含 cbml-processor 的代码
git clone -b develop https://github.com/alanchenchen/cbml-processor.git

# 安装依赖,建议使用yarn
cd cbml-processor && yarn

# 运行example的demo代码
yarn run demo
```

### npm命令
- demo，运行exmaple的示例代码
- build，转译ts到js文件
- test，运行test/目录的单元测试
- updateTestSnapshot，更新test/目录的快照文件

### 添加新插件
参与开发cbml-processor的插件，是对仓库贡献的主要方式，cbml-processor的build方法支持plugin机制，plugin会异步等待执行。
> 建议大家选择自己的仓库来维护plugin，并且统一命名为`cbml-plugin-`开头的包，这样在使用cbml-processor的插件时会更加语义化

- 新建一个文件，导出一个async函数
```js
import { CBMLNode } from '@alanchenchen/cbml-processor/types/index.type'
export default async (CBMLRootNode: CBMLNode) => {
  // ...
  // 可以选择是否返回CBMLRootNode，如果存在，则会修改AST tree，否则只执行逻辑
  return CBMLRootNode
}
```
- 修改package.json的name字段为`cbml-plugin-visible-code`
- npm publish到npm服务
- 在当前仓库的首页README.md插件清单里添加插件描述

[插件的详细内容](../src/plugins)

## 提交 PR

### Pull Request 规范

- 如果遇到问题，建议保持你的 PR 足够小。保证一个 PR 只解决一个问题或只添加一个功能
- 当新增组件或者修改原有组件时，记得增加或者修改测试代码，保证代码的稳定
- 在 PR 中请添加合适的描述，并关联相关的 Issue

### Pull Request 流程

1. 同步主仓库的最新代码
2. 基于主仓库的 **develop** 分支新建一个分支，比如`feature-plugin-terser`，修复问题命名为`bugfix-plugin_terser`
3. 在新分支上进行开发，开发完成后，提 Pull Request 到主仓库的 **develop** 分支，Assignee写`alanchenchen`
4. Pull Request 会在 Review 通过后被合并到主仓库

### 同步最新代码

提 Pull Request 前，请依照下面的流程同步主仓库的最新代码：

```bash
# 添加主仓库到 remote，作为 fork 后仓库的上游仓库
git remote add upstream https://github.com/alanchenchen/cbml-processor.git

# 拉取主仓库最新代码
git fetch upstream

# 切换至 dev 分支
git checkout develop

# 合并主仓库代码
git merge upstream/develop
```
