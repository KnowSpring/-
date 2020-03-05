<template>
	<view class="my-info u-f-ac" @tap="ToUserSpace">
		<image :src="myinfo.userpic" mode="widthFix" lazy-load></image>
		<view class="u-f1">
			<view>{{myinfo.username}}</view>
			<view>基础代谢 {{myinfo.baseconsume}} 基础蛋白 {{myinfo.baseprotein}}</view>
		</view>
		<view class="icon iconfont icon-arrow-right"></view>
	</view>
</template>

<script>
	export default {
		props: {
			myinfo: Object
		},
		methods: {
			ToUserSpace() {
				uni.navigateTo({
					url: '../../pages/user-space/user-space?user_id=' + this.$store.state.userinfo.currentid

				});

			}
		}
	}
</script>

<style>
	.my-info {
		padding: 20upx 40upx;
	}

	.my-info>image {
		flex-shrink: 0;
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		margin-right: 15upx;
	}

	.my-info>view:first-of-type>view:first-child {
		font-size: 32upx;
	}

	.my-info>view:first-of-type>view:last-child {
		color: #BBBBBB;
	}

	.my-info>view:last-of-type {
		height: 100%;
	}
</style>
