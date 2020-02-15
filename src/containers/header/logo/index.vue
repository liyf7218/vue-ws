<template>
  <div class='logo'>
    <span class='logo-main'>QX</span>
    <span class='logo-note'>Record My Life</span>
  </div>
</template>

<script>
export default {
  name: 'logo',
  data () {
    return {}
  }
}
</script>

<style scoped>
.logo {
  text-align: left;
  width: 25%;
}
.logo .logo-main {
  margin: 0 10px 0 50px;
  font-size: 50px;
  line-height: 60px;
}
.logo .logo-note {
  margin: 0 100px 0 15px;
  font-size: 15px;
}
</style>
