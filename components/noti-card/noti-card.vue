<template>
	<view>

		<uni-card :title="item.title" mode="title" :is-shadow="true" :extra="getNotiLevelStr(item.level)"
			@click="beTapped(item.no)">
			<!-- 卡片内容区域 -->



			<!-- 通知内容区域 -->
			<!-- 通知内容 -->
			<rich-text :nodes="text"></rich-text>

			<!-- 通知编号标签 -->
			<view class="notiNoBox">
				<uni-tag :text="item.no" :type="numberColor" :circle="true" size="mini" style="padding: 25rpx;"
					inverted="true"></uni-tag>
			</view>


			<!-- 卡片按钮区域 -->
			<!-- 配合native，阻止事件冒泡 -->
			<view class="btnBox" style="padding: 30rpx 0 0 0;">
				<view class="btnInCard" @click.native.stop="checkBeTapped(item.title)">
					<uni-icons :type="chkIcon" size="25"></uni-icons>
				</view>
				<view class="btnInCard" @click.native.stop="favBeTapped(item.title)">
					<uni-icons :type="favIcon" size="25"></uni-icons>
				</view>
				<view class="btnInCard" @click.native.stop="moreBeTapped(item.no)">
					<uni-icons type="more-filled" size="25"></uni-icons>
				</view>
			</view>
		</uni-card>

		<!-- "更多"菜单内容 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff" @click.native.stop>
			<!-- 按钮区域 -->
			<view class="btnBox" style="padding: 0;">
				<view @click.native.stop="checkBeTapped(item.title)" class="btnInMore">
					<uni-icons :type="chkIcon" size="25">
					</uni-icons>
					<text>{{altReadStat}}</text>
				</view>
				<view @click.native.stop="favBeTapped(item.title)" class="btnInMore">
					<uni-icons :type="favIcon" size="25">
					</uni-icons>
					<text>{{altFavStat}}</text>
				</view>
			</view>
			<!-- 列表菜单 -->
			<uni-list>
				<uni-list-item title="对此通知有疑问" clickable @click.native.stop="doubtBeTapped(item.title)">
				</uni-list-item>
				<uni-list-item title="分享通知" clickable @click.native.stop="shareBeTapped(item.title)">
				</uni-list-item>
				<!-- <uni-list-item title="取消" clickable @click.native.stop="closeMenu(i, item.no)"></uni-list-item> -->
				<uni-list-item title="取消" clickable @click.native.stop="closeMenu(item.no)"></uni-list-item>
			</uni-list>
		</uni-popup>


	</view>
</template>

