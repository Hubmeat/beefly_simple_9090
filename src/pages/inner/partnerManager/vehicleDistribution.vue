<template>
  <div style="margin-right: 20px;">
    <div id='distribution_header'>
      <h1>分配车辆</h1>
      <table class="franchiseeDetail">
        <tbody>
          <tr>
            <td><span>加盟商编号：</span>{{franchiseeDetail.franchiseeId}}</td>
             <td><span>企业名称：</span>{{franchiseeDetail.companyName}}</td>
          </tr>
          <tr>
            <td><span>认购车辆：</span>{{franchiseeDetail.subscriptionNum}}</td>
            <td><span>拥有车辆：</span>{{franchiseeDetail.subscriptionNum}}</td>
            <td><span>加盟商区域：</span>{{franchiseeDetail.cityName}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id='distribution_selectBase'>
      <div id='distribution_table'>
        <div class='distribution_table_search'>
          <h5>【合肥地区】待分配的车辆</h5>
          <input type="text" placeholder="车辆号\终端号">
          <span>
            <i class='el-icon-search'></i>
          </span>
        </div>

        <div class='table'>
          <el-table
               @select="handleSelectChange" 
              :empty-text="emptyText"
              v-loading="loading2"
              element-loading-text="拼命加载中"
              ref="multipleTable"
              :data="tableData_distribution"
              border
              tooltip-effect="dark"
              style="width: 100%; font-size: 13px;">
              <el-table-column
                type="selection"
                min-width="55">
              </el-table-column>
              <el-table-column
                prop="boxCode"
                label="终端编号"
                min-width="120">
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
                prop="state"
                label="车辆状态"
                min-width="80">
              </el-table-column>
            </el-table>      
        </div>
        <el-pagination
              v-show="pageShow"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="totalItems">
        </el-pagination>
        <!-- <div id="distribution_page">
          <div class="M-box"></div>
        </div>   -->
      </div>

      <div id='right_hasbeen_distribution'>
          <h6>你选择的车辆: <span>{{this.multipleSelection.length}}辆</span><span>清空</span></h6>
          <ul class="list">
            <li :key="list.bikeCode" v-for="list of countAllotCars">{{list.boxCode}} <span><i class="iconfont">&#xe60a;</i></span></li>
          </ul>
          <el-row class="allot">
            <el-button>确定</el-button> 
            <el-button>取消</el-button> 
          </el-row>
      </div>

    </div>
  </div>
</template>

<style scoped>
div.allot{text-align: center}
#distribution_header {
  height: 110px;
  display: block;
  background: #fff;
  padding: 10px 20px 20px 20px;
  margin-bottom: 20px;
}

#distribution_header>h1 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-indent: 2px;
  font-weight: 600;
}

#distribution_header ul {
  list-style: none;
  font-size: 16px;
  display: block;
  width: 100%;
  padding: 4px;
 height: 40px;
}
#distribution_header ul li{float:left;margin-right:120px;}
/* #distribution_header ul:nth-of-type(2) {
  width: 400px;
  position: relative;
}

#distribution_header ul:nth-of-type(2) li {
  width: 100px;
  display: block;
}

#distribution_header ul:nth-of-type(2) li:nth-of-type(3) {
  position: absolute;
  left: 200px;
  top: 4px;
} */
#distribution_header ul:nth-of-type(2) li:nth-of-type(1) {
  margin-left:12px;
} 
#distribution_header ul:nth-of-type(2) li:nth-of-type(2) {
  margin-left:27px;
} 
/* ======  distribution_selectBase  ============*/
#distribution_selectBase {
  width: 100%;
  background: #f3f3f5;
  overflow: hidden;
  height:600px;
}

#distribution_selectBase #distribution_table {
  width: 70%;
  float: left;
  padding: 10px 20px 0 20px;
  border: 1px solid #e7ecf1;
  margin-right: 20px;
  background: #fff;
  height:100%;
}

.distribution_table_search>h5 {
  padding: 14px 14px 14px 0;
  width: 160px;
  height: 30px;
  line-height: 30px;
  float: left;
}

.distribution_table_search input {
  width: 180px;
  height: 28px;
  display: block;
  border-radius: 5px 0 0 5px;
  border: 1px solid #bfcbd9;
  text-indent: 10px;
  border-right: none;
  float: left;
  margin-top: 14px;
  outline: none;
}

::-webkit-input-placeholder { /* WebKit browsers */ 
color: #bfcbd9; 
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #bfcbd9; 
} 
::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #bfcbd9; 
} 
:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #bfcbd9; 
} 

.distribution_table_search input+span {
  width: 28px;
  height: 28px;
  line-height: 28px;
  display: block;
  border-radius: 0 5px 5px 0;
  border: 1px solid #bfcbd9;
  border-left: none;
  float: left;
  margin-top: 14px;
  outline: none;color: #bfcbd9; 
}

