---
title: leetcode 538 - 把二叉搜索树转换为累加树
description: 重拾算法 - leetcode 538 & 1038 - 把二叉搜索树转换为累加树
date: 2022-06-19
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

给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

提醒一下，二叉搜索树满足下列约束条件：

节点的左子树仅包含键 小于 节点键的节点。
节点的右子树仅包含键 大于 节点键的节点。
左右子树也必须是二叉搜索树。

### 示例

![Example](/images/convert-bst-to-greater-tree.png)

### 思路

* 定义求当前节点的新值函数`sum`，每个节点的新值（用`newVal`记录）为遍历整棵树之后所有节点值大于等于当前节点值之和
* 深度优先遍历所有节点，对每个节点进行`sum`
* 重新遍历树，将`val`改为`newVal`，并删除`newVal`属性

### 代码

<Util-CodeTab
  key-prefix="solution"
  :code-types="['javascript', 'run', 'result']"
  default-active-code-type="javascript"
/>

::: slot solution-javascript
```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const convertBST = function (root) {
  if (!root) return root

  // 求某个节点新值
  const sum = (node, n, s = 0) => {
    if (!node) {
      return s
    }
    if (node.val >= n) s += node.val
    s = sum(node.left, n, s)
    s = sum(node.right, n, s)
    return s
  }

  // 深度优先遍历所有节点
  const dfs = node => {
    if (!node) return
    node.newVal = sum(root, node.val)
    dfs(node.left)
    dfs(node.right)
  }

  dfs(root)

  // 重组树，将val赋值为newVal，并删除newVal
  const resetTree = node => {
    if (!node) return
    node.val = node.newVal
    delete node.newVal
    resetTree(node.left)
    resetTree(node.right)
  }
  resetTree(root)
  return root
}
```
:::

::: slot solution-run
```js
const tree = {
  val: 3,
  right: {
    val: 7,
    left: {
      val: 4,
    },
    right: {
      val: 10,
      left: {
        val: 8,
      },
    },
  },
  left: {
    val: 2,
    left: {
      val: 1,
    },
    right: {
      val: 9,
      right: {
        val: 11,
      },
    },
  },
}

console.log(convertBST(tree))
```
:::

::: slot solution-result
```js
{
  "val": 52,
  "right": {
      "val": 45,
      "left": {
          "val": 49
      },
      "right": {
          "val": 21,
          "left": {
              "val": 38
          }
      }
  },
  "left": {
      "val": 54,
      "left": {
          "val": 55
      },
      "right": {
          "val": 30,
          "right": {
              "val": 11
          }
      }
  }
}
```
:::

### 参考

* [538. 把二叉搜索树转换为累加树 - 力扣（LeetCode）](https://leetcode.cn/problems/convert-bst-to-greater-tree/)