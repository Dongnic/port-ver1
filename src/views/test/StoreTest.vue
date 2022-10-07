<template>
  <div>
    <h1>테스트 페이지</h1>
    <router-link to="/">Home</router-link>
    | UserName | <br/> {{ userName }} <br/>
    | Router Token | <br/> {{$route.query.token}} <br/>
    | Store Token | <br/> {{ jwtToken }} <br/>
    | Data Token | <br/> {{ thisToken }} <br />
    <button @click="changeName">Change UserName</button><br/>
    <button @click="loadUser">Get UserName</button><br/>
    <button @click="setToken">Set Data Token</button><br/>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    // state는 moduleName으로 쪼개서 들어간다.
    const thisToken = ref('')
    const userName = computed(() => store.getters['module1/getUserName'])
    const jwtToken = computed(() => store.getters['module1/getJwtToken'])
    // getters와 mutation은 전역으로 들어가서 store.getters.Counter.time2가 아니라 store.getters.time2이다
    const changeName = () => store.dispatch('module1/changeUserName', userName.value)
    const loadUser = () => store.dispatch('module1/loadUser')
    function setToken () { thisToken.value = jwtToken }
    // token()
    return { changeName, loadUser, userName, jwtToken, setToken }
  },
  mounted () {
    console.log('this.$route.query.token', this.$route.query.token)
    this.$store.dispatch('module1/changeJwtToken', this.$route.query.token)
  }
}
</script>
<style scoped>
button{
  background-color: chocolate;
}
</style>
