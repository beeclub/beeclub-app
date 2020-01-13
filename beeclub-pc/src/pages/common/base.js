import "./style/reset.css";
import "./style/base.css";
import "./style/com-header.css";
import "lib/font-awesome-4.7.0/css/font-awesome.css";
import "lib/layer/theme/default/layer.css";
import "lib/layer/layer.js";
import "./bee.jquery.js";
// import "lib/jqlib/jquery.nicescroll.js";
// import PerfectScrollbar from 'perfect-scrollbar';
// import ScrollMagic from  "scrollmagic";

import { sign } from "./module/auth.js";
import { getUserInfo, signOut } from "service/authApi.js";
import { getCookie, removeCookie, renderHtml } from "util/bee.js";
import loginedUserArea from "./template/loginedUserArea.tpl.html";

const basePage = {
  init: function() {
    basePage.initUserInfo();
    basePage.initEvent();
    // basePage.resizeFooter();
  },
  doSignOut: function() {
    removeCookie();
    window.location.href = "/index.html";
  },

  initUserInfo() {
    var token = getCookie("token");
    if (token) {
      getUserInfo()
        .then(res => {
          if (res.code == 0) {
            $("#loginged-user-area-wrapper").html(
              renderHtml(loginedUserArea, res.data)
            );
          }
        })
        .catch(error => {
          removeCookie();
        });
    }
  },
  initEvent: function() {
    //
    //给全局body上绑定公共事件
    $(".bee-auth-area")
      .on("click", ".bee-auth-sign-in", function() {
        sign({ signIn: true, signInType: "accountPwd" });
      })
      .on("click", ".bee-auth-sign-up", function() {
        sign({ signIn: false });
      })
      .on("click", ".bee-auth-sign-out", function() {
        signOut()
          .then(res => {
            basePage.doSignOut();
          })
          .catch(error => {
            basePage.doSignOut();
          });
      });
  },
  resizeFooter: function() {
    var beeFooter = $(".bee-footer"),
      position = beeFooter.css("position");
    var wh = $(window).height(),
      bh = $("body").height();
    if (position == "fixed") {
      if (wh <= bh + beeFooter.height()) {
        beeFooter.css({
          position: "static"
        });
      }
    } else {
      if (wh > bh) {
        beeFooter.css({
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0
        });
      }
    }
  }
};
basePage.init();
window.basePage = basePage;

console.log(window);
// window.btTpl = window.baidu.template;

// console.log(btTpl)

//
$(window).resize(function() {
    basePage.resizeFooter();
//   commonPage.diaglogResize();
});
