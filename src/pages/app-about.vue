<template>
    <div class="about">
      <img src="../assets/img/ct_dl_logo_icon.png" alt="" class="img-logo">
      <div class="tit">杭州草台文化有限责任公司</div>
    </div>
</template>

<script>
  export default {
    name: 'app-about',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
.about{
  background-color: #fff;
  height: 66.7rem;
  .img-logo {
    width: 10rem;
    height: 10rem;
    padding: 5rem 0 3rem 0;
    margin: 0 auto;
    display: block;
  }
  .tit{
    font-size: 1.6rem;
    color: #777;
    text-align: center;
  }
}
</style>