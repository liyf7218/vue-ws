<template>
<div class="qx-form">
  <el-form
  :style="formStyle"
  :class="[formClass, 'qx-form-inner-form']"
  :model="model"
  :rules="rules"
  :inline="inline"
  :label-position="labelPosition"
  :label-width="labelWidth"
  :label-suffix="labelSuffix"
  :hide-required-asterisk="hideRequiredAsterisk"
  :show-message="showMessage"
  :inline-message="inlineMessage"
  :status-icon="statusIcon"
  :validate-on-rule-change="validateOnRuleChange"
  :size="size"
  :disabled="disabled"
  >
  <slot></slot>
</el-form>
</div>
</template>

<script>
export default {
  name: 'qx-form',
  props: {
    // form style
    formStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    formClass: {
      type: String,
      default: '',
    },

    // form config
    model: Object,
    rules: Object,
    inline: {
      type: Boolean,
      default: false,
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator(value){
        return ['left', 'top', 'right'].includes(value);
      }
    },
    // 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值
    labelWidth: {
      type: String,
      default: '80px',
    },
    labelSuffix: String,
    hideRequiredAsterisk: Boolean,
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
    validateOnRuleChange: Boolean,
    size: {
      type: String,
      default: 'medium',
      validator(value){
        return ['medium', 'small', 'mini'].includes(value);
      }
    },
    disabled: Boolean,
  },
}
</script>

<style scoped lang="scss">
.qx-form {
  width: 100%;
}

.qx-form-inner-form {
  width: 100%;
}
</style>
