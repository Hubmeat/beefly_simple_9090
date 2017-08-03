<template>
  <div style="margin-right: 20px;">
    <div id="hotmap_controller">
      <el-row class="DatePicker">
        <el-col class="timebtn">
          <el-row class="city" style="margin-bottom: 10px;">
            <address class="joinArea">加盟区域：</address>
            <div class="citys">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.areaID' v-for="item in cityList">{{item.area}}</span>
            </div>
          </el-row>
          <div class="timeBtn">
            <el-button class="active" @click='handleChangeType'>实时</el-button>
            <el-button @click='handleChangeType'>今日</el-button>
            <el-button @click='handleChangeType'>本周</el-button>
            <el-button @click='handleChangeType'>本月</el-button>
            <el-button @click='handleChangeType'>所有日期</el-button>
            <el-button @click='handleChangeType'>指定时间段</el-button>
          </div>
          <el-date-picker v-show="show" v-model="value4" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
          </el-date-picker>
          <!-- <el-button id="btn2" v-show="show2" >查询</el-button> -->
          <!-- <div v-show="show3" id="my_border"></div> -->
        </el-col>
      </el-row>
      <div class="hotmap_search">
        <input type="text" @blur='inputChange' v-model="userDefindCity" placeholder="请输入加盟区域内地址，其他区域无法看到数据" class="hotmap_search_place">
        <el-button class="my_btn" @click="searchByTimeline">查询</el-button>
      </div>
    </div>
  
    <div style="margin-bottom: -10px;">
      <el-row class="showTime" style="border: 1px solid #e7ecf1; border-bottom: none;">
        <el-col class="dateArrow" ref="dateArrow" v-bind:data-timetype="arrowTimeType">
          <el-button @click="dateMinus">
            <i class="el-icon-arrow-left"></i>
          </el-button>
          <span class="nowTime">{{nowTime}}</span>
          <el-button @click="dateAplus">
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </el-col>
        <el-col>
          骑行热力展示
        </el-col>
      </el-row>
    </div>
  
    <div class="gmap" style="border: 1px solid #e7ecf1; border-top: none;">
      <div id="map-container"></div>
    </div>
  
  </div>
</template>
<style>
#hotmap_controller .city address {
  font-style: normal;
  display: inline;
  font-size: 14px;
  margin-right: -4px;
}

#hotmap_controller .city div.citys {
  display: inline-block;
}

#hotmap_controller .city span {
  cursor: pointer;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0px 5px 0px 5px;
  border: 1px solid transparent;
}

#hotmap_controller .city span.active {
  border: 1px solid orange;
  border-radius: 4px;
}


/* 加盟商样式  */

#hotmap_controller {
  padding: 20px 30px 20px 32px;
  background: #fff;
  margin-bottom: 10px;
  border: 1px solid #e7ecf1;
}


#hotmap_controller .hotmap_search_place {
  min-width: 460px;
  padding-left: 10px;
  border-radius: 4px;
  height: 34px;
  outline: none;
  margin-top: 10px;
  border: 1px solid #ddd;
  display: inline-block;
}

div.gmap {
  /*width:100%;*/
  height: 800px;
  position: relative;
  left: 0;
  top: 10px;
  padding: 20px 30px 10px 30px;
  background: #fff;
}

#map-container {

  height: 100%;
}

div.menu {
  position: absolute;
  width: 30%;
  left: 70%;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;
}

div#myPageTop {
  padding: 0 15px;
  height: 50px;
  width: 80%;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 5px;
  background: rgba(0, 0, 0, .3)
}

div#myPageTop div {
  height: 50px;
  padding-top: 10px;
  box-sizing: border-box;
}

div#myPageTop i {
  height: 32px;
  line-height: 32px;
  margin-right: -1px;
  border: 1px solid rgba(0, 0, 0, .5);
  display: inline-block;
  padding: 0 10px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  width: 30px;
  overflow: hidden;
  box-sizing: border-box;
  vertical-align: middle;
  background: #fff;
  color: #000;
}

div#myPageTop input {
  line-height: 30px;
  height: 30px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  text-indent: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, .5);
}

div.group-button {
  margin-top: 20px;
}

div#panel {
  position: relative;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  width: 90%;
  margin: 0 auto;
  top: 10px;
}

div#editPath {
  margin-top: 10px;
}

div#editPath div.el-col-2 span {
  line-height: 32px
}

