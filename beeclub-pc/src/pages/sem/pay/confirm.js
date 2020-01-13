import './style/pay.css'
import confirmItemTpl from './template/confirmItem.tpl.html';
import { cardCourse } from "service/semApi.js";
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


const page = {
    content:[],
    init: function(){
        async function blockRequest(){
            if(!queryParam.courseId){
                return null;
            }
            var res = await cardCourse({courseIds:queryParam.courseId});
            page.content = res.data;
            page.initDom();
        }
        blockRequest();
        

    },
    initDom: function(){
        console.log(page.content)
        if(page.content){
            var resHtml = renderTpl(confirmItemTpl, {data: page.content});
            $('#confirm-detail-box').html(resHtml);
        }
    }
}

$(function(){
    page.init();
});