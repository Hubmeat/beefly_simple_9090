<template>
<div>
	<div id="addpartner_form">
				<h1 id="addpartner_title">添加合伙人
					<span>
						<a href="javascript:void(0)" style="color:#000;" @click="$router.push({path:'/index/partnerManager'})">
							<i class="el-icon-close"></i>		
						</a>
					</span>
				</h1>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder='长度不超过100字符'></el-input>
        </el-form-item>
        <el-form-item label="营业执照注册号" prop="businessLicense">
          <el-input v-model="ruleForm.businessLicense" placeholder='请输入营业执照注册号'></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder='请输入地址'></el-input>
        </el-form-item>
        <el-form-item label="加盟日期" prop="joinTime">
            <el-date-picker
              v-model="ruleForm.joinTime"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>           
        </el-form-item>
        <el-form-item label="认购车辆数">
          <el-input v-model.number="ruleForm.subscriptionNum" placeholder='请输入车辆数(单位：/辆)'></el-input>
        </el-form-item>
        <el-form-item label="加盟资金">
          <el-input v-model.number="ruleForm.subscriptionMoney" placeholder='请输入加盟资金（元）'></el-input>
        </el-form-item>
        <el-form-item label="加盟地区" prop="cityName">
            <el-select @change="handleChangeProvince"
              v-model="ruleForm.provinceName"
              loading-text
              placeholder="请选择省"
              :loading="proloading">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :value="(item.name)">
              </el-option>
            </el-select>
            <el-select @change="handleChangeCity"
              v-model="ruleForm.cityName"
              placeholder="请选择城市"
              :loading="proloading">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :value="(item.name)">
              </el-option>
            </el-select>
            <el-select
              @change="handleChangeArea"
              v-show="areaShow"
              v-model="ruleForm.areaName"
              placeholder="请选择区/县"
              :loading="proloading">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :value="item.name">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="加盟商分成比例" prop="percent">
          <el-input v-model="ruleForm.percent" placeholder='请输入分成比例(%)'></el-input>
        </el-form-item>		 
        <h1 class="form_table_h1">联系人信息</h1> 
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder='请输入姓名'></el-input>
        </el-form-item>
        <el-form-item label="证件类别" prop="cardType">
          <el-select v-model="ruleForm.cardType" placeholder="请选择证件类别">
            <el-option label="居民身份证" value="居民身份证"></el-option>
            <el-option label="护照" value="护照"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="idCard">
          <el-input v-model="ruleForm.idCard" placeholder='请输入证件号码'></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder='请输入手机号'></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder='请输入邮箱'></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" @change="handleCheckbox" id="form_checkBox">同时添加联系人的平台账号</el-checkbox>
        <el-form-item label="用户名" prop="userId" v-show='add'>
          <el-input v-model="ruleForm.userId" placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-show='add'>
          <el-input type="password" v-model="ruleForm.password" placeholder='6-20位，可包括字母、数字、下划线'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class='addpartner_button' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button class='addpartner_button' @click="$router.push({path:'/index/partnerManager'})">取消</el-button>
        </el-form-item>
      </el-form>

        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          enctype="multipart/form-data"
          :multiple="true"
          :with-credentials="true"
          :headers='header'
          action='http://192.168.3.7:8080/beepartner/admin/cityPartner/addCityPartner?cityPartnerId=123456'
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <h3>点击上传营业执照</h3>
        </el-upload>
	</div>
