import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'


// localStorage.setItem('userinfo', '[]')

// function assignRouter() {
//   var userInfo = localStorage.getItem('userinfo') || '[]'
//   console.log(userInfo)
//   console.log(JSON.parse(userInfo))
//   // var _index = null
//   var arr = []
//   JSON.parse(userInfo).map( (auth)=>{
//     routeConfig[3].children.map((item)=>{
//           if(auth*1 === item.auth){
//               arr.push(item)
//            }
//       })
//   })
//  routeConfig[3] = Object.assign({},routeConfig[3],{children:arr})
//  routeConfig.splice(3,1, routeConfig[3])
// //console.log(routeConfig)
// }

Vue.use(Router)
export default new Router({
  routes: routeConfig,
  mode: 'history',
  mounted () {
    this.assignRouter()
  },
  methods: {
  assignRouter() {
      var userInfo = localStorage.getItem('userinfo') || '[]'
      console.log(userInfo)
      console.log(JSON.parse(userInfo))
      // var _index = null
      var arr = []
      JSON.parse(userInfo).map( (auth)=>{
        routeConfig[3].children.map((item)=>{
              if(auth*1 === item.auth){
                  arr.push(item)
               }
          })
      })
      routeConfig[3] = Object.assign({},routeConfig[3],{children:arr})
      routeConfig.splice(3,1, routeConfig[3])
      //console.log(routeConfig)
    }
  }
})
