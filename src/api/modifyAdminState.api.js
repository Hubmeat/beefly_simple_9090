import request from 'superagent'
import { host } from '../config/index.js'
export const modifyAdminState = function(query, cb) {
    request
        .post(host + 'franchisee/account/modifyAdminState')
        .withCredentials()
        .set({
            'content-type': 'application/x-www-form-urlencoded'
        })
        .send(query)
        .end(function(error, res) {
            cb(error, res)
        })
}