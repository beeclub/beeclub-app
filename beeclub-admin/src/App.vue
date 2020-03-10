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
html{
  padding: 0;margin: 0;
}
body{
  padding: 0;margin: 0;height: 100%;
}
html, #app {
  height: 100%;
}
#app{
  padding: 0;margin: 0;
  height: 100%;
  position: relative;
}
</style>
