<template>
  <div>
    <signForm ref="child" :type="type"></signForm>
    <button type="button" class="btn-block" @click="applyForService()">提交审核</button>
  </div>

</template>

<script>
  import { Toast,Popup,Picker } from "mint-ui";
  import signForm from '@/components/sign-form'
  import {applyAgent} from '@/api/sign'

  export default {
    name: 'sign-agent',
    data () {
      return {
        type:'代理商'
      }
    },
    components:{signForm:signForm},
    computed:{
      info:{
        get(){
          return this.$refs.child.info
        }
      }
    },
    mounted(){
      this.info.inviteUserNo=this.$route.query.inviteUserNo;
      this.info.inviteUserRole=this.$route.query.inviteUserRole;
    },
    methods:{
      applyForService(){
        this.info.token=sessionStorage.getItem('currentUser_token');
        this.info.userNo=sessionStorage.getItem('currentUser_id');
        if(this.isEmpty()){
          return;
        }else {
          applyAgent(this.info).then(res=>{
            if(res.code==='0000'){
              Toast('申请成功')
            }else {
              Toast({
                message:res.message
              })
            }
          })
        }
      },
      isEmpty(){
        if(this.info.companyName===''){
          Toast('请填代理商名称');
          return true;
        }else if(this.info.contact===''){
          Toast('请填写联系人');
          return true;
        }else if(this.info.telephone===''){
          Toast('请填写电话号码');
          return true;
        }else if(this.info.phone===''){
          Toast('请填写手机号');
          return true;
        }else if(!this.info.province||!this.info.cityCode||!this.info.district){
          Toast('请选择省市区');
          return true;
        }else if(this.info.addressDetail===''){
          Toast('请填写详细地址');
          return true;
        }else if(this.info.profile===''){
          Toast('请填写简介');
          return true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  form.sign-service{
    background-color: #fff;
    margin-top: 0.5rem;
    padding:0 1rem;
    font-size: 1.4rem;
    img.icon-right{
      width: .9rem;
    }
    label{
      font-size: 1.4rem;
      color: #1A1A1A;
      line-height: 4rem;
      display: block
    }
  }
  .mint-popup{
    padding:0 1rem;
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
  .btn-block{
    background-color: #2DC87D;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 5rem;
    color: #fff;
    border: none;
    outline: none;
    font-size: 1.4rem
  }



</style>