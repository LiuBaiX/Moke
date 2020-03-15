# Moke 

A Web about ancient Chinese literature, powered by `React`, `Redux`, `TypeScript`, `React-Bootstrap`, etc. You can create literatures easily by our `Smart Literature Template`.

# 墨客

一个关于中国古代文学的网站, 使用 `React`, `Redux`, `TypeScript`, `React-Bootstrap`等构建. 通过 `Smart Literature Template`使得创作文学变得更见简单.

## 目录说明

`config` Webpack相关配置文件;

`public` 静态文件如网站图标、图片、Html模板等;

`script` npm相关指令封装，如启动项目的`npm start`;

`src\api` 封装了向服务器发送请求的代码;

`src\components` 封装了经常用到的组件;

`src\data` 定义了系统中的各种数据类型，`action`是Redux action的数据类型定义，`model`是各种前后端业务对象的数据类型定义,后端业务对象在命名时以Info为后缀,`constant`是开发中常用的常量,主要是Redux action的type,`enum`是枚举定义,`mapper`用于定义前后端数据类型互相映射的各种方法,`state`是Redux State的数据类型定义;

`src\redux` 封装了Redux action creator和reducer，创建Store的代码也在这里;

`src\util` 封装了一些常用的方法;

`src\views` 此目录下是页面级别的组件，由可重用性强的Component组合而成，加入了业务逻辑，所以重用性较低，`router`是React router路由配置组件，`pages`是页面组件，`nav`是导航组件;
