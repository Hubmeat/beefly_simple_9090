<template>
<div style="margin-right:20px;">
	<div id="partner_header">
		<label>
			<span>关键字 :</span>
        <input type="text" placeholder="姓名\证件号码" class="partner_my_input1">
		</label>
		<label>
			<span>联系方式 :</span>
        <input type="text" placeholder="手机号\邮箱" class="partner_my_input2">
		</label>
	</div>

  <div id="partner_data_select">
    <label>
      <span>加盟日期 :</span>
      <el-date-picker
      v-model="date1"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
    </label>
    <label>
      <span>至</span>
      <el-date-picker
      v-model="date2"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
    </label>

		<el-button icon="search">查询</el-button>
  </div>

	<div id="partner_table">
    <div id="partner_add">
      <button @click="$router.push({path:'/index/partnerManager/addpartner'})">添加加盟商</button>
    </div> 
		<el-table
      :data="tableData"
      style="width: 100% font-size:13px;"
      @cell-click='show_detail'>
      <el-table-column
        prop="alliance_number"
        label="加盟商编号"
        min-width="70">
      </el-table-column>
      <el-table-column
        prop="company_name"
        label="公司名称"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="alliance_area"
        label="加盟区域"
        min-width="65">
      </el-table-column>
      <el-table-column
        prop="alliance_money"
        label="加盟资金(万)"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="alliance_data"
        label="加盟日期"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="subscription_bike"
        label="认购车辆数"
        min-width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        prop="del"
        min-width="75">
	      <template scope="scope">
          <span><a @click='handleRowHandle(scope.row.subscription_id)' class="alliance_table_allocation">分配车辆</a></span>
	      </template>
      </el-table-column>
      <el-table-column
        label="操作"
        prop="del">
	      <template scope="scope">
	      	<a href="/index/partnerDetail" style="color:#444; margin-right:10px;" title="查看"><i class="el-icon-document"></i></a>
	      	<a href="javascript:;" style="color:#444; margin-right:10px;" title="编辑"><i class="el-icon-edit"></i></a>
	      	<a href="javascript:;" style="color:#444; margin-right:10px;" title="删除"><i class="el-icon-close"></i></a>
	      </template>
      </el-table-column>
    </el-table>
	</div>

	<div id="partner_page">
    <div class="M-box"></div>
	</div>


  <router-view id="partnerManager_router"></router-view>
</div>
</template>

<style>
  #partnerManager_router {
    width: 100%;
    height: 100%;
    background: rgba(68,68,68,0.6);
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }

	#partner_header {
    /*width: 100%;*/
    height: 70px;
    background: #fff;
    border: 1px solid #e7ecf1;
    border-bottom: none;
	}

  #partner_header .partner_my_input1 {
    /* width: 300px; */
    height: 30px;
    outline: none;
    margin-top: 4px;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    text-indent: 10px;
    display: inline-block;
  }
  
  #partner_header .partner_my_input2 {
    width: 200px;
    border-radius: 4px;
    height: 30px;
    outline: none;
    margin-top: 4px;
    text-indent: 10px;
    border: 1px solid #bfcbd9;
    display: inline-block;
  }

	#partner_header label:nth-of-type(1) {
    height: 70px;
    width: 30%;
    line-height: 70px;
    margin-left: 30px;
    font-size: 14px;
    float: left;
	}

  #partner_header label:nth-of-type(1)>span {
    margin-right: 6px;
  }

	#partner_header label:nth-of-type(2) {
    height: 70px;
    font-size: 14px;
    width: 35%;
    line-height: 70px;
    /*margin-left: 20px;*/
    float: left;
	}

  #partner_header label:nth-of-type(2)>span {
    margin-right: 6px;
  }

  /*partner_data_select*/
  #partner_data_select {
    padding: 0px 30px 20px 30px;
    background: #fff;
    border: 1px solid #e7ecf1;
    border-top: none;
  }

  #partner_data_select label:nth-child(1) span {
    font-size: 14px;
    margin-right: 6px;
  }

  #partner_data_select label:nth-child(2) span {
    font-size: 16px;
    margin: 0 10px;
  }

  
	#partner_data_select button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    /*margin: 17px 30px;*/
    float: right;
    padding: 10px 15px;
    border-radius: 4px;
	}

  #partner_data_select button:hover {
    color: #20a0ff;
    border-color: #20a0ff;
	}

  ::-webkit-input-placeholder { /* WebKit browsers */ 
  color: #9cacc1; 
  } 
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
  color: #9cacc1; 
  } 
  ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
  color: #9cacc1; 
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */ 
  color: #9cacc1; 
  } 

  /*  #partner_table  */

  #partner_table {
    padding: 0 30px 10px 30px;
    background: #fff;
    border: 1px solid #e7ecf1;
    border-bottom: none;
    margin-top: 20px;
  }

  #partner_add {
    width: 90%;
    height: 68px;
    line-height: 68px;
  }

  #partner_add button {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    display: inline-block;
    border: none;
    outline: none;
    font-size: 12px;
    color: #fff;
    background: rgba(66,66,66, 0.8);
    transition: all .2s linear 0s;
  }

  #partner_add button:hover {
    background: rgb(66,66,66);
    cursor: pointer;
  }

  .alliance_table_allocation {
    color: #f60;
    text-decoration: underline;
    cursor: pointer;
  }
	
	#partner_page {
		padding: 4px 10px 0 20px;
		padding-bottom: 100px;
		background: #fff;
		border: 1px solid #e7ecf1;
		border-top: none;
		min-height: 230px;
	}

  .el-table--enable-row-transition .el-table__body tr td:nth-of-type(1) {
    color: #f60;
    cursor: pointer;
  }
</style>

<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data () {
    return {
      tableData: [{
        alliance_number: '100012',
        company_name: '安徽十方电子商务有限公司',
        alliance_area: '芜湖',
        alliance_money: '2000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '1',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '2',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '3',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '4',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '5',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '6',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '7',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '8',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '9',
        del: ''
      }, {
        alliance_number: '100012',
        company_name: '北京蜜蜂出行科技有限公司合肥分公司',
        alliance_area: '合肥',
        alliance_money: '5000',
        alliance_data: '2017-01-02',
        subscription_bike: 3000,
        subscription_id: '10',
        del: ''
      }],
      currentPage: 3,
      value: '',
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      date1: '',
      date2: ''
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
  },
  methods: {
    show_detail (row, column) {
      if (column.label === '加盟商编号') {
        this.$router.push('/index/vehicleDistribution/' + row.subscription_id)
      } else {
        console.log('sss')
      }
    },
    handleRowHandle (row) {
      // console.log(row)
      this.$router.push('/index/vehicleDistribution/' + row)
    }
  }
}
</script>
