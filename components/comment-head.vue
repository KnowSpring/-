<template>
	<view>
		<!-- tab分类 -->
		<scroll-view class="uni-swiper-tab" scroll-x>
			<block v-for="(tab,index) in tabBars" :key="tab.id">
				<view class="swiper-tab-list" :class="{'active': tabIndex === index}" @tap="changeTabIndex(index)">{{tab.name}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		props: {
			tabIndex: Number,
			tabBars: Array
		},
		data() {
			return {

			};
		},

		methods: {
			changeTabIndex(index) {
				this.$emit('changeTabIndex', index)
			}
		}
	}
</script>

<style scoped>
	.uni-swiper-tab {
		border-bottom: 1upx solid #eee;
	}

	.swiper-tab-list {
		color: #969696;
		font-weight: bold;
	}

	.uni-swiper-tab .active {
		color: #343434;
	}

	/* 激活才有小蓝线 */
	.active .swiper-tab-line {
		border-bottom: 6upx solid #007AFF;
		border-radius: 20upx;
		margin: auto;
		width: 70upx;
	}
</style>
