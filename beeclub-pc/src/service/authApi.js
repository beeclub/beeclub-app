import http from 'util/http.js'
const apiPrefix = "/api/v1/user";
export function getUserInfo(){
    return http.get(apiPrefix+"/getUserInfo");
}

export function signOut(){
    return http.get('/sign-out');
}