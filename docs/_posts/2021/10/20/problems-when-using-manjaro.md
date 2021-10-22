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

> 程序员的意义在于不断折腾  
> 最近将自己的3台电脑都安装了win11以及Manjaro双系统  
> 下面谈谈安装以及使用Manjaro时的遇到的一些问题，以及对应的解决方案
<!-- more -->

::: tip 提示
本文涉及所使用的Manjaro版本为`21.1.6`  
桌面使用的是gnome
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
* 安装Nord主题（如果需要的话）
```sh
git clone https://github.com/tonyfettes/fcitx5-nord.git
mkdir -p ~/.local/share/fcitx5/themes/
cd fcitx5-nord
cp -r Nord-Dark/ Nord-Light/ ~/.local/share/fcitx5/themes/
```
效果如下：  
![alt](/images/fcitx5-nord-theme.png)

注销重新登录即可
* 设置开机启动（如果需要的话）
```sh
cp /usr/share/applications/org.fcitx.Fcitx5.desktop ~/.config/autostart/
```

## 安装VScode（visual-studio-code-bin）

::: warning 警告
请安装微软官方版本（visual-studio-code-bin）而不是开源版（code），**开源版的问题非常多！**
:::

```sh
sudo pacman -S visual-studio-code-bin
```

### VSCode终端图标乱码问题

* 打开terminal
* 在terminal里右键选择配置文件首选项
* 将自定义字体那一栏里的字体名称记下
* 打开VScode设置，找到Editor Font Size
* 将刚刚记下的字体名称放置于最后一个: `...其他, "你的终端字体"`，比如下面是我的配置

![](/images/vscode-font-set.png)

附一张完成后vscode的terminal的截图

![](/images/vscode-terminal.png)

## 安装截图工具（flameshot）

* 安装
```sh
sudo pacman -S flameshot
```
* 设置全局快捷键（如果需要的话）  
设置 `=>` keyboard `=>` Customize Shortcuts `=>` 自定义快捷键 `=>` 点击+ `=>`  
命令那一栏填写: `flameshot gui`，即可使用自定义的快捷键快速启动截图  
下面是我自定义的全局快捷键`Ctrl` + `Alt` + `A`

![](/images/custom-flameshot-shortcut.png)

## 安装录屏工具（peek）

打开软件管理器，搜索peek安装或者执行`sudo pacman -S peek`

下面附上一张用peek录制的使用全局快捷键打开flameshot的gif
![alt](/images/peek-flameshot.gif)

## 安装QQ

这里我直接用了VScode QQ作为解决方案

## 安装微信

我这里使用的是魔改版`wechat-uos`
```sh
yay -S wechat-uos
```


## 安装钉钉

```sh
yay -S dingtalk
```

::: tip 请安装`dingtalk-bin`而非`dingtalk`  
`dingtalk`是基于`electron`开发的web套壳版，功能不全  
而`dingtalk-bin`为官方linux版，功能较为完善
:::

::: warning 个人体验官方版目前依旧存在一些问题
* 工作台内的应用无法输入中文
* 查找聊天记录功能无法输入中文
* 不支持dark mode

请确保了解后果
:::

## 安装node环境

* 安装`nvm`
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
* 安装`node`
```sh
nvm install 14.17.1
```
安装完毕后会自动默认使用该版本
* 安装`yarn`
```sh
npm install -g yarn
```

::: tip 选择自己的Node版本
本人使用的node版本为`14.17.1`，请读者选择自己需要的node版本进行安装
:::

## 结语

因为本人在安装使用Manjaro时从事的是前端开发工作，上述的几个步骤完成之后基本可以满足日常开发需求  

## 参考

* [WeChat (简体中文) - ArchWiki](https://wiki.archlinux.org/title/WeChat_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [Fcitx5 - ArchWiki](https://wiki.archlinux.org/title/Fcitx5)
* [AUR (en) - dingtalk-bin](https://aur.archlinux.org/packages/dingtalk-bin/)
* [nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm#installing-and-updating)
* [QQ - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=takayama.vscode-qq)