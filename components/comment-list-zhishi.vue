<template>
	<view class="comment-list-zhishi u-f"  @tap="intoZhishi">
		<view class="comment-list-zhishi-l u-f1 u-f u-f-jsb u-f-column">
			<view>{{item.content}}</view>
			<view class="u-f-ac u-f-jsb l-bottom">
				<view>{{item.username}}</view>
				<view class="u-f-ac readnum">
					<view class="iconfont icon-add-cart"></view>{{item.readnum}}
				</view>
			</view>
		</view>
		<view class="comment-list-zhishi-r">
			<image :src="item.titlepic" mode="widthFix"></image>
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

			}
		},
		methods: {
			// 进入详情页
			intoZhishi(){
				uni.navigateTo({
					url:'../comment-article/comment-article'
				})
				},
		}
	}
</script>

<style scoped>
	.comment-list-zhishi {
		margin-top: 20upx;
		padding: 30upx;
		background-color: #FFFFFF;
	}

	.comment-list-zhishi-l .l-bottom {
		color: #898989;
	}

	.comment-list-zhishi-l .readnum {
		margin-right: 60upx;
	}

	.comment-list-zhishi-r {
		width: 30%;
		margin-left: 60upx;
	}

	.comment-list-zhishi-r image {
		width: 100%;
	}
</style>
