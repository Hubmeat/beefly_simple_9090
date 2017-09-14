<template>
  <div class="queryLists">
    <div v-show="notice" class="el-notification" style="top: 16px; z-index: 2000;">
      <i class="el-notification__icon el-icon-warning"></i>
      <div class="el-notification__group is-with-icon">
        <h2 class="el-notification__title">温馨提示</h2>
        <div class="el-notification__content">实际收益就是用户实际支付的金额，但不等于订单费用减去优惠券支付金额；优惠券支付的金额可能大于订单费用；例如某笔订单骑行费用是3元，然后用户可能是用5元的优惠券抵扣的。</div>
      </div>
    </div>
    <h3>
      <button class="btn_list" @click="handeClick">查看统计图</button>
    </h3>
    <div>
      <el-table
        :data="lists"
        v-loading="loading2"
        element-loading-text="拼命加载中"
        style="width: 100%">
        <el-table-column
          prop="allianceArea"
          label="加盟区域"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单数"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="totalBill"
          sortable
          label="订单总额"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="couponAmount"
          label="优惠卷支付总额">
        </el-table-column>
        <el-table-column
          min-width="80"
          label="实际收益（元)"
          prop='userPayAmount'
          :render-header="rendHeader">
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="pageShow"
        class="page_sort"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>
<style scoped>

  .datashow {
    /* width: 100%; */
    height: 60px;
    line-height: 60px;
    border: 1px solid #dfe6ec;
    border-top: none;
  }

  .datashow p {
    text-align: center;
    color: #5e7382;
  }

  div.queryLists h3 {
    text-align: right;
    margin-bottom: 15px;
  }

  div.queryLists {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #dfe6ec;
    padding: 20px 30px 800px 30px;
  }

  div.queryLists h3 button {
    margin-right: 0px;
    width: 137px;
  }

  div.queryLists table {
    border-collapse: collapse;
    width: 100%;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  div.queryLists table tr th {
    text-align: left;
    border: 1px solid #eee;
    height: 40px;
    font-size: 14px;
    background: #eee;
    font-weight: 400;
    color: #444;
  }

  div.queryLists table tr {
    border-bottom: 1px solid #eee;
    text-indent: 2em;
  }

  div.queryLists table tr td {
    text-align: left;
    /*border: 1px solid #dfe6ec;*/
    padding: 10px 0;
    color: #555;
    font-size: 14px;
  }

  #earD_page {
    padding: 14px 0px 0px 0px;
    background: #fff;
    /*border: 1px solid #e7ecf1;*/
    border-top: none;
    min-height: 233px;
    margin-left: -9px;
  }

  .btn_list {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    font-size: 14px;
    margin: 0;
    padding: 10px 15px;
    outline: none;
    border-radius: 4px;
  }

  .btn_list:hover {
    color: rgba(255,140,0, 0.8);
    border: 1px solid rgba(	255,140,0, 0.8);
  }


  .page_sort {
    white-space: nowrap;
    padding: 2px 5px;
    color: #48576a;
    background: #fff;
    margin-left: -5px;
    margin-top: 10px;
    border: none;
  }

  div.el-notification{right:-330px;}
