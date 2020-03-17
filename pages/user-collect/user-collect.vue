<template>
	<view class="body">
		<view v-for="(item,index) in collectList" :key="index">
			<view class="comment-list u-f" @tap="intoArticleDetail(item)">
				<view class="comment-list-l u-f1 u-f-ac u-f-jsb ">
					<view class="title">{{item.title}}</view>
					<view class="u-f-ac readnum">
						<view class="iconfont icon-good-fill"></view>{{item.infonum.dingnum}}
					</view>

				</view>
				<view class="comment-list-r" v-if="item.titlepic">
					<image :src="item.titlepic" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectList: []
			}
		},
		async onShow() {
			let [err, res] = await this.$http.post('/posts/getcollect', {}, {
				token: true
			})
			this.collectList = res.data.data
			// uni.$on('updateCollectData',this.updateCollectData)
		},
		methods: {
			// 进入详情页
			intoArticleDetail(item) {
				let article = JSON.parse(JSON.stringify(item))
				this.$store.commit('changeArticleContent', article)
				uni.navigateTo({
					url: "/pages/comment-article/comment-article"
				})
			},
			// updateCollectData(data){
			// 	let listIndex;
			// 	this.collectList.forEach((item, index) => {
			// 		if (item.id === data.postid) {
			// 			item.infonum.dingnum = data.dingnum
			// 			item.infonum.commentDo = data.commentDo
			// 			listIndex = index
			// 		}
			// 	})
			// 	this.collectList.splice(listIndex,1)
			// }
		}
	}
</script>

<style scoped>
	.body {
		width: 100%;
		background-color: #F7F7F7;
	}

	.comment-list {
		margin-top: 20upx;
		padding: 30upx;
		background-color: #FFFFFF;
	}

	.comment-list .comment-list-l {
		color: #898989;
	}

	.comment-list-l view {
		font-size: 36upx;
	}

	.comment-list-l .title {
		width: 400upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	.comment-list-r {
		width: 30%;
		margin-left: 40upx;
	}

	.comment-list-r image {
		width: 100%;
	}
</style>
