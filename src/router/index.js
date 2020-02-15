import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

// 这里用来解决
// 错误提示: NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
// 这个是在 "使用ElementUi时点击同一个路由，页面报错" 的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes
})
