<template>
<div class="qx-button">
  <el-button @click="handleClick"
  :style="buttonStyle"
  :class="[buttonClass, 'qx-button-inner-button']"
  :disabled="disabled"
  :icon="icon"
  :size="size"
  :type="type"
  :plain="plain"
  :round="round"
  :circle="circle"
  :loading="loading"
  :autofocus="autofocus"
  :native-type="nativeType"
  >
    <slot></slot>
  </el-button>
</div>
</template>

<script>
export default {
  name: 'qx-button',
  props: {
    // button style
    buttonStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    buttonClass: {
      type: String,
      default: '',
    },

    // button config
    size: {
      type: String,
      default: 'medium', // medium / small / mini
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '', //	primary / success / warning / danger / info / text
    },
    icon: {
      type: String
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: 'button', // 原生 type 属性:	button / submit / reset
    },
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick(value) {
      this.$emit('click', value); //触发 click 事件
    }
  }
}
</script>

<style scoped lang="scss">
.qx-button {
    margin: 2px 0;
    display: inline-block;
}

.qx-button-inner-button {
    max-width: 280px;
    margin-right: 8px;
}
</style>
