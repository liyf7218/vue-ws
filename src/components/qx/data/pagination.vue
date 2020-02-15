<template>
<div class="qx-pagination">
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
    :small="small"
    :background="background"
    :page-size="currentPageSize"
    :total="total"
    :page-count="pageCount"
    :pager-count="pagerCount"
    :current-page="currentPageNumber"
    :layout="layout"
    :page-sizes="pageSizes"
    :prev-text="prevText"
    :next-text="nextText"
    :disabled="disabled"
    :hide-on-single-page="hideOnSinglePage"
    :style="paginationStyle"
    :class="['qx-pagination-inner-pagination', paginationClass]">
    <slot></slot>
  </el-pagination>
</div>
</template>

<script>
export default {
  name: 'qx-pagination',
  props: {
    // pagination style
    paginationStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    paginationClass: {
      type: String,
      default: ''
    },

    // pagination config
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前页数，支持 .sync 修饰符
    pageNumber: {
      type: Number,
      default: 1
    },
    // 总条目数
    total: {
      type: Number,
    },
    // 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
    pageCount: {
      type: Number,
    },
    // 页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default: 7
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
      validator(value){
        return value.split(',').every(ele => ['sizes', 'prev', 'pager', 'next', 'jumper', '->', 'total', 'slot'].includes(ele.trim()));
      }
    },
    // 	每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      },
      validator(value){
        return value.every(ele => Number.isInteger(ele));
      }
    },
    small: Boolean,
    background: Boolean,
    // 	替代图标显示的上一页文字
    prevText: String,
    // 替代图标显示的下一页文字
    nextText: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    // 只有一页时是否隐藏
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    pageNumber(current){
      this.currentPageNumber = current;
      this.handleChange();
    }
  },
  data() {
    return {
      currentPageNumber: this.pageNumber,
      currentPageSize: this.pageSize,

      // 用于标识上一次的值
      lastPageNumber: this.pageNumber,
      lastPageSize: this.pageSize,
    }
  },
  methods: {
    handleChange() {
      let { currentPageSize, currentPageNumber, lastPageSize, lastPageNumber } = this;
      // 如果数值米有变化,那就不用触发了,这个也是为了避免延迟造成的重复触发!!!!
      if( !(currentPageSize === lastPageSize && currentPageNumber === lastPageNumber) ){
        // console.log('pageSize: ', lastPageSize, '->', currentPageSize, '  pageNumber: ', lastPageNumber, '->', currentPageNumber);
        this.lastPageSize = currentPageSize;
        this.lastPageNumber = currentPageNumber;
        this.$emit('change', currentPageSize, currentPageNumber); //触发 change 事件，返回 当前的页码 和 当前的每页数量
      }
    },
    handleSizeChange(size){
      let _this = this;
      this.currentPageSize = size;
      // 这里需要有一个延时控制,因为当原来的页数较小(10),页码偏后(5, 总共5页)时,改变页数(30),页码会从(5)变为(2)
      // 此时大约有10ms的延迟,会再次触发 handleCurrentChange 事件,所以这里应当加一个延迟操作.
      setTimeout(() => {
        _this.handleChange();
      }, 50);
    },
    handleCurrentChange(current){
      let _this = this;
      this.currentPageNumber = current;
      this.handleChange();
    },
  }
}
</script>

<style scoped lang="scss">
.qx-pagination {
    width: 100%;
    margin: 10px;
}

.qx-pagination-inner-pagination {
    width: 100%;
}
</style>
