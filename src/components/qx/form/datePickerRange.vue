<template>
<div class="qx-date-picker-range">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-date-picker v-model="currentValue" @change="handleInput"
    :style="datePickerRangeStyle"
    :class="[datePickerRangeClass, 'qx-date-picker-range-inner-date-picker-range']"
    :readonly="readonly"
    :editable="editable"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :range-separator="rangeSeparator"
    :size="size"
    :type="type"
    :format="format"
    :value-format="valueFormat"
    :picker-options="pickerOptions"
    :default-time="defaultTime"></el-date-picker>
</div>
</template>

<script>
import moment from 'moment';

// 根据组件的类型，进行数据格式的控制
function getValueFormat(valueType = 'daterange') {
  // 包括 dates / datetimerange / daterange / monthrange
  let format, valueFormat;
  switch (valueType) {
    case 'monthrange':
      format = valueFormat = 'yyyy-MM';
      break;
    case 'datetimerange':
      format = valueFormat = 'yyyy-MM-dd HH:mm:ss';
      break;
    case 'dates':
    case 'daterange':
    default:
      format = valueFormat = 'yyyy-MM-dd';
  }
  return {
    format,
    valueFormat
  };
};

export default {
  name: 'qx-date-picker-range',
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

    // datePickerRange style
    datePickerRangeStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    datePickerRangeClass: {
      type: String,
      default: '',
    },

    // datePickerRange config
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
          return moment(startDate).isValid() && moment(endDate).isValid();
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
    rangeSeparator: {
      type: String,
      default: '至'
    },
    // 显示类型
    // 包括 dates / datetimerange / daterange / monthrange
    // 不包括 year / month / date / week / datetime
    type: {
      type: String,
      default: 'daterange',
      validator (type) {
        // 这个值必须匹配下列字符串中的一个
        return ['dates', 'datetimerange', 'daterange', 'monthrange'].includes(type);
      }
    },
    placeholder: {
      type: String,
      default(){
        let { type } = this;
        switch (type) {
          case 'monthrange':
            return "选择月份";
          case 'datetimerange':
            return "选择日期时间";
          case 'dates':
          case 'daterange':
          default:
            return "选择日期"

        }
      }
    },
    startPlaceholder: {
      type: String,
      default() {
        let { placeholder } = this;
        return placeholder || '请选择';
      }
    },
    endPlaceholder: {
      type: String,
      default() {
        let { placeholder } = this;
        return placeholder || '请选择';
      }
    },
    // 设置 date-picker 的显示格式,而不是数据格式,
    // 查看底部备注栏 [format]
    format: {
      type: String,
      default() {
        let { type } = this;
        return getValueFormat(type).format;
      },
    },
    // 设置 date-picker 的数据格式
    // 查看底部备注栏 [format]
    valueFormat: {
      type: [String, Number],
      default() {
        let { type } = this;
        return getValueFormat(type).valueFormat;
      },
    },

    // pickerOptions config
    // pickerOptions.disabledDate 禁用指定的日期
    disabledDate: [Boolean, Function],
    // pickerOptions.shortcuts 快捷键
    shortcuts: {
      type: [Boolean, String, Array],
      default() {
        let { type } = this;
        return (type == 'daterange') || (type == 'datetimerange')
      }
    },
    // pickerOptions.firstDayOfWeek 设置每周的第一天从哪一天开始,取值 [1...7]
    firstDayOfWeek: [Number],
    pickerOptions: {
      type: Object,
      default() {
        let {
          shortcuts,
          disabledDate,
          firstDayOfWeek
        } = this;
        let pickerOptions = {};

        if(!!disabledDate){
          // 如果标识符 disabledDate 为真，就禁用今天之后的日期
          if (typeof disabledDate == 'boolean') {
            pickerOptions.disabledDate = function(time) {
              return time.getTime() > Date.now();
            }
          }
          // 如果标识符 disabledDate 为 Function, 则将其直接赋予 pickerOptions.disabledDate
          if (typeof disabledDate == 'function') {
            pickerOptions.disabledDate = disabledDate;
          }
        }

        if (!!shortcuts) {
          // 整理 shortcuts 的格式
          if (typeof shortcuts == 'boolean') {
            shortcuts = ['本月', '最近一个月', '最近三个月', '今年至今', '本年'];
          }
          if (typeof shortcuts == 'string') {
            shortcuts = shortcuts.split(',');
          }
          // 至此， shortcuts 应为数组格式，将其中的字段遍历一遍，进行拼装
          pickerOptions.shortcuts = shortcuts.map(ele => {
            let shortcutItem = {};
            // 不可以在这里直接定义 today = moment() ,然后直接操作
            // 因为返回值是对象,会导致 startDate == endDate == today.operation() !!!
            let startDate, endDate;
            switch (ele) {
              case '本月':
                shortcutItem.text = '本月';
                startDate = moment().startOf('month');
                endDate = moment().endOf('month');
                break;
              case '最近一个月':
                shortcutItem.text = '最近一个月';
                startDate = moment().subtract(1, 'months');
                endDate = moment();
                break;
              case '最近三个月':
                shortcutItem.text = '最近三个月';
                startDate = moment().subtract(3, 'months');
                endDate = moment();
                break;
              case '今年至今':
                shortcutItem.text = '今年至今';
                startDate = moment().startOf('year');
                endDate = moment();
                break;
              case '本年':
                shortcutItem.text = '本年';
                startDate = moment().startOf('year');
                endDate = moment().endOf('year');
                break;
              case '今天':
              default:
                shortcutItem.text = '今天';
                startDate = endDate = moment();
            }
            shortcutItem.onClick = function(picker) {
              // 返回值 startDate 和 endDate 应为 Date 类型
              picker.$emit('pick', [startDate.toDate(), endDate.toDate()]);
            }
            return shortcutItem;
          });
        }

        if (!!firstDayOfWeek) {
          pickerOptions.firstDayOfWeek = firstDayOfWeek;
        }

        return pickerOptions;
      }
    },

    // date-time-picker config
    defaultTime: {
      type: Array,
      default(){
        // 如果这里指定错误, 会报错
        return ['00:00:00', '23:59:59'];
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
      // 在编辑页面容易出现此问题，老是报错gethour()的typeerror，
      // 是因为 el-date-picker 只接受传入 Date() 类型的值，而默认传入的是一个字符串，需要使用 new Date(formData.beginTime) 进行转换，再赋值给 v-model的变量 即可。
      // currentValue: this.type == 'datetime' ? new Date(this.value) : this.value, //不稳定，还是直接赋值比较靠谱
      currentValue: this.value,
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value); //触发 datePickerRange input 事件，并传入新值
      this.$emit('change', value); //触发 datePickerRange change 事件，并传入新值
    }
  }
}
</script>

