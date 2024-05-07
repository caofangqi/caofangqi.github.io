import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  //站点基本路径
  base: "/",
  //站点的语言
  lang: "zh-CN",
  //站点的标题。它将会作为所有页面标题的后缀，并且在默认主题的导航栏中显示。
  title: "老叶札记",
  //站点的描述。
  description: "记录经历的，思考的，认知到的等一些心得体会，希望对人有所帮助",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
