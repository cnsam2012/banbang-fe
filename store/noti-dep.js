export default {
	// 开启命名空间
	namespaced: true,

	state: {
		allNoti: '',
		starNoti: '',
		unreadNoti: '',
		readNoti: ''
	},

	mutations: {
		// 操纵state
		updateAllNoti(state, val) {
			state.allNoti = val
		},
		updateStarNoti(state, val) {
			state.starNoti = val
		},
		updateUnreadNoti(state, val) {
			state.unreadNoti = val
		},
		updateReadNoti(state, val) {
			state.readNoti = val
		}
	},

	actions: {
		/**
		 * feat: 使用node服务模拟接口，详见 ../server/server.js (cnsam2012.2022.01.31)m_no
		 * *** 一定要见../server/server/js! ***
		 * 从模拟接口分别获取对应通知列表对象，并commit至mutation
		 */
		getNoti(context) {
			uni.request({
				url: "http://localhost:3000/notiList",
				success: (res) => {
					// this.allNoti = res.data.allNoti;
					// this.updateAllNoti(res.data.allNoti)
					// console.log("******************", res);
					context.commit("updateAllNoti", res.data.allNoti);
					context.commit("updateStarNoti", res.data.starNoti);
					context.commit("updateUnreadNoti", res.data.unreadNoti);
					context.commit("updateReadNoti", res.data.readNoti);
				}
			});
		},


	}


}
