<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="网络堵塞了" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      //图片加载了四张，按原来的写法需要向外发射四次事件，现在加了判断语句，只会向外发射一次事件，触发一次事件
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped></style>
