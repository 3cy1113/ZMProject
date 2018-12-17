import axios from 'axios';
import {Spin} from 'iview';
import qs from 'qs'
import util from './util'

axios.defaults.timeout = 1000 * 15;
axios.defaults.withCredentials = true
//添加一个请求拦截器
axios.interceptors.request.use(
  function (config) {
    //在请求发出之前进行一些操作
    if (config.headers['Show-Loading'] === false) {

    } else {
      util.showLoading();
    }
    console.log('请求接口:' + config.url)
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  });
//添加一个响应拦截器
axios.interceptors.response.use(
  function (res) {
    util.closeLoading();
    let result;
    console.log("请求成功:", res.data);
    if (res.data.code == 0) {
      if (typeof (res.data.data) === "undefined") {
        result = res.data;
      } else {
        result = res.data.data;
      }
      //下拉列表类型数据提取,如果data下只有一个对象且类型为数组,提取数组到data下返回
      // const values = Object.values(result);
      // if (values.length === 1 && (values[0] instanceof Array)) {
      //   result = values[0];
      // }
      return result;
    }
    //code 不为0是按错误处理
    let code, message;
    if (res.config.mock) {
      code = 10000;
      message = res.data.errMsg
    } else {
      code = res.data.code;
      message = res.data.message;
    }
    errorHandler(message);
    return Promise.reject({code, message});
  },
  function (error) {
    util.closeLoading();
    if (error.code) {
      // errorHandler(error.message);
      errorHandler();
      return Promise.reject(error);
    }
    if (error.response) {
      switch (error.response.status) {
        case 302:
          if (config.env == 'local:test' || config.env == 'local') {
            return;
          }
          util.alert({
            type: 'error',
            content: '登录失效, 请重新登录'
          });
          util.login();
          break;
        //未登录
        case 401:
          if (config.env == 'local:test' || config.env == 'local') {
            return;
          }
          sessionStorage.clear();
          util.login();
          break;
        //未授权
        case 403:
          errorHandler('服务未授权!')
          break;
        default:
          // errorHandler(error.message)
          break;
      }
    }
    return Promise.reject(error);
  });

function errorHandler(message, title = '错误') {
  util.alert({
    type: 'error',
    content: message || '网络繁忙,请稍后重试!'
  });
}

export default axios
