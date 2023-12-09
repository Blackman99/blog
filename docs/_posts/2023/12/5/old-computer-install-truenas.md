---
title: 将闲置电脑改装成 NAS 服务器
description: 家里有一台闲置电脑，所性直接改装成 NASA 服务器
date: 2023-12-05
author: Dongsheng Zhao
location: Beijing
tags:
  - NAS
  - Linux
categories:
  - Operating System
---

> 借助开源 NAS 系统 [TrueNAS](https://www.truenas.com/)，将家里的闲置电脑改为 NAS 服务器

<!-- more -->

## TrueNAS 简介

TrueNASA 是基于 FreeBSD 的开源 NAS 操作系统，包含了很多必要的功能，且可自定义程度高，基于 FreeBSD，对于开发者友好

## 下载 TrueNAS core OS =镜像

访问 [Download TrueNAS](https://www.truenas.com/download-truenas-core/)

## 制作启动盘/直接解压到本地磁盘

### 制作启动盘

* 容量 >= 8G 的 U 盘一个，已经格式化
* 镜像烧录工具，[Rufus](https://rufus.ie/)
* 重启电脑，进入 BIOS，选择 Boot 顺序，将 U 盘启动设为最高优先级，保存设置，退出 BIOS
* 按照命令行引导安装即可

### 从本地磁盘安装

* 从计算机磁盘管理分出一个 8 G 的新磁盘
* 将 IOS 镜像文件直接解压至新磁盘
* 重启电脑，进入 BIOS，选择 Boot 顺序，将新建的磁盘设置为最高优先级，保存设置，退出 BIOS
* 按照命令行引导安装即可

## 管理 TrueNAS

安装完毕后，将会在命令行中出现 TrueNAS 的局域网访问 IP 地址，比如我的就是：192.168.1.3

::: warning 注意
请设置你的路由器分配给 TrueNAS 系统所在机器固定 IP
:::

这时候直接用另外的局域网内的电脑上的浏览器访问这个 IP 地址，即可 打开 TrueNAS 管理面板 

## 创建 Pool

选择 Storage => Pool 创建 Pool

::: tip Pool 是必须的
如果没有 Pool 则无法指定 smb，nfs 等文件共享位置
:::
其
## 设置 windows/linux/macOS/WebDAV 文件分享

选择 Sharing => 选择需要开通的文件分享协议，选择 Add

## 配置科学上网用作局域网内设备统一代理

TrueNAS 无法对系统直接安装包，可以通过TrueNAS 提供的 [Jails](https://truenas.com/docs/tags/jails/) 来管理包

::: tip Jail 简介
一个 Jail 是一个最小化的 FreeBSD 子系统，且相互独立，但使用的都是宿主机的内核，因此与虚拟机相比会占用更少的资源   
你可以阅读 [Jails 介绍](https://www.truenas.com/docs/core/coretutorials/jailspluginsvms/jails/creatingjails/)来获得更多信息
:::

* 创建 Jail
* 配置 Jail 端口映射，这里直接用 Clash 默认混合端口，7890 => 7890
* 启动 Jail
* 进入 Jail shell
* 使用 pkg 安装 clash，执行
```sh
pkg install net/clash
```
* 载入你的配置，配置文件位于 ~/.config/clash/config.yaml
* 启动 Clash 作为后台进程
```sh
nohup clash 2>&1 &
```
* 配置手机 Wifi 代理  
设置 Wifi 的代理为 TrueNAS 主机的 IP（我这里是 192.168.1.3）:7890 即可让手机连接 Wifi 时自动走代理
