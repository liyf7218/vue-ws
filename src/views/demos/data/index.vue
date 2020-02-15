<template>
  <section>
    <qx-qbar>
      <qx-input label="label" v-model="parameters.label"></qx-input>
      <qx-input label="value" v-model="parameters.value"></qx-input>
      <qx-button @click="queryTable()">查询</qx-button>
    </qx-qbar>
    <qx-table :data="tableData" @selection-change="selectTableData">
      <qx-table-column type="selection" align="center" width="100"></qx-table-column>
      <qx-table-column label="label" prop="label" align="center"></qx-table-column>
      <qx-table-column label="value" prop="value" align="center"></qx-table-column>
      <qx-table-column label="operation" align="center">
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
import {
  getArray,
  getOptions,
  getCascaderOptions,
  getTableData,
} from '@/mixins/fakeData';
export default {
  data() {
    return {
      loading: false,

      // tablePanel
      parameters: {
        label: '',
        value: '',
        pageNumber: 1,
        pageSize: 10,
      },
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

    // qbarPanel handlers
    handleInput(value) {
      this.$successMessage(typeof value == 'string' ? (value || "Empty Value!!") : value);
    },

    // tablePanel handlers
    queryTable() {
      if (this.parametersChanged) {
        this.parameters.pageNumber = 1;
        this.parametersChanged = false;
        return;
      }
      let {
        info,
        payload
      } = getTableData(this.parameters);
      this.tableData = payload.data;
      this.total = info.total;
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
