import Vue from 'vue'
import axios from 'axios'

import { config } from '../store/config'

const headers = function () {
  return {
    Authorization: 'JWT ' + Vue.cookie.get('token')
  }
}

const me = function () {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url.baseUrl + config.url.me,
      method: 'get',
      headers: headers()
    })
    .then(res => {
      resolve(res)
    })
    .catch(e => {
      reject(e)
    })
  })
}

export default {
        headers,
        me,
}