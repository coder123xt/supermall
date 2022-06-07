<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  created() {},
  methods: {
    show(message = "默认文字", duration = "2000") {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 10px;
  /* 根据自己的位置偏移自己的长宽的50% */
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
