<template>
<div class="qx-general-table">
  <qx-table
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
    <qx-table-column type="selection" align="center" width="100"></qx-table-column>
    <qx-table-column v-for="ele in model" :label="ele.label" :prop="ele.prop" align="center"></qx-table-column>
    <qx-table-column label="操作" align="center">
      <template slot-scope="{ row }">
        <qx-button size="small" type="warning" icon="el-icon-edit" @click="updateItem(row)"></qx-button>
        <qx-button size="small" type="error" icon="el-icon-delete" @click="deleteItem(row)"></qx-button>
      </template>
    </qx-table-column>
  </qx-table>
  <qx-pagination :total="total" :page-number.sync="parameters.pageNumber" :page-size="parameters.pageSize" @change="handlePageChange"></qx-pagination>
</div>
</template>

<script>
export default {
  name: 'qx-general-table',
  props: {
    // table config
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [
          { label: 'id', prop: 'id' }
        ];
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
