<template>
<el-table-column
  :type="type"
  :index="index"
  :column-key="columnKey"
  :label="label"
  :prop="prop"
  :width="width"
  :min-width="minWidth"
  :fixed="fixed"
  :render-header="renderHeader"
  :sortable="sortable"
  :sort-method="sortMethod"
  :sort-by="sortBy"
  :sort-orders="sortOrders"
  :resizable="resizable"
  :formatter="formatter"
  :show-overflow-tooltip="showOverflowTooltip"
  :align="align"
  :header-align="headerAlign"
  :selectable="selectable"
  :reserve-selection="reserveSelection"
  :filters="filters"
  :filter-placement="filterPlacement"
  :filter-multiple="filterMultiple"
  :filter-method="filterMethod"
  :filtered-value="filteredValue"
>
    <slot name="header" slot="header" slot-scope="scope" :row="scope.row" :column="scope.column" :$index="scope.$index"  ></slot>
    <slot v-if="scope.column.type == 'default'" slot-scope="scope" :row="scope.row" :column="scope.column" :$index="scope.$index" >
        {{ scope.row[scope.column.property] }}
    </slot>
    <slot v-if="scope.column.type == 'selection'" slot-scope="scope" :row="scope.row" :column="scope.column" :$index="scope.$index">
      <!-- 这个是真滴难,要看一下源码 -->
    </slot>
</el-table-column>
</template>

<script>

export default {
  name: 'qx-table-column',
  props: {
    // table-column config
    // 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮
    type: {
      type: String,
      validator(value){
        return ['selection', 'index', 'expand'].includes(value);
      }
    },
    // 	如果设置了 type=index，可以通过传递 index 属性来自定义索引
    index: {
      type: [Number, Function],
    },
    // column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
    columnKey: {
      type: String,
    },
    label: String,
    prop: String,
    width: String,
    // 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
    minWidth: String,
    // 列是否固定在左侧或者右侧，true 表示固定在左侧
    fixed: {
      type: [Boolean, String],
      validator(value){
        return [true, false, 'left', 'right'].includes(value);
      }
    },
    // 列标题 Label 区域渲染使用的 Function: 	Function(h, { column, $index })
    renderHeader: Function,
    // 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
    sortable: {
      type: [Boolean, String],
      default: false,
      validator(value){
        return [true, false, 'custom'].includes(value);
      }
    },
    // 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致: Function(a, b)
    sortMethod: {
      type: Function
    },
    // 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
    // String/Array/Function(row, index)
    sortBy: [String, Array, Function],
    // 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序
    // 数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
    sortOrders: {
      type: Array,
      default(){
        return ['ascending', 'descending', null];
      }
    },
    // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
    resizable: {
      type: Boolean,
      default: true,
    },
    // 用来格式化内容: Function(row, column, cellValue, index)
    formatter: {
      type: Function,
    },
    // 当内容过长被隐藏时显示 tooltip
    showOverflowTooltip: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'center',
      validator(value){
        return ['left', 'center', 'right'].includes(value);
      }
    },
    headerAlign: {
      type: String,
      default: 'center',
      validator(value){
        return ['left', 'center', 'right'].includes(value);
      }
    },
    // 	仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选: Function(row, index)
    selectable: {
      type: Function,
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: Boolean,
    // 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性: Array[{ text, value }]
    filters: Array,
    // 过滤弹出框的定位
    filterPlacement: String,
    // 数据过滤的选项是否多选
    filterMultiple: {
      type: Boolean,
      default: true,
    },
    // 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示: Function(value, row, column)
    filterMethod: Function,
    // 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性.
    filteredValue: Array,
  },
}
</script>

<style scoped lang="scss">

</style>
