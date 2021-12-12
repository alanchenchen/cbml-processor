const arr = [1, 2, 3, 4]

// 这行代码不会被转译，因为没有插件处理
/*<willStay />*/
// 这行代码将不会被转译，因为XBridge的lib被filter了
/*<visible lib='XBridge' pin='初始化VConsole'>
const vConsole = new VConsole()
</visible>*/
// 这行代码将被解开注释，并打上注释(pin的内容)，因为被插件处理了
// 初始化VConsole
const vConsole = new VConsole()
// 这行代码将被解开注释，并打上注释(pin的内容)，因为被插件处理了
// 初始化vue相关
const router = new Router()
const store = new Vuex.store()