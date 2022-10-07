<template>
  <!-- layout  -->
  <div id="grid">
    <ServerList :tabs="tabs" :currentTab="currentTab" />
    <ServerName serverName="port Server" />
    <ChannelList />
    <UserInfo :userName="userInfo.username" />
    <ChannelInfo channelName="CRB's Channel" />
    <ChannelData :userInfo="userInfo"/>
    <UserList :Userlist="Userlist" />
  </div>
</template>

<script>
// Componenets
import ServerList from '@/components/server-list/server-list'
import ServerName from '@/components/server-name/server-name'
import ChannelList from '@/components/channel-list/channel-list'
import UserInfo from '@/components/user-info/user-info'
import ChannelInfo from '@/components/channel-info/channel-info'
import ChannelData from '@/components/channel-data/channel-data'
import UserList from '@/components/user-list/user-list'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'PortChat',
  setup () {
    console.log('setup')
    const store = useStore()
    const route = useRoute()
    // const route = useRoute()
    const setToken = () => store.dispatch('module1/changeJwtToken', route.query.token)
    setToken()
    const load = () => store.dispatch('module1/loadUser')
    load()
    const loadList = () => store.dispatch('module1/loadUserList')
    loadList()
    const userInfo = computed(() => store.getters['module1/getUserInfo'])
    const userList = computed(() => store.getters['module1/getUserList'])
    const jwtToken = computed(() => store.getters['module1/getJwtToken'])
    console.log('userInfo : ', userInfo)
    console.log('jwtToken : ', jwtToken)
    return { userInfo, jwtToken, userList }
  },
  mounted () {
    console.log('mounted')
    console.log('this.$route.query.token', this.$route.query.token)
  },
  components: {
    ServerList,
    ServerName,
    ChannelList,
    UserInfo,
    ChannelInfo,
    ChannelData,
    UserList
  },
  data () {
    return {
      // User list
      Userlist: {
        onlineUsers: [
          {
            name: 'CRB',
            isBot: false
          },
          {
            name: 'Bot 1',
            isBot: true
          },
          {
            name: 'User 1',
            isBot: false
          }
        ],
        offlineUsers: [
          {
            name: 'Bot 9',
            isBot: true
          },
          {
            name: 'Bot 25',
            isBot: true
          },
          {
            name: 'User 21',
            isBot: false
          },
          {
            name: 'User 76',
            isBot: false
          },
          {
            name: 'Bot 3',
            isBot: true
          }
        ]
      },
      currentTab: 0, // 기본 currentTab 값 지정
      tabs: ['tab1', 'tab2', 'tab3']
    }
  }
}
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: 71px 240px auto 240px;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    "sl sn ci ci"
    "sl cl cd ul"
    "sl ui cd ul";

  height: 100vh;
}
</style>
