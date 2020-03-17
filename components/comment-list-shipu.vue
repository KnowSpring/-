<template>
	<view class="comment-list-shipu" @tap="intoArticleDetail">
		<image :src="shipuItem.titlepic"></image>
		<view class="shipu-name ">{{shipuItem.title}}"</view>
		<view class="u-f-ac u-f-jsb shipu-bottom">
			<view class="userinfo u-f-ac">
				<image :src="shipuItem.userpic"></image>{{shipuItem.username}}
			</view>
			<view class="u-f-ac" >
				<view  class="icon iconfont icon-good-fill" @tap.stop="doGoodToggle" :class="{'active':(shipuItem.infonum.commentDo === 1)}" ></view>{{shipuItem.infonum.dingnum}}
			</view>
		</view>
	</view>
</template>

<script>
		import User from '../common/js/user.js';
	export default {
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {
				shipuItem:this.item
			}
		},
		// created(){  //onLoad不可以
		// 	uni.$on('updateLove',this.updateLove)
		// },
		methods: {
			// // 更新详情页传来的数据
			// updateLove(data){
			// 	console.log('dd')
			// 	this.shipuItem.infonum.commentDo = data.commentDo;
			// 	this.shipuItem.infonum.dingnum = data.dingnum;
			// 	console.log(this.shipuItem.infonum.dingnum)
			// },
			doGoodToggle(){
				if(!User.isdo()){
					return
				}
				if(this.shipuItem.infonum.commentDo === 1){
					// 已点赞 变成没点赞，数量减1
					this.shipuItem.infonum.commentDo = 0
					this.shipuItem.infonum.dingnum --
				}else{
					this.shipuItem.infonum.commentDo = 1
					this.shipuItem.infonum.dingnum ++
				}
				
			},
			// 进入详情页
			intoArticleDetail(){
				console.log(this.shipuItem)
				// this.shiPuItem导致对象给了指针
				let item = JSON.parse(JSON.stringify(this.shipuItem))
				this.$store.commit('changeArticleContent',item)
				uni.navigateTo({
					url: "/pages/comment-article/comment-article"
				})
			}


		}

	}
</script>

<style scoped>
	.comment-list-shipu {
		width: 363upx;
		padding: 0 4upx;
		margin-top: 20upx;
		box-shadow: 0 2upx 6upx rgba(0, 0, 0, 0.3);
		background-color: #FFFFFF;
		color: #898989;

	}

	.comment-list-shipu image {
		width: 100%;
	}

	.shipu-bottom {
		padding: 10upx 0;
	}
	/* 点赞颜色 */
	.active{
		color:#f30;
	}

	.shipu-name {
		width: 100%;
		border-bottom: 2upx solid #ccc;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.userinfo image {
		width: 85upx;
		height: 85upx;
		border-radius: 100%;
		margin-right: 10upx;
	}
</style>
