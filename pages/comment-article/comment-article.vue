<template>
	<view class="article-contain">
		<view class="article-title">{{detail.title}}</view>
		<view class="u-f u-f-jsb">
			<view class="u-f-ac article-info">作者：{{detail.username}}</view>
			<view class="u-f article-info">{{detail.create_time}}</view>
		</view>
		<view class="article-content">
			<rich-text class="d-content" :nodes="detail.content">
			</rich-text>
		</view>
		
		<view class="u-f-ajc">
			<!-- @click="loveToggle(detail.data.id)" --> 
			<view class="btn-love u-f-ajc" :class="{'btn-love-active':detail.infonum.commentDo === 1 }" @tap="doGoodToggle">
				喜欢
			</view>

			<view class="btn-collect u-f-ajc"  :class="{'btn-collect-active':detail.iscollection }" @tap="doCollectToggle">收藏</view>

		</view>
	</view>
</template>

<script>
	import User from '../../common/js/user.js'
	import time from'../../common/js/time.js'
	export default {
		data() {
			return {
				detail:{},
				Strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			}

		},
		onLoad(e){
			let obj = this.$store.state.article
			obj.create_time = time.gettime.gettime(obj.create_time)
			uni.setNavigationBarTitle({
				title: obj.title
			});
			this.detail = obj;
			
		},
		onShareAppMessage: function() {

		},
		methods: {
			async doCollectToggle() {
				if(!User.isdo()){
					return
				}
				let params = {
					 postid: this.detail.id,
					  currentid: this.$store.state.userinfo.currentid
				}
				let [err,res] = await this.$http.post('/posts/collection',params,{token:true})
				if(res.data.msg){
					uni.showToast({
						title: res.data.msg,
						icon:"none"
					})
				}
				this.detail.iscollection = res.data.iscollection
				this.$forceUpdate();
				// 通知comment
				let data = {
					type:'collection',
					data:this.detail.iscollection,
					postid:this.detail.id
				}
				uni.$emit('updatePostData',data)
				// 通知state
				this.$store.commit('changeArticleContent',{iscollection:this.detail.iscollection})
			
			},
			doGoodToggle() {
				if(!User.isdo()){
					return
				}
				let style;//点赞 
					console.log(this.detail.infonum.dingnum)
				if(this.detail.infonum.commentDo === 1){
					// 取消点赞，数量减1
					this.detail.infonum.commentDo = 0
					this.detail.infonum.dingnum --
					style = 3 //表示取消点赞
					
				}else{
					style = 0 //表示点赞
					this.detail.infonum.commentDo = 1
					this.detail.infonum.dingnum ++
				}
				let data = {
					commentDo : this.detail.infonum.commentDo,
					dingnum : this.detail.infonum.dingnum,
					type:'dianzan',
					style:style,
					currentid: this.$store.state.userinfo.currentid,
					postid: this.detail.id //文章id
				}
				this.$forceUpdate();
				// 通知comment
				uni.$emit('updatePostData',data)
				// 通知user-collect页
				// uni.$emit('updateCollectData',data)
				// 通知state
				let article = {
					commentDo : this.detail.infonum.commentDo,
					dingnum : this.detail.infonum.dingnum,
				}
				this.$store.commit('changeArticleContent',article)
				
				
				
			}

		}
	}
</script>
<style scoped>
	.article-contain {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;

	}
	.article-title {
		font-size: 46upx;
		color: #323232;
	}
	.article-info {
		color: #555;
		font-size: 30upx;
	}
	.article-content {
		font-size: 40upx;
		color: #323232;
		line-height: 1.5;
		margin-bottom: 24upx;
	}
	

	.article-content .d-content img {
		max-width: 100%;
	}

	/****点赞 喜欢按钮****/

	.btn-love,.btn-collect  {
		padding: 0 24upx;
		height: 86.4upx;
		border: 1px solid #aaa;
		color: #333;
		border-radius: 24upx;
		font-size: 33.6upx;
	}
	.btn-love{
		margin-right: 40upx;
	}
	
	.btn-love:before,.btn-collect:before {
		font-family: iconfont;
		font-size: 33.6upx;
		margin-right: 7.2upx;
	}
	.btn-love:before{
		content: "\e780";
	}
	.btn-collect:before {
		content: "\e780";
	}
		

	.btn-love-active {
		color: #f30;
	}

	.btn-love-active:before {
		color: #f30;
	}
	.btn-collect-active {
		color: #f30;
	}

	.btn-collect-active:before {
		color: #f30;
	}
</style>
