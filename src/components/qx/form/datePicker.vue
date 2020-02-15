<template>
<div class="qx-date-picker">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-date-picker v-model="currentValue" @change="handleInput"
    :style="datePickerStyle"
    :class="[datePickerClass, 'qx-date-picker-inner-date-picker']"
    :editable="editable"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :type="type"
    :format="format"
    :value-format="valueFormat"
    :picker-options="pickerOptions"></el-date-picker>
</div>
</template>

<script>
import moment from 'moment';

// 根据组件的类型，进行数据格式的控制
function getValueFormat(valueType = 'date') {
  let format, valueFormat;
  switch (valueType) {
    case 'year':
      format = valueFormat = 'yyyy';
      break;
    case 'month':
      format = valueFormat = 'yyyy-MM';
      break;
    case 'week':
      // week 属性只能用于设置 format 的值，在设置 valueformat 的值是汇报 xx.getDate() Error;
      // Issue 详见 [[Bug Report] el-date-picker[type=week]: `value-format` invalidation of `format` #8783](https://github.com/ElemeFE/element/issues/8783)
      format = 'yyyy 第 WW 周';
      // 此时取得的日期是当前周的 周一 的日期
      // valueFormat = 'yyyy-MM-dd';
      break;
    case 'datetime':
      format = valueFormat = 'yyyy-MM-dd HH:mm:ss';
      break;
    case 'date':
    default:
      format = valueFormat = 'yyyy-MM-dd';
  }
  return {
    format,
    valueFormat
  };
};

export default {
  name: 'qx-date-picker',
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

    // datePicker style
    datePickerStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    datePickerClass: {
      type: String,
      default: '',
    },

    // datePicker config
    value: {
      type: [String, Date, Number],
      default: '',
      validator (value) {
        // 如果 value 为 空字符串 ，则验证通过，其他形式的假值都不通过
        if(!value){
          return (typeof value == 'string');
        }
        // 有值时，验证一下是否为合法的日期类型
        return moment(value).isValid()
      }
    },
    size: {
      type: String,
      default: 'medium',
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
    // 显示类型
    // 包括 year / month / date / week / datetime
    // 不包括 dates / datetimerange / daterange / monthrange
    type: {
      type: String,
      default: 'date',
      validator (type) {
        // 这个值必须匹配下列字符串中的一个
        return ['year', 'month', 'date', 'week', 'datetime'].includes(type);
      }
    },
    placeholder: {
      type: String,
      default(){
        let { type } = this;
        switch (type) {
          case 'year':
            return '选择年份'
          case 'month':
            return '选择月份'
          case 'week':
            return '选择周(周一)'
          case 'datetime':
            return '选择日期时间'
          default:
            return '请选择'
        }
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
        return (type == 'date') || (type == 'datetime')
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
            shortcuts = ['今天', '昨天', '前天', '一周前', '一月前', '一年前'];
          }
          if (typeof shortcuts == 'string') {
            shortcuts = shortcuts.split(',');
          }
          // 至此， shortcuts 应为数组格式，将其中的字段遍历一遍，进行拼装
          pickerOptions.shortcuts = shortcuts.map(ele => {
            let shortcutItem = {};
            let date = moment();
            switch (ele) {
              case '昨天':
                shortcutItem.text = '昨天';
                date = date.subtract(1, 'days');
                break;
              case '前天':
                shortcutItem.text = '前天';
                date = date.subtract(2, 'days');
                break;
              case '一周前':
                shortcutItem.text = '一周前';
                date = date.subtract(1, 'weeks');
                break;
              case '半月前':
                shortcutItem.text = '半月前';
                date = date.subtract(15, 'days');
                break;
              case '一月前':
                shortcutItem.text = '一月前';
                date = date.subtract(1, 'months');
                break;
              case '一年前':
                shortcutItem.text = '一年前';
                date = date.subtract(1, 'years');
                break;
              case '今天':
              default:
                shortcutItem.text = '今天';
            }
            shortcutItem.onClick = function(picker) {
              // 返回值 date 应为 Date 类型
              picker.$emit('pick', date.toDate());
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
    // 这个好像不对了,在 2.9 版本中,使用的是 数组: String[], 用来指定日期范围的起止日期的时间
    // defaultTime: {
    //   type: String,
    //   default: '08:00:00'
    // },
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
      this.$emit('input', value); //触发 datePicker input 事件，并传入新值
      this.$emit('change', value); //触发 datePicker change 事件，并传入新值
    }
  }
}
</script>

<style scoped lang="scss">
.qx-qbar {
  .qx-date-picker {
    margin: 5px 0;
    display: inline-block;

    .qx-date-picker-inner-date-picker {
      width: 200px;
      margin-right: 8px;
    }
  }
}

.qx-form {
  .qx-date-picker {
    margin: 2px 0;

    .qx-date-picker-inner-date-picker {
      width: 350px;
    }
  }
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
