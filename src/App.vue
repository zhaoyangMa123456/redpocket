<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import home from './page/home.vue'

export default {
  name: 'app',
  components: {
    home,
  }
}
</script>

<style lang="less" >
@import "./assets/css/main.less";

</style>
