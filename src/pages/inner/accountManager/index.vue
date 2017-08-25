<template>
  <div style="margin-right:20px;">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClickTab">
      <el-tab-pane name="平台">
        <span slot="label">
          <i class="el-icon-date"></i> 平台</span>
        <div class="am_search" style="border: 1px solid #e7ecf1;">
          <label>
            <span>关键字</span>
            <input type="text" placeholder="账号/姓名" v-on:blur="initQuery" v-model="accountOrUsername" class="account_my_input">
          </label>
          <label>
            <span>联系方式</span>
            <input type="text" placeholder="手机号/邮箱" v-on:blur="initQuery" v-model="telOrMail" class="account_my_input">
          </label>
          <el-button id="accountSearchBtn" @click="queryAccountInfo" class="timeSelect_button">查询</el-button>
        </div>

        <!-- account -->
        <div id="err_add" class="account">
          <h1>
            <button type="button" @click="addAccount">添加新账号</button>
            <!--新增数据开始-->
            <!--新增数据结束-->
          </h1>

          <!-- 表单 -->
          <el-table :data="platTableData" :empty-text='emptyText' style="width: 100%; font-size:13px;" v-loading="loading" :element-loading-text="loadingText">
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="phoneNo" label="手机号" min-width="140"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="170"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="roleName" label="角色" min-width="120">
            </el-table-column>
            <el-table-column label="状态" min-width="120" style="font-size:12px;">
              <template scope="scope">
                <el-switch v-on:change="changeState(scope)" v-model="scope.row.status" on-text="启用" off-text="冻结" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="del" label="操作">
              <template scope="scope">
                <a href="javascript:;"></a>
                <i class="el-icon-edit" @click="openEdit(scope)" title="修改" style="margin-right:10px;"></i>
                </a>
                <i class="el-icon-close" title="删除" @click="openDelete(scope)"></i>
                <!--dialog 弹窗开始-->
                <el-dialog title="编辑平台账号信息" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
                  <el-form class="editAccount" :model="editAccount" :rules="editAccountRule" ref="editRuleForm">
                    <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
                      <el-input v-model="editAccount.userName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passWord" :label-width="formLabelWidth">
                      <el-input type='password' v-model="editAccount.passWord" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所属角色" prop="roleName">
                      <el-select v-model="editAccount.roleName" placeholder="选择角色类型">
                        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-input v-model="editAccount.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop='phoneNo' :label-width="formLabelWidth">
                      <el-input v-model="editAccount.phoneNo"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                      <el-input v-model="editAccount.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                      <el-input type="textarea" style="width:340px" v-model="editAccount.description" placeholder="不超过200个字符"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer editfooter">
                    <el-button class="accountMangerBtn" type="primary" @click="handleEditAccount">确 定</el-button>
                    <el-button class="accountMangerBtn" @click="dialogVisible = false">取 消</el-button>
                  </div>
                </el-dialog>
                <!--dialog 弹窗结束-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合伙人" name="合伙人" id="partner">
        <div id="search_content">
          <el-row class="selectPlace">
            <div class="citys" style="margin-left: 70px;">
              <address class="joinArea" style="margin-left: -70px;">加盟区域：</address>
              <span @click="handleClick" name="0" class="active">全部地区</span>
              <span @click="handleClick" :name="list.cityId" :key="list.cityId" v-for="list of cityList">{{list.cityName}}</span>
            </div>
          </el-row>
          <div class="am_search">
            <label>
              <span>关键字 :</span>
              <input type="text" v-model="accountOrUsername" placeholder="姓名/用户名" @blur="initQuery" class="account_my_input">
            </label>
            <label>
              <span>联系方式 :</span>
              <input type="text" v-model="telOrMail" placeholder="邮箱/手机号" @blur="initQuery" class="account_my_input">
            </label>
            <el-button id="accountSearchBtn2" @click="queryAccountInfo" class="timeSelect_button">查询</el-button>
          </div>
        </div>
        <!-- account -->
        <div class="account">
          <h1>
            <button type="button" @click="addAccount">添加新账号</button>
          </h1>
          <!-- 表单 -->
          <el-table :data="joinTableData" style="width: 100%; font-size:13px;" v-loading="loading" element-loading-text="拼命加载中" :empty-text="emptyText">
            <el-table-column prop="userName" label="用户名" min-width="15%"></el-table-column>
            <el-table-column prop="phoneNo" label="手机号" min-width="15%"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="20%"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="10%"></el-table-column>
            <el-table-column label="所属合伙人" prop="cityName" min-width="20%"></el-table-column>
            <el-table-column label="状态" min-width="10%" style="font-size:12px;">
              <template scope="scope">
                <el-switch v-on:change="changeState(scope)" v-model="scope.row.status" on-text="启用" off-text="冻结" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="10%">
              <template scope="scope">
                <a href="javascript:;"></a>
                <i class="el-icon-edit" @click="openEdit(scope)" title="修改" style="cursor:pointer;margin-right:10px;"></i>
                </a>
                <i class="el-icon-close" style="cursor:pointer;" title="删除" @click="openDelete(scope)"></i>
                <!--dialog 弹窗开始-->
                <el-dialog id="err_form" title="编辑合伙人账号信息" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
                  <el-form :model="editAccount" :rules="editAccountRule">
                    <el-form-item label="用户名" prop='userName' :label-width="formLabelWidth">
                      <el-input v-model="editAccount.userName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label='密码' prop='passWord' :label-width="formLabelWidth">
                      <el-input v-model="editAccount.passWord" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所属合伙人" prop="alliance">
                      <el-radio-group v-model="editAccount.alliance" v-on:input='remoteMethodPartner'>
                        <el-radio :key="list.cityId" :myId="list.cityId" :label="list.cityId.toString()" v-for="list of cityList">{{list.cityName}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="所属角色" style="margin-left: 12px;" prop="roleName">
                      <el-select v-model="editAccount.roleName" placeholder="选择角色类型" :remote-method="remoteMethodPartner" :disabled="isDisabled">
                        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        <!--<el-option label="管理员" value="管理员"></el-option>-->
                        <!-- <el-option label="加盟商" value="加盟商"></el-option> -->
                        <!--<el-option label="合伙人" value="合伙人"></el-option>-->
                      </el-select>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-input v-model="editAccount.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                      <el-input v-model="editAccount.phoneNo"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                      <el-input v-model="editAccount.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" style="margin-left: 50px;">
                      <el-input type="textarea" style="width:340px" v-model="editAccount.description" placeholder="不超过200个字符"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="所属合伙人" :label-width="formLabelWidth">
                            <el-radio-group v-model="editAccount.radio">
                              <el-radio :label="3">上海</el-radio>
                              <el-radio :label="6">北京</el-radio>
                              <el-radio :label="9">芜湖</el-radio>
                            </el-radio-group>
                          </el-form-item>-->
                  </el-form>
                  <div slot="footer" class="dialog-footer editfooter">
                    <el-button class="accountMangerBtn" type="primary" @click="handleEditAccount">确 定</el-button>
                    <el-button class="accountMangerBtn" @click="dialogVisible = false">取 消</el-button>
                  </div>
                </el-dialog>
                <!--dialog 弹窗结束-->
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>

      <el-pagination v-show="pageShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="totalItems">
      </el-pagination>
    </el-tabs>

    <!-- 添加账号  -->
    <router-view id="account_router"></router-view>
  </div>
</template>

<script>
import $ from 'jquery'
import request from 'superagent'
import { siblings, checkPositiveNumber } from '../../../../utils/index.js'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import { checkUserName, checkMobile, isEmail } from '../../../../utils/index.js'
import { getAllAdminUser } from '../../../api/getAdminUser.api.js'
import { getAllAccount } from '../../../api/getAllAccount.api'
import { updateAdmin } from '../../../api/updateAdmin.api'
import { updateAccountByAdmin } from '../../../api/updateAccountByAdmin.api'
import { modifyAdminState } from '../../../api/modifyAdminState.api'
import { modifyAccountStateByAdmin } from '../../../api/modifyAccountStateByAdmin.api'
import { delAdminUser } from '../../../api/delAdminUser.api'
import { delAccountByAdmin } from '../../../api/delAccountByAdmin.api'
import { host } from '../../../config/index.js'
export default {
  data() {
    var validatorUserName = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!checkUserName(value)) {
        callback('用户名格式：必须英文字母开头 不可以为汉字')
      } else {
        request
          .post(host + 'beepartner/admin/User/AdminUserUserNameOrPhone')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'userName': value,
            'sign': 1
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              if (JSON.parse(res.text).resultCode === 1) {
                callback()
              } else {
                var message = JSON.parse(res.text).message
                callback(new Error(message))
              }
            }
          })
      }
    }
    var validatePhoneNo = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!checkMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        request
          .post(host + 'beepartner/admin/User/AdminUserUserNameOrPhone')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'phoneNo': value
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              if (JSON.parse(res.text).resultCode === 1) {
                callback()
              } else {
                var message = JSON.parse(res.text).message
                callback(new Error(message))
              }
            }
          })
      }
    }
    return {
      cityList: [],
      cityId: '0',
      isQuery: false,
      accountOrUsername: '',
      telOrMail: '',
      pageShow: false,
      emptyText: ' ',
      loadingText: '',
      totalItems: 1,
      name: '',
      phone: '',
      activeName: '平台',
      totalItems: 1,
      pageShow: false,
      input: '',
      currentPage: 1,
      totalPage: 1,
      platTableData: [],
      joinTableData: [],
      initData: [],
      router_show: false,
      dialogVisible: false,
      totalPage: '',
      loading: false,
      loadingText: '',
      emptyText: ' ',
      formLabelWidth: '90px',
      options4: [],
      editAccountRule: {
        userName: [
          { validator: validatorUserName, trigger: 'blur', required: true },
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        passWord: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'change' }
        ],
        roleName: [{ trigger: 'blur', required: true }],
        phoneNo: [{ validator: validatePhoneNo, trigger: 'blur' }],
        alliance: [{ required: true, message: '请选择合伙人', trigger: 'blur' }]
      },
      editAccount: {
        userName: '',
        passWord: '********',
        roleName: '',
        name: '',
        phoneNo: '',
        email: '',
        description: '',
        alliance: '',
        cityId: '',
        email: '',
        description: ''
      },
      isDisabled: true
    }
  },
  methods: {
    remoteMethodPartner() {
      var that = this
      if (this.editAccount.alliance === '') {
        return
      } else {
        setTimeout(() => {
          request.post(host + 'beepartner/admin/User/findRole')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              'cityId': that.editAccount.alliance
            })
            .end((error, res) => {
              if (error) {
                console.log(error)
                that.options4 = []
              } else {
                that.checkLogin(res)
                console.log(JSON.parse(res.text))
                var roles = JSON.parse(res.text).data.map((item) => {
                  var obj = {}
                  obj.value = item.roleName
                  obj.label = item.roleName
                  obj.id = item.id
                  return obj
                })
                if (roles.length > 0) {
                  that.isDisabled = false
                }
                that.options4 = roles
              }
            })
        }, 200)
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    queryAccountInfo() {
      this.isQuery = true
      var obj = {
        queryName: this.accountOrUsername,
        queryNumber: this.telOrMail,
        cityId: $('.citys span.active').attr('name')
      }
      if (this.accountOrUsername.trim().length === 0 && this.telOrMail.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '查询条件并不能为空！'
        })
        return false
      }
      var that = this
      if (this.activeName === '平台') {
        that.loading = true
        if (this.accountOrUsername.trim().length > 0 || this.telOrMail.trim().length > 0) {
          request.post(host + 'beepartner/admin/User/findAdminUser')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send(obj)
            .end(function(error, res) {
              if (error) {
                console.log(error)
                that.loading = false
              } else {
                that.checkLogin(res)
                that.loading = false
                var newArr = JSON.parse(res.text).data
                that.totalPage = Number(JSON.parse(res.text).totalPage)
                if (that.totalPage > 1) {
                  that.emptyText = ''
                  that.pageShow = true
                } else {
                  that.emptyText = '暂无数据'
                  that.pageShow = false
                }
                that.totalItems = Number(JSON.parse(res.text).totalItems)
                that.platTableData = that.handleData(newArr)
              }
            })
        } else {
          request.post(host + 'franchisee/account/getAllAdminUser')
            .send(obj)
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .end(function(error, res) {
              if (error) {
                console.log(error)
                that.loading = false
              } else {
                that.checkLogin(res)
                that.loading = false
                var newArr = JSON.parse(res.text).list
                that.totalPage = JSON.parse(res.text).totalPage
                if (that.totalPage > 1) {
                  that.emptyText = ''
                  that.pageShow = true
                } else {
                  that.emptyText = '暂无数据'
                  that.pageShow = false
                }
                that.totalItems = JSON.parse(res.text).totalItems
                that.platTableData = that.handleData(newArr)
              }
            })
        }
      } else {
        that.loading = true
        getAllAccount({ cityId: this.cityId, queryName: this.accountOrUsername, queryNumber: this.telOrMail }, function(error, res) {
          if (error) {
            console.log(error)
            setTimeout(function() {
              that.loading = false
              that.loadingText = '服务器链接超时'
            }, 5000)
            setTimeout(function() {
              that.emptyText = '暂无数据'
            }, 6000)
          } else {
            that.checkLogin(res)
            that.loading = false
            that.totalPage = Number(JSON.parse(res.text).totalPage)
            var arr = JSON.parse(res.text).data
            console.log(arr)
            that.totalItems = Number(JSON.parse(res.text).totalItems)
            if (that.totalPage > 1) {
              that.emptyText = ' '
              that.pageShow = true
            } else {
              that.emptyText = '暂无数据'
              that.pageShow = false
            }
            that.$store.state.joinTableData = that.handleData(arr)
            that.joinTableData = that.$store.state.joinTableData
          }
        })
      }
    },
    loadData() {
      if (this.activeName === '平台') {
        var that = this
        that.loading = true
        getAllAdminUser({}, function(err, res) {
          if (err) {
            console.log(err)
            setTimeout(function() {
              that.loading = false
              that.loadingText = '服务器链接超时'
            }, 5000)
            setTimeout(function() {
              that.emptyText = '暂无数据'
            }, 6000)
          } else {
            that.checkLogin(res)
            that.loading = false
            that.emptyText = ''
            that.totalPage = Number(JSON.parse(res.text).totalPage)
            var arr = JSON.parse(res.text).data
            if (that.totalPage > 1) {
              that.emptyText = ' '
              that.pageShow = true
            } else {
              that.emptyText = '暂无数据'
              that.pageShow = false
            }
            that.totalItems = Number(JSON.parse(res.text).totalItems)
            that.$store.state.users.platTableData = that.handleData(arr)
            that.platTableData = that.$store.state.users.platTableData
            that.initData = that.platTableData
          }
        })
      } else {
        request
          .post(host + 'beepartner/admin/User/findFranchiseeUser')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            cityId: $('.citys span.active').attr('name')
          })
          .end((error, res) => {
            if (error) {
              console.log(error)
              setTimeout(function() {
                that.loading = false
                that.loadingText = '服务器链接超时'
              }, 5000)
              setTimeout(function() {
                that.emptyText = '暂无数据'
              }, 6000)
            } else {
              that.loading = false
              that.totalPage = Number(JSON.parse(res.text).totalPage)
              var arr = JSON.parse(res.text).data
              that.totalItems = Number(JSON.parse(res.text).totalItems)
              if (that.totalPage > 1) {
                that.emptyText = ' '
                that.pageShow = true
              } else {
                that.emptyText = '暂无数据'
                that.pageShow = false
              }
              that.$store.state.joinTableData = that.handleData(arr)
              that.joinTableData = that.$store.state.joinTableData
              that.initData = that.joinTableData
            }
          })
      }
    },
    initQuery() {
      var that = this
      this.isQuery = false
      this.currentPage = 1
      if (this.activeName === '平台') {
        if (this.accountOrUsername.trim().length === 0 && this.telOrMail.trim().length === 0 && this.isQuery === false) {
          getAllAdminUser({ franchiseeId: '123456', userId: 'admin' }, function(error, res) {
            if (error) {
              console.log(error)
              setTimeout(function() {
                that.loading = false
                that.loadingText = '服务器链接超时'
              }, 5000)
              setTimeout(function() {
                that.emptyText = '暂无数据'
              }, 6000)
            } else {
              that.checkLogin(res)
              that.loading = false
              that.totalPage = Number(JSON.parse(res.text).totalPage)
              var arr = JSON.parse(res.text).data
              if (that.totalPage > 1) {
                that.emptyText = ' '
                that.pageShow = true
              } else {
                that.emptyText = '暂无数据'
                that.pageShow = false
              }
              that.totalItems = Number(JSON.parse(res.text).totalItems)
              that.$store.state.users.accountMangerData = that.handleData(arr)
              that.initData = that.$store.state.users.accountMangerData
              that.platTableData = that.$store.state.users.accountMangerData
            }
          })
        }
      } else {
        if (this.accountOrUsername.trim().length === 0 && this.telOrMail.trim().length === 0 && this.isQuery === false) {
          getAllAccount({ franchiseeId: '123456', userId: 'admin', cityId: this.cityId, type: 1 }, function(error, res) {
            if (error) {
              console.log(error)
              setTimeout(function() {
                that.loading = false
                that.loadingText = '服务器链接超时'
              }, 5000)
              setTimeout(function() {
                that.emptyText = '暂无数据'
              }, 6000)
            } else {
              that.checkLogin(res)
              that.loading = false
              that.totalPage = Number(JSON.parse(res.text).totalPage)
              var arr = JSON.parse(res.text).data
              if (that.totalPage > 1) {
                that.emptyText = ' '
                that.pageShow = true
              } else {
                that.emptyText = '暂无数据'
                that.pageShow = false
              }
              that.totalItems = Number(JSON.parse(res.text).totalItems)
              that.$store.state.accountMangerData = that.handleData(arr)
              that.initData = that.$store.state.accountMangerData
              that.joinTableData = that.$store.state.accountMangerData
            }
          })
        }
      }
    },
    queryInfo() {
      var name = this.name.trim()
      var phone = this.phone.trim()
      var that = this
      var type = null
      if (this.activeName === '平台') {
        this.currentPage = 1
        type = 0
        if (name.length > 0 || phone.length > 0) {
          request.post(host + 'franchisee/account/getAllAdminUser')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              name: this.name.trim(),
              phone: this.phone.trim(),
              type: type
            }).end(function(error, res) {
              if (error) {
                console.log(error)
              } else {
                that.checkLogin(res)
                var arr = JSON.parse(res.text).list
                that.platTableData = that.handleData(arr)
                that.totalItems = JSON.parse(res.text).totalItems
                var totalPage = JSON.parse(res.text).totalPage
                if (totalPage > 1) {
                  that.pageShow = true
                } else {
                  that.pageShow = false
                }
              }
            })
        }
      } else {
        type = 1
        this.currentPage = 1
        if (name.length > 0 || phone.length > 0) {
          request.post(host + 'franchisee/account/getAllAccount')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              name: this.name.trim(),
              phone: this.phone.trim(),
              type: type
            }).end(function(error, res) {
              if (error) {
                console.log(error)
              } else {
                that.checkLogin(res)
                var arr = JSON.parse(res.text).list
                that.joinTableData = that.handleData(arr)
                that.totalItems = JSON.parse(res.text).totalItems
                var totalPage = JSON.parse(res.text).totalPage
                if (totalPage > 1) {
                  that.pageShow = true
                } else {
                  that.pageShow = false
                }
              }
            })
        }
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    change(type) {
      this.$router.push('/index/accountManager/addaccount' + type)
      this.router_show = true
    },
    addAccount() {
      if (this.activeName === '平台') {
        this.$router.push('/index/accountManager/addaccount')
        this.router_show = true
      } else {
        this.$router.push('/index/accountManager/addaccount2')
        this.router_show = true
      }
    },
    handleClick(e) {
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      var that = this
      e.target.setAttribute('class', 'active')
      that.cityId = e.target.getAttribute('name')
      that.loading = true
      getAllAccount({ cityId: that.cityId }, function(error, res) {
        if (error) {
          console.log(error)
          that.loading = false
          that.pageShow = false
        } else {
          that.checkLogin(res)
          that.loading = false
          that.totalPage = Number(JSON.parse(res.text).totalPage)
          var arr = JSON.parse(res.text).data
          that.totalItems = Number(JSON.parse(res.text).totalItems)
          if (that.totalPage > 1) {
            that.emptyText = ' '
            that.pageShow = true
          } else {
            that.emptyText = '暂无数据'
            that.pageShow = false
          }
          that.$store.state.joinTableData = that.handleData(arr)
          that.joinTableData = that.$store.state.joinTableData
          that.initData = that.joinTableData
        }
      })
    },
    openEdit(scope) {
      console.log(scope.row)
      this.remoteMethod()
      this.dialogVisible = true
      this.editAccount.roleName = scope.row.roleName
      this.editAccount.userName = scope.row.userName
      this.editAccount.email = scope.row.email
      this.editAccount.phoneNo = scope.row.phoneNo
      this.editAccount.name = scope.row.name
      this.editAccount.status = scope.row.status
      this.editAccount.index = scope.$index
      this.editAccount.description = scope.row.description
      this.editAccount.cityName = scope.row.cityName
      this.editAccount.id = scope.row.id
      this.editAccount.initUserId = scope.row.userId
    },
    handleEditAccount() {
      if (this.editAccount.userName === '') {
        return
      }
      this.dialogVisible = false
      var that = this
      var newAccountInfo = {}
      if (this.editAccount.role === '管理员') {
        newAccountInfo.role = 0
      } else {
        newAccountInfo.role = 1
      }
      newAccountInfo.id = this.editAccount.id
      newAccountInfo.userName = this.editAccount.userName
      newAccountInfo.roleName = this.editAccount.roleName
      newAccountInfo.passWord = this.editAccount.passWord
      newAccountInfo.description = this.editAccount.description
      newAccountInfo.email = this.editAccount.email
      newAccountInfo.phoneNo = this.editAccount.phoneNo
      newAccountInfo.cityId = this.editAccount.alliance
      newAccountInfo.cityName = this.editAccount.cityName
      newAccountInfo.name = this.editAccount.name
      newAccountInfo.status = (this.editAccount.status == true ? 0 : 1)
      var index = this.editAccount.index
      if (this.activeName === '平台') {
        var AccountInfo = newAccountInfo
        delete AccountInfo.role
        updateAdmin(AccountInfo, function(error, res) {
          if (error) {
            console.log(error)
          } else {
            that.checkLogin(res)
            var code = JSON.parse(res.text).resultCode
            if (code === 1) {
              that.$message({
                type: 'success',
                message: '恭喜您，修改成功！'
              })
              that.platTableData.splice(index, 1, that.editAccount)
              that.loadData()
            } else {
              that.$message({
                type: 'error',
                message: 'sorry, 对不起修改失败！'
              })
            }
          }
        })
      } else {
        console.log('edit', that.editAccount)
        updateAccountByAdmin(newAccountInfo, function(error, res) {
          if (error) {
            console.log(error)
          } else {
            that.checkLogin(res)
            var code = JSON.parse(res.text).resultCode
            if (code === 1) {
              that.$message({
                type: 'success',
                message: '恭喜您，修改成功！'
              })
              that.joinTableData.splice(index, 1, that.editAccount)
            } else {
              that.$message({
                type: 'error',
                message: 'sorry, 对不起修改失败！'
              })
            }
          }
        })
      }
    },
    openDelete(scope) {
      var that = this
      if (this.activeName === '平台') {
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.loading = true
          delAdminUser(
            {
              id: scope.row.id
            },
            function(error, res) {
              if (error) {
                that.loading = false
                that.$message({
                  type: 'error',
                  message: 'sorry，删除失败!'
                })
                console.log(error)
              } else {
                that.checkLogin(res)
                var code = JSON.parse(res.text).resultCode
                if (code === 0) {
                  that.loading = false
                  that.$message({
                    type: 'error',
                    message: '对不起，您没有权限!'
                  })
                } else if (code === 1) {
                  that.loading = false
                  that.$message({
                    type: 'success',
                    message: '恭喜您，删除成功!'
                  })
                  that.platTableData.splice(scope.$index, 1)
                  if (that.platTableData.length === 0) {
                    that.pageShow = false
                    that.emptyText = '暂无数据'
                  }
                }
              }
            }
          )
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      } else {
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.loading = true
          delAccountByAdmin(
            {
              // adminUser: {
              //   id: 0,
              //   role: 0,
              //   userId: '123'
              // },
              // account: {
              //   id: scope.row.id,
              //   userId: scope.row.userId
              // }
              id: scope.row.id,
              userId: scope.row.userId
            }, function(error, res) {
              if (error) {
                console.log(error)
                that.loading = false
                that.$message({
                  type: 'error',
                  message: '对不起，删除失败!'
                })
              } else {
                that.checkLogin(res)
                var code = JSON.parse(res.text).resultCode
                if (code === -1) {
                  that.loading = false
                  that.$message({
                    type: 'error',
                    message: '对不起，您没有权限!'
                  })
                } else if (code === 1) {
                  that.loading = false
                  that.$message({
                    type: 'success',
                    message: '恭喜您，删除成功!'
                  })
                  that.joinTableData.splice(scope.$index, 1)
                  if (that.joinTableData.length === 0) {
                    that.pageShow = false
                    that.emptyText = '暂无数据'
                  }
                }
              }
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    changeState(scope) {
      if (this.activeName === '平台') {
        var that = this
        var initObj = Object.assign({}, scope.row, { status: scope.row.status })
        var obj = Object.assign({}, scope.row, { status: !scope.row.status })
        var obj2 = Object.assign({}, scope.row, { status: !scope.row.status ? 0 : 1 })
        modifyAdminState(
          {
            id: scope.row.id,
            status: !scope.row.status ? 0 : 1
          }, function(error, res) {
            if (error) {
              console.log(error)
              that.$message({
                type: 'error',
                message: '对不起，修改失败'
              })
              that.platTableData.splice(scope.$index, 1, initObj)
            } else {
              that.checkLogin(res)
              var code = JSON.parse(res.text).resultCode
              if (code === 1) {
                that.$message({
                  type: 'success',
                  message: '恭喜你，修改成功'
                })
                that.platTableData.splice(scope.$index, 1, obj)
              } else {
                that.$message({
                  type: 'error',
                  message: '对不起，修改失败'
                })
                that.platTableData.splice(scope.$index, 1, scope.row)
              }
            }
          }
        )
      } else {
        var that = this
        this.accountOrUsername = ''
        this.phoneNo = ''
        var initObj = Object.assign({}, scope.row, { status: scope.row.status })
        var obj = Object.assign({}, scope.row, { status: !scope.row.status })
        var obj2 = Object.assign({}, scope.row, { status: !scope.row.status ? 0 : 1 })
        console.log(obj2)
        modifyAccountStateByAdmin(
          {
            id: obj2.id,
            status: obj2.status
          }, function(error, res) {
            if (error) {
              console.log(error)
              that.$message({
                type: 'error',
                message: '对不起，修改失败'
              })
              that.joinTableData.splice(scope.$index, 1, initObj)
            } else {
              that.checkLogin(res)
              var code = JSON.parse(res.text).resultCode
              if (code === 1) {
                that.$message({
                  type: 'success',
                  message: '恭喜你，修改成功'
                })
                that.joinTableData.splice(scope.$index, 1, obj)
              } else {
                that.$message({
                  type: 'error',
                  message: '对不起，修改失败'
                })
                that.joinTableData.splice(scope.$index, 1, scope.row)
              }
            }
          }
        )
      }
    },
    handleData(arr) {
      var res = arr.map((item) => {
        var obj = {}
        var status = null
        if (item.status === 1) {
          status = true
        } else {
          status = false
        }
        obj = Object.assign({}, item, { status: status })
        return obj
      })
      return res
    },
    loadCity() {
      request.post(host + 'beepartner/admin/city/findCity')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .end((error, res) => {
          if (error) {
            console.log(error)
            this.cityList = []
          } else {
            this.checkLogin(res)
            var result = JSON.parse(res.text).data
            var map = result.map((item) => {
              var obj = {}
              obj.cityId = item.cityId
              obj.cityName = item.cityName
              return obj
            })
            this.cityList = map
          }
        })
    },
    handleClickTab(tab, event) {
      var that = this
      this.name = ''
      this.phone = ''
      this.accountOrUsername = ''
      this.telOrMail = ''
      this.pageShow = false
      if (this.activeName === '平台') {
        this.currentPage = 1
        var that = this
        this.loading = true
        getAllAdminUser({}, function(err, res) {
          if (err) {
            console.log(err)
            setTimeout(function() {
              that.loading = false
              that.loadingText = '服务器链接超时'
            }, 5000)
            setTimeout(function() {
              that.emptyText = '暂无数据'
            }, 6000)
          } else {
            that.checkLogin(res)
            that.loading = false
            that.emptyText = ' '
            that.totalPage = JSON.parse(res.text).totalPage
            var arr = JSON.parse(res.text).data
            if (that.totalPage > 1) {
              that.emptyText = ' '
              that.pageShow = true
            } else {
              that.emptyText = '暂无数据'
              that.pageShow = false
            }
            that.totalItems = Number(JSON.parse(res.text).totalItems)
            that.$store.state.platTableData = that.handleData(arr)
            that.platTableData = that.$store.state.platTableData
            that.initData = that.platTableData
          }
        })
      } else {
        this.loading = true
        this.currentPage = 1
        request
          .post(host + 'beepartner/admin/User/findFranchiseeUser')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            cityId: $('.citys span.active').attr('name')
          })
          .end((error, res) => {
            if (error) {
              console.log(error)
              setTimeout(function() {
                that.loading = false
                that.loadingText = '服务器链接超时'
              }, 5000)
              setTimeout(function() {
                that.emptyText = '暂无数据'
              }, 6000)
            } else {
              that.checkLogin(res)
              that.loading = false
              that.totalPage = Number(JSON.parse(res.text).totalPage)
              var arr = JSON.parse(res.text).data
              that.totalItems = Number(JSON.parse(res.text).totalItems)
              if (that.totalPage > 1) {
                that.emptyText = ' '
                that.pageShow = true
              } else {
                that.emptyText = '暂无数据'
                that.pageShow = false
              }
              that.$store.state.joinTableData = that.handleData(arr)
              that.joinTableData = that.$store.state.joinTableData
              that.initData = that.joinTableData
            }
          })
      }
    },
    checkLogin(res) {
      if (JSON.parse(res.text).message === '用户登录超时') {
        this.$router.push('/login')
      }
    },
    remoteMethod() {
      var that = this
      setTimeout(() => {
        request.post(host + 'beepartner/admin/User/findAdminRole')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send()
          .end((error, res) => {
            if (error) {
              console.log(error)
              that.options4 = []
            } else {
              that.checkLogin(res)
              console.log(JSON.parse(res.text))
              var roles = JSON.parse(res.text).data.map((item) => {
                var obj = {}
                obj.value = item.roleName
                obj.label = item.roleName
                obj.id = item.id
                return obj
              })
              that.options4 = roles
            }
          })
      }, 200)
    },
  },
  mounted() {
    document.title = '蜜蜂平台管理——账号管理'
    this.loadData()
    this.loadCity()
  },
  watch: {
    'editAccount.alliance': {
      handler: function(val, oldVal) {
        console.log(val)
        console.log(this.cityList)
        this.cityList.map((item) => {
          console.log(item.cityId, val)
          if (item.cityId == val) {
            this.editAccount.cityName = item.cityName
          }
        })
        console.log(this.editAccount)
      },
      deep: true
    },
    currentPage: {
      handler: function(val, oldVal) {
        var that = this
        that.loading = true
        if (this.activeName === '平台') {
          if (this.name.trim().length === 0 && this.phone.trim().length === 0) {
            getAllAdminUser({
              'currentPage': val,
              'queryName': this.accountOrUsername,
              'queryNumber': this.telOrMail,
            }, function(err, res) {
              if (err) {
                console.log(err)
                that.loading = false
              } else {
                that.loading = false
                var arr = JSON.parse(res.text).data
                var totalPage = Number(JSON.parse(res.text).totalPage)
                if (totalPage > 1) {
                  that.emptyText = ' '
                  that.pageShow = true
                } else {
                  that.pageShow = false
                  that.emptyText = '暂无数据'
                }
                that.$store.state.platTableData = that.handleData(arr)
                that.platTableData = that.$store.state.platTableData
              }
            })
          } else {
            request.post(host + 'beepartner/admin/User/findAdminUser')
              .send({
                'queryName': this.accountOrUsername,
                'queryNumber': this.telOrMail,
                'currentPage': val
              }).end(function(error, res) {
                if (error) {
                  console.log(error)
                  that.loading = false
                } else {
                  that.loading = false
                  var arr = JSON.parse(res.text).data
                  that.tableTableData = that.handleData(arr)
                  that.totalItems = Number(JSON.parse(res.text).totalItems)
                  var totalPage = Number(JSON.parse(res.text).totalPage)
                  if (totalPage > 1) {
                    that.pageShow = true
                  } else {
                    that.pageShow = false
                  }
                }
              })
          }
        } else {
          if (this.name.trim().length === 0 && this.phone.trim().length === 0) {
            getAllAccount({
              'cityId': this.cityId,
              'currentPage': val,
              'queryName': this.accountOrUsername,
              'queryNumber': this.telOrMail
            }, function(error, res) {
              if (error) {
                console.log(error)
                that.loading = false
              } else {
                that.loading = false
                var arr = JSON.parse(res.text).data
                var totalPage = JSON.parse(res.text).totalPage
                if (totalPage > 1) {
                  that.pageShow = true
                } else {
                  that.pageShow = false
                  that.emptyText = '暂无数据'
                }
                that.$store.state.joinTableData = that.handleData(arr)
                that.joinTableData = that.$store.state.joinTableData
              }
            })
          } else {
            request.post(host + 'beepartner/admin/User/findFranchiseeUser').
              send({
                'queryName': this.accountOrUsername,
                'queryNumber': this.telOrMail,
                'type': 1,
                'cityId': this.cityId,
                'currentPage': val
              })
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .end(function(error, res) {
                if (error) {
                  console.log(error)
                  that.loading = false
                } else {
                  that.loading = false
                  var arr = JSON.parse(res.text).data
                  that.joinTableData = that.handleData(arr)
                  that.totalItems = JSON.parse(res.text).totalItems
                  var totalPage = JSON.parse(res.text).totalPage
                  if (totalPage > 1) {
                    that.pageShow = true
                  } else {
                    that.pageShow = false
                  }
                }
              })
          }
        }
      },
      deep: true
    },
    '$route': 'loadData'
  }
}
</script>

