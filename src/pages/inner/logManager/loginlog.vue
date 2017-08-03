<template>
  <div class="loginlog">
    <el-tabs type="border-card" @tab-click="handleClickTab">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i>平台</span>
       <el-row class="querybar">
         <el-form :inline="true" v-bind:model="form_plat">
           <el-form-item label="关键字">
             <el-input v-model="keyword" placeholder="姓名/用户名"></el-input>
           </el-form-item>
           <el-form-item class="operatortime" label="操作日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:9px;" >-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="endTime" style="width: 100%;"></el-date-picker>
            </el-col>
           </el-form-item>
           <el-button id="platSearchBtn" type="primary">查询</el-button>
         </el-form>
       </el-row>
       <el-row class="table">
          <el-table :data="form_plat.tableData" style="width:100%" element-loading-text="拼命加载中" v-loading="loading">
            <el-table-column
              prop="userId"
              label="用户名"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              label="操作类别"
            >
              <template scope="scope">
                {{scope.row.type===0?'登录':'注销'}}
              </template>
            </el-table-column>
            <el-table-column 
              prop="loginTime"
              label="登录日期"
            >
            </el-table-column>
          </el-table>
       </el-row>
      </el-tab-pane>
      <el-tab-pane label="加盟商">
        <el-row class="querybar">
         <el-form :inline="true" v-bind:model="form_join">
           <el-row class="selectPlace">
              <address class="joinArea">加盟区域：</address>
              <div class="citys">
                <span @click="handleClick">全部地区</span>
                <span @click="handleClick">芜湖</span>
                <span @click="handleClick">郑州</span>
                <span @click="handleClick">南京</span>
                <span @click="handleClick" class="active">上海</span>
              </div>
           </el-row>
           <el-form-item class="keywords">
             <span class="keywords">关键字</span>
             <el-input v-model="keyword" placeholder="用户名/姓名"></el-input>
           </el-form-item>
           <el-form-item class="operatortime" label="操作日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:9px;">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="endTime" style="width: 100%;"></el-date-picker>
            </el-col>
           </el-form-item>
           <el-button id="logSearchBtn" type="primary">查询</el-button>
         </el-form>
       </el-row>
       <el-row class="table">
           <el-table :data="form_join.tableData" style="width:100%">
            <el-table-column
              prop="userId"
              label="用户名"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              label="操作类别"
            >
              <template scope="scope">
                {{scope.row.type===0?'登录':'注销'}}
              </template>
            </el-table-column>
            <el-table-column 
              prop="loginTime"
              label="登录日期"
            >
            </el-table-column>
          </el-table>
       </el-row>
      </el-tab-pane>
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems"
        v-show="pageShow"
        >
      </el-pagination>
    </el-tabs>

  </div>
