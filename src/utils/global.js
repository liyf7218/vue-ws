import Vue from 'vue'
import router from '@/router/index'
import axios from './axiosrc.js'
import moment from 'moment'
import echarts from 'echarts'
import { url } from './serverrc.js'

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default {
  install(Vue, options) {
    /*
     * 此处用于配置Vue.config, 即Vue的全局配置
     * 详见 https://cn.vuejs.org/v2/api/#全局配置
     * 主要是配置一下按键
     * 默认键名有
     *    .enter
     *    .tab
     *    .delete (捕获“删除”和“退格”键)
     *    .esc
     *    .space
     *    .up
     *    .down
     *    .left
     *    .right
     * 注意!!!
     *  camelCase 不可用
     *  mediaPlayPause: 179, // 此设置无效
     *  取而代之的是 kebab-case 且用双引号括起来
     *  "media-play-pause": 179, //采用此设置
     */
    Vue.config.keyCodes = {
      a: 65,
      b: 66,
      c: 67,
      d: 68,
      e: 69,
      f: 70,
      g: 71,
      h: 72,
      i: 73,
      j: 74,
      k: 75,
      l: 76,
      m: 77,
      n: 78,
      o: 79,
      p: 80,
      q: 81,
      r: 82,
      s: 83,
      t: 84,
      u: 85,
      v: 86,
      w: 87,
      x: 88,
      y: 89,
      z: 90,
      num_0: 48,
      num_1: 49,
      num_2: 50,
      num_3: 51,
      num_4: 52,
      num_5: 53,
      num_6: 54,
      num_7: 55,
      num_8: 56,
      num_9: 57,
    }

    /*
     * 将所需的常用工具绑定到Vue实例上,以便于进行随时引用
     *  所有原始包的直接引入,绑定前缀为下划线 _
     * 自定义的方法属性,绑定前缀为$
     */
    Vue.prototype.$http = axios; //axios 全局方法
    Vue.prototype.$axios = axios; //axios 全局方法
    Vue.prototype.$moment = moment; //moment 全局方法
    Vue.prototype.$echarts = echarts; //echarts 全局方法
    Vue.prototype.$url = url; //url全局配置


    /**
     * 路由跳转函数
     * path 路径
     * query {}
     * id
     */
    Vue.prototype.routerLink = function(path, query) {
      router.push({
        path,
        query
      })
    }


    /**
     * 全局通知函数
     */
    Vue.prototype.$successMessage = function(value) {
      this.$message({
        showClose: true,
        message: value,
        type: 'success',
        duration: 2000
      });
    }
    Vue.prototype.$errorMessage = function(value) {
      this.$message({
        showClose: true,
        message: value,
        type: 'error',
        duration: 2000
      });
    }

    //验证字段
    Vue.prototype.checkType = function(str, type) {
      switch (type) {
        case 'email':
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
          return /^1[3-9][0-9]{9}$/.test(str);
        case 'tel':
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
          return /^[0-9]+.?[0-9]*$/.test(str);
        case 'english':
          return /^[a-zA-Z]+$/.test(str);
        case 'text':
          return /^\w+$/.test(str);
        case 'chinese':
          return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
          return /^[a-z]+$/.test(str);
        case 'upper':
          return /^[A-Z]+$/.test(str);
        default:
          return true;
      }
    }


    /**
     * 浏览器中的存储设置,包括 local storage, session storage, cookies, etc
     */
    // localStorage 操作
    //获取 localStorage
    Vue.prototype.$getLocalStorage = function(name) {
      if (!name) return;
      return window.localStorage.getItem(name);
    }
    // 获取解析后的 localStorage
    Vue.prototype.$getParsedLocalStorage = function(name) {
      if (!name) return;
      return window.localStorage.getItem(name);
    }
    // 存储(保存与更新) localStorage
    Vue.prototype.$setLocalStorage = function(name, content) {
      if (!name) return;
      // 当 content 数据不为字符串时,直接存储会造成数据的损坏
      // 如 [1,2,3] => "1,2,3", {aa: 'aa', ss: 'ss'} => "[object Object]", etc
      // 所以在进行存储时,务必要进行 JSON转换
      // 字符串被 JSON转换 后为 "ces" => '"ces"'
      if (typeof content !== 'string') {
        content = JSON.stringify(content);
      }
      return window.localStorage.setItem(name, content);
    }
    // 删除 localStorage
    Vue.prototype.$removeLocalStorage = function(name) {
      if (!name) return;
      window.localStorage.removeItem(name);
    }


    //重新访问当前地址
    Vue.prototype.$reset = function() {
      window.location.reload();
    }

    /**
     *@desc 根据年月,返回此月的首末日期
     *@param {string} yearMonth 年月,格式为 YYYY-MM,eg: 2019-01
     *
     *@return {object} eg: {startDate: '2019-01-01', endDate: '2019-01-31'}
     */
    Vue.prototype.$getMonthRange = function(yearMonth = moment().format('YYYY-MM')) {
      if (typeof yearMonth != "string") {
        console.error("getMonthRange Error, check param type.");
        return;
      }
      let [year, month] = moment(yearMonth).format("YYYY-MM").split('-');
      return {
        year,
        month,
        startDate: moment(new Date(year, month - 1, 1)).format("YYYY-MM-DD"),
        endDate: moment(new Date(year, month, 0)).format("YYYY-MM-DD"),
      }
    }

    // 根据数字小写金额获取中文汉字金额的方法
    Vue.prototype.$convertCurrency = function convertCurrency(money) {
      //汉字的数字
      var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
      //基本单位
      var cnIntRadice = new Array('', '拾', '佰', '仟');
      //对应整数部分扩展单位
      var cnIntUnits = new Array('', '万', '亿', '兆');
      //对应小数部分单位
      var cnDecUnits = new Array('角', '分', '毫', '厘');
      //整数金额时后面跟的字符
      var cnInteger = '整';
      //整型完以后的单位
      var cnIntLast = '元';
      //最大处理的数字
      var maxNum = 999999999999999.9999;
      //金额整数部分
      var integerNum;
      //金额小数部分
      var decimalNum;
      //输出的中文金额字符串
      var chineseStr = '';
      //分离金额后用的数组，预定义
      var parts;
      if (money == '') {
        return '';
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        //超出最大处理数字
        return '';
      }
      if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
      }
      //转换为字符串
      money = money.toString();
      if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
      } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == '0') {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
          }
        }
        chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
          var n = decimalNum.substr(i, 1);
          if (n != '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == '') {
        chineseStr += cnInteger;
      }
      return chineseStr;
    }

    // 获取当前页面的缩放值(如页面缩放为 150%, 则返回 150)
    Vue.prototype.$detectZoom = function detectZoom() {
      var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
      }

      if (ratio) {
        ratio = Math.round(ratio * 100);
      }
      return ratio;
    }

    // 转换命名格式, 驼峰转横线链接
    Vue.prototype.$convertCamelCaseToSnakeCase = function $convertCamelCaseToSnakeCase(camelCaseString = '', linkSymbol = '-') {
      return camelCaseString.replace(/(^-|-$)/g, '').replace(/(^_|_$)/g, '').replace(/[A-Z]/g, letter => `${linkSymbol}${letter.toLowerCase()}`)
    }

    // 生成随机字符串
    Vue.prototype.$getRandomString = function $getRandomString(n) {
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    }

    // 生成随机数组
    Vue.prototype.$getRandomNumberArrays = function $getRandomNumberArrays(options) {
        let { length = 10 } = options;
      return Array(length).fill(0).map(ele => Math.floor(Math.random()*1000))
    }

  }
}
