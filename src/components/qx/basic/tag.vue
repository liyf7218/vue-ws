<template>
<div v-if="showTag" :class="['qx-tag', tagClass ]" :style="tagStyle">
  <el-tag
  :type="type"
  :closable="closable"
  :disable-transitions="disableTransitions"
  :hit="hit"
  :color="color"
  :size="size"
  :effect="effect"
  >{{tag}}</el-tag>
</div>
</template>

<script>
export default {
  name: 'qx-tag',
  props: {
    // tag style
    tagStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    tagClass: {
      type: String,
      default: '',
    },

    // tag config
    tag: {
      type: String,
      default: ''
    },
    showTag: {
      type: Boolean,
      default () {
        // 要取到 tag 的值,必须将其定义在此属性之前,可能是 TDZ 的缘故.
        let {
          tag
        } = this;
        return !!tag;
      }
    },
    type: String,
    closable: {
      type: Boolean,
      default: false,
    },
    disableTransitions: {
      type: Boolean,
      default: false,
    },
    hit: {
      type: Boolean,
      default: false,
    },
    color: String,
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value);
      }
    },
    effect: {
      type: String,
      default: 'light',
      validator(value) {
        return ['dark', 'light', 'plain'].includes(value);
      }
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.qx-tag {
  display: inline-block;
  float: right;
  margin-right: 20px;
  line-height: 40px;
}

.qx-tag-text {

}
</style>
