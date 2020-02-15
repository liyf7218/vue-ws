<template>
<div v-if="showLabel" :class="['qx-label', labelClass ]" :style="labelStyle">
  <span class="qx-label-text">
    {{label}}：
  </span>
</div>
</template>

<script>
export default {
  name: 'qx-label',
  props: {
    // label style
    labelStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    labelClass: {
      type: String,
      default: '',
    },

    // label config
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default() {
        // 要取到 label 的值,ixu将其定义在此属性之前,可能是 TDZ 的缘故.
        let {
          label
        } = this;
        return !!label;
      }
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.qx-label {
    display: inline-block;
    min-width: 85px;
    text-align: right;
}

.qx-label-text {
    // display: inline-block;
    // width: 85%;
    // text-align: justify;
    // text-align-last: justify;
}
</style>
