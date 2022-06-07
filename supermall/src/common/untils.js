export function formatDate(date, fmt) {
  //1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  //2.获取月日小时分钟秒钟
  let o = {
    "M+": date.getMonth() + 1,

    "d+": date.getDate(),

    "h+": date.getHours(), //h表示12小时制，H表示24小时制

    "m+": date.getMinutes(),

    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";

      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }

  return fmt;
}

function padLeftZero(str) {
  //先给传入的字符串加上两个00，然后再截取字符串的长度 如果传入的是10 加上00变成 0010 截取后变成10 ，如果传入的是8 加上00变成 008 截取一位后变成08
  return ("00" + str).substr(str.length);
}

//回到顶部的一些公共代码混入封装
import backTop from "components/content/backTop/backTop";
export const backTopMixin = {
  components: {
    backTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    btnClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
};
