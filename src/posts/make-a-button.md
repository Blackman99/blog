---
title: 制作一个游戏风格按钮
date: 2021-08-16
excerpt: 制作一个游戏风格按钮
author: "Dongsheng Zhao"
cover: /covers/make-a-button.jpg
category: Front-end
tags:
  - CSS
  - HTML
---
> 如何制作一个游戏风格按钮

## 效果与代码

```svelte live title="GameButton.svelte"
<div class="game-button">
  一个游戏风格的按钮
</div>

<style>
  .game-button {
    --btn-shadow-width: 5px;
    --shadow: #0099c0;
    border-radius: 30px;
    padding: 12px 20px;
    user-select: none;
    line-height: 1;
    cursor: pointer;
    position: relative;
    outline: none;
    border: none;
    display: inline-block;
    font-weight: bold;
    background-color: unset;
    transform: translateY(-2.5px);
    box-shadow: 0px var(--btn-shadow-width) 0px var(--shadow);
    color: #fff;
    background-color: #00bbec;
    &:hover {
      transform: translateY(0);
      box-shadow: 0px 0px 0px var(--shadow);
    }
    &:active {
      background-color: #0099c0;
      box-shadow: inset 0px 5px 0px #0086a9;
      transform: translateY(2.5px);
      color: #fff;
    }
  }
</style>
```
