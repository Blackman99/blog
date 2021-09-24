---
title: 下一代前端样式开发工具库——Tailwindcss
description: 开发业务页面时的利器
date: 2021-09-24
author: Zion Dotson
location: Beijing
tags:
  - Tailwindcss
  - CSS
categories:
  - Front-end
---

> 你是否还在因为业务页面频繁变化而烦恼，使用Tailwindcss开发也许能帮助你解决问题

<!-- more -->

## 背景

在前端开发过程中，是否总是会不断遇到这样的情景：

* 编写一些“最佳实践”的语义化CSS的`class`名，而且实际上这些类名在整个应用中可能只会出现一次
* 应用中充斥着各种各样的**颜色**或者**单位**硬编码
* 维护CSS代码非常困难，因为CSS往往与DOM分离
* 不断编写一些重复的css属性，如：`display: flex;` `position: absolute;`等
* 重复性的在`media query`里编写`width` `min-width`等

如果你也有这些困惑，我相信Tailwind能很好的解决你的问题

## Tailwindcss简介

### 官方介绍

快速构建现代网页，甚至不用离开DOM编写HTML

### 一些用户的使用感受

::: tip <q-avatar><img src="https://tailwindcss.com/_next/static/media/ryan-florence.34fb7796afb30db4ae598b06a00cbee3.jpg"></q-avatar> Guillermo Rauch (Remix & React Training)
I feel like an idiot for not using Tailwind CSS until now.
::: 

::: tip <q-avatar><img src="https://tailwindcss.com/_next/static/media/guillermo-rauch.f9555769f9ff1d42057c689278bc0876.jpg"></q-avatar> Guillermo Rauch (Vercel)
If I had to recommend a way of getting into programming today, it would be HTML + CSS with Tailwind CSS.
::: 


::: tip <q-avatar><img src="https://tailwindcss.com/_next/static/media/sara-vieira.53f08a9bc2787e4ee05e4678577a05fe.jpg"></q-avatar> Sara Vieira (CodeSandbox)
I have no design skills and with Tailwind I can actually make good looking websites with ease and it's everything I ever wanted in a CSS framework.
::: 

可以看到使用者对于它的评价相当高

## 示例

<iframe class="tailwind-example" src="https://play.tailwindcss.com/3RGufINrei">
</iframe>

## 个人体验

* Tailwind很好的解决了我在前面提到的一些问题，当然，Tailwind的优势不止于此，你可以探索[TailWindcss官方文档](https://tailwindcss.com/)来决定它是否能满足你的应用场景
* 如果你的应用场景是编写一些业务页面，定制化的细粒程度并不是非常高，那么Tailwind绝对是你的开发利器
* 但是如果你的需求是编写基础组件，如输入框，下拉框，或者对于设计、交互细节要求非常之高的场景，Tailwindcss也许并不能很好的帮助到你

## 参考

* [Tailwindcss](https://tailwindcss.com/)

<style scoped>
.tailwind-example {
  width: 100%;
  height: 800px;
  border: none;
  outline: none;
}
</style>