<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>

    <tab-bar>
      <main-tabbar />
    </tab-bar>
  </div>
</template>

<script>
import MainTabbar from "components/content/main-tabbar/MainTabbar";
import TabBar from "components/common/tabbar/TabBar";
export default {
  name: "App",
  components: {
    MainTabbar,
    TabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
