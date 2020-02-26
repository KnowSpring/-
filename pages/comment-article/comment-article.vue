<template>
	<view class="article-contain">
		<view class="article-title">{{pageData.title}}</view>
		<view class="u-f">
			<view class="u-f-ac article-info">作者：{{pageData.author}}</view>
			<view class="u-f article-info">{{pageData.time}}</view>
		</view>
		<view class="article-content">
			qqqqqq
			<!-- <image class="wmax mgb-5" mode="widthFix" v-for="(item,key) in pageData.imgslist" :key="key" :src="item"></image> -->
		</view>
		<rich-text class="d-content" :nodes="Strings">
		</rich-text>
		<view class="u-f-ajc">
			<!-- @click="loveToggle(pageData.data.id)" --> 
			<view class="btn-love u-f-ajc" :class="pageData.islove?'btn-love-active':''">
				喜欢
			</view>

			<view class="btn-fav u-f-ajc"  :class="pageData.isfav?'btn-fav-active':''">收藏</view>

		</view>
	</view>
</template>

<script>
	// var app = require("../../common/common.js");
	// var id;
	export default {
		data: function() {
			return {
				pageData: {
					title: '标题标题标题',
					author: '年后',
					time: '2020-1-1'

				},
				Strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			}

		},
		onLoad: function(option) {
			// 传过来
			// id = option.id;
			// this.getPage();
			// this.addClick();

		},
		onShareAppMessage: function() {

		},
		methods: {




			//res.data.data.data.content+='<style>img{max-width:100%;width:220px;height:auto;}</style>';
			// res.data.data.data.content=app.html(res.data.data.data.content);





			favToggle: function(id) {
				var that = this;
				uni.request({
					url: that.app.apiHost + "?fromapp=wxapp&m=fav&a=toggle&ajax=1",
					data: {
						objectid: id,
						authcode: that.app.getAuthCode(),
						tablename: "mod_forum"
					},
					success: function(res) {
						if (res.data.error == 1000) {
							that.app.goLogin();
							return false;
						}
						if (res.data.data == 'delete') {
							that.pageData.isfav = false;
						} else {
							that.pageData.isfav = true;
						}

					}
				})
			},
			loveToggle: function(id) {
				var that = this;
				uni.request({
					url: that.app.apiHost + "?m=love&a=toggle&ajax=1",
					data: {

						fromapp: that.app.fromapp(),
						objectid: id,
						authcode: that.app.getAuthCode(),
						tablename: "mod_forum"
					},
					success: function(res) {
						if (res.data.error == 1000) {
							that.app.goLogin();
							return false;
						}
						if (res.data.data == 'delete') {
							that.pageData.islove = false;
						} else {
							that.pageData.islove = true;
						}

					}
				})
			}

		}
	}
</script>
<style scoped>
	.article-contain {
		width: 100%;
		padding: 30upx;

	}
	.article-title {
		font-size: 46upx;
		color: #323232;
	}
	.article-info {
		color: #555;
		font-size: 30upx;
		margin-right: 60upx;
	}
	.article-content {
		font-size: 40upx;
		color: #323232;
		line-height: 1.5;
		margin-bottom: 24upx;
	}

	.article-content img {
		max-width: 100%;
	}

	/****点赞 喜欢按钮****/

	.btn-love,.btn-fav  {
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
	
	.btn-love:before,.btn-fav:before {
		font-family: iconfont;
		font-size: 33.6upx;
		margin-right: 7.2upx;
	}
	.btn-love:before{
		content: "\e780";
	}
	.btn-fav:before {
		content: "\e780";
	}
		

	.btn-love-active {
		color: #f30;
	}

	.btn-love-active:before {
		color: #f30;
	}
	.btn-fav-active {
		color: #f30;
	}

	.btn-fav-active:before {
		color: #f30;
	}
</style>
