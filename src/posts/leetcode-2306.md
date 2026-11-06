---
title: "leetcode 2306 -　公司命名"
date: 2022-07-08
excerpt: 重拾算法，重新开始
author: "Dongsheng Zhao"
cover: /covers/leetcode-2306.jpg
category: Algorithm
tags:
  - Algorithm
  - Leetcode
---
> LeetCode练习 

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

::::code-tabs{active="code"}
### code

```js
/**
 * @param {string[]} ideas
 * @return {number}
 */
const distinctNames = function (ideas) {
  const groups = Array(26)
    .fill(0)
    .map(() => new Set())
  for (let i = 0; i < ideas.length; i++) {
    const s = ideas[i]
    const idx = s.charCodeAt(0) - 'a'.charCodeAt(0)
    groups[idx].add(s.slice(1))
  }
  let ans = 0
  for (let i = 1; i < 26; i++) {
    for (let j = 0; j < i; j++) {
      let m = 0
      groups[i].forEach(s => {
        if (groups[j].has(s)) {
          m++
        }
      })
      ans += (groups[i].size - m) * (groups[j].size - m)
    }
  }
  return ans * 2
}

console.log(distinctNames(['coffee', 'cat', 'donuts', 'time', 'toffee']))
```

### 输入

```js
['coffee', 'cat', 'donuts', 'time', 'toffee']
```

### 输出

```js
6
```
::::

### 参考

- [2306. 公司命名 - 力扣（LeetCode）](https://leetcode.cn/problems/naming-a-company)
