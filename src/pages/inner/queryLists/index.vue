<template>
  <div class="queryLists">
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
          label="实际收益（元)?"
          prop='userPayAmount'>
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
    padding: 20px 30px 10px 30px;
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
          'startTimeStr': this.$store.state.timeline.newObj.time1,
          'endTimeStr': this.$store.state.timeline.newObj.time2,
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
            this.lists = this.$store.state.consumeData
          }
        })
    },
    handeClick () {
      this.$router.push('/index/incomingRank/queryCharts?type=' + this.$route.query.type)
    },
    dataUpdate () {
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
            this.lists = this.$store.state.consumeData
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
            this.lists = this.$store.state.consumeData
          }
        })
    },
    time () {
      if (this.$store.state.timeline.length === 0) {
        return
      } else {
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
              'startTimeStr': this.$store.state.timeline.newObj.time1,
              'endTimeStr': this.$store.state.timeline.newObj.time2,
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
                this.lists = this.$store.state.consumeData
                }

            })

      }
    },
    checkLogin (res) {
      if (JSON.parse(res.text).message === '用户登录超时') {
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    if (this.$store.state.timeline.length === 0) {
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
    '$store.state.timeline': 'time'
  }
}
</script>
