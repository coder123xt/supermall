<template>
  <div id="main-tabbar">
    <tab-bar-item path="/home" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/cart" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </div>
</template>

<script>
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabbar",
  components: {
    TabBarItem
  }
};
</script>

<style scoped>
#main-tabbar {
  /* 设置tabbarItem的水平布局 */
  display: flex;
}
</style>
