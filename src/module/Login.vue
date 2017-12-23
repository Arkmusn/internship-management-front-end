<template>
  <div id="login">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="form-container">
          <el-form label-width="60px" :model="form" ref="form">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <div class="flex-container login-container">
              <el-button type="primary" class="line-button" @click="handleClickLogin">登录</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
    method: {
      handleClickLogin() {

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
</style>
