import http from '@/utils/http'
import qs from 'qs';

export function getCourseCategoryTreeTable(params){
    return http.get('/courseCategory/treeTable',{params});
}

export function saveCourseCategory(params){
    console.log(params)
    return http.post('/courseCategory/save',qs.stringify(params));
}


export function deleteCourseCategoryById(id){
    return http.get('/courseCategory/deleteById/' + id);
}

export function updateCourseCategoryAvailableById(params){
    return http.get('/courseCategory/updateAvailableById',{params});
}