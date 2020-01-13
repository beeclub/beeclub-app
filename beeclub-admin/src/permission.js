import router from "./router";
// import store from './store'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth"; // getToken from cookie
import Vuex from "vuex";

NProgress.configure({ showSpinner: false }); // NProgress configuration

const whiteList = ["/login"]; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      //next({...to, replace: true})
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to, from) => {
  console.log(Vuex);
  console.log("arguments", to, from);
  NProgress.done(); // 结束Progress
});
