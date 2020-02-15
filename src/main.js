// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 导入 Element-UI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入自定义组件
import QXComponents from './components'
// 导入全局方法
import global from "@/utils/global";
// 添加全局样式
import '~/css/index.scss';

Vue.use(ElementUI);
Vue.use(QXComponents)
Vue.use(global);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
