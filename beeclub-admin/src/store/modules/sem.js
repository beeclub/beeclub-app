import { semPromotionPageList } from '@/service/sem'

const sem = {
    state: {
        semPromotionPageList:{list:[], total:0,page:1,size:1,pages:1}
    },
    mutations: {
        semPromotionPageList :(state, data) => {
            state.semPromotionPageList = data;
        }
    },
    actions: {
        semPromotionPageList({commit}, params){
        return new Promise((resolve, reject) => {
            semPromotionPageList(params).then(response => {
                commit('semPromotionPageList',  response.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        });
      }
    }
  };
  
  export default sem;
  