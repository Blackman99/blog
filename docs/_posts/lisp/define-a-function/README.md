---
title: LISP练习——定义一个函数，接受一个列表并返回一个列表，指出相等元素出现的次数，并由最常见至最少见的排序
description: LISP函数练习
categories: 
  - Expand Learning
tags: 
  - Lisp
author: Zion Dotson
location: Beijing
date: 2019-09-09
---

> LISP函数练习

<!-- more -->

### 要点

* `cons`构造列表，构造的结果是包含`car`与`cdr`的组合对象
* `mapcar`对列表的每一项进行一种操作
* `sort` 使用自定义的比较方法进行排序
* 递归遍历列表

### `cons`的使用

```lisp
(cons 'a 'b)
; Expected: (A . B)
```

### `mapcar`的使用

将列表中每个数字都乘2

```lisp
(mapcar #'(lambda (e) (if (numberp e) (* e 2) e)) '(1 a 2 b 3 c))
; Expected: (2 A 4 B 6 C)
```

### `sort` 使用

将数字元素放在前，其他元素放在后面，并将数字按照从小到大排序

<Util-CodeTab
  key-prefix="sort"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot sort-lisp
```lisp
(defun my-sort (l)
  (sort l #'(lambda (e1 e2)
      (if (numberp e1)
        (if (numberp e2)
          (< e1 e2)
          T)))))

(format t "~A ~%" (my-sort '(8 z 6 a 2 i 3 (1 8) (j k) 5)))
; Expected: (2 3 5 6 8 Z A I (1 8) (J K))
```
:::

### 复合使用

<Util-CodeTab
  key-prefix="combine"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot combine-lisp
```lisp
;;; 统计在列表中，每个字母出现的次数，并将结果按照出现次数由大到小排序

(defun occurrences (l)
  (if (null l) ; 若为nil，返回 nil
    nil
    (let (
      (r (occurrences (cdr l))) ; 递归求值
      (alpha (car l)))
      (sort (if (null r) ; 对结果排序
          (cons (cons (car l) 1) r) ; 若结果为nil，则说明是第一次遇到字母，直接放入空表
          (if (every #'(lambda (item) (not (eql (car item) alpha))) r) ; 当前的字母在表中是否没有记录
            (cons (cons (car l) 1) r) ; 没有记录直接放入记录中，次数为 1
            (mapcar ; 有记录，在原来基础上 + 1
              #'(lambda (item)
                (if (eql (car item) alpha)
                  (cons alpha (+ (cdr item) 1))
                  item))
              r
            ))) #'(lambda (item1 item2) (> (cdr item1) (cdr item2)))))))

(format t "~A" (occurrences '(a b a d a c d c a)))
; Expected: ((A . 4) (C . 2) (D . 2) (B . 1))
```
:::
