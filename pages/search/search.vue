<template>
	<view class="search-contaner">
		<view v-show="false">
			<view class="search-recent">最近搜索</view>
			<view class="search-list u-f">
				<view class="icon iconfont icon-zuijinsousuo u-f-ac"></view>
				<view class="u-f-ac">鸡蛋</view>
			</view>
			<view class="search-list u-f">
				<view class="icon iconfont icon-zuijinsousuo u-f-ac"></view>
				<view class="u-f-ac">鸡蛋</view>
			</view>
			<view class="search-list clear u-f-ajc">
				<view class="icon iconfont icon-lajitong"></view>
				<view class="u-f">清空历史记录</view>
			</view>

		</view>
		<view class="advise-container">
			<scroll-view scroll-y>
				<block v-if="checked" v-for="(item,index) in adviseList" :key="index">
					<food-header :searchItem="item"></food-header>
				</block>
				<block v-if="!checked" v-for="(item,index) in searchList" :key="index">
					<food-header :searchItem="item"></food-header>
				</block>
				<!-- 固定栏 -->
				<view class="advise-fixed u-f-ac">
					<checkbox-group @change="adviseFood">
						<label class="red">
							<checkbox color="#F01414" :checked="checked" />推荐食物</label>
					</checkbox-group>
				</view>
			</scroll-view>
		</view>
	</view>
	</view>
</template>

<script>
	import foodHeader from '../../components/food/food-header.vue'

	export default {
		data() {
			return {
				checked: false,
				adviseList: [],
				searchVale: "",
				searchList: [{
						"name": "小米粥",
						"price": 9.8,
						"oldPrice": "",
						"description": "食材：小米",
						"sellCount": 239,
						"img": '../../static/xiaomi.jpg',
						"type": 1
					},
					{
						"name": "小米粥",
						"price": 9.8,
						"oldPrice": "",
						"description": "食材：小米",
						"sellCount": 239,
						"img": '../../static/xiaomi.jpg',
						"type": 2
					},
				]

			}
		},
		onLoad() {
			// this.adviseList = this.searchList.filter((item) => {
			// 	return item.type === 1;
			// })
		},
		components: {
			foodHeader
		},
		watch: {
			searchList: {
				immediate: true,
				handler: function() {
					this.adviseList = this.searchList.filter((item) => {
						return item.type === 1;
					})
				}

			}
		},
		// 搜索框改变事件
		onNavigationBarSearchInputChanged(e) {
			this.searchVale = e.text
		},
		// onNavigationBarSearchInputConfirmed(){}
		// 点击搜索按钮事件
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				console.log('发送搜索:' + this.searchVale)
			}
		},

		methods: {
			adviseFood() {
				this.checked = !this.checked;
			}
		}
	}
</script>

<style scoped>
	.search-contaner {
		width: 100%;
		background-color: #F4F4F4;
	}

	/* 最近搜索 */
	.search-recent {
		color: #7A7A7A;
		padding: 50upx 0 20upx 30upx;
	}

	.search-list {
		height: 100upx;
		padding: 0 30upx;
		background-color: #FFFFFF;
		border-bottom: 2upx solid #F1F1F1;
	}

	.search-list .icon {
		font-size: 34upx;
		margin-right: 20upx;
		padding-top: 6upx;
		color: #999999;
	}

	.search-list.clear {
		color: #999999;
	}

	/* 建议列 */
	.advise-container {
		margin-top: 80upx;
	}

	.red {
		color: #F01414;
	}

	/* 固定行 */
	.advise-fixed {
		height: 80upx;
		padding: 0 30upx;
		background-color: #FFFFFF;
		border-top: 2upx solid #CCCCCC;
		border-bottom: 2upx solid #CCCCCC;
		position: fixed;
		top: 90upx;
		left: 0;
		right: 0;
	}
</style>
