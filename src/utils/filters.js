import accounting from 'accounting'
import Vue from "vue";
/**
 *@author
 *@date         2018/10/16 17:18
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description
 */
Vue.filter('money', function (value) {
  return accounting.formatMoney(value,"￥", 2);
})
Vue.filter('hide', function (value) {
  if (!value) return;
  let frontLen = 1;
  let endLen = value.length - 1
  let len = value.length-frontLen-endLen;
  let star = '';
  for (let i = 0 ; i < len; i++) {
    star +='*';
  }
  return value.substring(0,frontLen) + star + value.substring(value.length-endLen);
})
