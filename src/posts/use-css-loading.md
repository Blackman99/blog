---
title: 在Vue中使用Stylus编写loading特效
date: 2020-04-01
excerpt: 在Vue中使用Stylus编写loading特效
author: "Dongsheng Zhao"
cover: /covers/use-css-loading.jpg
category: Front-end
tags:
  - Vue
  - Stylus
---
> 简单实现在Vue中使用Stylus编写loading特效

## 效果

<Demo-Loading-Stage5 />

## 实现

### 先定义一些基础的样式

创建一些容器与8个重叠的白色线条

::::code-tabs{active="vue"}
### vue

```vue
<template lang="html">
  <div class="example-box">
    <div class="loading-box">
      <div class="bar-box">
        <div
          v-for="n in 8"
          :key="n"
          class="bar"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
.example-box
  width 200px
  height 200px
  background-color blue
  position relative
  .loading-box
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .7)
    .bar-box
      position: absolute
      top 50%
      left 50%
      width 20px
      .bar
        position absolute
        left 0
        top 0
        background-color rgba(255, 255, 255, 1)
        height 4px
        width 20px
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        transform-origin: left
</style>
```
::::

<Demo-Loading-Stage1 />

### 接下来结合`v-for`指令，我们将每个`.bar`旋转一定的角度

使用`v-for`的遍历数字特性，使得角度动态计算绑定为`style`属性

::::code-tabs{active="vue"}
### vue

```vue
<template lang="html">
  <div class="example-box">
    <div class="loading-box">
      <div class="bar-box">
        <div
          v-for="n in 8"
          :key="n"
          class="bar"
          :style="{
            transform: `rotate(${n * 360 / 8}deg)`
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
.example-box
  width 200px
  height 200px
  background-color blue
  position relative
  .loading-box
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .7)
    .bar-box
      position: absolute
      top 50%
      left 50%
      .bar
        position absolute
        left 0
        top 0
        background-color rgba(255, 255, 255, 1)
        height 4px
        width 20px
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        transform-origin: left
</style>
```
::::

<Demo-Loading-Stage2 />

### 使用`background: linear-gradient`属性使中间空出一个占比39.2%的黄金占比透明区域

`background: linear-gradient`，可以创建渐变背景，也可以创建双色、多色背景

::::code-tabs{active="vue"}
### vue

```vue
<template lang="html">
  <div class="example-box">
    <div class="loading-box">
      <div class="bar-box">
        <div
          v-for="n in 8"
          :key="n"
          class="bar"
          :style="{
            transform: `rotate(${n * 360 / 8}deg)`
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="stylus" scoped>
.example-box
  width 200px
  height 200px
  background-color blue
  position relative
  .loading-box
 // [svp! hl]
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .7)
    .bar-box
      position: absolute
      top 50%
      left 50%
      .bar
        position absolute
        left 0
        top 0
        height 4px
        width 20px
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        transform-origin: left
        background: linear-gradient(to right, transparent 38.2%, #fff 38.2%)
</style>
```
::::

<Demo-Loading-Stage3 />

### 使用`@keyframes`定义关键帧动画，通过设置`opacity`属性实现消失、出现动画

::::code-tabs{active="vue"}
### vue

```vue
<template lang="html">
  <div class="example-box">
    <div class="loading-box">
      <div class="bar-box">
        <div
          v-for="n in 8"
          :key="n"
          class="bar"
          :style="{
            transform: `rotate(${n * 360 / 8}deg)`
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="stylus" scoped>
@keyframes loading {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.example-box
  width 200px
  height 200px
  background-color blue
  position relative
  .loading-box
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .7)
    .bar-box
      position: absolute
      top 50%
      left 50%
      .bar
        position absolute
        left 0
        top 0
        height 4px
        width 20px
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        transform-origin: left
        background: linear-gradient(to right, transparent 38.2%, #fff 38.2%)
        animation: loading 1.04s ease infinite both
</style>
```
::::

<Demo-Loading-Stage4 />

### 结合v-for，使用`animation-delay`造成动画时间差

::::code-tabs{active="vue"}
### vue

```vue
<template lang="html">
  <div class="example-box">
    <div class="loading-box">
      <div class="bar-box">
        <div
          v-for="n in 8"
          :key="n"
          class="bar"
          :style="{
            transform: `rotate(${n * 360 / 8}deg)`,
            animationDelay: `${(n - 1) * 0.13}s`
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="stylus" scoped>
@keyframes loading {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.example-box
  width 200px
  height 200px
  background-color blue
  position relative
  .loading-box
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .7)
    .bar-box
      position: absolute
      top 50%
      left 50%
      .bar
        position absolute
        left 0
        top 0
        height 4px
        width 20px
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        transform-origin: left
        background: linear-gradient(to right, transparent 38.2%, #fff 38.2%)
        animation: loading 1.04s ease infinite both
</style>
```
::::

<Demo-Loading-Stage5 />

---

:metal: 这样就完成了一个简单的loading特效啦

## 参考

* [linear-gradient() - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)
* [列表渲染 | Vue.js](https://cn.vuejs.org/v2/guide/list.html)
