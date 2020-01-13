import axios from "axios";

import { Message } from "element-ui"; //MessageBox
import { config } from './config'
// import store from '../store'

import { getToken, removeToken } from "@/utils/auth";
const baseURL= config.baseURL;// "https://127.0.0.1:7001";//"https://47.97.177.117:7001",//, //process.env.BASE_API,

const authBtn = document.getElementById('to-grant-authorization-a');
authBtn.setAttribute('href',baseURL + '/grant-authorization');
authBtn.setAttribute('target','_blank')
const http = axios.create({
  baseURL: baseURL,
  // timeout: 10000,
  responseType: "json"
});

http.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
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
    console.log(res);
    switch (res.code) {
      case 401: //需要登陆时
        //需要登录
        removeToken();
        location.reload();
        break;
      case 402: //无权限访问
        //无权访问
        Message({
          message: res.msg,
          type: "error",
          duration: 5 * 1000
        });
        return Promise.reject("无权访问");
      case 500: //系统错误
        Message({
          message: res.msg,
          type: "error",
          duration: 5 * 1000
        });
        return Promise.reject("系统错误");
      case -1: //业务错误
        Message({
          message: res.msg,
          type: "error",
          duration: 5 * 1000
        });
        return Promise.reject("业务错误");
      default:
        break;
    }

    return res;
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: '服务器未响应,请先点击右侧的【授权】按钮进行授权，如已经授权，请忽略。',
      type: "error",
      duration: 5 * 1000
    });
    //return Promise.reject(error);
  }
);

export default http;
