<template>
  <div class="settlementManager">
    <el-tabs v-model="activeName" @tab-click="getTabName" type="border-card">
      <el-tab-pane name='待结算'>
        <span slot="label">
          <i class="el-icon-date"></i> 待结算</span>
        <el-row class="selectPlace" style="padding: 0px 0 13px 0;">
          <address class="joinArea">加盟区域：</address>
            <div class="citys">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.areaID' v-for="item in cityList">{{item.area}}</span>
            </div>
        </el-row>
        <el-row class="table">
          <el-table 
                :data="tableData"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                style="width: 100% font-size:13px; color: #6c6c6c;">
            <el-table-column prop="settle_date" label="结算月份" min-width="80">
            </el-table-column>
            <el-table-column prop="settle_money" label="结算金额" min-width="60">
            </el-table-column>
            <el-table-column prop="alliance_area" label="加盟区域" min-width="120">
            </el-table-column>
            <el-table-column prop="apply_person" label="申请人" min-width="100">
            </el-table-column>
            <el-table-column prop="apply_date" label="申请日期" min-width="140">
            </el-table-column>
            <el-table-column label="操作" prop="del">
              <template scope="scope">
                <a href="javascript:;" prop="allianceId franchiseeId" @click="openEdit(scope.row, scope.$index)" style="color:#444; margin-right:10px;" title="编辑">
                  <i class="el-icon-document"></i>
                </a>
                <!--dialog 弹窗开始-->
                 <el-dialog title="结算确认" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
                    <el-form :model="editAccount">
                      <el-form-item label="结算月份" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.month" :readonly="true" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟商编号" :label-width="formLabelWidth" style="width: 300px;" readonly>
                        <el-input v-model="editAccount.allianceNum" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟地区" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.allianceArea" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="申请人" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.applyPerson" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="结算金额" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.settleMoney" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="备注" :label-width="formLabelWidth" v-model="editAccount.settleRemark">
                        <el-input type="textarea"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button prop="editAccount.withdrawalCode" class="partner_button" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="editConfim(scope.row, scope.$index)">确定结算</el-button>
                      <el-button class="partner_button" @click="dialogVisible = false">取消</el-button>
                    </div>
                  </el-dialog> 
                <!--dialog 弹窗结束-->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="carManager_page" style="margin-left: -8px;">
          <div class="M-box"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已结算" name='已结算'>
        <el-row class="selectPlace" style="padding: 0px 0 13px 0;">
          <address class="joinArea">加盟区域：</address>
            <div class="citys2">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.areaID' v-for="item in cityList">{{item.area}}</span>
            </div>
        </el-row>
        <el-row class="table">
          <el-table 
                :data="tableData2"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                style="width: 100% font-size:13px; color: #6c6c6c;">
            <el-table-column prop="settle_date" label="结算月份" min-width="80">
            </el-table-column>
            <el-table-column prop="settle_money" label="结算金额" min-width="60">
            </el-table-column>
            <el-table-column prop="alliance_area" label="申请区域" min-width="120">
            </el-table-column>
            <el-table-column prop="apply_person" label="申请人" min-width="100">
            </el-table-column>
            <el-table-column prop="apply_date" label="结算日期" min-width="140">
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="140">
            </el-table-column>
          </el-table>
        </el-row>
        <div class="carManager_page" style="margin-left: -8px;">
          <div class="M-box"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import request from 'superagent'
