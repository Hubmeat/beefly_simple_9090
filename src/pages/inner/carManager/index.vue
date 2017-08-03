<template>
  <div class="carManager" style="margin-right: 20px;">
    <el-tabs type="border-card" @tab-click="getTabName" v-model="activeName">
      <el-tab-pane name='已分配'>
        <span slot="label">
          <i class="el-icon-date"></i> 已分配</span>
            <div class="carManager_content">
              <div class="queryCarInfo">
                <el-form :model="form">
                  <el-row>
                    <el-row class="selectPlace">
                      <address class="joinArea">加盟区域</address>
                      <div class="citys">
                        <span @click="handleClick" myId='0' class="active">全部地区</span>
                        <span @click="handleClick" :key='item.id' :myId='item.areaID' v-for="item in cityList">{{item.area}}</span>
                      </div>
                    </el-row>
                    <el-col>
                      <el-form-item class="filtercar">
                        <span class="labelAlign">关键字</span>
                        <input v-model="terminalNumber" class="carMan_bar" placeholder="车辆号\终端编号\车辆名称">
                      </el-form-item>
                      <el-form-item class="filtercar" style="width: 400px;">
                        <span class="labelAlign">状态</span>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="4">待出租</el-checkbox>
                            <el-checkbox label="5">已预订</el-checkbox>
                            <el-checkbox label="6">已出租</el-checkbox>
                            <el-checkbox label="7">维护中</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item>
                        <span class="labelAlign">上线日期</span>
                        <el-date-picker v-model='form.data1' type="date" placeholder="选择日期"></el-date-picker>
                      <span class="division">至</span>
                        <el-date-picker v-model='form.data2' type="date" placeholder="选择日期"></el-date-picker>
                        <el-button class="my_btn" @click="searchByTimeline">查询</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="showCarInfo">
              <table>
                <thead>
                  <tr>
                    <th>车辆号</th>
                    <th>终端编号</th>
                    <th>车辆名称</th>
                    <th>车型</th>
                    <th>上线日期</th>
                    <th>状态</th>
                    <th>骑行次数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="item.finnalNum" v-for="item of tableData">
                    <td>
                      <router-link v-bind:to="{path:'/carUseDetail', query: {code:item.bikeCode}}">{{item.bikeCode}}</router-link>
                    </td>
                    <td>{{item.boxCode}}</td>
                    <td>{{item.generationsName}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.onlineTime}}</td>
                    <td>{{item.state}}</td>
                    <td>{{item.orderNum}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="datashow" v-show="noDate">
                <p>暂无数据</p>
              </div>
            </div>
          
            <div id="carManager_page">
              <div class="M-box"></div>
            </div>
      </el-tab-pane>
      <el-tab-pane label="未分配" name='未分配'>
        <div class="carManager_content">
              <div class="queryCarInfo">
                <el-form :model="form">
                  <el-row>
                    <el-col>
                      <el-form-item class="filtercar">
                        <span class="labelAlign">关键字</span>
                        <input v-model="terminalNumber" class="carMan_bar" placeholder="车辆号\终端编号\车辆名称">
                      </el-form-item>
                      <el-form-item class="filtercar" style="width: 400px;">
                        <span class="labelAlign">状态</span>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="4">待出租</el-checkbox>
                            <el-checkbox label="5">已预订</el-checkbox>
                            <el-checkbox label="6">已出租</el-checkbox>
                            <el-checkbox label="7">维护中</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item>
                        <span class="labelAlign">上线日期</span>
                        <el-date-picker v-model='form.data1' type="date" placeholder="选择日期"></el-date-picker>
                      <span class="division">至</span>
                        <el-date-picker v-model='form.data2' type="date" placeholder="选择日期"></el-date-picker>
                        <el-button class="my_btn" @click="searchByTimeline">查询</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="showCarInfo">
              <table>
                <thead>
                  <tr>
                    <th>车辆号</th>
                    <th>终端编号</th>
                    <th>车辆名称</th>
                    <th>车型</th>
                    <th>上线日期</th>
                    <th>状态</th>
                    <th>骑行次数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="item.finnalNum" v-for="item of tableData">
                    <td>
                      <router-link v-bind:to="{path:'/index/carUseDetail', query: {code:item.bikeCode}}">{{item.bikeCode}}</router-link>
                    </td>
                    <td>{{item.boxCode}}</td>
                    <td>{{item.generationsName}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.onlineTime}}</td>
                    <td>{{item.state}}</td>
                    <td>{{item.orderNum}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="datashow" v-show="noDate">
                <p>暂无数据</p>
              </div>
            </div>
          
            <div id="carManager_page">
              <div class="M-box"></div>
            </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import request from 'superagent'
import moment from 'moment'
import {siblings} from '../../../../utils/index.js'
import $ from 'jquery'
// import Vue from 'vue'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import { host } from '../../../config/index.js'
export default {
  data: function () {
    return {
      form: {
        radio: '',
        data1: '',
        data2: ''
      },
      tableData: [],
      timer: null,
      timer2: null,
      pagetotal: '',
      checkList: [],
      terminalNumber: '',
      activeName: '已分配',
      cityList: [],
      noDate: false,
      signForQuery: false
    }
  },
  mounted: function () {
    // 更改搜索sign标识
    this.signForQuery = false

    this.getCityList()
    this.getDateByTabName('getAllotBikes')
    var that = this
  },
  beforeUpdate: function () {
    if (this.tableData.length === 0) {
      this.noDate = true
    } else {
      this.noDate = false
    }
    var type, type1
    console.log('beforeUpdata:' + this.signForQuery)
    if (this.signForQuery === true) {
      type = 'queryBikes'
    } else {
      if (this.activeName === '已分配') {
        type = 'getAllotBikes'
        /**
         * 表示是已分配，还是未分配的分页查询。
         */
        type1 = '0'
      } else {
        type = 'getNotAllotBikes'
        type1 = '1'
      } 
      this.signForQuery = false
    }

    var that = this
    $('.M-box').click('a', function (e) {
      clearTimeout(this.timer)
      if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
        if (e.target.innerHTML === '首页') {
          e.target.innerHTML = 1
        } else if (e.target.innerHTML === '尾页') {
          e.target.innerHTML = that.pagetotal
        } else if (e.target.innerHTML === '«') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) - 1
        } else if (e.target.innerHTML === '»') {
          console.log($('.M-box span.active')[0].innerHTML)
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) + 1
        } else if (e.target.innerText === '跳转') {
          var jumpPageNum = $('.M-box .active').text()
          e.target.innerHTML = jumpPageNum
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }

      console.log('这个是分页查询')
      this.timer = setTimeout(function () {
        var startTime, endTime
        if (that.form.data1 === '' || that.form.data2 === '') {
          startTime = null
          endTime = null
        } else {
          startTime = moment(that.form.data1).format('YYYY-MM-DD')
          endTime = moment(that.form.data2).format('YYYY-MM-DD')
        }

        // 根据用户选择不同状态进行数据的筛选
        // var radio = JSON.stringify(this.checkList)
        var radio = that.checkList.toString()
        
        request
          .post(host + 'franchisee/franchiseeManager/' + type + '?page=' + e.target.innerHTML)
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'start': startTime,
            'end': endTime,
            'state': radio,
            'name': that.terminalNumber,
            'cityCode': $('.citys span.active').attr('myId'),
            'type': type1
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(res)
              console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var newData = that.tableDataDel(pagedata)
              that.tableData = newData
            }
          })
      }, 200)
    })

    /**
     * 根据不同的加盟城市，来展示不同的数据
     * */
    var that = this
    $('.citys span').on('click', function () {
      clearTimeout(this.timer2)
      // 更换城市搜索。
      that.signForQuery = false
      var id = $(this).attr('myId')
      console.log('这个是城市ID')
      console.log(id)
      this.timer2 = setTimeout(function () {
        console.log('this is city')
        request
          .post(host + 'franchisee/franchiseeManager/getAllotBikes')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'cityCode': id
          })
          .end((error, res) => {
            // console.log('this is entry')
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              console.log((JSON.parse(res.text)).totalPage)
              var data = (JSON.parse(res.text)).list
              that.pagetotal = (JSON.parse(res.text)).totalPage
              var newData = that.tableDataDel(data)
              that.tableData = newData
              if (that.pagetotal > 1) {
                $('.M-box').pagination({
                  pageCount: that.pagetotal,
                  jump: true,
                  coping: true,
                  homePage: '首页',
                  endPage: '尾页',
                  prevContent: '«',
                  nextContent: '»'
                })
              } else {
                return
              }
            }
          })
      }, 200)
    })
  },
  beforeMount () {
    if (this.tableData.length === 0) {
      this.noDate = true
    }
  },
  methods: {
    searchByTimeline () {
      var type 
      if (this.activeName === '已分配') {
        type = '0'
      } else {
        type = '1'
      }
      if (this.terminalNumber === '' && this.form.data1 === '' && this.form.data2 === '' &&  this.checkList.length === 0) {
        this.$message({
          message: '请输入查询条件',
          type: 'warning'
        })
      } else {
        var startTime, endTime
        if (this.form.data1 === '' || this.form.data2 === '') {
          startTime = null
          endTime = null
        } else {
          startTime = moment(this.form.data1).format('YYYY-MM-DD')
          endTime = moment(this.form.data2).format('YYYY-MM-DD')
        }

        // 根据用户选择不同状态进行数据的筛选
        // var radio = JSON.stringify(this.checkList)
        var radio = this.checkList.toString()
        request
          .post(host+'franchisee/franchiseeManager/queryBikes')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          // .send({
          //   'start': startTime?startTime:null,
          //   'end': endTime?endTime:null,
          //   'state': radio?radio:'null',
          //   'name': this.terminalNumber?this.terminalNumber:null,
          //   'cityCode': $('.citys span.active').attr('myId')? $('.citys span.active').attr('myId'):null,
          //   'type': type
          // })
          .send({
            'start': startTime,
            'end': endTime,
            'state': radio,
            'name': this.terminalNumber,
            'cityCode': $('.citys span.active').attr('myId'),
            'type': type
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log('分页这是分页')
              console.log(JSON.parse(res.text))
              var data = (JSON.parse(res.text)).list
              var newData = this.tableDataDel(data)
              this.pagetotal = (JSON.parse(res.text)).totalPage
              this.tableData = newData
              if (this.pagetotal > 1) {
                this.signForQuery = true
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
    getTabName (tab, event) {
      if (this.activeName === '未分配') {
        this.getDateByTabName('getNotAllotBikes')
        // this.checkList = []
      } else {
        this.getDateByTabName('getAllotBikes')
        // this.checkList = []
      }
    },
    getDateByTabName (type) {
      request
        .post(host + 'franchisee/franchiseeManager/' + type)
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityCode': '0'
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            console.log((JSON.parse(res.text)).list)
            var data = (JSON.parse(res.text)).list
            this.pagetotal = (JSON.parse(res.text)).totalPage
            var newData = this.tableDataDel(data)
            this.tableData = newData
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
              return
            }
          }
        })
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.bikeCode = arr[i].bikeCode
        obj.boxCode = arr[i].boxCode
        obj.generationsName = arr[i].generationsName
        obj.model = arr[i].model
        console.log(arr[i].onlineTime)
        if (arr[i].onlineTime === undefined) {
          obj.onlineTime = ''
        } else {
          obj.onlineTime = moment(arr[i].onlineTime).format('YYYY-MM-DD HH:MM:SS')
        }
        obj.state = arr[i].state
        obj.orderNum = arr[i].orderNum

        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
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
  // created  () {
  //   this.searchByTimeline()
  // },
  watch: {
    'checkList': 'searchByTimeline'
  }
}
</script>
<style>
div.selectPlace {
  margin-bottom: 10px;
  padding-left: 10px;
}

div.selectPlace address {
  font-style: normal;
  display: inline;
  font-size: 14px;
  margin-right: 8px;
}

div.selectPlace div.citys {
  display: inline-block;
}

div.selectPlace span {
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  padding: 5px;
  border: 1px solid transparent;
}

div.selectPlace span.active {
  border: 1px solid orange;
  border-radius: 4px;
}

  /*  加盟端样式  */

.carManager_content {
  background: #fff;
  padding: 10px 30px 5px 30px;
  margin-bottom: 20px;
  border: 1px solid #e7ecf1;
}

/*div.carManager div.queryCarInfo {
  background: #f3f0f0;
  padding: 10px 10px 0 10px;
}*/

div.carManager div.queryCarInfo div.el-form-item {
  margin-bottom: 10px;
}
div.carManager div.queryCarInfo div.el-form-item  span.labelAlign{
  float:left;
  width: 68px;
  display: block;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  color:#555;
}
span.division{
font-size: 14px;
    color: #555;
    width: 32px;
    display: inline-block;
    text-align: center;
  }
div.filtercar{display: inline-block;}
div.line {
  margin-left: 0px;
}

div.el-input {
  width: 200px;
}

div.showCarInfo {
  padding: 20px 30px 10px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
}

div.showCarInfo table {
  border-collapse: collapse;
  width: 100%;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}

div.showCarInfo table tr th {
  text-align: left;
  border: 1px solid #eee;
  height: 40px;
  font-size: 14px;
  background: #eee;
  font-weight: 400;
  color: #444;
}

div.showCarInfo table tr {
  border-bottom: 1px solid #eee;
  text-indent: 2em;
}

div.showCarInfo table tr td {
  text-align: left;
  /*border: 1px solid #dfe6ec;*/
  padding: 10px 0;
  color: #555;
  font-size: 14px;
}

div.showCarInfo table tr td a {
  text-decoration: none;
  color: #555
}

div#carManager_page {
    padding: 4px 10px 0 22px;
    /* padding-bottom: 100px; */
    background: #fff;
    border: 1px solid #e7ecf1;
    border-top: none;
    min-height: 304px;
}

.carMan_bar {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    width: 427px;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.my_btn {
    width: 80px;
    float: right;
    height: 36px;
    line-height: 11px;
    color: #fff;
    /*margin-top: 10px;*/
    outline: none;
    border: none;
    border-radius: 4px; 
    cursor: pointer;
    background: rgba(52,52,67, 0.8);
}

.my_btn:hover {
    background: rgba(52,52,67, 0.9);
    color: #fff !important;
}

 .el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}

.el-date-table td.current:not(.disabled), .el-date-table td.end-date, .el-date-table td.start-date {
  background: black !important;
  color: #fff !important;
}

.el-input__inner:hover {
  border: 1px solid #bbb;
} 

.el-button:focus, .el-button:hover {
  color: #fff;
}


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

.el-checkbox__inner {
  border-color: #ddd !important;
}

.el-checkbox__inner:hover {
  border-color: #ddd !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #444;
  border-color: #888;
  color: #fff;
}
div.carManager .el-form-item__content .el-input input.el-input__inner{width:194px;}

</style>
