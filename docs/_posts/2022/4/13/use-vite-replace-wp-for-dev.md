---
title: 再见Webpack，你好Vite
description: 使用Vite取代Webpack作为开发环境工具，全面提升开发体验
date: 2022-04-13
author: Zion Dotson
location: Beijing
tags:
  - Vue
  - Vite
  - Webpack
categories:
  - Front-end
---

> 这两天尝试了将一个用Vue-cli（基于Webpack）构建的旧项目，使用Vite替代Webpack作为开发环境服务器，实现了开发环境秒开  
> 这里记录一下需要注意的要点

<!-- more -->

### 预先准备

* 安装Vite
<Util-InstallPackage package-name="vite" dev />
* 安装Vite的Vue2插件
<Util-InstallPackage package-name="vite-plugin-vue2" dev />
* 根目录下新建vite.config.js，并写入如下内容
  ```js
  import { createVuePlugin } from 'vite-plugin-vue2' 
  export default {
    plugins: [createVuePlugin()]
  }
  ```
* 根目录下新建index.html文件，并将webpack指定的index.html模板里引入的全局css,js复制，并将/src/main.js直接作为module引入，下面是内容参考
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title></title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <!-- 假设你用了如下的katex样式文件 -->
      <link rel="stylesheet" type="text/css" href="/css/katex.min.css">
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="/src/main.js"></script>
    </body>

  </html>
  ```
* 新增启动脚本`dev:vite`，在package.json中配置：
  ```json
  {
    "scripts": {
      "dev:vite": "npx vite dev"
    }
  }
  ```

### vue文件导入后缀问题

* 在Webpack项目中，vue文件的导入可以不用加`.vue`后缀
* 而在Vite中，必须显示指出`.vue`后缀

<Util-CodeTab
  key-prefix="import"
  :code-types="['vite', 'webpack']"
  default-active-code-type="vite"
/>

::: slot import-vite
```vue
<script>
import SomeComponent from '/path/to/SomeComponent.vue'
</script>
```
:::

::: slot import-webpack
```vue
<script>
import SomeComponent from '/path/to/SomeComponent'
</script>
```
:::

::: tip 提示
* 异步导入也遵循这种规律
* 事实上对于所有非js、ts文件类型也应当加上文件后缀
:::

### Webpack中使用`require('xxx')`引入的资源或者模块需要转换为`import`

* 在Webpack项目中，可以使用`import`或者`require`导入模块或者资源（图片、json数据等）
* 而在Vite中，只能使用`import`导入内容，需要将所有的`require`改为`import`导入

<Util-CodeTab
  key-prefix="require"
  :code-types="['vite', 'webpack']"
  default-active-code-type="vite"
/>

::: slot require-vite
```vue
<template>
  <img :src="imgSrc" />
</template>
<script>
import imgSrc from '/path/to/img.png'
</script>
```
:::

::: slot require-webpack
```vue
<template>
  <img :src="require('/path/to/img.png')" />
</template>
```
:::

### 差异化API

在我所替换的这个项目里使用了Webpack所独有的`require.context`自动化导入API，这里需要使用Vite中的`import.meta.glob`API进行替换实现  
替换方法可以查看我的另一片文章：[前端工程中的自动化导入](/2021/08/18/frontend-auto-import/)  
最好将差异化API调用提取为公共判断流程函数，下面是我的解决方案：

<Util-CodeTab
  key-prefix="context"
  :code-types="['predictEnv.js', 'router.js']"
  default-active-code-type="predictEnv.js"
/>

::: slot context-predictEnv.js
```js
export default (viteCallback, webpackCallback) => {
  try {
    process
    webpackCallback()
  } catch {
    viteCallback()
  }
}
```
:::

::: slot context-router.js
```js
import predictEnv from '/path/to/predictEnv.js'

let routes = []

predictEnv(
  () => {
    // 这里是vite路由自动装配路由代码，用到import.meta.glob API
  },
  () => {
    // 这里是webpack路由自动装配路由代码，用到require.context API
  }
)
```
:::

### 环境变量&模式差异

这个差异其实是Vue-cli与Vite的差异

* Vue-cli项目中的环境变量获取是通过`process.env.xxx`进行的，并且暴露给客户端的变量都必须以`VUE_APP_`开头
* 而在Vite中，环境变量需要通过`import.meta.env.xxx`获取，默认暴露给客户端的变量都必须以`VITE_`开头，幸运的是Vite支持通过配置[envPrefix](https://cn.vitejs.dev/config/#envprefix)来自定义暴露前缀，所以只需要通过配置此项为`VUE_APP_`即可，下面是配置参考

<Util-CodeTab
  key-prefix="env"
  :code-types="['vite.config.js']"
  default-active-code-type="vite.config.js"
/>

::: slot env-vite.config.js
```js
export default {
  // ...其他配置
  envPrefix: 'VUE_APP_'
  // ...其他配置
}
```
:::

到这里为止，如果各项都完成的情况下，运行`npm run dev:vite`，应该是可以看到vite成功启动了
但是，还有最后一个问题，该问题会发生在webpack环境时，因为这里生产我并没有做变更，所以打包时还是会有下面的问题：  
webpack不能解析`import.meta.xxx`相关代码  
对此，还需要最后一步

### 配置自定义loader移除`import.meta.**`代码

我这里的解决方案是自写loader，配置自定义注释，在webpack环境下，手动移除import.meta.env相关代码，这里改写上面提到的自动注册路由代码作为示例：

<Util-CodeTab
  key-prefix="ignore"
  :code-types="['ignoreLoader.js', 'vue.config.js', 'router.js']"
  default-active-code-type="ignoreLoader.js"
/>

::: slot ignore-ignoreLoader.js
```js
module.exports = function(source) {
  return source.replace(/^\/\/ @webpack-ignore start[\s\S]+\/\/ @webpack-ignore end/g, '')
}
```
:::