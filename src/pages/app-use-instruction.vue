<template>
    <div class="instru">
      <div class="title">1.演奏的歌曲存储在哪里？</div>
      <div class="content display-flex"><div>答.</div><div>演奏的歌曲存储在本地文件夹，本地文件夹名称为CT_     YZHC</div></div>
      <div class="title">1.演奏的歌曲存储在哪里？</div>
      <div class="content display-flex"><div>答.</div><div>演奏的歌曲存储在本地文件夹，本地文件夹名称为CT_     YZHC</div></div>
    </div>
</template>

<script>
  export default {
    name: 'app-use-instruction',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .instru{
    margin-top: .5rem;
    padding: 1.5rem;
    line-height: 1;
    font-size: 1.4rem;
    text-align: justify;
    background-color: #fff;
    .title{
      background-color: #F2F2F2;
      color:#1A1A1A;
      padding: .9rem;
    }
    .content{
      line-height: 2rem;
      font-size: 1.2rem;
      color: #999999;
      padding:1rem .9rem;
    }
  }

</style>