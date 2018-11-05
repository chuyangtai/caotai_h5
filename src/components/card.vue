<template>
    <div>
      <div class="head">
        {{tit}}
      </div>
      <slot name="card-body"></slot>
    </div>
</template>

<script>
  export default {
    name: 'card',
    props:{
      tit:{
        
        default:'标题丢失'
      }
    },
    data () {
      return {
        selected:[1]
      }
    }
  }
</script>

<style scoped>

</style>