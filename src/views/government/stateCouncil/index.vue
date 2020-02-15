<template>
<section>
  <qx-general-qbar :model="parameters" @query="queryTable(parameters)" @create="queryTable(parameters)" ></qx-general-qbar>
  <qx-table :data="tableData" @selection-change="selectTableData">
    <qx-table-column type="selection" align="center" width="100"></qx-table-column>
    <qx-table-column v-for="ele in unitData" :key="ele.prop" :label="ele.label" :prop="ele.prop" align="center"></qx-table-column>
    <qx-table-column label="操作" align="center">
      <template slot-scope="{ row }">
        <qx-button size="small" type="warning" icon="el-icon-edit" @click="updateItem(row)"></qx-button>
        <qx-button size="small" type="error" icon="el-icon-delete" @click="deleteItem(row)"></qx-button>
      </template>
    </qx-table-column>
  </qx-table>
  <qx-pagination :total="total" :page-number.sync="parameters.pageNumber" :page-size="parameters.pageSize" @change="handlePageChange"></qx-pagination>
</section>
</section>
</template>
<script>

export default {
  data() {

    let unitData = [
      { prop: 'department', label: '名称' },
      { prop: 'pid', label: '上级组织' },
      { prop: 'avatar', label: '组织图片' },
      { prop: 'introduction', label: '简介' },
      { prop: 'website', label: '网站' },
      { prop: 'abbrivation', label: '简称' },
      { prop: 'common_name', label: '通用名' },
    ];
    let parameters = unitData.reduce((result, ele) => {
      result[ele.prop] = "";
      return result;
    },{
      pageNumber: 1,
      pageSize:10
    })

    return {
      loading: false,

      // tablePanel
      unitData,
      parameters,
      parametersChanged: false,
      tableData: [],
      total: 0,

    }
  },
  computed: {
    temporaryParameters() {
      let {
        pageNumber,
        pageSize,
        ...rest
      } = this.parameters;
      return JSON.stringify(rest);
    }
  },
  watch: {
    temporaryParameters(currentTemporaryValue, lastTemporaryValue) {
      let currentValue = JSON.parse(currentTemporaryValue);
      let lastValue = JSON.parse(lastTemporaryValue);
      // 如果没有参数或者参数值不是对象,说明数据错误
      if (typeof currentValue != 'object' || typeof lastValue != 'object') {
        return;
      }
      if (this.parameters.pageNumber == 1) {
        return;
      }
      this.parametersChanged = false; // 定义表明参数变化的布尔变量
      for (let property in currentValue) {
        if (currentValue[property] != lastValue[property]) {
          this.parametersChanged = true;
          break;
        }
      }
    }
  },
  methods: {
    // 初始化当前页面,主要是指页面数据的加载!!
    initialize() {
      this.queryTable();
    },

    // tablePanel handlers
    queryTable() {
      if (this.parametersChanged) {
        this.parameters.pageNumber = 1;
        this.parametersChanged = false;
        return;
      }
      this.getTableData();
    },
    async getTableData(parameters = this.parameters) {
      let {
        data: {
          data,
          total
        }
      } = await this.$axios.post(this.$url + '/government/list', parameters);
      console.log(data, total);
      this.tableData = data;
      this.total = total;
    },
    handlePageChange(pageSize, pageNumber) {
      this.parameters.pageSize = pageSize;
      this.parameters.pageNumber = pageNumber;
      this.queryTable();
    },
    selectTableData(...props) {
      console.log("outter select: ", ...props);
    },
    updateItem(row) {
      this.formData = {
        ...row
      };
      this.tablePanel = false;
      this.normalFormPanel = true;
      console.log(row);
    },
    deleteItem(row) {
      console.log(row);
    },
    submit() {
      console.log(this.formData);
    }
  },
  created() {
    this.initialize();
  }
}
</script>
<style scoped lang="scss">
.main {
    min-height: 200px;
}

.table-panel {
    border: 1px solid #294753;
    min-height: 400px;
}
</style>
