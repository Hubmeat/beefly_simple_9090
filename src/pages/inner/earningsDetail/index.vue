<template>
  <div style="margin-right:20px;">
    <div id="earD_header">
      <div class="earD_con" style="margin-top: 10px;">
        <div>
          <el-row class="city">
            <address class="joinArea">加盟区域：</address>
            <div class="citys">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.cityId' v-for="item in cityList">{{item.cityName}}</span>
            </div>
          </el-row>
        </div>
        <div class="time_earning">
          <el-button @click='getDailyDate' v-bind:class="{active: isDay}">今日</el-button>
          <el-button @click='getWeekDate' v-bind:class="{active: isWeek}">本周</el-button>
          <el-button @click='getMonthDate' v-bind:class="{active: isMonth}">本月</el-button>
          <el-button @click='getAllDate' v-bind:class="{active: AllTime}">所有日期</el-button>
          <el-button @click='handleChangeType' v-bind:class="{active: spceTime}">指定时间段</el-button>
        </div>
        <el-date-picker v-model="timeLine" style="vertical-align: top;margin-top: 3px;" v-show="show" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
        </el-date-picker>
        <el-button v-show="show2" class="earning_btn" @click="searchByTimeLine">查询</el-button>        
      </div>
		</div>

		<div id="earD_excel">
			<div id="earD_all">
				<h1>
          <el-tooltip class="item" effect="dark" content="所有车辆骑行收益" placement="bottom-end"> 
					  <p>合计：<span>30000元</span></p>
          </el-tooltip>
					<p @click='export_excel'>导出明细到Excel</p>
				</h1>
			</div>
		</div>
		<div id="earD_body">
        <el-table
        :data="tableData"    
        v-loading="loading2"
        element-loading-text="拼命加载中"
        style="width: 100%">
        <el-table-column
          prop="bikeCode"
          label="车牌编号"
          min-width="95"
          >
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="加盟地区"
          min-width="60"
          >
        </el-table-column>
        <el-table-column
          prop="placeOrderTime"
          min-width="110"
          label="下单时间">
        </el-table-column>
        <el-table-column
          prop="rideTime"
          label="骑行时间（分钟）"
          min-width="90"
        >
        </el-table-column>
        <el-table-column
          prop="rideMileage"
          label="骑行里程（公里）"
          min-width="85"
          >
        </el-table-column>
        <el-table-column
          prop="orderMoney"
          label="订单费用"
          min-width="60"
          >
        </el-table-column>
        <el-table-column
          prop="couponAmount"
          label="优惠券支付"
          min-width="60"
        >
        </el-table-column>
        <el-table-column
          prop="userPayAmount"
          label="实际收益（元）"
        >
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="pageShow"
        @size-change="handleSizeChange"
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
  #earD_header address {
    font-style: normal;
    display: inline;
    font-size: 14px;
    margin-left: 34px;
    margin-right: -7px;
  }

  #earD_header div.citys {
    display: inline-block;
    width: 1000px;
    vertical-align: top;
  }

  #earD_header span {
    cursor: pointer;
    font-size: 14px;
    display: inline;
    padding: 7px 5px 7px 5px;
    border: 1px solid transparent;
  }
  #earD_header span.active {
    border: 1px solid orange;
    border-radius: 4px;
  }

  /* 加盟商样式 */
    html,body,h1,h2,h3,h4,h5,h6,td,tr,th,table,thead,tbody,dl,dt,dd,p,span,ul,li,ol {
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }

    .loading_class {
      background: rgba(68,68,68,0.4);
    }

    #earD_header {
      /*width: 100%;*/
      min-height: 132px;
      line-height: 52px;
      background: #fff;
      border: 1px solid #e7ecf1;
    }

    .el-table td:nth-of-type(1) .cell {
      color: #f60;
    }

    #earD_header div.time_earning {
      display:block;
      float:left;
      margin-right: 8px;
      /* margin-top: 8px; */
      padding-left: 25px;
    }

    #earD_header div.time_earning button {
      margin-left: 8px;
      display: inline-block;
      border: 1px solid #ddd;
      outline: none;
      font-size: 12px;
      color: #666;
      /*background: rgba(66, 66, 66, 0.8);*/
      background: #fff;
      /*transition: all .2s linear 0s;*/
      box-sizing: border-box;
      height: 35px;
    }

    #earD_header div.time_earning button.active {
      /*background: rgb(66, 66, 66);*/
      background: rgba(	255,140,0, 0.8);
      color: #fff;
      border: 1px solid rgba(	255,140,0, 0.5);
    }

    /*#earD_header div.time_earning button:hover{color:#999;}*/

    #earD_excel {
      padding: 0px 30px 0px 30px;
      background:#fff;
      border: 1px solid #e7ecf1;
      border-bottom: none;
      margin-bottom: -10px;
      margin-top: 20px;
    }

    #earD_all {
      width: 100%;
      height: 40px;
      background: #fcfcd3;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    #earD_all h1 {
      width: 100%;
      line-height: 40px;
      height: 40px;
    }

    #earD_all h1 p:nth-of-type(1) {
      float: left;
      margin-left: 10px;
      font-size: 12px;
      color: #868671;
      cursor: pointer;
    }

    #earD_all h1 p:nth-of-type(2) {
      float: right;
      font-size: 12px;
      margin-right: 10px;
      color: #ff9900;
    }

    #earD_all h1 p:nth-of-type(2):hover {
      text-decoration: underline;
      cursor: pointer;
    }

    #earD_body {
      padding: 10px 20px 100px 20px;
      background: #fff;
      /*margin-top: 20px;*/
      padding-left: 28px;
      padding-right: 28px;
      border: 1px solid #e7ecf1;
      border-bottom: none;
      border-top: none;
    }

    #earD_body tr.el-table__row div.cell {
      color: #f60;
    }

    #earD_page {
      padding: 4px 10px 0 18px;
      padding-bottom: 100px;
      background: #fff;
      border: 1px solid #e7ecf1;
      border-top: none;
      min-height: 233px;
    }

    #earD_header .earning_btn {
      width: 80px;
      /*float: right;*/
      height: 36px;
      line-height: 11px;
      margin-right: 30px;
      color: #fff;
      margin-top: 11px;
      outline: none;
      border: none;
      /* border-radius: 4px; */
      background: rgba(52,52,67, 0.8);
    }

    #earD_header .earning_btn:hover {
        background: rgba(52,52,67, 0.9);
        color: #fff;
    }

    #earD_body .el-pagination {
      white-space: nowrap;
      padding: 2px 5px;
      color: #48576a;
      border: none;
      margin-top: 10px;
      margin-left: -5px;
      background: #fff;
      /* padding-left: 31px; */
      /* border-left: 1px solid #f3f3f5; */
    }