</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #addpartner_form {
      /*  适配好的样式 */
      height: 50%;
      overflow-y: scroll; 
      overflow-x: hidden;
      width: 57%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-28%;
      margin-top:-25%;
      padding: 70px 80px 80px 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
    }
  }

  @media screen and (max-width:1367px) {
    #addpartner_form {
      height: 78%;
      width: 63%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      overflow-y: scroll;
      top: 62%;
      left: 50%;
      margin-left: -41%;
      margin-top: -27%;
      padding: 70px 150px 0px 144px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
    }
  }

  #form_checkBox {
    margin-left: 109px;
    margin-bottom: 20px;
  }

  .form_table_h1 {
    width: 100%;
    line-height: 30px;
    padding: 10px 0 10px 3px;
    height: 30px;
    font-size: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .el-form {
    width: 62%;
    float: left;
  }

	.addpartner_button:nth-of-type(1) {
		background: #f87e2b;
		border: none;
	}

	.addpartner_button:nth-of-type(1):hover {
		background: rgba(248,126,43,0.9);
	}


	.addpartner_button:nth-of-type(2):hover {
		border: 1px solid rgb(248,126,43);
		color: rgb(248,126,43);
	}

	.addpartner_button {
		width: 120px;
		height: 50px;
	}

	#addpartner_title {
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 20px;
    width: 98%;
    height: 40px;
    font-size: 20px;
    overflow-x: hidden;
    line-height: 40px;
    color: #444;
    border-bottom: 1px solid #eee;
	}

	#addpartner_title span {
		float: right;
		margin-right: 14px;
		cursor: pointer;
	}

  .avatar-uploader {
    border-radius: 6px;
    cursor: pointer;
    height: 200px;
    width: 300px;
    float: left;
    border: 1px dashed #ddd;
    position: relative;
    text-align: center;
    left: 2%;
    top: 0;
  }

  .avatar-uploader h3 {
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    margin-left: 14px;
    color: #ccc;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #ccc;
    width: 10px;
    height: 10px;
    line-height: 200px;
  }

  .avatar {
    height: 200px;
    width: 300px;
    display: block;
  }
</style>
          
