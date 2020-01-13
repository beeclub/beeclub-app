<template>
    <div class="navMenu">
        <label v-for="navMenu in navMenus" :key="navMenu.id">
            <el-menu-item
                v-if="navMenu.children"
            >
                <i :class="navMenu.icon"></i>
                <span slot="title">{{navMenu.title}}</span>
            </el-menu-item>
            <el-submenu
                v-if="navMenu.children"
                :index="navMenu.id"
            >
                <template slot="title">
                    <i :class="navMenu.icon"></i>
                    <span>{{navMenu.title}}</span>
                </template>
                <TestMenu :navMenus="navMenu.children"></TestMenu>
            </el-submenu>
        </label>
    </div>
</template>
<script>
 export default {
  name: 'TestMenu',
  props: ['navMenus'],
  data() {
   return {}
  },
  methods: {}
 }
</script>
 
<style scoped>
 
</style>