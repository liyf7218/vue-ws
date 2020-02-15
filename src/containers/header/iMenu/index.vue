<template>
  <section class="i-menu">
    <el-menu :default-active="activeRoute" class="el-menu-no-bottom-border" mode="horizontal" router @select="selectMenu">
      <!-- <template v-for="item in routes">
        <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
      </template> -->
      <template  v-for="route in routes" >
        <el-submenu :key="route.path" :index="route.path" v-if="route.children && route.children.length">
          <template slot="title">
            <i :class="getRouteIconClass(route.iconClass)"></i>
            <span slot="title">{{route.name}}</span>
          </template>
          <template v-for="childRoute in route.children">
            <el-menu-item :key="childRoute.path" :index="childRoute.path">
              <i :class="getRouteIconClass(childRoute.iconClass)"></i>
              <span slot="title">{{childRoute.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :key="route.path" :index="route.path" v-else >
          <i :class="getRouteIconClass(route.iconClass)"></i>
          <span slot="title">{{route.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </section>
</template>
<script>
// 引入 vuex
import { createNamespacedHelpers } from 'vuex';
const { mapState: mapInitState, mapActions: mapInitActions } = createNamespacedHelpers('init');
const { mapState: mapRoutesState, mapActions: mapRoutesActions } = createNamespacedHelpers('routes');


export default {
  name: 'i-menu',
  data() {
    return {}
  },
  computed: {
    ...mapInitState({
      isCollapse: state => state.isCollapse,
    }),
    ...mapRoutesState({
      routes: state => state.routes[0].children,
      activeRoute: state => state.activeRoute,
    })
  },
  methods: {
    ...mapInitActions([
      'toggleMenuCollapse'
    ]),
    ...mapRoutesActions([
      'setActiveRoute'
    ]),
    getRouteIconClass(iconClass = 'el-icon-question') {
      if (typeof iconClass != 'string' || !iconClass) {
        console.log('[router] Unrecognizable icon class: ', iconClass, ' Now replaced with el-icon-question');
        iconClass = 'el-icon-question';
      }
      return iconClass.split(' ');
    },
    selectMenu(route){
      // console.log(route);
      this.setActiveRoute(route);
    }
  },
  // watch: {
    // 当引入 el-menu 的 router 属性后,以下的 watch监测 就不需要了
    // watch 方法用来监测 $route 的变化,以获取当前路由信息
    // $route: function(to, from) {
    //   console.log(" watch $route : ", to, from)
    //   this.activeIndex = this.$route.path;
    // }
  // },
  // methods: {
    // 当引入 el-menu 的 router 属性后,以下的 handleSelect跳转 就不需要了
    // 路由跳转处理
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    //   this.$router.push(key)
    // }
  // },
  mounted() {
    if (this.setActiveRoute) {
      this.setActiveRoute(this.$route.matched[1].path);
    }
  }
}

</script>
<style scoped>
.i-menu {
  margin-top: -1px;
}

.i-menu .el-menu-no-bottom-border {
  border-width: 0px;
}

</style>
