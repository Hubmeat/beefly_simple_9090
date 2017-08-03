import request from 'superagent'
import { host } from '../config/index.js'
export const delAccountByAdmin = function(query, cb) {
    request
        .post(host + 'franchisee/account/delAccountByAdmin')
        .withCredentials()
        .set({
            'content-type': 'application/x-www-form-urlencoded'
        })
        .send(query)
        .end(function(error, res) {
            cb(error, res)
        })
}