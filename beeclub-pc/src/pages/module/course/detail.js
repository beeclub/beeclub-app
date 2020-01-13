import "./style/detail.css";
import cates from "mock/indexCate.json";
import courseDetailHeaderTpl from './template/courseDetailHeader.tpl.html';
import { getUserInfo, signOut } from "service/authApi.js";
// import course from "mock/course/detail.json";
import {
  renderHtml,
  pagination,
  catesMapHandler,
  toPageWithParams,
  leafToRootArr,
  reversalArr,
  renderTpl
} from "util/bee.js";

import http from "util/http.js";

// var course = null;
// initData().then(res => {
//   console.log(res)
//   course = res.data;
// })
// console.log(course)

var course = null,
  cateMap = null,
  selectedCate = null,
  selectedCates = null;

var page = {
  init: function() {
    async function blockRequest() {
      var detail = await http.get("/api/public/v1/course/" + queryParam.id);
      if (detail && detail.data) {
        course = detail.data;
      } else {
        $('#course-detail-main').html('<div class="w text-center">没有发现课程</div>');
        return;
      }
      cateMap = catesMapHandler(cates);
      selectedCate = cateMap[course.category[course.category.length - 1]];
      selectedCates = leafToRootArr(selectedCate);
      page.initDom();
      page.initEvent();
    }
    blockRequest();
  },
  initDom: function() { 
    
    var selectedCateHtmls = [];
    selectedCateHtmls.push('<div class="breadcrumb">');
    selectedCateHtmls.push(
      '<span class="list-cate-all"><a data-id="">全部课程</a></span>'
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
    selectedCateHtmls.push('<i class="fa fa-angle-right"></i><span style="display:inline-block;margin-left:10px;">'+ course.title +'</span></div>');
    $("#course-belong-cate").html(selectedCateHtmls.join(""));

    //处理tab
    // $('#course-detail-tab').tabs();
    // console.log($.tabs);
    // console.log(.tabs);

    function initTab(context) {
      var titles = context.find(".bee-tab-title-item"),
        contents = context.find(".bee-tab-content-item");
      context.on("click", ".bee-tab-title-item", function() {
        var el = $(this);
        if (el.is(".active")) {
          return;
        }
        var activeTile = context.find(".bee-tab-title-item.active");
        activeTile.removeClass("active");
        context.find(".bee-tab-content-item.active").removeClass("active");
        var index = titles.index(this);
        $(titles.get(index)).addClass("active");
        $(contents.get(index)).addClass("active");
      });
    }
    initTab($("#course-detail-tab"));
    //处理装修
    $("#course-detail-decoration").html(
      course.decoration && course.decoration.content
        ? course.decoration.content
        : course.description
    );
    $('title').text(course.title);
    // if(course.thumb){
    //   $('#thumb .thumb-img').attr("src", course.thumb)
    // }
    //处理course
    var res = {title:course.title, description:course.description, thumb: course.thumb};
    if(course.free){
      res.price = '免费';
    }else{
      res.price = '￥' + (course.disacountPrice || course.price.originPrice);
    }
    res.learners = 0 + '人';
    res.perid = course.perid + course.peridType;
    res.duration = course.duration;
    res.submitType = '加入学习';
    $('#course-detail-header').html(renderTpl(courseDetailHeaderTpl, res));
  },
  initEvent: function() {
    $("#course-belong-cate").on("click", "a[data-id]", function() {
      var el = $(this),
        cateId = el.attr("data-id");
      toPageWithParams("/course/list.html", { cateId: cateId });
    });
    $('#course-detail-header').on('click', '.purchase-handle-btn', function(){
      //判断是否登录
      window.location.href = '/sem/pay/confirm.html?courseId=' + course.id;
    });
    
  }
};

page.init();
