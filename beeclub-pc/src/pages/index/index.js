import "./style/index.css";
import "../common/style/course.css";
import { renderHtml } from 'util/bee.js';
import 'lib/bee/banner.js'
import logoImg from './style/img/course-logo.png'
import { semPromotion } from 'service/publicApi.js'

// console.log(bdTpl)

import cates from 'mock/indexCate.json';
import indexCateTemplate from './template/indexCategory.tpl.html';

const indexCategorys = $('#indexCategorys');
for (var i in cates) {
    var cateTemplate = renderHtml(indexCateTemplate, cates[i]);
    indexCategorys.append($(cateTemplate));
}


import friendlyLinks from 'mock/indexFriendlyLink.json';
console.log(friendlyLinks)
import friendlyLinkTemplate from '../common/template/friendlyLink.tpl.html';
if (friendlyLinks) {
    $('.friendly-link-wrapper').html(renderHtml(friendlyLinkTemplate, { list: friendlyLinks }));
}

//
/**
 * 轮播图
 */
// import banners from 'mock/indexBanner.json';
// var banner = $('#banner-slide-wrapper').banner({data:banners});


const page = {
    init: function () {
        page.initDom();
    },
    initDom: function () {
        
        semPromotion(1).then(res => {
            console.log(res)
            $('#banner-slide-wrapper').banner({data:res.data, period: 1000* 5000});
        });
    }
};
page.init();
import indexRecommend from './template/indexRecommend.tpl.html';
import courseCard from './template/courseCard.tpl.html';
import columnCard from './template/columnCard.tpl.html';
import recommends from 'mock/indexRecommend.json';

for (var i in recommends) {
    switch (recommends[i].type) {
        case 'course':
            recommends[i].html = renderHtml(courseCard, { list: recommends[i].list });
            break;
        case 'column':
            recommends[i].html = renderHtml(columnCard, { list: recommends[i].list });
            break;
    }

}

console.log(recommends)
$('#index-recommend-wrapper').html(renderHtml(indexRecommend, { list: recommends }));

// import bee from "util/bee.js";

// // $(function(){
// // 	var mySwiper = new Swiper ('.swiper-container', {
// // 	    direction: 'horizontal',
// // 	    loop: true,

// // 	    // 如果需要分页器
// // 	    pagination: '.swiper-pagination',

// // 	    // 如果需要前进后退按钮
// // 	    nextButton: '.swiper-button-next',
// // 	    prevButton: '.swiper-button-prev',
// // 	    //autoplay: true,
// // 	    //delay: 5000
// // 	    // 如果需要滚动条
// // 	    //scrollbar: '.swiper-scrollbar',
// // 	  })
// // });

// var page = {
//   init: function() {
//     page.preLoad();
//     page.loadSlide();
//   },
//   loadSlide: function() {
//     //var data = indexService.getIndexSlides();
//     var data = [
//       // {url: '', target: '_blank', img: '//img.mukewang.com/5bfe8a6f0001ef2118720632.jpg'},
//       // {url: '', target: '_blank', img: '//img.mukewang.com/5d1c5aec00011c1016000540.jpg'},
//       // {url: '', target: '_blank', img: '//img.mukewang.com/5d1e0a1800013ca916000540.jpg'},
//       // {url: '', target: '_blank', img: '//img.mukewang.com/5d108b1500010bfe18720632.jpg'}
//     ];
//     listOnSaleSemPromotionByModule(1).then(res => {
//       data = res.data;
//       initSlide();
//     });

//     function initSlide() {
//       var wrap = $(".bee-swiper-wrap"),
//         content = wrap.find(".bee-swiper-content"),
//         dots = wrap.find(".bee-swiper-dots");
//       content.empty();
//       dots.empty();
//       var length = data.length;
//       for (var i = 0; i < length; i++) {
//         content.append(
//           '<a href="' +
//             data[i].url +
//             '" target="_blank"><div class="bee-swiper-item"><img src="' +
//             data[i].img +
//             '" alt=""></div></a>'
//         );
//         dots.append("<span></span>");
//       }

//       var swithIndex = function(index) {
//         content.find(".bee-swiper-item.active").removeClass("active");
//         $(content.find(".bee-swiper-item").get(index)).addClass("active");
//         dots.find("span.active").removeClass("active");
//         $(dots.find("span").get(index)).addClass("active");

//         $(".index-bk").css({ backgroundImage: "url(" + data[index].img + ")" });
//       };
//       var prevOrNext = function(offset) {
//         var index = dots.find("span").index(dots.find("span.active")) + offset;
//         if (index >= length) {
//           index = 0;
//         }
//         if (index < 0) {
//           index = length - 1;
//         }
//         swithIndex(index);
//       };
//       dots.on("click", "span", function() {
//         var el = $(this);
//         swithIndex(dots.find("span").index(el));
//       });
//       $(".bee-swiper-anchor.prev").click(function() {
//         prevOrNext(-1);
//       });
//       $(".bee-swiper-anchor.next").click(function() {
//         prevOrNext(1);
//       });

//       swithIndex(0);
//       var timer = setInterval(() => {
//         prevOrNext(1);
//       }, 5000);
//       $(".bee-swiper-wrap")
//         .mouseenter(function() {
//           window.clearInterval(timer);
//         })
//         .mouseleave(function() {
//           timer = window.setInterval(() => {
//             prevOrNext(1);
//           }, 3000);
//         });
//     }
//   },
//   preLoad: function() {
//     new window.Vue({
//       el: "#index-nav-ul",
//       data() {
//         return {
//           courseCategorys: [],
//           loaded: false
//         };
//       },
//       mounted() {
//         var that = this;
//         getIndexCourseCategory().then(response => {
//           if (response.code == 0) {
//             that.courseCategorys = response.data;
//             that.loaded = true;
//           }
//         });
//       }
//     });
//   },
//   attachEvent: function() {}
// };

// page.init();
// // $(function(){

// // });
