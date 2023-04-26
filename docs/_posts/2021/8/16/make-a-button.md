---
title: 制作一个游戏风格按钮
description: 制作一个游戏风格按钮
date: 2021-08-16
author: Dongsheng Zhao
location: Beijing
tags:
  - CSS
  - HTML
categories:
  - Front-end
---

> 如何制作一个游戏风格按钮

<!-- more -->

## 效果

<GameButton />

## 代码

<Util-CodeTab
  key-prefix="Button"
  :code-types="['GameButton.vue']"
  default-active-code-type="GameButton.vue"
/>

::: slot Button-GameButton.vue
<<< @/docs/.vuepress/demo-components/Button/GameButton.vue
:::

<script>
import GameButton from '@vp/demo-components/Button/GameButton.vue'

export default {
  components: {
    GameButton
  }
}
</script>