</style>

<script>
import $ from 'jquery'
import request from 'superagent'
import moment from 'moment'
import { siblings } from '../../../../utils/index.js'
// require('../../../assets/lib/js/exportExcel.js')
require('../../../assets/lib/js/Blob.js')
import '../../../assets/css/pagination.css'
require('../../../assets/lib/js/jquery.pagination.js')
import { host } from '../../../config/index.js'
export default {
  data () {
    return {
      tableData: [],
      timer: null,
      totalPage: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      timeLine: '',
      cityList: [],
      show: false,
      show2: false,
      loading2: false,
      pageShow: false,
      currentPage: 1,
      totalItems: 1,
      isDay:false,
      isWeek:false,
      isMonth:false,
      AllTime:false,
      spceTime:false,
    }
  },
  mounted () {
    this.getCityList()
    this.$router.push('/index/earningsDetail?type=0')

    this.getDate()
  },
  methods: {
    getDate () {
      if (this.$route.query.type === '0') {
        this.isDay = true
        this.isWeek = false
        this.isMonth = false
        this.AllTime = false
        this.spceTime = false
        this.show = false
        this.show2 = false
      } else if (this.$route.query.type === '1'){
        this.show = false
        this.show2 = false
        this.isWeek = true
        this.isDay = false
        this.isMonth = false
        this.AllTime = false
        this.spceTime = false
      } else if (this.$route.query.type === '2'){
        this.show = false
        this.show2 = false
        this.isMonth = true
        this.isWeek = false
        this.isDay = false
        this.AllTime = false
        this.spceTime = false
      } else if (this.$route.query.type === '3'){
        this.show = false
        this.show2 = false
        this.isMonth = false
        this.isWeek = false
        this.isDay = false
        this.AllTime = true
        this.spceTime = false
      } else {
        this.isMonth = false
        this.isWeek = false
        this.isDay = false
        this.AllTime = false
        this.spceTime = true
        this.show = true
        this.show2 = true
      }
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/order/findOrder4Admin')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': this.$route.query.type,
          'cityId': $('.citys span.active').attr('myId')
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            console.log(JSON.parse(res.text).data)
            // 表单Loading
            this.loading2 = false
            var totalPage = Number(JSON.parse(res.text).totalPage)
            var newArr = JSON.parse(res.text).data
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var arr2 = this.tableDataDel(newArr)
            this.$store.dispatch('earningsDate_action', { arr2 })
            this.tableData = this.$store.state.earningsDate.arr2
          }
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var startTime, endTime;
      if (this.timeLine === '') {
        startTime = ''
        endTime = ''
      } else {
        startTime = moment(this.timeLine[0]).format('YYYY-MM-DD HH:mm:ss')
        endTime = moment(this.timeLine[1]).format('YYYY-MM-DD HH:mm:ss')       
      }
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/order/findOrder4Admin')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          type: this.$route.query.type,
          cityId: $('.citys span.active').attr('myId'),
          pageNum: val,
          startTime: startTime,
          endTime: endTime
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            this.loading2 = false
            var totalPage = Number(JSON.parse(res.text).totalPage)
            var newArr = JSON.parse(res.text).data
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var arr2 = this.tableDataDel(newArr)
            this.$store.dispatch('earningsDate_action', { arr2 })
            this.tableData = this.$store.state.earningsDate.arr2
          }
        })
    },
    handleChangeType (e) {
      // console.log(e.currentTarget.innerText)  
      if (e.currentTarget.innerText === '指定时间段') {
        this.$router.push('/index/earningsDetail?type=4')
        this.show = true
        this.show2 = true
        this.spceTime = true
        this.isDay = false
        this.isMonth = false
        this.AllTime = false
        this.isWeek = false
        this.startTime = ' '
        this.endTime = ' '
      } else {
        //this.show = false
        //this.show2 = false
      }
    },
    export_excel () {
      this.$confirm('确认导出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        console.log('this is entry')
        require.ensure([], () => {
          var that = this
          that.$loading({customClass: 'loading_class'})
          setTimeout(() => {
            that.$loading({customClass: 'loading_class'}).close()
            const { export_json_to_excel } = require('../../../assets/lib/js/Export2Excel.js')
            const tHeader = ['车辆编号', '加盟地区', '下单时间', '骑行时间（分钟）', '骑行里程（公里)', '订单费用', '优惠卷支付', '实际收益（元）']
            const filterVal = ['bikeCode','cityName', 'placeOrderTime', 'rideTime', 'rideMileage', 'orderMoney', 'couponAmount', 'userPayAmount']
            var startTime, endTime;
            if (that.timeLine === '') {
              startTime = ''
              endTime = ''
            } else {
              startTime = moment(that.timeLine[0]).format('YYYY-MM-DD HH:mm:ss')
              endTime = moment(that.timeLine[1]).format('YYYY-MM-DD HH:mm:ss')       
            }
            request
              .post(host + 'beepartner/admin/order/exportOrders')
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                'type': that.$route.query.type,
                'cityId': $('.citys span.active').attr('myId'),
                'startTime': startTime,
                'endTime': endTime
              })
              .end((err, res) => {
                if (err) {
                  console.log('err:' + err)
                } else {
                  console.log(JSON.parse(res.text))
                  // 数据处理
                  var list = JSON.parse(res.text).data
                  var newList = that.tableDataDel(list)
                  if (list.length === 0) {
                    that.$message.error('当前查询没有信息，无法导出哦~');
                  } else {
                    const data = that.formatJson(filterVal, newList)
                    export_json_to_excel(tHeader, data, '列表excel')
                    that.$message({
                      type: 'success',
                      message: '导出成功'
                    })
                  }

                }
              })
          }, 1000)
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消'
        // })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.bikeCode = arr[i].bikeCode
        obj.cityName = arr[i].cityName
        obj.placeOrderTime = arr[i].placeOrderTime
        obj.rideTime = arr[i].rideTime
        obj.rideMileage = arr[i].rideMileage
        obj.orderMoney = arr[i].orderMoney
        obj.couponAmount = arr[i].couponAmount
        obj.userPayAmount = arr[i].userPayAmount
        arrDeled.push(obj)
      }
      return arrDeled
    },
    getDailyDate () {
      this.$router.push('/index/earningsDetail?type=0')
      this.getDate()
    },
    getWeekDate () {
      this.$router.push('/index/earningsDetail?type=1')
      this.getDate()
    },
    getMonthDate () {
      this.$router.push('/index/earningsDetail?type=2')
      this.getDate()
    },
    getAllDate () {
      this.$router.push('/index/earningsDetail?type=3')
      this.getDate()
    },
    searchByTimeLine () {
      if (this.timeLine === '') {
        this.$message({
          message: '请输入时间段',
          type: 'warning'
        })
      } else {
        var startTime = moment(this.timeLine[0]).format('YYYY-MM-DD HH:mm:ss')
        var endTime = moment(this.timeLine[1]).format('YYYY-MM-DD HH:mm:ss')
        console.log(startTime, endTime)
        this.loading2 = true
        request
          .post(host + 'beepartner/admin/order/findOrder4Admin')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'type': 4,
            'cityId': $('.citys span.active').attr('myId'),
            'startTime': startTime,
            'endTime': endTime,
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              this.loading2 = false
              var totalPage = Number(JSON.parse(res.text).totalPage)
              var newArr = JSON.parse(res.text).data
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              if (totalPage > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
              var arr2 = this.tableDataDel(newArr)
              this.$store.dispatch('earningsDate_action', { arr2 })
              this.tableData = this.$store.state.earningsDate.arr2
            }
          })
      }
    },
    handleClick (e) {
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')
      this.getDate()
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
            this.cityList = JSON.parse(res.text).data
          }
        })
    }
  }
}
</script>
