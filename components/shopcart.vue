<template>
	<view class="shopcart">
		<!-- @click="toggleList" -->
		<view class="cartBottom" @click="toggleList">
			<view class="carIcon">
				<view class="iconBox" :class="getAllCount ? 'active' : '' ">
					<text class="allcount" v-if="getAllCount">{{getAllCount}}</text>
					<view class="icon iconfont icon-add-cart u-f-ajc"></view>
				</view>
			</view>
			<view class="middle">
				<text class="total" :class="getAllCount ?　'active': ''">热量： <text class="red"> {{getAllPrice}} kcal  </text></text>
				<view class="u-f u-f-jsb"><text>蛋白质： kkg</text><text>脂肪： kkg</text></view>
				<view class="u-f u-f-jsb"><text>碳水：kkg</text><text>维生素： kkg</text></view>

			</view>
			<view class="BtnRight u-f-ac">
				<button class="u-f-ajc" :class="getAllCount ?　'active': ''" @tap.stop="toTotal">结算</button>
			</view>
		</view>
		<!-- 选择的商品 -->
		<view class="cartList" v-show="isShowList && getList.length">
			<scroll-view scroll-y style="max-height: 300px;">
				<view class="title">
					<text>购物车</text>
					<view class="clear" @click="delShopcart">
						清空
					</view>
				</view>
				<view class="list">
					<view class="list-text" v-for="(item,index) in getList" :key="index">
						<text style="flex:1">{{item.name}}</text>
						<text style="flex:1">{{item.price}} kcal</text>
						<cartcontrol :food="item" @add="addCart" @dec="decreaseCart"></cartcontrol>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="listMask" v-show="isShowList && getList.length" @click="toggleList"></view>
	</view>
</template>

<script>
	import cartcontrol from '@/components/cartcontrol.vue'
	// import {mul} from '@/utils/lib'
	export default {
		props: {
			goods: {
				type: Array
			}
		},
		data() {
			return {
				isShowList: false,
			};
		},
		components: {
			cartcontrol
		},
		computed: {
			getList() {
				let result = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							result.push(food)
							// console.log('res', JSON.stringify(result))
						}
					})
				})
				return result
			},
			// 获得购物车所有商品数量
			getAllCount() {
				let result = 0;
				this.getList.forEach((food) => {
					result += food.count
				})
				return result
			},



			// 总价
			getAllPrice() {
				let result = 0;
				let result1 = 0;
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						result1 += this.accMul(food.count, food.price)
						result = result1.toFixed(2);
					})
				})
				return result
			}
		},
		methods: {
			// 结算
			toTotal() {
				console.log('结算')
			},
			// 解决浮点数 运算出现多位小数
			accMul(arg1, arg2) {
				let m = 0,
					s1 = '',
					s2 = '';
				if (arg1 && arg1 != null)
					s1 = arg1.toString();
				if (arg2 && arg2 != null)
					s2 = arg2.toString();
				// console.log('m1',s2.replace('.',''))
				try {
					m += s1.split('.')[1].length
				} catch (e) {}
				try {
					m += s2.split('.')[1].length
				} catch (e) {}

				return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
			},


			toggleList() {
				console.log('tog')
				if (this.getList.length) {
					this.isShowList = !this.isShowList;
				}
			},
			delShopcart() {
				this.$emit('delAll');
			},
			addCart: function(item) {
				this.$emit('add', item)
			},
			decreaseCart(item) {
				this.$emit('dec', item)
			}

		},
	}
</script>

<style scoped>
	.list-text {
		display: flex;
		flex-direction: row;
	}

	.shopcart .cartBottom {
		position: fixed;
		bottom: 100upx;
		left: 0;
		right: 0;
		height: 160upx;
		z-index: 99;
		display: flex;
		background-color: #141d27;
	}

	.carIcon {
		flex: 1;
	}

	.iconBox {
		position: absolute;
		bottom: 88upx;
		left: 36upx;
		z-index: 101;
		background-color: rgb(70, 73, 75);
		border-radius: 50%;
		height: 120upx;
		width: 120upx;
		line-height: 55px;
		/* border: 6px solid #141d27; */
	}

	.iconBox .allcount {
		position: absolute;
		right: 0;
		top: 0;
		display: inline-block;
		padding: 0 6px;
		font-size: 9px;
		line-height: 16px;
		font-weight: 400;
		border-radius: 10px;
		background-color: #f01414;
		color: #ffffff;
	}

	.iconBox .icon-add-cart {
		font-size: 68upx;
		font-weight: 700;
	}

	.img {
		font-size: 24px;
		line-height: 24px;
		width: 30px;
		height: 30px;
		padding-left: 6px;
		padding-top: 6px;
		color: #cccccc;
		border-radius: 50%;
	}

	.carIcon .active {
		background-color: #FC982C;
	}

	.middle {
		display: flex;
		flex-direction: column;
		flex: 2;
		color: #ffffff;
		margin-right: 30upx;
		;
	}

	.middle .total {
		font-size: 34upx;
		font-weight: 600;
	}

	.middle .total .red {
		color: #f01414;
	}

	.BtnRight {
		flex: 1;
	}

	.BtnRight button {
		width: 130upx;
		height: 80upx
	}

	.BtnRight .active {
		background-color: #FC982C;
		font-weight: 600;
	}

	.cartList {
		position: fixed;
		bottom: 210upx;
		left: 0;
		right: 0;
		z-index: 90;
	}

	.cartList .title,
	.cartList .list-text {
		display: flex;
		flex-direction: row;
	}

	.cartList .title {
		background: #F3F5F7;
		justify-content: space-between;
		padding: 8upx 16upx;
	}

	.cartList .list-text {
		padding: 20upx 12upx 20upx 16upx;
		text-align: center;
	}

	.list {
		background: #F8F8F8;
		padding-bottom: 60upx;
	}


	/* 遮布 */
	.listMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 89;
		opacity: 0.5;
		background: #6a7076;
	}
</style>
