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
				<view class="user-space-head-btn user-space-margin" :class="[userinfo.isguanzhu?'active':'']" @tap.stop="guanzhu">{{userinfo.isguanzhu?'已关注':'+关注'}}</view>
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
				show: false, //操作表单显隐
				userinfo: {
					bgimg: 1,
					userpic: "../../static/userpic/1.jpg",
					username: "昵称",
					sex: 0,
					age: 20,
					isguanzhu: false,
					regtime: "2019-04-11",
					id: 1213,
					birthday: "1998-01-01",
					job: "IT",
					path: "广东广州"
				},
				spacedata: [{
						name: "体重/kg",
						num: 66
					},
					{
						name: "消耗/cal",
						num: 11
					},
					{
						name: "摄入/cal",
						num: 12
					}
				]

			}
		},
		computed: {
			getBgImg() {
				return "../../static/bgimg/" + this.userinfo.bgimg + ".jpg";
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.togleShow()
			}
		},
		methods: {
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
		height: 150upx;
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
