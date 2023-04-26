---
title: JavaScript数组常用方法
description: JavaScript数组常用且实用的方法
categories: 
  - Front-end
tags: 
  - Javascript
author: Dongsheng Zhao
location: Beijing
date: 2020-04-01
---

> JavaScript数组常用且实用的方法

## Array.prototype.pop()

### 注意事项

该方法会改变原数组，删除并返回原数组的最后一个元素

### 适用场景

需要取得数组的最后一个元素时

### 示例

<Util-CodeTab
  key-prefix="pop"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot pop-js
```js
const sourceData = ['a', 'b', 'c']
const lastElement = sourceData.pop()
console.log(lastElement)
// Expected: 'c'
```
:::


## Array.prototype.splice(start, number[, replace])

### 注意事项

该方法会改变原数组，删除并替换（如果提供了替换元素的话）原数组中的元素

### 适用场景

删除（替换）并得到被删除（替换）的元素

### 示例

<Util-CodeTab
  key-prefix="splice"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot splice-js
```js
const filePath = '/foo/bar/file.ext'
console.log(filePath.split('/').splice(-2, 1))
//Expected: bar
```
:::

## Array.pototype.map(processor)

### 注意事项

该方法会返回一个新数组

### 适用场景

将某一数组数据转换成另一种格式的数组数据

### 示例

<Util-CodeTab
  key-prefix="map"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot map-js
```js
const soureData = [{
  a: '1',
  b: '2'
}, {
  a: '3',
  b: '4'
}]
const processor = obj => ({
  x: obj.a,
  y: obj.b
})
const targetData = sourceData.map(processor )
console.log(targetData )
/* Expected:
[{
  x: '1',
  y: '2'
}, {
  x: '3',
  y: '4'
}]
*/
```
:::


## Array.prototyp.filter(rule)

### 注意事项

该方法会返回一个新数组

### 适用场景

对数组进行过滤

### 示例

<Util-CodeTab
  key-prefix="filter"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot filter-js
```js
const sourceData = [92, 45, 78, 32, 100]
const rule = score => score >= 60
const targetData = sourceData.filter(rule)
console.log(targetData)
// Expected: [92, 78, 100]
```
:::

## Array.prototype.reduce(reducer, initialValue)

### 适用场景

对数组中每一个元素进行累加

### 示例

<Util-CodeTab
  key-prefix="reduce"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot reduce-js
```js
const sourceData = [1, 2, 3, 4, 5]
const reducer = (acc, score) => acc + score
const score = sourceData.reduce(reducer, 0)
console.log(score)
// Expected: 15
```
:::

acc代表上一次累加的结果，obj是当前遍历元素, 0是初始值

## Array.prototype.every(condition)

### 适用场景

判断数组中的每一个元素是否都满足某一个条件

### 示例

<Util-CodeTab
  key-prefix="every"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot every-js
```js
const sourceData = [20, 40,  60, 80, 100, -20]
const condition = score => score >= 0 && score <= 100
const pass = sourceData.every(condition)
console.log(pass)
// Expected: false
```
:::


## Array.prototype.includes(notObj)

### 适用场景

判断数组中是否包含某一个元素，该方法不适用于元素为对象的数组

### 示例

<Util-CodeTab
  key-prefix="includes"
  :code-types="['js']"
  default-active-code-type="js"
/>
::: slot includes-js
```js
const sourceData = ['bar', 'foo', 'zoo']
const isFooIn = sourceData.includes('foo')
console.log(isFooIn)
// Expected: true
```
:::

## Array.prototype.find(condition)

### 注意事项

返回找到的第一个元素，若找不到则返回undefined

### 适用场景

找到数组中满足条件的元素

### 示例

<Util-CodeTab
  key-prefix="find"
  :code-types="['js']"
  default-active-code-type="js"
/>

::: slot find-js
```js
const isJSFile = str => /\.js$/.test(str)
const sourceData = ['foo.vue', 'bar.java', 'zoo.py', 'xyz.js']
const firstJSFile = sourceData.find(isJSFile )
console.log(firstJSFile)
// Expected: 'xyz.js'
```
:::

