<template>
	<div>
		<div id="addaccount_form">
						<h1 id="addaccount_title">添加加盟商账号
              <span>
                <a href="/index/accountManager">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="用户名" prop="username">
								<el-input v-model="ruleForm.username" placeholder='请输入用户名'></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input v-model="ruleForm.password" placeholder='请输入密码'></el-input>
							</el-form-item>
              <el-form-item label="所属加盟商">
                <el-radio-group v-model="ruleForm.radio2">
                  <el-radio label="上海">上海</el-radio>
                  <el-radio label="北京">北京</el-radio>
                  <el-radio label="芜湖">芜湖</el-radio>
                </el-radio-group>
              </el-form-item>
							<el-form-item label="所属角色" prop="role">
								<el-select v-model="ruleForm.role" placeholder="选择角色类型">
									<el-option label="管理员" value="管理员"></el-option>
									<el-option label="加盟商" value="加盟商"></el-option>
									<el-option label="合伙人" value="合伙人"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="姓名" prop="name">
								<el-input v-model="ruleForm.name" placeholder='请输入姓名'></el-input>
							</el-form-item>
							<el-form-item label="手机号" prop="tel">
								<el-input v-model="ruleForm.tel" placeholder='请输入手机号'></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="eamil">
								<el-input v-model="ruleForm.eamil" placeholder='请输入邮箱'></el-input>
							</el-form-item>
							<el-form-item label="备注">
								<el-input type="textarea"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/accountManager'})">取消</el-button>
							</el-form-item>
						</el-form>
			</div>
	</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #addaccount_form {
      /*  适配好的样式 */
      height: 50%;
      /*overflow-y: scroll; 
      overflow-x: hidden;*/
      width: 50%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-28%;
      margin-top:-25%;  
      padding: 70px 80px 0 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
    }
  }

@media screen and (max-width:1367px) {
  #addaccount_form {
    height: 55%;
    width: 50%;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    position: fixed;
    display: block;
    top: 62%;
    left: 50%;
    margin-left: -34%;
    margin-top: -28%;
    padding: 60px 150px 200px 144px;
    margin-right: 20px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 6px;
  }
}

	.addaccount_button:nth-of-type(1) {
		background: #f87e2b;
		border: none;
	}

	.addaccount_button:nth-of-type(1):hover {
		background: rgba(248,126,43,0.9);
	}


	.addaccount_button:nth-of-type(2):hover {
		border: 1px solid rgb(248,126,43);
		color: rgb(248,126,43);
	}

	.addaccount_button {
		width: 120px;
		height: 50px;
	}

	#addaccount_title {
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 20px;
    width: 98%;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    overflow-x: hidden;
    line-height: 40px;
    color: #444;
    border-bottom: 1px solid #eee;
	}

  #addaccount_title span {
		float: right;
		margin-right: 14px;
		cursor: pointer;
	}
</style>
      
<script>
import request from 'superagent'
import {host} from '../../../config/index.js'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        role: '',
        name: '',
        tel: '',
        eamil: '',
        radio2: '上海'
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6, message: '密码应不少于6位', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ],
        name: [
          { message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        tel: [
          { message: '请填写手机号', trigger: 'blur' }
        ],
        eamil: [
          { message: '请填写正确邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
     submitForm (formName) {
      var that = this
      var roleType =  null
      if(this.ruleForm.role==='管理员'){
        roleType= 0
      }else {
        roleType = 1
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          })
        .then(() => {
          request.post(host + 'franchisee/account/addAccountByAdmin')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send( {
                state: 0,
                role: roleType,
                phoneNo:that.ruleForm.tel, 
                userId: that.ruleForm.username,
                name: that.ruleForm.name,
                cityName:that.ruleForm.radio2
                })
            .end(function(err,res){
              if(err){
                console.log(err)
              }else{
                var code = JSON.parse(res.text).code
                var data = JSON.parse(JSON.parse(res.text).data)
                var newData = Object.assign({},data,{state: true})
                if(code === 0 ){
                  that.$message({
                    type: 'success',
                    message: '恭喜您!添加账号成功'
                  })
                  that.$store.commit({
                    type:'addJoinAcount',
                    obj: newData
                  })
                  that.$router.push('/index/accountManager')
                }
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
    }
  }
}
</script>