div.showCurrentCity {
  margin-top: 10px;
}

div.amap-copyright {
  display: none!important;
}

.amap-logo img {
  display: none;
}

div.timebtn {
  background: #fff;
}

div.timebtn #btn2 {
  width: 60px;
  height: 36px;
  color: #fff;
  outline: none;
  text-align: center;
  border: none;
  /* border-radius: 4px; */
  background: rgba(52, 52, 67, 0.8);
}

div.timebtn #btn2:hover {
  background: rgba(52, 52, 67, 0.9);
  color: #fff;
}


/* div.timebtn #my_border {
      border: 1px solid #ccc;
      height: 30px;
      width: 100px;
      display: block;
      position: absolute;
      left: 0;
    } */

#hotmap_controller div.timeBtn {
  display: block;
  float: left;
  margin-right: 8px;
}

#hotmap_controller div.timeBtn button {
  /*margin-left: 8px;*/
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

#hotmap_controller div.timeBtn button.active {
  background: rgba( 255, 140, 0, 0.8);
  color: #fff;
  border: 1px solid rgba( 255, 140, 0, 0.5);
}

#hotmap_controller div.timeBtn button.active:hover {
  color: #fff !important;
}


div.showTime {
  margin-top: 20px;
}

div.showTime div.el-col {
  text-align: center;
  background: #fff;
  font-size: 18px;
}


div.showTime div.el-col button {
  border: none;
  padding: 5px 0 10px 0;
}

div.showTime div.el-col button:hover {
  color: #666;
}

div.showTime div.el-col:nth-of-type(1) {
  padding: 20px 0 10px 20px
}

div.showTime div.el-col:nth-of-type(2) {
  margin-top: -10px;
  text-indent: 0.8em;
}

div.timeBtn button.active {
  /*background: rgb(66, 66, 66);*/
  background: rgba( 255, 140, 0, 0.8);
  color: #fff;
  border: 1px solid rgba( 255, 140, 0, 0.5);
}

div.timeBtn button.active:hover {
  color: #fff !important;
}


.my_btn {
  width: 80px;
  float: right;
  height: 36px;
  line-height: 11px;
  color: #fff;
  margin-top: 10px;
  outline: none;
  border: none;
  /* border-radius: 4px; */
  background: rgba(52, 52, 67, 0.8);
}

