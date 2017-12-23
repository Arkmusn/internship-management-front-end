import Vue from "vue";
import Router from "vue-router";
import Login from "@/module/Login";
import Manage from "@/module/Manage";

import AdminNavigator from "@/components/navigator/AdminNavigator";

import Announcement from "@/components/manage/Announcement";
import StudentManage from "@/components/manage/Student";
import TeacherManage from "@/components/manage/Teacher";


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: [
        {
          path: 'admin',
          component: AdminNavigator,
          children: [
            {
              path: 'announcement',
              component: Announcement
            },
            {
              path: 'student',
              component: StudentManage
            },
            {
              path: 'teacher',
              component: TeacherManage
            }
          ]
        }
      ]
    }
  ]
})
