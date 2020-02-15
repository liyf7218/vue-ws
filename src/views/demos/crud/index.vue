<template>
<section class="main" v-loading="loading">
  <qx-general-qbar :model="parameters" @query="query" @create="log"></qx-general-qbar>
</section>
</template>

<script>
import {
  getArray,
  getOptions,
  getCascaderOptions,
  getTableData
} from '@/mixins/fakeData';

function getParameterOptions(initialOptions = {}) {
  let parameters = {
    ...initialOptions.map(ele => ele.prop),
    pageNumber: 1,
    pageSize: 10,
  };
  let qbarOptions = initialOptions.map(ele => ({
    ...ele,
    prop: ele.prop,
    label: ele.label || ele.prop,
    type: ele.type || 'input',
  }))
}

export default {
  data() {
    let initialOptions = [
      { prop: 'label', label: 'label', type: 'input' },
      { prop: 'value', label: 'value', type: 'input' },
    ];
    return {
      // loading 模态层
      loading: false,

      // 查询参数
      parameters: {
        label: '',
        value: '',
        pageNumber: 1,
        pageSize: 10
      },

      // table 表格数据
      tableData: [],
      total: 0,

      // dislog 对话框显示控制
      dialogVisibleAdd: false,
    }
  },
  methods: {
    log(value) {
      console.log(value);
    },

    query(parameters = this.parameters) {
      let { info, payload } = getTableData(parameters);
      if(info.code == 200) {
        this.total = info.total;
        this.tableData = payload.data;
      };
      console.log(parameters);
      console.log(this.tableData);
    },
  },
  created() {
    this.query();
  }
}
</script>

<style scoped lang="scss">

</style>
