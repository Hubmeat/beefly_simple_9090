<template>
  <div class="carUseDetail">
    <div class="detailTitle">
      <h3>加盟商详情</h3>
    </div>
    <el-row>
      <el-col :span="16">
        <table>
          <tbody>
            <tr>
              <td>
                <span class="prex">加盟商编号：</span>{{franchiseeDetail.cityPartnerId}}</td>
              <td>
                <span class="prex">企业名称：</span>{{franchiseeDetail.companyName}}</td>
            </tr>
            <tr>
              <td>
                <span class="prex">营业执注册号：</span>{{franchiseeDetail.businessLicense}}</td>
              <td>
                <span class="prex">通讯地址：</span>{{franchiseeDetail.address}}</td>
            </tr>
            <tr>
              <td>
                <span class="prex">加盟日期：</span>{{franchiseeDetail.joinTime}}</td>
              <td>
                <span class="prex">认购车辆：</span>{{franchiseeDetail.subscriptionNum}}辆</td>
            </tr>
            <tr>
              <td>
                <span class="prex">加盟资金：</span>￥{{franchiseeDetail.subscriptionMoney}}</td>
              <td>
                <span class="prex">加盟区域：</span>{{franchiseeDetail.cityName}}</td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="6" class="battery">
        <ul>
          <li>
            <img src="../../../assets/img/1.jpg" alt="img">
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="record">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane class="incomeRecord recodeTable" label="车辆明细" name="车辆明细">
          <el-table :data="carDetail" style="width: 100%" v-loading="loading2" element-loading-text="拼命加载中">
            <el-table-column prop="code" label="车辆号">
            </el-table-column>
            <el-table-column prop="boxCode" label="终端编号">
            </el-table-column>
            <el-table-column prop="generationsName" label="车辆型号">
            </el-table-column>
            <el-table-column prop="onlineTimeStr" label="上线日期">
            </el-table-column>
            <el-table-column prop="stateName" label="状态">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="合伙人" name="second" class="recodeTable">
            <el-table
              :data="partnerData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="name"
                label="姓名"
                >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                >
              </el-table-column>
              <el-table-column
                prop="idCard"
                label="证件号码">
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="手机号">
              </el-table-column>
               <el-table-column
                prop="email"
                label="邮箱">
              </el-table-column>
              <el-table-column
                prop="email"
                label="认购车辆数">
              </el-table-column>
            </el-table>
          </el-tab-pane> -->
        <el-tab-pane label="结算记录" name="结算记录" class="recodeTable">
          <el-table :data="drawalData" style="width: 100%">
            <el-table-column prop="month" label="结算月份">
            </el-table-column>
            <el-table-column prop="couponAmount" label="结算金额">
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间">
            </el-table-column>
            <el-table-column prop="stateDes" label="状态">
            </el-table-column>
            <el-table-column prop="des" label="财务备注">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="联系人" name="联系人" class="recodeTable">
          <ul class='contact_ul'>
            <li>
              <span>姓名：</span>{{franchiseeDetail.userName}}</li>
            <li>
              <span>证件类别：</span>{{franchiseeDetail.cardType===0?'身份证':'护照'}}</li>
            <li>
              <span>证件号码：</span>{{franchiseeDetail.idCard}}</li>
            <li>
              <span>手机号：</span>{{franchiseeDetail.phone}}</li>
            <li>
              <span>邮箱：</span>{{franchiseeDetail.email}}</li>
            <li>
              <span>用户名：</span>{{franchiseeDetail.userName}}</li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper" :total="totalItems" v-show="pageShow">
    </el-pagination>
  </div>
