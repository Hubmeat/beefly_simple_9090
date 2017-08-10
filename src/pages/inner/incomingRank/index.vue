<template>
  <div class="consumeData">
    <div class="countInfo">
      <el-row class="countTitle">
        <span class="countDimension labelAlign" style="margin-right: 0px;">统计维度</span>
        <div class="timeSelectBtn">
          <el-button class="active" @click="handleChangeType">今日</el-button>
          <el-button @click="handleChangeType">本周</el-button>
          <el-button @click="handleChangeType">本月</el-button>
          <el-button @click="handleChangeType">所有日期</el-button>
          <el-button @click='handleChangeType' style="margin-right: 15px;">指定时间段</el-button>
        </div>
        <el-date-picker style="vertical-align: top; margin-top: 0px;" v-show="show" v-model="value4" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
        </el-date-picker>
        <el-button v-show="show" class="my_btn" @click="getDateByTimeLine">查询</el-button>
      </el-row>
    </div>
    <el-row class="countDetail">
      <router-view></router-view>
    </el-row>
  </div>
</template>
<script>
// import $ from 'jquery'
import { siblings } from '../../../../utils/index.js'
import moment from 'moment'
import { host } from '../../../config/index.js'
export default {
  data: function () {
    return {
      form: {
        data1: '',
        data2: '',
        type: 'date',
        formatType: 'yyyy-MM-dd'
      },
      active: false,
      value4: '',
      show: false,
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
  methods: {
    handleChangeType(e) {
      switch (e.target.innerText) {
        case '今日': {
          this.form.type = 'date'
          this.show = false
          this.$router.push({ query: { type: 0 } })
          this.form.formatType = 'yyyy-MM-dd'
          break
        }
        case '本周': {
          this.form.type = 'week'
          this.show = false
          this.$router.push({ query: { type: 1 } })
          this.form.formatType = 'yyyy 第 WW 周'
          break
        }
        case '本月': {
          this.form.type = 'month'
          this.show = false
          this.$router.push({ query: { type: 2 } })
          this.form.formatType = ''
          break
        }
        case '所有日期': {
          this.show = false
          this.$router.push({ query: { type: 3 } })
          this.form.formatType = ''
          break
        }
        case '指定时间段': {
          this.show = true
          this.form.formatType = ''
          break
        }
      }
      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button active el-button--default')
    },
    getDateByTimeLine() {
      if (this.value4 === '') {
        this.$message({
          message: '请输入日期',
          type: 'warning'
        })
      } else {
        var start = moment(this.value4[0]).format('YYYY-MM-DD HH:mm:ss')
        var end = moment(this.value4[1]).format('YYYY-MM-DD HH:mm:ss')
        var newObj = {}
        newObj.time1 = start
        newObj.time2 = end
        this.$store.dispatch('timeline_action', { newObj })
      }
    }
  }
}
</script>
<style>
div.consumeData {
  margin-right: 20px;
}

div.countInfo {
  padding: 20px 30px 20px 30px;
  background: #fff;
  margin-bottom: 20px;
}


/*div.countTitle {
  background: #f3f0f0;
  padding: 20px;
  color: #444;
}*/

div.countDetail {
  background: #fff;
}

span.labelAlign {
  float: left;
  margin-right: 10px;
  text-align: right;
  display: block;
  line-height: 35px;
  font-size: 14px;
  color: #555;
}

span.division {
  font-size: 14px;
  color: #555;
  width: 32px;
  display: inline-block;
  text-align: center;
}

span.timePeried {
  margin-left: 50px;;
}

span.division {
  font-size: 14px;
  color: #555;
}

button.query {
  float: initial;
}

button.isClick {
  background: red;
}

div.timeSelectBtn {
  display: block;
  float: left;
}

div.timeSelectBtn button {
  margin-left: 8px;
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

div.timeSelectBtn button:hover {
  border: 1px solid #bbb;
  color: #666;
}

div.timeSelectBtn button.active {
  /*background: rgb(66, 66, 66);*/
  background: rgba(	255,140,0, 0.8);
  color: #fff;
  border: 1px solid rgba(	255,140,0, 0.5);
}

.timeSelect_button {
  font-size: 12px;
  height: 35px;
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

.el-month-table td.current:not(.disabled) .cell {
  background: black !important;
  color: #fff;
}

.el-button:focus, .el-button:hover {
  color: #fff;
}

.my_btn {
  width: 80px;
  height: 36px;
  line-height: 11px;
  margin-right: 30px;
  color: #fff;
  outline: none;
  border: none;
  /* border-radius: 4px; */
  background: rgba(52,52,67, 0.8);
}

.my_btn:hover {
  background: rgba(52, 52, 67, 0.9);
  color: #fff;
}
</style>
