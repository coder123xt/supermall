import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

const actions = {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1.查找之前的数组中是否有该商品
      ///如果为true括号里面的函数返回的是一个item
      //如果是false，返回的是一个空值
      let oldGoods = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      if (oldGoods) {
        // oldGoods.count += 1;
        context.commit(ADD_COUNTER, oldGoods);
        resolve("当前的商品数量+1");
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("添加了新的商品");
      }
    });
  }
};

export default actions;
