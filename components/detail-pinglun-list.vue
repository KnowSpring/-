<template>
	<view class="uni-comment-list" :class="{'u-comment-list-child':(item.fid>0)}">
		<view class="uni-comment-face"><image @tap.stop="openSpace" :src="item.userpic" mode="widthFix"></image></view>
		<view class="uni-comment-body" @tap.stop="reply">
			<view class="uni-comment-top"><text>{{item.username}}</text>
			</view>
			<view class="uni-comment-content">{{item.data}}</view>
			<view class="uni-comment-date">
				<view>{{item.create_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		methods:{
			openSpace(){
				let otherinfo = {
					username:this.item.username,
					userpic:this.item.userpic,
					user_id:this.item.user_id
				}
				uni.navigateTo({
					// pages页相对路径
					url: "../user-space/user-space?info=" + JSON.stringify(otherinfo)
				})
			},
			reply(){
				this.$emit('reply',this.item.id)
			}
		}
	}
</script>

<style scoped>
.u-comment-list-child{
	padding: 20upx;
	background: #F4F4F4;
	border-bottom: 1upx solid #EEEEEE;
	box-sizing: border-box;
	margin: 0;
	margin-left: 70upx;
	width: auto;
}
</style>