#right_hasbeen_distribution {
  background: #fff;
  border: 1px solid #e7ecf1;
  float: left;
  padding: 29px 0 10px 0;
  width: 23.88%;
  height:100%;
  box-sizing: border-box
}

#right_hasbeen_distribution h6 {
  padding: 0px 14px 8px 20px;
  width: 220px;
  height: 30px;
  line-height: 30px;
}

#right_hasbeen_distribution h6 span:nth-of-type(2) {
  float: right;
  color: blue;
}

#right_hasbeen_distribution h6 span:nth-of-type(2):hover {
  cursor: pointer;
  text-decoration: underline;
}

#right_hasbeen_distribution ul {
  list-style: none;
  border-top: 1px solid #dfe6ec;
  max-height: 443px;
  height:443px;
  overflow-y: auto;
  overflow-x: hidden;
}

#right_hasbeen_distribution ul li {
  list-style: none;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 12px;
  padding-left: 20px;
  border-bottom: 1px solid #eee;
}

#right_hasbeen_distribution ul li span {
  float: right;
  width: 20px;
  height: 30px;
  margin-right: 25px;
}


table.franchiseeDetail{width:100%;border-collapse: collapse;}
table.franchiseeDetail tr{line-height:40px;}
table.franchiseeDetail tr td {border:1px dotted #fff;}
table.franchiseeDetail tr td span{text-align: right;width:100px;display:inline-block;color:rgba(153,153,153,1);}

/*#distribution_selectBase #distribution_table*/

/*  ======= distribution_page ======*/
#distribution_page {
  /*padding: 4px 10px 0 20px;*/
  padding-bottom: 100px;
  margin-left: -8px;
  margin-top: 25px;
  background: #fff;
  min-height: 230px;
}
</style>

<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import request from 'superagent'
import {host} from '../../../config/index'
import moment from 'moment'
export default {
  data () {
    return {
      franchiseeDetail:{},
      cityCode:'',
      currentPage3:1,
      totalItems:1,
      pageShow:false,
      loading2:false,
      emptyText: ' ',
      tableData_distribution: [],
      multipleSelection:[],
      countAllotCars:[],
    }
  },
  methods:{
    handleSelectChange(selection,row) {
      console.log(row.boxCode)
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  mounted () {
        var franchiseeId = this.$route.params.id
        request
          .post(host + 'franchisee/franchiseeManager/getFranchiseeDetail')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'franchiseeId': franchiseeId,
          })
          .end((err, res) => {
            if (err) {
              //this.loading = false
              console.log('err:' + err)
            } else {
              // console.log(JSON.parse(res.text))
              var res = JSON.parse(res.text)
              this.franchiseeDetail = Object.assign({},res,{joinTime:moment(res.joinTime).format('YYYY年MM月DD号')})
              this.cityCode = res.cityId
              if(this.cityCode.length>0){
                request.post(host + 'franchisee/franchiseeManager/getNotAllotBikes')
                  .withCredentials()
                  .set({
                    'content-type': 'application/x-www-form-urlencoded'
                  })
                  .send({
                    cityCode:this.cityCode
                  })
                  .end((error,res)=>{
                    if(error){
                      console.log(error)
                    }else{
                      var data = JSON.parse(res.text).list
                      var newData = data.map((item)=>{
                        return Object.assign({},item,{onlineTime:moment(item.onlineTime).format('YYYY-MM-DD')})
                      })
                      this.tableData_distribution = newData
                      var totalPage = JSON.parse(res.text).totalPage
                      if(totalPage>1){
                        this.pageShow = true
                      }else{
                        this.pageShow = false
                      }
                      this.totalItems = JSON.parse(res.text).totalItems
                      //console.log(data)
                    }
                  })
              }
            }
          })
  },
  watch:{
    multipleSelection:{
      handler: function(val){
       
      },
      deep:true
    },
    currentPage3:{
      handler:function(val,oldVal){
        if(this.cityCode.length>0){
          request.post(host + 'franchisee/franchiseeManager/getNotAllotBikes?page=' + val)
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              cityCode:this.cityCode
            })
            .end((error,res)=>{
              if(error){
                console.log(error)
              }else{
                var data = JSON.parse(res.text).list
                var newData = data.map((item)=>{
                  return Object.assign({},item,{onlineTime:moment(item.onlineTime).format('YYYY-MM-DD')})
                })
                this.tableData_distribution = newData
                var totalPage = JSON.parse(res.text).totalPage
                if(totalPage>1){
                  this.pageShow = true
                }else{
                  this.pageShow = false
                }
                this.totalItems = JSON.parse(res.text).totalItems
                console.log(data)
              }
            })
        }
      },
      deep:true
    }
  }
}
</script>
