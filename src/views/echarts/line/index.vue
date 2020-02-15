<template>
<section>
  <div id="main-echarts" class="main-echarts"></div>
</section>
</template>


<script>
export default {
  data() {
    return {}
  },
  methods: {
    initEcharts() {
      // 初始化 echarts 实例
      let mainChart = this.$echarts.init(document.getElementById('main-echarts'));
      this.drawChart(mainChart);
    },
    drawChart(chart) {
      // clear() 清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。
      chart.clear();
      let lineChartOption = {
        title: {
          text: '强调趋势,使用折线图'
        },
        tooltip: {},
        legend: {
          left: 'center',
          data: ['哈哈', '嘿嘿']
        },
        xAxis: {
          data: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6"]
        },
        yAxis: {},
        series: [{
          name: '哈哈',
          type: 'line',
          data: this.$getRandomNumberArrays({
            length: 6
          }),
        }, {
          name: '嘿嘿',
          type: 'line',
          data: this.$getRandomNumberArrays({
            length: 6
          }),
        }]
      };
      chart.setOption(lineChartOption);
    },
  },
  created() {
    // 不要在这里进行任何的图表绘制,不好使,即使在 mounted 时存到了 data 当中,这里也取不到对应实例.
    // !!this.drawChart(this.mainChart);
  },
  mounted() {
    // 注意： 这里echarts初始化应在钩子函数mounted()中，这个钩子函数是在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用
    // 所有的初始化工作,都在这里完成,放在别的地方不好使的
    this.initEcharts();
  },
}
</script>
<style scoped>
.main-echarts {
  width: 50%;
  height: 500px;
}
</style>
