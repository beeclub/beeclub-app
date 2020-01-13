import axios from "axios";
import { removeCookie ,getCookie} from 'util/bee.js';

const baseURL = 'http://127.0.0.1:8088';
const http = axios.create({
  baseURL: baseURL,
  // timeout: 10000,
  responseType: "json"
});



http.interceptors.request.use(
    config => {
      const token = getCookie('token');
      console.log("token====>:",token)
      if (token) {
        config.headers["Authorization"] = token;
      }
      config.headers["Context-type"] = 'application/json';
      return config;
    },
    error => {
      console.log(error);
      Promise.reject(error);
    }
  );
  
  http.interceptors.response.use(
    response => {
      
      const res = response.data;
      console.log("请求返回==》",res);
      switch (res.code) {
        
        case 401: //需要登陆时
          //需要登录
          removeCookie('token');
          // location.reload();
          //window.location.reload();
          break;
        case 402: //无权限访问
          //无权访问
          layer.msg(res.msg);
          return Promise.reject("无权访问");
        case 500: //系统错误
        layer.msg(res.msg);
          return Promise.reject("系统错误");
        case -1: //业务错误
          layer.msg(res.msg);
          return Promise.reject("业务错误");
        default:
          break;
      }
  
      return res;
    },
    error => {
      console.log("err" + error); // for debug
      layer.msg('服务器未响应,请先点击右侧的【授权】按钮进行授权，如已经授权，请忽略。');
      //return Promise.reject(error);
    }
  );
  
  export default http;
  