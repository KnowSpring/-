import Vue from 'vue'
import Vuex from 'vuex'
const vue = new Vue()
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		userinfo:{
			password: false,
			email:''
		},
		article:{},//存储文章数据
		token: false, //判断是否登录
		seventeat:[],//7天
		sevensport:[],
		daymeals:[], //一天每餐
		daysports:[]//一天的每次
	},
	mutations:{
		changeUserinfo(state,context){
			console.log(context)
			Object.assign(state.userinfo,context)
			// state.userinfo[context.key]= context.value;
		},
		changeArticleContent(state,context){
			Object.assign(state.article,context)
		}
	},
	actions:{
		changeGuanzhu(){
			console.log(vue.$store.state.token)
			
		}
	}
})
export default store