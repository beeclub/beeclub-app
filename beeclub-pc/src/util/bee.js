"use strict";
import hogan from "hogan.js";
import handlebars from "handlebars";
import cookies from "js-cookie";
import qs from 'qs';

export function setCookie(name, data) {
  cookies.set(name, data);
}
export function getCookie(name) {
  return cookies.get(name);
}
export function removeCookie(name) {
  cookies.remove(name);
}

// handlebars.registerHelper('active', function(val) {
// 	return val;
// });

console.log(handlebars);
const config = {
  serverHost: "http://127.0.0.1:8088"
};
const token = "";

export function renderHtml(html, data) {
  var htmlTemplate = hogan.compile(html);
  return htmlTemplate.render(data);
}

export function renderTpl(tpl, data) {
  var template = handlebars.compile(tpl);
  return template(data);
}

/**
 *
 * @param {*} data   page size total
 */
export function pagination(content, el, callBack) {
  var fn = {
    currentPage: 0,
    totalPages: 1,
    init: function () {
      fn.initDom();
      fn.initEvent();
    },
    //初始化dom
    initDom: function () {
      // el.html(
      //   '<a class="home" class="disabled">首页</a><a class="fa fa-angle-left disabled pre "></a><a class="active pageIndex disabled" page-index="1">1</a><a class="fa fa-angle-right disabled next"></a><a class="disabled trailer">尾页</a>'
      // );
      el.empty();
    },
    initEvent: function () {
      el.on("click", "a", function () {
        var el = $(this);
        if (el.is(".disabled")) {
          return;
        }
        var currentPage = 1;
        if (el.is(".home")) {
          currentPage = 1;
        } else if (el.is(".pre")) {
          currentPage = fn.currentPage - 1;
          if(currentPage <= 0){
            currentPage = 1;
          }
        } else if (el.is(".next")) {
          currentPage = fn.currentPage + 1;
          if(currentPage > fn.totalPages){
            currentPage = fn.totalPages;
          }
        } else if (el.is(".pageIndex")) {
          currentPage = el.attr("page-index");
        } else if (el.is(".trailer")) {
          currentPage = fn.totalPages > 0 ? fn.totalPages : 1;
        }
        callBack.call(content, currentPage);
      });
    }
  };
  fn.init();
  return function (totalPages, page) {
    console.log(page)
    fn.totalPages = totalPages; fn.currentPage = page;
    var home = "",
      pre = "",
      next = "",
      trailer = "";
    if (page <= 1) {
      pre = "disabled";
    }
    console.log(totalPages, page)
    if (totalPages <= 1 || totalPages == page) {
      next = "disabled";
    }
    if (totalPages <= 1) {
      trailer = "disabled";
      home = "disabled";
    }
    var htmlArr = [];
    //首页
    htmlArr.push('<a class="home">首页</a>');
    //上一页
    console.log(totalPages)
    htmlArr.push('<a class="fa fa-angle-left ' + pre + ' pre "></a>');
    if (totalPages <= 0) {
      htmlArr.push('<a class="active pageIndex" page-index="1">1</a>');
    } else {

      // for (let index = page - 3; index > 0 && index < page; index++) {
      //   htmlArr.push(
      //     '<a class="pageIndex" page-index="' +
      //     index +
      //     '">' + index + '</a>'
      //   );
      // }
      for (var i = 1; i <= totalPages; i++) {
        htmlArr.push(
          '<a class="' + (page == i ? 'active' : '') + ' pageIndex" page-index="' +
          i +
          '">' + i + '</a>'
        );
      }
    }
    //下一页
    htmlArr.push('<a class="fa fa-angle-right ' + next + ' next "></a>');
    //尾页
    htmlArr.push('<a class="trailer">尾页</a>');
    el.html(htmlArr.join(""));
  };
}


export function catesMapHandler(cates) {
  var convertCatesToMap = function (cateMap, cates) {
    for (var i in cates) {
      cateMap[cates[i].id] = cates[i];
      if (cates[i].children && cates[i].children.length) {
        convertCatesToMap(cateMap, cates[i].children);
      }
    }
  };
  var cateMap = {};
  convertCatesToMap(cateMap, cates);
  for (var id in cateMap) {
    cateMap[id].parent = cateMap[cateMap[id].pid];
  }
  return cateMap;
}

export function toPageWithParams(pathName, data) {
  var queryparam = qs.stringify(data);
  window.location.href = pathName + "?" + queryparam;
}

export function leafToRootArr(leafNode) {
  var iterateNode = function (resArr, leafNode) {
    if (leafNode) {
      resArr.push(leafNode);
      iterateNode(resArr, leafNode.parent);
    }
  };
  var resArr = [];
  iterateNode(resArr, leafNode);
  return resArr;
}

export function reversalArr(arr) {
  var i = 0;
  var j = arr.length;
  while (j - i > 1) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    j--;
    i++;
  }
}
export function reversalArrforNew(arr) {
  var i = 0;
  var j = arr.length;
  var resArr = [];
  while (j > i) {
    resArr[j] = arr[i];
    resArr[i] = arr[j];
    j--;
    i++;
  }
  if (j == i) {
    res[i] = arr[i];
  }
  return resArr;
}

export function getFormData(form) {
  var data = {};
  form.find("input[name],select[name],textarea[name]").each(function (i, v) {
    var el = $(v),
      val = $.trim(el.val()),
      name = el.attr("name");
    if (val || val === 0) {
      data[name] = val;
    }
  });
  return data;
}

export const bee = {};