<style scoped lang="scss">
.qx-date-picker-range {
    margin: 5px 0;
    display: inline-block;
}

.qx-date-picker-range-inner-date-picker-range {
    width: 400px;
    margin-right: 8px;
}
</style>

<!-- [format]
  日期格式
  使用format指定输入框的格式；使用value-format指定绑定值的格式。
  默认情况下，组件接受并返回Date对象。以下为可用的格式化字串，以 UTC 2017年1月2日 03:04:05 为例：
  请注意大小写!!

  格式	含义	备注	举例
  yyyy	年		2017
  M	月	不补0	1
  MM	月		01
  W	周	仅周选择器的 format 可用；不补0	1
  WW	周	仅周选择器的 format 可用	01
  d	日	不补0	2
  dd	日		02
  H	小时	24小时制；不补0	3
  HH	小时	24小时制	03
  h	小时	12小时制，须和 A 或 a 使用；不补0	3
  hh	小时	12小时制，须和 A 或 a 使用	03
  m	分钟	不补0	4
  mm	分钟		04
  s	秒	不补0	5
  ss	秒		05
  A	AM/PM	仅 format 可用，大写	AM
  a	am/pm	仅 format 可用，小写	am
  timestamp	JS时间戳	仅 value-format 可用；组件绑定值为number类型	1483326245000
  [MM]	不需要格式化字符	使用方括号标识不需要格式化的字符 (如 [A] [MM])	MM
-->
