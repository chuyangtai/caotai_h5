<template>
  <div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <button class="select-btn" @click="select">选择</button>
      <mt-picker :slots="slots" value-key="name" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <form class="sign-service" name="sign-service" enctype="multipart/form-data" method="post">
      <mt-field :label=label.text :placeholder="label.placeholder" v-model="info.companyName"></mt-field>
      <mt-field label="联系人" placeholder="请输入姓名" v-model="info.contact"></mt-field>
      <mt-field label="电话" placeholder="请输入手机号码" type="tel" v-model="info.telephone"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号码" type="tel" v-model="info.phone"></mt-field>
      <mt-field @click.native="showPopup" label="省市区" placeholder="请选择省市区" v-model="addText" readonly="readonly">
        <img src="../assets/img/ct_hsxy_icon.png" class="icon-right">
      </mt-field>
      <div class="form-group">
        <label for="addressDetail">详细地址</label>
        <textarea name="" id="addressDetail" placeholder="请填写详细地址" v-model="info.addressDetail"></textarea>
      </div>
    </form>
    <form class="sign-service">
      <div class="form-group mt5">
        <label for="profile">简介</label>
        <textarea name="" id="profile" placeholder="请填写简介说明" v-model="info.profile"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
  import { Toast,Popup,Picker } from "mint-ui";
  import address from '@/assets/address.json'
  import {applyForService} from '@/api/sign'
  export default {
    props:['type'],
    name: 'sign-form',
    data () {
      return {
        info:{
          addressDetail:'',
          companyName:'',
          contact:'',
          phone:'',
          telephone:'',
          profile:'',
          province:'',
          cityCode:'',
          district:''
        },
        popupVisible:false,
        temporary:{
          provinceText:'',
          cityText:'',
          townText:'',
          addText:'',
          province:'',
          cityCode:'',
          district:''
        },
        addText:'',
        provinceText:'',
        cityText:'',
        townText:'',
        slots: [
          {
            flex: 1,
            values: address,
            className: 'slot1',
            textAlign: 'left'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values:address[0].cities,
            className: 'slot3',
            textAlign: 'left'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values:address[0].cities[0].towns,
            className: 'slot5',
            textAlign: 'left'
          }
        ]
      }
    },
    computed:{
      label(){
        var label={
          text:this.type,
          placeholder:'请填写'+this.type
        }
        return label;
      }
    },
    mounted(){
      //console.log(address)
    },
    methods:{
      select(){
        this.addText= this.temporary.addText;
        this.provinceText=this.temporary.provinceText;
        this.cityText=this.temporary.cityText;
        this.townText=this.temporary.townText;
        this.info.province=this.temporary.province;
        this.info.cityCode=this.temporary.cityCode;
        this.info.district=this.temporary.district;
        this.popupVisible=false;
      },
      showPopup(){
        this.popupVisible=true;
      },
      onValuesChange(picker, values) {
        if(!values[0]){
          this.$nextTick(()=>{
            if(this.myAdress){
              // 赋默认值
            }else{
              picker.setValues([address[0],address[0].cities[0],address[0].cities[0].towns[0]])
            }
          });
        }else{
          picker.setSlotValues(1, values[0].cities);
          let town = [];
          if(values[1]){
            town = values[1].towns;
          }
          picker.setSlotValues(2,town);
        }
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
        /*显示*/
        this.temporary.provinceText=values[0].name;
        this.temporary.cityText=values[1].name;
        this.temporary.townText=values[2].name;
        this.temporary.addText=values[0].name+'-'+values[1].name+'-'+values[2].name;
        /*编码*/
        this.temporary.province=values[0].id;
        this.temporary.cityCode=values[1].id;
        this.temporary.district=values[2].id;
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