<template>
  <div class="app-wrapper" style="height:100%;">
    <el-container style="height:100%;padding:0;margin:0;">
      <el-header style="text-align: right; font-size: 12px">
        <button @click="collapseStatus">
          <i class="el-icon-d-arrow-right"></i>
        </button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-container style="position: absolute; top:60px;left:0;right:0;bottom:0;">
        <!--  -->
        <el-aside width="auto" style="height:100%;border-right: solid 1px #e6e6e6;background-color:#2F4050;color:#fff;">
          <el-scrollbar style="height:100%;">
            <el-menu
              :collapse="isCollapse"
              :collapse-transition="collapseTransition"
              class="el-menu-vertical-menu"
              @open="handleOpen"
              @close="handleClose"
              background-color="#2F4050"
              text-color="#fff"
              active-text-color="#00B9B2"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-message"></i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航三</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="3-1">选项1</el-menu-item>
                  <el-menu-item index="3-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="3-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="3-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <!--  -->
        <el-container>
          <el-main>main</el-main>
          <el-footer height="30px">footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Laout",
  data() {
    return {
      tableData: [],
      collapseBtnClick: false,
      isCollapse: true,
      collapseTransition: true
    };
  },
  methods: {
    collapseStatus() {
      this.collapseBtnClick = this.isCollapse;
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-menu {
  border-right: none;
}
.el-menu-vertical-menu:not(.el-menu--collapse) {
  width: 240px;
}
.el-submenu__title i {
    color: #ffffff;
}
</style>