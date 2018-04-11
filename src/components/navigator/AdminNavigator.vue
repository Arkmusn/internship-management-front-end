<template>
  <el-container id="adminNavigator"
                class="flex-container navigator-container">
    <el-aside class="navigator-container">
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="navigator-container"
        router>
        <el-menu-item index="/manage/admin/announcement">
          <i class="el-icon-setting"></i>
          <span slot="title">发布公告</span>
        </el-menu-item>
        <el-menu-item index="/manage/admin/teacher">
          <i class="el-icon-setting"></i>
          <span slot="title">教师信息管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/admin/student">
          <i class="el-icon-setting"></i>
          <span slot="title">学生信息管理</span>
        </el-menu-item>
        <el-menu-item index="/#">
          <i class="el-icon-setting"></i>
          <span slot="title">实习申报书管理</span>
        </el-menu-item>
        <el-menu-item index="/#">
          <i class="el-icon-setting"></i>
          <span slot="title">院系信息管理</span>
        </el-menu-item>
        <el-menu-item index="/#">
          <i class="el-icon-setting"></i>
          <span slot="title">班级信息管理</span>
        </el-menu-item>
        <el-menu-item index="/#">
          <i class="el-icon-setting"></i>
          <span slot="title">就业协议管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'adminNavigator',
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
