---
title: leetcode 2306 -　公司命名
description: 重拾算法，重新开始
date: 2022-07-08
author: Dongsheng Zhao
location: Beijing
tags:
  - Algorithm
  - Leetcode
categories:
  - Algorithm
---

> LeetCode练习 
<!-- more -->

### 描述

给你一个字符串数组 ideas 表示在公司命名过程中使用的名字列表。公司命名流程如下：

1. 从 ideas 中选择 2 个 **不同** 名字，称为 ideaA 和 ideaB 。
2. 交换 ideaA 和 ideaB 的首字母。
3. 如果得到的两个新名字**都**不在 ideas 中，那么 ideaA ideaB（**串联**ideaA 和 ideaB ，中间用一个空格分隔）是一个有效的公司名字。
4. 否则，不是一个有效的名字。

返回**不同**且有效的公司名字的数目。

### 示例

- 输入：

```js
['coffee', 'donuts', 'time', 'toffee']
```

- 期望输出：`6`
- 解释：
  - ("coffee", "donuts")：对应的公司名字是 "doffee conuts" 。
  - ("donuts", "coffee")：对应的公司名字是 "conuts doffee" 。
  - ("donuts", "time")：对应的公司名字是 "tonuts dime" 。
  - ("donuts", "toffee")：对应的公司名字是 "tonuts doffee" 。
  - ("time", "donuts")：对应的公司名字是 "dime tonuts" 。
  - ("toffee", "donuts")：对应的公司名字是 "doffee tonuts" 。

### 思路

- 将所有字符串按照首字母分组，得到`groups`
- 令$|G_x|$为`groups[x]`组所包含的字符串数量
- 令`m`为组 $G_i$ 中与$G_j$ 中相同字符串的数量

$$count = 2 * \sum_{i=0}^{i < 26} (\sum_{j=0}^{j<i} (|G_i| - m) * (|G_j| - m)) $$

### 代码

<<< @/docs/_posts/2022/7/28/leetcode-2306.js

### 参考

- [2306. 公司命名 - 力扣（LeetCode）](https://leetcode.cn/problems/naming-a-company)
