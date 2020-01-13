import "./style/reset.css";
import "lib/font-awesome-4.7.0/css/font-awesome.css";
import "lib/layer/theme/default/layer.css";
import "./style/base.css";
import "lib/layer/layer.js";
import "lib/ele/index.css";
import bee from "util/bee.js";
import { userInfo, dialog, applyLecturerStep } from "util/template.js";
// import * as lecturer from './module/lecturer.js';
// import { userInfo } from "os";

function noLogin() { }

function doUserInfo() {
  var token = bee.getToken();
  console.log(token);
  if (!token) {
    //如果没有token则表示没有用户登录 直接处理
    return;
  }

  function localUserInfo(container) {

    var localUserInfo = bee.getLocalStorageValue('localUserInfo');
    if (localUserInfo) {
      userInfoArea.empty();
      container.append($(localUserInfo));
    }
  }

  var userInfoArea = $("#header-user-info");
  if (userInfoArea.length > 0) {
    $.ajax({
      url: bee.getServerPath("/getUserInfo"),
      headers: { Authorization: bee.getToken() },
      async: false,
      success: function (res) {
        if (res.code == 0) {
          console.log(res);
          // bee.setLocalStorage("");
          //成功， 需要构建信息
          // var userInfoArea = $("#header-user-info");
          var userStr = userInfo({
            username: "huanghao",
            avatar:
              "https://img1.mukewang.com/545865890001495702200220-140-140.jpg"
          });
          // userInfoArea.append($(userInfo(res.data)));
          bee.setLocalStorage('localUserInfo', userStr);
          userInfoArea.empty();
          userInfoArea.append($(userStr));

        } else {
          // localUserInfo(userInfoArea);
        }
      }, error: function (error) {
        // localUserInfo(userInfoArea);
      }
    });
    // userInfoArea.empty();
    // console.log(userInfo);

    // userInfoArea.append($(userStr));
  }

  //
}
doUserInfo();
// if ($("#header-user-info").length > 0) {
//   new window.Vue({
//     el: "#header-user-info",
//     data: {
//       isLogined: localStorage.getItem("token") ? true : false
//     }
//   });
// }

const commonPage = {
  init: function () {
    commonPage.resizeFooter();
    commonPage.attachEvent();
  },
  resizeFooter: function () {
    var csFooter = $(".cs-footer"),
      position = csFooter.css("position");
    var wh = $(window).height(),
      bh = $("body").height();
    if (position == "fixed") {
      if (wh <= bh + 166) {
        csFooter.css({
          position: "static"
        });
      }
    } else {
      if (wh > bh) {
        csFooter.css({
          position: "fixed",
          bottom: 0,
          left:0,
          right:0
        });
      }
    }
  },
  diaglogResize: function () {
    $(".dialog-wrapper").each(function (i, v) {
      console.log(i, v);
    });
  },
  attachEvent: function () {
    // $(".apply-lecturer").click(function () {
    //   var type = 1;
    //   if (type == 1) {
    //     dialog({
    //       body: applyLecturerStep({ step: 1 }),
    //       title: "申请成为讲师",
    //       width: "900px"
    //     });
    //   }
    // });
    $("#toTop").click(function () {
      $("html,body").animate({ scrollTop: "0px" }, "slow");
    });

    $(".logout-btn").click(function () {
      layer.confirm("确定要注销?", { icon: 3, title: "提示" }, function (index) {
        $.ajax({
          url: bee.getServerPath("sign-out"),
          headers: { Authorization: bee.getToken() },
          success: function (res) {
            console.log(res);
            layer.close(index);
            if (res.code == 0) {
              layer.msg("注销成功");
              localStorage.removeItem('localUserInfo');
              bee.removeToken();
              setTimeout(function () {
                window.location.reload();
              }, 2000);
            } else {
              layer.msg(res.msg);
            }
          },
          error: function (error) {
            layer.msg("服务器错误");
          }
        });
      });
    });
    //讲师申请
    // lecturer.attachmentEvent();

  }
};
window['commonPage'] = commonPage;
$(function () {
  //判断是否登录
  commonPage.init();

  // $('body').append($(dialog({body:'body',width:'750px'})))

  $(window).resize(function () {
    commonPage.resizeFooter();
    commonPage.diaglogResize();
  });
});
