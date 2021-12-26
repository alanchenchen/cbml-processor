# 更新日志
## [1.0.2] - 2021-12-26
### 修复
* tslib改为dependencies
## [1.0.0] - 2021-12-12
### 新增
* build方法执行配置文件，走通plugin流程
* 提供`parser`解析code到CBML元素
* 提供`generater`从CBML元素生成code
* 提供`plugin-visible-code`插件，编写`/*<visible><visible/>*/`元素来动态展示内部包裹的代码块
* 提供`plugin-clean-comment`，清除指定的CBML元素，多个配置项
* contribution文档
* 使用场景文档
### 优化
* build方法返回最终转译的code，output选项变成可选
* `plugin-visible-code`插件，新增`/*<visible>*/xxx/*<visible/>*/`块元素来动态展示内部包裹的代码块，现在支持块元素和注释元素