<template>
	<view>
		<view class="category-wrapper u-f" v-if="goods.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
				<view class="left-content">
					<view class="title-content u-f-ajc" :class="{'onSelected':select_index === index}" v-for="(item,index) in goods"
					 :key="index" @tap="choose(index)">
						<view class="text">
							<!-- <image class="icon" :src="item.icon" v-if="item.icon"></image> -->
							{{item.name}}
						</view>
						<text class="allcount u-f-ajc" v-if="getAllCount>=item.count&&item.count>0">{{item.count}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- 右边内容-->
			<scroll-view scroll-y="true" class="u-f1" scroll-with-animation="true" :scroll-top="right_scroll" @scroll="myscroll">

				<view class="right-content">
					<!-- 产品区 -->
					<view ref="foodList" class="category-item" v-for="(item, i) in goods" :key="i">

						<view class="food-title">
							{{item.name}}
						</view>
						<view class="food u-f" v-for="(food, index) in item.foods" :key="index" @tap="openDetail(food)">
							<image :src="food.img" mode="" style="width: 75px;height: 75px;margin-top: 6px;"></image>
							<view class="food-info u-f">
								<text>{{food.name}}</text>
								<text>{{food.description}}</text>
								<text>月售{{food.sellCount}}</text>

								<!-- 加减 -->
								<view class="u-f u-f-jsb">
									<text class="food-price">￥{{food.price}}</text>
									<cartcontrol :food="food" @add="addCart" @dec="decreaseCart"></cartcontrol>

								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<shopcart :goods="goods" @add="addCart" @dec="decreaseCart" @delAll="delAll"></shopcart>
		</view>
	</view>
</template>

<script>
	import shopcart from '@/components/shopcart.vue';
	import cartcontrol from '@/components/cartcontrol.vue';
	import Vue from 'vue';
	export default {
		data() {
			return {
				windows_height: 0, //屏幕高度
				goods: [{
						"name": "热销",
						"foods": [{

								"name": "南瓜粥",
								"price": 9.22,
								"oldPrice": "",
								"description": "食材：大米，南瓜",
								"sellCount": 229,
								"img": '../../static/nanguaz.jpg'

							}, {
								"name": "小米粥",
								"price": 9.8,
								"oldPrice": "",
								"description": "食材：小米",
								"sellCount": 239,
								"img": '../../static/xiaomi.jpg'

							},
							{
								"name": "油条",
								"price": 1.88,
								"oldPrice": "",
								"description": "食材：油条",
								"sellCount": 229,
								"img": '../../static/youtiao.jpg'

							}
						]
					},
					{
						"name": "折扣",
						"foods": [{
							"name": "油条1只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "套餐",
						"foods": [{
							"name": "油条2只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥2",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "套餐2",
						"foods": [{
							"name": "油条3只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥3",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "热销2",
						"foods": [{
							"name": "南瓜粥1",
							"price": 9.22,
							"oldPrice": "",
							"description": "食材：大米，南瓜",
							"sellCount": 229,
							"img": '../../static/nanguaz.jpg'

						}, {
							"name": "小米粥1",
							"price": 9.8,
							"oldPrice": "",
							"description": "食材：小米",
							"sellCount": 239,
							"img": '../../static/xiaomi.jpg'

						}]
					},
					{
						"name": "折扣2",
						"foods": [{
							"name": "油条4只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥4",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "套餐3",
						"foods": [{
							"name": "油条5只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥5",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "套餐4",
						"foods": [{
							"name": "油条6只",
							"price": 1.81,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥6",
							"price": 9.91,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "热销3",
						"foods": [{
							"name": "南瓜粥3",
							"price": 9.21,
							"oldPrice": "",
							"description": "食材：大米，南瓜",
							"sellCount": 229,
							"img": '../../static/nanguaz.jpg'

						}, {
							"name": "小米粥3",
							"price": 9.78,
							"oldPrice": "",
							"description": "食材：小米",
							"sellCount": 239,
							"img": '../../static/xiaomi.jpg'

						}]
					},
					{
						"name": "折扣3",
						"foods": [{
							"name": "油条7只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥7",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "套餐6",
						"foods": [{
							"name": "油条8只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥8",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "套餐7",
						"foods": [{
							"name": "油条9只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥9",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},
					{
						"name": "热销4",
						"foods": [{
							"name": "南瓜粥4",
							"price": 9.22,
							"oldPrice": "",
							"description": "食材：大米，南瓜",
							"sellCount": 229,
							"img": '../../static/nanguaz.jpg'

						}, {
							"name": "小米粥4",
							"price": 9.8,
							"oldPrice": "",
							"description": "食材：小米",
							"sellCount": 239,
							"img": '../../static/xiaomi.jpg'

						}]
					},
					{
						"name": "折扣4",
						"foods": [{
							"name": "油条10只",
							"price": 1.88,
							"oldPrice": "",
							"description": "食材：油条",
							"sellCount": 229,
							"img": '../../static/youtiao.jpg'

						}, {
							"name": "艇仔粥10",
							"price": 9.9,
							"oldPrice": "",
							"description": "食材：瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/tingzaiz.jpg'

						}],

					},

				],
				select_index: 0,
				right_height: [], //右侧每个内容的高度集合
				right_scroll: 0, //右侧的滑动值
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				last: 0,
			}
		},
		components: {
			shopcart,
			cartcontrol
		},
		// 监听原生搜索输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
		
			})
		},
		computed: {
			getList() {
				let result = [];
				this.goods.forEach((good) => {

					good.foods.forEach((food) => {

						if (food.count) {
							result.push(food)
						}
					})
				})
				// console.log('result', result);
				return result

			},
			// 获得购物车所有商品数量
			getAllCount: function(item) {
				// console.log('item', item)
				let result = [];
				let count = 0;

				for (let i = 0; i < this.goods.length; i++) {
					count = 0;
					this.goods[i].foods.forEach((food) => {

						// console.log('food',food);
						if (food.count >= 0) {
							count += food.count
							Vue.set(this.goods[i], 'count', count)
						}
					})
					// console.log('result', count);
					result.push(count)
				}

				result.sort(function(a, b) {
					return a - b;
				})
				count = result[result.length - 1]
				// console.log('result', count);
				return count;
			},

		},

		onLoad() {
			this.init();
			this.windows_height = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.getHeightList();
				})

			},
			// 进入详情页
			openDetail(food){
			  uni.navigateTo({
			  	 url: "../food-detail/food-detail?itemData="+JSON.stringify(food)
			  })
			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery();
				selectorQuery.select('.left-content').boundingClientRect(function(rects) {
					_this.left_height = rects.height;
				});
				selectorQuery.selectAll('.category-item').boundingClientRect(function(rects) {
					_this.right_height = rects.map((item) => item.top);
					console.log(_this.right_height)
				}).exec();
			},
			choose(index) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				// 加入防抖
				if (this.timeout) {
					clearTimeout(this.timeout); //清除计时器				
				}
				this.timeout = setTimeout(() => {
					this.right_scroll = this.right_height[index];
				}, 300)
			},
			myscroll(e) {
				//引入节流
					console.log( 'e.detail.scrollHeight'+e.detail.scrollHeight)
				let right_content_height = e.detail.scrollHeight - this.windows_height;
				if (right_content_height == e.detail.scrollTop) {
					return;
				}
				// +1弥补单位差
				let scroll_top = e.detail.scrollTop +1;
				console.log('e.detail.scrollTop'+e.detail.scrollTop)
				//判断当前的scrollTop在哪个区间内;
				let now = +new Date();
				if (now - this.last > 100) {
					this.last = now;
					console.log(this.right_height)
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
						index + 1]);
					this.select_index = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.goods.length - 1))
					}
				}
			},
			addCart(item) {
				// console.log('ev', JSON.stringify(item))
				if (item.count >= 0) {
					item.count++
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
						})
					})
					// console.log('c++', JSON.stringify(item))

				} else {
					console.log('add')
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								Vue.set(food, 'count', 1)
							// food.count = 1
							// console.log('add-shop', JSON.stringify(food))
						})
					})
				}

			},
			decreaseCart(item) {
				if (item.count) {
					item.count--
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
							// console.log('dec-shop', JSON.stringify(this.foods))
						})
					})
				}
			},
			// 清空购物车
			delAll() {
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							food.count = 0
							// console.log(JSON.stringify(food));
						}
					})
				})
			}

		}

	}
