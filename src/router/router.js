import Vue from "vue";
import Router from "vue-router";

import Login from "@/module/Login";
import Manage from "@/module/Manage";

import AdminNavigator from "@/components/navigator/AdminNavigator";
import TeacherNavigator from "@/components/navigator/TeacherNavigator";
import StudentNavigator from "@/components/navigator/StudentNavigator";

import Announcement from "@/components/manage/admin/Announcement";
import StudentManage from "@/components/manage/admin/Student";
import TeacherManage from "@/components/manage/admin/Teacher";

import TeacherInternship from "@/components/manage/teacher/Internship";
import StudentInternship from "@/components/manage/student/Internship";


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
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
            }, {
              path: 'student',
              component: StudentManage
            }, {
              path: 'teacher',
              component: TeacherManage
            }
          ]
        }, {
          path: 'teacher',
          component: TeacherNavigator,
          children: [
            {
              path: 'internship',
              component: TeacherInternship
            }
          ]
        }, {
          path: 'student',
          component: StudentNavigator,
          children: [
            {
              path: 'internship',
              component: StudentInternship
            }
          ]
        }
      ]
    }
  ]
})
