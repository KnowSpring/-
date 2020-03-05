<template>
	<view class="body">
		<input type="text" v-model="password" class="uni-input common-input center" password placeholder="输入新密码" />

		<input type="text" v-model="renewpassword" class="uni-input common-input center " password placeholder="输入确认密码" />
		<view class="login-input-box">
			<view class="phone u-f-ajc">+86</view>
			<input type="text" v-model="phone" disabled class="uni-input common-input phone-input" placeholder="手机号" />
		</view>
		<view class="login-input-box">
			<input type="text" v-model="yanzhengma" class="uni-input common-input phone-input" placeholder="请输入验证码" />
			<view class="forget u-f-ajc login-font-color yanzhengma" @tap=getCode>
				<view class="u-f-ajc" :class="{'disabled': timecode > 0}">{{!timecode ? textcodetip : timecode + 's'}}</view>
			</view>
		</view>

		<button class="user-set-btn" :loading="loading" :class="{'user-set-btn-disable':disabled}" type="primary" @tap="submit"
		 :disabled="disabled">完成</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: "",
				renewpassword: "",
				phone: '',
				yanzhengma: '',
				disabled: true,
				loading: false,
				timecode: 0, // 0显示验证码文字
				textcodetip: '获取验证码' //验证码按钮文字
			}
		},
		watch: {

			password(val) {
				this.change();
			},
			renewpassword(val) {
				this.change();
			},
			yanzhengma() {
				this.change();
			}
		},
		onShow() {
			this.init()
			this.phone=this.$store.state.userinfo.phone
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
				// 表单密码验证码都不为空时，开启完成按钮
				if (this.password && this.renewpassword && this.yanzhengma) {
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			// 验证层
			check() {
				if (!this.password || this.newpassword == "") {
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.renewpassword || this.renewpassword == "") {
					uni.showToast({
						title: '确认密码不能为空',
						icon: "none"
					});
					return false;
				}
				if (this.password !== this.renewpassword) {
					uni.showToast({
						title: '确认密码和新密码不一致',
						icon: "none"
					});
					return false;
				}
				if (!this.yanzhengma || this.yanzhengma == "") {
					uni.showToast({
						title: '验证码不能为空',
						icon: "none"
					});
					return false;
				}
				return true;
			},
			// 获取验证码
			getCode() {
				if (this.timecode > 0) {
					uni.showToast({
						title: '请稍等',
						icon: 'loading'
					})
					return;
				}
				// 请求服务器，发送验证，成功开始倒计时
				this.timecode = 3;
				let timer = setInterval(() => {
					this.timecode--;
					if (this.timecode <= 0) {
						clearInterval(timer);
						// 赋值严谨
						this.timecode = 0;
						this.textcodetip = "再次获取"
					}
				}, 1000)

			},
			//提交
			async submit(option = {}) {
				let data; //响应对象
				this.loading = true;
				this.disabled = true;
				if (!this.check()) {
					this.loading = false;
					this.disabled = false;
					return;
				}
				// 提交服务器
				let params = {
					password: this.password,
					phone: this.phone,
					code: this.yanzhengma
				}
				try {
					// 未登录解析错误
					let [err, res] = await this.$http.post('/users/setpassword', params, {
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
					// 修改state状态
					this.$store.commit('changeUserinfo',{key:'password',value:true})
					// 返回上一层
					if (!option.Noback) {
						uni.navigateBack({
							delta: 1
						})
					}
				}


			}
		}
	}
</script>

<style>
	@import "../../common/form.css";

	.body {
		width: 100%;
	}

	.center {
		text-align: center;
	}

	.login-font-color {
		color: #BBBBBB;
	}

	.login-input-box {
		position: relative;
	}

	.login-input-box .forget-input {
		padding-right: 150upx;
	}

	.login-input-box .forget,
	.login-input-box .phone {
		position: absolute;
		top: 0;
		height: 100%;
		z-index: 100;
	}

	.login-input-box .forget {
		width: 150upx;
		right: 0;
	}

	.login-input-box .phone {
		width: 100upx;
		left: 0;
		font-weight: bold;
	}

	.login-input-box .phone-input {
		padding-left: 100upx;
		font-weight: 600;
	}

	.yanzhengma view {
		background-color: #489BCB;
		color: #FFFFFF;
		border-radius: 10upx;
		font-size: 25upx;
		width: 200upx;
		padding: 10upx 0;
	}

	.yanzhengma .disabled {
		background-color: #EEEEEE;
		color: #BBBBBB;
	}
</style>
