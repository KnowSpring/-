// 引入配置文件
import config from "./config.js";
import context from "../../main.js"
export default {
	config: {
		baseUrl: config.webUrl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",
	},
	request(options = {}) {
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl + options.url;
		// TODO：token增加等操作,传入true表示需验证
		if (options.token) {
			// 验证用户是否登录
			let token = uni.getStorageSync('token')
			if (!this.checkToken(options.checkToken)) return;
			options.header.Authorization = token;
		}
		return uni.request(options);
	},
	get(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	// 验证用户是否登录
	checkToken(checkToken) {
		// checkToken false不需验证token,true需要且有值
		if (checkToken && !context.$store.state.token) {
			uni.showToast({
				title: '请先登录',
				icon: "none"
			})
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return false;
		}
		return true;
	},
}
