import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import sysSetting from './modules/sysSetting'
import course from './modules/course'
import system from './modules/system'
import sem from './modules/sem';
import organization from './modules/organization/organization'
import configuration from './modules/configuration'
import courseMaster from './modules/course/courseMaster'


Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        system,
        user,
        sysSetting,
        course,
        sem,
        organization,
        configuration,
        courseMaster
    },
    getters
})

export default store
