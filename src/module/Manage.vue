<template>
  <div id="manage">
    <el-container class="container">
      <el-header class="main-bgcolor"></el-header>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'manage',
    data() {
      return {}
    },
    methods: {}
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
</style>
