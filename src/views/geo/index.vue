<template>
  <section class="main" v-loading="loading">
    <div id="geoChart" class="geo-chart"></div>
  </section>
</template>
<script>
export default {
  name: 'geoChart',
  data() {
    return {
      // loading 模态层
      loading: false,

    }
  },
  methods: {
    drawMap() {
      console.log('drawMap')
      this.geoChart.setOption(this.geoChartOptions)
    }
  },
  mounted() {
    const _this = this;
    if (BMap) {
      // 使用这个 BMap
      console.log('BMap', BMap)
    } else {
      this.$errorMessage('百度地图设置错误,请检查相关设置!')
      return;
    }

    //百度地图api功能：
    // [创建map实例](http://lbsyun.baidu.com/index.php?title=jspopular/guide/show)
    let map = new BMap.Map('geoChart');
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

    // 开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);

    /*
     * [添加控件](http://lbsyun.baidu.com/index.php?title=jspopular/guide/widget)
     *
     * 抽象基类  Control 所有控件均继承此类的方法、属性。通过此类您可实现自定义控件
     * 平移缩放控件  NavigationControl PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方
     * 缩略地图  OverviewMapControl  默认位于地图右下方，是一个可折叠的缩略地图
     * 比例尺 ScaleControl  默认位于地图左下方，显示地图的比例关系
     * 地图类型  MapTypeControl  默认位于地图右上方
     * 版权  CopyrightControl  默认位于地图左下方
     * 定位  GeolocationControl  针对移动端开发，默认位于地图左下方
     */
    // map.addControl(new BMap.NavigationControl());
    // map.addControl(new BMap.ScaleControl());
    // map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]
    }));
    // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    map.setCurrentCity("北京");

    // 定义一个控件类，即function
    function searchBoxControl() {
      // 设置默认停靠位置和偏移量
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
      this.defaultOffset = new BMap.Size(10, 10);
    }
    // 通过JavaScript的prototype属性继承于BMap.Control
    searchBoxControl.prototype = new BMap.Control();

    // 自定义控件必须实现initialize方法，并且将控件的DOM元素返回
    // 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
    searchBoxControl.prototype.initialize = function(map) {
      // 创建一个DOM元素
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute('id', 'ctlInput');
      let btn = document.createElement("input");
      btn.setAttribute('type', 'button');
      btn.setAttribute('value', '搜索');
      btn.onclick = function() {
        let inputs = document.getElementById('ctlInput').value;
        // [检索POI方法](http://lbsyun.baidu.com/index.php?title=jspopular/guide/search)
        let local = new BMap.LocalSearch(map, {
          renderOptions: { map: map }
        });
        local.search(inputs);
      }

      // 添加文字说明
      div.appendChild(input);
      div.appendChild(btn);

      // 设置样式
      div.style.cursor = "pointer";
      div.style.border = "1px solid gray";
      div.style.backgroundColor = "white";

      // 添加DOM元素到地图中
      map.getContainer().appendChild(div);

      // 将DOM元素返回
      return div;
    }

    map.addControl(new searchBoxControl);

    // [个性化地图](http://lbsyun.baidu.com/index.php?title=jspopular/guide/custom)
    map.setMapStyle({ style: 'googlelite' });

    // [检索POI方法](http://lbsyun.baidu.com/index.php?title=jspopular/guide/search)
    // let local = new BMap.LocalSearch(map, {
    //     renderOptions:{map: map}
    // });
    // local.search("太极");

    // [信息窗口](http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/infowindow)
    // let opts = {
    //     width : 250,     // 信息窗口宽度
    //     height: 100,     // 信息窗口高度
    //     title : "Hello"  // 信息窗口标题
    // }
    // let infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象
    // map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口

    // [地址逆解析](http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/geocoding)
    var geoc = new BMap.Geocoder();

    map.addEventListener("click", function(e){
      var pt = e.point;
      geoc.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        console.log(addComp)
        console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      });
    });

  }
}

</script>
<style scoped>
.geo-chart {
  width: 100%;
  min-width: 500px;
  height: 100%;
  min-height: 800px;
  border: 1px solid lightblue;
  border-radius: 10px;
}

</style>
