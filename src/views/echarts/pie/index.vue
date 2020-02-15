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
      let data = this.genData(50);

      let chartOptions = {
        title: {
          text: '同名数量统计',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData,

          selected: data.selected
        },
        series: [{
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      chart.setOption(chartOptions);
    },
    genData(count) {

      let legendData = [];
      let seriesData = [];
      let selected = {};
      for (let i = 0; i < 50; i++) {
        name = Math.random() > 0.65 ?
          this.makeWord(4, 1) + '·' + this.makeWord(3, 0) :
          this.makeWord(2, 1);
        legendData.push(name);
        seriesData.push({
          name: name,
          value: Math.round(Math.random() * 100000)
        });
        selected[name] = i < 6;
      }

      return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
      };
    },
    makeWord(max, min) {
      let nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎',
        '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄',
        '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
      ];
      let nameLen = Math.ceil(Math.random() * max + min);
      let name = [];
      for (let i = 0; i < nameLen; i++) {
        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
      }
      return name.join('');
    }
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
