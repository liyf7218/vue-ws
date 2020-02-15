/*
*	vuex是不必要使用的
* 在本项目中,只使用vuex管理全局状态
*/
import Vue from 'vue'
import Vuex from 'vuex'
import init from './init'
import routes from './routes'
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    init,
    routes,
  }
})

export default store