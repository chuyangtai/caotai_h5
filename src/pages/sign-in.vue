<template>
  <div class="sign-in">
    <div class="tips">
      <p>
        注册说明：
      </p>
      <p>
        好！欢迎您使用创头条企业号！
      </p>
      <p>
        为了更好地为您提供服务，请您仔细阅读这份协议，理解认同后再进行注册。
      </p>
    </div>
    <form name="sign-in">
      <div class="form-group">
        <label class="form-label"><img src="../assets/img/ct_zc_yhm_icon.png" alt="" class="img-mobile"></label>
        <input class="form-input" v-model.trim.lazy="mobile" placeholder="用户名/手机号" @focus="showClear=true"
               autocomplete="on"/>
        <div @click="clearValue('mobile')"><img src="../assets/img/ct_zc_qc_icon.png" alt="" class="clear"
                                                v-if="showClear"></div>
      </div>
      <div class="form-group">
        <label class="form-label"><img src="../assets/img/ct_zc_yzm_icon.png" alt="" class="img-code"></label>
        <input class="form-input" v-model.trim.lazy="code" placeholder="输入手机验证码"/>
        <button type="button" class="get-code" disabled="disabled" v-if="gettingCode">{{getCodeTip}}</button>
        <button type="button" class="get-code" @click="getCode(mobile)" v-else>获取验证码</button>
      </div>
      <div class="form-group">
        <label class="form-label"><img src="../assets/img/ct_zc_mm_icon.png" alt="" class="img-mobile"></label>
        <input type="text" v-if="passwordShow" v-model="password"  placeholder="请输入6-16位新密码">
        <input v-else type="password" class="form-input flex-1" v-model.trim.lazy="password" placeholder="请输入6-16位新密码"/>
        <div @click="showPassword('passwordShow')">
          <img src="../assets/img/ct_zc_xs_icon.png" alt="" class="clear" v-if="passwordShow">
          <img src="../assets/img/ct_zc_yc_icon.png" alt="" class="clear" v-else>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label"><img src="../assets/img/ct_zc_qrmm_icon.png" class="img-mobile"></label>
        <input type="text" v-if="rePasswordShow" v-model="rePassword"  placeholder="请确认新密码">
        <input v-else type="password" class="form-input flex-1" v-model.trim.lazy="rePassword" placeholder="请确认新密码"/>
        <div @click="showPassword('rePasswordShow')">
          <img src="../assets/img/ct_zc_xs_icon.png" alt="" class="clear" v-if="rePasswordShow">
          <img src="../assets/img/ct_zc_yc_icon.png" alt="" class="clear" v-else>
        </div>
      </div>
      <div class="form-group choose" @click="showInstruments">
        <label class="form-label"><img src="../assets/img/ct_zc_yq_icon.png" class="img-mobile"></label>
        <input type="text" v-model="musicTypeName" placeholder="请选择擅长的乐器" disabled>
        <img src="../assets/img/ct_hsxy_icon.png" class="icon-right">
      </div>
      <button type="button" class="btn-green btn" @click="signIn(mobile,code)">注册</button>
    </form>
    <div class="fs-12 text-center lh24 agreement" for="agreement">
      <label for="agreement">
        <input type="checkbox" v-model="isChecked" name="agreement" id="agreement"><span></span>草台伴奏注册协议，你已同意
      </label>
      <a @click="goAgree()">&lt;用户协议&gt;</a>
    </div>
    <div class="footer fs-12 text-center">已有账号？
      <button type="button" class="btn-blank" @click="goLogin(mobile)">请登录</button>
      
    </div>
    <!--选择弹出-->
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <button class="select-btn" @click="select">选择</button>
      <mt-picker :slots="slots" value-key="instrumentsName" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui' //提示框 发送验证码成功
  import {getCode} from '@/api/login'
  import {signIn, instruments} from '@/api/sign'
  import { Popup,Picker } from "mint-ui"

  export default {
    name: 'sign-in',
    data () {
      return {
        passwordShow:false,
        rePasswordShow:false,
        popupVisible:false,
        password: '',
        rePassword: '',
        isChecked: false,
        showClear: false,
        mobile: '',
        code: '',
        countDown: 59,
        gettingCode: false,
        musicTypeId:'',
        musicTypeName:'',
        temporary:{
          musicTypeName:''
        },
        slots:[{
          values:['']
        }]
      }
    },
    computed: {
      isCode () {/*验证码为空*/
        return this.code.trim() !== ''
      },
      isMobile () {/*手机号不正确*/
        let mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (this.mobile !== '' && mobileReg.test(this.mobile)) {
          return true
        }
      },
      getCodeTip () {
        return this.countDown + 's重新获取'
      },
      isPassword(){
        let passwordReg = /^.{6,16}$/;
        if (this.password.trim() !== '' && passwordReg.test(this.password)) {
          
          return true
        }
      },
      isrePassword(){
        let rePasswordReg = /^.{6,16}$/;
        console.log(rePasswordReg.test(this.rePassword))
        if (this.rePassword.trim() !== '' && rePasswordReg.test(this.rePassword)&&this.rePassword===this.password) {

          return true
        }
      },
    },
    methods: {
      select(){
        this.musicTypeName=this.temporary.musicTypeName;
        this.popupVisible=false;
      },
      onValuesChange(picker, values){
        this.temporary.musicTypeName=values[0].instrumentsName;
        this.musicTypeId=values[0].id
      },
      /*隐藏显示密码*/
      showPassword(param){
        console.log(param)
        this[param]=!this[param];
      },
      showInstruments(){
        this.popupVisible=true;
      },
      goAgree () {
        this.$router.push({path: '/agreement'})
      },
      goLogin (mobile) {
        this.$router.push({path: '/login', query: {'mobile': mobile}})
      },
      /*清空*/
      clearValue (value) {
        this[value] = ''
        this.showClear = false
      },
      countDownFn () {
        var a = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            clearInterval(a)
            this.gettingCode = false
            this.countDown = 59
          }
        }, 1000)
      },
      /*获取验证码*/
      getCode (phone) {
        if (!this.isMobile) {
          Toast({
            message: '手机号码填写有误',
            position: 'middle',
            duration: 3000
          })
          return
        } else {
          getCode(phone).then(res => {
            if (res.code === '0000') {
              Toast({
                message: '发送成功，请注意在手机上查收',
                position: 'middle',
                duration: 3000
              })
              this.gettingCode = true
              this.countDownFn()
            } else {
              Toast({
                message: res.message,
                position: 'middle',
                duration: 3000
              })
              return
            }
          })
        }
      },
      /*注册*/
      signIn (phone, verifyCode) {
        if (!this.isMobile) {
          Toast({
            message: '手机号码填写有误',
            position: 'middle',
            duration: 3000
          })
          return
        } else if (!this.isCode) {
          Toast({
            message: '请填写验证码',
            position: 'middle',
            duration: 3000
          })
          return
        } else if(!this.isPassword){
          Toast({
            message: '密码6-16位',
            position: 'middle',
            duration: 3000
          })
        }else if(!this.isrePassword){
          Toast({
            message: '两次密码不一致',
            position: 'middle',
            duration: 3000
          })
        }else if (!this.isChecked) {
          Toast('请查看并同意协议')
          return
        } else {
          var params={
            phone:this.mobile,
            verifyCode:this.code,
            password:this.password,
            passwordConfirm:this.rePassword,
            musicTypeId:this.musicTypeId,
            inviteUserNo:this.query.inviteUserNo,
            inviteUserRole:this.query.inviteUserRole
          }
          signIn(params).then(res => {
            if (res.code === '0000') {
              this.$store.commit("SET_USER",{"user_id":res.data.userNo,"user_token":res.data.token});
              Toast({
                message: '注册成功',
                position: 'middle',
                duration: 3000
              });
              console.log(this.$route.query.redirect)
            } else {
              Toast({
                message: res.message,
                position: 'middle',
                duration: 3000
              })
              return
            }
          })
        }
      }
    },
    mounted () {
      this.query=this.$route.query;
      instruments().then(res => {
        if (res.code = '0000') {
          this.slots[0].values=res.data.list;
          
        } else {
          Toast({
            message: res.message,
            position: 'middle',
            duration: 3000
          })
        }
      })
      this.mobile = this.$route.query.mobile
    }
  }
