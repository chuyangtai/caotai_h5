<template>
  <div class="contact">
    <img src="../assets/img/ct_lxwm_logo_icon@2x.png" alt="" class="img-logo">
    <div class="tit">杭州草台文化有限责任公司</div>
    <div class="pr">
      <img src="../assets/img/ct_lxwm_dhbj_icon@2x.png" alt="" class="img-bg">
      <ul>
        <li>
          <div class="fs12">客户电话</div>
          <div>123456789</div>
        </li>
        <li class="mb2">
          <div class="fs12">公司邮箱</div>
          <div>123456789</div>
        </li>
        <li>
          <div class="fs12">公司地址</div>
          <div>浙江省杭州市滨江区</div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'app-contact',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .contact {
    background-color: #2DC87D;
    height: 66.7rem;
    .tit {
      font-size: 1.6rem;
      color: #fff;
      text-align: center;
    }
    .img-logo {
      width: 10rem;
      height: 10rem;
      padding: 5rem 0 3rem 0;
      margin: 0 auto;
      display: block;
    }
    .img-bg {
      width: 28rem;
      height: 24rem;
      margin: 6.4rem auto 0 auto;
      display: block;
    }
    .pr {
      position: relative
    }
    ul {
      color: #4D4D4D;
      font-size: 1.4rem;
      text-align: center;
      width: 25rem;
      position: absolute;
      top: 0rem;
      left: 50%;
      margin-left: -12.5rem;
      z-index: 999;
      .mb2{
          margin: .6rem 0 .6rem 0;
        }
      li {
        border-bottom: 1px solid #d9d9d9;
        padding: 1.8rem 0;
        line-height: 1;
        .fs12 {
          font-size: 1.2rem;
          color: #999;
          margin-bottom: 1.2rem;
        }
        &:last-child{
          border-bottom: none;
        }
      }
    }
  }


</style>