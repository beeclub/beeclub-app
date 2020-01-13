import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
import Layout from '@/views/layout/Layout'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(Router)

export const asyncRouters = [
  {
    path: '/(dashboard)?',
    name:'dashboard',
    component: () => import('@/views/dashboard/index'),
    // 当菜单文件中没有该页面配置时，在标签栏显示的就是这里配置的标题
    meta: { title: '首页' }
  },
  // {
  //   path: '/',
  //   name:'dashboard',
  //   component: () => import('@/views/dashboard/index'),
  //   // 当菜单文件中没有该页面配置时，在标签栏显示的就是这里配置的标题
  //   meta: { title: '首页' }
  // },
  {
    path: 'adminManage',
    name: 'adminManage',
    component: () => import('@/views/setting/permission/AdminManage'),
    meta: {title: '管理员管理'}
  },
  {
    path: 'roleManage',
    name: 'roleManage',
    component: () => import('@/views/setting/permission/RoleManage'),
    meta: {title: '角色管理'}
  },
  {
    path: 'resourceManage',
    name: 'resourceManage',
    component: () => import('@/views/setting/permission/ResourceManage'),
    meta: {title: '权限管理'}
  },
  {
    path: 'admin',
    name: 'admin',
    component: () => import('@/views/system/Admin'),
    meta: {title: '个人信息'}
  },

  //课程管理
  {
    path:'courseCategory',
    name:'courseCategory',
    component: () => import('@/views/course/CourseCategory'),
    meta: {title: '课程类别'}
  },
  {
    path:'courseProperty',
    name:'courseProperty',
    component: () => import('@/views/course/CourseProperty'),
    meta: {title: '课程属性'}
  },
  {
    path:'courseMaster',
    name:'courseMaster',
    component: () => import('@/views/course/CourseMaster'),
    meta: {title: '课程管理'}
  },

  {
    path:'courseMasterEdit',
    name:'courseMasterEdit',
    component: () => import('@/views/course/CourseMasterEdit'),
    meta: {title: '编辑课程'}
  },
  
  {
    path:'courseAudit',
    name:'courseAudit',
    component: () => import('@/views/course/CourseAudit'),
    meta: {title: '课程审核'}
  },
  {
    path:'monitorDruid',
    name:'monitorDruid',
    component: () => import('@/views/setting/monitor/Druid'),
    meta: {title: 'druid监控'}
  },
  {
    path:'monitorService',
    name:'monitorService',
    component: () => import('@/views/setting/monitor/Service'),
    meta: {title: '服务监控'}
  },
  {
    path:'sysDict',
    name:'sysDict',
    component: () => import('@/views/setting/sys/Dict'),
    meta: {title: '字典管理'}
  },

  {
    path:'memberManage',
    name:'memberManage',
    component: () => import('@/views/member/MemberManage'),
    meta: {title: '会员管理'}
  },
  {
    path:'lecturerApply',
    name:'lecturerApply',
    component: () => import('@/views/member/LecturerApply'),
    meta: {title: '字典管理'}
  },
  {
    path:'promotionManage',
    name:'promotionManage',
    component: () => import('@/views/sem/PromotionManage'),
    meta: {title: '推广管理'}
  },
  {
    path:'lecturerCourseEdit',
    name:'lecturerCourseEdit',
    component: () => import('@/views/course/lecturer/LecturerCourseEdit'),
    meta: {title: '课程编辑'}
  },
  {
    path:'lecturerCourse',
    name:'lecturerCourse',
    component: () => import('@/views/course/lecturer/LecturerCourse'),
    meta: {title: '讲师课程'}
  },
  {
    path:'organization',
    name:'organization',
    component: () => import('@/views/setting/organization/Organization'),
    meta: {title: '组织管理'}
  },
  {
    path:'employee',
    name:'employee',
    component: () => import('@/views/setting/organization/Employee'),
    meta: {title: '员工管理'}
  },


  





  {path: '*', name:'404',meta:{title:'404'}, component: ()=> import('@/views/error/NoFound')}

  


  
  //,
  // {path: '*', component: ()=> import('@/views/error/404')}
]

export const routers = [
  {path: '/login', component: () => import('@/views/login/index')},
 
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: 'dashboard',
    children: [
      ...asyncRouters
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
})
