import context from '../../main.js'
export default {
	islogin() {
		if (!context.$store.state.userinfo.phone) {
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
	isdo(){
		if(!context.$store.state.userinfo.phone){
			uni.showToast({
				title:'请先登录才可操作',
				icon:'none'
			})
			return false
		}
		return true
	}
}