import axios from 'axios';

export default {
  data() {
    return {
      // global mixins
      loading: true, //遮罩层

      // list mixins
      disabled: true, //禁用状态
      listUrl: '', //列表地址,
      params: {}, // 参数项
      tableData: [], //表格数据
      total: 0, //列表总数
      // ids: "", //多选id
      // checkedList: [], //选中的对象

      // form mixins
      type: 'add', //操作类型
      dataInfo: {}, //基础表单信息
    }
  },
  methods: {
    // list mixins
    initTableData(url, params) {
      this.params = params;
      this.listUrl = url;
      this.getTableData(params)
    },
    query() { //条件查询
      this.getTableData(this.params);
    },
    getTableData(params = this.params) { //获取表格数据
      this.loading = true;
      axios.post(this.listUrl, params)
        .then(res => {
          this.loading = false;
          if (res.code == '200') {
            if (res.totalCount != undefined) {
              this.total = res.totalCount;
            }
            this.tableData = res.body;
          } else {
            this.tableData = [];
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    getPages(pageNo, pageSize) {
      //获取翻页数据
      this.params.pageNo = pageNo;
      this.params.pageSize = pageSize;
      this.getTableData(this.params);
    },
    checkIds(val) {
      let ids = [];
      for (let i in val) {
        ids.push(val[i].id);
      }
      this.ids = ids.join(",");
      this.disabled = val.length > 0 ? false : true;
      this.checkedList = val;
    },

    // form mixins
    getDataInfo(id, obj) {},
    setType(type) {
      switch (type) {
        case 'edit':
        case 'modify':
        case 'update':
          type = 'edit';
          break;
        case 'add':
        case 'create':
        case 'insert':
        case 'save':
        default:
          type = 'save'
      }
      this.type = type;
    }
    isType(type) {
      switch (type) {
        case 'edit':
        case 'modify':
        case 'update':
          type = 'edit';
          break;
        case 'add':
        case 'create':
        case 'insert':
        case 'save':
        default:
          type = 'save'
      }
      return this.type == type ? true : false;
    },
    validateForm(formRef = 'form') {
      let validatePass = false;
      let form = this.$refs[formRef];
      form.validate((valid) => { //验证方法
        validatePass = valid
        if (!valid) {
          this.$errorMessage('表单验证不通过,请检查 必填项 和 各数据的格式要求!');
        }
      });
      return validatePass;
    },
    clearFormValidate(formRef = 'form') {
      let form = this.$refs[formRef];
      form.clearValidate();
    }
  },
  created() {

  }
}
