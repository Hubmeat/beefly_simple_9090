<template>
  <div style="margin-right:20px;">
    <div id="earD_header">
      <div class="earD_con" style="margin-top: 10px;">
        <div style="height:40px;">
          <el-row class="city">
            <address class="joinArea">加盟区域：</address>
            <div class="citys">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.areaID' v-for="item in cityList">{{item.area}}</span>
            </div>
          </el-row>
        </div>
        <div class="time_earning">
          <el-button @click='getDailyDate' class="active">今日</el-button>
          <el-button @click='getWeekDate'>本周</el-button>
          <el-button @click='getMonthDate'>本月</el-button>
          <el-button @click='getAllDate'>所有日期</el-button>
          <el-button @click='handleChangeType'>指定时间段</el-button>
        </div>
        <el-date-picker v-model="timeLine" style="vertical-align: middle; margin-top: 0px;" v-show="show" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
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
          prop="allianceArea"
          label="加盟地区"
          min-width="60"
          >
        </el-table-column>
        <el-table-column
          prop="orderDate"
          min-width="110"
          label="下单时间">
        </el-table-column>
        <el-table-column
          prop="placeOrderTime"
          label="骑行时间（分钟）"
          min-width="90"
        >
        </el-table-column>
        <el-table-column
          prop="journey"
          label="骑行里程（公里）"
          min-width="85"
          >
        </el-table-column>
        <el-table-column
          prop="money"
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
		</div>

		<div id="earD_page">
			<div class="M-box">
			</div>
		</div>
	</div>
</template>

<style scoped>
/* div.city {
   line-height: 30px; 
} */

/* #earD_header .city address {
  font-style: normal;
  display: inline;
  font-size: 14px;
}

#earD_header .city div.citys {
  display: inline-block;
}

#earD_header .city span {
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  padding: 5px;
  border: 1px solid transparent;
}

#earD_header .city span.active {
  border: 1px solid orange;
} */

#earD_header address {
  font-style: normal;
  display: inline;
  font-size: 14px;
  margin-left: 34px;
  margin-right: -7px;
}

