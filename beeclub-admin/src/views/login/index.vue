<template>
  <div class="login-container">
    <div class="login-wrapper">
      <h3>Bean Club后台管理系统</h3>
      <el-form ref="loginForm" :model="loginForm" autocomplete="on" label-position="left">
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            name="email"
            type="text"
            auto-complete="on"
            placeholder="登录帐号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="passowrdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="登录密码"
            @keyup.enter.native="loginHandler"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click.native.prevent="loginHandler"
          >登陆</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <p>&copy; 2019 by huanghao</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { setToken} from '@/utils/auth';
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "admin",
        password: "123"
      },
      passowrdType: "password",
      loading: false,
      refirect: undefined
    };
  },
  methods: {
    loginHandler() {
      this.loading = true;
      console.log("loginHandler");
      // setToken('123123');
      this.$store
        .dispatch("doLogin", this.loginForm)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: this.refirect || "/" });
        })
        .catch(() => {
          this.loading = false;
        });
      //this.$router.push({path: this.refirect || '/'});
      // setTimeout(function(){
      //     _this.loading = false;
      // },5000);
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
  background-color: #dcdfe6;
  display: flex;
  flex: 1;
}
.login-wrapper {
  position: relative;
  border-radius: 5px;
  padding: 20px;
  width: 440px;
  margin: auto;
  box-shadow: 0 12px 24px 0 rgba(28, 31, 33, 0.1);
  background-color: #ffffff;
}
.login-footer {
  text-align: center;
  color: #00b9b2;
}
</style>
