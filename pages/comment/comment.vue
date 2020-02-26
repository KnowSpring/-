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
								<comment-list-fenxiang :item="item" :index="id"></comment-list-fenxiang>
							</block>
							<block v-if="bigSort.type === 'pingce' " v-for="(item,id) in bigSort.list" :key="id">
								<comment-list-pingce :item="item" :index="id"></comment-list-pingce>
							</block>
							<block v-if="bigSort.type === 'zhishi' " v-for="(item,id) in bigSort.list" :key="id">
								<comment-list-zhishi :item="item" :index="id"></comment-list-zhishi>
							</block>
							<view class="u-f u-f-jsb shipu-content">
								<block  v-if="bigSort.type === 'shipu' " v-for="(item,id) in bigSort.list" :key="id">
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
						list: [{
								userpic: "../../static/userpic/1.jpg",
								username: "昵称",
								isguanzhu: false,
								title: "我是标题",
								type: "img", // img:图文,video:视频
								titlepic: "../../static/datapic/2.jpg",
								infonum: {
									commentDo: 0, //0:没有操作，1:顶,2:踩；
									dingnum: 11,
									cainum: 11,
								},
								commentnum: 10,
								sharenum: 10,
							},
							{
								userpic: "../../static/userpic/2.jpg",
								username: "昵称",
								isguanzhu: true,
								title: "我是标题",
								type: "video", // img:图文,video:视频
								titlepic: "../../static/datapic/3.jpg",
								playnum: "20w",
								long: "2:47",
								infonum: {
									commentDo: 1, //0:没有操作，1:顶,2:踩；
									dingnum: 11,
									cainum: 11,
								},
								commentnum: 10,
								sharenum: 10,
							}
						]
					},
					{
						loadMoreTip: '上拉加载更多',
						type: 'pingce',
						list: [{
								titlepic: "../../static/datapic/pingce1.jpg",
								username: '食无票',
								title: "各类肉蛋白质含量排行",
								readnum: 22222
							}, {
								titlepic: "../../static/datapic/pingce1.jpg",
								username: '食无票2',
								title: "各类肉蛋白质含量排行2",
								readnum: 22222
							},
							{
								titlepic: "../../static/datapic/pingce1.jpg",
								username: '食无票2',
								title: "各类肉蛋白质含量排行2",
								readnum: 22222
							}
						]
					},
					{
						loadMoreTip: '上拉加载更多',
						type: 'zhishi',
						list: [

							{
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '怡文',
								content: "反反复复付付付付三生三世得到顶顶顶顶顶顶顶顶二二恶浮动的辅导辅导费",
								readnum: 22222
							}, {
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '怡文',
								content: "反反复复付付付付三生三世得到顶顶顶顶顶顶顶顶二二恶浮动的辅导辅导费",
								readnum: 22222
							}, {
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '怡文',
								content: "反反复复付付付付三生三世得到顶顶顶顶顶顶顶顶二二恶浮动的辅导辅导费",
								readnum: 22222
							},
							{
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '怡文',
								content: "反反复复付付付付三生三世得到顶顶顶顶顶顶顶顶二二恶浮动的辅导辅导费",
								readnum: 22222
							}
						]
					},
					{
						type: 'shipu',
						loadMoreTip: '上拉加载更多',
						list: [{
								userpic: "../../static/userpic/2.jpg",
								titlepic: "../../static/datapic/shipu1.jpg",
								username: '食无票',
								title: "质含量hhhhhhhhhhhhh排行",
								goodnum: 22222
							}, {
								userpic: "../../static/userpic/1.jpg",
								titlepic: "../../static/userpic/1.jpg",
								username: '食无票',
								title: "质含量ffffffasasasasasasaf排行",
								goodnum: 22222
							},
							{
								userpic: "../../static/userpic/1.jpg",
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '食无票',
								title: "各类肉蛋白ddgggggggggd质含量排行",
								goodnum: 22222
							},
							{
								userpic: "../../static/userpic/1.jpg",
								titlepic: "../../static/userpic/1.jpg",
								username: '食无票',
								title: "各类肉蛋白dddddsddd质含量排行",
								goodnum: 22222
							},
							{
								userpic: "../../static/userpic/1.jpg",
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '食无ddsd票',
								title: "各类肉蛋白ddddddd质含量排行",
								goodnum: 22222
							},
							{
								userpic: "../../static/userpic/1.jpg",
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '食无票',
								title: "各类肉蛋fffff白ddddddd质含量排行",
								goodnum: 22222
							},
							{
								userpic: "../../static/userpic/1.jpg",
								titlepic: "../../static/datapic/zhishi1.jpg",
								username: '食无票',
								title: "各类肉蛋白ssdsdsdsddddddd质含量排行",
								goodnum: 22222
							}
						]
					}

				],

			}
		},
		onload() {
			uni.getSystemInfo({
				success: res => {
					let height = res.windowHeight - uni.upx2px(100);
					this.screenWidth = res.windowWidth;
					this.swiperHeight = height;
				}
			})
		},
		// 监听原生搜索输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'

			})
		},
		//监听发布按钮
		onNavigationBarButtonTap(e) {
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
			this.getData()
		},
		methods: {
			// 模拟加载数据库的数据
			getData() {
				setTimeout(() => {
					let commentData = {
						loadMoreTip: '上拉加载更多',
						list: [{
								userpic: "../../static/userpic/1.jpg",
								username: "昵称11111",
								isguanzhu: false,
								title: "我是标题222",
								type: "img", // img:图文,video:视频
								titlepic: "../../static/datapic/3.jpg",
								infonum: {
									commentDo: 0, //0:没有操作，1:顶,2:踩；
									dingnum: 11,
									cainum: 11,
								},
								commentnum: 10,
								sharenum: 10,
							},
							{
								userpic: "../../static/userpic/2.jpg",
								username: "昵称",
								isguanzhu: false,
								title: "我是标题",
								type: "img", // img:图文,video:视频
								titlepic: "../../static/datapic/4.jpg",
								infonum: {
									commentDo: 0, //0:没有操作，1:顶,2:踩；
									dingnum: 11,
									cainum: 11,
								},
								commentnum: 10,
								sharenum: 10,
							}
						]
					}
					console.log(this.tabIndex)
					this.commentslist.splice(this.tabIndex, 1, commentData)

					// 关闭下拉刷新
					uni.stopPullDownRefresh();
				}, 2000)
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
			loadMoreData(index) {
				if (this.commentslist[index].loadMoreTip !== '上拉加载更多') {
					return;
				}
				this.commentslist[index].loadMoreTip = '加载中......';
				// 模拟数据请求
				setTimeout(() => {
					let obj = {
						userpic: "../../static/userpic/1.jpg",
						username: "昵称",
						isguanzhu: false,
						title: "我是标题",
						type: "img", // img:图文,video:视频
						titlepic: "../../static/datapic/3.jpg",
						infonum: {
							commentDo: 0, //0:没有操作，1:顶,2:踩；
							dingnum: 11,
							cainum: 11,
						},
						commentnum: 10,
						sharenum: 10,
					}
					this.commentslist[index].list.push(obj)
					this.commentslist[index].loadMoreTip = "上拉加载更多"

				}, 1000)
				// this.commentslist[index].loadMoreTip="没有更多了"
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
	.shipu-content{
		flex-wrap: wrap;
	}

	.nothing {
		font-size: 30upx;
	}
</style>