#earD_header div.citys {
  display: inline-block;
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
    height: 126px;
    line-height: 52px;
    background: #fff;
    border: 1px solid #e7ecf1;
	}

  /*#earD_header .earD_con {
    background: #f3f0f0;
    padding: 10px;
  }*/

	/*#earD_header button {
		width: 100px;
    height: 30px;
		font-size: 12px;
    margin-right: 10px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
		outline: none;
    color: #878787;
    border: 1px solid #cecece;
    transition: all .2s linear 0s;
	}

	#earD_header button:nth-of-type(1) {
		margin-left: 30px;
	}*/

	/*#earD_header button:hover {
    background: rgb(66,66,66);
    border: 1px solid rgb(66,66,66);
		color: #fff;
	}*/

	/*#earD_header button.active {
    font-size: 12px;
    color: #fff;
    background: rgba(66,66,66, 0.8);
    border: 1px solid rgb(66,66,66);
	}*/

  .el-table td:nth-of-type(1) .cell {
    color: #f60;
  }

  #earD_header div.time_earning {
    display:block;
    float:left;
    margin-right: 8px;
    margin-top: 8px;
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
    padding: 10px 20px 10px 20px;
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
      margin-top: 18px;
      outline: none;
      border: none;
      /* border-radius: 4px; */
      background: rgba(52,52,67, 0.8);
  }

  #earD_header .earning_btn:hover {
      background: rgba(52,52,67, 0.9);
      color: #fff;
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
      loading2: false
    }
  },
  mounted () {
    this.getCityList()
    // console.log(this.$route.query)
    this.$router.push('/index/earningsDetail?type=getRevenueCurDayP')
    this.loading2 = true
    request
      .post(host + 'franchisee/revenue/getRevenueCurDayP')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
      .send({
        'franchiseeId': '123456',
        'userId': 'admin',
        'cityId': 0
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
        } else {
          // console.log(res)
          console.log(JSON.parse(res.text).list)
          var newArr = JSON.parse(res.text).list
          // 表单Loading
          this.loading2 = false
          var pageNumber = JSON.parse(res.text).totalPage
          this.totalPage = pageNumber
          var arr2 = this.tableDataDel(newArr)
          this.$store.dispatch('earningsDate_action', { arr2 })
          this.tableData = this.$store.state.earningsDate.arr2
          if (pageNumber > 1) {
            $('.M-box').pagination({
              pageCount: pageNumber,
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '尾页',
              prevContent: '«',
              nextContent: '»'
            })
          } else {
            $('.M-box').html('')
            return
          }
        }
      })

    // 点击切换查看类型
    $('#earD_header button').click('button', function () {
      $('button.active').removeClass('active')
      $(this).addClass('active')
    })
    var that = this
    $('.time_earning button').on('click', function (e) {
      that.handleChangeType(e)
    })
  },
  beforeUpdate () {
    var that = this
    $('.M-box').click('a', function (e) {
      // console.log(e)
      that.pageUpdate(e)
    })

    $('.citys span').on('click', function () {
      clearTimeout(that.timer2)
      var id = $(this).attr('myId')
      var type = that.$route.query.type
      this.loading2 = true
      that.timer2 = setTimeout(function () {
        request
          .post(host + 'franchisee/revenue/' + type)
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'cityId': id
          })
          .end((error, res) => {
            // console.log('this is entry')
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              var newArr = JSON.parse(res.text).list
              var pageNumber = JSON.parse(res.text).totalPage
              var arr2 = that.tableDataDel(newArr)
              that.totalPage = pageNumber
              // loading关闭
              that.loading2 = false
              that.$store.dispatch('earningsDate_action', { arr2 })
              that.tableData = that.$store.state.earningsDate.arr2
              if (pageNumber > 1) {
                $('.M-box').pagination({
                  pageCount: pageNumber,
                  jump: true,
                  coping: true,
                  homePage: '首页',
                  endPage: '尾页',
                  prevContent: '«',
                  nextContent: '»'
                })
              } else {
                $('.M-box').html('')
                return
              }
            }
          })
      }, 200)
    })
  },
  methods: {
    handleChangeType (e) {
      // console.log(e.currentTarget.innerText)  
      if (e.currentTarget.innerText === '指定时间段') {
        this.$router.push('/index/earningsDetail?type=getRevenueDefineP')    
        this.show = true
        this.show2 = true
      } else {
        this.show = false
        this.show2 = false
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
          this.$loading({customClass: 'loading_class'})
          var that = this
          setTimeout(() => { 
            that.$loading({customClass: 'loading_class'}).close()
            const { export_json_to_excel } = require('../../../assets/lib/js/Export2Excel.js')
            const tHeader = ['车辆编号', '加盟地区', '下单时间', '骑行时间（分钟）', '骑行里程（公里)', '订单费用', '优惠卷支付', '实际收益（元）']
            const filterVal = ['bikeCode','allianceArea', 'orderDate', 'placeOrderTime', 'journey', 'money', 'couponAmount', 'userPayAmount']
            var type = that.$route.query.type
            var newType
            switch (type) {
              case 'getRevenueCurDayP': {
                newType = 0
                break
              }
              case 'getRevenueCurWeekP': {
                newType = 1
                break
              }
              case 'getRevenueCurMonthP': {
                newType = 2
                break
              }
              case 'getAllRevenueP': {
                newType = 3
                break
              }
              default : {
                if (this.timeLine === '') {
                  this.$message({
                    message: '请输入时间段',
                    type: 'warning'
                  })
                } else {
                  newType = 4
                  var startTime = moment(this.timeLine[0]).format('YYYY-MM-DD HH:mm:ss')
                  var endTime = moment(this.timeLine[1]).format('YYYY-MM-DD HH:mm:ss')
                }
              }
            }
            request
              .post(host + 'franchisee/revenue/exportRevenueDataP?type=' + newType)
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                'account': {
                  'franchiseeId': '123456',
                  'userId': 'admin',
                  'cityId': $('.citys span.active').attr('myId')
                },
                'startTime': startTime,
                'endTime': endTime,
              })
              .end((err, res) => {
                if (err) {
                  console.log('err:' + err)
                } else {
                  console.log(res)
                  console.log(JSON.parse(res.text))
                  // 数据处理
                  var list = JSON.parse(res.text)
                  var newList = this.tableDataDel(list)
                  if (list.length === 0) {
                    this.$message.error('当前查询没有信息，无法导出哦~');
                  } else {
                    const data = this.formatJson(filterVal, newList)
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
        obj.allianceArea = arr[i].area
        obj.orderDate = moment(arr[i].chargeTime).format('YYYY-MM-DD HH:mm:ss')
        obj.placeOrderTime = Math.floor((arr[i].time) / 60000) + ' 分钟'
        obj.journey = arr[i].mileage
        obj.money = arr[i].money
        obj.couponAmount = arr[i].couponAmount
        obj.userPayAmount = arr[i].userPayAmount
        arrDeled.push(obj)
      }
      return arrDeled
    },
    getAllDate () {
      this.$router.push('/index/earningsDetail?type=getAllRevenueP')
      this.loading2 = true
      request
        .post(host + 'franchisee/revenue/getAllRevenueP')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': $('.citys span.active').attr('myId')
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            console.log(res)
            var newArr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            var arr2 = this.tableDataDel(newArr)
            // loading关闭
            this.loading2 = false
            this.totalPage = pageNumber
            this.$store.dispatch('earningsDate_action', { arr2 })
            this.tableData = this.$store.state.earningsDate.arr2
            if (pageNumber > 1) {
              $('.M-box').pagination({
                pageCount: pageNumber,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '«',
                nextContent: '»'
              })
            } else {
              $('.M-box').html('')
              return
            }
          }
        })
    },
    getMonthDate () {
      this.$router.push('/index/earningsDetail?type=getRevenueCurMonthP')
      this.loading2 = true
      request
        .post(host + 'franchisee/revenue/getRevenueCurMonthP')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': $('.citys span.active').attr('myId')
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            console.log(res)
            var newArr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            var arr2 = this.tableDataDel(newArr)
            // loading关闭
            this.loading2 = false
            this.totalPage = pageNumber
            this.$store.dispatch('earningsDate_action', { arr2 })
            this.tableData = this.$store.state.earningsDate.arr2
            if (pageNumber > 1) {
              $('.M-box').pagination({
                pageCount: pageNumber,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '«',
                nextContent: '»'
              })
            } else {
              $('.M-box').html('')
              return
            }
          }
        })
    },
    getDailyDate () {
      this.$router.push('/index/earningsDetail?type=getRevenueCurDayP')
      this.loading2 = true
      request
        .post(host + 'franchisee/revenue/getRevenueCurDayP')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': $('.citys span.active').attr('myId')
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            var newArr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            // loading 关闭
            this.loading2 = false
            var arr2 = this.tableDataDel(newArr)
            this.totalPage = pageNumber
            this.$store.dispatch('earningsDate_action', { arr2 })
            this.tableData = this.$store.state.earningsDate.arr2
            if (this.pagetotal > 1) {
              $('.M-box').pagination({
                pageCount: this.pagetotal,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '«',
                nextContent: '»'
              })
            } else {
              $('.M-box').html('')
              return
            }
          }
        })
    },
    getWeekDate () {
      this.$router.push('/index/earningsDetail?type=getRevenueCurWeekP')
      this.loading2 = true
      request
        .post(host + 'franchisee/revenue/getRevenueCurWeekP')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': $('.citys span.active').attr('myId')
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            var newArr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            var arr2 = this.tableDataDel(newArr)
            this.totalPage = pageNumber
            // loading关闭
            this.loading2 = false
            this.$store.dispatch('earningsDate_action', { arr2 })
            this.tableData = this.$store.state.earningsDate.arr2
            if (this.pagetotal > 1) {
              $('.M-box').pagination({
                pageCount: this.pagetotal,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '«',
                nextContent: '»'
              })
            } else {
              $('.M-box').html('')
              return
            }
          }
        })
    },
    pageUpdate (e) {
      var that = this
      clearTimeout(this.timer)
      if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
        if (e.target.innerHTML === '首页') {
          e.target.innerHTML = 1
        } else if (e.target.innerHTML === '尾页') {
          e.target.innerHTML = this.totalPage
        } else if (e.target.innerHTML === '«') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) - 1
        } else if (e.target.innerHTML === '»') {
          console.log($('.M-box span.active')[0].innerHTML)
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) + 1
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }
      var type = this.$route.query.type
      this.timer = setTimeout(function () {
        // loading打开
        that.loading2 = true
        request
          .post(host + 'franchisee/revenue/' + type + '?page=' + e.target.innerHTML)
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'cityId': $('.citys span.active').attr('myId')
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var arr2 = that.tableDataDel(pagedata)
              that.loading2 = false
              that.$store.dispatch('earningsDate_action', { arr2 })
              that.tableData = that.$store.state.earningsDate.arr2
            }
          })
      }, 200)
    },
    dataUpdate () {
      this.loading2 = true
      var type = this.$route.query.type
      if (type === 'getRevenueDefineP') {
        return
      } else {
        request
          .post(host + 'franchisee/revenue/' + type)
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var pageNumber = JSON.parse(res.text).totalPage
              // loading关闭
              this.loading2 = false
              var arr2 = this.tableDataDel(pagedata)
              this.totalPage = pageNumber
              this.$store.dispatch('earningsDate_action', { arr2 })
              this.tableData = this.$store.state.earningsDate.arr2
            }
          })
      }
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
          .post(host + 'franchisee/revenue/getRevenueDefineP')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'userId': 'admin',
            'cityId': $('.citys span.active').attr('myId'),
            'startTime': startTime,
            'endTime': endTime,
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var arr2 = this.tableDataDel(pagedata)
              // loading 关闭
              this.loading2 = false
              this.$store.dispatch('earningsDate_action', { arr2 })
              this.tableData = this.$store.state.earningsDate.arr2
              var pageNumber = JSON.parse(res.text).totalPage
              this.totalPage = pageNumber
              if (this.pagetotal > 1) {
                $('.M-box').pagination({
                  pageCount: this.pagetotal,
                  jump: true,
                  coping: true,
                  homePage: '首页',
                  endPage: '尾页',
                  prevContent: '«',
                  nextContent: '»'
                })
              } else {
                $('.M-box').html('')
                return
              }
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
    },
    getCityList () {
      request
        .post(host + 'franchisee/franchiseeManager/getFranchiseeCity')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin'
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            console.log(res)
            this.cityList = JSON.parse(res.text)
          }
        })
    }
  },
  // created () {
  //   this.dataUpdate()
  // },
  beforeMount () {
    this.$router.push('/index/earningsDetail?type=getRevenueCurDayP')
  },
  // watch: {
  //   '$route': 'dataUpdate'
  // }
}
</script>
