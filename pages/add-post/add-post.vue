<template>
	<view>
		<!-- 自定义导航 -->
		<uni-nav-bar :statusBar="true" rightText="发布" leftIcon="back" @clickLeft="back" @clickRight="post">
			<view class="u-f-ajc" @tap="privacy">{{barTitle}}
				<view class="icon iconfont icon-add-cart"></view>
			</view>
		</uni-nav-bar>
		<!-- 多行输入栏 -->
		<view class="uni-textarea">
			<textarea v-model="textValue" placeholder="说出一句话吧" />
			</view>
		<!-- 上传图片 -->
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title">点击可预览选好的图片</view>
						<view class="uni-uploader-info">{{imageList.length}}/9</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="icon-shanchu icon iconfont icon-add-cart" @tap="deteleImg(index)"></view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
								</view>
							</block>
							<view class="uni-uploader__input-box">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示框 -->
		<uni-popup :show="showpopup" position="middle" mode="fixed" :hidePopup="hidePopup">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/datapic/1.jpg" mode="widthFix"></image>
				</view>
				<view>1、涉及黄色，政治，广告及骚扰信息</view>
				<view>2、涉及人身攻击</view>
				<view>3、透漏他人隐私</view>
				<view>一经核实将被封禁，情急严重者将永久封禁</view>
				<button type="primary" @tap="hidePopup">我知道了</button>
			</view>
		</uni-popup>
		

	</view>
</template>

<script>
	// let lookSet = []
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	export default {
		components: {
			uniNavBar,
			uniPopup
		},
		data() {
			return {
				barTitles:['所有人可见',"仅自己可见"],
				barTitle:'所有人可见',
				textValue:'',//文本域值
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				showpopup:true ,//默认打开弹出框
				isget: false //标识返回
				}
		},
		onBackPress(){
			// 沒有內容和图片直接返回
			if(!this.textValue && this.imageList.length < 1){ return;}
			if(!this.isget){
				this.saveDraft()	
			}
			return true;
		},
		methods: {
			// 返回
			back() {
				console.log('back')
				uni.navigateBack({
					delta: 1
				})
			},
			// 返回保存草稿
			saveDraft(){
				uni.showModal({
					content: '是否保存为草稿?',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if(res.confirm){
							console.log("保存")
						}else{
							console.log("不保存")
						}
						this.isget = true;
						// uni.navigateBack({
						// 	delta: 1
						// })
						uni.switchTab({
						    url: '/pages/comment/comment'
						});
					}
				});
			},
			post() {},
			// 设值可看隐私
			privacy(){
				uni.showActionSheet({
					itemList: this.barTitles,
					success: res =>{ 
						let index = res.tapIndex;
						this.barTitle = this.barTitles[index]
						} 
				})
				
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {		
						return;	
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					// success: (res) => {
					// 	console.log(res)
					// 	// res.tempFiles用于上传
					// 	// this.imageList = this.imageList.concat(res.tempFilePaths);
					// 	this.$emit('uploud',this.imageList)封装成组件子传父数据
						
					// },
					 success: (res) => {
						 console.log(res)
						 this.imageList = this.imageList.concat(res.tempFilePaths);
							this.imageList.map((item,index)=>{
								uni.uploadFile({
								url: 'http://localhost:5000/api/posts/images', //仅为示例，非真实的接口地
								name: 'file',
								filePath:item,
								formData: {
									'user_id': '1'
								},
								success: (res) => {
									// 保存每次返回的地址
									console.log(res);
								}
							});
						})
					      
					 }
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			// 删图
			deteleImg(index){
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片',
					success: (res)=> {
						if (res.confirm) {
							this.imageList.splice(index,1);
							// this.$emit('uploud',this.imageList)封装成组件子传父数据 父组件方法接受数据赋给父imageList
						}
					}
				})
			},
			// 隐藏弹出框
			hidePopup(){
				this.showpopup=false;
			}
				

		}
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}
	.uni-uploader__file{
		position: relative;
	}
	.list-pd {
		margin-top: 50upx;
	}
	.icon-shanchu{
		z-index: 99;
		position: absolute;
		right: 0;
		top: 0;
		background: #333333;
		color: #FFFFFF;
		padding: 2upx 10upx;
		border-radius:10upx;
	}
	/* 弹出框*/
	.gonggao{
		width: 500upx;
	}
	.gonggao image{
		width: 75%;
		margin-bottom: 20upx;
	}
	.gonggao button{
		margin-top: 20upx;
	}


</style>