import moment from 'moment'
import $ from 'jquery'
import { siblings } from '../../../../utils/index.js'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import { host } from '../../../config/index.js'
export default {
  data: function () {
    return {
      tableData: [],
      tableData2: [],
      dialogVisible: false,
      editAccount: {
        month: '',
        allianceNum: '',
        allianceArea: '',
        applyPerson: '',
        settleMoney: '',
        settleRemark: ''
      },
      formLabelWidth: '90px',
      dialogVisible: false,
      fullscreenLoading: false,
      activeName: '待结算',
      pagetotal: '',
      cityList: [],
      timer2: null,
      loading2: false
    }
  },
  mounted: function () {

    this.getCityList()
    this.getDateByTabName('getNotWithdrawals')
  },
  beforeUpdate: function () {
    var type 
    if (this.activeName === '待结算') {
      type = 'getNotWithdrawals'
    } else {
      type = 'getWithdrawals'
    }
    var that = this
    $('.M-box').click('a', function (e) {
      // 表格loading
      this.loading2 = true
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
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }
      this.timer = setTimeout(function () {
        request
          .post(host + 'franchisee/withdrawal/' + type + '?page=' + e.target.innerHTML)
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'cityId': that.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId')
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(res)
              console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var newData = that.tableDataDel(pagedata)
              if (type === 'getNotWithdrawals') {
                that.tableData = newData
                // 表格loading
                this.loading2 = false
              } else {
                that.tableData2 = newData
                this.loading2 = false
              }              
            }
          })
      }, 200)
    })

    //城市筛选功能 
    // var that = this
    // $('.citys span').on('click', function () {
    //   clearTimeout(this.timer2)
    //   var id = $(this).attr('myId')
    //   this.timer2 = setTimeout(function () {
        
    //   }, 200)
    // })
  },
  methods: {
    handleClick(e) {
      this.loading2 = true
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')
      var type
      if (this.activeName === '待结算') {
        type = 'getNotWithdrawals'
      } else {
        this.pagetotal = ''
        type = 'getWithdrawals'
      }
      request
        .post(host + 'franchisee/withdrawal/' + type)
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': this.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId')
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            console.log(res)
            console.log(JSON.parse(res.text).list)
            var data = (JSON.parse(res.text)).list
            this.pagetotal = (JSON.parse(res.text)).totalPage
            var newData = this.tableDataDel(data)
            if (type === 'getNotWithdrawals') {
              this.tableData = newData
              this.loading2 = false
            } else {
              this.tableData2 = newData
              this.loading2 = false
            }
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
    getTabName (tab, event) {
      if (this.activeName === '待结算') {
        this.getDateByTabName('getNotWithdrawals')
      } else {
        this.pagetotal = ''
        this.getDateByTabName('getWithdrawals')
      }
    },
    getDateByTabName (type) {
      this.loading2 = true
      request
        .post(host + 'franchisee/withdrawal/' + type)
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'cityId': this.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId')
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            console.log(res)
            console.log(JSON.parse(res.text).list)
            var data = (JSON.parse(res.text)).list
            this.pagetotal = (JSON.parse(res.text)).totalPage
            var newData = this.tableDataDel(data)
            if (type === 'getNotWithdrawals') {
              this.tableData = newData
              this.loading2 = false
            } else {
              this.tableData2 = newData
              this.loading2 = false
            }
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
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.settle_date = arr[i].month
        obj.settle_money = arr[i].money
        obj.alliance_area = arr[i].cityName
        obj.apply_person = arr[i].userId
        if (this.activeName === '待结算') {
          obj.apply_date = moment(arr[i].applyTime).format('YYYY-MM-DD HH:mm:ss')         
        } else {
          obj.apply_date = moment(arr[i].applyEndTime).format('YYYY-MM-DD HH:mm:ss') 
        }
        obj.allianceId = arr[i].withdrawalCode
        obj.franchiseeId = arr[i].franchiseeId
        obj.remark = ''

        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
    },
    openEdit(row) {
      this.dialogVisible = true
      this.editAccount.month = row.apply_date
      this.editAccount.allianceNum = row.franchiseeId
      this.editAccount.allianceArea = row.alliance_area
      this.editAccount.applyPerson = row.apply_person
      this.editAccount.settleMoney = row.settle_money
      this.editAccount.withdrawalCode = row.allianceId
      this.editAccount.settleRemark = row.remark
    },
    editConfim (row, index) {
      console.log(row)
      this.$alert('请核对信息后确认结算', 'Warning', {
        confirmButtonText: '确定',
        callback: () => {
        request
          .post(host + 'franchisee/withdrawal/confirmWithdrawal')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'withdrawalCode': row.allianceId
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              console.log(JSON.parse(res.text))
              if (JSON.parse(res.text).code === 0) {
                this.tableData.splice(index, 1)
                this.loading2 = false
              } else {
                this.$message('用户名不存在')
              }
            }
        })
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '合伙人将收到你的信息'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
div.selectPlace address {
  font-style: normal;
  display: inline;
  font-size: 14px;
  margin-right: 2px;
}

div.selectPlace div.citys {
  display: inline-block;
}

div.selectPlace div.citys2 {
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

div.table table {
  border-collapse: collapse;
  width: 100%;
}

div.table table thead tr th {
  font-weight: normal;
  text-align: left;
  border-bottom: 2px solid #585555;
  padding: 5px 10px;
}

div.table table tbody tr td {
  font-size: 14px;
  color: rgba(121, 121, 121, 1);
  font-family: '微软雅黑';
  border: none;
  border-bottom: 1px dotted #afa7a7;
  padding: 14px 10px;
  color: #555;
}

div.table table thead tr th span.sort {
  padding: 0 5px;
  display: inline-block;
  cursor: pointer;
}

.partner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
  margin-left: 90px;
}

.partner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.partner_button:nth-of-type(2) {
  background: #fff;
  color: #444;
  border: 1px solid rgba(196,196,196,1);
}

.partner_button:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

.partner_button {
  width: 120px;
  height: 50px;
  float: left;
  margin-top: -30px;
  margin-bottom: 20px;
}
</style>

