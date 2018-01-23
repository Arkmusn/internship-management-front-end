<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  .main-bgcolor {
    background-color: #409EFF;
  }
  .second-bgcolor {
    background-color: #DCDFE6;
  }
  .flex-container {
    display: flex;
  }
  .form-container {
    border: 1px solid #DCDFE6;
    border-radius: 10px;
  }
  html, body {
    height: 100%;
  }
</style>
