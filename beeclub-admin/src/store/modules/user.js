import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/service/user'
import {Message } from 'element-ui'


const user = {
    state: {
        token: getToken(),
        name: '',
        roles: [],
        permissions: [],
        userInfo: {},
        menus:[]
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
        },
        setUserInfo: (state, data) => {
            localStorage.setItem('permissions', JSON.stringify(data.userInfo.permissions))
            localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
            localStorage.setItem('menus', JSON.stringify(data.menus))
            state.permissions = data.userInfo.permissions;
            state.userInfo = data.userInfo;
            state.menus = data.menus;
        },
        setName: (state, name) => {
            state.name = name
        },
        setRoles: (state, roles) => {
            state.roles = roles
        },
        logout: state => {
            // state.permissions = data.userInfo.permissions;
            // state.userInfo = data.userInfo;
            // state.menus = data.menus;
            removeToken();
        }
    },
    actions: {
        doLogin({ commit }, userInfo) {
            const email = userInfo.email.trim()
            return new Promise((resolve, reject) => {
                login(email, userInfo.password.trim()).then(response => {
                    const data = response;
                    console.log(data)
                    if(data.code == 0){
                        setToken(data.data.token);
                        // commit('setUserInfo', data.data)
                        commit('setToken', data.data.token)
                    }else{
                        Message({
                            message: data.msg,
                            type: 'error',
                            duration: 5 * 1000
                        })
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                });
                
                // reject(error);
            })
            // .catch(error => {
            //     console.log(error)
            //     Message({
            //         message: error,
            //         type: 'error',
            //         duration: 3 * 1000
            //     })
            // })
        },
        getUserInfo({commit}){
            console.log('getUserInfo')
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    console.log('userInfo',response)
                    commit('setUserInfo', response.data)
                }).catch(error => {
                    reject(error)
                })
            });
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                logout().then(response => {
                    if(response.code == 0){
                        commit('logout')
                    }else{
                        Message({
                            message: response.msg,
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            });
            
        }
    }
}

export default user
