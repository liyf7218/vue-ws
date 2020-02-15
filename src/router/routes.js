import IContainer from '@/containers'
import IConnect from '@/containers/connect'
import ErrorPage from '@/components/error/404'

// 导出路由
export const routes = [
  {
    path: '/',
    name: 'IContainer',
    component: IContainer,
    redirect: '/introduction',
    children: [
      {
        path: '/introduction',
        name: '简介',
        iconClass: 'el-icon-postcard',
        component: resolve => require(['@/views/introduction'], resolve)
      },{
        path: '/event',
        name: '事件',
        iconClass: 'el-icon-s-management',
        component: resolve => require(['@/views/event'], resolve)
      },{
        path: '/demos',
        name: '示例',
        iconClass: 'el-icon-paperclip',
        component: IConnect,
        redirect: '/demos/crud',
        children: [{
          path: '/demos/basic',
          name: '基础组件',
          component: resolve => require(['@/views/demos/basic'], resolve)
        },{
          path: '/demos/data',
          name: '数据列表',
          component: resolve => require(['@/views/demos/data'], resolve)
        },{
          path: '/demos/form',
          name: '表单',
          component: resolve => require(['@/views/demos/form'], resolve)
        },{
          path: '/demos/crud',
          name: '增删改查',
          component: resolve => require(['@/views/demos/crud'], resolve)
        },{
          path: '/image',
          name: '图片',
          iconClass: 'el-icon-picture-outline',
          component: resolve => require(['@/views/demos/image'], resolve),
        }]
      },{
        path: '/echarts',
        name: 'ECharts',
        iconClass: 'el-icon-receiving',
        component: IConnect,
        redirect: '/echarts/line',
        children: [{
          path: '/echarts/line',
          name: 'Line',
          component: resolve => require(['@/views/echarts/line'], resolve)
        },{
          path: '/echarts/pie',
          name: 'pie',
          component: resolve => require(['@/views/echarts/pie'], resolve)
        },{
          path: '/echarts/map',
          name: 'map',
          component: resolve => require(['@/views/echarts/map'], resolve)
        }]
      },{
        path: '/government',
        name: '政府机构',
        iconClass: 'el-icon-office-building',
        component: IConnect,
        redirect: '/government/stateCouncil',
        children: [{
          path: '/government/stateCouncil',
          name: '国务院',
          component: resolve => require(['@/views/government/stateCouncil'], resolve)
        }]
      },{
        path: '/geo',
        name: '地图',
        iconClass: 'el-icon-map-location',
        component: resolve => require(['@/views/geo'], resolve),
      },{
        path: '/basicData',
        name: '基础数据',
        iconClass: 'el-icon-receiving',
        component: IConnect,
        redirect: '/basicData/country',
        children: [{
          path: '/basicData/country',
          name: '国家',
          component: resolve => require(['@/views/basicData/country'], resolve)
        },{
          path: '/basicData/region',
          name: '地区',
          component: resolve => require(['@/views/basicData/region'], resolve)
        },{
          path: '/basicData/university',
          name: '大学',
          component: resolve => require(['@/views/basicData/university'], resolve)
        },{
          path: '/basicData/nationality',
          name: '民族',
          component: resolve => require(['@/views/basicData/nationality'], resolve)
        },{
          path: '/basicData/people',
          name: '人物',
          component: resolve => require(['@/views/basicData/people'], resolve)
        }]
      },{
        path: '/setting',
        name: '设置',
        iconClass: 'el-icon-setting',
        component: resolve => require(['@/views/setting'], resolve),
      },
    ]
  },{
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  }
]
