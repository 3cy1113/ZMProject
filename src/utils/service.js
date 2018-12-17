import axios from 'axios';
import './http';
import config from './config';
import * as _ from 'lodash';
//note Service服务类封装
/**
 * @class
 */
class Service {
    static request(url, params) {
        return request(url, params || {});
    }

    static get(url, params,mock=false) {
        return request(url, {...{ params:params||{}}, ...{method: 'get',mock}});
    }

    static post(url, params,mock=false) {
      // params.headers&&console.log(params.headers)
        return request(url, {...{ data:params||{}},  ...{method: 'post',mock}});
    }

    static url(url, type,mock=false) {
       return config.api(url,type,mock);
    }
}
function request(url,params){
  const requestOpts = {
    method: 'post',
  };
  if (params.data&&params.data.headers) {
    requestOpts.headers = params.data.headers
  }

  if(appConfig.env==='production'){
    params.mock=false;
  }
  if(params.mock){
    //如果是mock请求,去掉baseURL
    requestOpts.url=_.trim(requestOpts.url,config.baseURL)+'/';
  }

  return axios(_.merge(requestOpts, params, {
    url: Service.url(url,params.type,params.mock)
  }));
}
export default Service;
