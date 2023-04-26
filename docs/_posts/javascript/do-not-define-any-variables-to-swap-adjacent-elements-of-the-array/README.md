---
title: 不定义任何变量交互数组中相邻元素
description: 不定义任何变量交互数组中相邻元素
categories: 
  - Front-end
tags:
  - Javascript
author: Dongsheng Zhao
location: Beijing
date: 2019-07-07
---

> 不定义任何变量交互数组中相邻元素

<!-- more -->

### 要点

* 使用`slice`方法将需要交换的元素作为数组取出
* 使用`reverse`方法将元素交换位置
* 使用`...`操作符将交换后的数组展开
* 将展开结果作为`splice`方法的后两个参数，从而取代原来的两个元素

### 代码

```js
/**
 * [exchangeAdjacentElements 交互数组中相邻元素]
 * @param  {[type]} arr [目标数组]
 * @param  {[type]} i   [需要交换的两个相邻元素中位置靠前的元素下标]
 */
const exchangeAdjacentElements = (arr, i) => arr.splice(i, 2, ...arr.slice(i, i + 2).reverse())

const arr = [1, 2, 3, 4, 5]

exchangeAdjacentElements(arr, 2)

console.log(arr)
// Expect: [1, 2, 4, 3, 5]
```

::: tip 提示

由于使用了`splice`方法，所以该方法会改变原数组！

:::
