<template>
	<view class="body">
		<input type="text" v-model="email" class="uni-input common-input" placeholder="输入需要绑定的邮箱" />

		<input type="text" v-model="password" password class="uni-input common-input" placeholder="请输入密码" />

		<button class="user-set-btn" :loading="loading" :class="{'user-set-btn-disable':disabled}" type="primary" @tap="submit"
		 :disabled="disabled">完成</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				password: "",
				disabled: true,
				loading: false
			}
		},
		watch: {
			email(val) {
				this.change();
			},
			password(val) {
				this.change();
			},
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				if (!this.$store.state.userinfo.phone) {
					uni.showModal({
						title: '提示',
						content: '请先登录',
						confirmText: '去登录',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}
						}
					})
				}
			},
			// 监听输入框
			change() {
				if (this.email && this.password) {
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			// 验证层
			check() {
				if (!this.email || this.email == "") {
					uni.showToast({
						title: '邮箱不能为空',
						icon: "none"
					});
					return false;
				}

				// 验证邮箱格式
				let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if (!ePattern.test(this.email)) {
					uni.showToast({
						title: '请输入正确邮箱格式',
						icon: "none"
					});
					return false;
				}

				if (!this.password || this.password == "") {
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					});
					return false;
				}
				return true;
			},
			// 提交
			async submit(option={}) {
				let data; //响应对象
				this.loading = true;
				this.disabled = true;
				if (!this.check()) {
					this.loading = false;
					this.disabled = false;
					return;
				}
				// 提交服务器(后期可以封装一下函数)
				let params = {
					password: this.password,
					email: this.email
				}
				try {
					// 未登录解析错误
					let [err, res] = await this.$http.post('/users/email', params, {
						token: true,
						checkToken: true
					})
					data = res
				} catch (e) {
					this.loading = false;
					this.disabled = false;
					uni.showToast({
						title: '未登录',
						mask: false,
						duration: 1500,
						icon: 'none',
					});
					throw '未登录'
				}
				uni.showToast({
					title: data.data.msg,
					mask: false,
					icon: 'none',
					duration: 1500
				});
				// 修改按钮状态
				this.loading = false;
				this.disabled = false;
				if (data.statusCode === 200) {
					// 返回上一层
					if (!option.Noback) {
						// 修改state状态
						this.$store.commit('changeUserinfo',{key:'email',value:this.email})
						uni.navigateBack({
							delta: 1
						})
					}
				}
				this.loading = false;
				this.disabled = false;
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
</style>
