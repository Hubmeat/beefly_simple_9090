// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import './assets/font/iconfont.css'
import router from './router/index.js'
import store from './store/store'
import Vuex from 'vuex'
import axios from 'axios'
import { host } from './config/index.js'
import request from 'superagent'
import * as types from './store/mutation_types.js'

Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
})


Vue.use(Element)

let authList = window.sessionStorage.getItem('authList') 
let permission = window.sessionStorage.getItem('permission')

if (authList) {
  store.commit(types.ADD_MENU, JSON.parse(authList) )
  router.addRoutes(store.state.menus.items)  
}  

router.beforeEach((route, redirect, next) => {  
  if(route.path === '/login'){
    window.sessionStorage.removeItem('permission')
    window.sessionStorage.removeItem('authList')
    // store.state = [] 
    console.log(store)
    store.commit(types.ADD_MENU, []) 
  }
  let authList = window.sessionStorage.getItem('authList')
  if (!authList && route.path !== '/login') {  
    next({ path: '/login' })
  } else {
      console.log(route.name)
    if (route.name) {
      next()
        if (route.name === '首页') {
            return
        } else {
            if($('div.editcontainer')){
                console.log($('div.editcontainer').position())
                console.log($('div.editcontainer').offset().top)
                $("div.scrollArea").animate({scrollTop: $('div.editcontainer').position().top}, 1000);    
            }
        }
    } else {  
      next({ path: '/nofound' })  
    }  
  }  
})

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App),
    methods: {
        loginSignChange() {
            console.log(this.$store.state.loginSign)
            if (this.$store.state.loginSign === false) {
                this.$router.push('/login')
            } else {
                console.log('当前还在登录状态')
                return
            }
        },
        getCityList () {
            request
                .post(host + 'beepartner/admin/city/findCity')
                .withCredentials()
                .set({
                'content-type': 'application/x-www-form-urlencoded'
                })
                .send()
                .end((error, res) => {
                if (error) {
                    console.log('error:', error)
                } else {
                    if (JSON.parse(res.text).message === '用户登录超时') {
                        this.$router.push('/login')
                    } else {
                        return
                    }
                }
                })
        },
        // routerWay ()  {
        //     router.beforeEach((to, from, next) => {
        //     if (to.path == '/login') {
        //         sessionStorage.removeItem('user');
        //     }
        //     let user = JSON.parse(sessionStorage.getItem('user'));
        //     if (!user && to.path != '/login') {
        //         next({ path: '/login' })
        //     } else {
        //         next()
        //     }
        //     })
        // }
    },
    // beforeUpdate () {
    //     this.getCityList()
    // },
    // watch: {
    //     '$route': 'getCityList'
    // }
})