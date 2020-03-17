<template>
	<view class="food-detail-container">
		<view class="detail-header u-f u-f-ac">
			<view class="img u-f-ac">
				<image :src="food.img" lazy-load></image>
			</view>
			<view class="u-f1">
				<view class="name">{{food.name}}</view>
				<view class="energy">
					<text class="uni-h3">{{food.heat}}千卡</text>/每100克
				</view>
			</view>

		</view>
		<view class="detail-middle">
			<view class="middle-th u-f">
				<view class="u-f1 u-f-ajc">营养元素</view>
				<view class="u-f1 u-f-ajc">每100克</view>
				<view class="u-f1 u-f-ajc">备注</view>
			</view>
			<view class="middle-col u-f">
				<view class="u-f1 u-f-ajc">热量</view>
				<view class="u-f1 u-f-ajc">{{food.heat}}千卡</view>
				<view class="u-f1 u-f-ajc">低热量</view>
			</view>
			<view class="middle-col u-f">
				<view class="u-f1 u-f-ajc">蛋白质</view>
				<view class="u-f1 u-f-ajc">{{food.protein}}g</view>
				<view class="u-f1 u-f-ajc">低蛋白</view>
			</view>
			<view class="middle-col u-f">
				<view class="u-f1 u-f-ajc">碳水</view>
				<view class="u-f1 u-f-ajc">{{food.carbs}}g</view>
				<view class="u-f1 u-f-ajc">低碳水</view>
			</view>
			<view class="middle-col u-f">
				<view class="u-f1 u-f-ajc">脂肪</view>
				<view class="u-f1 u-f-ajc">{{food.fat}}g</view>
				<view class="u-f1 u-f-ajc">低脂肪</view>
			</view>
			<view class="middle-col u-f">
				<view class="u-f1 u-f-ajc">纤维素</view>
				<view class="u-f1 u-f-ajc">{{food.fibrin}}g</view>
				<view class="u-f1 u-f-ajc">低纤维素</view>
			</view>
		</view>
		<view class="detail-footer">
			<view>食物红绿灯:</view>
			<view class="u-f">
				<view class="foot-advise u-f-ajc"><view class="icon iconfont icon-yuan u-f-ac"></view><view class="u-f-ac">推荐</view></view>
				<view class="u-f1">{{food.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				food: {
					name: '',
					img: '',
					info: [{}]
				}
			}
		},
		onLoad(e) {
			this.food = JSON.parse(e.itemData || "{}")
			uni.setNavigationBarTitle({
				title: this.food.name || ''
			});
		},
		methods: {

		}
	}
</script>

<style sccoped>
	.food-detail-container {
		width: 100%;
		background-color: #F4F4F4;
		color: #3A3A3A;
	}

	/* 头部 */
	.detail-header {
		height: 200upx;
		padding: 0 30upx;
		background-color: #FFFFFF;
		border-top: 2upx solid #ccc;
	}

	.detail-header .img {
		margin-right: 30upx;

	}

	.img image {
		width: 150upx;
		height: 150upx;
		border-radius: 100%;
	}

	.detail-header .energy {
		letter-spacing: 2upx;
	}

	/* 中部表格 */
	.detail-middle,
	.detail-footer {
		margin-top: 30upx;
		padding: 20upx 30upx;
		background-color: #FFFFFF;
	}

	.middle-th,
	.middle-col {
		height: 100upx;
		border-bottom: 2upx solid #F1F1F1;
	}

	.middle-th {
		color: #A1A1A1;
	}

	.middle-col view:last-child {
		color: #F5737D;
	}
	/* 尾部 */
	.foot-advise{
		color:#09BB07;
		width: 100upx;
		padding-right: 30upx;
	}
	.foot-advise .icon{
		margin-right: 6upx;
	}
</style>
