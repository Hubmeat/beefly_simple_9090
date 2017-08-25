<template>
    <header>
        <el-row>
            <el-col :span="24">
                <h2>
                    <img src="../assets/header/logo.jpg">
                </h2>
                <h3>蜜蜂出行加盟商管理平台<span></span></h3>
                <div class="admin">
                    <img class="headImg" v-if="imageUrl" :src="imageUrl">
                    <i v-else class="icon iconfont icon-touxiang"></i>
                    <span class="username">{{userName}}</span>
                    <!-- <i class="icon iconfont icon-xinfeng"></i> -->
                    <i class="icon iconfont icon-tuichu" @click="handleLoginOut"></i>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
import { host } from '../config/index'
import request from 'superagent'
export default {
    data () {
        return {
            imageUrl: '',
            userName: '用户名'
        }
    },  
    mounted () {
        this.imageUrl = sessionStorage.getItem('headImg')
        this.userName = sessionStorage.getItem('userName')
    },
  methods: {
    handleLoginOut () {
      var that = this
      request
        .post(host + 'beepartner/system/login/removeAdminSession')
        .withCredentials()
        .set({
            'content-type': 'application/x-www-form-urlencoded'
        })
        .end((err,res)=>{
            if(err){
                console.log(err)
            }else{
                var code = JSON.parse(res.text).resultCode
                var message = JSON.parse(res.text).message
                if(code === 1){
                    // localStorage.removeItem('userinfo');

                    this.$router.push('/login')
                }else{

                }
                
            }
        })
    },
    headWay () {
        if (this.$store.state.users.isHeaderImg) {
            this.imageUrl = sessionStorage.getItem('headImg')
        } else {
            return
        }
    }
  },
  watch: {
      '$store.state.users.isHeaderImg': 'headWay'
  }
}
</script>
<style scoped>
img.headImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
    margin-top: 18px;
    display: inline-block;
}
header {
    height: 65px;
    line-height: 65px;
    background: #4d4d4d;
    border-color: #e9ecf3;
    color: #fff;
}

header h2 {
    width: 120px;
    height: 65px;
    line-height: 65px;
    display:block;
    float: left;
    padding-left: 20px;
}

header h2 img {
    display: inline-block;
    margin-top: 10px;
    width: 100%;
    height: 42px;
}

header h3 {
    display: inline-block;
    padding-left: 20px;
    position: relative;
}

header h3>span {
    position: absolute;
    display: block;
    width: 40px;
    height: 20px;
    right: -50px;
    top: 4px;
    font-size: 12px;
}

div.admin {
    float: right;
    float: right;
    margin-right: 28px;
}

div.admin span.username {
    font-size: 14px;
    margin-right: 25px;
}

div.admin i.iconfont {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
}

div.admin i.iconfont.icon-xinfeng,
div.admin i.iconfont.icon-tuichu {
    font-size: 24px;
}

div.admin i.iconfont.icon-tuichu:hover {
    color: yellow;
}
</style>