</template>
<style scoped>
  div.hasData{line-height: 60px;text-align: center;height: 60px;color:#9e9090;width: 100%;display:block;}
  div.loginlog i.el-icon-date{margin-right:5px;}
  div.operatortime{text-align: center;}
  div.querybar{padding-top: 20px;background: #f3f0f0;padding-left: 20px;}
  div.loginlog table{border-collapse:collapse;width:100%;}
  div.loginlog table thead tr th{font-weight:normal;text-align: left;border-bottom:2px solid #585555;padding: 5px 10px;}
  div.loginlog table tbody tr td{font-size:14px;color:rgba(121,121,121,1);font-family: '微软雅黑';border:none;border-bottom:1px dotted #afa7a7;padding:14px 10px;color:#555;}
  div.loginlog div.table{margin-top: 20px;}
  div.loginLog_page{margin-top: 50px;}
  div.selectPlace{margin-bottom:20px;}
  div.selectPlace address{font-style:normal;display:inline;font-size:14px;}
  div.selectPlace div.citys{display:inline-block;}
  div.selectPlace span{cursor:pointer;font-size:14px;display:inline-block;padding:5px;border:1px solid transparent;}
  div.selectPlace span.active{border:1px solid orange;}
  div.el-form-item__content div.el-input{display:inline-block;width: 192px;}
  div.keywords span.keywords{width: 62px;display: inline-block;text-align: right;margin-right: 10px;}
  button#logSearchBtn,button#platSearchBtn{width: 80px;
    height: 36px;
    line-height: 11px;
    margin-right: 30px;
    color: #fff;
    outline: none;
    border: none;
    background: rgba(52,52,67, 0.8);}
    div.el-pagination{margin-top:20px;margin-bottom:10px;margin-left:0;padding-left:0;}
</style>
<script>
  import $ from 'jquery'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
  import moment from 'moment'
  import request from 'superagent'
  import {siblings, checkPositiveNumber} from '../../../../utils/index.js'
  import { host } from '../../../config/index.js'
  export default {
    data: function () {
      return {
        loading: false,
        currentPage3:1,
        totalItems:1,
        pageShow: false,
        tabTitle: '平台',
        keyword: '',
        startTime: moment(),
        endTime: moment(),
        form_plat: {
          tableData: [],
        },
        form_join: {
          tableData: []
        },
        totalPage:1,
        plat_totalPage: '',
        join_totalPage: '',
        plat_currentPage: 1,
        join_currentPage: 1
      }
    },
    methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick (e) {
        var elems = siblings(e.target)
        for (var i = 0; i < elems.length; i++) {
          elems[i].setAttribute('class', '')
        }
        e.target.setAttribute('class', 'active')
      },
      handleClickTab (tab, event) {
        var that = this
         this.currentPage3 = 1
        this.tabTitle = event.target.innerText
         if(this.tabTitle === '平台') {
          request.post(host + 'franchisee/log/allLog')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            franchiseeId: '123456',
            userId: 'jjjj'
          })
          .end(function(err, res){
            if (err) {
              console.log(err)
            } else {
              var newArr =  JSON.parse(res.text).list.map((item) => {
                var obj = Object.assign({},item,{loginTime: moment(item.loginTime).format('YYYY-MM-DD HH:mm:ss')})
                return obj
              })
              that.form_plat.tableData = newArr
              that.plat_totalPage = JSON.parse(res.text).totalPage
              var len = JSON.parse(res.text).list.length
              if (that.plat_totalPage>1) {
                that.pageShow = true
              }else {
                that.pageShow = false
              }
              that.totalItems  = JSON.parse(res.text).totalItems
            }
          })
        }else {
          that.pageShow = false
          request.post(host + 'franchisee/log/getLoginLog')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            franchiseeId: '123456',
            userId: 'jjjj'
          })
          .end(function(err, res){
            if (err) {
              console.log(err)
            } else {
              var newArr =  JSON.parse(res.text).list.map((item) => {
                var obj = Object.assign({},item,{loginTime: moment(item.loginTime).format('YYYY-MM-DD HH:mm:ss')})
                return obj
              })
              that.form_join.tableData = newArr
              that.join_totalPage = JSON.parse(res.text).totalPage || 20
              var len = JSON.parse(res.text).list.length
              if (that.join_totalPage>1) {
                that.form_join.hasJoinData = false
                that.pageShow = true
              }else{
                that.pageShow = false
              }
              that.totalItems = JSON.parse(res.text).totalItems
            }
          })
        }
      }
    },
    mounted: function () {
      var that = this
      if(this.tabTitle === '平台') {
        request.post(host + 'franchisee/log/allLog')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            franchiseeId: '123456',
            userId: 'jjjj'
          })
          .end(function(err, res){
            if (err) {
              console.log(err)
            } else {
              var newArr =  JSON.parse(res.text).list.map((item) => {
                var obj = Object.assign({},item,{loginTime: moment(item.loginTime).format('YYYY-MM-DD HH:mm:ss')})
                return obj
              })
              that.form_plat.tableData = newArr
              that.plat_totalPage = JSON.parse(res.text).totalPage || 20
              if (that.plat_totalPage>1) {
                that.pageShow = true
              }else {
                that.pageShow = false
              }
              that.totalItems = JSON.parse(res.text).totalItems
            }
          })
      }
    },
    watch: {
      currentPage3: {
        handler: function (val, oldVal) {
          var that = this
          that.loading = true
          if(this.tabTitle==='平台'){
             request.post(host + 'franchisee/log/allLog?page=' + val)
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                franchiseeId: '123456',
                userId: 'jjjj'
              })
              .end(function (err, res) {
                if (err) {
                  that.loading = false
                  console.log(err)
                } else {
                  that.loading = false
                  var totalPage = JSON.parse(res.text).totalPage
                  if(totalPage>1){
                    that.pageShow = true
                  }else{
                    that.pageShow = false
                  }
                  that.totalItems = JSON.parse(res.text).totalItems
                  that.form_plat.tableData = JSON.parse(res.text).list
                }
              })
          }else{
            request.post(host + 'franchisee/log/getLoginLog?page=' + val)
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                franchiseeId: '123456',
                userId: 'jjjj'
              })
              .end(function (err, res) {
                if (err) {
                  console.log(err)
                } else {
                  that.form_join.tableData = JSON.parse(res.text).list
                }
              })
          }
        },
        deep: true
      }
    }
  }
</script>

