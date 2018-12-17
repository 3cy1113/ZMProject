import _ from 'lodash'
import config from './config'
import validator from './validators'
import service from './service'
import {Spin} from 'iview';

const util = {
  //note  获取文件类型
  getFileType: function (name) {
    let fileType = true;//默认true是图片，false是文件
    let nameSplitLength = name.split('.').length - 1;//分割文件名，取最后一个
    if (name.split('.')[nameSplitLength].toLowerCase() == 'png' || name.split('.')[nameSplitLength].toLowerCase() == 'jpg' || name.split('.')[nameSplitLength].toLowerCase() == 'jpeg') {

    } else {
      fileType = false;
    }
    return fileType;
  },
  //note  获取文件名称
  getFileName(str){
    debugger;
    str = str.substring(str.lastIndexOf("/") + 1);
    return str;
  },

  //note  下载文件
  downloadIamge(imgsrc,name) {//下载图片地址和图片名
    debugger;
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      var a = document.createElement("a"); // 生成一个a元素
      var event = new MouseEvent("click"); // 创建一个单击事件
      a.download = name || "photo"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
  },

  //note  下载判断到底是图片还是文件
  download(imgurl) {
    debugger;
    let name=this.getFileName(imgurl);
    if (this.getFileType(name)) {
      //img
      this.downloadIamge(imgurl,name);
    } else {
      //file
      window.open(imgurl);
    }
  }

}





util.login = () => {
  window.open(appConfig.loginUrl(), appConfig.loginTarget);
};
util.logout = () => {
  // window.open(appConfig.logoutUrl, appConfig.logoutTarget);
  window.location.href = config.getEnvURL() + 'static/alipay-logout.html'
}
//note 深度JSON
// util.jsonDeepToStr=function(obj){
//   _.forIn(obj,value=>{
//     if(typeof(value)==='array'){
//
//     }
//   })
// };
//note 数据适配方法
util.dataAdapter = function (data, arr1, arr2, flag) {
  let dll = {};
  _.each(arr1, (i, v1) => {
    _.each(arr2, (k, v2) => {
      if (i === k) {
        dll[v1] = v2;
      }
    });
  });
  const str = JSON.stringify(data);
  const reg = eval('/(' + arr1.join('|') + ')/g');
  const result = str.replace(reg, ($0, $1) => {
    return dll[$1];
  });
  let last = '';
  if (flag === false) {
    last = $.extend(true, data, JSON.parse(result));
  } else {
    last = JSON.parse(result);
  }
  return last;
};
//note 解析表单数据为get请求参数字符串
util.parseToGet = function (data) {
  let result = '';
  _.keys(data).forEach(value => {
    result += `${value}=${data[value]}&`
  })
  return result;
};
/**
 * 获取本地字典表
 * @param name 字典名
 * @param name 字典值
 */
