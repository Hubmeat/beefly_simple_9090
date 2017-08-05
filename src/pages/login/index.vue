<template>
  <div id="login">
    <div v-title>蜜蜂出行城市合伙人管理平台-登录</div>
    <div id="bgImage">
       <img src="../../assets/img/1.jpg">
    </div>
    <div class="content">
      <header>
        <h3>蜜蜂出行城市合伙人管理平台</h3>
      </header>
      <div class="loginForm">
        <el-form label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
          <h3 class="title">登录</h3>
          <el-form-item prop="username">
            <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" autofocus="autofocus" tabindex="1"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formLabelAlign.password" @keyup.enter.native="handleEnter" type="password" placeholder="请输入密码" tabindex="2"></el-input>
          </el-form-item>
          <div class="button-group" style="padding-left:81px; margin-top: -5px;">
            <el-button class="login" name="username" @click="handleSubmit">登录</el-button>
            <el-button class="forget_psd" @click="handleFindPsd" name="password">忘记密码</el-button>
          </div>
        </el-form>
      </div>
      <el-dialog title="找回密码" :visible.sync="dialogFormVisible">
        <el-form :model="findForm" :rules="findFormRule" ref="findPsd">
          <el-form-item label="手机号" prop="tel" :label-width="formLabelWidth">
            <el-input v-model="findForm.tel" auto-complete="off"></el-input>
            <el-button class="getVerCode" @click="getVerCode(findForm.tel)" :plain="isPlain" :disabled="isDisabled">
              获取验证码
            </el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="vercode" :label-width="formLabelWidth">
            <el-input v-model="findForm.vercode" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="findPsdBtn" @click="dialogFormVisible = false">取 消</el-button>
          <el-button class="findPsdBtn" type="primary" @click="findPsd">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="重置密码" :visible.sync="resetFormVisible">
        <el-form :model="resetForm" :label-position="labelPosition" :rules="resetFormRule" ref="resetForm">
          <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
            <el-input type="password" v-model="resetForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="确认密码" prop="checkPass">
            <el-input type="password" v-model="resetForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetPsd">确 定</el-button>
        </div>
      </el-dialog>

      <!-- footer  -->
      <div id="footer">
        北京蜜蜂出行科技有限公司版权所有©2017
      </div> 
    </div>
  </div>
