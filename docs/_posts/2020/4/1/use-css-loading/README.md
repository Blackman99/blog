---
title: 在Vue中使用Stylus编写loading特效
description: 在Vue中使用Stylus编写loading特效
categories: 
  - Front-end
tags: 
  - Vue
  - Stylus
date: 2020-04-01
author: Zion Dotson
location: Beijing
---

> 简单实现在Vue中使用Stylus编写loading特效

## 效果

<Demo-Loading-Stage5 />

## 实现

### 先定义一些基础的样式

创建一些容器与8个重叠的白色线条

<Util-CodeTab
  key-prefix="stage-1"
  :code-types="['vue']"
  default-active-code-type="vue"
/>
::: slot stage-1-vue
  <<< @/docs/.vuepress/components/Demo/Loading/Stage1.vue
:::

<Demo-Loading-Stage1 />

### 接下来结合`v-for`指令，我们将每个`.bar`旋转一定的角度

使用`v-for`的遍历数字特性，使得角度动态计算绑定为`style`属性

<Util-CodeTab
  key-prefix="stage-2"
  :code-types="['vue']"
  default-active-code-type="vue"
/>
::: slot stage-2-vue
  <<< @/docs/.vuepress/components/Demo/Loading/Stage2.vue
:::

<Demo-Loading-Stage2 />

### 使用`background: linear-gradient`属性使中间空出一个占比39.2%的黄金占比透明区域

`background: linear-gradient`，可以创建渐变背景，也可以创建双色、多色背景

<Util-CodeTab
  key-prefix="stage-3"
  :code-types="['vue']"
  default-active-code-type="vue"
/>
::: slot stage-3-vue
  <<< @/docs/.vuepress/components/Demo/Loading/Stage3.vue{29}
:::

<Demo-Loading-Stage3 />

### 使用`@keyframes`定义关键帧动画，通过设置`opacity`属性实现消失、出现动画

<Util-CodeTab
  key-prefix="stage-4"
  :code-types="['vue']"
  default-active-code-type="vue"
/>
::: slot stage-4-vue
  <<< @/docs/.vuepress/components/Demo/Loading/Stage4.vue
:::

<Demo-Loading-Stage4 />

### 结合v-for，使用`animation-delay`造成动画时间差

<Util-CodeTab
  key-prefix="stage-5"
  :code-types="['vue']"
  default-active-code-type="vue"
/>
::: slot stage-5-vue
  <<< @/docs/.vuepress/components/Demo/Loading/Stage5.vue
:::

<Demo-Loading-Stage5 />

---

:metal: 这样就完成了一个简单的loading特效啦

## 参考

* [linear-gradient() - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)
* [列表渲染 | Vue.js](https://cn.vuejs.org/v2/guide/list.html)