util.getLocalDic = function (name, code) {
  return this.localDic[name][code];
};
util.getLocalDicOfList = function (name) {
  var list = [];
  $.each(this.localDic[name], function (label, value) {
    list.push({
      value,
      label
    })
  })
  return list;
};
util.showPart = function (store, display) {
  const dp = display || {};
  util.showShortCut(store, dp.shortCut)
  util.showCustom(store, dp.custom)
  util.showNav(store, dp.nav)
  util.showLeftMenu(store, dp.left)
  util.showCrumb(store, dp.crumb)
  util.showFooter(store, dp.footer)
};
//note 显示/隐藏shortCut
util.showShortCut = function (store, state = true) {
  store.dispatch('updateShortCutDisplay', state)
};
//note 显示/隐藏智小新
util.showCustom = function (store, state = true) {
  store.dispatch('updateCustomDisplay', state)
};
//note 显示/隐藏主导航
util.showNav = function (store, state = true) {
  store.dispatch('updateNavDisplay', state)
};
//note 显示/隐藏左侧菜单
util.showLeftMenu = function (store, state = true) {
  store.dispatch('updateLeftMenuDisplay', state)
};
//note 显示/隐藏面包屑
util.showCrumb = function (store, state = true) {
  store.dispatch('updateCrumbDisplay', state)
};
//note 显示/隐藏底部
util.showFooter = function (store, state = true) {
  store.dispatch('updateFooterDisplay', state)
};
//note 计算公式
util.mathFormatStr = function (model, str) {
  if (!!str && !!model) {
    const temp = str.split('|');
    let expression = temp[0];
    const params = temp[1].split(',');
    params.forEach(item => {
      expression = expression.replace('%s', model[item] || 0);
    });
    try {
      return eval(expression);
    } catch (e) {
      console.log(e)
    }
    return;
  }
  return 0;
};
//note 统一提示框
util.alert = function (opts) {
  const defaultOpts = {
    scrollable: true,
    type: "info",
  };
  const option = {...defaultOpts, ...opts};
  $Modal[option.type]({...option, ...{title: util.lang.alertTitle[option.type]}});
};
//note 克隆对象
util.clone = function (obj) {
  return _.assign({}, obj);
};
util.clone2 = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
//note 根据菜单名获取菜单对象
util.getMenuItemFromName = function (menu, name) {
  if (menu && menu.length !== 0) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].menuCode === name) {
        return menu[i]
      }
      if (menu[i].subMenus && menu[i].subMenus.length > 0) {
        let result = util.getMenuItemFromName(menu[i].subMenus, name);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
  return null;
},
  /**
   * note 本地字典表添加
   */
  util.localDic = {
    //FIXME 示例字典项
    exampleItem: [
      {'key': 'value'},
    ]
  };
//note 显示文本配置
util.lang = {
  exampleMsg: "显示文本配置",
  alertTitle: {
    info: '提示',
    success: '提示',
    warning: '警告',
    error: '错误'
  }
};
util.getCaptcha = function () {
  return config.api('captcha/verification');
};
util.regexp = validator;
util.service = service;
//note 加载中
util.showLoading = (message) => {
  Spin.show({
    render: (h) => {
      return h('div', {}, [
        h('Icon', {
          'class': 'spin-icon-load',
          props: {
            type: 'ios-loading',
            size: 30
          }
        }),
        h('div', message || '加载中')
      ])
    }
  });
}
util.closeLoading = () => {
  Spin.hide()
}
//禁止复制
util.forbiddenCopy = (event) => {
  if ((event.metaKey || event.ctrlKey) && (event.key.toLowerCase() == 'c' || event.key.toLowerCase() == 'v')) {
    event.preventDefault();
  }
};
// note 判断当前浏览器的名称和版本号
util.getExploreName = () => {
  let Sys = {};
  let ua = navigator.userAgent.toLowerCase();
  let s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/msie ([\d\.]+)/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/edge\/([\d\.]+)/))
      ? (Sys.edge = s[1])
      : (s = ua.match(/firefox\/([\d\.]+)/))
        ? (Sys.firefox = s[1])
        : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
          ? (Sys.opera = s[1])
          : (s = ua.match(/qqbrowser\/([\d\.]+)/))
            ? (Sys.qqbrowser = s[1])
            : (s = ua.match(/chrome\/([\d\.]+)/))
              ? (Sys.chrome = s[1])
              : (s = ua.match(/version\/([\d\.]+).*safari/))
                ? (Sys.safari = s[1])
                : 0;
  let ieVersion;
  if (Sys.ie) {
    ieVersion = Number(Sys.ie)
  }
  return (Sys.edge || Sys.chrome || ieVersion >= 10);
}

//note 金额转换为汉字
util.DX=(n)=>{
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
  let unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  n += "00";
  let p = n.indexOf('.');
  if (p >= 0)
    n = n.substring(0, p) + n.substr(p+1, 2);
  unit = unit.substr(unit.length - n.length);
  for (let i=0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(兆|万|亿|元)/g, "$1").replace(/(兆|亿)万/g, "$1").replace(/(京|兆)亿/g, "$1").replace(/(京)兆/g, "$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟").replace(/^元零?|零分/g, "").replace(/(元|角)$/g, "$1整");
}

export default util;