</template>
<script>
import request from 'superagent'
import $ from 'jquery'
import { checkMobile, IsEmpty } from '../../../utils/index.js'
import { host, instance } from '../../config/index.js'
import axios from 'axios'
export default {
  data() {
    var validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      } else {
        setTimeout(() => {
          var res = checkMobile(value)
          if (res === true) {
            return callback()
          } else {
            callback(new Error('手机格式格式不正确！！！'))
          }
        }, 1000)
      }

    }
    var validateVerCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.resetForm.checkPass !== '') {
          this.$refs.resetForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      isPlain: false,
      isDisabled: false,
      findForm: {
        tel: '',
        verCode: '',
        verificationCode: ''
      },
      resetForm: {
        pass: '',
        checkPass: ''
      },
      formLabelWidth: '100px',
      formLabelAlign: {
        username: '',
        password: ''
      },
      dialogFormVisible: false,
      resetFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '用户名为英文数字下划线', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 17 个字符', trigger: 'blur' }
        ]
      },
      findFormRule: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        vercode: [{ required: true, trigger: 'blur', validator: validateVerCode }]
      },
      resetFormRule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getVerCode(val) {
      var that = this
      var $btn = $('button.getVerCode')
      var text = $btn.text()
      this.initText = text
      var initTime = 60
      if (checkMobile(val)) {
        // 像后台发送 手机号，确认手机号是否已经注册，如果注册 则 发送验证码，否则返回 该手机号未注册
        request.post(host + 'franchisee/account/checkPhone')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            phoneNo: this.findForm.tel
          })
          .end(function (error, res) {
            if (error) {
              console.log(error)
            } else {
              var code = JSON.parse(res.text).code
              if (code === 0) {
                // 手机已经绑定，可以找回密码
                that.isDisabled = true
                that.isPlain = false
                var timer = setInterval(function () {
                  initTime--
                  if (initTime <= 0) {
                    that.isDisabled = false
                    that.isPlain = true
                    $btn.text(that.initText)
                    clearInterval(timer)
                    return
                  } else {
                    $btn.text(initTime + 's')
                  }
                }, 1000)
                setTimeout(function () {
                  that.$message({
                    message: '已向您的手机发送验证码，请查收！！！',
                    type: 'success'
                  })
                }, 1000)
                request.post(host + 'franchisee/userCenter/getVerCode')
                  .send({
                    mobileNo: that.findForm.tel
                  })
                  .end(function (err, res) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log(res)
                      that.findForm.verificationCode = JSON.parse(res.text)
                    }
                  })
              } else {
                // 手机号未注册过
                that.$message({
                  type: 'error',
                  message: '手机号未绑定，请注册'
                })
              }
            }
          })
        return false

      }
    },
    handleSubmit() {
      if (this.formLabelAlign.username === '' && this.formLabelAlign.password === '') {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        })
      } else {
        request
          // .post(host + 'franchisee/adminLogin')
          .post(host + 'beepartner/system/login/loginSystem')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'userName': this.formLabelAlign.username,
            'passWord': this.formLabelAlign.password
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              // localStorage.setItem('user_cookie')
              console.log(document.cookie('user_cookie'))
              // if (JSON.parse(res.text).code === 0) {
              //   this.$message({
              //     message: '登录成功！',
              //     type: 'success'
              //   })
              //   this.$router.push('/index')
              // } else {
              //   this.$message.error('密码错误');
              // }
            }
          })

        // instance.post(host + 'franchisee/franchiseeLogin',{
        //   params: { 
        //     'name': this.formLabelAlign.username,
        //     'password': this.formLabelAlign.password }
        //   })
        //   .then(function (response) {
        //     console.log('dadadd')
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log('aaaaaa')
        //     console.log(error);
        //   });

        // request
        //   .post(host + 'franchisee/franchiseeLogin')
        //   .set({
        //     withCredentials: true
        //   })
        //   .withCredentials()
        //   .set({
        //     'content-type': 'application/x-www-form-urlencoded'
        //   })
        //   .send({ 
        //     'name': this.formLabelAlign.username,
        //     'password': this.formLabelAlign.password })
        //   .end((error, res) => {
        //     if (error) {
        //       console.log('error:', error)
        //     } else {
        //       console.log(res)
        //     }
        //   })
      }
    },
    handleEnter() {
      this.handleSubmit()
    },
    handleFindPsd() {
      this.dialogFormVisible = true
      this.findForm.tel = ''
      this.findForm.vercode = ''
      this.findForm.verificationCode = ''
    },
    findPsd() {
      var that = this
      this.$refs.findPsd.validate((valid) => {
        if (valid) {
          // 这里 还需要 对验证码进行验证 若验证 通过 则可以 找回密码
          // request.post(host + 'franchisee/account/checkPhoneAndVerCode')
          request.post(host + 'beepartner/admin/test')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              phoneNo: that.findForm.tel,
              verCode: that.findForm.verificationCode
            })
            .end(function (error, res) {
              if (error) {
                console.log(error)
              } else {
                console.log(res)
                var code = JSON.parse(res.text).code
                that.dialogFormVisible = false
                that.resetFormVisible = true
                return
                if (code == 0) {
                  that.dialogFormVisible = false
                  that.resetFormVisible = true
                } else {
                  that.$message({
                    type: 'error',
                    message: '对不起，验证码输出错误'
                  })
                }
              }
            })
        }
      })
    },
    resetPsd() {
      this.$refs.resetForm.validate((valid) => {
        var that = this
        if (valid) {
          // 像服务器发送 重置密码的请求
          request.post(host + 'franchisee/account/resetPwd')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              password: that.resetForm.pass
            })
            .end(function (err, res) {
              if (err) {
                console.log(err)
              } else {
                var code = JSON.parse(res.text).code
                console.log(JSON.parse(res.text))
                if (code === 0) {
                  that.$message({
                    type: 'success',
                    message: '恭喜您，重置密码成功,请重新登录！'
                  })
                  that.resetFormVisible = false
                } else {
                  that.$message({
                    type: 'error',
                    message: '对不起，重置密码失败！'
                  })
                }
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>
<style scope>


#bgImage {
  position: absolute;
  left: 0;
  top: 5%;
}

@media screen and (min-width:1367px) {
  div#login {
    width: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 10%;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }

  div#login div.content header h3 {
    width: 100%;
    position: fixed;
    left: 0px;
    top: 8%;
    background: #fff;
    padding-left: 30px;
    /* margin: 0 auto; */
    color: #000;
    /* text-shadow: -2px 1px 4px #333; */
    text-align: left; 
    font-size: 28px;
  }


  #footer {
    position: fixed;
    left: 0;
    bottom: 13%;
    width: 100%;
    font-size: 12px;
    height: 46px;
    line-height: 56px;
    text-align: center;
    color: #555;
  }
}

@media screen and (max-width:1367px) {
  div#login {
    width: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  } 

  div#login div.content header h3 {
    width: 100%;
    position: fixed;
    left: 0px;
    top: 10px;
    background: #fff;
    padding-left: 30px;
    /* margin: 0 auto; */
    color: #000;
    /* text-shadow: -2px 1px 4px #333; */
    text-align: left; 
    font-size: 24px;
  }


  #footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 12px;
    height: 46px;
    line-height: 56px;
    text-align: center;
    color: #555;
  }

}

