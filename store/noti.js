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
		 * 
		 * 接入后端接口，已弃用
		 */
		// getNoti(context) {
		// 	uni.request({
		// 		url: "http://localhost:3000/notiList",
		// 		success: (res) => {
		// 			// this.allNoti = res.data.allNoti;
		// 			// this.updateAllNoti(res.data.allNoti)
		// 			// console.log("******************", res);
		// 			context.commit("updateAllNoti", res.data.allNoti);
		// 			context.commit("updateStarNoti", res.data.starNoti);
		// 			context.commit("updateUnreadNoti", res.data.unreadNoti);
		// 			context.commit("updateReadNoti", res.data.readNoti);
		// 		}
		// 	});
		// },

		updateAll(context) {
			uni.request({
				url: "http://8.130.21.218/BackDemo/allNoti",
				success: (res) => {
					// console.log("******************", res.data);
					context.commit("updateAllNoti", res.data);
				}
			});
			uni.request({
				url: "http://8.130.21.218/BackDemo/readNoti",
				success: (res) => {
					// console.log("******************", res.data);
					context.commit("updateReadNoti", res.data);
				}
			});
			uni.request({
				url: "http://8.130.21.218/BackDemo/unreadNoti",
				success: (res) => {
					// console.log("******************", res.data);
					context.commit("updateUnreadNoti", res.data);
				}
			});
			uni.request({
				url: "http://8.130.21.218/BackDemo/starNoti",
				success: (res) => {
					// console.log("******************", res.data);
					context.commit("updateStarNoti", res.data);
				}
			});
		}

	}


}
