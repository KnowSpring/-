<template>
	<view class="my-container">
		<template v-if="!islogin">
			<!-- 未登录 -->
			<view class="u-f-ajc my-title">登陆健身美食，体验更多功能</view>
<!-- 			第三方登录
			<other-login></other-login> -->
			<!-- 账号密码登录 -->
			<view class="u-f-ajc" @tap="passwordLogin">
				账户密码登录<view class="icon iconfont icon-arrow-right"></view>
			</view>
		</template>
		<template v-else>
			<!-- 登陆 -->
			<my-info :myinfo="myinfo" ></my-info>
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
	// import otherLogin from "../../components/my/other-login.vue";

	export default {
		data() {
			return {
				islogin: false,//默认要为false
				myinfo: {
					userpic: "../../static/userpic/1.jpg",
					username: "昵称",
					baseconsume: 0,
					baseprotein: 0,
				},
				list: [{
						icon: "add-cart",
						name: "身体数据",
						clicktype: "",
						url: "",
					},
					{
						icon: "xihuan",
						name: "我的收藏",
						clicktype: "navigateTo",
						url: "../../pages/user-collect/user-collect"
					},
					{
						icon: "mubiao",
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
						icon: "guanzhu",
						name: "关注列表",
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
		onShow() {
			this.isLogin()
		},
		components: {
			myInfo,
			myListItem,
			// otherLogin,
		},
		methods: {
			// 密码登陆
			passwordLogin() {
				uni.navigateTo({
					url:'../login/login'
				})
			},
			isLogin(){
				if(this.$store.state.token){
					this.islogin = true;
					// 小坑 数据问题
					console.log(this.$store.state.userinfo)
					console.log(this.myinfo)
					let {userpic,username,baseconsume,baseprotein}= this.$store.state.userinfo
					this.myinfo ={
							userpic,
							username,
							baseconsume,
							baseprotein
						}
					
					console.log(this.myinfo)
					return;
				}
				this.islogin = false;
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
