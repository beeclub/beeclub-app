<template>
    <div v-if="item">
        <el-menu-item v-if="!item.children" :index="item.uri">
            <i v-if="item.icon" :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.id + ''">
            <template slot="title">
                <i v-if="item.icon" :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <BeeMenuItem
                v-for="route in item.children"
                :key="route.id"
                :item="route"
                :path="route.uri"
            />
        </el-submenu>
    </div>
</template>

<script>
export default {
  name: "BeeMenuItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

