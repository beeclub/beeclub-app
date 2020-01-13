import http from '@/utils/http'
import qs from 'qs';

export function treeTable(){
    return http.get('/organization/treeTable');
}