<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button
        :is-selected="isSelectedAll"
        class="check-btn"
        @click.native="selectAllClick"
      ></check-button>
      <span>全选</span>
      <div class="price">合计：{{ totalPrice }}</div>
    </div>
    <div class="calculate" @click="calcClick">去计算：{{ selectLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.isSelected;
          })
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    selectLength() {
      return this.cartList.filter(item => item.isSelected).length;
    },
    isSelectedAll() {
      if (this.cartList.length === 0) return false;
      //下面这一行的代码性能并不是很高，因为过滤器函数需要遍历每一项，而我们只需要找到没有被选中的一项，就可以使得全选按钮不打勾
      //1.使用filter过滤器
      //return !this.cartList.filter(item => !item.isSelected).length;

      //2.使用find
      //return !this.cartList.find(item => !item.isSelected);
      //最初商品携带的isSelected都是保存在mutations模型中，后面的isSelected（默认值也是）是在checkbtn组件中

      //3.不用以上的数组的高阶函数，仅使用最基础的遍历来实现功能
      for (let item of this.cartList) {
        if (!item.isSelected) {
          return false;
        }
      }
      return true;
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    selectAllClick() {
      if (this.isSelectedAll) {
        this.cartList.forEach(item => {
          //全部选中的情况下，将所有的item变成不选中的状态
          item.isSelected = false;
        });
      } else {
        //部分或全部不选中，将所有的item变成全部选中状态
        this.cartList.forEach(item => (item.isSelected = true));
      }
    },
    calcClick() {
      if (!this.isSelectedAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 44px;
  background-color: #eee;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
}
.check-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-btn {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 15px;
}
.calculate {
  position: absolute;
  right: 5px;
  background-color: red;
  line-height: 44px;
  padding: 0 5px 0;
  color: #fff;
}
</style>
