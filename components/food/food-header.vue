<template>
	<view class="body">
		<view class="u-f u-f-ac detail-header ">
			<view class="img u-f-ac">
				<image :src="food.img" lazy-load></image>
			</view>
			<view class="u-f1">
				<view>{{food.name}}</view>
				<view class="energy">
					<text class="red">103</text>千卡/每100克
				</view>
			</view>
			<view class="u-f-ac" :class="food.type === 1?'green':food.type === 2?'orange':'red'"><view class="icon iconfont icon-yuan u-f-ac"></view></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			searchItem: Object
		},
		data() {
			return {
				food: this.searchItem
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.body{
		background-color: #F4F4F4;
	}
	.detail-header {
		height: 200upx;
		padding: 0 30upx;
		border-bottom: 2upx solid #ccc;
	}

	 .img {
		margin-right: 30upx;

	}

	.img image {
		width: 150upx;
		height: 150upx;
		border-radius: 100%;
	}

	 .energy {
		letter-spacing: 2upx;
	}
	.red{
		color:#F01414;
	}
	.green{
		color:#09BB07;
		
	}
	.orange{
		color:#F0AD4E;
	}
</style>
