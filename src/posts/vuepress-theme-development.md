---
title: Vuepress主题开发
date: 2019-12-08
excerpt: Vuepress主题开发
author: "Dongsheng Zhao"
category: Front-end
tags:
  - Vue
  - Vuepress
  - Javascript
---
> 在使用Vuepress中遇到的一些问题记录



## Unknow custom component xxx 错误

### 解决方法

手动注册`page-components`与`layout-components`



::::code-tabs{active="enhanceApp"}
### enhanceApp

```js
import pageComponents from '@internal/page-components'
import layoutComponents from '@internal/layout-components'

export default ({
	Vue, // VuePress 正在使用的 Vue 构造函数
	options, // 附加到根实例的一些选项
	isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  for (const [name, component] of Object.entries(pageComponents)) {
		Vue.component(name, component)
	}
	for (const [name, component] of Object.entries(layoutComponents)) {
		Vue.component(name, component)
	}
}
```
::::



## 如何使vuepress支持数学公式

### 添加`markdown-it-katex`依赖

```sh
yarn add markdown-it-katex
```

### 配置`.vuepress/config.js`

```js
module.exports = {
	// 其他配置...
	markdown: {
		// 其他markdown配置...
		extendMarkdown: md => {
			md.use(require('markdown-it-katex'))
		}
	}
}
```

### 更改theme/templates/dev.html与ssr.html，引入katex样式文件



::::code-tabs{active="dev"}
### dev

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
  </head>
  <body>
    <div id="app"></div>
  </body>

</html>
```

### ssr

```html
<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
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
::::



> **警告：关于模板文件的修改**
>

所有的template文件的更改最好基于[官方默认的模板](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html)进行



### 测试数学公式

#### Markdown代码

```md
$$a + b = c$$
```

#### 渲染结果

$$a + b = c$$
