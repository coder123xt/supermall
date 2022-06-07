<template>
  <div class="recommend">
    <div v-for="item in recommends" class="item">
      <a href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.recommend {
  text-align: center;
  display: flex;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 12px solid #eee;
}

.item {
  flex: 1;
}
.item img {
  width: 67px;
  height: 67px;
  margin-bottom: 10px;
}
</style>
