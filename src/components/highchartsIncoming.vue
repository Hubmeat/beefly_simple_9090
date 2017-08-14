<template>
  <div style="position: relative;">
      <div v-title>报表管理-消费数据-统计图</div>
      <div class="my_noDate" style="position: absolute; min-height:40px; height: 40px;" v-show="noData">
        <img src="../assets/img/2.png" />
        <p>暂无数据</p>
      </div>
      <div id="container2" style="width:98%;height:400px; position: relative;"></div>
  </div>
</template>
<script>
  import { host } from '../config/index.js'
  import request from 'superagent'
  import moment from 'moment'
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  export default {
    data () {
      return {
        cityList: [],
        noData: false,
        chartData: [],
      }
    },
    mounted () {
      this.loadData()
      var that = this
      setInterval( function () {
        that.loadData()
      }, 600000)
    },
    methods: {
      initChart () {
        // 创建图表
        Highcharts.chart('container2', {
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
          exporting: {
            enabled: false
          },
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'bar',                           // 指定图表的类型，默认是折线图（line）
            backgroundColor: 'rgba(0,0,0,0)'
          },
          title: {
            text: ' '                 // 指定图表标题
          },
          xAxis: {
            categories: this.cityList,
            crosshair: true
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              step: 1
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
                allowOverlap: true
              }
            }
          },
          legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 0,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
          },
          series: [
            {
              name: ' ',
              color: '#74f7af',
              data: [
                {
                  color: 'rgba(153,102,0,1)',
                  y: this.chartData[0]
                },
                {
                  color: 'rgba(0,204,0,1)',
                  y: this.chartData[1]
                },
                {
                  color: 'rgba(0,221,204,1)',
                  y: this.chartData[2]
                },
                {
                  color: 'rgba(0,112,204,1)',
                  y: this.chartData[3]
                },
                {
                  color: 'rgba(0,204,111,1)',
                  y: this.chartData[4]
                },
                {
                  color: 'rgba(0,204,122,1)',
                  y: this.chartData[5]
                },
                {
                  color: 'rgba(0,210,204,1)',
                  y: this.chartData[6]
                }
              ],
              tooltip: {
                valueSuffix: '单',
                useHTML: true,
                headerFormat: '<span style="font-size: 12px">地点: {point.key}</span><br/>',
                pointFormatter: function () {
                  return '<span style="color:{' + this.series.color + '}"></span>收益: ￥<b>' + this.y + '</b>'
                }
              }
            }
          ]

        })
      },
      loadData () {
        request
          .post(host + 'beepartner/admin/statistics/adminRevenue')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send()
          .end((err, res) => {
            if (err) {
              this.noData = true
              console.log('err:' + err)
            } else {
              this.checkLogin(res)
              var data = JSON.parse(res.text).data || []
              if (JSON.parse(res.text).data.length === 0) {
                this.noData = true
              }
              var newCity = []
              data.map( (item) => {
                newCity.push(item.cityName)
                return newCity
              })

              var newChartData = []
              data.map( (item) => {
                newChartData.push(item.actualMoney)
                return newChartData
              })
              this.chartData = newChartData
              this.cityList = newCity
              this.initChart()
            }
          })
      },
      checkLogin (res) {
        if (JSON.parse(res.text).message === '用户登录超时') {
          this.$router.push('/login')
        }
      }
    }
  }
</script>
<style>
  div#container{width:100%;height:265px;}
  div#container g.highcharts-legend-item{display:none;}
  .my_noDate {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #ccc;
    /* left: 50%; */
  }
</style>
