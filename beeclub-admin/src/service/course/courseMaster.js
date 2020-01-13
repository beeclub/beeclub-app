import http from '@/utils/http';
const apiPrefix = '/api/v1';

export function create(data){
    return http.post(apiPrefix + '/course-master', data);
}

export function update(data){
    return http.put(apiPrefix + '/course-master', data);
}

export function coursePageData(params){
    return http.get(apiPrefix + '/course-master/page', {params});
}

export function getCourseDetail(id){
    return http.get(apiPrefix + '/course-master/' + id);
}