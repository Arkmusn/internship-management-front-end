const apiUrl = '/api';

export default {
  login: {
    signIn: apiUrl + '/login/signIn',
    signOut: apiUrl + '/login/signOut',
  },
  department: {
    list: apiUrl + '/department/list'
  },
  teacher: {
    url: apiUrl + '/teacher/',
    'delete': apiUrl + '/teacher/delete',
    resetPassword: apiUrl + '/teacher/resetPassword',
  }
}