</script>

<style scoped>
	// 容器
	.category-wrapper {
		width: 100%;
		flex-direction: row;
		position: absolute;
		top: 0;
		bottom: 0;
	}

	// 左边小红点
	.allcount {
		position: absolute;
		right: 6px;
		top: 8px;
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		background-color: #f01414;
		color: #ffffff;
	}

	// 左边
	.left-wrapper {
		width: 200upx;
		margin-bottom: 140upx;
		flex: 0 0 200upx;
		background-color: #f4f4f4;
	}

	.left-content .title-content {
		width: 100%;
		height: 100upx;
		font-size: 26upx;
		border-bottom: 2upx solid #E4E4E4;
	}

	.left-content .title-content:last-child {
		border-bottom: 0;
	}

	// 选中颜色
	.onSelected {
		background-color: #fff;
		position: relative;
		color: #feb436;
	}

	.onSelected::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 10upx;
		height: 100%;
		background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
	}

	// 右边
	.right-content {
		width: 100%;
		/* padding: 20upx 0; */
		border-left: 1upx solid #E4E4E4;
		box-sizing: border-box;
	}

	.food-title {
		padding: 2px 0;
	}

	.food-info {
		margin-left: 20upx;
		margin-right: 32upx;
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.food-price {
		color: #f01414;
		font-size: 16px;
	}
</style>