</style>
<script>
import $ from 'jquery'
import request from 'superagent'
import moment from 'moment'
import '../../../assets/css/pagination.css'
require('../../../assets/lib/js/jquery.pagination.js')
import { host } from '../../../config/index.js'
export default {
  data () {
    return {
      notice: false,
      lists: [],
      pageTotal: '',
      noDate: false,
      loading2: false,
      currentPage: 1,
      pageShow: false,
      totalItems: 1,
      signForQuery: false
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/statistics/adminStatistics')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': this.signForQuery === true?'define':this.$route.query.type,
          'startTimeStr': this.$store.state.users.timeline.time1,
          'endTimeStr': this.$store.state.users.timeline.time2,
          'currentPage': val,
          'showType': 'table'
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            this.loading2 = false
            var arr = JSON.parse(res.text).data
            var totalPage = Number(JSON.parse(res.text).totalPage)
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newArr = [] 
            for (var i = 0; i < arr.length; i++) {
              var obj = {}
              obj.allianceArea = arr[i].cityName
              obj.orderNum = arr[i].totalBill
              obj.totalBill = arr[i].totalMoney
              obj.couponAmount = arr[i].totalDiscount
              obj.userPayAmount = arr[i].actualMoney
              newArr.push(obj)
            }
            this.$store.dispatch('consumeData_action', {newArr})
            this.lists = this.$store.state.users.consumeData
          }
        })
    },
    handeClick () {
      this.$router.push('/index/incomingRank/queryCharts?type=' + this.$route.query.type)
    },
    dataUpdate () {
      this.currentPage = 1
      this.signForQuery = false
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/statistics/adminStatistics')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': this.$route.query.type,
          'currentPage': 1,
          'showType': 'table'
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            this.loading2 = false
            var arr = JSON.parse(res.text).data
            var totalPage = Number(JSON.parse(res.text).totalPage)
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newArr = [] 
            for (var i = 0; i < arr.length; i++) {
              var obj = {}
              obj.allianceArea = arr[i].cityName
              obj.orderNum = arr[i].totalBill
              obj.totalBill = arr[i].totalMoney
              obj.couponAmount = arr[i].totalDiscount
              obj.userPayAmount = arr[i].actualMoney
              newArr.push(obj)
            }
            this.$store.dispatch('consumeData_action', {newArr})
            this.lists = this.$store.state.users.consumeData
          }
        })
    },
    getDateMount () {
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/statistics/adminStatistics')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': this.$route.query.type,
          'currentPage': this.currentPage,
          'showType': 'table'
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            this.loading2 = false
            var arr = JSON.parse(res.text).data
            var totalPage = Number(JSON.parse(res.text).totalPage)
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newArr = [] 
            for (var i = 0; i < arr.length; i++) {
              var obj = {}
              obj.allianceArea = arr[i].cityName
              obj.orderNum = arr[i].totalBill
              obj.totalBill = arr[i].totalMoney
              obj.couponAmount = arr[i].totalDiscount
              obj.userPayAmount = arr[i].actualMoney
              newArr.push(obj)
            }
            this.$store.dispatch('consumeData_action', {newArr})
            this.lists = this.$store.state.users.consumeData
          }
        })
    },
    time () {
      if (this.$store.state.users.timeline.length === 0) {
        return
      } else {
          this.currentPage = 1
          this.signForQuery = true
          this.loading2 = true
          request
            .post(host + 'beepartner/admin/statistics/adminStatistics')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              'type': 'define',
              'currentPage': 1,
              'startTimeStr': this.$store.state.users.timeline.newObj.time1,
              'endTimeStr': this.$store.state.users.timeline.newObj.time2,
              'showType': 'table'
            })
            .end((error, res) => {
              if (error) {
                this.loading2 = false
                console.log('error:', error)
              } else {
                this.checkLogin(res)
                this.loading2 = false

                var totalPage = Number(JSON.parse(res.text).totalPage)
                this.totalItems = Number(JSON.parse(res.text).totalItems)
                if (totalPage > 1) {
                  this.pageShow = true
                } else {
                  this.pageShow = false
                }
                
                var arr = JSON.parse(res.text).data
                var newArr = []
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.allianceArea = arr[i].cityName
                  obj.orderNum = arr[i].totalBill
                  obj.totalBill = arr[i].totalMoney
                  obj.couponAmount = arr[i].totalDiscount
                  obj.userPayAmount = arr[i].actualMoney
                  newArr.push(obj)
                }
                this.$store.dispatch('consumeData_action', {newArr})
                this.lists = this.$store.state.users.consumeData
                }

            })

      }
    },
    checkLogin (res) {
      if (JSON.parse(res.text).message === '用户登录超时') {
        this.$router.push('/login')
      }
    },
    mouseLeaveHandler() {
      $('div.el-notification').animate({ right: '-330px' }, 500, function() {
        this.notice = false
      })
    },
    mouseEnterHandler() {
      this.notice = true
      $('div.el-notification').animate({ right: '1px' }, 500)
    },
    rendHeader(h, { column, $index }) {
      return h('div', {
        class: {
          tips: true,
          cell: true
        },
        attrs: {
          style: 'background:#eee;margin-left:-20px;'
        }
      }, [
          h('span', '实际收益'),
          h('i', {
            class: {
              'icon iconfont icon-wenhao': true
            },
            attrs: {
              style: 'cursor:pointer;margin-left:10px;color:orange;font-size:18px;vertical-align:middle'
            },
            on: {
              mouseenter: this.mouseEnterHandler,
              mouseleave: this.mouseLeaveHandler
            }
          })
        ])
    }
  },
  mounted () {
    document.title = '蜜蜂平台管理——收益排行列表'
    if (this.$store.state.users.timeline.length === 0) {
      this.getDateMount()
    } else {
      return
    }
  },
  // // created () {
  // //   this.dataUpdate()
  // // },
  // beforeMount () {
  //   this.time()
  // },
  watch: {
    '$route': 'dataUpdate',
    '$store.state.users.timeline': 'time'
  }
}
</script>
