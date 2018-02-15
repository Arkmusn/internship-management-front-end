const apiUrl = '/api';

export default {
  login: {
    signIn: apiUrl + '/login/signIn',
    signOut: apiUrl + '/login/signOut',
  },
  department: {
    list: apiUrl + '/department/list'
  },
  classInfo: {
    list: apiUrl + '/classInfo/list'
  },
  teacher: {
    url: apiUrl + '/teacher/',
    'delete': apiUrl + '/teacher/delete',
    resetPassword: apiUrl + '/teacher/resetPassword',
    queryTeacherByName: apiUrl + '/teacher/queryTeacherByName',
  },
  student: {
    url: apiUrl + '/student/',
    'delete': apiUrl + '/student/delete',
    resetPassword: apiUrl + '/student/resetPassword',
  },
  internship: {
    url: apiUrl + '/intern/',
    'delete': apiUrl + '/intern/delete',
  },
}
