<template>
  <div class="consumeData">
    <div class="countInfo">
      <el-row class="countTitle">
        <span class="countDimension">统计维度</span>
        <div class="timeSelectBtn">
          <el-button @click="handleChangeType" type="primary">日</el-button>
          <el-button @click="handleChangeType">周</el-button>
          <el-button @click="handleChangeType">月</el-button>
        </div>
        <span class="timePeried">数据时间段：</span>
        <el-date-picker :format="form.formatType" v-model='form.data1' :type="form.type" placeholder="选择日期"></el-date-picker>
        <span class="division">至</span>
        <el-date-picker :format="form.formatType" v-model='form.data2' :type="form.type" placeholder="选择日期"></el-date-picker>
        <el-button class="query" type="primary">查询</el-button>
      </el-row>
      <el-row class="countDetail">
        <router-view></router-view>
      </el-row>
    </div>
  </div>
</template>
<script>
import { siblings } from '../../../../utils/index.js'
export default {
  data: function () {
    return {
      form: {
        data1: '',
        data2: '',
        type: 'date',
        formatType: 'yyyy-MM-dd'
      },
      active: false
    }
  },
  methods: {
    handleChangeType (e) {
      switch (e.target.innerText) {
        case '日': {
          this.form.type = 'date'
          this.form.formatType = 'yyyy-MM-dd'
          break
        }
        case '周': {
          this.form.type = 'week'
          this.form.formatType = 'yyyy 第 WW 周'
          break
        }
        case '月': {
          this.form.type = 'month'
          this.form.formatType = ''
          break
        }
      }
      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button el-button--primary')
    }
  }
}
</script>
<style scoped>
div.consumeData {
  margin-right: 20px;
}

div.countInfo {
  padding: 20px;
  background: #fff;
}

div.countTitle {
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  color: #444;
}

span.timePeried {
  margin-left: 10px;
}

span.division {
  padding: 0 2px;
}

button.query {
  float: right;
}

button.isClick {
  background: red;
}

div.timeSelectBtn {
  display: inline-block
}
</style>
