---
title: 如何给pixel2升级Android版本，并同时解决Pixel2发热易卡顿，高耗电问题
author: Dongsheng Zhao
location: BeiJing
date: 2020-11-24
categories:
  - Skills
tags:
  - Android
  - Pixel
  - Google
---

> 今年刚买的OnePlus 7T Pro屏幕摔坏了，维修需要三天，于是把之前用的Pixel2拿出来先顶几天，但是使用Pixel2时遇到了这些问题：
> * 耗电莫名的快
> * 时不时就发热、卡顿

<!-- more -->

### 为了解决这个问题我尝试了这几个方法

#### 安装[黑阈app](https://play.google.com/store/apps/details?id=me.piebridge.brevent&hl=zh&gl=US)

可行，但是每次重启手机，或者强行退出黑阈都需要重新连接电脑操作一遍

#### 为手机使用代理或者让手机连上已经代理过的网络，尝试从手机系统设置里直接下载更新

我使用了两种代理工具（[V2RayNG](https://github.com/2dust/v2rayNG)[与Outline](https://getoutline.org/)），分别直接代理手机，或者代理电脑并让手机连接电脑热点进行尝试，结果都不成功，始终会卡在更新系统页面

#### 从Google官网下载OTA，用adb刷版本

可以彻底解决问题，下面着重介绍这种方式

### 具体步骤

* 将手机连接到电脑，并打开开发者模式与USB调试模式
* [下载Andriod平台工具](https://developer.android.google.cn/studio/releases/platform-tools)
* [下载pixel2对应的最新的安卓OTA包](https://developers.google.com/android/ota#walleye)
* 解压platform-tools，并进去解压后的文件夹，在那个目录下打开命令行
* 运行`adb devices`，可以看到当前连接到电脑的设备列表，应该是只有一个，就是连接到电脑的Pixel2手机
* 运行`adb reboot recovery`，手机会重启，在重启启动时，同时按下音量上键+电源键（不用长按，短按即可），即可进入启动菜单选择
* 按音量上下键选择启动方式，按电源键确认选择，这里选择`Apply update from ADB`
* 运行`adb sideload /刚刚下载的ota的zip包路径.zip`，等待更新完成，然后选择`Reboot System`选项重启手机即可

::: tip 提示

亲测在更新完之后，软件，文件都没有缺失，并且过程很顺畅没有什么问题
只要参照Google官网的步骤进行操作即可
并且更新完之后Pixel2的高耗电与发热容易卡顿问题都得到了解决

:::

### 参考

[Google APIs for Andriod](https://developers.google.com/android/ota)