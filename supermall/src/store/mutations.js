import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";
const mutations = {
  //mutations唯一的目的就是修改state中的状态  可以被追踪到
  //mutations中的每个方法尽可能完成的事件比较单一一点  因此将修改数据之前的一些判断函数写在actions中
  //palyload新添加的商品
  /* let oldGoods = null
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldGoods = item 
        }
      } */
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    //在模型中给payload添加了一个属性，用来判断购物车页面的勾是否显示
    payload.isSelected = true;
    state.cartList.push(payload);
  }
};

export default mutations;
