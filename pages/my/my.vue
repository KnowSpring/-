<template>
	<view class="my-container">
		<template v-if="!islogin">
			<!-- 未登录 -->
			<view class="u-f-ajc my-title">登陆健身美食，体验更多功能</view>
			<!-- 第三方登录 -->
			<other-login></other-login>
			<!-- 账号密码登录 -->
			<view class="u-f-ajc" @tap="passwordLogin">
				账户密码登录<view class="icon iconfont icon-arrow-right"></view>
			</view>
		</template>
		<template v-else>
			<!-- 登陆 -->
			<my-info :myinfo="myinfo"></my-info>
		</template>
		<!-- 功能列表 -->
		<view class="my-list">
			<block v-for="(item,index) in list" :key="index">
				<!-- 可以分登录，未登录 -->
				<my-list-item :item="item" :index="index"></my-list-item>
			</block>
		</view>
	</view>
</template>

<script>
	import myInfo from '../../components/my/my-info.vue';
	import myListItem from "../../components/my/my-list-item.vue";
	import otherLogin from "../../components/my/other-login.vue";

	export default {
		data() {
			return {
				islogin: true,//默认要为false
				myinfo: {
					userpic: "../../static/userpic/1.jpg",
					username: "昵称",
					totalget: 0,
					totallost: 0,
				},
				list: [{
						icon: "add-cart",
						name: "身体数据",
						clicktype: "",
						url: "",
					},
					{
						icon: "add-cart",
						name: "我的收藏",
						clicktype: "",
						url: ""
					},
					{
						icon: "add-cart",
						name: "我的目标",
						clicktype: "",
						url: ""
					},
					{
						icon: "add-cart",
						name: "浏览记录",
						clicktype: "",
						url: ""
					},
					{
						icon: "add-cart",
						name: "小纸条",
						clicktype: "navigateTo",
						url: "../../pages/paper/paper"
					}
				]
			}

		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateTo({
					url: '../user-set/user-set'
				})
			}
		},
		components: {
			myInfo,
			myListItem,
			otherLogin,
		},
		methods: {
			// 密码登陆
			passwordLogin() {
				uni.navigateTo({
					url:'../login/login'
				})
			}

		}
	}
</script>

<style>
	.my-title {
		padding: 20upx 0;
	}

	.my-container {
		width: 100%;
	}

	.my-list {
		padding: 20upx;
	}
</style>
