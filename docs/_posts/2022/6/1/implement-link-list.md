---
title: leetcode - 707 设计链表
description: 重拾算法，从零开始
date: 2022-06-01
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

### 题目描述

设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val  和  next。val  是当前节点的值，next  是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性  prev  以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

在链表类中实现这些功能：

- get(index)：获取链表中第  index  个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为  val  的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为  val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第  index  个节点之前添加值为  val  的节点。如果  index  等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果 index 小于 0，则在头部插入节点。
- deleteAtIndex(index)：如果索引  index 有效，则删除链表中的第  index 个节点。

### 示例

```js
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
```

### 提示

- 所有 val 值都在 [1, 1000] 之内。
- 操作次数将在 [1, 1000] 之内。
- 请不要使用内置的 LinkedList 库。

### 实现代码

::: tip 提示
这里为了方便`log`，重写`toString`，此部分代码与核心逻辑无关

```js
MyLinkedList.prototype.toString = function () {
  let r = ''
  let t = this
  while (t.next !== null) {
    r += t.val + '->'
    t = t.next
  }
  return r + t.val + '->TAIL'
}
```


:::

<Util-CodeTab
  key-prefix="ll"
  :code-types="['javascript', 'run', 'output']"
  default-active-code-type="javascript"
/>

::: slot ll-javascript

```js
function MyLinkedList () {
  this.next = null
  this.val = null
}

MyLinkedList.prototype.get = function (index) {
  let t = this
  for (let i = 0; i <= index; i++) {
    if (t.next === null) return -1
    t = t.next
  }
  return t.val
}

MyLinkedList.prototype.addAtHead = function (val) {
  const h = {
    next: this.next,
    val,
  }
  this.next = h
}

MyLinkedList.prototype.addAtTail = function (val) {
  let t = this
  while (t.next !== null) {
    t = t.next
  }
  t.next = {
    val,
    next: null,
  }
}

MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0) {
    this.addAtHead(val)
    return
  }
  let t = this
  for (let i = 0; i < index; i++) {
    if (t.next === null) return
    t = t.next
  }
  const n = {
    next: t.next,
    val,
  }
  t.next = n
}

MyLinkedList.prototype.deleteAtIndex = function (index) {
  let t = this
  for (let i = 0; i < index; i++) {
    if (t.next === null) return
    t = t.next
  }
  if (t.next === null) {
    return
  }
  t.next = t.next.next
}
```
:::

::: slot ll-run
```js
const myLinkedList = new MyLinkedList()
console.log('initial:', myLinkedList.toString())
myLinkedList.addAtHead(1)
console.log('add val 1 to head:', myLinkedList.toString())
myLinkedList.addAtTail(3)
console.log('add val 3 to tail:', myLinkedList.toString())
myLinkedList.addAtIndex(1, 2)
console.log('add val 2 to index 1:', myLinkedList.toString())
console.log('get val from index 1:', myLinkedList.get(1))
myLinkedList.deleteAtIndex(1)
console.log('delete node from index 1:', myLinkedList.toString())
console.log('get val from index 1:', myLinkedList.get(1))
```
:::

::: slot ll-output
```yaml
initial: HEAD->TAIL
add val 1 to head: HEAD->1->TAIL
add val 3 to tail: HEAD->1->3->TAIL
add val 2 to index 1: HEAD->1->2->3->TAIL
get val from index 1: 2
delete node from index 1: HEAD->1->3->TAIL
get val from index 1: 3
```
:::

### 参考

* [707. 设计链表 - 力扣（LeetCode）](https://leetcode.cn/problems/design-linked-list/)