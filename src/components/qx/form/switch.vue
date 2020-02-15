<template>
<div class="qx-switch">
  <qx-label :label="label" :showLabel="showLabel" />
  <el-switch v-model="currentValue" @change="handleChange"
  :style="switchStyle"
  :class="[switchClass, 'qx-switch-inner-switch']"
  :disabled="disabled"
  :width="width"
  :active-icon-class="activeIconClass"
  :inactive-icon-class="inactiveIconClass"
  :active-text="activeText"
  :inactive-text="inactiveText"
  :active-value="activeValue"
  :inactive-value="inactiveValue"
  :active-color="activeColor"
  :inactive-color="inactiveColor"
  ></el-switch>
</div>
</template>

<script>
export default {
  name: 'qx-switch',
  props: {
    // label config
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default() {
        // 要取到 label 的值,ixu将其定义在此属性之前,可能是 TDZ 的缘故.
        let {
          label
        } = this;
        return !!label;
      }
    },

    // switch style
    switchStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    switchClass: {
      type: String,
      default: '',
    },

    // switch config
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    // switch 的宽度（像素）
    width: {
      type: Number,
      default: 40
    },
    // switch 打开时所显示图标的类名，设置此项会忽略 active-text
    activeIconClass: String,
    // switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text
    inactiveIconClass: String,
    activeText: String,
    inactiveText: String,
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    // switch 打开时的背景色
    activeColor: {
      type: String,
      default: '#409EFF'
    },
    // 	switch 关闭时的背景色
    inactiveColor: {
      type: String,
      default: '#C0CCDA'
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
      this.$emit('input', value); //触发 input 事件，并传入新值
      this.$emit('change', value); //触发 change 事件，并传入新值
    }
  }
}
</script>

<style scoped lang="scss">
.qx-qbar {
  .qx-switch {
      margin: 5px 0;
      display: inline-block;

      .qx-switch-inner-switch {
          width: 200px;
          margin-right: 8px;
      }
  }
}

.qx-form {
  .qx-switch {
      margin: 2px 0;

      .qx-switch-inner-switch {
          width: 350px;
      }
  }
}

</style>
