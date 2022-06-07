<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tabcontrol"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingup="loadMore"
    >
      <!-- prob-type 前面如果不加：，但是传过去的是一个字符串，而不是数字 -->
      <!-- pull-up-load 前面如果不加：，但是传过去的是一个字符串，而不是布尔值 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 注意这里双引号的使用 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabcontrol2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="btnClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

import Scroll from "components/common/scroll/Scroll";
import backTop from "components/content/backTop/backTop";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    backTop
  },
  //生命周期函数，当组件一被创建出来就会触发
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品列表中的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    //因为需要获取到DOM中的scroll节点，虽然是在回调函数中获取节点，因此还是写在mouted中比较好
    //监听item中图片的加载完成(全局事件)
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    console.log("home destroyed");
  },
  //其实可以通过给router-view加上keep-alive保持原来状态，但是为了保险起见，还需要使用以下两个生命周期函数
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //获取离开时滚动的垂直距离
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);
    //2.当页面离开主页时，取消全局事件的监听，防止在详情页加载图片时，刷新主页  与100行相对应
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //由于上拉加载更多默认只加载一次，因此需要添加这个finishPullUp函数
        //这个函数封装在scroll组件中
        this.$refs.scroll.finishPullUp();
      });
    },
    //防抖函数，可以将其封装到一个js文件中
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        //重新计时
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //使得两个tabcontrol的活跃保持一致
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },

    btnClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.判断tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //获取tabcontrol的offsetTop  ，本来是可以直接获取的，但是轮播图加载的图片需要一定时间，需要等轮播图加载完成后，再获取组件的OffsetTop
      //所有组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  /* padding-top: 44px; */
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

/*  本来用sticky就可以实现tabcontrol吸顶的效果，但是考虑到兼容性问题，故而本设计方法没有使用
.tabcontrol {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.tabcontrol {
  left: 0;
  right: 0;
  top: 44px;
  position: absolute;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
