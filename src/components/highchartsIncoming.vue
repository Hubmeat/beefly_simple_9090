<template>
   <div id="container2" style="width:98%;height:200px;"></div>
</template>
<script>
  import { host } from '../config/index.js'
  import request from 'superagent'
  import moment from 'moment'
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  export default {
    mounted: function () {
      this.initChart()
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
            categories: ['无为', '肥西', '蒙城'],
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
                  y: 200
                },
                {
                  color: 'rgba(0,204,0,1)',
                  y: 300
                },
                {
                  color: 'rgba(0,204,204,1)',
                  y: 1300
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
      routeChange () {
        var cityId;
        if (this.$route.query.type === underfined) {
          cityId = 0
        } else {
          cityId = this.$route.query.type
        }

        request
          .post(host + '')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'cityId': cityId
          })
          .end((err, res) => {
            if (err) {
              console.log('err:' + err)
            } else {
              console.log(JSON.parse(res.text).data)
            }
          })
      }
    },
    watch: {
      '$route': 'routeChange'
    }
  }
</script>
<style>
  div#container{width:100%;height:265px;}
  div#container g.highcharts-legend-item{display:none;}
</style>
