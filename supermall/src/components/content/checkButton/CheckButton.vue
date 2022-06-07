<template>
  <div class="check-button" :class="{ check: isSelected }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      default: false
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
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  background-color: deeppink;
  border: deeppink 2px solid;
}
</style>
