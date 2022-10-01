<template>
  <div>
    <h1>This is an about page</h1>
    {{ counter }}
    {{ times2 }}
    {{ test }}
    <button @click="inc">inc</button>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    // state는 moduleName으로 쪼개서 들어간다.
    const counter = computed(() => store.state.module2.counter)

    // getters와 mutation은 전역으로 들어가서 store.getters.Counter.time2가 아니라 store.getters.time2이다
    const test = computed(() => store.getters.time2)
    const inc = () => store.commit('setCounter', counter.value + 1)

    return { inc, test }
  }
}
</script>
