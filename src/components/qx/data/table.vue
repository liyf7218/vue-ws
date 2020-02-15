<template>
<div class="qx-table">
  <el-table
    :data="data"
    :style="tableStyle"
    :class="['qx-table-inner-table', tableClass]"
    :stripe="stripe"
    :border="border"
    :size="size"
    :fit="fit"
    :show-header="showHeader"
    :highlight-current-row="highlightCurrentRow"
    :row-rey="rowKey"
    :empty-text="emptyText"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :tooltip-effect="tooltipEffect"
    :show-summary="showSummary"
    :sum-text="sumText"
    :summary-method="summaryMethod"
    :span-method="spanMethod"

    @select="(selection, row) => $emit('select', selection, row)"
    @select-all="(selection) => $emit('select-all', selection)"
    @selection-change="(selection) => $emit('selection-change', selection)"
    @cell-mouse-enter="(row, column, cell, event) => $emit('cell-mouse-enter', row, column, cell, event)"
    @cell-mouse-leave="(row, column, cell, event) => $emit('cell-mouse-leave', row, column, cell, event)"
    @cell-click="(row, column, cell, event) => $emit('cell-click', row, column, cell, event)"
    @cell-dblclick="(row, column, cell, event) => $emit('cell-dblclick', row, column, cell, event)"
    @row-click="(row, column, event) => $emit('row-click', row, column, event)"
    @row-contextmenu="(row, column, event) => $emit('row-contextmenu', row, column, event)"
    @row-dblclick="(row, column, event) => $emit('row-dblclick', row, column, event)"
    @header-click="(column, event) => $emit('header-click', column, event)"
    @header-contextmenu="(column, event) => $emit('header-contextmenu', column, event)"
    @sort-change="({ column, prop, order }) => $emit('sort-change', { column, prop, order })"
    @filter-change="(filters) => $emit('filter-change', filters)"
    @current-change="(currentRow, oldCurrentRow) => $emit('current-change', currentRow, oldCurrentRow)"
    @header-dragend="(newWidth, oldWidth, column, event) => $emit('header-dragend', newWidth, oldWidth, column, event)"
    @expand-change="(row, expanded) => $emit('expand-change', row, expanded)"
  >
    <slot slot="empty" name="empty"></slot>
    <slot></slot>
    <!-- 	插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。 -->
    <slot slot="append" name="append"></slot>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'qx-table',
  props: {
    // table style
    tableStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    tableClass: {
      type: String,
      default: ''
    },

    // table config
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    tableReference: {
      type: String,
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value);
      }
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    // 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    rowKey	: {
      type: [Function, String],
    },
    // 空数据时显示的文本内容，也可以通过 slot="empty" 设置
    emptyText: {
      type: String,
    },
    // 是否默认展开所有行，当 Tale 包含展开行存在或者为树形表格时有效
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    expandRowKeys: {
      type: Array,
    },
    // tooltip effect 属性
    tooltipEffect: {
      type: String
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    sumText: {
      type: String,
      default: '合计'
    },
    summaryMethod: {
      type: Function,
      default() {
        return function summaryMethod({
          columns,
          data
        }) {
          // do nothing.
        }
      }
    },
    spanMethod: {
      type: Function,
      default() {
        return function spanMethod({
          row,
          column,
          rowIndex,
          columnIndex
        }) {
          // do nothing.
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
.qx-table {
    width: 100%;
}

.qx-table-inner-table {
    width: 100%;
}
</style>
