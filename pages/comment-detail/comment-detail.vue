<template>
	<view class="detail-content">
		<detail-info :item="detail" :updateGuanzhu="updateGuanzhu" :updateDianzan="updateDianzan" :pinglunCount="pinglunCount"></detail-info>
		<view class="u-pinglun-title">最新评论 {{pinglunCount}}</view>
		<view class="uni-pinglun u-pinglun">
			<block v-for="(item,index) in pinglun.list" :key="index">
				<detail-pinglun-list :item="item" :index="index" @reply="reply"></detail-pinglun-list>
			</block>
		</view>
		<view style="height: 120upx;"></view>

		<!-- 输入框 --> 
		<user-chat-bottom @submit="submit" :focus="focus" @blur="blur"></user-chat-bottom>
		<!-- 分享 -->
		<more-share :show="shareshow" @togle="togle"></more-share>
	</view>
</template>

<script>
	import time from "../../common/js/time.js";
	
	
	import detailInfo from "../../components/detail-info.vue";
	import detailPinglunList from '../../components/detail-pinglun-list.vue'
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue";
	import moreShare from "../../components/common/more-share.vue";

	export default {
		components: {
			detailInfo,
			detailPinglunList,
			userChatBottom,
			moreShare
		},
		data() {
			return {
				focus: false,
				shareshow: false,
				reply_id: 0, // 回复id 默认0为一级评论
				// 分享内容
				sharedata: {
					title: "",
					url: "",
					titlepic: "",
					shareType: 0,
				},
				pinglun: {
					count: 20,
					list: [{
						user_id: 0,
						fid: 0, //fid存的是评论表中的id
						fnum: 0,
						data: "",
						create_time: "",
						post_id: 1,
						username: "",
						userpic: "",
					}]
				},
				detail: {
					user_id: 0,
					userpic: "",
					username: "",
					sex: 0, //0 男 1 女
					age: 0,
					content: "",
					isguanzhu: false,
					title: "",
					titlepic: "",
					morepic: [], //存多张图片
					video: false,
					share: false,
					path: "",
					sharenum: 0,
					pinglunnum: 0,
					infonum: {
						commentDo: 0,
						dingnum: 0,
						cainum: 0
					},
					creat_time: 0
				}
			}
		},
		onLoad(e) {
			this.initdata(JSON.parse(e.itemData))
			this.getpinglun();


		},
		// 监听导航右边按钮
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.togle();
			}
		},
		computed: {
			pinglunCount() {
				return this.pinglun.list.length
			}
		},

		methods: {
			togle() {
				this.shareshow = !this.shareshow
			},
			// 获取评论
			async getpinglun() {
				let userpic;
				let postid = this.detail.id
				let [err, res] = await this.$http.get(`/posts/${postid}/comments`)
				let arr = res.data.commentlist
				
				for (let i = 0; i < arr.length; i++) {
					arr[i].create_time = time.gettime.gettime(arr[i].create_time);
					userpic = arr[i].userpic || '';
					if(userpic.indexOf(this.config.baseUrl) === -1&&userpic.indexOf('http') === -1){
						arr[i].userpic =this.config.baseUrl+userpic
					}
				}
				this.pinglun.list = arr;
				console.log(this.pinglun.list)
			},
			// 初始化数据
			initdata(obj) {
				// 修改窗口标题
				uni.setNavigationBarTitle({
					title: obj.title
				});
				this.detail = obj
			},
			// 关注
			updateGuanzhu(data) {
				this.detail.isguanzhu = data.data;
			},
			// 点赞
			updateDianzan(data) {
				this.detail.infonum.commentDo = data.commentDo;
				this.detail.infonum.dingnum++;
			},
			reply(id) {
				this.reply_id = id;
				console.log(this.reply_id)
				this.focus = true;
			},
			blur() {
				this.focus = false;
			},
			// 发布评论
			async submit(data) {
				uni.showLoading({
					title: '评论中...',
					mask: false
				});
				let reply_id = this.reply_id; //没有点击别人评论默认为0
				let [err, res] = await this.$http.post('/posts/comment', {
					post_id: this.detail.id,
					fid: reply_id,
					data: data,
					user_id:this.$store.state.userinfo.currentid
				}, {
					token: true
				});
				// 发送成功
				uni.hideLoading();
				uni.showToast({
					title: "发送成功~"
				});
				let result = {
					id: res.data.data.id,
					fid: reply_id,
					userpic: this.$store.state.userinfo.userpic,
					username: this.$store.state.userinfo.username,
					create_time: time.gettime.gettime(new Date().getTime()),
					data: data,
				};
				// 一级评论
				if (reply_id === 0) {
					return this.pinglun.list.push(result);
				}
				// 二级评论
				// 找出被评论id的索引
				let index = this.pinglun.list.findIndex((val) => {
					return val.id === reply_id;
				});
				if (index > -1) {
					// 中间插入
					this.pinglun.list.splice(index + 1, 0, result);
				}
				// 重置一下id
				this.reply_id = 0;
			}
		}
	}
</script>

<style scoped>
	.detail-content {
		width: 100%;
		padding-top: 20upx;
	}

	.u-pinglun {
		padding: 0 20upx;
	}

	.u-pinglun-title {
		padding: 20upx;
		font-size: 30upx;
		font-weight: bold;
	}
</style>
