<template>
	<view class="comment-list-pingce-container">
		<view class="comment-list-pingce u-f-ajc animated fadeIn fast">
			<image :src="item.titlepic" mode="widthFix"></image>
			<view class="u-f-ac u-f-jsb u-f-column">
				<view class="username">/ {{item.username}} /</view>
				<view class="title">{{item.title}}</view>
				<view class="u-f-ac read">
					<view class="iconfont icon-add-cart u-f-ajc "></view>{{item.readnum}}阅读
				</view>
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
			return {
				num: this.item.readnum
			}

		}
	}
</script>

<style scoped>
	.comment-list-pingce {
		position: relative;
		margin-top: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
		color: #fff;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.3);
		border-radius: 20upx;
		overflow: hidden;
	}

	.comment-list-pingce image {
		width: 100%;

	}

	.comment-list-pingce>view {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 99;
	}

	.comment-list-pingce>view .username {
		margin-top: 40upx;
	}

	.comment-list-pingce>view .title {
		font-size: 32upx;
		font-weight: bold;
	}

	.comment-list-pingce>view .read {
		margin-bottom: 40upx;
	}
</style>
