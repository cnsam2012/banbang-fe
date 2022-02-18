<template>
	<view class="container">

		<!-- 搜索框组件 -->
		<!-- TODO：keywords数据默认为空字符串，但仍被编译器认为存在内容，原因未知 -->
		<uni-search-bar @confirm="searchConfirm" bgColor="#eaeaea" placeholder="输入关键词" radius="20" v-model="keywords"
			cancelButton="auto" @input="refleshColl">
		</uni-search-bar>

		<!-- 仅当搜索框组件含关键词，渲染搜索结果 - 弃用：现折叠面板能根据内容多少动态调整高度 -->
		<!-- <template v-if="keywords">
			<uni-collapse>
				<view v-for="(item, i) in allNoti" :key="item.no">
					<noti-card :item='item' v-if="search(item,keywords)" :text="searchReturn(item,keywords)">
					</noti-card>
				</view>
			</uni-collapse>
		</template> -->

		<!-- 无关键词，渲染全部 - 弃用：现折叠面板能根据内容多少动态调整高度 -->
		<!-- <template v-else> -->
		<!-- 无论有无关键词，均渲染全部折叠面板 -->
		<uni-collapse v-model="openTab">
			<!-- 未读通知默认不被折叠 -->
			<!-- 使用了uni-app卡片组件 -->
			<!-- 约定 level >= 0 即为未读通知 -->
			<!-- 渲染未读通知列表 -->
			<uni-collapse-item :title="unreadNotiCountMsg" show-animation="true" name="unreadNoti" ref="unreadNoti">
				<view v-for="(item, i) in unreadNoti" :key="item.no">
					<noti-card :item='item' v-if="search(item,keywords)" :text="searchReturn(item,keywords)">
					</noti-card>
				</view>
			</uni-collapse-item>

			<!-- 默认折叠已读通知 -->
			<uni-collapse-item title="全部已读" show-animation="true" name="readNoti" ref="readNoti">
				<!-- 使用了uni-app卡片组件 -->
				<!-- 约定 level < 0 即为已读通知 -->
				<!-- 渲染已读通知列表 -->
				<view v-for="(item, i) in readNoti" :key="item.no">
					<noti-card :item='item' v-if="search(item,keywords)" :text="searchReturn(item,keywords)">
					</noti-card>
					<!-- <noti-card :item='item'></noti-card> -->
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<!-- </template> -->


	</view>

</template>

<script>
	import {
		mapState
	} from "vuex"

	export default {
		name: 'main-notiList',
		data() {
			return {
				// 搜索框关键词绑定，默认值为空
				keywords: "",

				// 计算属性  unreadNotiCountMsg: "全部未读（" + this.item.length + "）",

				// 默认展开未读
				openTab: ["unreadNoti"],
			}
		},

		// 生命周期函数，组件被挂载后调用
		mounted() {
			// console.log(this.$store.state.m_noti);
			// console.log("*****************", this.temp1.match(this.temp2));
			// console.log("*****************", this.temp1.match(this.temp3));
			// console.log("*****************", this.temp1.match(this.temp4));
			// console.log(this.unreadNoti.length);
		},

		computed: {
			// 分发 m_noti:noti.js 的 State
			...mapState('m_noti', ['allNoti', 'unreadNoti', 'readNoti']),

			unreadNotiCountMsg() {
				return "全部未读 (" + this.unreadNoti.length + ")";
			}
		},

		methods: {

			// 仅关键词为空时，改变搜索状态
			// altIsSeraching() {
			// 	if(this.keywords == "") {
			// 		this.isSearching = !this.isSearching;
			// 	}
			// },

			//返回模糊查询结果
			search(a, b) {
				return a.content.match(b)
			},
			//返回查询并替换掉后的内容
			searchReturn(a, b) {
				return a.content.replace(new RegExp(b, "gm"), '<b style="color:black!important;">' + b + '</b>')
			},

			// 响应搜索框的“搜索”动作
			searchConfirm() {
				// console.log(this.keywords);

				// 弹框提示输入的关键词
				var msg = this.keywords;
				wx.showToast({
					title: msg,
					mask: true,
					icon: 'success',
					duration: 1500
				})
			},

			refleshColl() {
				// console.log(this.$refs.unreadNoti.collapse);
				this.$nextTick(function(){
					this.$refs.unreadNoti.collapse.resize();
					this.$refs.readNoti.collapse.resize();
				});
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	/* 按钮盒子 */
	.btnBox {
		/* padding: 10rpx 0 10rpx 0; */
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	/* 卡片中按钮样式 */
	.btnInMore {
		/* border: 1px solid deeppink; */
		display: inline-block;
		height: 130rpx;
		width: 350rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* 菜单中按钮样式 */
	.btnInCard {
		/* border: 1px solid deeppink; */
		display: inline-block;
		height: 80rpx;
		width: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
