<template>
	<view>
		<!-- 状态栏 -->
		<uni-status-bar bgcolor="#6FB2DC"></uni-status-bar>
		<!-- 关闭按钮 -->
		<view class='icon iconfont icon-close guanbi-icon' @tap="back"></view>
		<!-- 引入背景图 -->
		<image class="loginhead" src="../../static/common/logn.jpg" mode="widthFix" lazy-load></image>
		<!-- 输入框+按钮 -->
		<view>
			<template v-if="!status">
				<!-- 账户密码登陆 -->
				<input type="text" v-model="username" class="uni-input comment-input" placeholder="昵称/手机号/邮箱" />
				<view class="login-input-box">
					<input type="text" v-model="password" password class="uni-input common-input forget-input" placeholder="请输入密码" />
					<view class="forget u-f-ajc login-font-color">忘记密码</view>
				</view>
			</template>
			<template v-else>
				<!-- 验证码登陆 -->
				<view class="login-input-box">
					<view class="phone u-f-ajc">+86</view>
					<input type="text" v-model="phone" class="uni-input common-input phone-input" placeholder="手机号" />
				</view>
				<view class="login-input-box">
					<input type="text" v-model="yanzhengma" class="uni-input common-input forget-input" placeholder="请输入验证码" />
					<view class="forget u-f-ajc login-font-color yanzhengma" @tap=getCode>
						<view class="u-f-ajc" :class="{'disabled': timecode > 0}">{{!timecode ? textcodetip : timecode + 's'}}</view>
					</view>
				</view>
			</template>
			<button class="user-set-btn" :loading="loading" :class="{'user-set-btn-disable':disabled}" type="primary" @tap="submit"
			 :disabled="disabled">登录</button>
		</view>

		<!-- 登录状态切换 -->
		<view class="login-status u-f-ajc login-padding login-font-color" @tap="onChangeLoginStatus">
			{{status?'账户密码':'验证码'}}登录<view class="icon iconfont icon-arrow-right login-font-color"></view>
		</view>

		<!-- 第三方登陆暂时不用 -->
		<!-- <view class="other-login-title u-f-ajc login-padding login-font-color">第三方登录</view>
		<other-login></other-login> -->

		<!-- 协议 -->
		<view class="login-rule u-f-ajc login-padding login-font-color">
			注册即代表您同意<view>《XXX协议》</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "../../components/uni-status-bar/uni-status-bar.vue";
	// import otherLogin from "../../components/my/other-login.vue";
	export default {
		components: {
			uniStatusBar,
			// otherLogin
		},
		data() {
			return {
				status: false, //false 切换到验证码登录 true切换到账户登录
				disabled: true,
				loading: false,
				username: '',
				password: '',
				phone: '',
				yanzhengma: '',
				timecode: 0, // 0显示验证码文字
				textcodetip: '获取验证码' //验证码按钮文字

			}
		},
		watch: {
			username() {
				this.onCheckInput();
			},
			password() {
				this.onCheckInput();
			},
			phone() {
				this.onCheckInput();
			},
			yanzhengma() {
				this.onCheckInput();
			}
		},
		methods: {
			// 切换登录方式初始化表单
			initial() {
				this.username = '';
				this.password = '';
				this.phone = '';
				this.yanzhengma = '';
			},
			// 校验手机号
			checkPhone() {
				//手机号正则
				let mPattern = /^1[34578]\d{9}$/;
				if (!mPattern.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return false;
				}
				return true;


			},
			// 校验表单
			onCheckInput() {
				if ((this.password && this.username) || (this.yanzhengma && this.phone)) {
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			// 切换登录方式
			onChangeLoginStatus() {
				this.initial()
				this.status = !this.status
			},

			back() {
				// 返回上一步
				uni.navigateBack({
					delta: 1
				})
				console.log('返回上一步')
			},
			getCode() {
				if (!this.checkPhone()) {
					return
				}
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
			async getCuruserInfo() {
				let userid = this.$store.state.userinfo.currentid ||0
				let [err, res] = await this.$http.get(`/users/${userid}`)
				Object.assign(this.$store.state.userinfo, res.data.info)
				// 7天内饮食
				let data = await this.$http.post('/users/seveneat', {}, {
					token: true
				})		
				this.$store.state.seventeat = data[1].data.data
				// 7天内运动
				  data = await this.$http.post('/users/sevensport', {}, {
					token: true
				})
				this.$store.state.sevensport = data[1].data.data
			},
			// 提交登录
			async submit(option = {}) {
				// 账户密码登录
				if (!this.status) {
					//用户名正则，4到16位（字母，数字，下划线，减号）
					let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
					if (!uPattern.test(this.username)) {
						uni.showToast({
							icon: 'none',
							title: '用户名错误'
						})
						return;
					}
					console.log("提交登录")
					uni.showLoading({
						title: '登录中',
						mask: true
					})
					let [error, res] = await this.$http.post('/users/login', {
						username: this.username,
						password: this.password
					}, )
					// 登录成功
					if (res.statusCode === 200) {
						// 保存登录状态
						this.$store.state.token = true;
						let userpic= res.data.myinfo.userpic
						if(userpic.indexOf('http') === -1 && userpic.indexOf(this.config.baseUrl) === -1) {
							res.data.myinfo.userpic = this.config.baseUrl + userpic
						}
						this.$store.state.userinfo = res.data.myinfo
						//保存本地
						uni.setStorageSync('token', res.data.token)
						// 关闭登录中
						uni.hideLoading()
						uni.showToast({
							title: '登录成功'
						})
						// 查询当前用户信息
						this.getCuruserInfo();
						// 更新未登录时的文章
						let data = {
							type:'updateLists'
						}
						uni.$emit('updatePostData',data)
						if (!option.Noback) {
							uni.navigateBack({
								delta: 1
							})
						}
					} else {
						//登录失败
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						uni.hideLoading()
						return false;

					}
					// return 不执行下一种登录
					return true;
				}

				// 验证码登录
				if (this.checkPhone()) {
					console.log("提交登录")
					uni.showLoading({
						title: '登录中',
						mask: true
					})
					let [err, res] = await this.$http.post('/users/phoneLogin', {
						phone: this.phone,
						code: this.yanzhengma
					}, )
					// 登录成功
					if (res.statusCode === 200) {
						// 保存登录状态
						this.$store.state.token = true;
						let userpic= res.data.myinfo.userpic
						if(userpic.indexOf('http') === -1 && userpic.indexOf(this.config.baseUrl) === -1) {
							res.data.myinfo.userpic = this.config.baseUrl + userpic
						}
						this.$store.state.userinfo = res.data.myinfo
						
						//保存本地
						uni.setStorageSync('token', res.data.token)
						// 关闭登录中
						uni.hideLoading()
						uni.showToast({
							title: '登录成功'
						})
						// 查询当前用户信息
						this.getCuruserInfo();
						// 更新未登录时的文章
						let data = {
							type:'updateLists'
						}
						uni.$emit('updatePostData',data)
						
						// 返回上一步
						if (!option.Noback) {
							uni.navigateBack({
								delta: 1
							})
						}
					} else {
						//登录失败
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						uni.hideLoading()
						return false;

					}
				}



			}

		}
	}
</script>

<style scoped>
	@import "../../common/form.css";

	.login-font-color {
		color: #BBBBBB;
	}

	.login-padding {
		padding: 20upx 0;
	}

	.guanbi-icon {
		position: fixed;
		top: 60upx;
		left: 30upx;
		font-size: 40upx;
		font-weight: bold;
		color: #332F0A;
		z-index: 9999;
	}

	.loginhead {
		width: 100%;
	}

	.other-login-title {
		position: relative;
	}

	/* 左右增加横线，横线中间 */
	.other-login-title:before,
	.other-login-title:after {
		content: '';
		position: absolute;
		background: #BBBBBB;
		height: 1upx;
		width: 100upx;
		top: 50%;
	}

	.other-login-title:before {
		left: 25%;
	}

	.other-login-title:after {
		right: 25%;
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