<style scoped>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
td,
tr,
th,
table,
thead,
tbody,
dl,
dt,
dd,
p,
span,
ul,
li,
ol {
  margin: 0;
  padding: 0;
}

body {
  background: #f2f2f2;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}



/*#account_router_cover {
  width: 100%;
  height: 100%;
  background: rgba(128,128,128,0.6);
  position: fixed;
  left: 0;
  top: 0;
}*/

#account_router {
  width: 100%;
  height: 100%;
  background: rgba(68, 68, 68, 0.6);
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}

#search_content {
  border: 1px solid #e7ecf1;
  overflow: hidden;
}



/*#account_router {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  height: 80%;
  margin-left: 10%;
  margin-top: 5%;
  width: 80%;
  z-index: 100;
  background: #f60;
  overflow: hidden;
}*/

div.account {
  /* width: 100%; */
  padding: 0 30px 0px 30px;
  background: #fff;
  margin-top: 20px;
  /* border: 1px solid #e7ecf1; */
  /* padding-bottom: 100%; */
}

div.account>h1 {
  width: 90%;
  height: 68px;
  line-height: 55px;
}

div.account>h1 button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  background: rgba(66, 66, 66, 0.8);
  transition: all .2s linear 0s;
}

div.account>h1 button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

.am_search {
  width: 100%;
  height: 70px;
  background: #fff;
  /* border: 1px solid #e7ecf1; */
}

