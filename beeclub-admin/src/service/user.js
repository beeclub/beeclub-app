import http from '@/utils/http'
// import axios from 'axios'
import qs from 'qs';

export function login(email, password){
    const data = {
        email: email,
        password: password
    }
    console.log("数据==============》data:")
    console.log(data)
    // return http({
    //     url: '/login',
    //     method: 'get',
    //     data: data
    // })
    // http://localhost:7001/
    return http.post('/login',qs.stringify(data));
}

export function getUserInfo(){
    return http.get('/getUserInfo');
}

export function logout(){
    return http.get('/logout');
}