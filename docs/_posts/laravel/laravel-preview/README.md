---
title: Laravel框架学习 - 概览
description: 预览Laravel框架
categories: 
  - Server-side
tags: 
  - PHP
  - Laravel
author: Zion Dotson
location: Beijing
date: 2019-08-15
---

<img src="https://laravel.com/img/logotype.min.svg"/>

> Laravel系列的博客不打算详细说明我的操作过程，只是记录一些我遇到的点，感兴趣的话可以直接阅读

<!-- more -->

[官方文档](https://laravel.com/docs)
### 前言

最近手头的工作任务实在太少，于是又开始折腾PHP，看完了基本语法过后就想着写一个demo项目练手
在一些社区里搜索之后，发现PHP的web框架以`ThinkPHP` 以及`Laravel`为主，于是挑了Laravel来学习

### 路由

#### 路由美化

即去掉路由中的`public/index.php`

官方文档中方式是用`Nginx`或者`Apache`的路由重写，将`public/index.php`加入到美化后的路由中去

例：

我想访问：

`www.example.com/login`

实际上访问的是：

`www.example.com/public/index.php/login`

官方文档中给出了常见的：

[`Apache`与`Nginx`的配置](https://laravel.com/docs/5.8/installation#pretty-urls)

#### 路由定义

* `Laravel`的路由定义方式跟`Express`框架很类似，都是指定一个路由以及与一个对应的函数去处理它
* Laravel还提供了路由中间件的方式来，这一点跟`Node`的`Express`框架很像

#### 闭包路由无法使用路由缓存

* 我个人比较喜欢函数式编程，更喜欢无状态的编程风格
* 写`Java`时我喜欢用`lambda`表达式
* 写`JavaScript`时我基本只用箭头函数，不用`function`，`new`，`apply()`，`bind()`，`call()`，甚至我连`this`都不想用
* 然而想要使用`Laravel`的路由缓存就必须单独定义一个`Controller`以及对应的方法

### 前端

* `Laravel`用`blade`作为PHP模板引擎
`Laravel`自带集成`Webpack`，`Vue`或者`React`，`CSS`预处理器等前端的体系并提供了官方示例，以及相关

[配置的文档](https://laravel.com/docs/5.8/frontend)

### 数据库

* `Laravel`支持`ORM`，也支持一些方法来拼接查询语句以及原生`SQL`查询，灵活性非常的高
* 并且`Laravel`的配置文件已经提供了多种数据库的配置，搭建项目的速度非常快

### 环境区分

`Laravel`的环境配置区分都体现在都在`.evn.环境名`文件中，跟`vue-cli`的方式是一致的
并且配置文件中的变量也是从`env`文件中获取的

### 其它

* 测试
* 日志
* `api`授权认证
* 邮件
* 文件上传、存储
* 大量的工具方法
...

还有许多特性没有来得及体验，日后会继续学习、跟进