</script>

<style lang="scss" scoped>
  form[name='sign-in'] {
    padding: 0 2.5rem;
    margin-top: .5rem;
    a {
      color: #0090FF;
      text-decoration: underline;
      font-size: 1.4rem;
      display: block;
      margin-top: 1.5rem;
      margin-left: 28rem;
    }
    .form-group {
      position: relative;
      background-color: #fff;
      input {
        border: none;
        border-bottom: 1px solid #efefef;
        line-height: 5rem;
        font-size: 1.6rem;
        padding-left: 5.2rem;
        width: 100%;
      }
      label {
        position: absolute;
        line-height: 5rem;
        height: 5rem;
        img.img-mobile {
          padding: 1.4rem 0 0 0rem;
          height: 2.4rem;
        }
        img.img-code {
          height: 1.8rem;
          padding: 1.6rem 0 0 0.3rem;
        }
      }
      img.clear {
        width: 1.5rem;
        position: absolute;
        right: 0rem;
        padding: 1.7rem;
        top: .1rem;
      }
      .get-code {
        background-color: #2DC87D;
        @include border-radius(0.3rem);
        color: #fff;
        font-size: 1.2rem;
        padding: 1rem 1.5rem;
        line-height: 1;
        position: absolute;
        right: 0rem;
        top: 1rem
      }
      button[disabled='disabled'] {
        color: #fff;
        background-color: #c8c8cd;
      }
    }
    .btn {
      display: block;
      border: none;
      @include border-radius(0.5rem);
    }
    .btn-green {
      background-color: #2DC87D;
      width: 30rem;
      height: 4.4rem;
      line-height: 4.4rem;
      font-size: 1.8rem;
      color: #fff;
      margin: 3rem auto 2rem auto;
    }
    .btn-white {
      @extend .btn-green;
      background-color: #fff;
      color: #999;
      margin-top: 0;
    }
  }

  .sign-in {
    position: relative;
    height: 66.7rem;
    background-color: #fff;
    .tips {
      padding: 1.5rem 4.8rem;
      color: #999;
      font-size: 1.4rem;
      p {
        text-indent: 2.8rem;
        line-height: 2rem;
      }
    }
    .btn-blank {
      border: .1rem solid #2DC87D;
      background-color: #fff;
      height: 1.2rem;
      line-height: 1;
      font-size: 1.2rem;
      padding: .6rem 2.6rem;
      color: #2DC87D;
      box-sizing: content-box;
      border-radius: .5rem;
    }
    .agreement input[type="checkbox"] + span {
      display: inline-block;
      width: 1.8rem;
      height: 1.8rem;
      border: 1px solid #ccc;
      border-radius: 50%;
      vertical-align: top;
      margin-right: .5rem;
    }
    .agreement input[type="checkbox"] {
      display: none;
    }
    .agreement input[type="checkbox"]:checked + span {
      width: 2rem;
      height: 2rem;
      border: none;
      border-radius: 50%;
      background: url("../assets/img/ct_zc_xz_icon.png") no-repeat center/2rem 2rem;
    }
    .fs-12 {
      font-size: 1.2rem;
      color: #1A1A1A;
    }
    a {
      color: #0090FF;
    }
    .footer {
      position: absolute;
      margin-top: 18.2rem;
      bottom: 3rem;
      width: 100%;
    }
    .choose {
      position: relative;
      .icon-right {
        width: .9rem;
        position: absolute;
        right: .5rem;
        top: 50%;
        margin-top: -.6rem;
      }
      input:disabled {
        background-color: #fff;
      }
    }
  }
  .mint-popup,.picker-slot{
    width: 100%;
    .select-btn{
      background:#2DC87D;
      color: #fff;
      border: none;
      padding: .5rem 1rem;
      @include border-radius(0.3rem);
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 999
    }
  }
</style>