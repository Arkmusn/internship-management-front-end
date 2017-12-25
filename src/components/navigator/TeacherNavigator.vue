<template>
  <el-container id="teacherNavigator" class="flex-container navigator-container">
    <el-aside class="navigator-container">
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="navigator-container"
        router>
        <el-menu-item index="/manage/teacher/internship">
          <i class="el-icon-setting"></i>
          <span slot="title">实习信息管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'teacherNavigator',
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .navigator-container {
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
  .el-menu-item {
    width: 100%;
  }
</style>