<script>
	export default {
		name: "noti-card",
		data() {
			return {
				// 改变收藏状态标识语
				altFavStat: "收藏",
				// 收藏位按钮 - 图标样式
				favIcon: "star-filled",

				// 改变已读状态标识语
				altReadStat: "标记为已读",
				// 已读状态位按钮 - 图标样式
				chkIcon: "checkmarkempty",

				// 编号颜色
				numberColor: "error"
			};
		},

		mounted() {
			// console.log(this.item);

			// 读取通知已读状态 -弃用等级判断，后端引入新字段 boolean(tinyint):isRead
			// if (this.item.level < 0) {
			if (this.item.isRead) {
				this.altReadStat = "标记为未读";
				this.chkIcon = "flag-filled";
				this.numberColor = "primary";
			}

			// 读取通知收藏状态
			if (this.item.isStar) {
				this.altFavStat = "取消收藏";
				this.favIcon = "starhalf";
			}
		},

		// props: ['item', 'isRead'],
		props: {
			'item': {
				type: Object,
				default: {
					no: 10007,
					title: 'Normal -n',
					content: '一般通知里呈现，内容在这里呈现',
					date: "1984-01-01",
					time: "20:15",
					isStar: false,
					level: 1
				},
			},
			'text': {
				type: String
			}

		},
		methods: {

			/** 
			 * feat: 使用node服务模拟接口，详见 ../server/server.js (cnsam2012.2022.01.31)
			 * *** 一定要见../server/server/js! ***
			 * 
			 * 从模拟接口获取通知列表对象，并赋至 allNoti
			 */
			log(val) {
				console.log("log here" + val);
			},

			/**
			 * 将通知等级转换为文字，默认返回“一般通知”
			 * @param {number} val
			 * @return {string} 
			 * 
			 */
			getNotiLevelStr(val) {
				switch (val) {
					case 1:
						return "一般通知"; //用于通知全部人的普通通知
						break;
					case 2:
						return "特别通知"; //用于通知特定人员的通知
						break;
					case 3:
						return "紧急通知"; //紧急通知，优先级最高
						break;
					case 0:
						return "资料收集";
						break;
					case -1:
						return "已读";
						break;
					default:
						return "一般通知";
						break;

				}
			},

			// mask:true 阻止点击穿透，后续不再作此注释
			// 卡片点击事件
			beTapped(itemNo) {
				// console.log(msg);
				// wx.showToast({
				// 	title: msg,
				// 	mask: true,
				// 	icon: 'success',
				// 	duration: 1500
				// });
				uni.navigateTo({
					url: '../../subpkg/noti-detail/noti-detail?notiNo=' + itemNo
				})
			},

			// 收藏按钮点击事件，弹出提示框
			// 转换收藏状态
			favBeTapped(msg) {
				console.log(msg + ' fav');
				wx.showToast({
					title: msg + ' fav',
					mask: true,
					icon: 'success',
					duration: 1500
				})
			},

			// 确认按钮点击事件，弹出提示框
			// 转换已读状态
			checkBeTapped(msg) {
				console.log(msg + ' check');
				wx.showToast({
					title: msg + ' check',
					mask: true,
					icon: 'success',
					duration: 1500
				})
			},

			// 已读通知 - 标记为未读按钮点击事件，弹出提示框 -弃用
			// unreadBeTapped(msg) {
			// 	console.log(msg + ' unread');
			// 	wx.showToast({
			// 		title: msg + ' unread',
			// 		mask: true,
			// 		icon: 'success',
			// 		duration: 1500
			// 	})
			// },

			// 更多按钮点击事件
			// moreBeTapped(i, no) {
			moreBeTapped(no) {
				// console.log("i = " + i);
				console.log("no = " + no);
				this.$refs.popup.open();
			},

			// 已读通知 - 更多按钮点击事件 - 弃用
			// readMoreBeTapped(i, no) {
			// readMoreBeTapped(no) {
			// 	// console.log("i = " + i);
			// 	console.log("no = " + no);
			// 	this.$refs.readPopup.open();
			// },

			// 疑问按钮点击事件
			doubtBeTapped(msg) {
				console.log(msg + " doubt");
				wx.showToast({
					title: msg + " doubt",
					mask: true,
					icon: 'success',
					duration: 1500
				});
			},

			// 分享按钮点击事件
			shareBeTapped(msg) {
				console.log(msg + " share");
				wx.showToast({
					title: msg + " share",
					mask: true,
					icon: 'success',
					duration: 1500
				});
			},

			// 菜单中的“取消”按钮点击事件
			// closeMenu(i, no) {
			closeMenu(no) {
				// console.log("i = " + i + " close");
				console.log("no = " + no + " close");
				this.$refs.popup.close();
			},

			// 已读通知 - 菜单中的“取消”按钮点击事件 - 弃用
			// readCloseMenu(i, no) {
			// readCloseMenu(no) {
			// 	// console.log("i = " + i + " close");
			// 	console.log("no = " + no + " close");
			// 	this.$refs.readPopup.close();
			// },


		}

	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	/* 通知编号标签盒子 */
	.notiNoBox {
		// border: 1px solid deeppink;
		height: 50rpx;
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		align-items: center;
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
