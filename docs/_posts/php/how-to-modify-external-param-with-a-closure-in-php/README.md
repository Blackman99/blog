---
title: PHP中如何在匿名函数中修改外部变量
description: 在PHP中使用闭包时，会遇到需要修改闭包外部的变量操作，这时该如何操作呢？
categories: 
  - Server-side
  - Expand Learning
tags: 
  - PHP
author: Zion Dotson
location: Beijing
date: 2019-11-21
---

> PHP中如何在匿名函数中修改外部变量

### 解决方案
使用`use`对外部参数声明`&`引用，示例：

```php
$foo = 'foo';
$changeFoo = function() use (&$foo) {
  $foo = 'fooo';
}
ehco $foo;
// Expected: 'fooo'
```

### 注意
若不使用`&`符号，则只是用一个定义一个跟`$foo`同名的局部变量来指向外部$foo的值，此时在匿名函数内部改变`$foo`的值仅仅只是改变临时变量的值，示例：

```php
$foo = 'foo';

$changeFoo = function() use ($foo) {
  $foo = 'fooo';
}
ehco $foo;
// Expected: 'foo'
```

### 参考

[官方文档](https://www.php.net/manual/en/functions.anonymous.php)
