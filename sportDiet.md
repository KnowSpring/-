# 项目记录

### 动画
```html
<view class="text-area animated" hover-class="fadeIn" hover-start-time="800">
			<text class="title">{{title}}</text>
</view>
```
###  选择器
view:nth-child()  view:nth-of-type(）
### flex布局
 左： display: flex
 右： display: flex justify-content: flex-end
 flex: 1,类似float 
 不会压缩： flex-shrink: 0 ;
 左右: 左固定，右:flex:1占满整剩余空间
 让文字居中 :
 ```css
 display:flex; justify-content: center; align-items: center;   flex-shrink: 0  
 ```
### class 
age > 10 ? class1:class2  {class3 :  条件}  
this.isshow = !this.isshow
### block
<block  v-show="isshow"></block>
计算属性加 100kg
### flex优化写法
相同代码优化一下
```css
u-f, u-f-ac,u-f-ajc { display: flex;}
u-f-ac,u-f-ajc{ align-items:center}
u-f-ajc{justify-content:center}
u-f-jbc{
	justify-content: space-between;
}
```
### 颜色
调颜色：在谷歌调试器点击修改，随便一个网页
### import 
组件尽量跟class同名, comment-list  comment
```
<style scoped>只在当前组件有用，不会污染其他组件
```
### 模板
用官方hello模板的组件，现在pages.json查找要找的内容，再该pages目录 template复制
找自定义模板：先在pages.json查找要找的内容（导航栏） 在pages目录 找exUI（nav-bar) 通过关键字找 找到组件(uni-nav-bar) 在components目录找
数组存对象，该对象存数组[{list:[]}]
### 顶踩功能
switch
### 选中区域
双击该区域
### 父传子
直接将props的值放在data, 
```js
props: {
			item: Object,
		},
data(){ 
	return{
			postItem:this.item
		}
	}
```
### 图片
#### 圆
 width: ,height,border-radius: 100%;
 #### 模糊
 filter: blur(10px)
 <!-- 模糊背景 -->
 ```html
 <view class="topic-bg">
	<image :src="item.titlepic" mode="aspectFill" lazy-load></image>
 </view>
 ```
 ```css
 .topic-bg{
 	width: 100%;
 	height: 300upx;
 	position: relative;
 	overflow: hidden;
 }
 .topic-bg>image{
 	width: 100%;
 	position: absolute;
 	filter: blur(10px);
 }
 ```
### 文字下划线
width: 70px; border-top: 6px sold #ccc;border-bottom;border-radius: 100%;
### 组件
 在不同运用是不一样的tab有两个，三个，多个；组件内style='itemStyle',  使用<组件名 :itemStyle = 'itemStyle'/> 
### 伪元素
 气泡的小三角 positive: absolute;left:-30upx; right: 0 ; top:20upx; width: 0; height: 0; content: '';border: 16upx sold #ccc
 ### 注意
 template内不能使用函数
 ### 内减
 box-sizing: border-box; width: auto;
 ### 分享
 ### 模态框
```css
模态框
.papar-left-popup-mask{
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 1999;
}
点击层
.papar-left-popup{
	position: fixed;
	right: 0;
	top: 100upx;
	background: #FFFFFF;
	z-index: 2000;
	width: 55%;
	box-shadow: 1upx 1upx 20upx 2upx #CCCCCC;
}
```
 ### 左右横线
```css
	/* 左右增加横线，横线中间 */
	.other-login-title:before,.other-login-title:after{
		content:'';
		position: absolute;
		background: #BBBBBB;
		height: 1upx;
		width: 100upx;
		top: 50%;
	}
	```
### 某一行 一块固定
```css
.login-input-box .forget-input{
	padding-right: 150upx;
}
.login-input-box .forget,.login-input-box .phone{
	position: absolute;
	top: 0;
	height: 100%; //为了一样高
	z-index: 100;
}
.login-input-box .forget{
	width: 150upx;
	right: 0;
}

```
### 每一个方法只做一件事 
### 其他登录方式 可以参考代码写法
```js
this.providerList = result.provider.map((value) => {
						let providerName = '';
						let iconName = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								iconName = 'weixin'
								break;
							case 'qq':
								providerName = 'QQ登录'
								iconName = 'QQ'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								iconName = 'weibo'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'toutiao':
								providerName = '头条登录'
								break;
						}
						return {
							name: providerName,
							id: value,
							icon:iconName
						}
					});
```
### 中间垂直排着三个元素
 .u-f-ajc .u-f-column
### 个人中心设置背景图
   通过设置定位覆盖
   ```html
   <view class="user-space-head">
	   <image :src="getBgImg" mode="widthFix" lazy-load @tao="changeImage"></image>
	   <!-- 定位在图片的元素-->
	   <view class="user-space-head-info"></view>
   </view>
   ```
   ```css
   .user-space-head{
   	position: relative;
   	height: 500upx;
   	overflow: hidden;
   }
   .user-space-head>image{
   	width: 100%;
   }
   .user-space-head-info{
   	position: absolute;
   	top: 150upx;
   }
   ```
   ### 滚动窗口
 this.scrolRef.current.scrollIntoView()
 
 ### 类别控制子所有元素
 父： :class="{'user-chat-me':item.isme}"
 ```css
 .user-chat-me{
 	justify-content: flex-end;
 }
 .user-chat-me .user-chat-list-body{
 	margin-right: 20upx;
 	margin-left: 100upx;
 }
 .user-chat-me .user-chat-list-body:after{
 	left: auto;
 	right: -30upx;
 	border-color: transparent transparent transparent #F4F4F4;
 }
 .user-chat-list-body>image{
 	max-width: 150upx;
 	max-height: 200upx;
 }
 /* 左右空，剩下自己 */
 margin-right: 20upx;
 margin-left: 100upx;
 ```
###
```js
		const ting = function(data) {
			console.log('测试2：' + data)
		}

		const Chat = {
			isopen: false,
			ceshi: function() {},
			talk: function() {
				// 调用当前对象里的方法
				this.ceshi();
				// 调用当前文件其他方法
				ting('2222')
			}

		}
```
###
125 126 137
### 截取图片类型
```js
//文件路径
var filePath = "file:///storage/emulated/0/opmark/User/Pic/hangge.png";
//获取最后一个.的位置
var index= filePath.lastIndexOf(".");
//获取后缀
var ext = filePath.substr(index+1);
//输出结果
console.log(ext);
```
### forEach 遇到await 
忽略priomse