.my_btn:hover {
  background: rgba(52, 52, 67, 0.9);
  color: #fff;
}
</style>
<script>
import AMap from 'AMap'
import { siblings } from '../../../../utils/index.js'
import moment from 'moment'
import request from 'superagent'
import { host } from '../../../config/index.js'
var map, auto, placeSearch, heatmap, driving, citysearch
// 输入提示
var autoOptions = {
  input: 'tipinput'
}
export default {
  data: function () {
    return {
      isShowDriving: false,
      startDriving: '',
      endDriving: '',
      city: '北京',
      cityList: [],
      value4: '',
      nowTime: '',
      arrowTimeType: 'now',
      clickTimes: 0,
      show: false,
      show2: false,
      // show3: false,
      userDefindCity: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }

    }
  },
  mounted: function () {
    this.getCityList()
    this.$router.push({ query: { type: 'curHour' } })
    // 加载实时热力图
    this.mountedWay()

    this.nowTime = moment().format('YYYY-MM-DD')
  },
  methods: {
    mountedWay () {
      request
        .post(host + 'franchisee/report/hotted/' + this.$route.query.type)
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': $('.citys span.active').attr('myId')?$('.citys span.active').attr('myId'):0
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            // console.log(JSON.parse(res.text))
            var arr = JSON.parse(res.text)
            this.init(arr)
            /** 
              根据不同的城市加载不同的热力区域，
              默认为中国全区
              并且不同地区的加盟商，只能看到属于本区域的热力图，管理员可以看到所有地区的热力区域
            */
 
              this.showCurrentCity($('.citys span.active').text())
          }
        })
    },
    init(arr) {

      map = new AMap.Map('map-container', {
        zoom: 13,
        center: [116.397428, 39.90923],
        resizeEnable: true
      })
      // 安装插件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Heatmap', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Driving', 'AMap.Geolocation', 'AMap.CitySearch'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.Autocomplete())
        map.addControl(new AMap.PlaceSearch())
        map.addControl(new AMap.Driving())
        map.addControl(new AMap.Geolocation())
        map.addControl(new AMap.CitySearch())
        // 热力图数据这里我用的模拟数据（北京部分公园数据）
        var heatmapData = arr
        // 初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
          radius: 25, // 给定半径
          opacity: [0, 0.8],
          // 颜色配置
          gradient: {
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
          }
        })
        // 设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: heatmapData,
          max: 100
        })
      })
      auto = new AMap.Autocomplete(autoOptions)
      // 构造地点查询类
      placeSearch = new AMap.PlaceSearch({
        map: map
      })
      // 注册监听，当选中某条记录 会触发
      AMap.event.addListener(auto, 'select', this.selectCity)
      // 构造驾车路线导航类
      driving = new AMap.Driving({
        map: map,
        panel: 'panel'
      })
    },
    heatmapShow() {
      heatmap.show()
    },
    heatmapHide() {
      heatmap.hide()
    },
    selectCity(e) {
      placeSearch.setCity(e.poi.adcode)
      // 关键字查询
      placeSearch.search(e.poi.name)
    },
    queryDrivingPath() {
      // 根据起终点名称规划驾车导航路线
      if (this.isShowDriving === '' || this.endDriving === '') {
        alert('起点或终点不能为空！')
      } else {
        driving.search([
          { keyword: this.startDriving, city: this.city },
          { keyword: this.endDriving, city: this.city }
        ])
        this.isShowDriving = true
        this.startDriving = ''
        this.endDriving = ''
      }
    },
    showCurrentCity(city) {
      if (city === '全部地区') {
        city = '中国'
      } else {
        city = city
      }
    /**
    * 设置城市查询
    */
    AMap.service('AMap.DistrictSearch',function(){//回调函数
        //实例化DistrictSearch
        var districtSearch = new AMap.DistrictSearch({
            level : 'city',
            extensions: 'all',
            subdistrict : 1    
        });
        //TODO: 使用districtSearch对象调用行政区查询的功能
        districtSearch.search(city, function(status, result){
            var bounds = result.districtList[0].boundaries;
            var polygon = new AMap.Polygon({  //行政区边界渲染，使用多边形覆盖物实现
                map: map,
                strokeWeight: 2,
                path: bounds,
                fillOpacity: 0.1,
                fillColor: '#edbb2e',
                strokeColor: '#000'
            });
            map.setFitView()
        })
    })

      // 自动获取用户IP，返回当前城市
      // citysearch.getLocalCity(function (status, result) {
      //   if (status === 'complete' && result.info === 'OK') {
      //     if (result && result.city && result.bounds) {
      //       var cityinfo = result.city
      //       var citybounds = result.bounds
      //       console.log('您当前所在城市：' + cityinfo)
      //       // 地图显示当前城市
      //       map.setBounds(citybounds)
      //     }
      //   } else {
      //     console.log(result.info)
      //   }
      // })
    },
    handleChangeType(e) {

      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button active el-button--default')
      if (e.currentTarget.innerText === '指定时间段') {
        this.show = true
        this.show2 = true
      } else {
        this.show = false
        this.show2 = false
      }
      var nowTime
      switch (e.currentTarget.innerText) {
        case '实时': {
          nowTime = moment().format('YYYY-MM-DD')
          this.$router.push({ query: { type: 'curHour' } })
          this.nowTime = nowTime
          this.arrowTimeType = 'now'
          this.clickTimes = 0
          break
        }
        case '今日': {
          nowTime = moment().format('YYYY-MM-DD')
          this.$router.push({ query: { type: 'curDay' } })
          this.nowTime = nowTime
          this.arrowTimeType = 'day'
          this.clickTimes = 0
          break
        }
        case '本周': {
          nowTime = moment().format('YYYY年第ww周')
          this.$router.push({ query: { type: 'curWeek' } })
          this.nowTime = nowTime
          this.arrowTimeType = 'week'
          this.clickTimes = 0
          break
        }
        case '本月': {
          nowTime = moment().format('YYYY年MM月')
          this.$router.push({ query: { type: 'curMonth' } })
          this.nowTime = nowTime
          this.arrowTimeType = 'month'
          this.clickTimes = 0
          break
        }
        case '所有日期': {
          nowTime = moment().format('YYYY年MM月')
          this.$router.push({ query: { type:  'getAll'}})
          this.nowTime = nowTime
          // this.arrowTimeType = 'month'
          this.clickTimes = 0
          break
        }
      }
    },
    dateMinus() {
      var dateTimeType = this.$refs.dateArrow.$el.dataset.timetype
      var nums = null
      switch (dateTimeType) {
        case 'day': {
          nums = --this.clickTimes
          var lastDay = new Date().getTime() + 24 * 60 * 60 * 1000 * nums
          this.nowTime = moment(lastDay).format('YYYY-MM-DD')
          this.$router.push({ query: { type: 'day', data: this.nowTime } })
          this.searchByDirType()
          break
        }
        case 'week': {
          nums = --this.clickTimes
          var lastweek = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * nums
          this.nowTime = moment(lastweek).format('YYYY年第WW周')
          this.$router.push({ query: { type: 'week', data: this.nowTime } })
          this.searchByDirType()
          break
        }
        case 'month': {
          nums = --this.clickTimes
          var lastmonth = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * 4 * nums
          this.nowTime = moment(lastmonth).format('YYYY年MM月')
          this.$router.push({ query: { type: 'month', data: this.nowTime } })
          this.searchByDirType()
          break
        }
      }
    },
    dateAplus() {
      var dateTimeType = this.$refs.dateArrow.$el.dataset.timetype
      var nums = null
      switch (dateTimeType) {
        case 'day': {
          nums = ++this.clickTimes
          var lastDay = new Date().getTime() + 24 * 60 * 60 * 1000 * nums
          this.nowTime = moment(lastDay).format('YYYY-MM-DD')
          this.$router.push({ query: { type: 'day', data: this.nowTime } })
          this.searchByDirType()
          break
        }
        case 'week': {
          nums = ++this.clickTimes
          var lastweek = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * nums
          this.nowTime = moment(lastweek).format('YYYY年第WW周')
          this.$router.push({ query: { type: 'week', data: this.nowTime } })
          this.searchByDirType()
          break
        }
        case 'month': {
          nums = ++this.clickTimes
          var lastmonth = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * 4 * nums
          this.nowTime = moment(lastmonth).format('YYYY年MM月')
          this.$router.push({ query: { type: 'month', data: this.nowTime } })
          this.searchByDirType()
          break
        }
      }
    },
    dataUpdate() {
      var flag = true
      console.log(this.$route.query.type)
      // if (this.$route.query.type === 'curHour') {
      //   return
      // } else if (flag === true) {
      //   this.requestWay(this.$route.query.type)
      // } else {
      //   return
      // }
      
      this.requestWay(this.$route.query.type)
    },
    searchByTimeline() {
      var startTime, endTime
      if (this.show2 === true && this.value4 === '') {
        this.$message({
          message: '请选择想要查询的时间段！',
          type: 'warning'
        })
      } else {
        startTime = moment(this.value4[0]).format('YYYY-MM-DD HH:mm:ss')
        endTime = moment(this.value4[1]).format('YYYY-MM-DD HH:mm:ss')
        console.log(startTime, endTime)
        request
          .post(host + 'franchisee/report/hotted/defineTime')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'startDate': startTime,
            'endDate': endTime,
            'cityId': $('.citys span.active').attr('myId')
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              var arr = JSON.parse(res.text)
              this.init(arr)
              /**
                根据不同类型调取热力区域
              */
              this.showCurrentCity($('.citys span.active').text())
            }
          })
      }
    },
    searchByDirType() {
      switch (this.$route.query.type) {
        case 'day': {
          this.requestWay(day)
          break
        }
        case 'week': {
          this.requestWay(week)
          break
        }
        case 'month': {
          this.requestWay(month)
          break
        }
      }
    },
    requestWay(type) {
      request
        .post(host + 'franchisee/report/hotted/' + type)
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': $('.citys span.active').attr('myId')?$('.citys span.active').attr('myId'):0,
          "date": this.$route.query.date
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            // console.log(JSON.parse(res.text).list)
            var arr = JSON.parse(res.text)
            this.init(arr)
            /**
              根据不同类型调取热力区域
            */
            this.showCurrentCity($('.citys span.active').text())
          }
        })
    },
    handleClick(e) {
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')
      this.mountedWay()
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
    },
    inputChange () {
      var userDefindCity =  this.userDefindCity
      this.showCurrentCity(userDefindCity)
    }
  },
  // created() {
  //   this.dataUpdate()
  // },
  watch: {
    '$route': 'dataUpdate'
  }
}
</script>
