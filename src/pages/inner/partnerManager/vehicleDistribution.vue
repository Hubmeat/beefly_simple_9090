<template>
  <div style="margin-right: 20px;">
    <div id='distribution_header'>
      <h1>分配车辆</h1>
      <ul>
        <li><span>加盟商编号：</span></li>
        <li><span>企业名称：</span></li>
      </ul>
      <ul>
        <li><span>认购车辆：</span></li>
        <li><span>拥有车辆：</span></li>
        <li><span>加盟商编号：</span></li>
      </ul>
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
                prop="terminal_number"
                label="终端编号"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="bike_type"
                label="车辆型号"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="online_date"
                label="上线日期"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="bike_status"
                label="车辆状态"
                min-width="80">
              </el-table-column>
            </el-table>      
        </div>

        <div id="distribution_page">
          <div class="M-box"></div>
        </div>  
      </div>

      <div id='right_hasbeen_distribution'>
          <h6>你选择的车辆: <span>50辆</span><span>清空</span></h6>
          <ul>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
            <li>681501000555030 <span><i class="iconfont">&#xe60a;</i></span></li>
          </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
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
  background: #f1fff1;
}

#distribution_header ul {
  list-style: none;
  width: 200px;
  font-size: 16px;
  height: 80px;
  padding: 4px;
  line-height: 40px;
  float: left;
}

#distribution_header ul:nth-of-type(2) {
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
}

/* ======  distribution_selectBase  ============*/
#distribution_selectBase {
  width: 100%;
  background: #f3f3f5;
  overflow: hidden;
}

#distribution_selectBase #distribution_table {
  width: 70%;
  float: left;
  padding: 10px 20px 0 20px;
  border: 1px solid #e7ecf1;
  margin-right: 20px;
  background: #fff;
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
  min-height: 788px;
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
export default {
  data () {
    return {
      tableData_distribution: [{
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }, {
        terminal_number: '102323200022112',
        bike_type: '小黄蜂8代',
        online_date: '2017-01-02',
        bike_status: '维修中'
      }]
    }
  },
  mounted () {
    $('.M-box').pagination({
      pageCount: 50,
      jump: true,
      coping: true,
      homePage: '首页',
      endPage: '尾页',
      prevContent: '«',
      nextContent: '»'
    })
  }
}
</script>
