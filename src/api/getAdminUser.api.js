import request from 'superagent'
import { host } from '../config/index.js'
export const getAllAdminUser = function(query, currentPage, cb) {
    request
        .post(host + 'franchisee/account/getAllAdminUser?page=' + currentPage + '&size=10')
        .withCredentials()
        .set({
            'content-type': 'application/x-www-form-urlencoded'
        })
        .send(query)
        .end(function(error, res) {
            cb(error, res)
        })
}