.account_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: inline-block;
  text-indent: 8px;
}

.am_search label {
  /* width: 190px; */
  height: 70px;
  line-height: 70px;
  margin-right: 10px;
  margin-left: 30px;
  float: left;
}

.am_search label span {
  line-height: 70px;
  font-weight: 400;
  font-size: 14px;
  display: block;
  margin-right: 10px;
  float: left;
}

.am_search label:nth-child(2) {
  margin-left: 0;
}

.am_search button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 17px 30px;
  float: right;
  padding: 10px 15px;
  border-radius: 4px;
}

.am_search button:hover {
  color: #20a0ff;
  border-color: #20a0ff;
}

.el-table__body,
.el-table__footer,
.el-table__header {
  border: 2px solid red;
}

#err_form .el-form-item {
  padding-left: 140px;
  margin-bottom: 22px;
}

.el-switch__label,
.el-switch__label * {
  font-size: 12px;
}

.el-icon-close,
.el-icon-edit {
  cursor: pointer
}

.el-dialog .dialogModal {
  background: rgba(0, 0, 0, .5)
}

.one {
  background: #f87e2b;
  border: none;
  width: 120px;
  height: 50px;
}

.two {
  background: #f87e2b;
  border: none;
  width: 120px;
  height: 50px;
}

.one:hover {
  background: rgba(248, 126, 43, 0.9);
  width: 120px;
  height: 50px;
}


