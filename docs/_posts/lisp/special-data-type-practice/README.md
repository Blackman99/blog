---
title: LISP 学习——特殊数据类型的操作练习
description: LISP数据类型学习
categories: 
  - Expand Learning
tags: 
  - Lisp
author: Zion Dotson
location: Beijing
date: 2019-11-16
---

> 一些基础的LISP特殊数据类型操作练习

<!-- more -->

### 用二分法搜索一个有序向量

#### 要点

* `length`获取列表长度
* `aref`取向量中的元素，也可以用`svref `，`svref`专门用来对向量进行操作，速度比`aref`快
* 递归求解

#### 代码

<Util-CodeTab
  key-prefix="binary-search"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot binary-search-lisp
```lisp
;;; 二分搜索
(defun b-search (obj vec)
  (let ((len (length vec)))
    (and (not (zerop len))
         (finder obj vec 0 (- len 1)))))

(defun finder (target vec start end)
  (if (eql end start) ; 如果起点等于终点相等
    (if (eql target (aref vec start))
      target
      nil)
    (let ((mid (+ start (round (/ (- end start) 2)))))
      (let ((e (aref vec mid))) ; 取到中间的元素
        (if (< target e)
          (finder target vec start (- mid 1))
 ; 若目标元素在左边对左半部分继续二分搜索
          (if (> target e)
            (finder target vec (+ mid 1) end)

 ; 若目标元素在右边对右半部分继续二分搜索
            target))))))

(format t "~A~%" (b-search 3 #(0 1 2 3 4 5 6 7 8 9)))
; Expected: 3
```
:::

### 不使用原生`reverse`方法将列表倒序

#### 要点

* `car`获取列表的首个元素
* `cdr`获取列表除首个元素之外的所有元素构成的列表
* `list`构造列表
* `append` 合并多个列表
* 递归倒序

#### 代码

<Util-CodeTab
  key-prefix="reverse-order"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot reverse-order-lisp
```lisp
;;; 将列表倒序
(defun my-rev-lst (l)
  (if (null l)
    (list)
    (append (my-rev-lst (cdr l)) (list (car l)))))

(format t "~A~%" (my-rev-lst '(a b c d)))
; Expected: (D C B A)
```
:::

### 不使用原生`copy-list`复制列表

#### 要点

* `reduce`对列表进行积累操作
* `list`构造列表
* `append`合并列表

#### 代码

<Util-CodeTab
  key-prefix="copy-list"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot copy-list-lisp
```lisp
;;; 复制列表
(defun my-cp-lst (l)
  (reduce
    #'(lambda (new-l e)
      (if (listp new-l)
        (append new-l (list e))
        (list new-l e))
      )
    l))

(format t "~A~%" (my-cp-lst '(a b c d)))
```
:::

### 将一个相同维度的数组顺时针转 90 度

#### 要点

* `make-array` 构造数组
* `do`双层循环遍历
* `setf`搭配`aref`更改数组元素

#### 代码

<Util-CodeTab
  key-prefix="rotate-array"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot rotate-array-lisp
```lisp
; 将一个等纬度的二维数组顺时针旋转90度
(defun rotate-square-array (arr)
  (let
    ((n (car (array-dimensions arr)))
    (new-arr nil))
    (setf new-arr (make-array (list n n) :initial-element nil))
    (do ((i 0 (+ i 1)))
      ((eql i n))
      (do ((j 0 (+ j 1)))
        ((eql j n))
          (setf (aref new-arr i j) (aref arr (- (- n 1) j) i))))
    new-arr))

(let
  ((arr (make-array '(3 3) :initial-element nil)))
  (do ((i 0 (+ i 1)))
    ((eql i 3))
    (do ((j 0 (+ j 1)))
      ((eql j 3))
      (setf (aref arr i j) (+ (* i 3) (+ j 1)))))
  (format t "Before rotate: ~A~%" arr)
  (format t "After rotate: ~A~%" (rotate-square-array arr)))
; Expected:
; Before rotate: #2A((1 2 3) (4 5 6) (7 8 9))
; After rotate: #2A((7 4 1) (8 5 2) (9 6 3))
```
:::

### 哈希表与关联列表的相互转换

#### 要点

* `make-hash-table`构造哈希表
* `maphash`遍历哈希表
* `setf`搭配`gethash`添加或设置哈希表中的值
* 关联列表是由`cons`对象组成的列表
* `cons`构造`cons`对象

<Util-CodeTab
  key-prefix="hash-to-list"
  :code-types="['lisp']"
  default-active-code-type="lisp"
/>
::: slot hash-to-list-lisp
```lisp
;;; 哈希表转关联列表
(defun hash-table-to-lst (ht)
  (let ((l (list)))
    (maphash
      #'(lambda (k v)
        (setf l (append l (list (cons k v))))
      )
      ht
    )
    l))

(let ((ht (make-hash-table)))
  (setf (gethash 'color ht) 'red)
  (setf (gethash 'size ht) 'big)
  (format t "~A~%" (hash-table-to-lst ht)))
; Expected: ((COLOR . RED) (SIZE . BIG))

;;; 关联列表转哈希表
(defun lst-to-hash-table (l)
  (if (null l)
    (make-hash-table)
    (let (
      (e (car l))
      (ht (lst-to-hash-table (cdr l))))
      (setf (gethash (car e) ht) (cdr e))
      ht)))

(maphash
  #'(lambda (k v)
    (format t "~A = ~A~%" k v))
  (lst-to-hash-table '((+ . "add") (- . "subtract"))))
; Expected:
; - = subtract
; + = add
```
:::

