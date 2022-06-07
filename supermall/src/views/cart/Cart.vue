<template>
  <div id="cart">
    <div class="nav-bar">
      <nav-bar>
        <div slot="center">购物车({{ length }})</div>
      </nav-bar>
    </div>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  //通过mapGetters将vuex中的getters中的cartLength方法直接转换成computed计算属性，这样一来就可以在多个地方使用length值，比较方便复用
  computed: {
    //两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: "cartLength"
    })
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: calc(100% - 44px - 49px - 44px);
}
</style>
