const env = process.env.NODE_ENV;
const isBuild=process.env.IS_BUILD;

//note 设置项目子目录路径
const baseURL= env=="test" || env=="local" || env=="localTest" || env=="development" || env=="uat"?'/zdpyc/portal/': "/";
// const baseURL='/';
//note 接口访问地址前缀
//如果和域名加二级目录不一致则需要设置prefix,否则只需要设置baseURL
const prefix='';
const config={

}
// 兼容ie10不认识location.origin
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

export default config
