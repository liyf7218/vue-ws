<template>
<el-form-item
  :prop="prop"
  :label="label"
  :label-width="labelWidth"
  :required="required"
  :rules="rules"
  :error="error"
  :show-message="showMessage"
  :inline-message="inlineMessage"
  :status-icon="statusIcon"
  :size="size"
  >
  <slot name="label" slot="label"></slot>
  <slot></slot>
</el-form-item>
</template>

<script>
export default {
  name: 'qx-form-item',
  props: {
    // form-item config
    prop: String,
    label: String,
    labelWidth: String,
    required: {
      type: Boolean,
      default: false,
    },
    rules: Object,
    // 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息
    error: String,
    showMessage: {
      type: Boolean,
      default: true,
    },
    inlineMessage: {
      type: Boolean,
      default: false,
    },
    statusIcon: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator(value){
        return ['medium', 'small', 'mini'].includes(value);
      }
    },

  },
}
</script>

<style scoped lang="scss">

</style>
