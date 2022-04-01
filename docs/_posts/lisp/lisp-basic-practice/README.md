---
title: LISP基础练习
description: LISP基础练习
categories: 
  - Expand Learning
tags: 
  - Lisp
author: Zion Dotson
location: Beijing
date: 2019-10-01
---

> LISP一些基础练习

<!-- more -->

### 函数

#### 说明

定义一个函数，接受两个实参，返回较大的那一个

#### 要点

* `defun`关键字定义函数，后面跟函数名称，参数列表，函数体
* `and`关键字表示与逻辑，后面可以跟多个条件表达式，如果所有表达式的值都不为nil，返回最后一个表达式的值

#### 代码

<Util-CodeTab
  key-prefix="max"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot max-lisp
```lisp
;;; 获取两个数字中大的那一个，若x与y中的任何一个不为数字则返回nil
(defun bigger-number (x y)
  (and (typep x 'number)
    (and (typep y 'number)
      (and (> x y)
        x
        y))))

(let ((num1 2) (num2 1))
  (format t "The bigger number of ~A and ~A is: ~A ~%" num1 num2 (bigger-number num1 num2)))
; 期望值：2
```
:::

### 迭代

#### 说明

定义一个函数，接受一个列表作为实参，返回列表的第四个元素

#### 要点

`do`语句用来迭代，接受三个参数：

* 第一实参为一组变量说明：(一个符号 该符号的初始值 每次循环对该符号的操作)
* 第二个实参为循环终止条件，可以是多个表达式，若满足条件，中断循环并对所有表达式求职并返回最后一个表达式的值
* 第三个实参为循环体，可以是任意数量的表达式

<Util-CodeTab
  key-prefix="iteration"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot iteration-lisp
```lisp
;;; 获取列表的第四个元素，若列表长度小于4，则返回nil
;; l 目标列表
(defun get-forth-element (l)
  (do ((i 0 (+ i 1)))
    ((> i 2) (car l))
    (setf l (cdr l))))

(format t "~A" (get-forth-element '(a b 1 2)))
; 期望值：2

```
:::

### 类型

#### 说明

定义一个函数，接受一个列表作为实参，判断该列表中是否有类型为列表的元素

#### 要点

* 使用`typep`判断类型，接受两个实参
第一个实参是需要判断的目标
第二个实参是期望的类型
* 使用递归

<Util-CodeTab
  key-prefix="typep"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot typep-lisp
```lisp
;;; 判断列表l中是否有类型为列表的元素
(defun lst-has-lst-element (l)
  (and (not (null l))
    (or (typep (car l) 'list)
      (lst-has-lst-element (cdr l)))))

(let (
  (l1 '(a b c d)
  (l2 '(1 2 (1 2)))
))
  (format t "List ~A has list element: ~A" l (lst-has-lst-element l))
  (format t "List ~A has list element: ~A" l (lst-has-lst-element l)))
; 期望值：
; List (A B C D) has list element: nil
; List (1 2 (1 2)) has list element: T
```
:::

### 结论

* lisp 中只有表达式，必须使用`()`包裹表达式
* lisp 中运算都是前缀表示法
* 学习lisp的过程中会对以前的编程思想造成一些颠覆
* lisp语言高亮貌似不支持，阅读体验可能不太好，可能是lisp使用的人实在太少了
