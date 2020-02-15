<template>
<div class="qx-time-picker">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-time-picker v-model="currentValue" @change="handleInput"
    :class="[timePickerClass, 'qx-time-picker-inner-time-picker']"
    :value-format="valueFormat"
    :readonly="readonly"
    :clearable="clearable"
    :editable="editable"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :picker-options="pickerOptions"
    :arrow-control="arrowControl"
    :style="timePickerStyle"
  ></el-time-picker>
</div>
</template>

<script>
export default {
  name: 'qx-time-picker',
  props: {
    // label config
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default() {
        let { label } = this;
        return !!label;
      }
    },

    // time-picker style
    timePickerStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    timePickerClass: {
      type: String,
      default: '',
    },

    // time-picker config
    value: {
      type: String,
      default: ''
    },
    valueFormat: {
      type: String,
      default: 'HH:mm:ss'
    },
    size: {
      type: String,
      default: 'medium',
      validator(value){
        return ['medium', 'small', 'mini'].includes(value);
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    arrowControl: {
      type: Boolean,
      default: false,
    },

    // pickerOptions config
    // pickerOptions.selectableRange 日期范围 ----- 这个不用, qx-time-picker 只用于单选
    // pickerOptions.format 日期格式
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    pickerOptions: {
      type: Object,
      default() {
        let { format } = this;
        let pickerOptions = {
          selectableRange: '',
          format: format || 'HH:mm:ss'
        };
        return pickerOptions;
      }
    },
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
    handleInput(value) {
      this.$emit('input', value); //触发 input 事件，并传入新值
      this.$emit('change', value); //触发 change 事件，并传入新值
    }
  }
}
</script>

<style scoped lang="scss">
.qx-qbar {
  .qx-time-picker {
    margin: 5px 0;
    display: inline-block;

    .qx-time-picker-inner-time-picker {
      width: 200px;
      margin-right: 8px;
    }
  }
}

.qx-form {
  .qx-time-picker {
    margin: 2px 0;

    .qx-time-picker-inner-time-picker {
      width: 350px;
    }
  }
}

</style>
