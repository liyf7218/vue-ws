<template>
<section class="main" v-loading="loading">
  <section>
    <qx-qbar>
      <qx-switch label="Normal Form Panel" v-model="normalFormPanel"></qx-switch>
      <qx-switch label="Generated Form Panel" v-model="generatedFormPanel"></qx-switch>
    </qx-qbar>
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
      normalFormPanel: true,
      generatedFormPanel: false,

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
