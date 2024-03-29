---
title: Casual UI
description: 一个基于Vue3+, React17+, Svelte3+的组件库
date: 2022-04-01
author: Dongsheng Zhao
location: Beijing
cover: /logos/casual-ui-logo.png
tags:
  - Vue
  - React
  - Svelte
categories:
  - Front-end
---

> 为了进一步提升对Vue3、React17、Svelte3以及各自的新生态的运用，写了一个组件库，在这里做一下简单介绍

<!-- more -->

## Github地址

[Github仓库](https://github.com/Blackman99/casual-ui)

## Causal UI Vue

[在线文档&示例](https://vue.casual-ui.site)

### 安装

<Util-InstallPackage package-name="@casual-ui/vue" />

### 全局使用

#### 在项目的入口文件中

```js
import { createApp } from 'vue'
import CasualUI from '@casual-ui/vue'
import '@casual-ui/vue/dist/style.css'

const app = createApp()
app.use(CasualUI)
app.mount('#app')
```

#### 组件中直接使用

```vue
<script setup>
</script>
<template>
  <c-button label="按钮" />
</template>
```
### 按需使用

```vue
<script setup>
import { CButton } from '@casual-ui/vue'
</script>
<template>
  <c-button label="按钮" />
</template>
```

::: danger 注意
按需使用也需要导入样式
:::

## Casual UI React

[在线文档&示例](https://react.casual-ui.site)

### 安装依赖

<Util-InstallPackage package-name="@casual-ui/react" />

### jsx 中使用

```jsx
import React from 'react'
import '@casual-ui/react/dist/style.css'
import { CButton } from '@casual-ui/react'

function Demo() {

  return <CButton label="按钮" />
}
```

## Casual UI - Svelte

[在线文档&示例](https://svelte.casual-ui.site/)

### 安装依赖

<Util-InstallPackage package-name="@casual-ui/svelte" />

### svelte文件中使用

```html
<script>
  import { CButton } from '@casual-ui/svelte'
</script>
<CButton label="一个按钮" />
```

## 结语

该项目目前处于个人维护中，欢迎 PR & Issue

## 参考
