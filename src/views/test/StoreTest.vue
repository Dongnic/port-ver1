<template>
  <div>
    <h1>This is an about page</h1>
    <router-link to="/">Home</router-link>
    {{$route.query.token}} | $route.query.token <br/>
    {{ token }} | token <br/>
    {{ counter }} | counter<br/>
    {{ userName }} | userName<br/>
    {{ jwtToken }} | jwtToken<br/>
    {{ thisToken }} | thisToken<br/>
    <button @click="changeName">변경</button><br/>
    <button @click="loadUser">유저 정보 로드</button><br/>
    <button @click="settoken">토큰 세팅</button><br/>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    // state는 moduleName으로 쪼개서 들어간다.
    const userName = computed(() => store.getters['module1/getUserName'])
    const jwtToken = computed(() => store.getters['module1/getJwtToken'])
    // getters와 mutation은 전역으로 들어가서 store.getters.Counter.time2가 아니라 store.getters.time2이다
    const changeName = () => store.dispatch('module1/changeUserName', userName.value)
    const loadUser = () => store.dispatch('module1/loadUser')
    // token()
    return { changeName, loadUser, userName, jwtToken }
  },
  data () {
    return {
      thisToken: ''
    }
  },
  mounted () {
    console.log('this.$route.query.token', this.$route.query.token)
    this.thisToken = this.$route.query.token
    this.$store.dispatch('module1/changeJwtToken', this.$route.query.token)
  }
}
</script>
