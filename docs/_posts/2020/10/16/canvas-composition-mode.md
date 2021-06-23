---
title: canvas元素组合方式
author: Zion Dotson
location: BeiJing
date: 2020-10-16
categories:
  - Front-end
tags:
  - Canvas
  - HTML
  - Javascript
---

> 现在有一个canvas容器，在其上面填充两个矩形

<!-- more -->

<Demo-CanvasCompositionMode-Start />

```html {7}
<canvas width="200" height="200"></canvas>
<script>
  const canvas = document.getELementById('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'pink'
  ctx.fillRect(0, 0, 100, 100)
  // ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'purple'
  ctx.fillRect(50, 50, 100, 100)
</script>
```

可以看到第二个紫色的矩形是覆盖在第一个粉色的矩形之上进行绘制的

这是默认的`source-over`模式

实际上，除了这种覆盖模式，浏览器还提供了其他组合方式，下面依次演示

### 各种组合方式的演示

<Demo-CanvasCompositionMode-All />

::: tip 模式名称的含义

其实从每个模式的名字就能知道这个模式的意思

source代表源（这里是第一个粉色矩形）

destination代表目标（这里是第二个紫色矩形）

* 以source-over为例：

over代表在...之上，有点类似于悬挂的感觉

在粉色矩形之上，绘制一个紫色矩形，我们的视角是垂直向页面上看，所以粉色矩形被紫色矩形遮挡了一部分

* 再比如source-in

意思是仅仅显示紫色矩形在粉色矩形内部的部分

:::

### 参考

[CanvasRenderingContext2D.globalCompositeOperation](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)