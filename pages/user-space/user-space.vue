<template>
	<view class="user-space-container">
		<!-- 背景图和个人信息 -->
		<view class="user-space-head u-f-ajc">
			<!-- 背景圖 -->
			<image :src="getBgImg" mode="widthFix" lazy-load @tap="changeImage"></image>
			<!-- 水平垂直居中，排列方式竖直 -->
			<view class="user-space-head-info u-f-ajc u-f-column">
				<image :src="userinfo.userpic" mode="widthFix" lazy-load></image>
				<view class="user-space-margin u-f-ac">
					{{userinfo.username}}
					<tag-sex-age :sex="userinfo.sex" :age="userinfo.age">
					</tag-sex-age>
				</view>
				<view v-show="!isme" class="user-space-head-btn user-space-margin" :class="[userinfo.isguanzhu?'active':'']"
				 @tap.stop="guanzhu">{{userinfo.isguanzhu?'已关注':'+关注'}}</view>
			</view>
		</view>、
		<!-- 总数据 -->
		<view class="user-space-data">
			<my-data :mydata="spacedata"></my-data>
		</view>
		<!-- 用户数据 -->
		<user-space-info :userinfo="userinfo"></user-space-info>
		<!-- 操作菜单 -->
		<user-space-popup :show="show" @hide="togleShow" @sixin="sixin" @beizhu="beizhu"></user-space-popup>
	</view>
</template>

<script>
	import tagSexAge from '../../components/common/tag-sex-age.vue'
	import myData from '../../components/my/my-data.vue'
	import userSpaceInfo from '../../components/user-space/user-space-info.vue'
	import userSpacePopup from "../../components/user-space/user-space-popup.vue";

	export default {
		components: {
			tagSexAge,
			myData,
			userSpaceInfo,
			userSpacePopup
		},
		data() {
			return {
				isme: false,
				show: false, //操作表单显隐
				userinfo: {
					bgimg: 1,
					userpic: "../../static/userpic/1.jpg",
					username: "昵称",
					sex: 0,
					age: 0,
					isguanzhu: false,
					regtime: "2020-04-11",
					userid: 1213,
					birthday: "1998-01-01",
					job: "IT",
					path: "广东广州",
					baseconsume:0,
					baseprotein:0,
					sportconsume:0,
					sportprotein:0
				},
				spacedata: []

			}
		},
		computed: {
			getBgImg() {
				return "../../static/bgimg/" + this.userinfo.bgimg + ".jpg";
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.togleShow()
			}
		},
		onLoad(e) {
			this.initInfo(e)
		},
		methods: {
			initInfo(e) {
				// 获取用户信息
				this.getUserInfo(e)
				// 初始化总数据
				this.spacedata = [{
						type: 1,
						name: "基础代谢",
						num: this.userinfo.baseconsume || 0
					},
					{
						type: 2,
						name: "基础蛋白",
						num: this.userinfo.baseprotein || 0
					},
					{
						type: 1,
						name: "运动代谢",
						num: this.userinfo.sportconsume || 0
					},
					{
						type: 2,
						name: "运动蛋白",
						num: this.userinfo.sportprotein || 0
					}
				]

			},
			async getUserInfo(e) {
				// 从我的进入	
				if (!e.hasOwnProperty('info') && e.user_id == this.$store.state.userinfo.currentid) {
					this.userinfo = JSON.parse(JSON.stringify(this.$store.state.userinfo))
					// 小坑固定背景图
					this.userinfo.bgimg = 1
					console.log(this.userinfo)
					this.isme = true;
					return;
				}
				// 表示从分享页面过来 传过来的是对象，包括姓名，昵称,use_id
				let info = JSON.parse(e.info || '{}')
				if (info && Object.prototype.toString.call(info) === '[object Object]') {
					// 我
					if (info.user_id == this.$store.state.userinfo.currentid) {
						this.userinfo = JSON.parse(JSON.stringify(this.$store.state.userinfo))
						// 小坑固定背景图
						this.userinfo.bgimg = 1
						console.log(this.userinfo)
						this.isme = true;
						return;
					}
					// 其他人
					let userid = info.user_id;
					let [err, res] = await this.$http.get(`/users/${userid}`)
					Object.assign(this.userinfo, res.data.info, info)
					this.userinfo.bgimg = 1
					console.log(this.userinfo)
					this.isme = false;
				}

			},
			// 操作菜单显示隐藏
			togleShow() {
				this.show = !this.show;
			},
			// 私信
			sixin() {
				console.log("私信")
				this.togleShow();
			},
			// 备注
			beizhu() {
				console.log("备注")
				this.togleShow()
			},
			// 关注
			guanzhu() {
				this.userinfo.isguanzhu = !this.userinfo.isguanzhu;
			},
			// 切换图片
			changeImage() {
				console.log(this.userinfo.bgimg)
				let n = parseInt(this.userinfo.bgimg)
				this.userinfo.bgimg = n < 4 ? ++n : 1
			},

		}
	}
</script>

<style scoped>
	.user-space-container {
		width: 100%;
	}

	.user-space-margin {
		margin: 15upx 0;
	}

	.user-space-head {
		position: relative;
		height: 500upx;
		overflow: hidden;
	}

	.user-space-head>image {
		width: 100%;
	}

	.user-space-head-info {
		position: absolute;
		top: 150upx;
	}

	.user-space-head-info>image {
		width: 150upx;
		height: 150upx !important;
		border-radius: 100%;
	}

	.user-space-head-info>view:first-of-type {
		color: #FFFFFF;
		font-size: 35upx;
		font-weight: bold;
		text-shadow: 2upx 2upx 10upx #333333;
	}

	.user-space-head-btn {
		background: #FFE933;
		color: #333333;
		border: 1upx solid #FFE933;
		padding: 0 15upx;
		border-radius: 10upx;
		font-size: 28upx;
	}

	.active {
		background: none;
		color: #FFFFFF;
		border: 1upx solid #FFFFFF;
	}

	/* 数据 */
	.user-space-data {
		background: #FFFFFF;
		position: relative;
		z-index: 10;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		margin-top: -15upx;
	}
</style>
