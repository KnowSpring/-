<template>
	<view class="body">
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>头像</view>
			<view class="u-f-ac" @tap="changeimg">
				<image :src="personInfo.userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-fabu"></view>
			</view>
		</view>
		
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>昵称</view>
			<view class="u-f-ac">
				<!-- 昵称不可以为邮箱@ -->
				<view><input class="text-right" type="text" v-model="personInfo.username"></view>
				<view class="icon iconfont icon-fabu"></view>
			</view>
		</view>
		
		<view class="user-set-userinfo-list u-f-ac u-f-jsb" @tap="changeInfo('sex')">
			<view>性别</view>
			<view class="u-f-ac">
				<view>{{sexArr[personInfo.sex]}}</view>
				<view class="icon iconfont icon-fabu"></view>
			</view>
		</view>

	<view class="user-set-userinfo-list u-f-ac u-f-jsb">
		<view>身体体重</view>
		<view class="u-f-ac">
			<input class="text-right" type="number" v-model="personInfo.weight">
			<view> kg</view>
			<view class="icon iconfont icon-fabu"></view>
		</view>
	</view>
	<view class="user-set-userinfo-list u-f-ac u-f-jsb">
		<view>基础代谢</view>
		<view class="u-f-ac">
			<input class="text-right" type="number" v-model="personInfo.baseconsume">
			<view>kcal</view>
			<view class="icon iconfont icon-fabu"></view>
		</view>
	</view>
	<view class="user-set-userinfo-list u-f-ac u-f-jsb">
		<view>基础蛋白</view>
		<view class="u-f-ac">
			<input class="text-right" type="number" v-model="personInfo.baseprotein">
			<view> g</view>
			<view class="icon iconfont icon-fabu"></view>
		</view>
	</view>
	<view class="user-set-userinfo-list u-f-ac u-f-jsb">
		<view>运动代谢</view>
		<view class="u-f-ac">
			<input class="text-right" type="number" v-model="personInfo.sportconsume">
			<view> kcal</view>
			<view class="icon iconfont icon-fabu"></view>
		</view>
	</view>
	<view class="user-set-userinfo-list u-f-ac u-f-jsb">
		<view>运动蛋白</view>
		<view class="u-f-ac">
			<input class="text-right" type="number" v-model="personInfo.sportprotein">
			<view> g</view>
			<view class="icon iconfont icon-fabu"></view>
		</view>
	</view>

		<picker mode="date" :value="personInfo.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
			<view class="user-set-userinfo-list u-f-ac u-f-jsb">
				<view>生日</view>
				<view class="u-f-ac">
					<view>{{personInfo.birthday}}</view>
					<view class="icon iconfont icon-fabu"></view>
				</view>
			</view>
		</picker>


		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>职业</view>
			<view class="u-f-ac">
				<view>{{personInfo.job}}</view>
				<view class="icon iconfont icon-fabu"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb" @tap="openAddres">
			<view>家乡</view>
			<view class="u-f-ac">
				<view>{{personInfo.city}}</view>
				<view class="icon iconfont icon-fabu"></view>
				<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
			</view>
		</view>
		<button class="user-set-btn" type="primary" @tap="submit">完成</button>

	</view>
	</view>
</template>

<script>
	let sexArr = ['男', '女', '不限']
	// let job = ['IT', 'up主','漫画家' '秘密']
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		data() {
			return {
				sexArr: sexArr,
				personInfo: {
					userpic: "../../static/userpic/1.jpg",
					username: '昵称',
					sex: 0,
					birthday: "请填写",
					city: "请填写",
					weight: 0,
					baseconsume: 0,
					sportconsume: 0,
					baseprotein: 0,
					sportprotein: 0

				},
				cityPickerValueDefault: [0, 0, 1]
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			simpleAddress
		},
		onShow() {
			this.personInfo = JSON.parse(JSON.stringify(this.$store.state.userinfo))
		},
		methods: {
			// 修改头像
			changeimg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						this.userpic = res.tempFilePaths;
					}
				})
			},
			// 日期
			bindDateChange(e) {
				this.personInfo.birthday = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 城市
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.personInfo.city = e.label
			},

			submit() {

			},
			// 编辑性别，工作 资料
			changeInfo(type) {
				let arr = [];
				switch (type) {
					case 'sex':
						arr = sex
						break;
					case 'job':
						arr = job
						break;
				}
				uni.showActionSheet({
					itemList: arr,
					success: res => {
						switch (type) {
							case 'sex':
								this.personInfo.sex = arr[res.tapIndex];
								break;
							case 'job':
								this.personInfo.job = arr[res.tapIndex];
								break;
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";

	.text-right {
		text-align: right;
	}

	.user-set-userinfo-list {
		padding: 20upx;
		border-bottom: 1upx solid #F4F4F4;
	}

	.user-set-userinfo-list>view:first-child {
		font-size: 32upx;
		font-weight: bold;
		color: #9B9B9B;
	}

	.user-set-userinfo-list>view:last-child>image {
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}

	.user-set-userinfo-list .icon-fabu {
		margin-left: 20upx;
		color: #9B9B9B;
	}
</style>
