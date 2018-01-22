import {Message} from "element-ui";
import {Timer} from "../util/toolbox";

const HANDLERS = {
  '400': (resp) => {
    Message({type: 'error', message: '请求错误或服务器错误!'});
    console.log(resp);
  },
  '500': (resp, args) => {
    Message({type: 'error', message: '当前未登录或超时未操作,3秒后跳转到登录页'});
    Timer(3000).then(() => {
      const router = args[0].$router;
      router.push('/login');
    })
  },
};

export default function (resp, ...args) {
  let code = resp.data.code;
  if (HANDLERS[code]) {
    HANDLERS[code](resp, args);
  }
  else {
    Message({type: 'error', message: '未知错误!'});
    console.log(resp);
  }
}
