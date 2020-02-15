<template>
<section>
  <el-menu :default-active="activeRoute" class="asider-menu" :collapse="isCollapse" router @select="selectMenu">
    <!-- 插入一个控制菜单折叠的按钮 -->
    <el-tooltip content="Toggle Menu" placement="right" :disabled="!isCollapse">
      <el-button :class="{'asider-button':true,'asider-button-collapse':isCollapse}" :icon="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="toggleMenuCollapse">
        {{isCollapse?'':'Toggle Menu'}}
      </el-button>
    </el-tooltip>
    <!-- 正常的路由 -->
    <template v-for="route in routes">
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
      <el-menu-item :key="route.path" :index="route.path" v-else>
        <i :class="getRouteIconClass(route.iconClass)"></i>
        <span slot="title">{{route.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</section>
</template>
<script type="text/javascript">
// 引入 vuex
import {
  createNamespacedHelpers
} from 'vuex';
const {
  mapState: mapInitState,
  mapActions: mapInitActions
} = createNamespacedHelpers('init');
const {
  mapState: mapRoutesState,
  mapActions: mapRoutesActions
} = createNamespacedHelpers('routes');

export default {
  name: 'qx-aside-menu',
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
    getRouteIconClass(iconClass) {
      if( iconClass === undefined ){
        return 'hidden';
      }
      if (typeof iconClass != 'string') {
        console.log('[router] Unrecognizable icon class: ', iconClass, ' Now replaced with el-icon-question');
        iconClass = 'el-icon-question';
      }
      return iconClass.split(' ');
    },
    selectMenu(route) {
      // console.log(route);
      this.setActiveRoute(route);
    }
  },
  // created() {
  //   // 在第一次载入时,获取当前路由信息
  //   this.activeRoute = this.$route.path;
  // }
  mounted() {
    if (this.setActiveRoute) {
      this.setActiveRoute(this.$route.matched[1].path);
    }
  }
}
</script>
<style type="text/css" scoped>
.asider-menu {
  border-right: unset;
  min-height: 400px;
  overflow-x: hidden;
}

.asider-menu:not(.el-menu--collapse) {
  width: 200px;
  /* min-width: 200px; */
  /* max-width: 300px; */
  overflow-x: hidden;
}

.asider-button {
  width: 100%;
  border: none;
  text-align: left;
  height: 50px;
}

.asider-button-collapse {
  padding-left: 25px;
}

li.el-menu-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* min-width: 230px; */
}

i.hidden {
  display: none;
}
</style>
