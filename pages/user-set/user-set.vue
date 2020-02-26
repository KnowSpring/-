<template>
	<view class="body">
		<block v-for="(item,index) in list" :key="index">
			<my-list-item :item="item"
			:index="index"></my-list-item>
		</block>
		<button class="user-set-btn" type="primary">退出登陆</button>
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
				list:[
					{ icon:"",name:"账号与安全",clicktype:"navigateTo",url:"../../pages/user-set-repassword/user-set-repassword"},
					{ icon:"",name:"绑定邮箱",clicktype:"navigateTo",url:"../../pages/user-set-email/user-set-email"},
					{ icon:"",name:"资料编辑" ,clicktype:"navigateTo",url:"../../pages/user-set-userinfo/user-set-userinfo"},
					{ icon:"",name:"小纸条" ,clicktype:"",url:""},
					{ icon:"",name:"清除缓存",clicktype:"clear",url:""},
					{ icon:"",name:"意见反馈",clicktype:"navigateTo",url:"../../pages/user-set-help/user-set-help"},
					{ icon:"",name:"关于健康美食",clicktype:"navigateTo",url:"../../pages/user-set-about/user-set-about"  }
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import "../../common/form.css";
</style>
