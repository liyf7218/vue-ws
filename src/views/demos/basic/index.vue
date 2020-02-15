<template>
<section class="main" v-loading="loading">
  <section>
    <qx-qbar>
      <qx-switch label="Qbar Item Panel" v-model="qbarPanel"></qx-switch>
      <qx-switch label="Generated Qbar Panel" v-model="normalQbarPanel"></qx-switch>
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
    <divider></divider>
    <qx-qbar :model="formData" >
      <qx-input label="label" v-model="formData.label"></qx-input>
      <qx-input label="value" v-model="formData.value"></qx-input>
      <qx-general-qbar-item prop="label"></qx-general-qbar-item>
      <qx-general-qbar-item prop="value"></qx-general-qbar-item>
      <qx-button @click="handleInput(formData)">查看</qx-button>
    </qx-qbar>
    <divider></divider>
    <qx-general-qbar :model="parameters" @query="handleInput(parameters)" @create="handleInput(parameters)" ></qx-general-qbar>
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

      // 按块显示
      qbarPanel: false,
      normalQbarPanel: true,
      tablePanel: false,

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
  methods: {
    // 初始化当前页面,主要是指页面数据的加载!!
    initialize() {
      this.selectOptions = getOptions();
      this.cascaderOptions = getCascaderOptions();
    },

    // qbarPanel handlers
    handleInput(value) {
      this.$successMessage(typeof value == 'string' ? (value || "Empty Value!!") : value);
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
