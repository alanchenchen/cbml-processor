## cbml-processor使用场景

### 实现ui库按需加载插件`babel-plugin-import`的替换
#### ui库的按需加载大多的两种思路
* 尽可能利用ES module的import静态分析，使用构建工具的tree shaking。但是无论rollup还是webpack都无法做到完全的tree shaking，这主要是因为代码存在副作用(side effect)。
* 所以为了实现ui库的按需加载，很多库开发者选择了第二种思路，将单个组件抽离到单个js/css内，回到了jQuery年代。但是为了让使用者通过`import`语法来导入，Antd开发了`babel-plugin-import`插件
#### `babel-plugin-import`插件原理
1. 当使用者编写以下代码，并且配置好`babel.config.js`
  ```js
  import { Table, Toast } from 'antd'
  ```
2. webpack/rollup通过babel转译后拿到的代码
  ```js
  const Table = require('antd/es/table/index.js').default
  require('antd/es/table/style/index.js') // 自动引入style的css文件

  const Toast = require('antd/es/toast/index.js').default
  require('antd/es/toast/style/index.js') // 自动引入style的css文件
  ```
可以看到插件是改写了js AST节点，并交给babel来生成代码
#### 使用`cbml-processor`的插件替换
1. 编写插件，自定义一个`es-import`注释标签，定义`import`的attribute，作为组件文件名，定义`from`的attribute，作为ui库包名
2. 编写代码如下
  ```js
  /*<es-import import='Table, Toast' from='antd' />*/
  ```
3. 通过`cbml-processor`转译后拿到的代码
  ```js
  const Table = require('antd/es/table/index.js').default
  require('antd/es/table/style/index.js') // 自动引入style的css文件

  const Toast = require('antd/es/toast/index.js').default
  require('antd/es/toast/style/index.js') // 自动引入style的css文件
  ```

> 补充说明：虽然cbml-processor可以实现此效果，但从源码的语义可读性来讲，还是建议使用babel。

### 动态增删修改注释块
1. 如果项目里需要某些代码在打包后不存在，使用babel来操作AST会非常麻烦，因为js的AST过于复杂
2. 使用webpack/rollup的全局替换，比如vue-cli3的环境参数，虽然可以做到不同环境打包后代码动态运行，但是生成的代码始终存在，会被浏览器解释
  ```js
  const shouldUseVConsole = process.env.shouldUseVConsole
  // 如果配置为false，虽然不会初始化vConsole，但是生成的代码会包含，并且if语句会被浏览器解释执行
  if (shouldUseVConsole) {
    const VConsole = require('vConsole')
    new VConsole()
  }
  ```
3. 编写`cbml-processor`插件，自定义一个`visible`注释标签，定义`lib`的attribute，作为包，定义`pin`的attribute，作为头部注释内容
2. 编写代码如下
  ```js
  /*<visible lib='VConsole' pin='初始化VConsole'>*/
  const vConsole = new VConsole()
  /*</visible>*/
  ```
3. 通过`cbml-processor`转译后拿到的代码，可以通过lib来过滤是否需要展示代码块
  ```js
  // 初始化VConsole
  const vConsole = new VConsole()
  ```