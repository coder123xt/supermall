import Toast from "./Toast";
const obj = {};
obj.install = function(Vue) {
  // document.body.appendChild(Toast.$el)  这样拿不到Toast组件对象
  //1.创建一个组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor();

  //3.将组件对象，手动挂载到某一个元素上面
  toast.$mount(document.createElement("div"));

  //4.toast.$el对应的就是div  将组件（插件）添加到body中
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};

export default obj;
