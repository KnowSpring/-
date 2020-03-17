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
class="{'icon-arrow-right':!item.data}">{{item.data||''}}
data:this.User.userinfo.email || "未绑定"
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
忽略priomse,改用for of
#### 空格 
	地址栏传参传不过，id后多了空格	url: '../../pages/user-space/user-space?id ='+this.$store.state.userinfo.currentid
### null
Cannot read property 'replace' of undefined 覆盖时可能有些值没有为null
### 报错
Uncaught (in promise) TypeError: undefined is not iterable! [err,data]解构不成功
 Cannot read property '0' of undefined 遍历一个空数组（名字写错）
 Unexpected token o in JSON at position 1
未授权问题在options.header.token 改为 options.header.Authorization
### 图片上传
```js
  // 图片上传
  imageUpload(ctx) {
    // 获取body中携带的参数
    const { account, typeName } = ctx.request.body
    // account:123456
    // typeName:水果

    // 通过ctx.request.files.file方法获取上传的文件对象

    // 获取文件名称与文件所在路径
    let { name: filename, path } = ctx.request.files.file
    // //获取最后一个.的位置
    // let index = filename.lastIndexOf('.')
    // //获取后缀
    // let ext = filename.substr(index)
    // filename = Math.floor(Math.random() + 1000) + '' + Date.now() + ext

    // 创建文件输入流
    const fileReader = fs.createReadStream(path)

    // 文件将要的存放文件夹路径
    const fileDir = `${__dirname}/../../upload/images/${typeName}`

    // 判断目录是否存在,目录不存在则创建
    if (!fs.existsSync(fileDir)) {
      try {
        fs.mkdirSync(fileDir)
      } catch (e) {
        console.error(e)
      }
    }

    // 保存文件的最终路径 (文件夹路径+文件名)
    const filepath = `${fileDir}/${filename}`

    // 创建文件输出流
    const fileWriter = fs.createWriteStream(filepath)

    // 写入文件数据
    fileReader.pipe(fileWriter)

    // 保存相对路径
    let relpath = `images/${typeName}/${filename}`

    // 至此文件已上传完成
    return relpath
  }
}
module.exports = tool
```
### koa 访问服务器图片
```js
app.js
const Koa = require('koa')
const path = require('path')
const staticFiles = require('koa-static')
const app = new Koa()
// 1.静态资源服务，指定对外提供访问的根目录
app.use(staticFiles(path.join(__dirname, 'upload')))
//路径写法(不用写upload)
localhost:5000/images/1.png
```
### 获取部分属性
```js
const obj = {
    name: 'jack',
    id: 1,
    birthday: '12-07-09',
    phone: 1232131231
};
const obj_new = JSON.parse(JSON.stringify(obj,["name","id"]));//{name: "jack", id: 1}
//第二种(不建议)
const { id, name } = obj;
const newObj = { id, name }
//第三种
const {phone,...newObj} = obj//除了phone都有
//数组 [,,newArr] = arr
//第四种
更好的 extend() 函数详见 JavaScript权威指南-第6版

var obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5
};

function extend(obj) {
    var o = {},
	//方法返回一个新的数组对象 Array.prototype.slice.call(arguments,1); 从第二个开始
        attr = Array.prototype.slice.call(arguments).slice(1);

    attr.forEach(function(val, index) {
        if (val in obj) { o[val] = obj[val]; }
    });

    return o;

}
console.log(extend(obj, 'c', 'b')); //{ c: 3, b: 2 }

```
### a->b->c多重嵌套通讯
```html
A组件
<template>
 		<child1
 			:p-child1="child1"
 			:p-child2="child2"
		 	v-on:test1="onTest1" //此处监听了两个事件，可以在B组件或者C组件中直接触发
 			v-on:test2="onTest2"> 
		 </child1>
</template>
B组件
<template>
 		<p>props: {{pChild1}}</p>
 		<p>$attrs: {{$attrs}}</p>
 		<!-- C组件中能直接触发test的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
 		<!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中			 props声明的） -->
 		<child2 v-bind="$attrs" v-on="$listeners"></child2>
 
<script>
 import Child2 from './Child2.vue';
 export default {
 	props: ['pChild1']
	 	data () {
	 		return {};
	 	},
	 	inheritAttrs: false,
	 	components: { Child2 },
	 	mounted () {
	 		this.$emit('test1');
	 	}
	 };
 </script>
 C组件
 <template>
  <div class="child-2">
 	 <p>in child2:</p>
  	<p>props: {{pChild2}}</p>
  	<p>$attrs: {{$attrs}}</p>
  <hr>
  </div>
 </template>
 <script>
 export default {
 	 props: ['pChild2'],
 	 data () {
 	 	return {};
 	 },
 	 inheritAttrs: false,
 	 mounted () {
 	 	this.$emit('test2');
 	 }
 };
 </script> 
 ```
 ### 注意传对象指针,要进行深拷贝 数据在组件处理完传给父组件
 ### 父传子 数组   
合并成一个对象传入 obj:{arr:[]},再监听对象
 原因：后台请求的数据，加载完毕之后才传入的，需要在组件中监听传入数据的变化
 然后我watch监听props传过来的值，然后在监听事件里面赋值data值
### getServerData获取不到数据 很大可能异步，调用请求后台数据方法没有使用await
	async created() {
			await this.getSevenData();
			this.getServerData();
		},
### data(){return {dayconsume:this.$store.state.dayconsume}}//因为只执行一次 dayconsume不会改变