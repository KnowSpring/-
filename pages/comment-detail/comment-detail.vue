<template>
	<view class="detail-content">
		<detail-info :item="detail"></detail-info>
		<view class="u-pinglun-title">最新评论 {{pinglun.count}}</view>
		<view class="uni-pinglun u-pinglun">
			<block v-for="(item,index) in pinglun.list" :key="index">
				<detail-pinglun-list :item="item" :index="index"></detail-pinglun-list>
			</block>
		</view>
		<view style="height: 120upx;"></view>

		<!-- 输入框 -->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
		<!-- 分享 -->
		<more-share :show="shareshow" @togle="togle" ></more-share>
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
				shareshow: false,
				pinglun: {
					count: 20,
					list: []
				},
				detail: {
					userpic: "../../static/userpic/1.jpg",
					username: "哈哈",
					sex: 0, //0 男 1 女
					age: 25,
					isguanzhu: false,
					title: "我是标题",
					titlepic: "../../static/datapic/3.jpg",
					morepic: ["../../static/datapic/3.jpg"], //存多张图片
					video: false,
					share: false,
					path: "深圳 龙岗",
					sharenum: 20,
					pinglunnum: 30,
					goodnum: 20
				},
				// 分享内容
				sharedata: {
					title: "",
					url: "",
					titlepic: "",
					shareType: 0,
				}
			}
		},
		onLoad(e) {
			this.getpinglun();
			this.initdata(JSON.parse(e.itemData))
		},
		// 监听导航右边按钮
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.togle();
			}
		},
		methods: {
			togle() {
				this.shareshow = !this.shareshow
			},
			// 获取评论
			getpinglun() {
				let arr = [
					// 一级评论
					{
						id: 1,
						fid: 0,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1555400035",
						data: "支持国产，支持DCloud!",
					},
					// 子级评论
					{
						id: 2,
						fid: 1,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1555400035",
						data: "支持国产，支持DCloud!",
					},
					{
						id: 3,
						fid: 1,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1555400035",
						data: "支持国产，支持DCloud!",
					},
					{
						id: 4,
						fid: 0,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1555400035",
						data: "支持国产，支持DCloud!",
					},
				];
				for (let i = 0; i < arr.length; i++) {
					arr[i].time = time.gettime.gettime(arr[i].time);
				}
				this.pinglun.list = arr;
			},
			// 初始化数据
			initdata(obj) {
				// 修改窗口标题
				uni.setNavigationBarTitle({
					title: obj.title
				});
			},
			// 提交发送
			submit(data) {
				let obj = {
					id: 1,
					fid: 0,
					userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					username: "小猫咪",
					time: time.gettime.gettime(new Date().getTime()),
					data: data,
				};
				this.pinglun.list.push(obj);
			}
		},

	}
</script>

<style scoped>
	.detail-content {
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
