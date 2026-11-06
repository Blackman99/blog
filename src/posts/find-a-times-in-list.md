---
title: "LISP练习——找到\"a\"在列表中出现的次数"
date: 2020-06-12
excerpt: 在LISP中用循环以及递归两种方式实现：找到a在列表中出现的次数
author: "Dongsheng Zhao"
cover: /covers/find-a-times-in-list.jpg
category: "Expand Learning"
tags:
  - Lisp
---
> 在LISP中用循环以及递归两种方式实现：找到a在列表中出现的次数



### 循环方式




::::code-tabs{active="lisp"}
### lisp

```lisp
(defun a-times-loop (lst)
  (do (
    (e (car lst))
    (times 0)
  )
    ((null e) times)
    (if (eql 'a e)
      (setf times (+ times 1)))
    (setf lst (cdr lst))
    (setf e (car lst))))


(let ((lst '(a b c d)))
  (format t "A in list ~A is: ~A ~%" lst (a-times-loop lst))))

; 期待输出：
; A in list (A B C D) is: 1
```
::::



### 递归方式



::::code-tabs{active="lisp"}
### lisp

```lisp
(defun a-times-recursive (lst)
  (if (null lst)
    0
    (+ (if (eql 'a (car lst)) 1 0) (a-times-recursive (cdr lst)))))

(let ((lst '(a b c d)))
  (format t "A in list ~A is: ~A ~%" lst (a-times-recursive lst))) 
  
; 期待输出：
; A in list (A B C D) is: 1
```
::::
