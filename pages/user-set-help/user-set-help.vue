<template>
	<view  class="body">
		<view>
			<uni-collapse>
				<block v-for="(item,index) in list" :key="index">
					<!-- 由于有两个solt,通过传在组件内改一下，传props数据  contentdata -->
					<uni-collapse-item :title="item.title" :show-animation="true" :contentdata="item.content"></uni-collapse-item>
				</block>
			</uni-collapse>
		</view>
		
		<view>
			<button class="user-set-btn" 
			type="primary">意见反馈</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from "../../components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from "../../components/uni-collapse-item/uni-collapse-item.vue"
	export default {
		components:{
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				list:[
					{
						title:"基础代谢计算器",
						content:"http://www.erun360.com/channels/tools/BMR.aspx"
					},
					{
						title:"忘记账号/昵称/密码怎么办？",
						content:"111111111"
					},
					{
						title:"怎么搜索/查找/关注/取关用户？",
						content:"222222"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import "../../common/form.css";
</style>
