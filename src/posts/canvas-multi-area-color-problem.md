---
title: canvas多区域根据重叠次数不同填充不同颜色问题
date: 2020-11-23
author: "Dongsheng Zhao"
cover: /covers/canvas-multi-area-color-problem.jpg
category: Math
tags:
  - Canvas
  - Javascript
  - HTML
---
Canvas

> ### 问题描述
> 现有一个`canvas`画布，需要在其上绘制三个矩形，这三个矩形互相有相交部分，下面是重叠区域的填充规则：
> * 填充一次的区域用：<Chip color="purple" text="紫色" />
> * 填充两次的区域用：<Chip color="pink" text="红色" />
> * 填充三次的区域用：<Chip color="cyan" text="青色" />

#### 先从一个区域开始

在一个空的画布上直接画第一个矩形，并用紫色填充即可

```svelte live title="Stage1.svelte"
<script>
  import { onMount } from 'svelte'

  let canvas

  onMount(() => {
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    ctx.beginPath()

    ctx.moveTo(20, 20)
    ctx.lineTo(150, 20)
    ctx.lineTo(150, 100)
    ctx.lineTo(20, 100)

    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()
  })
</script>

<canvas bind:this={canvas} class="canvas" width="400" height="200"></canvas>

<style>
  .canvas {
    display: block;
    background-color: #444;
    /* 400x200 like the original; shrinks with the column on narrow screens */
    width: min(100%, 400px);
    height: auto;
    font-family: var(--sp-font-sans);
  }
</style>
```

#### 画第二个矩形

我们以多个canvas来解决颜色问题，这里需要两个图层
* 第一个图层画紫色部分
* 第二个图层画粉色部分

但是应该如何让第二个层显示两个矩形的重叠区域呢
这时候就需要一个名叫`globalCompositeOperation`的属性了
关于这个属性的详细介绍可以参考我的另一篇博客：[Canvas元素组合方式](/2020/10/16/canvas-composition-mode/)

效果如下：

```svelte live title="Stage2.svelte"
<script>
  import { onMount } from 'svelte'

  let canvas
  let canvas2

  onMount(() => {
    const ctx = canvas.getContext('2d')
    const ctx2 = canvas2.getContext('2d')
    if (!ctx || !ctx2)
      return
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(150, 20)
    ctx.lineTo(150, 100)
    ctx.lineTo(20, 100)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()

    ctx2.drawImage(canvas, 0, 0)
    ctx2.beginPath()
    ctx2.moveTo(60, 10)
    ctx2.lineTo(180, 10)
    ctx2.lineTo(180, 120)
    ctx2.lineTo(60, 120)
    ctx2.closePath()
    ctx2.globalCompositeOperation = 'source-in'
    ctx2.fillStyle = '#E91E63'
    ctx2.fill()

    ctx.beginPath()
    ctx.moveTo(60, 10)
    ctx.lineTo(180, 10)
    ctx.lineTo(180, 120)
    ctx.lineTo(60, 120)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()
  })
</script>

<div class="canvas-container">
  <canvas bind:this={canvas} class="canvas" width="400" height="200"></canvas>
  <canvas bind:this={canvas2} class="canvas" width="400" height="200"></canvas>
</div>

<style>
  .canvas-container {
    background-color: #444;
    position: relative;
    /* 400x200 like the original; shrinks with the column on narrow screens */
    width: min(100%, 400px);
    aspect-ratio: 2 / 1;
    font-family: var(--sp-font-sans);
  }
  .canvas {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
```

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

```svelte live title="Stage3.svelte"
<script>
  import { onMount } from 'svelte'

  let canvas
  let canvas2
  let canvas3

  onMount(() => {
    // 第一个矩形
    const ctx = canvas.getContext('2d')
    const ctx2 = canvas2.getContext('2d')
    const ctx3 = canvas3.getContext('2d')
    if (!ctx || !ctx2 || !ctx3)
      return
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(150, 20)
    ctx.lineTo(150, 100)
    ctx.lineTo(20, 100)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()

    // 第二个矩形
    ctx2.drawImage(canvas, 0, 0)
    ctx2.beginPath()
    ctx2.moveTo(60, 10)
    ctx2.lineTo(180, 10)
    ctx2.lineTo(180, 120)
    ctx2.lineTo(60, 120)
    ctx2.closePath()
    ctx2.globalCompositeOperation = 'source-in'
    ctx2.fillStyle = '#E91E63'
    ctx2.fill()

    ctx.beginPath()
    ctx.moveTo(60, 10)
    ctx.lineTo(180, 10)
    ctx.lineTo(180, 120)
    ctx.lineTo(60, 120)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()

    // 第三个矩形
    ctx3.drawImage(canvas2, 0, 0)
    ctx3.globalCompositeOperation = 'source-in'
    ctx3.beginPath()
    ctx3.moveTo(40, 40)
    ctx3.lineTo(170, 40)
    ctx3.lineTo(170, 120)
    ctx3.lineTo(40, 120)
    ctx3.closePath()
    ctx3.fillStyle = 'cyan'
    ctx3.fill()

    const tempCanvas = document.createElement('canvas')
    tempCanvas.height = 200
    tempCanvas.width = 400
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx)
      return
    tempCtx.drawImage(canvas, 0, 0)
    tempCtx.globalCompositeOperation = 'source-in'
    tempCtx.beginPath()
    tempCtx.moveTo(40, 40)
    tempCtx.lineTo(170, 40)
    tempCtx.lineTo(170, 120)
    tempCtx.lineTo(40, 120)
    tempCtx.closePath()
    tempCtx.fillStyle = '#E91E63'
    tempCtx.fill()
    ctx2.globalCompositeOperation = 'source-over'
    ctx2.drawImage(tempCanvas, 0, 0)

    ctx.beginPath()
    ctx.moveTo(40, 40)
    ctx.lineTo(170, 40)
    ctx.lineTo(170, 120)
    ctx.lineTo(40, 120)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()
  })
</script>

<div class="canvas-container">
  <canvas bind:this={canvas} class="canvas" width="400" height="200"></canvas>
  <canvas bind:this={canvas2} class="canvas" width="400" height="200"></canvas>
  <canvas bind:this={canvas3} class="canvas" width="400" height="200"></canvas>
</div>

<style>
  .canvas-container {
    background-color: #444;
    position: relative;
    /* 400x200 like the original; shrinks with the column on narrow screens */
    width: min(100%, 400px);
    aspect-ratio: 2 / 1;
    font-family: var(--sp-font-sans);
  }
  .canvas {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
```

> **提示：更多的区域**
>
> 即使区域再多，用这种方式都可以逐渐画出想要的最后结果，而且每多加一个区域，新的结果中的每一个canvas总是建立在上一次结果之上的，不会每次都重新绘制所有的canvas
> 这是也是经典的算法之——备忘录法
