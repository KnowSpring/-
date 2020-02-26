<template>
	<view class="sport-container">
		<block v-for="(item,index) in sportKinds" :key="index">
			<view class="user-set-userinfo-list u-f-ac">
				<view class="u-f1">{{item.name}}</view>
				<view class="u-f1">
					<view class="red">{{item.unit}}</view>
					<view class="u-f-ac">千卡/60分钟</view>
				</view>
				<view class="u-f1 u-f-ajc">
					<input class="number" type="number" maxlength="4" v-model="sportTime[item.english]">
					<view> 分钟</view>
				</view>
			</view>

		</block>
		<!-- 固定栏 -->
		<view class="advise-fixed u-f-ajc">
			运动总消耗：<text class="red">{{totalHeat}}</text> 千卡
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalHeat: 0,
				sportTime: {
					palouti: 0,
					walkfast: 0,
					walkslow: 0,
					runfast: 0,
					runslow: 0,
					bike: 0,
					basketball: 0,
					football: 0,
					badminton: 0, //羽毛球
					tennis: 0,
					volleyball: 0,
					tabletennis: 0, //乒乓球
					swim: 0,
					dance: 0,
					yujia: 0
				},
				sportKinds: [{
						name: '爬楼梯',
						english: 'palouti',
						unit: 471
					},
					{
						name: '走路（快）',
						english: 'walkfast',
						unit: 349
					},
					{
						name: '走路（慢）',
						english: 'walkslow',
						unit: 113
					},
					{
						name: '跑步（快）',
						english: 'runfast',
						unit: 663
					},
					{
						name: '跑步（慢）',
						english: 'runslow',
						unit: 480
					},
					{
						name: '自行车',
						english: 'bike',
						unit: 506
					},
					{
						name: '篮球',
						english: 'basketball',
						unit: 480
					},
					{
						name: '足球',
						english: 'football',
						unit: 523
					},
					{
						name: '羽毛球',
						english: 'badminton',
						unit: 393
					},
					{
						name: '网球',
						english: 'tennis',
						unit: 349
					},
					{
						name: '排球',
						english: 'volleyball',
						unit: 410
					},
					{
						name: '兵乓球',
						english: 'tabletennis',
						unit: 262
					},
					{
						name: '游泳',
						english: 'swim',
						unit: 480
					},
					{
						name: '舞蹈，健身操',
						english: 'dance',
						unit: 436
					},
					{
						name: '瑜伽，普拉提',
						english: 'yujia',
						unit: 174
					}
				]
			}
		},
		watch: {
			sportTime: {
				deep: true,
				handler: function(newSportTime) {
					this.totalHeat = 0;
					let total = this.totalHeat;
					let time = 0;
					 this.sportKinds.map((item) => {
						newSportTime[item.english] === '' ? 0 : newSportTime[item.english]
						time = (newSportTime[item.english]/60).toFixed(2)
						total +=  time * item.unit
					})
					this.totalHeat = total.toFixed(2);
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.sport-container {
		width: 100%;
		background-color: #F4F4F4;
		margin-bottom: 140upx;
		;
	}

	.user-set-userinfo-list {
		padding: 30upx;
		margin-top: 10upx;
		background-color: #FFFFFF;
	}

	.user-set-userinfo-list>view:first-child {
		font-size: 32upx;
		font-weight: 600;
		color: #353535;
	}

	.red {
		color: #F01414;
		font-size: 30upx;
		margin-right: 4upx;
	}

	.number {
		width: 100upx;
		text-align: right;
	}

	/* 固定行 */
	.advise-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 140upx;
		padding: 0 30upx;
		background-color: #FFFFFF;
		border-top: 2upx solid #CCCCCC;
		border-bottom: 2upx solid #CCCCCC;
		font-size: 32upx;
		font-weight: 700
	}
</style>
