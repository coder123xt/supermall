<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
      :key="index"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  created() {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  background-color: #fff;
  z-index: 9;
}

.tab-control-item {
  text-align: center;
  flex: 1;
  line-height: 40px;
  font-size: 15px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: solid 2px pink;
  padding: 5px;
}
</style>
