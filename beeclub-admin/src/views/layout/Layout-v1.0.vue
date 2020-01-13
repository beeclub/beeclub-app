<template>
  <div class="app-wrapper" style="height:100%;">
    <el-container style="height:100%;padding:0;margin:0;">
      <el-header height="80px" class="main-header" style=" font-size: 12px">
        <el-container>
          <div
            :class="[isCollapse ? 'collapse-logo-container' : 'no-collapse-logo-container','logo-container']"
          >
            <div class="collapse-logo" v-show="true">Bee</div>
          </div>
          <el-container class="header-wrapper" style="position:relative;">
            <el-header height="46px" style="border-bottom:1px solid #f2f2f2;line-height:46px;">
              <el-container direction="horizontal" style="justify-content: space-between;">
                <div>
                  <i
                    :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold','toggle-fold']"
                    @click="collapseStatus"
                    style="font-size:18px;cursor: pointer;"
                  ></i>
                </div>
                <div>
                  <el-dropdown @command="handleCommand">
                    <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
                    <span class="" style="cursor: pointer;">
                      {{userInfo.name || '管理员'}}
                      <el-avatar
                        style="vertical-align: middle;"
                        :size="'small'"
                        :src="circleUrl"
                        fit="fill"
                      ></el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="admin">个人信息</el-dropdown-item>
                      <el-dropdown-item command="feedback">反馈信息</el-dropdown-item>
                      <el-dropdown-item command="logout" divided icon="el-icon-switch-button">注销</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-container>
            </el-header>
            <el-container class="nav-container" style="justify-content: space-between;">
              <el-scrollbar class="el-scrollbar-no-x" style="height:100%;width:100%;box-sizing:border-box;">
                <!-- <span class="nav-item">
                  23423fadfasdfas
                  <i class="el-icon-close"></i>
                </span>
                <span class="nav-item active">
                  23423fadfa德国士大夫敢死队风格第三个豆腐干大师傅sdfas
                  <i class="el-icon-close"></i>
                </span>-->
                <!-- <span v-for="(nav, index) in navs" :class="[nav.index == activeNavIndex ? 'active': '','nav-item']" :key="index">
                  {{nav.title}}
                  <i class="el-icon-close"></i>
                </span>-->
              </el-scrollbar>
            </el-container>
          </el-container>
        </el-container>
      </el-header>
      <el-container style="position:absolute;top:80px;bottom:0;left:0;right:0;">
        <el-aside width="auto" style="height:100%;background-color:#2F4050;color:#fff;">
          <BeeMenu :menus="menus" :isCollapse="isCollapse"/>
        </el-aside>
        <el-container>
          <el-main class="main-container">
            <el-scrollbar class="el-scrollbar-no-x" style="height:100%;" >
              <transition name="fade-transform" mode="out-in">
                <!-- :exclude="notCachedViews" -->
                <keep-alive>
                  <!-- :key="key" -->
                  <router-view/>
                </keep-alive>
              </transition>
            </el-scrollbar>
          </el-main>
          <!-- <el-footer height="30px" style>by hao.huang in 2019</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!-- #AAB0C0
  #00B9B2-->
</template>

