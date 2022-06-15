---
title: leetcode 498 - 对角线遍历
description: 重拾算法，重新开始
date: 2022-06-14
author: Zion Dotson
location: Beijing
tags:
  - Algorithm
  - Leetcode
categories:
  - Algorithm
---

> 重拾算法
<!-- more -->

### 描述

给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。

### 示例

<Example />

如图：
* 输入：
```js
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```
* 输出
```js
[1, 2, 4, 7, 5, 3, 6, 8, 9]
```

### 思路

* 设`n = mat.length`，`m = mat[0].length`
* 用`d`记录当前方向，`d = 1`代表当前方向为左下 => 右上
* 用`d`记录当前方向，`d = 0`代表当前方向为右上 => 左下
* 左下至右上每移动一次，`i - 1`, `j + 1`
* 右上至左下每移动一次，`i + 1`, `j - 1`
* 当左下 => 右上遇到边界情况如下：
  * `i = 0`时，此时抵达上边界，且`j + 1 < m`时（确保横向移动不会超出范围），横向移动一格，并调转方向（更改d的值）
  * `j = m - 1` 时，此时抵达右边界，且`i + 1 < n`时（确保纵向移动不会超出范围），纵向移动一格，并调转方向
* 右上 => 左下的分析与上面一致，只是边界变成了左边界与下边界

### 代码

<Util-CodeTab
  key-prefix="solution"
  :code-types="['javascript', 'run', 'output']"
  default-active-code-type="javascript"
/>

::: slot solution-javascript
```js
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = function (mat) {
  if (mat.length === 0) return []
  if (mat.length === 1) return mat[0]
  const r = []

  const n = mat.length
  const m = mat[0].length

  const dfs = (i = 0, j = 0, d = 1) => {
    r.push(mat[i][j])
    if (i === n - 1 && j === m - 1) {
      return
    }
    // d 为1， 左下 -> 右上
    if (d) {
      if (i === 0) {
        if (j + 1 < m) {
          dfs(i, j + 1, 0)
          return
        }
      }
      if (j === m - 1) {
        if (i + 1 < n) {
          dfs(i + 1, j, 0)
          return
        }
      }
      dfs(i - 1, j + 1, d)
      return
    }
    // d 为0， 右上 -> 左下
    if (i === n - 1) {
      if (j + 1 < m) {
        dfs(i, j + 1, 1)
        return
      }
    }
    if (j === 0) {
      if (i + 1 < n) {
        dfs(i + 1, j, 1)
        return
      }
    }
    dfs(i + 1, j - 1, d)
  }

  dfs()
  return r
}
```
:::

::: slot solution-run
```js
console.log(
  findDiagonalOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
)
console.log(
  findDiagonalOrder([
    [1, 2, 3, 11],
    [4, 5, 6, 98],
    [7, 0, 9, 20],
  ])
)
```
:::

::: slot solution-output
```js
[
  1, 2, 4, 7, 5,
  3, 6, 8, 9
]
[
   1,  2, 4, 7, 5,
   3, 11, 6, 0, 9,
  98, 20
]
```
:::

### 参考

* [498. 对角线遍历 - 力扣（LeetCode）](https://leetcode.cn/problems/diagonal-traverse/)

<script>
import Example from '@vp/demo-components/Algorithm/DiagonalTraverse/Example.vue'

export default {
  components: {
    Example
  }
}
</script>