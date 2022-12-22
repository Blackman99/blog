---
title: canvas多区域根据重叠次数不同填充不同颜色问题
author: Zion Dotson
location: BeiJing
date: 2020-11-23
categories:
  - Math
tags:
  - Canvas
  - Javascript
  - HTML
---

Canvas

<!-- more -->

> ### 问题描述
> 现有一个`canvas`画布，需要在其上绘制三个矩形，这三个矩形互相有相交部分，下面是重叠区域的填充规则：
> * 填充一次的区域用：<q-chip color="purple" text-color="white" size="12px" >紫色</q-chip>
> * 填充两次的区域用：<q-chip color="pink" text-color="white" size="12px">红色</q-chip>
> * 填充三次的区域用：<q-chip color="cyan" text-color="white" size="12px">青色</q-chip>


#### 先从一个区域开始

在一个空的画布上直接画第一个矩形，并用紫色填充即可

<Demo-CanvasMultiAreaColor-1 />

<Util-CodeTab 
  key-prefix="stage-1" 
  :code-types="['vue']"
  default-active-code-type="vue" 
/>

::: slot stage-1-vue
  <<< @/docs/.vuepress/components/Demo/CanvasMultiAreaColor/1.vue
:::

#### 画第二个矩形

我们以多个canvas来解决颜色问题，这里需要两个图层
* 第一个图层画紫色部分
* 第二个图层画粉色部分

但是应该如何让第二个层显示两个矩形的重叠区域呢
这时候就需要一个名叫`globalCompositeOperation`的属性了
关于这个属性的详细介绍可以参考我的另一篇博客：[Canvas元素组合方式](/2020/10/16/canvas-composition-mode/)

效果如下：

<Demo-CanvasMultiAreaColor-2 />

<Util-CodeTab 
  key-prefix="stage-2" 
  :code-types="['vue']"
  default-active-code-type="vue" 
/>

::: slot stage-2-vue
  <<< @/docs/.vuepress/components/Demo/CanvasMultiAreaColor/2.vue
:::

代码步骤解析：
* 直接将第一个矩形画在`canvas`上
* 将整个canvas画到`canvas2`上
* 在`canvas2`上以`source-in`的方式绘制第二个矩形
* 把第二个矩形绘制到`canvas`上

#### 接下来是第三个矩形

这里情况会变得稍稍复杂因为我们要考虑到所有可能的情况
我们需要在画完第二个矩形后
* 再加一个`canvas3`
* 新的`canvas`直接画矩形3即可
* 新的`canvas2`得到的方式应该是旧的`canvas2`以**source-over**的方式画上 (旧的`canvas`以**source-in**的方式画上新的矩形3)
* `canvas3`则直接用旧`canvas2`以**souce-in**的方式画出矩形3即可

效果如下：

<Demo-CanvasMultiAreaColor-3 />

<Util-CodeTab 
  key-prefix="stage-3" 
  :code-types="['vue']"
  default-active-code-type="vue" 
/>

::: slot stage-3-vue
  <<< @/docs/.vuepress/components/Demo/CanvasMultiAreaColor/3.vue
:::

::: tip 更多的区域

即使区域再多，用这种方式都可以逐渐画出想要的最后结果，而且每多加一个区域，新的结果中的每一个canvas总是建立在上一次结果之上的，不会每次都重新绘制所有的canvas
这是也是经典的算法之——备忘录法

:::