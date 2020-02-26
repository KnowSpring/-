<template>
	<view class="other-login u-f-ac">
		<block v-for="(item) in providerList" :key="item.id">
			<view class="u-f-ajc u-f1" @tap="tologin(item)">
				<view class="icon iconfont u-f-ajc" :class="['icon-'+item.icon]"></view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				providerList: []
			}
			
		},
		created() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let iconName = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								iconName = 'weixin'
								break;
							case 'qq':
								providerName = 'QQ登录'
								iconName = 'QQ'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								iconName = 'weibo'
								break;
						}
						return {
							name: providerName,
							id: value,
							icon:iconName
						}
					});
					console.log('JSON.stringify(this.providerList)')
					console.log(JSON.stringify(this.providerList))
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
			
		},
		methods:{
			// 点击登录
			tologin(provider) {
				uni.login({
					provider: provider.id,
			        // #ifdef MP-ALIPAY
			        scopes: 'auth_user',  //支付宝小程序需设置授权类型
			        // #endif
					success: (res) => {
						console.log('login success:', res);
						// 更新保存在 store 中的登录状态
						// this.login(provider.id);
						console.log('登录成功，保存本地存储，改变当前用户登录状态')
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			}
		}
		
	}
</script>

<style>
	.other-login {
		padding: 20upx 80upx;
	}

	.other-login>view>view {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		font-size: 55upx;
		color: #FFFFFF;
	}

	.other-login .icon-QQ {
		background: #2CAEFC;
	}

	.other-login .icon-weixin {
		background: #2BD19B;
	}

	.other-login .icon-weibo {
		background: #FC7729;
	}
</style>
