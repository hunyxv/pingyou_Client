import axios from 'axios'

import util from '../util'
import { config } from '../store/config'

export const get = function (url, params) {
        return new Promise((resolve, reject) => {
                axios({
                        url: config.url.baseUrl + url,
                        method: 'get',
                        params: params,
                        headers: util.headers()
                })
                        .then(res => {
                                resolve(res)
                        })
                        .catch(e => {
                                reject(e)
                        })
        })
}
      
export const post = function (url, data) {
        return new Promise((resolve, reject) => {
                axios({
                        url: config.url.baseUrl + url,
                        method: 'post',
                        data: data,
                        headers: util.headers()
                })
                        .then(res => {
                                resolve(res)
                        })
                        .catch(e => {
                                reject(e)
                        })
        })
}
      
export const put = function (url, data) {
        return new Promise((resolve, reject) => {
                axios({
                        url: config.url.baseUrl + url,
                        method: 'put',
                        data: data,
                        headers: util.headers()
                })
                        .then(res => {
                                resolve(res)
                        })
                        .catch(e => {
                                 reject(e)
                        })
        })
}
      
export const delete_ = function (url) {
        return new Promise((resolve, reject) => {
                axios({
                        url: config.url.baseUrl + url,
                        method: 'delete',
                        headers: util.headers()
                })
                        .then(res => {
                                resolve(res)
                        })
                        .catch(e => {
                                reject(e)
                        })
        })
}