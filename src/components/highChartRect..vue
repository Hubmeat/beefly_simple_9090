<template>
  <div style="position: relative;">
      <div v-title>报表管理-消费数据-统计图</div>
      <div class="my_noDate" style="position: absolute; min-height:40px; height: 40px;" v-show="noData">
        <img src="../assets/img/2.png" />
        <p>暂无数据</p>
      </div>
      <div id="container" style="position: relative;"></div>
  </div>
</template>
<script>
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  import request from 'superagent'
  import moment from 'moment'
  import { host } from '../config/index.js'
  // import Vue from 'vue'
  export default {
    data () {
      return {
        x_data: [],
        orderNumber: [],
        consumeMoney: [],
        noData: false
      }
    },
    mounted () {
      if (this.$store.state.consumeData.length === 0) {
        request
          .post(host + 'beepartner/admin/statistics/adminStatistics')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'type': this.$route.query.type,
            'showType': 'chart'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              this.checkLogin(res)
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
              alert(this.$store.state.consumeData)
              this.getChartDate()
              /**
               * 判断是否显示暂无数据
               */
              if (this.consumeMoney.length === 0) {
                this.noData = true
              } else {
                this.noData = false
              }
              this.createChartsShap()
            }
          })
      } else {
        this.getChartDate()
        this.createChartsShap()
        return
      }
    },
    methods: {
      createChartsShap () {
        if (this.consumeMoney.length === 0 && this.orderNumber === 0) {
          this.noData = true
          return
        } else {
          // 创建图表
          Highcharts.chart('container', {
            /** Highcharts 配置 */
            lang: {
              printChart: '打印图表',
              contextButtonTitle: '图表导出菜单',
              decimalPoint: '.',
              downloadJPEG: '下载JPEG图片',
              downloadPDF: '下载PDF文件',
              downloadPNG: '下载PNG文件',
              downloadSVG: '下载SVG文件'
            },
            scrollbar: {
              enabled: true
            },
            credits: {
              enabled: true,
              text:"北京蜜蜂出行科技有限公司",  
              href: "http://www.mmuu.com" 
            },
            chart: {
              type: 'column',
              backgroundColor: 'rgba(255,255,255,0)'                        // 指定图表的类型，默认是折线图（line）
            },
            title: {
              text: ''                 // 指定图表标题
            },
            xAxis: {
              categories: this.x_data,
              crosshair: true
            },
            yAxis: {
              title: {
                text: ''
              },
              plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
              }]
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              borderWidth: 0
            },
            series: [
              {
                name: ' ',
                color: '#996600',
                data: this.orderNumber,
                tooltip: {
                  valueSuffix: '单',
                  useHTML: true,
                  headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
                  pointFormatter: function () {
                    return '<span style="color:{' + this.series.color + '}"></span>单数: <b>' + this.y + '</b>'
                  }
                }
              },
              {
                name: ' ',
                color: '#00cdcd',
                data: this.consumeMoney,
                tooltip: {
                  valuePrefix: '￥',
                  useHTML: true,
                  headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
                  pointFormatter: function () {
                    return '<span style="color:{' + this.series.color + '}"></span>金额: <b>￥' + this.y + '</b>'
                  }
                }
              }
            ]

          })

        }/**判断结束 */
      },
      getChartDate () {
        var res = this.$store.state.consumeData.map((item) => {
          return item.allianceArea
        })

        var order = this.$store.state.consumeData.map((item) => {
          return item.orderNum
        })

        var allMoney = this.$store.state.consumeData.map((item) => {
          return item.userPayAmount
        })
        this.x_data = res
        this.orderNumber = order
        this.consumeMoney = allMoney
      },
      getChartByRoute (arr) {
        var res = arr.map((item) => {
          return item.allianceArea
        })

        var order = arr.map((item) => {
          return item.orderNum
        })

        var allMoney = arr.map((item) => {
          return item.userPayAmount
        })
        
        this.$set(res, this.x_data)
        this.x_data = res
        this.orderNumber = order
        this.consumeMoney = allMoney

        if (this.consumeMoney.length === 0) {
          this.noData = true
        } else {
          this.noData = false
        }
      },
      dataUpdate () {
          request
            .post(host + 'beepartner/admin/statistics/adminStatistics')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              'type': this.$route.query.type,
              'showType': 'chart'
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
              } else {
                if (JSON.parse(res.text).data.length === 0) {
                  $('#container').html('')
                  this.noData = true
                } else {
                  this.checkLogin(res)
                  this.noData = false
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

                  this.getChartByRoute(newArr)
                  this.createChartsShap()
                }
              }
            })
      },
      time () {
        if (this.$store.state.timeline.length === 0) {
          console.log('beforeUpdate is noy entrey')
          return
        } else {
            request
              .post(host + 'franchisee/revenue/getRevenueSort')
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                'startTimeStr': this.$store.state.timeline.newObj.time1,
                'endTimeStr': this.$store.state.timeline.newObj.time2,
                'type': 'define',
                'showType': 'chart'
              })
              .end((error, res) => {
                if (error) {
                  console.log('error:', error)
                } else {
                  if (JSON.parse(res.text).data.length === 0) {
                    $('#container').html('')
                    this.noData = true
                  } else {
                    this.checkLogin(res)
                    this.noData = false
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
                  }
                  this.getChartByRoute(newArr)
                  this.createChartsShap() 
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
    watch: {
      '$route': 'dataUpdate',
      '$store.state.timeline': 'time'
    }
  }
</script>
<style>
  div#container g.highcharts-legend-item{display:none;}
  .my_noDate {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: rgba(243, 243, 245, 1);
    position: relative;
    text-align: center;
    /* left: 50%; */
  }

  .my_noDate img {
    display: inline-block;
    width: 500px;
    height: 200px;
  }

  .my_noDate p {
    color: #ccc;
  }
</style>
