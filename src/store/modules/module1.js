// store/modules/module1.js
import $axios from 'axios'
export const module1 = {
  namespaced: true,
  state: {
    jwtToken: 'no',
    userInfo: [],
    userList: [],
    chatRoomList: [],
    chatRoomInfo: [{ title: 'Home' }],
    chatMessageList: [],
    activeChatRoom: 0,
    activeChannel: 0
  },
  mutations: {
    SET_JWT_TOKEN (state, value) {
      state.jwtToken = value
    },
    SET_USER_INFO (state, value) {
      state.userInfo = value
    },
    SET_USER_LIST (state, value) {
      state.userList = value
    },
    SET_CHATROOM_LIST (state, value) {
      state.chatRoomList = value
    },
    SET_CHATROOM_INFO (state, value) {
      state.chatRoomInfo = value
    },
    SET_CHATMESSAGE_LIST (state, value) {
      state.chatMessageList = value
    },
    ADD_CHATMESSAGE_LIST (state, value) {
      state.chatMessageList.push(value)
    },
    SET_ACTIVE_CHATROOM (state, value) {
      state.activeChatRoom = value
    },
    SET_ACTIVE_CHANNEL (state, value) {
      state.activeChannel = value
    }
  },
  actions: {
    changeJwtToken ({ commit, dispatch }, value) {
      console.log('=======changeJwtToken==========')
      console.log(value)
      commit('SET_JWT_TOKEN', value)
      dispatch('getUserList')
      dispatch('getUserInfo')
    },
    changeActiveChatRoom ({ commit, dispatch }, value) {
      commit('SET_ACTIVE_CHATROOM', value)
      dispatch('getChatRoomInfo', value)
    },
    addChatMessage ({ commit }, value) {
      commit('ADD_CHATMESSAGE_LIST', value)
    },
    // context = { state, getters, commit, dispatch, ... }
    // 선택 예시 { commit, getters } commit.함수
    // 전체 예시 (context) - context.commit.함수
    getUserInfo ({ commit, state, dispatch }) {
      console.log('=======getUserInfo==========')
      console.log('state.jwtToken', state.jwtToken)
      const config = {
        headers: {
          Authorization: 'Bearer ' + state.jwtToken
        }
      }
      $axios
        .get('/user/userInfo', config)
        .then(function (response) {
          console.log(' ### $axios /user/userInfo', response)
          console.log('UserInfo data : ', response.data)
          commit('SET_USER_INFO', response.data)
          dispatch('getChatRoomList', response.data.id)
          // 채널 정보 가져오기
        })
        .catch(function (error) {
          console.log('ERROR getUserInfo : ', error)
          commit('SET_USER_NAME', '로그인안함')
        })
    },
    getUserList ({ commit }) {
      console.log('=======getUserList==========')
      $axios
        .get('/user')
        .then(function (response) {
          console.log('### $axios /user', response)
          console.log('UserList data : ', response.data)
          commit('SET_USER_LIST', response.data)
        })
        .catch(function (error) {
          console.log('ERROR getUserList : ', error)
        })
    },
    getChatRoomList ({ commit }, value) {
      console.log('=======getChatRoomList==========')
      console.log(' getChatRoomList value : ', value)
      // if (state.userInfo.id == null) {
      //   console.log(' !!!!!!! FAIL getChatRoomList 로그인 하세요')
      //   return
      // }
      // const userid = state.userInfo.id
      $axios
        .get('/api/chat/rooms/' + value)
        .then(function (response) {
          console.log('### $axios /api/chat/rooms/' + value, response)
          console.log('ChatRoomList data : ', response.data)
          commit('SET_CHATROOM_LIST', response.data)
        })
        .catch(function (error) {
          console.log('ERROR getChatRoomList : ', error)
        })
    },
    getChatRoomInfo ({ commit, dispatch }, value) {
      console.log('=======getChatRoomInfo==========')
      $axios
        .get('/api/chat/room/' + value)
        .then(function (response) {
          console.log('### $axios /api/chat/room/' + value, response)
          console.log('ChatRoomInfo data : ', response.data)
          commit('SET_CHATROOM_INFO', response.data)
          dispatch('getChatMessageList', response.data.id)
        })
        .catch(function (error) {
          console.log('ERROR getChatRoomInfo : ', error)
        })
    },
    getChatMessageList ({ commit }, value) {
      commit('SET_CHATMESSAGE_LIST', '')
      $axios
        .get('/api/chat/room/message/' + value)
        .then(function (response) {
          console.log('### $axios /api/chat/room/message' + value, response)
          console.log('ChatMessageList data : ', response.data)
          if (response.data.length > 0) { commit('SET_CHATMESSAGE_LIST', response.data) }
        })
        .catch(function (error) {
          console.log('ERROR getChatMessageList : ', error)
        })
    }
  },
  getters: {
    getJwtToken (state) {
      console.log(state.jwtToken)
      return state.jwtToken
    },
    getUserInfo (state) {
      console.log(state.userInfo)
      return state.userInfo
    },
    getUserList (state) {
      console.log(state.userList)
      return state.userList
    },
    getChatRoomList (state) {
      console.log(state.chatRoomList)
      return state.chatRoomList
    },
    getChatRoomInfo (state) {
      console.log(state.chatRoomInfo)
      return state.chatRoomInfo
    },
    getChatMessageList (state) {
      console.log(state.chatMessageList)
      return state.chatMessageList
    },
    getActiveChatRoom (state) {
      console.log(state.activeChatRoom)
      return state.activeChatRoom
    },
    getActiveChannel (state) {
      console.log(state.activeChannel)
      return state.activeChannel
    }
  }
}
