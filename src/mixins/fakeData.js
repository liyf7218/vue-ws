export function getArray(count = 10) {
  return new Array(count).fill().map((ele, index) => index + 1)
}

export function getOptions() {
  return [{
    label: '赵',
    value: 'zhao'
  }, {
    label: '钱',
    value: 'qian'
  }, {
    label: '孙',
    value: 'sun'
  }, {
    label: '李',
    value: 'li'
  }, ]
}

export function getCascaderOptions() {
  return [{
    value: 'zhinan',
    label: '指南',
    children: [{
      value: 'shejiyuanze',
      label: '设计原则',
      children: [{
        value: 'yizhi',
        label: '一致'
      }, {
        value: 'fankui',
        label: '反馈'
      }, {
        value: 'xiaolv',
        label: '效率'
      }, {
        value: 'kekong',
        label: '可控'
      }]
    }, {
      value: 'daohang',
      label: '导航',
      children: [{
        value: 'cexiangdaohang',
        label: '侧向导航'
      }, {
        value: 'dingbudaohang',
        label: '顶部导航'
      }]
    }]
  }, {
    value: 'zujian',
    label: '组件',
    children: [{
      value: 'basic',
      label: 'Basic',
      children: [{
        value: 'layout',
        label: 'Layout 布局'
      }, {
        value: 'color',
        label: 'Color 色彩'
      }, {
        value: 'typography',
        label: 'Typography 字体'
      }, {
        value: 'icon',
        label: 'Icon 图标'
      }, {
        value: 'button',
        label: 'Button 按钮'
      }]
    }, {
      value: 'form',
      label: 'Form',
      children: [{
        value: 'radio',
        label: 'Radio 单选框'
      }, {
        value: 'checkbox',
        label: 'Checkbox 多选框'
      }, {
        value: 'input',
        label: 'Input 输入框'
      }, {
        value: 'input-number',
        label: 'InputNumber 计数器'
      }, {
        value: 'select',
        label: 'Select 选择器'
      }, {
        value: 'cascader',
        label: 'Cascader 级联选择器'
      }, {
        value: 'switch',
        label: 'Switch 开关'
      }, {
        value: 'slider',
        label: 'Slider 滑块'
      }, {
        value: 'time-picker',
        label: 'TimePicker 时间选择器'
      }, {
        value: 'date-picker',
        label: 'DatePicker 日期选择器'
      }, {
        value: 'datetime-picker',
        label: 'DateTimePicker 日期时间选择器'
      }, {
        value: 'upload',
        label: 'Upload 上传'
      }, {
        value: 'rate',
        label: 'Rate 评分'
      }, {
        value: 'form',
        label: 'Form 表单'
      }]
    }, {
      value: 'data',
      label: 'Data',
      children: [{
        value: 'table',
        label: 'Table 表格'
      }, {
        value: 'tag',
        label: 'Tag 标签'
      }, {
        value: 'progress',
        label: 'Progress 进度条'
      }, {
        value: 'tree',
        label: 'Tree 树形控件'
      }, {
        value: 'pagination',
        label: 'Pagination 分页'
      }, {
        value: 'badge',
        label: 'Badge 标记'
      }]
    }, {
      value: 'notice',
      label: 'Notice',
      children: [{
        value: 'alert',
        label: 'Alert 警告'
      }, {
        value: 'loading',
        label: 'Loading 加载'
      }, {
        value: 'message',
        label: 'Message 消息提示'
      }, {
        value: 'message-box',
        label: 'MessageBox 弹框'
      }, {
        value: 'notification',
        label: 'Notification 通知'
      }]
    }, {
      value: 'navigation',
      label: 'Navigation',
      children: [{
        value: 'menu',
        label: 'NavMenu 导航菜单'
      }, {
        value: 'tabs',
        label: 'Tabs 标签页'
      }, {
        value: 'breadcrumb',
        label: 'Breadcrumb 面包屑'
      }, {
        value: 'dropdown',
        label: 'Dropdown 下拉菜单'
      }, {
        value: 'steps',
        label: 'Steps 步骤条'
      }]
    }, {
      value: 'others',
      label: 'Others',
      children: [{
        value: 'dialog',
        label: 'Dialog 对话框'
      }, {
        value: 'tooltip',
        label: 'Tooltip 文字提示'
      }, {
        value: 'popover',
        label: 'Popover 弹出框'
      }, {
        value: 'card',
        label: 'Card 卡片'
      }, {
        value: 'carousel',
        label: 'Carousel 走马灯'
      }, {
        value: 'collapse',
        label: 'Collapse 折叠面板'
      }]
    }]
  }, {
    value: 'ziyuan',
    label: '资源',
    children: [{
      value: 'axure',
      label: 'Axure Components'
    }, {
      value: 'sketch',
      label: 'Sketch Templates'
    }, {
      value: 'jiaohu',
      label: '组件交互文档'
    }]
  }]
}

