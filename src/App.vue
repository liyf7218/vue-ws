<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全页面设置 */
html, body {
	margin: 0;
	padding: 0;
}

/* CSS 元素超出部分滚动, 并隐藏滚动条, 利用 css 3 的新特性  -webkit-scrollbar, 但是这种方式不兼容 火狐 和 IE */
/* 详见 https://www.cnblogs.com/lovling/p/8000363.html */
html::-webkit-scrollbar {
    display: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
