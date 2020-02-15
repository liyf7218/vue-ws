<template>
<div class="qx-input-number">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-input-number v-model="currentValue" @change="handleChange"
    :style="inputStyle"
    :class="[inputClass, 'qx-input-number-inner-input-number']"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :min="min"
    :max="max"
    :step="step"
    :step-strictly="stepStrictly"
    :precision="precision"
    :controls="controls"
    :controls-position="controlsPosition"
  ></el-input-number>
</div>
</template>

<script>
export default {
  name: 'qx-input-number',
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
      type: [String, Number],
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number
    },
    // step-strictly属性接受一个Boolean。如果这个属性被设置为true，则只能输入 步数的倍数.
    stepStrictly: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
    },
    controls: {
      type: Boolean,
      default: false
    },
    controlsPosition: {
      type: String,
      default: 'right'
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val;
    }
  },
  data() {
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
  .qx-input-number {
      margin: 5px 0;
      display: inline-block;

      .qx-input-number-inner-input-number {
        width: 200px;
        margin-right: 8px;
      }
  }
}

.qx-form {
  .qx-input-number {
      margin: 2px 0;

      .qx-input-number-inner-input-number {
        width: 400px;
      }
  }
}

</style>
