---
title: Atomique
description: 一个可用于 React18+ 的原子化状态管理模型，芥子纳须弥
date: 2023-12-05
author: Dongsheng Zhao
location: Beijing
tags:
  - React
categories:
  - Front-end
---

> 一个可用于 React18+ 的原子化状态管理模型，芥子纳须弥

<!-- more -->

## Github

[Atomique](https://github.com/Blackman99/atomique)

## 安装

```sh
# via npm
npm i --save atomique

# via yarn
yarn add atomique

# via pnpm
pnpm i atomique
```

## 使用 

<Util-CodeTab
  key-prefix="usage"
  :code-types="['App.jsx', 'use-count.js', 'display-count.jsx', 'add-count.jsx']"
  default-active-code-type="App.jsx"
/>

::: slot usage-App.jsx
```jsx
import DisplayCount from './display-count'
import AddCount from './add-count'

export default function App() {
  return <div>
    <DisplayCount />
    <AddCount />
  </div>
}
```
:::

:::: slot usage-use-count.js
```jsx
import atomique from 'atomique'

export const { useAtom: useCount, update } = atomique(0)
```

::: tip 提示
`atomique` 可以接受任何数据类型，如数组，对象等，该函数是基于 [`useSyncExternalStore `](https://react.dev/reference/react/useSyncExternalStore) 的轻量级封装 
:::
::::



::: slot usage-display-count.jsx
```jsx
import { useCount } from './use-count'

export default function DisplayCount() {
  const [count] = useCount()

  return <h3>Count is: {count}</h3>
}
```
:::

::: slot usage-add-count.jsx
```jsx
import { useCount } from './use-count'

export default function AddCount() {
  const [, setCount] = useCount()

  return <button onClick={() => setCount(c => c + 1)}>+</button>
}

```
:::

![Result](./magasin-count.gif)

