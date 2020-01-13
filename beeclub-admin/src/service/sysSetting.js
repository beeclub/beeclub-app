import http from '@/utils/http'
// import axios from 'axios'
import qs from 'qs';

export function resourceTreeTable(){
    console.log("resourceTreeTable")
    return http.get('/sysResource/treeTable');
}

export function saveResource(data){
    console.log(data)
    return http.post('/sysResource/save', qs.stringify(data));
}

export function queryRoleTable(){
    return http.get("/sysRole/queryList");
}


export function rolePageList(data){
    console.log(data)
    return http.get("/sysRole/pageList", {params: data});
}

export function saveRole(data){
    return http.post('/sysRole/save', qs.stringify(data));
}

export function rolePermissions(roleId){
    return http.get('/sysResource/rolePermissions',{params: {roleId: roleId}});
}

export function updateRolePermission(data){
    return http.post('/sysRole/updateRolePermission', qs.stringify(data));
}

export function deleteRoleById(id){
    return http.get('/sysRole/delete/' + id);
}

export function adminPageList(data){
    return http.get("/sysAdmin/pageList", {params: data});
}


export function switchAdminAvailable(data){
    return http.post("/sysAdmin/switchAvailable", qs.stringify(data));
}

export function changeAdminRoles(data){
    return http.post("/sysAdmin/changeAdminRoles", qs.stringify(data));
}

export function listRolesByAvailable(params){
    return http.get("/sysRole/listRolesByAvailable", {params});
}

export function getSysRoleIdsByAdminId(params){
    return http.get("/sysAdmin/getSysRoleIdsByAdminId/" + params.adminId);
}
export function switchRoleAvailable(params){
    return http.post("/sysRole/switchAvailable", qs.stringify(params));
}

export function deleteSysResourceById(id){
    return http.post("/sysResource/deleteById/" + id);
}

export  function updateSysResourceAvailableById(params){
    return http.get("/sysResource/updateAvailableById", {params});
}