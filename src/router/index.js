import Vue from "vue";
import Router from "vue-router";
import Login from "@/module/Login";

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
