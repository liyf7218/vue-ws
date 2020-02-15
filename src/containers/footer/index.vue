<template>
  <section class="i-footer">
  	{{msg}}
  </section>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Got some details here.'
    }
  }
}
</script>

<style scoped>

.i-footer {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid lightsteelblue;
  text-align: center;
}

</style>
