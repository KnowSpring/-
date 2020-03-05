import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	    // myinfo = {
	    //   currentid: id,
	    //   phone: phone,
	    //   username: phone,
	    //   userpic:
	    //     'http://img.gos68.com/uploads/20190621/16/1561104187-PSOwyklHuQ.jpeg',
	    //   email: ''
		// user_id, age, sex, weight, job, path, birthday, baseconsume, sportconsume, baseprotein, sportprotein
	    // }
	state:{
		userinfo:{
			password: false,
			email:''
		},
		token: false, //判断是否登录
		daymeal:0,//一天吃的总量
		dayconsume:0//一天消耗的总量
	},
	mutations:{
		changeUserinfo(state,context){
			console.log(context)
			state.userinfo[context.key]= context.value;
		}
	}
})
export default store