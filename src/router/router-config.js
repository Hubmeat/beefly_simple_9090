import login from '../pages/login/index.vue'
import index from '../pages/index/index.vue'
import pageIndex from '../pages/inner/pageIndex/index.vue'

// [ ====== carManager ====== ]
import carManager from '../pages/inner/carManager/index.vue'
import carUseDetail from '../pages/inner/carUseDetail/index.vue'

// [ ====== incomingRank ====== ]
import incomingRank from '../pages/inner/incomingRank/index.vue'
import queryCharts from '../pages/inner/queryCharts/index.vue'
import queryLists from '../pages/inner/queryLists/index.vue'

import incomingDetail from '../pages/inner/incomingDetail/index.vue'
import allDaysData from '../pages/inner/alldaysData/index.vue'
import hotMap from '../pages/inner/hotMap/index.vue'
import abnormalData from '../pages/inner/abnormalData/index.vue'

// [ ====== partnerManager ====== ]
import partnerManager from '../pages/inner/partnerManager/index.vue'
import addpartner from '../pages/inner/partnerManager/addpartner.vue'
import partnerDetail from '../pages/inner/partnerDetail/index.vue'
import vehicleDistribution from '../pages/inner/partnerManager/vehicleDistribution.vue'

import earningsDetail from '../pages/inner/earningsDetail/index.vue'

// [ ====== settlementRecord ====== ]
import settlementRecord from '../pages/inner/settlementRecord/index.vue'
import applyaccount from '../pages/inner/settlementRecord/applyaccount.vue'
import applysubmitted from '../pages/inner/settlementRecord/applysubmitted.vue'

// [ ====== accountManager ====== ]
import accountManager from '../pages/inner/accountManager/index.vue'
import addaccount from '../pages/inner/accountManager/addaccount.vue'
import addaccount2 from '../pages/inner/accountManager/addaccount2.vue'

// [ ====== memberCenter ====== ]
import memberCenter from '../pages/inner/memberCenter/index.vue'
import bindEamil from '../pages/inner/memberCenter/bindEamil.vue'
import updateEmail from '../pages/inner/memberCenter/updateEmail.vue'
import bindTel from '../pages/inner/memberCenter/bindTel.vue'
import updateTel from '../pages/inner/memberCenter/updateTel.vue'
import amendPassword from '../pages/inner/memberCenter/amendPassword.vue'


// [ ====== roleManager ====== ]
import roleManager from '../pages/inner/roleManager/index.vue'
import addrole from '../pages/inner/roleManager/addrole.vue'

import messageCenter from '../pages/inner/messageCenter/index.vue'

// [ ====== logManager ====== ]
import logManager from '../pages/inner/logManager/index.vue'
import loginlog from '../pages/inner/logManager/loginlog.vue'
import operationLog from '../pages/inner/logManager/operationLog.vue'

// [ ====== settlementManager ====== ]
import settlementManager from '../pages/inner/settlementManage/index.vue'

import NotFoundPage from '../pages/404/index.vue'

export default [
  // { path: '*', redirect: '/login' },
  { path: '*', component: NotFoundPage },
  {
    path: '/login',
    name: '登录',
    component: login
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '/',
        name: '首页',
        component: pageIndex,
        auth: 10
      },
      {
        path: '/index/partnerManager',
        name: '合伙人管理',
        component: partnerManager,
        auth: 20,
        children: [{
          path: '/index/partnerManager/addpartner',
          name: '添加合伙人',
          component: addpartner
        }]
      },
      {
        path: '/index/carManager',
        name: '车辆管理',
        component: carManager,
        auth: 30
      },
      {
        path: '/index/earningsDetail',
        name: '收益明细',
        component: earningsDetail,
        auth: 40
      },
      {
        path: '/index/incomingRank',
        name: '报表管理',
        component: incomingRank,
        auth: 50,
        children: [
          {
            path: '/',
            name: '查看列表',
            component: queryLists
          },
          {
            path: '/index/incomingRank/queryCharts',
            name: '查看统计图',
            component: queryCharts
          }
        ]
      },
      // {
      //   path: '/index/allDaysData',
      //   name: '24小时数据走势',
      //   component: allDaysData
      // },
      // {
      //   path: '/index/hotMap',
      //   name: '热力图',
      //   component: hotMap
      // },
      // {
      //   path: '/index/abnormalData',
      //   name: '异常数据',
      //   component: abnormalData
      // },
      {
        path: '/index/settlementManager',
        name: '结算管理',
        hidden: false,
        component: settlementManager,
        auth: 60
      },
      {
        path: '/index/memberCenter',
        name: '个人中心',
        auth: 70,
        component: memberCenter,
        children: [{
            path: '/index/memberCenter/bindEamil',
            name: '绑定邮箱',
            component: bindEamil
        }, 
        {
            path: '/index/memberCenter/updateEmail',
            name: '修改邮箱',
            component: updateEmail
        },
        {
            path: '/index/memberCenter/bindTel',
            name: '绑定手机号',
            component: bindTel
        }, 
        {
            path: '/index/memberCenter/updateTel',
            name: '修改手机号',
            component: updateTel
        }, 
        {
            path: '/index/memberCenter/amendPassword',
            name: '修改密码',
            component: amendPassword
        }]
      },
      {
        path: '/index/accountManager',
        name: '账号管理',
        auth: 80,
        component: accountManager,
        children: [{
          path: '/index/accountManager/addaccount',
          name: '添加平台账号',
          component: addaccount
        }, {
          path: '/index/accountManager/addaccount2',
          name: '添加加盟商账号',
          component: addaccount2
        }]
      },
      {
        path: '/index/roleManager',
        name: '角色管理',
        component: roleManager,
        children: [{
          path: '/index/roleManager/addrole',
          name: '添加角色',
          component: addrole
        }]
      },
      {
        path: '/index/vehicleDistribution/:id',
        name: '车辆分配',
        component: vehicleDistribution
      },
      {
        path: '/index/partnerDetail/:id',
        name: '加盟商明细',
        component: partnerDetail
      },
      {
        path: '/index/earningsDetail',
        name: '收入明细',
        component: earningsDetail
      },
      {
        path: '/index/settlementRecord',
        name: '结算记录',
        component: settlementRecord
      },
      {
        path: '/index/applyaccount',
        name: '申请结算(单月待结算)',
        component: applyaccount
      },
      {
        path: '/index/applysubmitted',
        name: '申请结算(结算状态)',
        component: applysubmitted
      },
      {
        path: '/index/messageCenter',
        name: '信息中心',
        component: messageCenter
      },
      // {
      //   path: '/index/logManager',
      //   name: '',
      //   component: logManager,
      //   children: [
      //     {
      //       path: '',
      //       name: '登录日志',
      //       component: loginlog
      //     },
      //     {
      //       path: '/index/logManager/operationLog',
      //       name: '操作日志',
      //       component: operationLog
      //     }
      //   ]
      // }
    ]
  },
  {
      path: '/carUseDetail',
      name: '车辆明细',
      component: carUseDetail
  },
]