#bgImage img {
  display: block;
  width: 100%;
}

div#login div.content {
  width: 100%;
  height: 100%;
}

div#login div.content header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  margin-top: 10%;
}

div#login div.content div.loginForm {
  width: 400px;
  z-index: 10;
  position: absolute;
  right: 3%;
  margin-top: -20px;
  color: #fff;
}

div#login div.content div.loginForm form.el-form {
  height: 100%;
  background: #fff;
  padding: 20px 0px 70px 0px;
  border-radius: 5px;
  box-shadow: 2px -1px 6px 2px rgba(0, 0, 0, .6)
}

div#login div.content div.loginForm form.el-form input {
  border: 1px solid #444;
  width: 240px;
}

.el-button--primary {
  color: #fff;
  background-color: #292626;
  border-color: #ffffff;
}

.el-button--primary:hover {
  background: #f7cd36;
  border: 1px solid #f7cd36;
  color: #222
}

button.login {
  width: 240px;
  height: 36px;
  border-radius: 4px;
  outline: none;
  border: none;
  background: rgba(241, 194, 52, 1);
  color: #fff !important;
  cursor: pointer;
}

button.login:hover {
  background: rgba(241, 194, 52, 0.8);
  color: #fff !important;
}

button.login:active {
  background: rgba(241, 194, 52, 0.8);
  color: #fff !important;
}

button.forget_psd {
  float: right;
  outline: none;
  border: none;
  background: #fff;
  margin-right: 64px;
  margin-top: 20px;
}

button.forget_psd:hover {
  text-decoration: underline;
  color: rgba(241, 194, 52, 1);
}

button.forget_psd:active {
  text-decoration: underline;
  color: rgba(241, 194, 52, 1);
}


h3.title {
  color: #444;
  font-size: 30px;
  margin-bottom: 20px;
  margin-left: 80px;
}

.findPsdBtn {
  width: 120px;
  height: 50px;
}

</style>

