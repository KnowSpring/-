<template>
	<view class="comment-list-container">
		<view class="comment-list animated fadeIn fast">
			<view class="comment-userinfo u-f-ac u-f-jsb">
				<view class="u-f-ac">
					<image :src="postItem.userpic" mode="widthFix" lazy-load></image>
					{{postItem.username}}
				</view>
				<view class="u-f-ac" v-show="!postItem.isguanzhu" @tap="guanzhu">
					<view class="icon iconfont icon-zengjia"></view>+关注
				</view>
			</view>
			<view class="comment-title" @tap="intoDetail(postItem)">{{postItem.title}}</view>
			<view class="comment-img u-f-ajc" @tap="intoDetail(postItem)">
				<!-- 图片 -->
				<image :src="postItem.titlepic" mode="widthFix" lazy-load></image>
				<!-- 视频 -->
				<template v-if="postItem.type=='video'">
					<view class="icon iconfont icon-ziyuan comment-list-play"></view>
					<view class="comment-list-playinfo">
						{{postItem.playnum}}次播放 {{postItem.long}}
					</view>
				</template>
			</view>
			<view class="comment-num u-f-ac u-f-jsb">
				<view class="u-f-ac">
					<view class="u-f-ac" :class="{'active':(postItem.infonum.commentDo === 1)}" @tap="zanCai('zan')">
						<view class="icon iconfont icon-good-fill"></view>
						{{postItem.infonum.dingnum}}
					</view>
					<view class="u-f-ac" :class="{'active':(postItem.infonum.commentDo==2)}" @tap="zanCai('cai')">
						<view class="icon iconfont icon-bad-fill" ></view>
						{{postItem.infonum.cainum}}
					</view>
				</view>
				<view class="u-f-ac">
					<view class="u-f-ac">
						<view class="icon iconfont icon-comments-fill"></view>
						{{postItem.commentnum}}
					</view>
					<view class="u-f-ac">
						<view class="icon iconfont icon-resonserate-fill"></view>
						{{postItem.sharenum}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		data(){
			return{
				postItem:{}
			}
			
		},
		// 不要直接修改父组件传过来的值，通过放在data(){ return {postItem:this.item}}
		// 将父组件传过来的数据放在data中created时赋值，  或直接将props的值放在data, data(){ return {postItem:this.item}}
		created() {
			this.postItem = this.item;
		},
		methods: {
			// 进入详情页
			intoDetail(item){
				uni.navigateTo({
					url:"../comment-detail/comment-detail?itemData="+JSON.stringify(this.postItem)
				})
			},
			// 父组件的关注没有改变
			guanzhu(){
				this.postItem.isguanzhu = true;
				uni.showToast({
					title: '关注成功'
				})
			},
			// 父组件的顶踩数目和commentDo没有改变
			zanCai(type) {
				switch (type) {
					case 'zan':
						if (this.postItem.infonum.commentDo === 1) {
							return;
						}
						this.postItem.infonum.dingnum++;
						if (this.postItem.infonum.commentDo === 2) {
							this.postItem.infonum.cainum--;
						}
						this.postItem.infonum.commentDo = 1;
						break;
					case 'cai':
						if (this.postItem.infonum.commentDo === 2) {
							return;
						}
						this.postItem.infonum.cainum++;
						if (this.postItem.infonum.commentDo === 1) {
							this.postItem.infonum.dingnum--;
						}
						this.postItem.infonum.commentDo = 2;
						break;
				}
			}
		}
	}
</script>

<style scoped>
 @import '../common/commentList.css'

</style>
