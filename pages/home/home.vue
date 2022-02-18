<template>
	<view>

		<!-- <my-noti v-if="allnoti"></my-noti> -->
		<template v-if="allNoti">
			<main-notiList></main-notiList>
		</template>
		<template v-else>
			<view class="notiBlank">
				<uni-icons type="minus" size="50"></uni-icons>
				无通知
			</view>
		</template>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapActions
	} from "vuex"

	export default {
		data() {
			return {}
		},

		// 生命周期函数：页面加载时执行
		onLoad() {
			// this.getNoti(); 弃用
			
			// 初始化 Vuex 中的 State
			this.updateAll();
		},
		
		// 下拉刷新时执行
		onPullDownRefresh() {
			// 更新 Vuex 中的 State
			// this.getNoti(); 弃用
			this.updateAll();
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},2000);
		},
		
		

		computed: {
			// 分发 m_noti:noti.js 的 State
			...mapState('m_noti', ['allNoti', 'unreadNoti', 'readNoti']),
		},

		methods: {
			// 分发 m_noti:noti.js 的 Mutations --弃用
			// ...mapMutations('m_noti', ['updateAllNoti']),

			// 分发 m_noti:noti.js 的 Action
			...mapActions('m_noti', ['updateAll'])
		}
	}
</script>

<style>
	.notiBlank {
		/* border: 1px deeppink solid; */
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 35px;
		margin-top: 100rpx;
	}
</style>
