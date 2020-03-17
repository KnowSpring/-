<template>
	<view class="eat-meal-container">
		<uni-section title="每次运动列表" type="line"></uni-section>
		<uni-swipe-action>
			<uni-swipe-action-item class="meal-container" v-for="(item,index) in swipeList" :show="isOpened" :options="item.options" :key="item.id"
			 @change="swipeChange" @click="swipeClick($event,index)">
					<text class="cont u-f-ac">{{item.content}}</text>
					<view class="content">
						<view class="u-f u-f-jsb"><text>运动量： {{item.sportconsume}}kcal</text></view>
					</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSection from '../../components/uni-section/uni-section.vue'
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		data() {
			return {
				isOpened: false,
				swipeList: []
			}
		},
		components: {
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		onLoad() {
			this.initData();
		},
		methods: {
			async initData() {
				// this.swipeList = []
				let [err, res] = await this.$http.post('/users/curtimesport', {}, {
					token: true
				})
				let times = res.data.data
				if (times) {
					times.forEach((item, index) => {
						item.options = [{
							text: '删除',
							style: {
								backgroundColor: 'rgb(255,58,49)'
							},
						}]
						item.content = `第${index+1}次`
						this.swipeList.push(item)
					})

				}
			},
			swipeChange(e) {
				console.log('滑动了', e);
			},
			swipeClick(e, index) {
				let {
					content
				} = e
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: async (res) => {
							if (res.confirm) {
								let timeid = this.swipeList[index].id
								this.swipeList.splice(index, 1)
								this.$http.post('/users/deltime',{timeid},{token:true})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}
		}
	}
</script>

<style sccoped>
	.eat-meal-container {
		width: 100%;
		background-color: #F4F4F4;
		color: #3A3A3A;
	}
	.meal-container{
		border-bottom: 4upx solid #CCCCCC;
	}

	.cont {
		flex: 1;
		height: 100%;
		line-height: 100%;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.content {
		flex: 2;
		background-color: #fff;
		margin-right: 40upx;
	}
</style>
