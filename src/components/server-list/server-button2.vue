<template>
  <div>
    <div
      v-for="(tab, index) in tabs"
      :key="tab"
      :class="['server-button', 'tab-button', { active: currentTab == index }]"
      @click="currentTab = index"
    ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 0, // 기본 currentTab 값 지정
      tabs: ['tab1', 'tab2', 'tab3']
    }
  },
  watch: {
    currentTab (newTab) {
      console.log('newTab: ' + newTab)
    }
  }
}
</script>

<style lang="scss" scoped>
.server-button {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  border-radius: 50%;

  background-color: var(--primary);
  cursor: pointer;
  position: relative;
  transition: 0.2s;

  &.active,
  &:hover {
    border-radius: 16px;
    background-color: var(--discord);
  }

  img {
    width: 44px;
    height: 44px;
    color: #fff;
    transition: 0.1s;
    &.active,
    &:hover {
      width: 48px;
      height: 48px;
    }
  }

  .mentions {
    background-color: var(--notification);

    width: auto;
    height: 24px;
    padding: 0 4px;
    bottom: -4px;
    right: -4px;

    position: absolute;
    border-radius: 12px;
    border: solid 4px var(--tertiary);

    text-align: right;
    font-size: 13px;
    font-weight: bold;
    color: var(--white);
  }
}

.serverButton-hasNotifications {
  &::before {
    content: "";
    display: block;

    width: 9px;
    height: 9px;

    background-color: var(--white);
    position: absolute;
    left: -17px;
    top: calc(50% - 4.5px);
    border-radius: 50%;

    transition: 0.2s;
  }

  &:hover,
  &.active {
    &::before {
      content: "";
      width: 9px;
      height: 30px;
      top: calc(30% - 4.5px);
      border-radius: 15%;
    }
  }
}
.serverButton-hasNotifications:hover {
  &::before {
    content: "";
    width: 9px;
    height: 40px;
    top: calc(20% - 4.5px);
    border-radius: 15%;
  }
}

.serverButton-isHome {
  background-color: var(--tertiary);

  &.active,
  &:hover {
    background-color: var(--secondary) !important;
  }
}
</style>
