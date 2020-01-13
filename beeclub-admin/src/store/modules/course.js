import {Message } from 'element-ui'
import  { 
    getCourseCategoryTreeTable,
    saveCourseCategory,
    deleteCourseCategoryById,
    updateCourseCategoryAvailableById
    } from '@/service/course.js'
const course = {
    state: {
        courseCategoryTreeTable:[],
        allCourseCategoryTreeTable:[]
    },
    mutations: {
        setCourseCategoryTreeTable:(state, data) => {
            state.courseCategoryTreeTable = data;
        },
        setAllCourseCategoryTreeTable:(state, data) => {
            state.allCourseCategoryTreeTable = data;
        }
        
    },
    actions: {
        getCourseCategoryTreeTable({commit}, data){
            return new Promise((resolve, reject) => {
                getCourseCategoryTreeTable(data).then(response => {
                    commit('setCourseCategoryTreeTable', response.data)
                    resolve()
                })
                .catch(error => {
                    reject(error);
                })
            });
        },
        getAllCourseCategoryTreeTable({commit}, data){
            return new Promise((resolve, reject) => {
                getCourseCategoryTreeTable({}).then(response => {
                    commit('setAllCourseCategoryTreeTable', response.data)
                    resolve(response.data);
                });
                // .catch(error => {
                //     reject(error);
                // })
            });
        },
        saveCourseCategory({commit}, params){
            return new Promise((resolve, reject) => {
                saveCourseCategory(params).then(response => {
                    resolve(response);
                });
            });
        },
        deleteCourseCategoryById({commit}, id){
            return new Promise((resolve, reject) => {
                deleteCourseCategoryById(id).then(response => {
                    resolve(response);
                });
            });
        },
        updateCourseCategoryAvailableById({commit}, params){
            return new Promise((resolve, reject) => {
                updateCourseCategoryAvailableById(params).then(response => {
                    resolve(response);
                });
            }).catch(error => {
                reject(error);
            });
        }
    }
}

export default course
