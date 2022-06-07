<template>
  <div>
    <cart-list-item
      v-for="(item, index) in cartList"
      :goods-item="item"
      :key="index"
    ></cart-list-item>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  components: {
    CartListItem
  },
  computed: {
    // ...mapGetters(["cartList"])
    cartList() {
      return this.$store.state.cartList;
    }
  },

  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped></style>
