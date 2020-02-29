<template>
	<view class="body">
		<view>
			<block v-for="(item,index) in list" :key="index">
				<my-list-item :item="item"
				:index="index" @updateuserbind='__init()' ></my-list-item>
			</block>
		</view>
	</view>
</template>

<script>
	import myListItem from "../../components/my/my-list-item.vue";
	export default {
		components:{
			myListItem
		},
		data() {
			return {
				list:[]
			}
		},
		onShow(){
			this.__init();
		},
		methods: {
			async __init(){
				// 获取当前用户绑定情况
				// data设置全局的值vuex this.User.userinfo.password是否空控制
				this.list = [
					{ icon:"",name:"设置密码",clicktype:"navigateTo",url:"../../pages/user-set-password/user-set-password",data:'已设置' || "未设置"},
					{ icon:"",name:"修改密码",clicktype:"navigateTo",url:"../../pages/user-set-repassword/user-set-repassword",data:'' || "修改密码"},
					{ icon:"",name:"邮箱绑定",clicktype:"navigateTo",url:"../../pages/user-set-email/user-set-email",data:'已绑定' || "未绑定"}
					
				]
			}
		}
	}
</script>

<style>
	.body{
		width: 100%;
	}
@import "../../common/form.css";
</style>
