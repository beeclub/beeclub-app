import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/theme/index.css'
import './assets/style/base.css'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'


Vue.use(ElementUI)

import ElTreeSelect from 'el-tree-select';
Vue.use(ElTreeSelect);

import VCharts from 'v-charts'
Vue.use(VCharts)



const has = Vue.directive('hasPermission', {
  inserted: function (el, binding) {
    console.log('hasPermission')
    function checkPermission(val) {
      console.log(val)
      var permissionsStr = localStorage.getItem('permissions');
      const permissions = JSON.parse(permissionsStr)
      for (const permission of permissions) {
        if (permission === val) {
          return true
        }
      }
      return false
    }
    if (!checkPermission(binding.value)) {//判断是否有权限
      //el.parentNode.removeChild(el);
      console.log('无权操作')
    }
  }
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})//.$mount('#app')
