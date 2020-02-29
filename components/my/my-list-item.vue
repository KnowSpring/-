<template>
	<view class="my-list-item u-f-ac u-f-jsb" hover-class="my-list-hover" @tap="clickevent">
		<view class="u-f-ac">
			<view class="icon iconfont" :class="['icon-'+item.icon]"  v-if="item.icon"></view>
			{{item.name}}
		</view>
		<view class="icon iconfont" :class="{'icon-arrow-right':!item.data}">{{item.data||''}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			clickevent() {
				// 跳转页面
				switch (this.item.clicktype) {
					case "navigateTo":
						if (this.item.url) {
							uni.navigateTo({
								url: this.item.url
							})
						}
						break;
					case "switchTab":
						if (this.item.url) {
							uni.switchTab({
								url: this.item.url
							})
						}
						break;
					case "clear" : 
					uni.showModal({
						title:'提示',
						content:'确认清除缓存?',
						confirmText:'立即清除',
						success: () => {
							uni.clearStorage();
							uni.showToast({
								title: '清除缓存成功！',
								icon: 'none'
							});
						}
					})
					
				}
			}
		}
	}
</script>

<style scoped>
	.my-list-item {
		padding: 20upx;
		border-top: 1upx solid #F4F4F4;
		border-bottom: 1upx solid #F4F4F4;
	}

	.my-list-item>view:first-child {
		color: #333333;
	}

	.my-list-item>view:first-child>view {
		margin-right: 10upx;
	}

	.my-list-item>view:last-child {
		color: #CCCCCC;
	}

	.my-list-hover {
		background: #f4f4f4;
	}
</style>