</template>
<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import request from 'superagent'
import { host } from '../../../config/index'
import moment from 'moment'
export default {
  data: function () {
    return {
      loading2: false,
      currentPage3: 1,
      totalItems: 1,
      pageShow: false,
      carDetail: [],
      drawalData: [],
      partnerData: [],
      franchiseeDetail: {},
      router: this.$route.query.carNum,
      car_infor_data: [],
      activeName: '车辆明细'
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var id = this.$route.params.id.split('&')[0]
      var cityPartnerId = this.$route.params.id.split('&')[1]
      if (this.activeName === '车辆明细') {
        this.loading2 = true
        request.post(host + 'beepartner/admin/cityPartner/getBikeDetail')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'id': id,
            'cityPartnerId': cityPartnerId,
            'currentPage': val
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              this.checkLogin(res)   
              this.loading2 = false
              var result = JSON.parse(res.text).data || []
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              var totalPage = Number(JSON.parse(res.text).totalPage)
              if (totalPage > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
              // var newCarDetail = result.map((item)=>{
              //   return Object.assign({},item,{onlineTime:moment(item.onlineTime).format('YYYY年MM月DD号')})
              // })
              this.carDetail = result
            }
          })
      } else if (this.activeName === '结算记录') {
        this.loading2 = true
        this.activeName = '结算记录'
        request.post(host + 'beepartner/admin/cityPartner/getWithdrawals')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'id': id,
            'cityPartnerId': cityPartnerId,
            'currentPage': val
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              this.checkLogin(res)
              this.loading2 = false
              var result = JSON.parse(res.text).data || []
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              var totalPage = Number(JSON.parse(res.text).totalPage)
              // var newdrawalData = result.map((item)=>{
              //   return Object.assign({},item,{applyTime:moment(item.applyTime).format('YYYY-MM-DD HH:MM:SS')})
              // })
              if (totalPage > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
              this.drawalData = result
            }
          })
      } else {
        this.pageShow = false
        this.activeName = '联系人'
        return false
      }
    },
    handleTabClick(tab) {
      this.currentPage3 = 1
      this.pageShow = false
      var id = this.$route.params.id.split('&')[0]
      var cityPartnerId = this.$route.params.id.split('&')[1]
      if (tab.label === '车辆明细') {
        this.getBikeDetail()
      } else if (tab.label === '结算记录') {
        this.activeName = '结算记录'
        request.post(host + 'beepartner/admin/cityPartner/getWithdrawals')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'id': id,
            'cityPartnerId': cityPartnerId
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              this.checkLogin(res)
              var result = JSON.parse(res.text).data || []
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              var totalPage = Number(JSON.parse(res.text).totalPage)
              // var newdrawalData = result.map((item)=>{
              //   return Object.assign({},item,{applyTime:moment(item.applyTime).format('YYYY-MM-DD HH:MM:SS')})
              // })
              if (totalPage > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
              this.drawalData = result
            }
          })
      } else {
        this.pageShow = false
        this.activeName = '联系人'
        return false
      }
    },
    getBikeDetail() {
      var id = this.$route.params.id.split('&')[0]
      var cityPartnerId = this.$route.params.id.split('&')[1]
      request.post(host + 'beepartner/admin/cityPartner/getBikeDetail')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'id': id,
          'cityPartnerId': cityPartnerId
        })
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            this.checkLogin(res)
            var result = JSON.parse(res.text).data || []
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            var totalPage = Number(JSON.parse(res.text).totalPage)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            // var newCarDetail = result.map((item)=>{
            //   return Object.assign({},item,{onlineTime:moment(item.onlineTime).format('YYYY年MM月DD号')})
            // })
            this.carDetail = result
          }
        })
    },
    checkLogin (res) {
      if (JSON.parse(res.text).message === '用户登录超时') {
        this.$router.push('/login')
      }
    }
  },
  mounted: function () {
    //this.loading = true
    var id = this.$route.params.id.split('&')[0]
    var cityPartnerId = this.$route.params.id.split('&')[1]
    request
      .post(host + 'beepartner/admin/cityPartner/getCityPartnerDetail')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
      .send({
        'id': id,
        'cityPartnerId': cityPartnerId
      })
      .end((err, res) => {
        if (err) {
          //this.loading = false
          console.log('err:' + err)
        } else {
          this.checkLogin(res)
          console.log(JSON.parse(res.text).data)
          var res = JSON.parse(res.text).data
          // this.franchiseeDetail = Object.assign({},res,{joinTime:moment(res.joinTime).format('YYYY年MM月DD号')})
          this.franchiseeDetail = res
        }
      })
    /**
     * 获取车辆详情
     */
    this.getBikeDetail()
  }
}
</script>
<style scoped>
div.carUseDetail {
  margin-right: 20px;
  background: #fff;
  padding-bottom: 120px;
}

div.carUseDetail table {
  border-collapse: collapse;
  width: 100%;
}

div.carUseDetail table tr td {
  padding: 5px 10px;
}

div.carUseDetail table tr td span.prex {
  display: inline-block;
  width: 100px;
  text-align: right;
  color: #bdb6b6;
  font-size: 14px;
  margin-right: 8px;
}

div.carUseDetail div.detailTitle h3 {
  line-height: 30px;
  background: #555;
  color: #fff;
  margin-bottom: 20px;
  padding: 10px;
}

div.carUseDetail div.battery {
  float: right;
}

div.carUseDetail div.battery ul li {
  list-style-type: none;
  margin-bottom: 10px;
  margin-right: 20px;
}

div.carUseDetail div.battery ul li img {
  display: block;
  width: 100%;
}

div.carUseDetail div.record {
  margin-top: 50px;
  padding: 0 4px 0 4px;
  background: #fff;
}

div.carUseDetail div.recodeTable table {
  border-collapse: collapse;
  width: 100%;
}

div.carUseDetail div.recodeTable table thead tr th {
  font-weight: normal;
  text-align: left;
  border-bottom: 1px solid #afa7a7;
  padding: 5px 10px;
}

div.carUseDetail div.recodeTable table tbody tr td {
  border: none;
  border-bottom: 1px dotted #afa7a7;
  padding: 10px;
  color: #555;
}

div#carUseDetail_page {
  margin-top: 50px;
  min-height: 230px;
}

.contact_ul {
  width: 300px;
  height: 200px;
  margin-left: 20px;
  margin-top: 10px;
  list-style: none;
}

.contact_ul li {
  height: 30px;
  line-height: 30px;
  color: #555;
}

.contact_ul li span {
  height: 30px;
  width: 80px;
  display: inline-block;
  margin-right: 6px;
  text-align: right;
  color: #bdb6b6;
  line-height: 30px;
}

div.el-pagination {
  margin-left: 1px;
  padding-left: 0;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
