<template>
  <el-container class='main-container'>
    <!-- header -->
    <el-header v-show="displayHeader">
      <i-header />
    </el-header>
    <el-container class='sub-container'>
      <!-- aside -->
      <el-aside width="auto" v-show="displayAsider">
        <i-aside />
      </el-aside>
      <el-container class='context-container'>
        <!-- main -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- footer -->
        <el-footer :style="{display: displayFooter ? 'block' : 'none'}">
          <i-footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import iHeader from './header'
import iAside from './aside'
import iFooter from './footer'

// 引入 vuex
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('init')

export default {
  name: 'container',
  computed: {
    ...mapState({
      displayAsider: state => state.displayAsider,
      displayHeader: state => state.displayHeader,
      displayFooter: state => state.displayFooter,
    })
  },
  methods: {
    ...mapActions([
      'toggleDisplayAsider',
      'toggleDisplayHeader',
      'toggleDisplayFooter',
    ])
  },
  created() {
    var _self = this;
    document.onkeyup = function(e) {
      var e = window.event;
      // console.log(e);
      if(!(e.shiftKey && e.ctrlKey)){
        return;
      }
      switch (e.keyCode) {
        case 65: // a
          _self.toggleDisplayAsider();
          break;
        case 70: // f
          _self.toggleDisplayFooter();
          break;
        case 72: // h
          _self.toggleDisplayHeader();
          break;
      }
    }
  },
  components: {
    iHeader,
    iAside,
    iFooter
  },
}

</script>
<style scoped>
.main-container {
  overflow-y: hidden;
  height: 100%;
}

.el-header {
  /* 设置底部边框弧线 */
  border-bottom: 1px solid lightsteelblue;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;

  /* 固定在顶部 part 1/2 */
  /*position: fixed;*/
  height: 60px;
  width: 100%;
  left: 0;
  top: 0;
  display: block;
  z-index: 1500;
  background-color: white;
}

.sub-container {
  margin-top: 10px;
  margin-bottom: 30px;
}

</style>
