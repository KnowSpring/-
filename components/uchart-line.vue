<template>
	<view class="qiun-columns" v-if="(eatLength)|| (sportLength)">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light u-f-ac">
				<view class="icon iconfont icon-zongjie" ></view>最近7天的饮食和消耗
			</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		</view>
	</view>
</template>
<script>
	import uCharts from '../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				seveneat:[],
				sevensport:[]
			}
		},
		computed:{
			eatLength(){
				return this.$store.state.seventeat.length
			},
			sportLength(){
				return this.$store.state.sevensport.length 
			}
		},
		 created() {
			_self = this;
			this.cWidth = uni.upx2px(690);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		beforeUpdate(){
			_self = this;
			this.cWidth = uni.upx2px(690);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},

		methods: {
			getServerData() {
				let categories = [];
				let series = [{
					name: '摄入量/kcal',
					data: []
				},
				{
					name: '消耗量/kcal',
					data: []
				},{
					name: '蛋白质/g',
					data: []
				}
				]
				if(this.eatLength>0){
					this.$store.state.seventeat.map((item)=>{
						categories.push(item.date)
						series[0].data.push(item.dayheat)
						series[2].data.push(item.dayprotein)
					})
				}
				
		        if(this.sportLength>0){
					this.$store.state.sevensport.map((item)=>{
						series[1].data.push(item.daysport)
					})
				}
				
				let LineA = {
					categories,
					series
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				_self.showLineA("canvasLineA", LineA);
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: true,
					dataLabel: true,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						scrollBackgroundColor: '#F7F7FF',
						scrollColor: '#DEE7F7',
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						lineStyle: 'straight'
					},
				});
			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},

		},

	}
</script>
<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 690upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 690upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.qiun-title-dot-light {
		font-weight: 700;
		padding: 30upx;
	}
</style>
