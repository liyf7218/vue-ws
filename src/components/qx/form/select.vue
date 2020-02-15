<template>
<div class="qx-select">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-select v-model="currentValue" @change="handleChange"
    :style="selectStyle"
    :class="[selectClass, 'qx-select-inner-select']"
    :clearable="clearable"
    :filterable="filterable"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
  >
    <el-option v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</div>
</template>

<script>
export default {
  name: 'qx-select',
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

    // select style
    selectStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    selectClass: {
      type: String,
      default: '',
    },

    // select config
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
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
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },


    // options style

    // options config
    options: {
      type: Array,
      required: true,
      default() {
        return [];
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
      this.$emit('input', value); //触发 select 事件，并传入新值
      this.$emit('change', value); //触发 select 事件，并传入新值
    }
  }
}
</script>

<style scoped lang="scss">
.qx-qbar {
  .qx-select {
    margin: 5px 0;
    display: inline-block;

    .qx-select-inner-select {
      width: 200px;
      margin-right: 8px;
    }
  }
}

.qx-form {
  .qx-select {
    margin: 2px 0;

    .qx-select-inner-select {
      width: 350px;
    }
  }
}
</style>