export function getTableData(parameters = {}){
  let tableData = [
    { value: "Layout", label: "布局" },
    { value: "Container", label: "布局容器" },
    { value: "Color", label: "色彩" },
    { value: "Typography", label: "字体" },
    { value: "Border", label: "边框" },
    { value: "Icon", label: "图标" },
    { value: "Button", label: "按钮" },
    { value: "Link", label: "文字链接" },
    { value: "Radio", label: "单选框" },
    { value: "Checkbox", label: "多选框" },
    { value: "Input", label: "输入框" },
    { value: "InputNumber", label: "计数器" },
    { value: "Select", label: "选择器" },
    { value: "Cascader", label: "级联选择器" },
    { value: "Switch", label: "开关" },
    { value: "Slider", label: "滑块" },
    { value: "TimePicker", label: "时间选择器" },
    { value: "DatePicker", label: "日期选择器" },
    { value: "DateTimePicker", label: "日期时间选择器" },
    { value: "Upload", label: "上传" },
    { value: "Rate", label: "评分" },
    { value: "ColorPicker", label: "颜色选择器" },
    { value: "Transfer", label: "穿梭框" },
    { value: "Form", label: "表单" },
    { value: "Table", label: "表格" },
    { value: "Tag", label: "标签" },
    { value: "Progress", label: "进度条" },
    { value: "Tree", label: "树形控件" },
    { value: "Pagination", label: "分页" },
    { value: "Badge", label: "标记" },
    { value: "Alert", label: "警告" },
    { value: "Loading", label: "加载" },
    { value: "Message", label: "消息提示" },
    { value: "MessageBox", label: "弹框" },
    { value: "Notification", label: "通知" },
    { value: "NavMenu", label: "导航菜单" },
    { value: "Tabs", label: "标签页" },
    { value: "Breadcrumb", label: "面包屑" },
    { value: "PageHeader", label: "页头" },
    { value: "Dropdown", label: "下拉菜单" },
    { value: "Steps", label: "步骤条" },
    { value: "Dialog", label: "对话框" },
    { value: "Tooltip", label: "文字提示" },
    { value: "Popover", label: "弹出框" },
    { value: "Card", label: "卡片" },
    { value: "Carousel", label: "走马灯" },
    { value: "Collapse", label: "折叠面板" },
    { value: "Timeline", label: "时间线" },
    { value: "Divider", label: "分割线" },
    { value: "Calendar", label: "日历" },
    { value: "Image", label: "图片" },
    { value: "Backtop", label: "回到顶部" }
  ];

  let { label = '', value = '', pageNumber = 1, pageSize = 10 } = parameters;
  pageNumber = Number(pageNumber);
  pageSize = Number(pageSize);

  let queriedTableData = tableData.filter(ele => ele.label.toLowerCase().includes(label.trim().toLowerCase()) && ele.value.toLowerCase().includes(value.trim().toLowerCase()));
  // Array.slice(start, end) 切下来的是 [start ... end-1]
  let cookedTableData = queriedTableData.slice((pageNumber-1)*pageSize, pageNumber*pageSize);

  return {
    info: {
      code: 200,
      total: queriedTableData.length
    },
    payload: {
      data: cookedTableData
    }
  }
}
