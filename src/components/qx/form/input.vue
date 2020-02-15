<template>
<div class="qx-input">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-input v-model="currentValue" @change="handleChange"
    :style="inputStyle"
    :class="[inputClass, 'qx-input-inner-input']"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :type="type"
    :show-password="showPassword"
  ></el-input>
</div>
</template>

<script>
export default {
  name: 'qx-input',
  props: {
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

    // input style
    inputStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    inputClass: {
      type: String,
      default: '',
    },

    // input config
    value: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value);
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    showPassword: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val;
    }
  },
  data(){
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value); //触发 input 事件，并传入新值
      this.$emit('change', value); //触发 input 事件，并传入新值
    }
  }
}
</script>

<style scoped lang="scss">
.qx-qbar {
  .qx-input {
    margin: 5px 0;
    display: inline-block;

    .qx-input-inner-input {
        width: 200px;
        margin-right: 8px;
    }
  }
}
.qx-form {
  .qx-input {
    margin: 2px 0;

    .qx-input-inner-input {
        width: 400px;
    }
  }
}
</style>
