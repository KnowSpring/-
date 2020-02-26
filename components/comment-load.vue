<template>
	<!-- 上拉加载更多 -->
	<view class="load-more">{{loadMoreTip}}</view>
</template>

<script>
	export default {
		props:{
			loadMoreTip:String
		}
		
	}
</script>

<style>
	/* 上拉加载更多 */
	.load-more {
		position: absolute;
		z-index: -999;
		text-align: center;
		color: #AAAAAA;
		padding: 15upx;
	}
</style>
