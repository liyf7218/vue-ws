<template>
<section class="main" v-loading="loading">
  <section>
    <qx-qbar>
      <qx-switch label="Qbar Item Panel" v-model="qbarPanel"></qx-switch>
      <qx-switch label="Generated Qbar Panel" v-model="normalQbarPanel"></qx-switch>
      <qx-switch label="Table Panel" v-model="tablePanel"></qx-switch>
      <qx-switch label="Normal Form Panel" v-model="normalFormPanel"></qx-switch>
      <qx-switch label="Generated Form Panel" v-model="generatedFormPanel"></qx-switch>
    </qx-qbar>
  </section>

  <section v-show="qbarPanel">
    <divider></divider>
    <qx-qbar>
      <qx-label label="开关"></qx-label>
      <qx-switch v-model="switchValue" @change="handleInput"></qx-switch>
      <qx-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949" @change="handleInput"></qx-switch>
      <qx-switch v-model="switchValue" active-text="开启" inactive-text="关闭" @change="handleInput"></qx-switch>
      <qx-switch v-model="switchValueBackup" active-text="100" inactive-text="0" :active-value="100" :inactive-value="0" @change="handleInput"></qx-switch>
    </qx-qbar>
    <qx-qbar>
      <qx-label label="按钮"></qx-label>
      <qx-button type="default" @click="handleInput('default_button')">Default Button</qx-button>
      <qx-button type="primary" @click="handleInput('primary_button')">Primary Button</qx-button>
      <qx-button type="success" @click="handleInput('success_button')">Success Button</qx-button>
      <qx-button type="info" @click="handleInput('info_button')">Info Button</qx-button>
      <qx-button type="warning" @click="handleInput('warning_button')">Warning Button</qx-button>
      <qx-button type="danger" @click="handleInput('danger_button')">Danger Button</qx-button>
    </qx-qbar>
    <qx-qbar>
      <qx-input label="输入" v-model="inputValue" @change="handleInput" />
      <qx-input placeholder="请输入密码" v-model="inputValue" @change="handleInput" show-password />
      <qx-tag :tag="`Input Value:  ${inputValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-input-number label="数字" v-model="inputNumberValue" @change="handleInput" />
      <qx-input-number v-model="inputNumberValue" @change="handleInput" :precision="2" :step="0.2" />
      <qx-input-number v-model="inputNumberValue" @change="handleInput" :min="0" :max="100" :step="5" controls />
      <qx-tag :tag="`InputNumber Value:  ${inputNumberValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-select label="选择" v-model="selectValue" :options="selectOptions" @change="handleInput" />
      <qx-tag :tag="`Select Value:  ${selectValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-cascader label="级联" v-model="cascaderValue" :options="cascaderOptions" @change="handleInput" />
      <qx-cascader placeholder="多选级联" v-model="cascaderValue" :options="cascaderOptions" @change="handleInput" multiple />
      <qx-tag :tag="`Cascader Value:  ${cascaderValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-date-picker label="选择日期" v-model="datePickerValue" @change="handleInput" />
      <qx-date-picker v-model="datePickerValue" @change="handleInput" type="year" />
      <qx-date-picker v-model="datePickerValue" @change="handleInput" type="month" />
      <qx-date-picker v-model="datePickerValue" @change="handleInput" type="week" />
      <qx-date-picker v-model="datePickerValue" @change="handleInput" type="datetime" />
      <qx-tag :tag="`DatePicker Value:  ${datePickerValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-date-picker-range label="日期范围" v-model="datePickerRangeValue" @change="handleInput" />
      <qx-date-picker-range v-model="datePickerRangeValue" @change="handleInput" type="monthrange" />
      <qx-date-picker-range v-model="datePickerRangeValue" @change="handleInput" type="datetimerange" />
      <qx-tag :tag="`DatePickerRange Value:  ${datePickerRangeValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-time-picker label="选择时间" v-model="timePickerValue" @change="handleInput" />
      <qx-time-picker v-model="timePickerValue" @change="handleInput" arrow-control />
      <qx-tag :tag="`TimePicker Value:  ${timePickerValue || '--'}`"></qx-tag>
    </qx-qbar>
    <qx-qbar>
      <qx-time-picker-range label="时间范围" v-model="timePickerRangeValue" @change="handleInput" />
      <qx-time-picker-range v-model="timePickerRangeValue" @change="handleInput" arrow-control />
      <qx-tag :tag="`TimePickerRange Value:  ${timePickerRangeValue || '--'}`"></qx-tag>
    </qx-qbar>
  </section>

  <section v-show="normalQbarPanel">
    <qx-qbar :model="formData" >
      <qx-input label="label" v-model="formData.label"></qx-input>
      <qx-input label="value" v-model="formData.value"></qx-input>
      <qx-general-qbar-item prop="label"></qx-general-qbar-item>
      <qx-general-qbar-item prop="value"></qx-general-qbar-item>
      <qx-button @click="handleInput(formData)">查看</qx-button>
    </qx-qbar>
    <qx-general-qbar :model="parameters" @query="handleInput(parameters)" @create="handleInput(parameters)" ></qx-general-qbar>
  </section>

  <section v-show="tablePanel">
    <divider></divider>
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

  <section v-show="normalFormPanel">
    <divider></divider>
    <qx-form :model="formData" :rules="formRules">
      <qx-general-form-item label="label" prop="label"></qx-general-form-item>
      <qx-general-form-item label="value" prop="value"></qx-general-form-item>
      <qx-form-item>
        <qx-button type="success" @click="submit">submit</qx-button>
        <qx-button type="info" @click="cancel">cancel</qx-button>
      </qx-form-item>
    </qx-form>
  </section>

  <section v-show="generatedFormPanel">
    <divider></divider>
    <qx-general-form :model="formData" @submit="submit" @cancel="cancel" ></qx-general-form>
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

      // 按块显示
      qbarPanel: false,
      normalQbarPanel: true,
      tablePanel: false,
      normalFormPanel: false,
      generatedFormPanel: false,

      // qbarPanel
      switchValue: true,
      switchValueBackup: 0,
      inputValue: '',
      inputNumberValue: '',
      selectValue: '',
      selectOptions: [],
      datePickerValue: '',
      datePickerRangeValue: [],
      cascaderValue: [],
      cascaderOptions: [],
      timePickerValue: '',
      timePickerRangeValue: '',

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

      // normalFormPanel
      formData: {
        label: '',
        value: '',
      },
      formRules: {
        label: [],
        value: [],
      }
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
      this.selectOptions = getOptions();
      this.cascaderOptions = getCascaderOptions();
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
    },
    cancel() {
      this.tablePanel = true;
    },
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
