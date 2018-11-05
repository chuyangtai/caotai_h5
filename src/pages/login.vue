<template>
  <div>
    <form name="login">
      <div class="form-group" :class="{ 'form-group-error': isMobile }">
        <label class=""><img src="../assets/img/ct_dl_yhm_icon.png" class="img_mobile"></label>
        <input class="form-input flex-1" v-model.trim.lazy="mobile" placeholder="用户名/手机号" @focus="showClear=true" autocomplete="on"/>
        <div @click="clearValue('mobile')"><img src="../assets/img/ct_zc_qc_icon.png" alt="" class="clear" v-if="showClear"></div>
      </div>
      <div class="form-group last" :class="{ 'form-group-error': isPassword }">
        <label class="form-label"><img src="../assets/img/ct_dl_mm_icon.png" class="img_password"></label>
        <input type="text" v-if="passwordShow" v-model="password" @focus="showClear=false" placeholder="密码">
        <input v-else type="password" class="form-input flex-1" v-model.trim.lazy="password" placeholder="密码"/>
        <div @click="showPassword('password')">
          <img src="../assets/img/ct_zc_xs_icon.png" alt="" class="clear" v-if="passwordShow">
          <img src="../assets/img/ct_zc_yc_icon.png" alt="" class="clear" v-else>
        </div>
      </div>
      <a href="">忘记密码</a>
      <button type="button" class="btn-green btn" @click="submit()">登录</button>
      <button type="button" class="btn-white btn" @click="sign(mobile)">注册</button>
    </form>
    <div class="tips">
      <div>公司说明：</div>
      <p>好！欢迎您使用创头条企业号！</p>
      <p>为了更好地为您提供服务，请您仔细阅读这份协议，理解认同后再进行注册。</p>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui' //提示框 发送验证码成功
  import {goLogin} from '@/api/login' //提示框 发送验证码成功
  import md5 from 'js-md5';
  export default {
    name: 'login',
    data () {
      return {
        passwordShow:false,
        mobile: '',
        password: '',
        submitStatus: 'ok',
        showClear:false
      }
    },
    components: {},
    computed: {
      isPassword () {/*密码为空*/
        return this.password.trim() !== ''
      },
      isMobile () {/*手机号不正确*/
        let mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (this.mobile !== '' && mobileReg.test(this.mobile)) {
          return true
        }
      }
    },
    methods: {
      /*隐藏显示密码*/
      showPassword(){
        this.passwordShow=!this.passwordShow;
      },
      /*清空*/
      clearValue(value){
        this[value]='';
        this.showClear=false;
      },
      submit () {
        if (!this.isMobile) {
          Toast({
            message: '手机号码填写有误',
            position: 'middle',
            duration: 3000
          })
          return
        } else if (!this.isPassword) {
          Toast({
            message: '请填写密码',
            position: 'middle',
            duration: 3000
          })
          return
        }
        else {
          var mobile = this.mobile
          var password = this.password
          goLogin(mobile, password).then(res => {
            if (res.code==='0000') {
              this.$store.commit("SET_USER",{"user_id":res.data.userNo,"user_token":res.data.token});
              // console.log(this.$route.query.redirect)
              this.$router.push({path:this.$route.query.redirect})
              Toast({
                message: '登陆成功',
                position: 'middle',
                duration: 3000
              })
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
      sign(mobile){
        this.$router.push({path:'/sign',query:{"mobile":mobile}})
      }
    },
    mounted(){
      this.mobile=this.$route.query.mobile;
    }
  }
</script>

<style lang="scss" scoped>
  form[name='login'] {
    a {
      color: #0090FF;
      text-decoration: underline;
      font-size: 1.4rem;
      display: block;
      margin-top: 1.5rem;
      margin-left: 28rem;
    }
    margin-top: 1.5rem;
    .form-group {
      position: relative;
      background-color: #fff;
      input {
        border: none;
        line-height: 4.4rem;
        height: 4.4rem;
        font-size: 1.6rem;
        padding-left: 6.2rem;
      }
      &:after {
        content: '';
        display: block;
        width: 36.5rem;
        border-bottom: 1px solid #D9D9D9;
        left: 1rem;
        position: absolute;
        z-index: 1000;
      }
      &.last{
        &:after {
          content: '';
          display: block;
          width: 100%;
          left: 0;
          border-bottom: 1px solid #D9D9D9;
          position: absolute;
          z-index: 1000;
        }
      }
      label {
        position: absolute;
        line-height: 4.4rem;
        height: 4.4rem;
        img.img_mobile {
          padding: 1.2rem 0 1.2rem 3rem;
          height: 2rem;
        }
        img.img_password {
          height: 2.2rem;
          padding: 1.1rem 0 1.1rem 2.8rem;
        }
      }
    }
    img.clear{
      width: 1.5rem;
      position: absolute;
      right: 3rem;
      padding: 1.4rem;
      top:.1rem;
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
    .form-group-error {
      color: red;
    }
  }

  .tips {
    margin: 7.5rem 4.8rem;
    font-size: 1.4rem;
    line-height: 2rem;
    color: #999;
    p {
      text-indent: 2.8rem;
      line-height: 2rem;
    }
  }

</style>