import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    get UserToken(){
      return localStorage.getItem("currentUser_token");
    },
    get UserId(){
      return localStorage.getItem("currentUser_id");
    }
  },
  mutations: {
    SET_USER(state,{user_token,user_id}){
      sessionStorage.setItem("currentUser_token",user_token);
      sessionStorage.setItem("currentUser_id",user_id);
    },
    // 更新主题颜色
    setThemeColor (state, curcolor) {
      this.state.themecolor = curcolor
    }
  }
})
export default store