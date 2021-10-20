---
title: 在Android和windows中使用ColorNote同步笔记
description: 在Android和windows中使用ColorNote同步笔记
date: 2020-03-28
author: Zion Dotson
location: Beijing
categories: 
  - Skills
tags: 
  - Windows
  - Android
---

> 在手机上发现一个比较好用的免费笔记应用：彩色笔记
> 官网地址：[ColorNote](https://www.colornote.com/)

<!-- more -->

### 进一步需要

有些时候我需要在电脑和手机之间同步我的笔记

查找之后发现，在Microsoft Store里有彩色笔记应用

地址：[彩色笔记-Windows应用商店](https://www.microsoft.com/zh-cn/p/%E5%BD%A9%E8%89%B2%E7%AC%94%E8%AE%B0-%E5%BD%A9%E8%99%B9%E4%BE%BF%E7%AD%BE%E8%AE%B0%E4%BA%8B%E6%9C%AC/9nblggh10xvm)

### 问题出现

彩色笔记这个应用只支持Facebook或者Google账号登录

手机上的话我使用V2ray没有什么问题

但是，windows上Micros Store里下载的应用没有办法使用本地代理

### 解决方案

* 下载[Fiddler](https://www.telerik.com/fiddler)
* 打开Fiddler，点击左上角Win Config菜单
* 在弹出的AppContainer Loopback Exemption Utility里选择Exempt All
* 点击Save Changes，点击Refresh
* 打开彩色笔记即可通过本地开启的代理登录Google账号

::: tip 为什么选Exempt All

这里看参考站里都是勾选某几个，但是我试过不太好使，索性一股脑都勾选了 :rofl:

:::

### 参考

* [https://peterjiang.neocities.org/index-p=33001.html](https://peterjiang.neocities.org/index-p=33001.html)
* [https://yuan.ga/enable-win10-uwp-use-system-proxy/](https://yuan.ga/enable-win10-uwp-use-system-proxy/)
