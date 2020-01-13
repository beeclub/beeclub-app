<template>
  <div>
    <div class="nofound-header">Bee Club后台管理系统</div>
    <div class="nofound-container">
      <div class="nofound-wrapper">
        <span class="nofound-text">404</span>
      </div>

      <router-link :to="{path:'/dashboard',name:'dashboard'}" class="nofound-gohome">
        <el-button size="mini" type="primary" icon="el-icon-s-home">回到首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "noFound"
};
</script>

<style scoped>
.nofound-container {
  padding-top: 40px;
  width: 400px;
  margin: auto;
}
.nofound-header{
    padding-top: 40px;
  width: 600px;
  margin: auto;
}
.nofound-wrapper {
  display: inline-block;
}
.nofound-text {
  font-size: 120px;
  font-weight: 600;
  color: #e8e8e8;
  /* color: #eeeeee; */
}
.nofound-gohome {
  display: inline-block;
  margin-left: 20px;
}
</style>