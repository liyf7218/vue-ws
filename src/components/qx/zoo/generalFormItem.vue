<script>
function convertCamelCaseToSnakeCase(camelCaseString = '', linkSymbol = '-') {
  return camelCaseString.replace(/(^-|-$)/g, '').replace(/(^_|_$)/g, '').replace(/[A-Z]/g, letter => `${linkSymbol}${letter.toLowerCase()}`)
}
export default {
  name: 'qx-general-form-item',
  props: {
    // form-item 的属性,包括 label,prop
    // 这个 porp 原本是用来表单验证的(当前也是),这里给个必填
    // 同时,这个 prop 也是我们省略 v-model 的必要属性,根据这个找到当前 form-item 对应的 表单属性
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
    // 这个 props 是用来给 form-item 设置其他属性的,比如 label-width,查看 [qx-form-item]
    props: {
      type: Object,
      default () {
        return {}
      }
    },

    // form-item 内部 form 组件的类别
    type: {
      type: String,
      default: 'input',
      validator(value) {
        return ['input', 'inputNumber', 'select', 'cascader', 'datePicker', 'datePickerRange', 'timePicker', 'timePickerRange'].includes(value.trim());
      }
    },
    // form-item 内部 form 组件的属性
    value: {
      type: [String, Array]
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    // 当 type 为选择框或者级联框时,需要提供 options
    options: {
      type: Array,
      default () {
        return [];
      }
    },
    // 这个 properties 是用来给 表单组件 设置其他属性的,比如 size,查看 [qx/form/{input,select,...}]
    properties: {
      type: Object,
      default () {
        return {}
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
      label,
      prop,
      props,
      type,
      value,
      disabled,
      clearable,
      filterable,
      options,
      properties,
      currentValue
    } = this;
    // 创建 form-item-form-component 实例
    let formItemInnerElement =  h(
      // 标签名称,eg: el-input
      `qx-${convertCamelCaseToSnakeCase(type.trim())}`,
      // properties
      {
        props: {
          value: currentValue,
          options,
          disabled,
          clearable,
          filterable,
          ...properties,
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
      }
    );

    return h(
      // element-tag
      "qx-form-item",
      // element-props
      {
        props: {
          label,
          prop,
          ...props,
        }
      },
      // children
      [
        formItemInnerElement,
        this.$slots.default
      ]
    );
  }
}
</script>
