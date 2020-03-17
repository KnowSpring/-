<template>
	<view class="comment-container">
		<comment-head :tabIndex="tabIndex" :tabBars="tabBars" @changeTabIndex="changeTabIndex"></comment-head>
		<view class="uni-tab-bar">
			<!-- tab栏内容 -->
			<!-- 每一分类数据 -->
			<!-- 监听事件改变，将tabIndex值改变,tab改变   :current是上面tab改变，切换对应栏-->
			<swiper class="swiper-box" @change="tabSameSlide" :current="tabIndex" :style="{height:swiperHeight + 'px' }">
				<swiper-item v-for="(bigSort,index) in commentslist" :key="index">
					<!-- scroll-view有scrolltolower事件,要给一个高度 -->

					<scroll-view class="list" scroll-y @scrolltolower="loadMoreData(index)">
						<template v-if="bigSort.list.length > 0">
							<!-- 可进行竖直滚动 -->
							<!-- 每一项评论 -->
							<block v-if="bigSort.type === 'fenxiang' " v-for="(item,id) in bigSort.list" :key="id">
								<comment-list-fenxiang :item="item" @clickGood="doDing" :index="id"></comment-list-fenxiang>
							</block>
							<block v-if="bigSort.type === 'pingce' " v-for="(item,id) in bigSort.list" :key="id">
								<comment-list-pingce :item="item" :index="id"></comment-list-pingce>
							</block>
							<block v-if="bigSort.type === 'zhishi' " v-for="(item,id) in bigSort.list" :key="id">
								<comment-list-zhishi :item="item" :index="id"></comment-list-zhishi>
							</block>
							<view class="u-f u-f-jsb shipu-content">
								<block v-if="bigSort.type === 'shipu' " v-for="(item,id) in bigSort.list" :key="id">
									<comment-list-shipu class="list-shipu" :item="item" :index="id"></comment-list-shipu>
								</block>
							</view>
							<!-- 上拉加载更多 -->
							<comment-load :loadMoreTip="bigSort.loadMoreTip"></comment-load>
						</template>
						<template v-else>
							<view class="nothing u-f-ajc">这里什么也没有</view>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import commentListFenxiang from '../../components/comment-list-fenxiang.vue';
	import commentListZhishi from '../../components/comment-list-zhishi.vue';
	import commentListPingce from '../../components/comment-list-pingce.vue';
	import commentListShipu from '../../components/comment-list-shipu.vue';
	import commentLoad from '../../components/comment-load.vue';
	import commentHead from '../../components/comment-head.vue';
	import User from '../../common/js/user.js'
	export default {
		components: {
			commentListFenxiang,
			commentListPingce,
			commentListZhishi,
			commentListShipu,
			commentLoad,
			commentHead
		},
		data() {
			return {
				swiperHeight: 500,
				tabIndex: 0, //当前选中的值
				guanzhuList: [],
				supportList: [],
				collectList:[],//收藏列表
				tabBars: [{
						id: 'fenxiang',
						name: '分享'
					},
					{
						id: 'pingce',
						name: '评测'
					},
					{
						id: 'zhishi',
						name: '知识'
					},
					{
						id: 'shipu',
						name: '食谱'
					}
				],
				commentslist: [{
						loadMoreTip: '上拉加载更多',
						type: 'fenxiang',
						pagenum: 1,
						total: 7,
						list: []
					},
					{
						loadMoreTip: '上拉加载更多',
						type: 'pingce',
						pagenum: 1,
						total: 7,
						list: [
							// {
							// 	titlepic: "../../static/datapic/pingce1.jpg",
							// 	username: '食无票',
							// 	title: "各类肉蛋白质含量排行",
							// 	readnum: 22222
							// }
						]
					},
					{
						loadMoreTip: '上拉加载更多',
						type: 'zhishi',
						pagenum: 1,
						total: 7,
						list: [

							// {
							// 	titlepic: "../../static/datapic/zhishi1.jpg",
							// 	username: '怡文',
							// 	content: "反反复复付付付付三生三世得到顶顶顶顶顶顶顶顶二二恶浮动的辅导辅导费",
							// 	readnum: 22222
							// }
						]
					},
					{
						type: 'shipu',
						loadMoreTip: '上拉加载更多',
						pagenum: 1,
						total: 7,
						list: []
					}

				],

			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					let height = res.windowHeight - uni.upx2px(100);
					this.screenWidth = res.windowWidth;
					this.swiperHeight = height;
				}
			})
			// 开启监听
			uni.$on('updatePostData', this.updatePostData);
			// 获取各个部分文章内容
			this.initCommentContent()
		},
		// onShow(){
		// 	this.$forceUpdate()
		// },
		onUnload() {
			uni.$off('updatePostData', this.updatePostData)
		},
		// 监听原生搜索输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'

			})
		},
		//监听发布按钮
		onNavigationBarButtonTap(e) {
			if (!User.isdo()) {
				return;
			}
			switch (e.index) {
				case 0:
					uni.navigateTo({
						url: '../add-post/add-post'
					}) // 发布页面
					break;
			}
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getFirstData()
		},
		methods: {
			// 获取用户关注列表
			async getGuanzhuList() {
				let params = {}
				let [err, res] = await this.$http.post('/posts/guanzhu', params, {
					token: true,
					checkToken: false
				})
				if (res.statusCode === 401) {
					return;
				}
				this.guanzhuList = res.data.data
				// console.log(this.guanzhuList)
			},
			async getCollectList() {
				let params = {}
				let [err, res] = await this.$http.post('/posts/getcollect', params, {
					token: true,
					checkToken: false
				})
				if (res.statusCode === 401) {
					return;
				}
				this.collectList = res.data.data
				// console.log(this.guanzhuList)
			},
			// 获取用户点赞列表
			async getSupportList() {
				let params = {}
				let [err, res] = await this.$http.post('/posts/getsupport', params, {
					token: true,
					checkToken: false
				})
				if (res.statusCode === 401) {
					return;
				}
				this.supportList = res.data.data
			},
			// 初始化文章内容
			initCommentContent() {
				// 分享
				this.getComment(1);

				// 评测
				this.getComment(2);
				// 知识
				this.getComment(3);
				// 食谱
				this.getComment(4);
			},
			// 更改文章数据
			updatePostData(data) {
				switch (data.type) {
					case "guanzhu":
						this.updateGuanzhu(data);
						break;
					case "dianzan":
						this.updateDianzan(data);
						break;
					case "collection":
						this.updateCollection(data);
						break;
					case "updateLists":
						this.updatePostLists(data);
						break;
					case "newpost":
						this.updateNewpost(data);
						break;
				}
			},
			async updatePostLists() {
				await this.getSupportList();
				await this.getGuanzhuList();
				await this.getCollectList();
				this.commentslist = this.commentslist.map((item, index) => {
					item.list = item.list.map((postItem, postIndex) => {
						// console.log(this.guanzhuList)
						// 是否关注
						let isfollow = this.guanzhuList.find((value, key) => {
							return value.user_id === postItem.user_id
						})
						// console.log(follow)
						if (isfollow) {
							postItem.isguanzhu = true;
						}
						// 是否点赞
						let obj = this.supportList.find((value, key) => {
							return value.post_id === postItem.id
						})
						if (obj) {
							if (obj.type === 0) {
								postItem.infonum.commentDo = 1
							}
							if (obj.type === 1) {
								postItem.infonum.commentDo = 2
							}
						}
						// 是否收藏
						let iscollect = this.collectList.find((value, key) => {
							return value.post_id === postItem.id
						})
						// console.log(follow)
						if (iscollect) {
							postItem.iscollection = true;
						}
						return postItem
					})
					return item;
				})
			},
			updateNewpost(data){
				console.log(data)
				// 坑 视图不更新
				this.commentslist[0].list.push(data)
				console.log(this.commentslist[0].list)
				
				// let list = this.commentslist[0].list
				
				//  this.$set(this.commentslist[0],'list',list)
				// this.$forceUpdate()
			},
			updateGuanzhu(data) {
				let params = {
					currentid: data.currentid,
					userid: data.userid
				};
				// 更新数据库
				this.doGuanzhu(params)
				// 更新commentlist的数据
				this.commentslist[this.tabIndex].list.forEach((item, index) => {
					if (item.user_id === data.userid) {
						item.isguanzhu = data.data
					}
			
				})
			
			},
			updateCollection(data){
				// 更新commentlist的数据
				this.commentslist[this.tabIndex].list.forEach((item, index) => {
					if (item.id === data.postid) {
						item.iscollection = data.data
					}
							
				})
			},
			updateDianzan(data) {
				let params = {
					currentid: data.currentid,
					postid: data.postid,
					type: data.style //0点赞 1踩 3取消点赞
				};
				// 更新数据库
				this.doDing(params)
				// 更新commentlist的数据
				this.commentslist[this.tabIndex].list.forEach((item, index) => {
					if (item.id === data.postid) {
						// 之前是踩踩的数量减1
						if (item.infonum.commentDo === 2) {
							item.infonum.cainum--
						}
						item.infonum.dingnum = data.dingnum
						item.infonum.commentDo = data.commentDo
						
					}

				})
			},
			/**
			 * @param {number} type = [1分享，2评测，3知识，4食谱] 
			 * @param {string} refresh 刷新选择
			 * 
			 */
			async getComment(type, refresh) {
				let index = this.tabIndex //模块类型
				let curpagenum = this.commentslist[type - 1].pagenum //当前页
				let params = {
					pagenum: curpagenum,
					currentid: this.$store.state.userinfo.currentid || 0
				}
				let [err, res] = await this.$http.get(`/posts/postclass/${type}`, params)
				//返回数据库数组
				let list = res.data.list
				this.commentslist[type - 1].total = res.data.total
				this.commentslist[type - 1].list = this.commentslist[type - 1].pagenum > 1 ? this.commentslist[type - 1].list.concat(
					list) : list
			},
			// 点赞
			async doDing(params) {
				await this.$http.post('/posts/support', params, {
					token: true,
					checkToken: true
				})
			},
			async doGuanzhu(params) {
				await this.$http.post('/posts/follow', params, {
					token: true,
					checkToken: true
				})
				uni.showToast({
					title: '关注成功'
				})
			},
			// 加载数据库的数据
			getFirstData() {
				let index = this.tabIndex
				this.commentslist[index].pagenum = 1;
				this.getComment(index + 1);
				this.commentslist[index].loadMoreTip = "上拉加载更多"
				// 关闭下拉刷新
				uni.stopPullDownRefresh();

			},
			// 切换tab栏
			changeTabIndex(index) {
				this.tabIndex = index

			},
			// 左右滑动，tab栏跟着滑动
			tabSameSlide(e) {
				this.tabIndex = e.detail.current
			},
			// 上拉加载更多事件
			loadMoreData() {
				let index = this.tabIndex;
				let curpagenum = this.commentslist[index].pagenum
				let totalpage = Math.ceil(this.commentslist[index].total / 6)
				// 进行判断是否最后一页
				console.log(this.commentslist[index].total)
				if (curpagenum > totalpage) {
					uni.showToast({
						title: '我也是有底线的',
						icon: 'none'
					})
					this.commentslist[index].loadMoreTip = "我也是有底线的"
					return;
				}
				// 防止下拉太多次
				if (this.commentslist[index].loadMoreTip !== '上拉加载更多') {
					return;
				}
				this.commentslist[index].loadMoreTip = '加载中......';
				// 模拟数据请求
				this.commentslist[index].pagenum++;
				// 根据index,从数据库获取数据
				this.getComment(index + 1);
				this.commentslist[index].loadMoreTip = "上拉加载更多"
			},
		}
	}
</script>

<style scoped>
	.comment-container {
		width: 100%;
	}

	.uni-tab-bar {
		background-color: #F7F7F7;

	}

	.shipu-content {
		flex-wrap: wrap;
	}

	.nothing {
		font-size: 30upx;
	}
</style>
