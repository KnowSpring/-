<template>
	<view class="consume-container">
		<!-- 		基础代谢所需热量，平时需求蛋白质，（卡片式的表格）
		健身时所需蛋白质，碳水，脂肪 -->
		<view class="consume-base">
			<view class="u-f-ac consume-title">个人所需参考 <view class="icon iconfont icon-wenhao" @tap="intoUserHelp"></view>
			</view>
			<view class="consume-list">
				<view class="u-f consume-list-item">
					<view class="u-f1"></view>
					<view class="u-f1 u-f-ajc">热量/Kcal</view>
					<view class="u-f1 u-f-ajc">蛋白质/g</view>
				</view>
				<view class="u-f consume-list-item">
					<view class="u-f1 u-f-ajc">基础代谢</view>
					<view class="u-f1 u-f-ajc">111</view>
					<view class="u-f1 u-f-ajc">11</view>
				</view>
				<view class="u-f consume-list-item">
					<view class="u-f1 u-f-ajc">健身所需</view>
					<view class="u-f1 u-f-ajc">111</view>
					<view class="u-f1 u-f-ajc">11</view>
				</view>
			</view>
		</view>

		<!-- 记录热量，蛋白质（薄荷)还可以吃？(进度条) -->
		<view class="consume-day">
			<view class="u-f-ac consume-title">
				<view class="icon iconfont icon-zongfen"></view>一天饮食记录
			</view>
			<view class="consume-list">
				<view class="consume-list-item u-f u-f-ac">
					<view class="u-f1">热量：11</view>
					<view class="u-f1">蛋白质：11</view>
					<view class="u-f1">碳水：11</view>
				</view>
				<view class="consume-list-item u-f u-f-ac">
					<view class="u-f1">脂肪：11</view>
					<view class="u-f1">膳食纤维：11</view>
					<view class="u-f1">维生素：11</view>
				</view>
			</view>

		</view>
		<view class="consume-curve">
			<!-- 记录一个星期所吃的热量，蛋白质，碳水，脂肪 （曲线）-->
			<uchart-line></uchart-line>
		</view>
		<view>
			<view class="consume-sport">
				<view class="u-f u-f-jsb consume-title">
					<view class="u-f-ac"><view class="icon iconfont icon-zongfen"></view>运动消耗</view>
					<view class="u-f-ac" @tap="intoSport">运动参考<view class="icon iconfont icon-arrow-right"></view></view>
				</view>
				<view class="u-f-ajc">消耗量：???</view>
			</view>
		</view>
		<!-- （只能大概）运动参考（这里显示总的消耗热量）跳转运动页（参考资料修改和薄荷常见运动）总的运动消耗（固定） -->
	</view>
</template>

<script>
	import uchartLine from '../../components/uchart-line.vue';
	export default {
		components: {
			uchartLine
		},
		data() {
			return {
				// 提示超标
			}
		},
		watch: {

		},
		methods: {
			// 进入意见反馈页
			intoUserHelp() {
				uni.navigateTo({
					url: '../user-set-help/user-set-help'
				});
			},
			// 进入运动页
			intoSport(){
				uni.navigateTo({
					url: '../consume-sport/consume-sport'
				});
			}	
		}
	}
</script>

<style scoped>
	.consume-container {
		width: 100%;
		background-color: #F4F4F4;
	}

	.consume-base,
	.consume-day,
	.consume-curve,
	.consume-sport {
		margin: 30upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		box-shadow: 0 2upx 4upx 0upx;
	}

	.consume-base {
		height: 360upx;
	}

	.consume-title {
		padding: 30upx 30upx 0 30upx;
		font-weight: 700;
	}

	.consume-list {
		margin: 0 30upx;
	}

	.consume-list-item {
		border-bottom: 2upx dashed #CCCCCC;
		height: 80upx;
	}

	/* 进度条 记录一天需求 */
	.consume-day .consume-list-item:last-child {
		border-bottom: none;

	}
</style>