<script>
import request from 'superagent'
import moment from 'moment'
import {host} from '../../../config/index'
export default {
  data () {
    return {
      areaShow:true,
      proloading:false,
      provinceList:[],
      cityList:[],
      areaList:[],
      ruleForm: {
        provinceId:'',
        cityId:'',
        areaId:'',
        provinceName:'',
        cityName:'',
        areaName:'',
        joinTime: '',
        companyName: '',
        businessLicense: '',
        address: '',
        subscriptionNum: '',
        subscriptionMoney: '',
        percent: '',
        userName: '',
        cardType: '',
        idCard: '',
        phone: '',
        email: '',
        userId: '',
        password: '',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      rules: {
        companyName: [
          { message: '请输入企业名称', trigger: 'blur' }
        ],
        businessLicense: [
          { message: '非法营业执照号', trigger: 'blur' }
        ],
        address: [
          { message: '请输入正确的地址', trigger: 'blur' }
        ],
        subscriptionNum: [
          { message: '请选择输入认购车辆数', trigger: 'blur' }
        ],
        subscriptionMoney: [
          { message: '输入正确的金额', trigger: 'blur' }
        ],
        cardType: [
          {message: '请选择证件类型', trigger: 'blur' }
        ],
        percent: [
          {message: '请输入加盟比例', trigger: 'blur' }
        ],
        userName: [
          {  message: '请输入姓名', trigger: 'blur' }
        ],
        cardType: [
          {message: '请选择证件类型', trigger: 'change' }
        ],
        idCard: [
          {  message: '请输入身份证号码', trigger: 'blur' },
          { min: 15, max: 19, message: '请输入合法的身份证号码', trigger: 'blur' }
        ],
        phone: [
          {   message: '请填写手机号', trigger: 'blur' },
          { min: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        email: [
          { message: '请填写正确邮箱', trigger: 'blur' }
        ],
        userId: [
          {  message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          {  message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 19, message: '密码格式不正确', trigger: 'blur' }
        ]
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      date1: '',
      checked: false,
      add: false,
      imageUrl: ''
    }
  },
  updated () {
    if (this.checked === true) {
      this.add = true
    } else {
      this.add = false
    }
  },
  mounted:function(){
    this.filterProvinceMethod()
  },
  methods: {
    handleCheckbox(e){
      if(!this.checked){
        this.ruleForm.username = ''
        this.ruleForm.password = ''
      }
    },
    handleChangeProvince(val){
      console.log(val)
       if(this.provinceList.length>0){
        this.provinceList.map((item)=>{
          if(val === item.name){
            this.ruleForm.provinceId = item.id
          }
        })
        this.ruleForm.cityName = ''
        this.filterCityMethod()
      }
    },
    handleChangeCity(val){
      console.log(val)
       if(this.cityList.length>0){
        this.cityList.map((item)=>{
          if(val === item.name){
            this.ruleForm.cityId = item.id
          }
        })
        this.ruleForm.areaName = ''
        this.filterAreaMethod()
      }
    },
     handleChangeArea(val){
        console.log(val)
       if(this.areaList.length>0){
        this.areaList.map((item)=>{
          if(val === item.name){
            this.ruleForm.areaId = item.id
          }
        })
      }
    },
    filterProvinceMethod() {
      request
        .post(host + 'beepartner/admin/cityPartner/getProvince')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .end((error,res)=>{
          if(error){
            console.log(error)
          }else{
            this.checkLogin(res)
            var result = JSON.parse(res.text).data
            var provinceList = result.map((item)=>{
              var obj = {}
              obj.id = item.id
              obj.name = item.name
              return obj
            })
            this.provinceList = provinceList
          }
        })
    },
    filterCityMethod() {
      if(this.ruleForm.provinceId){
        request
          .post(host + 'beepartner/admin/cityPartner/getChildrenArea')
          .withCredentials()
          .set({
              'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            id: this.ruleForm.provinceId
          })
          .end((error,res)=>{
            if(error){
              console.log(error)
            }else{
              this.checkLogin(res)
              var result = JSON.parse(res.text).data
              var cityList = result.map((item)=>{
                var obj = {}
                obj.id = item.id
                obj.name = item.name
                return obj
              })
              this.cityList = cityList
            }
          })
      }
    },
    filterAreaMethod() {
      if(this.ruleForm.provinceId){
        request
          .post(host + 'beepartner/admin/cityPartner/getChildrenArea')
          .withCredentials()
          .set({
              'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            id: this.ruleForm.cityId
          })
          .end((error,res)=>{
            if(error){
              console.log(error)
            }else{
              this.checkLogin(res)
              var result = JSON.parse(res.text).data
              if(result.length===0){
                this.areaShow = false
              }else{
                this.areaShow = true
              }
              var areaList = result.map((item)=>{
                var obj = {}
                obj.id = item.id
                obj.name = item.name
                return obj
              })
              this.areaList = areaList
            }
          })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          })
        .then(() => {
          var obj = {}
          obj = Object.assign({},this.ruleForm,{cardType:this.ruleForm.cardType==='身份证'?0:1},{percent:parseFloat(this.ruleForm.percent/100)})
          request
            .post(host + 'beepartner/admin/cityPartner/addCityPartner')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send(obj)
            .end((error,res)=>{
              if(error){
                console.log(error)
              }else{
                this.checkLogin(res)
                console.log(JSON.parse(res.text).data)
                console.log(JSON.parse(JSON.parse(res.text).data))
                var newAccount = JSON.parse(JSON.parse(res.text).data)
                 this.$router.push('/index/partnerManager')
                 this.$message({
                    type: 'success',
                    message: '添加成功'
                  })
                  this.$store.commit('keepParnterAccount',newAccount)
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess (res, file) {
      console.log('SUCCESS')
      // console.log(file)
      // console.log(URL.createObjectURL(file.raw))
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
      // var reader = new FileReader();   
      // reader.readAsDataURL(file);   
      // reader.onload = function(e){   
      //         alert(this.result); 
  
      // }
    },
    checkLogin (res) {
      if (JSON.parse(res.text).message === '用户登录超时') {
        this.$router.push('/login')
      }
    }
  }
}
</script>
