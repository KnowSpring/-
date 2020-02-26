<template>
	<view class="body">
		<view class="user-set-about-t u-f-ajc ">
			<view>版本号：</view>
			<view class="version">version 1.0.0</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
	</view>
</template>

<script>
	import homeListItem from "../../components/my/my-list-item.vue";
	export default {
		components: {
			homeListItem
		},
		data() {
			return {
				list: [{
						icon: "",
						name: "新版本检测",
						clicktype: "",
						url: ""
					},
					{
						icon: "",
						name: "健身美食用户协议",
						clicktype: "",
						url: ""
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.body {
		width: 100%;
		padding: 0 20upx;
	}

	.version {
		padding: 20upx 0;
	}
</style>
