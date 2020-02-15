// Single Components
import ErrorPage from './error'
import Divider from './divider'
// Bisic Components
import Button from './qx/basic/button'
import Label from './qx/basic/label'
import Tag from './qx/basic/tag'
// Data Components
import Pagination from './qx/data/pagination'
import Table from './qx/data/table'
import TableColumn from './qx/data/tableColumn'
//  Form Components
import Cascader from './qx/form/cascader'
import DatePicker from './qx/form/datePicker'
import DatePickerRange from './qx/form/datePickerRange'
import Input from './qx/form/input'
import InputNumber from './qx/form/inputNumber'
import QueryBar from './qx/form/queryBar'
import Select from './qx/form/select'
import Switch from './qx/form/switch'
import TimePicker from './qx/form/timePicker'
import TimePickerRange from './qx/form/timePickerRange'
import Form from './qx/form/form'
import FormItem from './qx/form/formItem'
// Zoo Components
import GeneralForm from './qx/zoo/generalForm'
import GeneralFormItem from './qx/zoo/generalFormItem'
import GeneralQbar from './qx/zoo/generalQbar'
import GeneralQbarItem from './qx/zoo/generalQbarItem'
import CRUD_Page from './qx/zoo/crud'

const qxComponents = {
  install: function (Vue, options) {
    // Single Components
    Vue.component('error-page', ErrorPage)
    Vue.component('divider', Divider)

    // Bisic Components
    Vue.component('qx-button', Button)
    Vue.component('qx-label', Label)
    Vue.component('qx-tag', Tag)

    // Data Components
    Vue.component('qx-pagination', Pagination)
    Vue.component('qx-table', Table)
    Vue.component('qx-table-column', TableColumn)

    //  Form Components
    Vue.component('qx-cascader', Cascader)
    Vue.component('qx-date-picker', DatePicker)
    Vue.component('qx-date-picker-range', DatePickerRange)
    Vue.component('qx-input', Input)
    Vue.component('qx-input-number', InputNumber)
    Vue.component('qx-qbar', QueryBar)
    Vue.component('qx-select', Select)
    Vue.component('qx-switch', Switch)
    Vue.component('qx-time-picker', TimePicker)
    Vue.component('qx-time-picker-range', TimePickerRange)
    Vue.component('qx-form', Form)
    Vue.component('qx-form-item', FormItem)

    // Zoo Components
    Vue.component('qx-general-form', GeneralForm)
    Vue.component('qx-general-form-item', GeneralFormItem)
    Vue.component('qx-general-qbar', GeneralQbar)
    Vue.component('qx-general-qbar-item', GeneralQbarItem)
    Vue.component('qx-crud', CRUD_Page)
  }
}

export default qxComponents
