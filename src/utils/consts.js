const Consts = {
  STEPS_ONLINE: [{title: '填写资料'},
    {title: '上传文件'},
    {title: '提交审核'},
    {title: '支付缴费'},
    {title: '已办结'}],
  //NOTE 路由列表  地址链接
  ROUTES: {
    //NOTE 常用,公共路由
    COM_HOME: 'home-index',             //首页
    COM_REGISIT: '',              //注册
    COM_LOGIN: 'login',           //登录
    COM_LOGOUT: 'logout',         //退出
    COM_MEMBER_CENTER: 'XXX',      //会员中心
    COM_HELP_CENTER: 'XXX',        //帮助中心
    //NOTE 模块路由
    MODULE_ZWDT: '',                //政务动态
    MODULE_ZWGK: '',                //政务公开
    MODULE_WSBS: '',                //网上办事
    MODULE_ZWSJ: '',                //政务数据
    MODULE_XNGC: '',                //效能观察
    MODULE_ZXHD: '',                //咨询互动
    MODULE_YHZX: '',                //用户中心
    //事项模块路由
    PROCESS_GG_MH: ''               //门户广告申请
  },
  //NOTE VUEX actions
  DISPATCHS: {
    UPDATE_USER_INFO: 'updateUserInfo',               //更新用户信息
    UPDATE_MENU_DATA: 'updateMenuData',               //更新菜单信息
    UPDATE_NAV_MENU_ACTIVE: 'updateNavMenuActive',    //更新导航菜单激活项
  },
  // note 浏览器标准提示语
  BROWSERSTANDARD: "建议使用分辨率在1366*768及以上的谷歌/Edge/IE10及以上浏览器达到最佳效果"
};
export default Consts;
