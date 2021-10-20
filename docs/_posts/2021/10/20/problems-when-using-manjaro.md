---
title: 使用Manjaro系统遇到的一些问题以及解决方案
description: Problems when using Manjaro
date: 2021-10-20
author: Zion Dotson
location: Beijing
tags:
  - Manjaro
categories:
  - Operating System
  - Skills
  - Expand Learning
---

> 程序员的意义在于不断折腾，最近将自己的两台笔记本都安装了win11以及Manjaro双系统，下面谈谈安装以及使用Manjaro时的遇到的一些问题，以及对应的解决方案
<!-- more -->

::: tip 提示
本文涉及所使用的Manjaro版本为`21.1.6`
:::

## 安装Chrome

```sh
sudo pacman -S --needed base-devel yay git
yay -S google-chrome
```

## 安装中文输入法（Fctix5）

* 安装依赖
```sh
sudo pacman -S fcitx5 fcitx5-chinese-addons fcitx5-qt fcitx5-gtk 
```
* 创建`~/.pam_environment`文件
* 将如下内容写入`~/.pam_environment`
```sh
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=@im=fcitx
INPUT_METHOD  DEFAULT=fcitx
SDL_IM_MODULE DEFAULT=fcitx
```
* 设置开机启动（如果需要的话）
```sh
cp /usr/share/applications/org.fcitx.Fcitx5.desktop ~/.config/autostart/
```

## 安装VScode（visual-studio-code-bin）

::: tip 提示
请安装微软官方版本（visual-studio-code-bin）而不是开源版（code），**开源版的问题非常多！**
:::

```sh
sudo pacman -S visual-studio-code-bin
```

### VSCode终端图标乱码问题

* 打开terminal
* 在terminal里右键选择配置文件首选项
* 在自定义字体那一栏里的字体名称记下
* 打开VScode设置，找到Editor Font Size
* 将记下的字体放置于第一个: `"你的终端字体", ...其他`，比如下面是我的配置

![](/images/vscode-font-set.png)

附一张完成后vscode的terminal的截图

![](/images/vscode-terminal.png)

## 安装截图工具（flameshot）

* 安装
```sh
sudo pacman -S flameshot
```
* 设置全局快捷键（如果需要的话）
设置 => keyboard => Customize Shortcuts => 自定义快捷键 => + => 
命令那一栏填写: `flameshot gui`，即可使用自定义的快捷键快速启动截图

## 安装录屏工具（peek）

```
// TODO
```

## 安装钉钉

```
// TODO
```
## 设置快捷键

```
// TODO
```

## 参考
```
// TODO
```