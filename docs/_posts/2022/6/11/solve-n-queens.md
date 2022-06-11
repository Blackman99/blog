---
title: leetcode 51 - N 皇后
description: leetcode 51 - N 皇后
date: 2022-06-11
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

### 问题描述

按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位

### 示例

当`n = 4`时，应该有两个解，如下图：

<Demo-NQueen-4 />

* 输入：n = 4
* 输出：
```js
[
  [
    ".Q..",
    "...Q",
    "Q...",
    "..Q."
  ],
  [
    "..Q.",
    "Q...",
    "...Q",
    ".Q.."
  ]
]
```

### 分析

* 从第一行开始的第一格开始放置皇后
* 每放置一个皇后，将被放置格所在列、左上至右下的斜线，右上至左下的斜线记录为已放置状态
* 继续从下一行的第一格开始放置，每次放置判断是否满足放置条件

::: tip 如何表示两条斜线
假设当前格坐标为`(3, 2)`

* 那么与当前格在同一个左上至右下斜线的所有其他格`(i, j)`，需要满足`i - j = 1 - 2 = -1`
* 那么与当前格在同一个右上至左下斜线的所有其他格`(i, j)`，需要满足`i + j = 1 + 2 = 3`

这里以7x7的棋盘为例说明

```html
<!-- TODO: 画出7x7斜线示例 -->
```

:::

### 代码

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  const res = [] // 所有解的集合
  const dfs = (
    row = 0,
    paths = Array(n) // 记录当前解
      .fill(0)
      .map(() => Array(n).fill('.').join('')),
    cols = {}, // 记录列放置状态
    slashes1 = {}, // 记录左上至右下斜线放置状态
    slashes2 = {} // 记录右上至左下斜线放置状态
  ) => {
    // 递归边界，到这里说明当前的paths已经满足要求，将解放置到集合中
    if (row === n) {
      res.push(JSON.parse(JSON.stringify(paths)))
      return
    }
    for (let j = 0; j < n; j++) {
      // 如果同列，同斜线方向已有皇后则不做处理
      if (cols[j] || slashes1[row - j] || slashes2[row + j]) continue
      // 满足放置条件，将列，斜线放置状态记录
      cols[j] = true
      slashes1[row - j] = true
      slashes2[row + j] = true
      const arr = Array(n).fill('.')
      arr[j] = 'Q'
      paths[row] = arr.join('')
      // 进行下一行的判断 
      dfs(row + 1, paths, cols, slashes1, slashes2)
      cols[j] = false
      slashes1[row - j] = false
      slashes2[row + j] = false
      paths[row] = Array(n).fill('.').join('')
    }
  }
  dfs()
  return res
}
```

### 动画演示

```html
<!-- TODO: 动画演示 -->
```

### 参考

* [51. N 皇后 - 力扣（LeetCode）](https://leetcode.cn/problems/n-queens/)