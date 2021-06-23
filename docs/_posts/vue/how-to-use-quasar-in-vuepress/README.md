---
title: 如何在Vuepress中使用Quasar？
description: 如何在Vuepress中使用Quasar？
categories: 
  - Front-end
tags: 
  - Vue
  - Vuepress
  - Quasar
author: Zion Dotson
date: 2019-12-01
location: Beijing
---

> 在Vuepress中使用Quasar正确姿势

<!-- more -->

## 使用方式

### 在`enhanceApp.js`文件中引入Quasar相关依赖

* `.vuepress/theme/enhanceApp.js`

<Util-CodeTab
  key-prefix="enhanceApp"
  :code-types="['use-quasar']"
  default-active-code-type="use-quasar"
/>

::: slot enhanceApp-use-quasar
```js
import Quasar from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

export default ({
	Vue, // VuePress 正在使用的 Vue 构造函数
	options, // 附加到根实例的一些选项
	isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
	// 仅仅在客户端使用Quasar
	if(!isServer){
		Vue.use(Quasar, {
			lang,
			config: {}
		})
	}
}
```
:::

::: danger 使用Quasar时注意
由于Quasar的某些组件使用到了浏览器的API，根据Vuepress文档：  
[浏览器的-api-访问限制](https://v1.vuepress.vuejs.org/zh/guide/using-vue.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84-api-%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6)  
**必须重写GlobalLayout组件，使用ClientOnly组件包裹！**  
自定义的全局组件大致内容如下：
:::

<Util-CodeTab
  key-prefix="custom-global-layout"
  :code-types="['custom-global-layout']"
  default-active-code-type="custom-global-layout"
/>

::: slot custom-global-layout-custom-global-layout
  ```vue
<style>
</style>
<template>
  <ClientOnly>
    <ParentGlobalLayout />
  </ClientOnly>
</template>
<script>
export default {

}
</script>
```
:::

* `.vuepress/theme/layouts/GlobalLayout.vue`

<Util-CodeTab
  key-prefix="global-layout"
  :code-types="['GlobalLayout']"
  default-active-code-type="GlobalLayout"
/>
::: slot global-layout-GlobalLayout
```vue
<template>
  <ClientOnly>
    <q-layout view="hHh lpR fFf">
      <q-header reveal elevated>
			<!-- 头部 -->
      </q-header>
      <q-page-container class="bg-grey-3">
			<!-- 主体 -->
      </q-page-container>
      <q-footer>
			<!-- 页脚 -->
      </q-footer>
    </q-layout>
  </ClientOnly>
</template>
```
:::

### Material Icon的样式文件应该在哪里引入？

#### 方案一：更改vuepress的template文件：dev.html与ssr.html

* `.vuepress/theme/templates/dev.html`
* `.vuepress/theme/templates/ssr.html`

<Util-CodeTab
  key-prefix="template"
  :code-types="['dev', 'ssr']"
  default-active-code-type="dev"
/>

::: slot template-dev
```html {7}
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
:::

::: slot template-ssr
```html {6}
<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet" type="text/css">
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}">
    {{{ userHeadTags }}}
    {{{ pageMeta }}}
    {{{ renderResourceHints() }}}
    {{{ renderStyles() }}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
    {{{ renderScripts() }}}
  </body>
</html>
```
:::

::: warning 注意

所有的template文件的更改最好基于[官方默认的模板](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html)进行

:::

#### 方案二：使用Quasar提供的extras库

* 首先安装quasar/extras

使用YARN

```
yarn add -D @quasar/extras
```

使用NPM

```
npm isntall --save-dev @quasar/extras
```


