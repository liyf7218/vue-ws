<template>
<section>
  <qx-general-qbar :model="parameters"></qx-general-qbar>
</section>
</template>

<script>
export default {
  name: 'qx-zoo',
  props: {
    parameters: {
      type: [Array, Object],
    },
    actions: {
      type: Array
    },
  }
}
</script>

<style scoped lang="scss">

</style>
