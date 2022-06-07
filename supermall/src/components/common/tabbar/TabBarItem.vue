<template>
  <div id="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <!-- 注意这里为什么给插槽包一个div：无法动态绑定插槽的class属性，因为插槽最终会被替换掉-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- 动态绑定样式，并将样式值抽取到computed中 -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1; //如果当前活跃的路由中 <*找不到*> 当前点击传入的路径，
      // 则这个值为-1 ，然而-1===-1的，因此返回 <*false*>这里的this.$route是指当前活跃的路由，
      //indexOf是检查当前活跃的路由中是否有  当前点击项所传进来的路径  找到为0 ，找不到为-1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
      console.log(this.$route.path.indexOf(this.path));
      //这里使用replace会报错，注意push和replace的区别
    }
  }
};
</script>

<style scoped>
#tab-bar-item {
  /* 设置item在水平方向上均匀分布 */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  background-color: #f6f6f6;
}
#tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
