<template>
<section>
  <qx-form :model="model">
    <qx-general-form-item v-for="{label, prop} in formattedOptions" :key="prop" :label="label" :prop="prop"></qx-general-form-item>
    <slot></slot>
    <qx-form-item>
      <qx-button type="success" @click="$emit('submit')">submit</qx-button>
      <qx-button type="info" @click="$emit('cancel')">cancel</qx-button>
    </qx-form-item>
  </qx-form>
</section>
</template>
<script>
export default {
  name: 'qx-general-form',
  props: {
    // 表单数据
    model: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    // form 属性
    props: {
      type: Object,
      default () {
        return {}
      }
    },
    // 生成表单项的 datas
    options: {
      type: Array,
      default () {
        return Object.keys(this.model);
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
  },
}
</script>
