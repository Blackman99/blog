---
title: Atomique
date: 2023-12-05
excerpt: "一个可用于 React18+ 的原子化状态管理模型，芥子纳须弥"
author: "Dongsheng Zhao"
category: project
tags:
  - React
---
> 一个可用于 React18+ 的原子化状态管理模型，芥子纳须弥

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

::::code-tabs{active="App.jsx"}
### App.jsx

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

### use-count.js

```jsx
import atomique from 'atomique'

export const { useAtom: useCount, update } = atomique(0)
```

> **提示**
>
> `atomique` 可以接受任何数据类型，如数组，对象等，该函数是基于 [`useSyncExternalStore `](https://react.dev/reference/react/useSyncExternalStore) 的轻量级封装 

### display-count.jsx

```jsx
import { useCount } from './use-count'

export default function DisplayCount() {
  const [count] = useCount()

  return <h3>Count is: {count}</h3>
}
```

### add-count.jsx

```jsx
import { useCount } from './use-count'

export default function AddCount() {
  const [, setCount] = useCount()

  return <button onClick={() => setCount(c => c + 1)}>+</button>
}

```
::::

![Result](/posts/magasin-count.gif)
