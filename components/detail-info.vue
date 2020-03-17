<template>
	<view class="common-list u-f animated fadeIn fast">
		<view class="common-list-l" @tap="toUserSpace(item.user_id)">
			<image :src="item.userpic" mode="widthFix" lazy-load></image>
		</view>
		<view class="common-list-r u-f1">
			<view>
				<view class="u-f-ac u-f-jsb">
					<view class="u-f-ac">
						{{item.username}}
						<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
					</view>
					<view v-show="!isguanzhu" @tap="guanzhu" class="icon iconfont icon-zengjia">关注</view>
				</view>
				<view class="common-list-r-time">{{item.create_time}}</view>
			</view>
			<view>{{item.title}}</view>
			<view class="u-f-ajc" style="flex-direction: column;">
				<!-- 图片 -->
				<block v-if="item.titlepic">
					<image :src="item.titlepic" mode="widthFix" lazy-load style="margin-bottom: 20upx;" @tap="imgdetail(index)"></image>
				</block>
				<block v-for="(pic,index) in item.morepic" :key="index">
					<image :src="pic" mode="widthFix" lazy-load style="margin-bottom: 20upx;" @tap="imgdetail(index)"></image>
				</block>
				<!-- 视频 -->
				<template v-if="item.video">
					<view class="common-list-play icon iconfont icon-bofang">
					</view>
					<view class="common-list-playinfo">
						{{item.video.looknum}} 次播放 {{item.video.long}}
					</view>
				</template>
				<!-- 分享 -->
				<view class="common-list-share u-f-ac" v-if="item.share">
					<image :src="item.share.titlepic" mode="widthFix" lazy-load></image>
					<view>{{item.share.title}}</view>
				</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				<view>{{item.path}}</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-resonserate-fill">
						{{item.sharenum}}</view>
					<view class="icon iconfont icon-comments-fill">
						{{pinglunCount}}</view>
					<view class="icon iconfont icon-good-fill" :class="{'active':(item.infonum.commentDo  === 1)}" @tap="dianzan">
						{{item.infonum.dingnum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import User from '../common/js/user.js'
	import tagSexAge from "./common/tag-sex-age.vue"
	import time from'../common/js/time.js'
	export default {

		components: {
			tagSexAge
		},
		props: {
			item: Object,
			pinglunCount: Number
		},
		data() {
			this.item.create_time = time.gettime.gettime(this.item.create_time)
			return {
				isguanzhu: this.item.isguanzhu
			}
		},
		methods: {
			async guanzhu() {
				if (!User.isdo()) {
					return;
				}
				this.isguanzhu = true;
				let userid = this.item.user_id
				let currentid = this.$store.state.userinfo.currentid;
				let data = {
					type: 'guanzhu',
					data: true,
					userid,
					currentid
				}
				// 更新父级comment-detail关注
				this.$emit('updateGuanzhu', {
					data: true
				})
				// 更新comment中总数据的关注
				uni.$emit('updatePostData', data)
				uni.showToast({
					title: '关注成功'
				})
			},

			async dianzan() {
				if (!User.isdo()) {
					return;
				}
				if (this.item.infonum.commentDo === 1) {
					return
				}
				this.item.infonum.commentDo = 1;
				// 修改的是data中的item,父组件数据修改需要emit
				this.item.infonum.dingnum++;
				let postid = this.item.id
				let currentid = this.$store.state.userinfo.currentid;
				let data = {
					type: 'dianzan',
					commentDo: 1, //commentDO类型
					style: 0,
					dingnum:this.item.infonum.dingnum,
					postid,
					currentid
				}
				// 更新父级comment-detail点赞
				this.$emit('updateDianzan', {
					commentDo: 1
				})
				// 更新comment中总数据的点赞
				uni.$emit('updatePostData', data)

			},
			imgdetail(index) {
				uni.previewImage({
					current: index,
					urls: this.item.morepic
				})
			},
			// 进入用户空间
			toUserSpace() {
				let otherinfo = {
					username: this.item.username,
					userpic: this.item.userpic,
					user_id: this.item.user_id
				}
				uni.navigateTo({
					// pages页相对路径
					url: "../user-space/user-space?info=" + JSON.stringify(otherinfo)
				})
			}
		}
	}
</script>

<style scoped>
	@import '../common/commentList.css';

	.active {
		color: #ffff44;
	}

	.common-list-l image {
		width: 85upx;
		height: 85upx;
		border-radius: 100%;
		margin-right: 10upx;
	}

	.common-list-r {
		border-bottom: 0;
		padding-right: 30upx;
	}

	.common-list {
		border-bottom: 1upx solid #EEEEEE;
	}

	.common-list-r-time {
		padding: 15upx 0;
		color: #CCCCCC !important;
		font-size: 25upx;
		background: #FFFFFF !important;
	}

	.common-list-r>view:nth-child(1)>view:nth-child(1)>view:first-child {
		color: #999999;
		font-size: 32upx;
	}

	.common-list-r>view:nth-child(1)>view:nth-child(1)>view:last-child {
		background: #EEEEEE;
		padding: 0 10upx;
		font-size: 26upx;
	}
</style>
