---
title: 美化windows11的终端
description: 美化windows11的终端
date: 2021-11-01
author: Zion Dotson
location: Beijing
tags:
  - Windows
categories:
  - Skills
---

> 微软开源社区的几大项目都做得非常好，windows-terminal也是其中之一，今天来记录下美化windows terminal的过程

<!-- more -->

## Windows Terminal

Windows11默认安装Windows Terminal，如果是Windows10需要去Store里搜索安装

## 安装并使用Oh My Posh

`Oh My Posh`是一个可以让你自定义终端样式的工具，并且包含多种主题样式供选择

### 安装

* 以管理员身份运行`Windows Terminal`
* 输入`get-executionpolicy`，如果得到的输出是：`restricted`，则需要输入：`set-executionpolicy remotesigned`
* 安装并导入`Oh My Posh`主题样式
```sh
Install-Module oh-my-posh -Scope CurrentUser
Import-Module oh-my-posh
```
* 安装并查看所有主题
```sh
Get-PoshThemes
Get-PoshThemes -list
```
* 使用某个主题
```sh
Set-PoshPrompt -Theme [你想使用的主题名称]
```

## 设置每次打开终端自动加载主题

* 查看终端配置文件
```sh
$PROFILE
```
* 编辑上面的文件（如果没有则创建），输入以下内容
```sh
Import-Module oh-my-posh
Set-PoshPrompt -Theme [你想使用的主题名称]
```

## 设置终端亚克力效果，背景图片等（如果需要的话）

* 打开`Windows Terminal`
* 点击设置
* 点击左侧Windows PowerShell
* 点击外观
* 向下滑动就能看到亚克力效果跟背景图片设置项

## 效果

![效果](/images/438F10B1-F7E6-404a-AA6D-46D218E017D3.png)


## 参考

* [PowerShell | Oh My Posh](https://ohmyposh.dev/docs/pwsh)
* []