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
                        <span @click="handleClick" :key='item.id' :myId='item.cityId' v-for="item in cityList">{{item.cityName}}</span>
                      </div>
                    </el-row>
                    <el-col>
                      <el-form-item class="filtercar">
                        <span class="labelAlign">关键字</span>
                        <input v-model="terminalNumber" v-on:input='inputChange' class="carMan_bar" placeholder="车辆号\终端编号\车辆名称">
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
                <el-table
                  :data="tableData"
                  style="width: 100% font-size:13px; color: #6c6c6c;"
                  v-loading="loading2"
                  element-loading-text="拼命加载中"
                >
                  <el-table-column
                    min-width="60"
                    label="车辆号"
                    prop='code'>
                    <template scope="scope">
                        <!-- <a>{{scope.row.bikeCode}}</a> -->
                        <!-- <router-link style="color:rgb(118, 103, 233); text-decoration: none;" target='_blank' v-bind:to="{path:'/carUseDetail', query: {code:scope.row.bikeCode}}">{{scope.row.bikeCode}}</router-link>   -->
                       <a style="color:rgb(118, 103, 233); text-decoration: none;" >{{scope.row.bikeCode}}</a>  
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="boxCode"
                    label="终端编号"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    prop="cityName"
                    label="加盟区域"
                    min-width="60">
                  </el-table-column>
                  <el-table-column
                    prop="onlineTime"
                    label="上线日期"
                    min-width="60">
                  </el-table-column>
                  <el-table-column
                    prop="stateName"
                    label="状态">
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
          
            <!-- <div id="carManager_page">
              <div class="M-box"></div>
            </div> -->
      </el-tab-pane>
      <el-tab-pane label="未分配" name='未分配'>
        <div class="carManager_content">
              <div class="queryCarInfo">
                <el-form :model="form">
                  <el-row>
                    <el-col>
                      <el-form-item class="filtercar">
                        <span class="labelAlign">关键字</span>
                        <input v-model="terminalNumber" v-on:input='inputChange' class="carMan_bar" placeholder="车辆号\终端编号\车辆名称">
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
              <el-table
              :data="tableData"
              style="width: 100% font-size:13px; color: #6c6c6c;"
              v-loading="loading2"
              element-loading-text="拼命加载中"
              >
                <el-table-column
                  min-width="80"
                  label="车辆号"
                  prop='code'>
                  <template scope="scope">
                      <!-- <a>{{scope.row.bikeCode}}</a> -->
                    <!-- <router-link style="color:rgb(118, 103, 233); text-decoration: none;" target='_blank' v-bind:to="{path:'/carUseDetail', query: {code:scope.row.bikeCode}}">{{scope.row.bikeCode}}</router-link>   -->
                     <a style="color:rgb(118, 103, 233); text-decoration: none;" >{{scope.row.bikeCode}}</a>  
                  </template>
                </el-table-column>
                <el-table-column
                  prop="boxCode"
                  label="终端编号"
                  min-width="90">
                </el-table-column>
                <el-table-column
                  prop="generationsName"
                  label="车辆型号"
                  min-width="80">
                </el-table-column>
                <el-table-column
                  prop="onlineTime"
                  label="上线日期"
                  min-width="80">
                </el-table-column>
                <el-table-column
                  prop="stateName"
                  label="状态">
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
          
            <!-- <div id="carManager_page">
              <div class="M-box"></div>
            </div> -->
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
      currentPage: 1,
      pageShow: false,
      noDate: false,
      totalItems: 1,
      loading2: false,
      signForQuery: false
    }
  },
  mounted: function () {
    // 更改搜索sign标识
    this.signForQuery = false
    this.getCityList()
    this.getDateByTabName('0')
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var radio = this.checkList.toString()
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/Bike/findBike')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': this.activeName === '已分配'?0:1,
          'cityCode': this.activeName === '已分配'?$('.citys span.active').attr('myId'):'',
          'currentPage': val,
          'bikeState': radio 
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            this.loading2 = false
            var data = (JSON.parse(res.text)).data
            this.totalItems = JSON.parse((JSON.parse(res.text)).totalItems)
            var newData = this.tableDataDel(data)
            this.tableData = newData
          }
        })
    },
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
        this.loading2 = true
        var startTime, endTime
        if (this.form.data1 === '' || this.form.data2 === '') {
          startTime = null
          endTime = null
        } else {
          startTime = moment(this.form.data1).format('YYYY-MM-DD')
          endTime = moment(this.form.data2).format('YYYY-MM-DD')
        }
        // 根据用户选择不同状态进行数据的筛选
        var radio = this.checkList.toString()
        request
          .post(host + 'beepartner/admin/Bike/findBike')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'startOnlineTime': startTime,
            'endOnlineTime': endTime,
            'bikeState': radio,
            'keyName': this.terminalNumber,
            'cityCode': this.active === '已分配'?$('.citys span.active').attr('myId'):'',
            'type': type
          })
          .end((error, res) => {
            if (error) {
              this.loading2 = false
              console.log('error:', error)
            } else {
              console.log(res)
              this.loading2 = false
              var data = (JSON.parse(res.text)).data
              var newData = this.tableDataDel(data)
              this.totalItems = JSON.parse((JSON.parse(res.text)).totalItems)
              this.tableData = newData
            }
          })
      }
    },
    searchThroughCheckList () {
      this.loading2 = true
      var type 
      if (this.activeName === '已分配') {
        type = '0'
      } else {
        type = '1'
      }
      var startTime, endTime
      if (this.form.data1 === '' || this.form.data2 === '') {
        startTime = null
        endTime = null
      } else {
        startTime = moment(this.form.data1).format('YYYY-MM-DD')
        endTime = moment(this.form.data2).format('YYYY-MM-DD')
      }
      // 根据用户选择不同状态进行数据的筛选
      var radio = this.checkList.toString()
      console.log(radio)
      request
        .post(host + 'beepartner/admin/Bike/findBike')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'startOnlineTime': startTime,
          'endOnlineTime': endTime,
          'bikeState': radio,
          'keyName': this.terminalNumber,
          'cityCode': this.active === '已分配'?$('.citys span.active').attr('myId'):'',
          'type': type
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            console.log(res)
            this.loading2 = false
            var data = (JSON.parse(res.text)).data
            var newData = this.tableDataDel(data)
            this.totalItems = JSON.parse((JSON.parse(res.text)).totalItems)
            this.tableData = newData
          }
        })
    },
    handleClick (e) {
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')
      /**
       * 根据不同的加盟城市，来展示不同的数据
       * */
      
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/Bike/findBike')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': 0,
          'cityCode': $('.citys span.active').attr('myId')
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            this.loading2 = false
            console.log((JSON.parse(res.text)).totalPage)
            var data = (JSON.parse(res.text)).data
            this.totalItems = JSON.parse((JSON.parse(res.text)).totalItems)
            var newData = this.tableDataDel(data)
            this.tableData = newData
          }
        })
    },
    getTabName (tab, event) {
      if (this.activeName === '未分配') {
        this.getDateByTabName('1')
      } else {
        this.getDateByTabName('0')
      }
    },
    getDateByTabName (type) {
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/Bike/findBike')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'type': type,
          'cityCode': this.activeName === '已分配'?$('.citys span.active').attr('myId'):''
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            console.log('error:', error)
          } else {
            this.loading2 = false
            console.log((JSON.parse(res.text)))
            var data = (JSON.parse(res.text)).data
            this.totalItems = JSON.parse((JSON.parse(res.text)).totalItems)
            var newData = this.tableDataDel(data)
            this.tableData = newData
            /**
             * 显示分页
             */
            this.pageShow = true
          }
        })
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}

        obj.bikeCode = arr[i].code
        obj.boxCode = arr[i].boxCode
        obj.cityName = arr[i].cityName
        obj.onlineTime = arr[i].onlineTimeStr
        obj.stateName = arr[i].stateName
        obj.generationsName = arr[i].generationsName

        arrDeled.push(obj)
      }

      return arrDeled
    },
    getCityList () {
      request
        .post(host + 'beepartner/city/findCity')
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
    },
    inputChange () {
      if (this.form.data1 === '' && this.form.data2 === '' && this.terminalNumber === ''&&this.checkList.length===0) {
          var startTime, endTime, type
          if (this.form.data1 === '' || this.form.data2 === '') {
            startTime = ''
            endTime = ''
          } else {
            startTime = moment(this.form.data1).format('YYYY-MM-DD')
            endTime = moment(this.form.data2).format('YYYY-MM-DD')
          }

          if (this.activeName === '未分配') {
            type = 1
          } else {
            type = 0
          } 

          var radio = this.checkList.toString()
          request
              .post(host + 'beepartner/admin/Bike/findBike')
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                'startOnlineTime': startTime,
                'endOnlineTime': endTime,
                'bikeState': radio,
                'keyName': this.terminalNumber,
                'cityCode': this.active === '已分配'?$('.citys span.active').attr('myId'):'',
                'type': type
              })
              .end((error, res) => {
                if (error) {
                  console.log('error:', error)
                } else {
                  this.loading2 = false
                  console.log((JSON.parse(res.text)))
                  var data = (JSON.parse(res.text)).data
                  this.totalItems = JSON.parse((JSON.parse(res.text)).totalItems)
                  var newData = this.tableDataDel(data)
                  this.tableData = newData
                  /**
                   * 显示分页
                   */
                  this.pageShow = true
                }
              })
      } else {
        return
      }
    }
  },
  watch: {
    'checkList': 'searchThroughCheckList'
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
    /* border-bottom: none; */
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

  .el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    margin-top: 10px;
    color: #48576a;
    margin-left: -5px;
    border: none;
    background: #fff;
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
