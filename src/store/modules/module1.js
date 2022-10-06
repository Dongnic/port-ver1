// store/modules/module1.js
import $axios from 'axios'
export const module1 = {
  namespaced: true,
  state: {
    counter: 10,
    server: [],
    currentServer: '',
    userInfo: [],
    userName: '원래이름',
    jwtToken: 'no'
  },
  mutations: {
    SET_USER_INFO (state, value) {
      state.userInfo = value
    },
    SET_USER_NAME (state, value) {
      state.userName = value
    },
    SET_JWT_TOKEN (state, value) {
      state.jwtToken = value
    }
  },
  actions: {
    test () {
      console.log(4)
    },
    changeUserName ({ commit }, value) {
      console.log(value)
      commit('SET_USER_NAME', value + '변경')
    },
    changeJwtToken ({ commit }, value) {
      console.log(value)
      commit('SET_JWT_TOKEN', value)
    },
    // context = { state, getters, commit, dispatch, ... }
    // 선택 예시 { commit, getters } commit.함수
    // 전체 예시 (context) - context.commit.함수
    loadUser ({ commit, state }) {
      console.log('=======loadUser==========')
      console.log('state.jwtToken', state.jwtToken)
      const config = {
        headers: {
          Authorization: 'Bearer ' + state.jwtToken
        }
      }
      // const savedCartItems = [...state.cart.added]
      $axios
        .get('/user/userInfo', config)
        .then(function (response) {
          console.log('/userInfo', response)
          console.log('헤더 : ', response.headers)
          console.log('data : ', response.data)
          console.log('data type : ', typeof response.data)
          commit('SET_USER_INFO', response.data)
          commit('SET_USER_NAME', response.data.username)
        })
        .catch(function (error) {
          console.log(error)
          commit('SET_USER_NAME', '로그인안함')
        })
    }
  },
  getters: {
    getUserName (state) {
      console.log(state.userName)
      return state.userName
    },
    getUserInfo (state) {
      console.log(state.userInfo)
      return state.userInfo
    },
    getJwtToken (state) {
      console.log(state.jwtToken)
      return state.jwtToken
    }
  }
}
