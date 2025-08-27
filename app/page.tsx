// @/ 别名指向项目根目录
import { HomeTemplate } from "@/components/home/HomeTemplate";
//作用：指定页面的规范 URL,值：'/' 表示这是首页的规范地址
export const metadata = {
  alternates: {
    canonical: '/',
  },
  // 其他首页专属metadata配置
};
//组件分离模式，将页面拆分成多个组件，每个组件都有自己的逻辑和样式，然后通过组合的方式来实现页面的功能。
//页面文件只负责路由和元数据，具体内容在独立的组件中
export default function Page() {
  return <HomeTemplate />;
}
