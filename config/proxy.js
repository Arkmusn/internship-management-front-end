'use strict'
module.exports = {
  '/api': {
    target: 'http://localhost:8080',
    pathRewrite: {
      '^/api': ''
    },
    logLevel: 'debug'
  }
}
