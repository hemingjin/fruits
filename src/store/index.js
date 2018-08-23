import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isBindPhone: true,
		userInfo: {
			nickName: '',
			headPath: '',
			openId: ''
		}
	},
	mutations: {
		updatePhone(state, status){
			state.isBindPhone = status
		},
		updateUserInfo(state, newUserInfo){
			state.userInfo = newUserInfo
		}
	}
})

export default store;
