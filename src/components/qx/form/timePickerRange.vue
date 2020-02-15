<template>
<div class="qx-time-picker-range">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-time-picker v-model="currentValue" @change="handleInput"
    :class="[timePickerClass, 'qx-time-picker-range-inner-time-picker-range']"
    :style="timePickerStyle"
    is-range
    :readonly="readonly"
    :clearable="clearable"
    :editable="editable"
    :disabled="disabled"
    :value-format="valueFormat"
    :placeholder="placeholder"
    :size="size"
    :arrow-control="arrowControl"
    :range-separator="rangeSeparator"
    :picker-options="pickerOptions"
  ></el-time-picker>
</div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'qx-time-picker-range',
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

    // time-picker-range style
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

    // time-picker-range config
    value: {
      type: [String, Array],
      default() {
        return [];
      },
      validator(value) {
        // 如果 value 为 空字符串 ，则验证通过
        if(typeof value == 'string'){
          return (!value);
        }
        if(value instanceof Array){
          if(value.length == 0){
            return true;
          }
          let [startDate, endDate] = value;
          return moment(startDate, 'HH:mm:ss').isValid() && moment(endDate, 'HH:mm:ss').isValid();
        }
      }
    },
    size: {
      type: String,
      default: 'medium',
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
    startPlaceholder: {
      type: String,
      default() {
        let { placeholder } = this;
        return placeholder || '';
      }
    },
    endPlaceholder: {
      type: String,
      default() {
        let { placeholder } = this;
        return placeholder || '';
      }
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    arrowControl: {
      type: Boolean,
      default: false
    },
    valueFormat: {
      type: String,
      default: 'HH:mm:ss'
    },

    // pickerOptions config
    // pickerOptions.selectableRange 日期范围 ----- 这个不用, qx-time-picker-range 只用于单选
    // pickerOptions.format 日期格式
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    selectableRange: {
      type: Array,
      default(){
        return ['00:00:00 - 23:59:59', '00:00:00 - 23:59:59'];
      }
    },
    pickerOptions: {
      type: Object,
      default() {
        let { format, selectableRange } = this;
        let pickerOptions = {};
        if(!!selectableRange){
          if(selectableRange[0] != '00:00:00 - 23:59:59' && selectableRange[1] != '00:00:00 - 23:59:59'){
            pickerOptions.selectableRange = selectableRange;
          }
        }
        if(!!format){
          pickerOptions.format = format;
        }
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
.qx-time-picker-range {
  margin: 5px 0;
  display: inline-block;
}

.qx-time-picker-range-inner-time-picker-range {
  width: 300px;
  margin-right: 8px;
}

</style>
