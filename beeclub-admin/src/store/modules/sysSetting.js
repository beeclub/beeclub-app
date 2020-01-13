import {Message } from 'element-ui'
import  { resourceTreeTable, saveResource, queryRoleTable ,saveRole ,rolePageList,
     rolePermissions, updateRolePermission, deleteRoleById,
     adminPageList, switchAdminAvailable, changeAdminRoles, listRolesByAvailable,getSysRoleIdsByAdminId,
     switchRoleAvailable, deleteSysResourceById, updateSysResourceAvailableById
    } from '@/service/sysSetting'
const sysSetting = {
    state: {
        init: false,
        menuArr: [],
        menuSet: {},
        treeTableData:[],
        allRoleList:[],
        rolePageList:{list:[], total:0,page:1,size:1,pages:1},
        adminPageList:{list:[], total:0,page:1,size:1,pages:1},
        rolePermissions:{checkedPermission:[],data:[]},
        listRolesByAvailable:[]
    },
    mutations: {
        setTreeTable: (state, data) =>{
            state.treeTableData = data;
        },
        setAllRoleList: (state, data) => {
            state.allRoleList = data
        },
        rolePageList: (state, data) => {
            state.rolePageList = data
        },
        rolePermissions: (state, data) => {
            state.rolePermissions.data = data.data;
            state.rolePermissions.checkedPermission = data.checkedPermission;
        },
        adminPageList: (state, data) => {
            state.adminPageList = data
        },
        listRolesByAvailable: (state, data) => {
            state.listRolesByAvailable = data
        }

        
        
    },
    actions: {
        treeTable({commit}){
            return new Promise((resolve, reject) => {
                resourceTreeTable().then(response => {
                    commit('setTreeTable', response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })
            });
            // .catch(error => {
            //     console.log(error)
            //     Message({
            //         message: error,
            //         type: 'error',
            //         duration: 3 * 1000
            //     })
            // })
        },
        saveResource({commit}, data){
            return new Promise((resolve, reject) => {
                saveResource(data).then(response => {
                    // commit
                    console.log(response)
                    Message({
                        message: "操作成功",
                        type: 'success',
                        duration: 3 * 1000
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        queryRoleTable({commit}) {
            return new Promise((resolve, reject) => {
                queryRoleTable().then(response => {
                    commit('setAllRoleList',  response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            });
        },
        rolePageList({commit}, data) {
            return new Promise((resolve, reject) => {
                rolePageList(data).then(response => {
                    commit('rolePageList',  response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            });
        },
        saveRole({commit}, data){
            return new Promise((resolve, reject) => {
                saveRole(data).then(response => {
                    Message({
                        message: "操作成功",
                        type: 'success',
                        duration: 3 * 1000
                    })
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
        rolePermissions({commit}, roleId){
            return new Promise((resolve, reject) => {
                rolePermissions(roleId).then(response => {
                    console.log(response)
                    commit('rolePermissions',response.data);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateRolePermission({commit}, data){
            return new Promise((resolve, reject) => {
                updateRolePermission(data).then(response => {
                    console.log(response)
                    Message({
                        message: "保存成功",
                        type: 'success',
                        duration: 3 * 1000
                    })
                    // commit('saveRoleResource',response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteRoleById({commit}, id){
            console.log(1111)
            return new Promise((resolve, reject) => {
                deleteRoleById(id).then(response => {
                    // commit('saveRoleResource',response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        }

        ,
        adminPageList({commit}, data) {
            return new Promise((resolve, reject) => {
                adminPageList(data).then(response => {
                    commit('adminPageList',  response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            });
        },
        switchAdminAvailable({commit}, data) {
            return new Promise((resolve, reject) => {
                switchAdminAvailable(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        },

        listRolesByAvailable({commit}, param) {
            return new Promise((resolve, reject) => {
                listRolesByAvailable(param).then(response => {
                    commit('listRolesByAvailable', response.data)
                }).catch(error => {
                    reject(error)
                })
            });
        },
           
        
        changeAdminRoles({commit}, data) {
            return new Promise((resolve, reject) => {
                changeAdminRoles(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        },
        
        getSysRoleIdsByAdminId({commit}, params) {
            return new Promise((resolve, reject) => {
                getSysRoleIdsByAdminId(params).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        switchRoleAvailable({commit}, data) {
            return new Promise((resolve, reject) => {
                switchRoleAvailable(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        },
        deleteSysResourceById({commit}, id) {
            return new Promise((resolve, reject) => {
                deleteSysResourceById(id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        },
        updateSysResourceAvailableById({commit}, params) {
            return new Promise((resolve, reject) => {
                updateSysResourceAvailableById(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        }
        
    }
}

export default sysSetting
