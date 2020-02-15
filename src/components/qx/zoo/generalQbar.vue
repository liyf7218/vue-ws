<template>
<section>
  <qx-qbar :model="model">
    <qx-general-qbar-item v-for="{label, prop} in formattedOptions" :key="prop" :label="label" :prop="prop"></qx-general-qbar-item>
    <slot></slot>
    <qx-button type="primary" @click="$emit('query', model)">查询</qx-button>
    <qx-button type="success" @click="$emit('create', model)">新增</qx-button>
    <slot name="button"></slot>
  </qx-qbar>
</section>
</template>
<script>
export default {
  name: 'qx-general-qbar',
  props: {
    // 表单数据
    model: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    // 生成表单项的 datas
    options: {
      type: Array,
      default () {
        return Object.keys(this.model).filter(ele => !(ele == 'pageNumber' || ele == 'pageSize'));
      },
      validator(value) {
        return value.every(ele => (typeof ele == 'string')) ||
          value.every(ele => (typeof ele == 'object' && ele.hasOwnProperty('label') && ele.hasOwnProperty('prop')))
      }
    },
    formattedOptions: {
      type: Array,
      default () {
        let { options } = this;
        return options.every(ele => (typeof ele == 'string')) ? options.map(ele => ({
          label: ele,
          prop: ele
        })) : options;
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>
