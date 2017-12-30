// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Router from "./router/router";
import "normalize.css";
import Axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Api from "../config/api";

Vue.use(ElementUI);

Vue.config.productionTip = false;

/**
 * 封装的请求处理
 * 可加入默认错误处理
 *
 * @param axiosOptions axios 属性
 * @returns {Promise}
 */
Vue.prototype.$axios = axiosOptions => {
  return new Promise((resolve, reject) => {
    Axios(axiosOptions)
      .then(resp => {
        if (resp.success === true) {
          resolve(resp.data);
        }
        else {
          // TODO 请求错误处理
          reject(resp.code);
        }
      })
      .catch(err => {
        // TODO 异常错误处理
        reject(err);
      })
  });
};
Vue.prototype.$api = Api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  template: '<App/>',
  components: {App}
});
