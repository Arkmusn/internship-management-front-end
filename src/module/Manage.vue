<template>
  <div id="manage">
    <el-container class="container">
      <el-header class="main-bgcolor">
        <el-row type="flex"
                justify="space-between"
                align="middle"
                class="full-height">
          <el-col :span="12"
                  class="title-font">
            实习就业管理系统
          </el-col>
          <el-col :span="12"
                  class="flex-container logout-box">
            <span class="plain-text username-box">{{ username }}</span>
            <el-button round
                       size="mini"
                       @click="logout">注销
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'manage',
    mounted() {

    },
    data() {
      return {}
    },
    computed: {
      username() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.username;
      },
    },
    methods: {
      logout() {
        this.$axios({
          url: this.$api.login.signOut,
          method: 'post',
        }).then(data => {
          localStorage.removeItem('user');
          this.$router.push('/login');
        }).catch(err => {
        })
      }
    },
  }
</script>

<style scoped>
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .logout-box {
    justify-content: flex-end;
    align-items: center;
  }
  .plain-text {
    color: #FFFFFF;
  }
  .username-box {
    margin-right: 5px;
  }
  .title-font {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    font-size: 1.5em;
    font-weight: 600;
    color: #ecf5ff;
  }
</style>