<script>
import { mapState, mapActions } from "vuex";
import { constants } from "fs";
import { removeToken } from "@/utils/auth";
import BeeMenu from "./components/BeeMenu";
export default {
  name: "Laout",
  components: {
    BeeMenu
  },
  computed: {
    ...mapState({
      menus: state => state.user.menus,
      userInfo: state => state.user.userInfo
    })
    // ,

    // menus() {
    //   const menus = JSON.parse(localStorage.getItem("menus"));
    //   return menus;
    // }
  },
  data() {
    return {
      isCollapse: true,
      collapseTransition: true,
      circleUrl: "http://pyl5xaa6y.bkt.clouddn.com/default-avatar.jpg"
      // navs: [
      //   {
      //     index: "/",
      //     title: "首页"
      //   }
      // ],
      // activeNavIndex:'/'
    };
  },
  created() {
    const menus = this.menus;
    console.log(menus);
    console.log(JSON.parse(localStorage.getItem("menus")));
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo", "logout"]),
    // activeNav:function(index){
    //   this.activeNavIndex =  index ? index : '/'
    // },
    collapseStatus() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      var _this = this;
      if (!command) {
        return;
      }
      switch (command) {
        case "logout":
          this.$confirm("是否注销?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _this.logout().then(data => {
                if (data.code == 0) {
                  window.location.reload();
                  this.$message({
                    type: "success",
                    message: "注销成功!"
                  });
                }
              });
              // this.$route.to('/');
            })
            .catch(() => {
              console.log("取消了注销");
              // this.$message({
              //   type: "info",
              //   message: "已取消删除"
              // });
            });

          break;
        case "admin":
          this.$router.push('/admin')
          break;
        default:
          this.$message("click on item " + command);
          break;
      }
    }
  }
};
</script>

<style>
.main-header {
  /* background-color: #f2f2f2; */
  /* #1DD39A; */
  /* #09AAFF; */
  /* #b3c0d1; */
  color: #333;
  /* line-height: 60px; */
}

.el-aside {
  color: #333;
}

.el-menu {
  border-right: none;
}

.el-submenu__title i {
  color: #ffffff;
}
.el-menu-item i {
  color: #ffffff;
}

.logo-container {
  height: 100%;
  background-color: #2f4050;
}
.collapse-logo-container {
  width: 64px;
  -webkit-transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
}
.el-menu-vertical-menu:not(.el-menu--collapse) {
  /* width: 240px; */
  /* width: 194px; */
  width: 210px;
}
.no-collapse-logo-container {
  width: 210px;
  /* width: 240px; */
  /* width: 194px; */
  /* transition: .5s; */
  /* -moz-transition: width .5s; Firefox 4
-webkit-transition: width .5s; Safari 和 Chrome
-o-transition: width .5s; Opera */
  -webkit-transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
}
.main-header {
  padding: 0;
}
.main-header > .el-container {
  padding: 0;
  margin: 0;
}

.collapse-logo {
  height: 100%;
  width: 100%;
  line-height: 80px;
  text-align: center;
  font-size: 26px;
  color: #ffffff;
  -webkit-transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
}
/* .no-collapse-logo{
  height: 60px; width: 240px; line-height: 60px; text-align: center; font-size: 16px; color: #ffffff;
  -webkit-transition: .3s width ease-in-out,.3s padding-left ease-in-out,.3s padding-right ease-in-out;
	transition: .3s width ease-in-out,.3s padding-left ease-in-out,.3s padding-right ease-in-out;
} */
.header-wrapper {
  /* line-height: 60px; */
}
.toggle-fold:hover {
  color: #00b9b2;
}
.el-footer {
  /* background-color: #f2f2f2; */
  line-height: 30px;
  text-align: center;
  color: #aab0c0;
  font-size: 12px;
}
.el-breadcrumb {
  padding-left: 20px;
  display: inline-flex;
  display: -ms-inline-flexbox, display：-webkit-inline-flex;
  align-items: center;
}

.nav-container {
  border-bottom: 1px solid #e8e8e8;
  overflow: hidden;
  position: absolute;
  top: 47px;
  left: 0;
  right: 0;
  bottom: 0;
  white-space: nowrap;
}
.nav-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 24px 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
}
.nav-item > .el-icon-close {
  display: inline-block;
  position: absolute;
  right: 4px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}
.nav-item > .el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}
.nav-item.active {
  background-color: #00b9b2;
  /* #42b983; */
  color: #fff;
  border-color: #00b9b2;
}

.nav-item.active:before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}

.el-main {
  margin: 0;
  padding: 0;
}
/* .el-menu--collapse  */
.el-submenu__title:hover {
  background-color: #00b9b2 !important;
  color: #ffffff !important;
  /* #1dd39a */
}
/* .el-menu--collapse  */
.el-menu-item:hover {
  background-color: #00b9b2 !important;
  color: #ffffff !important;
}
</style>