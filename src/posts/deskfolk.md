---
title: "个人开发的 Grok Bot + Claude/Codex  替代选项"
date: 2026-11-05
author: "Dongsheng Zhao"
cover: /covers/deskfolk.jpg
category: project
tags:
  - Deskfolk
  - AI
  - Claude
  - Codex
---
![](/posts/deskfolk-cover.jpg)

目前的 AI 工具，我总是会遇到这些问题，这里举几个例子：

* Grok Bot 额度不透明，模型路由黑盒，且你的其他 AI 订阅完全没法接入
* Claude 模型很强，但封号完全不可控，且几乎无法申诉
* Codex 降智几乎天天在发生，且不断轮回折磨用户

真正的核心是：\
不让自己的项目跟任何的 AI 平台绑定，不被任何 AI 平台牵制，不论明天哪个 AI 平台砍额度了，或者降智了，涨价了等等，你都有完全的自主权切换并且不影响你正在进行的任何事情，且能同时获得类似 Grok Bot 以及其他 Agent GUI  的体验

为了解决这些问题，我做了 Deskfolk：[https://github.com/Blackman99/deskfolk](https://github.com/Blackman99/deskfolk)

* 既支持 Grok Bot 的 Bot 式对话，也支持 Codex/Claude 的项目式对话
* 不绑定任何平台，完全由你自己定义什么 Bot  用什么模型，模型路由完全可控，用你自己的订阅或者自定义的 API 端点，或者任何三方端点
* 支持多个本地 Claude 订阅切换使用
* 支持 Claude/Codex 对话导入
* 手机远程控制（基于 PWA，无需安装 APP，但要有自己的中继服务器），完整的控制能力，与桌面端完全一致
* 用量/花费 面板，所有花销均透明
* 桌面端任意分屏的对话体验
* 产物跟对话处在应用内，编辑文件，文档预览，图片预览，视频预览，office 文件预览等都处在应用内不用切换应用查看对话产物

> 本文首发于 [X](https://x.com/DotsonZion/status/2118174606360199653)
