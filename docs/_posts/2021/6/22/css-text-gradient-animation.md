---
title: 用CSS3实现文字颜色渐变动画
date: 2021-06-22
author: Dongsheng Zhao
location: Beijing
tags:
  - CSS
  - HTML
categories:
  - Front-end
---

> 如何用CSS3实现文字颜色渐变动画

<!-- more -->

效果如下：

<span class="gradient-color-text">
I have a dream
</span>

<style>
@keyframes text-color-gradient {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
.gradient-color-text {
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #ff0000, #ff8000, #fff200, #51ff00, #00d0ff, #9000ff,#ff008c);
  -webkit-background-clip: text;
  animation: text-color-gradient 10s ease infinite;
  color: transparent;
  font-size: 48px;
}
</style>

### 思路
* 使用`-webkit-background-clip: text;`实现背景渐变按照文字裁剪
* 使用`@keyframes`定义动画关键帧配合`background-position`属性，移动渐变色背景位置

### 代码实现

<Util-CodeTab
  key-prefix="gradient-text"
  :code-types="['html', 'css']"
  default-active-code-type="html"
/>

::: slot gradient-text-html
```html
<span class="gradient-color-text">
I have a dream
</span>
```
:::

::: slot gradient-text-css
```css
@keyframes text-color-gradient {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
.gradient-color-text {
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #ff0000, #ff8000, #fff200, #51ff00, #00d0ff, #9000ff,#ff008c);
  -webkit-background-clip: text;
  animation: text-color-gradient 10s ease infinite;
  color: transparent;
  font-size: 48px;
}
```
:::
