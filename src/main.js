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


Vue.prototype.$axios = axios

axios.defaults.withCredentials = true

var instance = axios.create({
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

Vue.config.productionTip = false
Vue.use(Element)

Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
})

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App),
    methods: {
        checkLogin() {
            // if(3>2) {
            //   this.$router.push('/index')
            // }else{
            //  this.$router.push('/')
            // }
            console.log('checkLogin')
        }
    },
    created() {
        this.checkLogin()
    },
    // watch: {
    //   '$route': 'checkLogin'
    // }
})