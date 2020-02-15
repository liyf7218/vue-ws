import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import {url} from './serverrc.js'
import {Message} from 'element-ui'

function showErrorMessage(value) {
  return Message({showClose: true, message: value, type: 'error', duration: 3000});
}

/* 配置默认后台地址,查看 ./serverrc.js */
axios.defaults.baseURL = url;
/* 请求时常(单位: ms) */
axios.defaults.timeout = 10 * 1000;

/* 请求拦截器,在此处统一配置公共参数 */
axios.interceptors.request.use(config => {
  let appId = process.env.appId;
  let params = {
    appId: appId,
  };
  // 将原有参数添加进参数列表
  for (let key in config.data) {
    params[key] = config.data[key];
  }
  //序列化
  config.data = qs.stringify(params);
  return config;
}, error => {
  // 错误提示
  Promise.reject(error);
})

/**响应拦截器 */
axios.interceptors.response.use(response => {
  let res = response.data;
  console.log(response);
  if(response.status != 200){
    showErrorMessage('服务器响应失败');
  }
  return response.data;
}, error => {
  showErrorMessage('服务器响应失败');
  return Promise.reject(error)
});

export default axios;
