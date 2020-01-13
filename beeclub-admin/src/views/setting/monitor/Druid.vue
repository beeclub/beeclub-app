<template>
    <div class="page-container" :style="'height:'+ height">
        <iframe src="https://localhost:7001/druid" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
    </div>
</template>

<script>
export default {
    name: 'druid',
    data(){
        return {
            scr:'',
            height:document.documentElement.clientHeight - 140 + "px;"
        }
    },
    mounted(){
        var _this = this;
        window.onresize = function temp() {
      _this.height = document.documentElement.clientHeight - 140 + "px;";
    };
    }
}
</script>

<style scoped>
.druid-container{
    height: 100%;
}
</style>

