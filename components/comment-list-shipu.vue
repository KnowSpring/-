<template>
	<view class="comment-list-shipu">
		<image :src="item.titlepic"></image>
		<view class="shipu-name ">{{item.title}}"</view>
		<view class="u-f-ac u-f-jsb shipu-bottom">
			<view class="userinfo u-f-ac">
				<image :src="item.userpic"></image>{{item.username}}
			</view>
			<view class="u-f-ac">
				<view class="icon iconfont icon-good-fill"></view>{{item.goodnum}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {}
		},
		methods: {


		}

	}
</script>

<style scoped>
	.comment-list-shipu {
		width: 363upx;
		padding: 0 4upx;
		margin-top: 20upx;
		box-shadow: 0 2upx 6upx rgba(0, 0, 0, 0.3);
		background-color: #FFFFFF;
		color: #898989;

	}

	.comment-list-shipu image {
		width: 100%;
	}

	.shipu-bottom {
		padding: 10upx 0;
	}

	.shipu-name {
		width: 100%;
		border-bottom: 2upx solid #ccc;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.userinfo image {
		width: 85upx;
		height: 85upx;
		border-radius: 100%;
		margin-right: 10upx;
	}
</style>
