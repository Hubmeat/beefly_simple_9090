/**
 * 内网测试服务端口
 */
// export const host = 'http://192.168.3.7:7099/'

/**
 * 海波测试端口
 */
// export const host = 'http://192.168.3.78:7099/'
// export const host = 'http://192.168.3.77:8080/'

/**
 * 孙薇测试端口
 */
export const host = 'http://192.168.3.139:80/'
// export const host = 'http://192.168.3.139/'
/**
 * 公网测试端口
 */
// export const host  = 'http://47.92.136.117:7099/'


import axios from 'axios'

/**
 * 北京本机调试地址
 */
// export const host  = 'http://192.168.1.33:7099/'
// export const host  = 'http://192.168.1.19:7099/'


export var instance = axios.create({
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});