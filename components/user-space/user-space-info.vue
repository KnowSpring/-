<template>
	<view class="user-space-userinfo">
		<view class="user-space-userinfo-item">
			<view>账号信息</view>
			<view>账号年龄：{{getRegAge}}</view>
			<view>账号ID：{{userinfo.user_id}}</view>
		</view>
		<view class="user-space-userinfo-item">
			<view>个人信息</view>
			<view>体重：{{userinfo.weight}} kg</view>
			<view>星座：{{getXingZuo}}</view>
			<view>职业：{{userinfo.job}}</view>
			<view>故乡：{{userinfo.path}}</view>
		</view>
	</view>
</template>

<script>
	import t from "../../common/js/time.js";
	export default {
		props:{
			userinfo:Object
		},
		created(){
			console.log(this.userinfo)
		},
		computed:{
			getRegAge(){
				return t.gettime.sumAge(this.userinfo.regtime) || 0
			},
			getXingZuo(){
				return t.gettime.getHoroscope(this.userinfo.birthday) || '未知'
			}
		}
	}
</script>

<style scoped>
.user-space-userinfo{
	padding: 0 30upx;
}
.user-space-userinfo-item{
	padding: 20upx 0;
	border-bottom: 1upx solid #EEEEEE;
}
.user-space-userinfo-item>view{
	color: #AAAAAA;
}
.user-space-userinfo-item>view:first-child{
	color: #333333;
	font-size: 35upx;
	padding: 15upx 0;
}
</style>
