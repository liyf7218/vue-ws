<template>
<div>
  <div class="qx-qbar" :model="model" >
    <slot>
      Empty Query Bar.
    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'qx-qbar',
  props: {
    model: Object,
    default(){
      return {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.qx-qbar {
    border-bottom: dashed 1px lightgray;
    margin: 5px 0;
    // height: 45px;
    padding: 8px 0;
    // 使用 line-height 会使组件的清除按钮高度发生变化，影响视觉效果，切记勿用
    // line-height: 50px;
}
</style>
