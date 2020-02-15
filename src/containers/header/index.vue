<template>
  <section class="header">
    <logo />
    <!-- <searchbox /> -->
    <iMenu />
  </section>
</template>

<script>
import logo from './logo'
import searchbox from './searchbox'
import iMenu from './iMenu'
export default {
  data () {
    return {
      msg: 'this is the iHeader.'
    }
  },
  components: {
    logo,
    searchbox,
    iMenu
  }
}
</script>

<style scoped>
.header .logo {
  float: left;
}

.header .searchbox {
  float: left;
  margin-right: 30px;
}

.header .i-menu {
  float: right;
  margin-right: 30px;
}
</style>
