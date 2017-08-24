/**
 * 沈惨测试服务端口
 */
// export const host = 'http://192.168.3.7:8080/'
// export const host = 'http://192.168.0.106:8080/'

/**
 * 海波测试端口
 */
// export const host = 'http://192.168.3.78:7099/'
// export const host = 'http://192.168.3.77:8080/'
// export const host = 'http://192.168.3.85:8080/'
export const host = 'http://192.168.0.114:8080/'

/**
 * 孙薇测试端口
 */
// export const host = 'http://192.168.3.139:80/'
// export const host = 'http://192.168.3.139/'
/**
 * 公网测试端口
 */
// export const host  = 'http://47.92.136.117:7099/'
// export const host  = 'http://47.93.48.250:8090/'


import axios from 'axios'

/**
 * 北京本机调试地址
 */
// export const host  = 'http://192.168.1.33:7099/'
// export const host  = 'http://192.168.1.19:7099/'


export var instance = axios.create({
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});