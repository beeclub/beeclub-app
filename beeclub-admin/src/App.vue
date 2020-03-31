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
  padding: 0;margin: 0;position: relative;
}
body{
  padding: 0;margin: 0;height: 100%;position: relative;
}
html, #app {
  height: 100%;position: relative;
}
#app{
  padding: 0;margin: 0;
  height: 100%;
  position: relative;
}
</style>
