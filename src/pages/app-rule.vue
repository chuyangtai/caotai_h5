<template>
    <div class="rule">
      <h2>草豆规则</h2>
      <h3>一、草豆获取途径：</h3>
      1:app充值：充值1元可获得1草豆。<br>
      2:推荐用户获得草豆<br>
      3:其他<br>
      草豆损耗方式：<br>
      1:购买单曲<br>
      2:购买vip<br>
      <h3>二：使用说明：</h3>
      后台编辑h5页面：需要图文编辑器<br>
    </div>
</template>

<script>
  export default {
    name: 'app-rule',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
.rule{
  color: #4D4D4D;
  background-color: #fff;
  height: 100%;
  padding: 1.5rem;
  font-size: 1.2rem;
  line-height: 2rem;
  h2{text-align: center;color: #000;font-weight: bold}
  h3{color: #000;margin: 2rem 0 1rem 0;font-size: 1.4rem}
}
</style>