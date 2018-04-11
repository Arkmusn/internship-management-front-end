<template>
  <div id="login"
       class="full-height">
    <el-row type="flex"
            justify="center">
      <el-col :span="4"
              class="text-box">
        <span class="title-font">实习就业管理系统</span>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center">
      <el-col :span="4">
        <div class="form-container">
          <el-form label-width="60px"
                   :model="form"
                   ref="form"
                   class="form-box">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password"
                        v-model="form.password"
                        @keyup.enter.native="clickLogin"></el-input>
            </el-form-item>
            <div class="flex-container login-container">
              <el-button type="primary"
                         class="line-button"
                         @click="clickLogin">登录
              </el-button>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: 'login',
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      clickLogin() {
        this.$axios({
          method: 'post',
          url: this.$api.login.signIn,
          data: Qs.stringify(this.form),
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(data => {
          localStorage.setItem('user', JSON.stringify(data));
          const role = data.roles[0].name;
          this.$router.push('./manage/' + role);
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '账号或密码错误',
          })
        });
      }
    }
  }
</script>

<style scoped>
  .line-button {
    width: 90%;
    margin: 0 auto;
  }
  .login-container {
    justify-content: center;
  }
  .title-font {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    font-size: 1.5em;
    font-weight: 600;
  }
  .text-box {
    margin-top: 45vh;
    text-align: center;
  }
  .form-box {
    margin: 10px;
  }
</style>
