<template>
  <mt-header title="首页">
    <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</template>

<script>
  import { Header } from 'mint-ui';
  
  export default {
    name: 'page-nav'
  }
</script>

<style scoped>

</style>