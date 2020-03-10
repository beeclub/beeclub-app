<template>
    <el-scrollbar class="el-scrollbar-no-x" style="height:100%;">
        <el-menu
            :collapse="isCollapse"
            :collapse-transition="true"
            :default-active="defaultActive"
            class="el-menu-vertical-menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#2F4050"
            text-color="#FFFFFF"
            active-text-color="#00B9B2"
            :router="true"
            menu-trigger="click"
            @select="handleSelect"
        >
            <!-- <BeeMenuItem v-for="route in menus" :key="route.id" :item="route"/> -->
            <template v-for="route in menus">
                <el-menu-item v-if="!route.children" :index="route.uri" :key="route.id">
                    <i v-if="route.icon" :class="route.icon"></i>
                    <span slot="title">{{route.name}}</span>
                </el-menu-item>
                <el-submenu popper-append-to-body v-else :index="route.id + ''" :key="route.id">
                    <template slot="title">
                        <i v-if="route.icon" :class="route.icon"></i>
                        <span slot="title">{{route.name}}</span>
                    </template>
                    <BeeMenuItem
                        v-for="item in route.children"
                        :key="item.id"
                        :item="item"
                        :path="item.uri"
                    />
                </el-submenu>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script>
import BeeMenuItem from "./BeeMenuItem";
import { mapState, Store } from "vuex";
export default {
  name: "BeeMenu",
  components: {
    BeeMenuItem
  },
  computed: {
    // menus() {
    //   const menus = JSON.parse(localStorage.getItem("menus"));
    //   return menus;
    // }
    //   ...mapState({
    //       menus: store => store.user.menus
    //   })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index, indexPath ,vnode){
      // for()
      // this.activeNav(index);
      // this.navs.push({index:index, title:'test'});
      console.log('handleSelect:==>',index, indexPath)
      console.log(arguments)
      console.log(vnode.$el.textContent)
      const currentNav = {id: index, path: indexPath, title: vnode.$el.textContent};
      console.log(currentNav)

    }
  },
  data() {
    return {
      collapseTransition: true
      // permission_routes: [
      //   { path: "dashboard", title: "首页", icon: "el-icon-s-home" },
      //   {
      //     path: "",
      //     title: "系统设置",
      //     icon: "el-icon-setting",
      //     children: [
      //       { path: "", title: "管理员管理", icon: "" },
      //       { path: "", title: "角色管理", icon: "" },
      //       { path: "", title: "权限管理", icon: "" }
      //     ]
      //   }
      // ]
    };
  },
  props: ["isCollapse", "menus","defaultActive"]
};
</script>

<style>
.el-submenu__title{
  font-size: 10px;
}
.el-submenu__icon-arrow{
  font-size: 8px;
}
.el-submenu__title > span[slot=title]{
  font-size: 14px;
}
/* .el-submenu__icon-arrow{
  font-size: 10px;
} */
</style>

