<template>
  <div class="settlementManager">
    <el-tabs v-model="activeName" @tab-click="getTabName" type="border-card">
      <el-tab-pane name='待结算'>
        <span slot="label">
          <i class="el-icon-date"></i> 待结算</span>
        <el-row class="selectPlace" style="padding: 0px 0 13px 0;">
            <div class="citys" style="margin-left: 76px;">
              <address class="joinArea" style="margin-left: -74px;">加盟区域：</address>
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.cityId' v-for="item in cityList">{{item.cityName}}</span>
            </div>
        </el-row>
        <el-row class="table">
          <el-table 
                :data="tableData"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                style="width: 100% font-size:13px; color: #6c6c6c;">
            <el-table-column prop="withDrawMonth" label="结算月份" min-width="80">
            </el-table-column>
            <el-table-column prop="applyMoney" label="结算金额" min-width="60">
            </el-table-column>
            <el-table-column prop="cityName" label="加盟区域" min-width="120">
            </el-table-column>
            <el-table-column prop="applyUserName" label="申请人" min-width="100">
            </el-table-column>
            <el-table-column prop="applyTime" label="申请日期" min-width="140">
            </el-table-column>
            <el-table-column label="操作" prop="del">
              <template scope="scope">
                <a href="javascript:;" prop="cityPartnerId" @click="openEdit(scope.row, scope.$index)" style="color:#444; margin-right:10px;" title="编辑">
                  <i class="el-icon-document"></i>
                </a>
                <!--dialog 弹窗开始-->
                 <el-dialog title="结算确认" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
                    <el-form :model="editAccount">
                      <el-form-item label="结算月份" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.withDrawMonth" :readonly="true" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟商编号" :label-width="formLabelWidth" style="width: 300px;" readonly>
                        <el-input v-model="editAccount.cityPartnerId" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟地区" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.cityName" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="申请人" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.applyUserName" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="结算金额" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.applyMoney" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="editAccount.description"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button class="partner_button" type="primary" 
                      v-loading.fullscreen.lock="fullscreenLoading" 
                      @click="editConfim(scope.row, scope.$index)">确定结算</el-button>
                      <el-button class="partner_button" @click="dialogVisible = false">取消</el-button>
                    </div>
                  </el-dialog> 
                <!--dialog 弹窗结束-->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
          v-show="pageShow"
          class="page"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="totalItems">
          </el-pagination>
        </el-row>
      </el-tab-pane>

      <!-- 已结算  -->
      <el-tab-pane label="已结算" name='已结算'>
        <el-row class="selectPlace" style="padding: 0px 0 13px 0;">
          <address class="joinArea">加盟区域：</address>
            <div class="citys2">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.cityId' v-for="item in cityList">{{item.cityName}}</span>
            </div>
        </el-row>
        <el-row class="table">
          <el-table 
                :data="tableData2"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                style="width: 100% font-size:13px; color: #6c6c6c;">
            <el-table-column prop="withDrawMonth" label="结算月份" min-width="80">
            </el-table-column>
            <el-table-column prop="applyMoney" label="结算金额" min-width="60">
            </el-table-column>
            <el-table-column prop="cityName" label="申请区域" min-width="120">
            </el-table-column>
            <el-table-column prop="applyUserName" label="申请人" min-width="100">
            </el-table-column>
            <el-table-column prop="confirmTime" label="结算日期" min-width="140">
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="140">
            </el-table-column>
          </el-table>

          <el-pagination
          v-show="pageShow"
          class="page"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="totalItems">
          </el-pagination>
        </el-row>
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
      loading2: false,
      totalItems: 1,
      currentPage: 1,
      pageShow: false,
    }
  },
  mounted: function () {

    this.getCityList()
    this.getDateByTabName('0')
  },
  methods: {
    handleCurrentChange(val) {
      var status;
      if (this.activeName === '待结算') {
        status = 0
      } else {
        status = 1
      }
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'status': status,
          'cityId': this.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId'),
          'currentPage': val
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            var data = JSON.parse(res.text).data
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            var totalPage = Number(JSON.parse(res.text).totalPage)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newData = this.tableDataDel(data)
            if (status === 0) {
              console.log(newData)
              this.tableData = newData
              this.loading2 = false
            } else {
              this.tableData2 = newData
              this.loading2 = false
            }
          }
        })
    },
    handleClick(e) {
      this.loading2 = true
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')
      var status
      if (this.activeName === '待结算') {
        status = 0
      } else {
        status = 1
      }
      request
        .post(host + 'beepartner/admin/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'status': status,
          'cityId': this.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId')
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            var data = JSON.parse(res.text).data
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            var totalPage = Number(JSON.parse(res.text).totalPage)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newData = this.tableDataDel(data)
            if (status === 0) {
              this.tableData = newData
              this.loading2 = false
            } else {
              this.tableData2 = newData
              this.loading2 = false
            }
          }
        })
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
            this.checkLogin(res)
            this.cityList = JSON.parse(res.text).data
          }
        })
    },
    getTabName (tab, event) {
      if (this.activeName === '待结算') {
        this.getDateByTabName('0')
      } else {
        this.getDateByTabName('1')
      }
    },
    getDateByTabName (status) {
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'status': status,
          'cityId': this.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId')
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            var data = JSON.parse(res.text).data
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            var totalPage = Number(JSON.parse(res.text).totalPage)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newData = this.tableDataDel(data)
            if (status === '0') {
              console.log(newData)
              this.tableData = newData
              this.loading2 = false
            } else {
              this.tableData2 = newData
              this.loading2 = false
            }
          }
        })   
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.withDrawMonth = arr[i].withDrawMonth
        obj.applyMoney = arr[i].applyMoney
        obj.cityName = arr[i].cityName
        obj.applyUserName = arr[i].applyUserName
        if (this.activeName === '待结算') {
          obj.applyTime = arr[i].applyTimeStr
        } else {
          obj.confirmTime = arr[i].confirmTimeStr
        }
        // obj.allianceId = arr[i].withDrawMonth
        obj.cityPartnerId = arr[i].cityPartnerId
        obj.description = arr[i].description

        arrDeled.push(obj)
      }

      return arrDeled
    },
    openEdit(row) {
      console.log(row)
      this.dialogVisible = true
      this.editAccount.withDrawMonth = row.withDrawMonth
      this.editAccount.cityPartnerId = row.cityPartnerId
      this.editAccount.cityName = row.cityName
      this.editAccount.applyUserName = row.applyUserName
      this.editAccount.applyMoney = row.applyMoney
      // this.editAccount.withdrawalCode = row.allianceId
    },
    editConfim (row, index) {
      console.log(row)
      this.$alert('请核对信息后确认结算', 'Warning', {
        confirmButtonText: '确定',
        callback: () => {
        this.fullscreenLoading = true
        request
          .post(host + 'beepartner/admin/withDraw/confirmWithDraw')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'withDrawMonth': row.withDrawMonth,
            'applyMoney': row.applyMoney,
            'description': this.editAccount.description,
            'cityPartnerId': row.cityPartnerId
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              this.checkLogin(res)
              if (JSON.parse(res.text).resultCode === 1) {
                this.tableData.splice(index, 1)
                this.loading2 = false
                this.$message({
                  type: 'success',
                  message: '合伙人将收到你的结算信息'
                })
              } else {
                this.$message('用户名不存在')
              }
            }
            var that = this
            setTimeout(function () {
              that.fullscreenLoading = false
              that.dialogVisible = false
            }, 1000)
          })
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

.page {
  white-space: nowrap;
  padding: 2px 5px;
  color: #48576a;
  background: #fff;
  margin-left: -5px;
  margin-top: 10px;
  border: none;
}
</style>

