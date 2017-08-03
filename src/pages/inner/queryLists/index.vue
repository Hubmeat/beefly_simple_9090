<template>
  <div class="queryLists">
    <h3>
      <button class="btn_list" @click="handeClick">查看统计图</button>
    </h3>
    <div>
      <!-- <table>
        <thead>
          <tr>
            <th>消费时间</th>
            <th>消费单数</th>
            <th>消费盈利</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key='list.id' v-for="list in lists">
            <td>{{list.time}}</td>
            <td>{{list.totalBill}}</td>
            <td>￥{{list.money}}</td>
          </tr>
        </tbody>
      </table>
      <div class="datashow" v-show="noDate">
        <p>暂无数据</p>
      </div> -->
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
    </div>

		<div id="earD_page">
			<div class="M-box">
			</div>
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
  padding: 20px 30px 20px 30px;
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
      loading2: false
    }
  },
  methods: {
    handeClick () {
      this.$router.push('/index/incomingRank/queryCharts?type=' + this.$route.query.type)
    },
    dataUpdate () {
      // var flag = true
      // if (this.$route.query.type === undefined) {
      //   return
      // } else if (flag === true) {
        request
          .post(host + 'franchisee/revenue/getRevenueSort')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            type: this.$route.query.type
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(JSON.parse(res.text).list)
              var arr = JSON.parse(res.text).list
              var pageNumber = JSON.parse(res.text).totalPage
              // 设置data分页
              this.pageTotal = pageNumber
              $('.M-box').pagination({
                pageCount: pageNumber,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '«',
                nextContent: '»'
              })
              var newArr = []
              for (var i = 0; i < arr.length; i++) {
                var obj = {}
                obj.allianceArea = arr[i].area
                obj.orderNum = arr[i].totalBill
                obj.totalBill = arr[i].money
                obj.couponAmount = arr[i].couponAmount
                obj.userPayAmount = arr[i].userPayAmount
                newArr.push(obj)
              }
              // console.log(newArr)
              this.$store.dispatch('consumeData_action', {newArr})
              this.lists = this.$store.state.consumeData
            }
          })
      // } else {
      //   return
      // }
    },
    getDateMount () {
      request
        .post(host + 'franchisee/revenue/getRevenueSort')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          type: this.$route.query.type
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            console.log(JSON.parse(res.text).list)
            var arr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            // 设置data分页
            this.pageTotal = pageNumber
            $('.M-box').pagination({
              pageCount: pageNumber,
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '尾页',
              prevContent: '«',
              nextContent: '»'
            })
            var newArr = []
            for (var i = 0; i < arr.length; i++) {
              var obj = {}
              obj.allianceArea = arr[i].area
              obj.orderNum = arr[i].totalBill
              obj.totalBill = arr[i].money
              obj.couponAmount = arr[i].couponAmount
              obj.userPayAmount = arr[i].userPayAmount
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
          request
            .post(host + 'franchisee/revenue/getRevenueSort')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              type: 4,
              start: this.$store.state.timeline.newObj.time1,
              end: this.$store.state.timeline.newObj.time2
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
              } else {
                // console.log(JSON.parse(res.text))
                if (JSON.parse(res.text).list.length === 0) {
                  this.lists = ''
                } else {
                    var arr = JSON.parse(res.text).list
                    var newArr = []
                    for (var i = 0; i < arr.length; i++) {
                      var obj = {}
                      obj.allianceArea = arr[i].area
                      obj.orderNum = arr[i].totalBill
                      obj.totalBill = arr[i].money
                      obj.CouponAmount = arr[i].CouponAmount
                      obj.UserPayAmount = arr[i].UserPayAmount
                      newArr.push(obj)
                    }
                    this.$store.dispatch('consumeData_action', {newArr})
                    this.lists = this.$store.state.consumeData
                  }
                }

            })

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
  // created () {
  //   this.dataUpdate()
  // },
  beforeMount () {
    this.time()
  },
  watch: {
    '$route': 'dataUpdate',
    '$store.state.timeline': 'time'
  }
}
</script>