.two:hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
  width: 120px;
  height: 50px;
}

button#accountSearchBtn {
  width: 80px;
  /* float: right; */
  height: 36px;
  line-height: 11px;
  margin-right: 30px;
  color: #fff;
  outline: none;
  border: none;
  /* border-radius: 4px; */
  background: rgba(52, 52, 67, 0.8);
}

button#accountSearchBtn:hover {
  color: #fff;
  background: rgba(52, 52, 67, 1);
}

button#accountSearchBtn2 {
  width: 80px;
  /* float: right; */
  height: 36px;
  line-height: 11px;
  margin-right: 30px;
  color: #fff;
  outline: none;
  border: none;
  /* border-radius: 4px; */
  background: rgba(52, 52, 67, 0.8);
}

button#accountSearchBtn2:hover {
  color: #fff;
  background: rgba(52, 52, 67, 1);
}

.accountMangerBtn {
  width: 120px;
  height: 50px;
}

.accountMangerBtn:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.accountMangerBtn:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
  margin-left: 170px;
}

.accountMangerBtn:nth-of-type(2) {
  background: #fff;
  color: #444;
  border: 1px solid rgba(196, 196, 196, 1)
}

.accountMangerBtn:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

div.addfooter,
div.editfooter {
  text-align: left;
  padding-left: 60px;
  margin-top: -43px;
  margin-bottom: 10px;
}

div.el-input {
  width: initial
}

.el-pagination {
  white-space: nowrap;
  /* padding: 2px 5px; */
  color: #48576a;
  padding-left: 30px;
  background: #fff;
  /* margin-left: 1px; */
  border-left: 1px solid #e7ecf1;
}

div.el-pagination {
  padding-left: 0;
  border-left: 0;
  margin-left: 30px;
    margin-top: 10px;
}

#partner .selectPlace {
  width: 100%;
  min-height: 40px;
  /* border: 1px solid #e7ecf1; */
  padding: 15px 10px 10px 30px;
  box-sizing: border-box;
}

div.selectPlace address {
  font-style: normal;
  display: inline;
  font-size: 14px;
}

div.selectPlace div.citys {
  display: inline-block;
}

div.selectPlace div.citys span.active {
  border-radius: 4px;
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
}
</style>

