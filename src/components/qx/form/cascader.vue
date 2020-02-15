<template>
<div class="qx-cascader">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-cascader v-model="currentValue" @change="handleChange"
    :options="options"
    :props="props"
    :style="cascaderStyle"
    :class="[cascaderClass, 'qx-cascader-inner-cascader']"
    :clearable="clearable"
    :filterable="filterable"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :type="type"
    :show-all-levels="showAllLevels"
    :collapse-tags="collapseTags"
  ></el-cascader>
</div>
</template>

<script>
export default {
  name: 'qx-cascader',
  props: {
    // label config
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default () {
        let {
          label
        } = this;
        return !!label;
      }
    },

    // cascader style
    cascaderStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    cascaderClass: {
      type: String,
      default: '',
    },

    // cascader value
    value: {
      type: [String, Array],
      default: []
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },

    // cascader config
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
    // 属性show-all-levels定义了是否显示完整的路径，将其赋值为false则仅显示最后一级
    showAllLevels: {
      type: Boolean,
      default: true
    },

    // prop config
    multiple: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['click', 'hover'].includes(value);
      }
    },
    props: {
      type: Object,
      default () {
        let {
          multiple,
          expandTrigger
        } = this;
        let props = {
          expandTrigger: 'hover', //次级菜单的展开方式	可选值:[click , hover], 默认: 'click'
          multiple: false,
          checkStrictly: false, //是否严格的遵守父子节点不互相关联
          value: 'value', //指定选项的值为选项对象的某个属性值
          label: 'label', //指定选项标签为选项对象的某个属性值
          children: 'children', //指定选项的子选项为选项对象的某个属性值
          disabled: 'disabled', //指定选项的禁用为选项对象的某个属性值
          leaf: 'leaf', //指定选项的叶子节点的标志位为选项对象的某个属性值
        }
        if (multiple) {
          props.multiple = multiple;
        }
        if (expandTrigger) {
          props.expandTrigger = expandTrigger;
        }

        return props;
      }
    },

    // 在多选状态下, 折叠选项,并且不可搜索,否则样式就完全跑飞了
    collapseTags: {
      type: Boolean,
      default(){
        let { multiple, props } = this;
        return (props.multiple || multiple)
      }
    },
    filterable: {
      type: Boolean,
      default(){
        let { multiple, props } = this;
        return !(props.multiple || multiple)
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
    handleChange(value) {
      this.$emit('input', value); //触发 cascader 事件，并传入新值
      this.$emit('change', value); //触发 cascader 事件，并传入新值
    }
  }
}
</script>

<style lang="scss">
.qx-qbar {
  .qx-cascader {
      margin: 5px 0;
      display: inline-block;

      .qx-cascader-inner-cascader {
          width: 200px;
          margin-right: 8px;
      }

      // 多选级联中会用到,如果不加,会导致标签换行,样式跑飞.....使用 115px 的原因时配合上边的 width: 200px;
      .qx-cascader-inner-cascader .el-cascader__tags .el-tag {
        max-width: 115px;
      }
  }
}

.qx-form {
  .qx-cascader {
      margin: 2px 0;

      .qx-cascader-inner-cascader {
          width: 350px;
      }

      // 多选级联中会用到,如果不加,会导致标签换行,样式跑飞.....使用 115px 的原因时配合上边的 width: 200px;
      .qx-cascader-inner-cascader .el-cascader__tags .el-tag {
        max-width: 115px;
      }
  }
}


</style>
