import { treeTable } from '@/service/organization/organization'
export default{
    treeTable({commit}, data){
        return new Promise((resolve, reject) => {
            treeTable(data).then(response => {
                commit('SET_TREE_TABLE', response.data)
                resolve()
            })
            .catch(error => {
                reject(error);
            })
        });
    }
}