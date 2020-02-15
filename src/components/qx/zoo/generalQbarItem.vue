<script>
function convertCamelCaseToSnakeCase(camelCaseString = '', linkSymbol = '-') {
  return camelCaseString.replace(/(^-|-$)/g, '').replace(/(^_|_$)/g, '').replace(/[A-Z]/g, letter => `${linkSymbol}${letter.toLowerCase()}`)
}
export default {
  name: 'qx-general-qbar-item',
  props: {
    // qbar-item 的属性,包括 label,prop
    prop: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default(){
        return this.prop;
      }
    },
    // qbar-item 内部 qbar 组件的类别
    type: {
      type: String,
      default: 'input',
      validator(value) {
        return ['input', 'inputNumber', 'select', 'cascader', 'datePicker', 'datePickerRange', 'timePicker', 'timePickerRange'].includes(value.trim());
      }
    },
    // qbar-item 内部 qbar 组件的属性
    value: {
      type: [String, Array]
    },
    // 这个 props 是用来给 表单组件 设置其他属性的,比如 size,查看 [qx/form/{input,select,...}]
    props: {
      type: Object,
      default () {
        return {}
      }
    },
    // 列出一些常用的属性设置
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    // 当 type 为选择框或者级联框时,需要提供 options
    options: {
      type: Array,
      default () {
        return [];
      }
    },
  },
  watch: {
    '$parent.model': {
      handler(model){
        if(this.value != undefined){
          this.currentValue = this.value;
        }else{
          this.currentValue = model[this.prop];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data(){
    return {
      currentValue: (this.value != undefined) ? this.value : this.$parent.model[this.prop]
    }
  },
  render(h) {
    let self = this; // 渲染函数内部为闭包
    let {
      prop,
      label,
      type,
      disabled,
      clearable,
      filterable,
      options,
      props,
      currentValue
    } = this;

    return h(
      // 标签名称,eg: qx-input
      `qx-${convertCamelCaseToSnakeCase(type.trim())}`,
      // props
      {
        props: {
          label,
          value: currentValue,
          options,
          ...props,
          disabled,
          clearable,
          filterable,
        },
        on: {
          input: function(value) {
            if(self.value != undefined){
              self.$emit('input', value);
              self.$emit('change', value);
            }else{
              self.$parent.model[prop] = value;
            }
          }
        }
      },
      this.$slots.default
    );
  }
}
</script>
