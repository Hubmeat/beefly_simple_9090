import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'

var user = sessionStorage.getItem('userinfo');
// if (user) {
//   user = JSON.parse(user);
// }
// var that = this;
// var menuData = JSON.parse(sessionStorage.getItem("userinfo"));
// that.$router.options.routes.forEach(function(item) {
// console.log(item)
//   menuData.forEach(function(menu) {
//     console.log(menu)
//   })
// })

// routeConfig[3].children.map( (item) => {
//   console.log(item.auth)
//   if (user.indexOf(item.auth) === -1) {
//     item.hidden = false
//   }
//   if (item.name === '报表管理') {
//     item.children.map( (list) => {
//       if (user.indexOf(list.auth) === -1) {
//         list.hidden = false
//       }
//     })
//   }
// })

Vue.use(Router)
export default new Router({
  routes: routeConfig,
  mode: 'history'
})
