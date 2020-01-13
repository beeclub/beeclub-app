import "./style/list.css";
import "pages/common/style/course.css";
import http from 'util/http.js';

import cates from "mock/indexCate.json";
import { renderHtml, pagination, catesMapHandler, toPageWithParams, leafToRootArr, reversalArr } from "util/bee.js";

import coursePage from "mock/course/page.json";
import courseTemplate from "./template/courseCard.tpl.html";

var pageSize = 10;

var page = {

  init: function () {
    page.initDom();
    page.initEvent();

    page.handlerQueryCoursePage();
  },
  initDom: function () {
    page.initCateDom();
  },
  initEvent: function () {
    $("#course-cate-select-wrapper").on("click", "a[data-id]", function () {
      var el = $(this),
        cateId = $.trim(el.attr("data-id"));
      page.queryCoursePage({ "cateId": cateId });
    });
  },
  // handlerQueryCoursePage: function() {
  //   $("#cousre-page-list").html(renderHtml(courseTemplate, coursePage));
  // },
  pagination: pagination(this, $('#course-page-pagination'), function (currentPage) {
    page.queryCoursePage({ page: currentPage, size: pageSize });
  }),
  queryCoursePage: function (data) {
    //   page.handlerQueryCoursePage();
    var pathName = window.location.pathname;
    for (var key in data) {
      queryParam[key] = data[key];
    }
    console.log(queryParam)
    toPageWithParams(pathName, queryParam);
  },
  //   queryCoursePage: function(key, value) {
  //     var pathName = window.location.pathname;
  //     queryParam[key] = value;
  //     var queryparam = qs.stringify(queryParam);
  //     window.location.href = pathName + "?" + queryparam;
  //   },
  handlerQueryCoursePage: function () {
    console.log(queryParam)
    queryParam.page = queryParam.page && queryParam.page > 0 ? queryParam.page - 1 : 0;
    queryParam.size = queryParam.size ? queryParam.size : 10;
    http.get('/api/public/v1/course/page', { params: queryParam }).then(res => {
      if(res.data.totalElements <=0 ){
        $("#cousre-page-list").html('<div class="no-found-course"><span>暂无课程</span></div>')
        //
        return;
      }
      $("#cousre-page-list").html(renderHtml(courseTemplate, res.data));
      page.pagination(res.data.totalPages, queryParam.page + 1);
    });

  },
  initCateDom: function () {
    var cateMap = catesMapHandler(cates);
    var selectedCates = [],
      selectedCateHtmls = [];
    var selectedCate = null;
    if (queryParam.cateId) {
      selectedCate = cateMap[queryParam.cateId];
      selectedCates = leafToRootArr(selectedCate);
    }
    if (selectedCates.length) {
      selectedCateHtmls.push(
        '<span  class="list-cate-all"><a data-id="">全部课程</a></span>'
      );
      for (var i = selectedCates.length - 1; i >= 0; i--) {
        selectedCateHtmls.push(
          '<i class="fa fa-angle-right"></i><span><a data-id="' +
          selectedCates[i].id +
          '">' +
          selectedCates[i].name +
          "</a></span>"
        );
      }
    } else {
      selectedCateHtmls.push(
        '<span  class="list-cate-all-title">全部课程:</span><span class="list-cate-all"><a  class="active" data-id="">全部</a></span>'
      );
      for (var i in cates) {
        selectedCateHtmls.push(
          '<span><a data-id="' +
          cates[i].id +
          '">' +
          cates[i].name +
          "</a></span>"
        );
      }
    }
    $("#course-list-selected-cate").html(selectedCateHtmls.join(""));
    var subSelectedCateHtml = [],
      subSelectedCates = [];
    if (selectedCate) {
      var activeAll = "active", pid = '';
      if (selectedCate.children && selectedCate.children.length) {
        subSelectedCates = selectedCate.children;
        pid = selectedCate.id;
      } else {
        if (selectedCate.parent) {
          activeAll = "";
          subSelectedCates = selectedCate.parent.children;
          pid = selectedCate.pid;
        }
      }
      subSelectedCateHtml.push(
        '<span class="list-cate-all"><a class="' +
        activeAll +
        '" data-id="' +
        pid +
        '">全部</a></span>'
      );
    } else {
      subSelectedCateHtml.push(
        '<span class="list-cate-all"><a class="active" data-id="">全部</a></span>'
      );
      for (var i in cates) {
        if (cates[i].children && cates[i].children.length) {
          subSelectedCates = subSelectedCates.concat(cates[i].children);
        }
      }
    }
    for (var i in subSelectedCates) {
      var active = "";
      if (selectedCate && selectedCate.id == subSelectedCates[i].id) {
        active = "active";
      }
      subSelectedCateHtml.push(
        '<span><a class="' +
        active +
        '" data-id="' +
        subSelectedCates[i].id +
        '">' +
        subSelectedCates[i].name +
        "</a></span>"
      );
    }
    $("#course-list-selected-sub-cate").html(subSelectedCateHtml.join(""));
  }
};

page.init();

console.log(queryParam);
