<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="navbar"
    >
    </detail-nav-bar>
    <!-- 监听子组件传过来的scroll自定义事件 只有当父组件传进来的probetype的值为2或3时，子组件才会向父组件发射自定义事件-->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 注意父传子数据时，动态数据是用-链接，后面的变量还是用本组件中的原来状态 -->
      <detail-goods-info :detail-info="detailGoodsInfo"></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar
      class="buttom-bar"
      @addCart="addCart"
    ></detail-bottom-bar>
    <back-top @click.native="btnClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :is-show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
//抽取要混入的方法、组件的注册、data中的数据
import { backTopMixin } from "common/untils";

import { mapActions } from "vuex";

import Toast from "components/common/toast/Toast";

export default {
  //混入 方法、组件的注册、data中的数据
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailGoodsInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  created() {
    //1.保存动态路由传进来的iid
    this.iid = this.$route.params.id;
    //2.根据iid请求详情页的数据
    getDetail(this.iid).then(res => {
      console.log(res);
      //2.1获取轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //2.2获取商品信息(通过类)
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //2.3创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //2.4 保存商品的详情数据
      this.detailGoodsInfo = data.detailInfo;
      //2.5获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //2.6 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //这里值不对的原因：图片的高度没有计算在内，跳转到错误位置
      /* this.$nextTick(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      }); */
    });
    //请求推荐的数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },

  deactivated() {
    //不让组件一直keep-alive ，是为了退出当前页后清除iid的值，否则一直是之前的iid，取到的数据也是之前的数据
    this.$destroy();
  },
  methods: {
    // ...mapActions(["addToCart"]),
    ...mapActions({
      add: "addCart"
    }),
    addCart() {
      //1.获取购物车页面所需要的数据
      const goods = {};
      goods.image = this.topImages[0];
      goods.title = this.goods.title;
      goods.desc = this.goods.desc;
      goods.price = this.goods.realPrice;
      goods.iid = this.iid;
      // this.$store.state.cartList.push(goods)
      //2.将商品添加到购物车里(补充的两个知识点 1.Promise 2.mapActions)
      //通过mapActions将vuex中actions内部的addCart函数映射到当前组件中来
      this.add(goods).then(res => {
        /* this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1500); */

        // console.log(this.$toast);  这里的toast是自己写的一个插件
        this.$toast.show(res, 2000);
      });

      /* this.$store.dispatch("addCart", goods).then(res => {
        console.log(res);
      }); */

      //3.弹出，添加购物车成功
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;

      //2.positionY和主题中的值进行对比
      //[0,7938,9120,9452]
      //positionY 在0-7938，index=0
      //positionY 在7938-9120，index=1
      //positionY 在9120-9452，index=2
      //positionY 在9452- ，index=3
      this.themeTopYs.push(Number.MAX_VALUE);
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
        /* if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY > this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex;
        } */

        //1.判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000;
      }
    }
  },

  mounted() {
    //监听商品图片的加载，加载完成后做一次刷新，防止不能滚动页面  不用取消这个事件，因为离开当前页面时，组件已经销毁，还是在151行销毁比较好，其实这里用子传父就可以了
    this.$bus.$on("detailImageLoad", () => {
      // console.log(
      //   "detailImageLoad,这次只打印一次是定义了一个自增变量，每次图片加载时，会比较变量与图片的长度是否相等，相等时才发射图片加载的事件，这样刷新函数只用执行一次，与防抖效果类似"
      // );
      this.$refs.scroll.refresh();

      //在图片全部加载完成后的回调函数中获取顶部高度才是对的
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    });
    //写在mounted函数中 值不对的原因，DOM还没有完全渲染完成， this.$refs.recommend.$el压根就没有渲染，获取不到值
    /* this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs); */
  },
  //为什么这里的要把全局事件关闭才不报错？？？？？？？？？？？？？？？？？？？
  destroyed() {
    this.$bus.$off("detailImageLoad");
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 20;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* 这里的100% 是相对于父组件的高度，因此需要给父组件设置高度为100%的视口高度*/
  height: calc(100% - 44px - 49px);
  position: absolute;
  top: 44px;
}
</style>
