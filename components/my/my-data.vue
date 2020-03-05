<template>
	<view class="my-data u-f-ac animated fadeIn fast">
		<block v-for="(item,index) in mydata" :key="index">
			<view class="u-f1 u-f-ajc u-f-column">
				<view class="u-f">{{item.num}} <view class="font u-f" >{{item.type === 1?'kcal':'g'}}</view></view>{{item.name}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			mydata:Array
		}
	}
</script>

<style scoped>
	.font{
		font-size: 22upx;
		align-items: flex-end;
	}
.my-data{ 
	padding: 20upx 40upx;
}
.my-data>view{
	color: #989898;
}
.my-data>view>view{
	font-size: 32upx;
	color: #333333;
}
</style>
