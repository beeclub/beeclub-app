import { create, update, coursePageData, getCourseDetail } from "@/service/course/courseMaster";

const courseMaster = {
  namespaced: true,
  state: {
    coursePageData:{total:0,list:[]}
  },
  mutations: {
      setCoursePageData: (state, data) =>{
          state.coursePageData = data;
      }
  },
  actions: {
    save({ commit }, data) {
      return new Promise((resolve, reject) => {
        if (data.id) {
          update(data).then(response => {
            resolve(response);
          });
        } else {
          create(data).then(response => {
            resolve(response);
          });
        }
      });
    },
    coursePageData({ commit }, data) {
      return new Promise((resolve, reject) => {
        coursePageData(data).then(response => {
            commit('setCoursePageData', response.data);
          resolve(response);
        });
      });
    },
    getCourseDatail({ commit }, id){
      return new Promise((resolve, reject) => {
        getCourseDetail(id).then(response => {
            resolve(response);
        });
      });
    }
  }
};

export default courseMaster;
