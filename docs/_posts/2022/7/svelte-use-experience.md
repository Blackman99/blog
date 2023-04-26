---
title: Svelte使用分析
description: Svelte使用分析
date: 2022-07-01
author: Dongsheng Zhao
location: Beijing
tags:
  - Svelte
  - Vue
  - React
categories:
  - Front-end
cover: /logos/svelte.svg
---

> 在实际的两个项目中尝试了 Svelte3 之后，写下一些体验总结，以及使用分析

<!-- more -->

Svelte 的设计可以用四个字来简单概括：**简洁至上**

### 易上手

与原生 HTML，CSS，JS 结构类似，在仅有这三项基础的情况下，不需要学习太多额外的东西即可上手  
可能随着应用复杂度的提升，需要学习 Svelte 的一些 API 用法

### 无虚拟 DOM

Vue，React 都是基于虚拟 DOM 的，对比没有虚拟 DOM 带来的好处如下：

- 无运行时依赖，初始包大小可以认为是 0
- 无 diff 算法带来的性能开销，性能瓶颈取决于浏览器原生 API

### 内置简单易用的状态管理

下面分别用 Redux，Vuex，Svelte 编写一个 count 逻辑

<Util-CodeTab
  key-prefix="demo"
  :code-types="['Redux', 'Vuex', 'Svelte']"
  default-active-code-type="Redux"
/>

::: slot demo-Redux

```jsx
import { createStore } from 'redux'

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

let store = createStore(counterReducer)

store.subscribe(() => console.log(store.getState()))
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/decremented' })
```

:::

::: slot demo-Vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement() {
      state.count--
    },
  },
})

store.subscribe((mutation, state) => {
  console.log(state)
})

store.commit('increment')
store.commit('increment')
store.commit('decrement')
```

:::

::: slot demo-Svelte

```js
import { get, writable } from 'svelte/store'

const count = writable(0)

count.subscribe(value => console.log(value))

count.set(get(count) + 1)
count.set(get(count) + 1)
count.set(get(count) - 1)
```

:::

### 量化分析

上面提到无虚拟 DOM 带来的好处，但是，无虚拟 DOM 也会带来其他问题，比如随着页面复杂度提升，组件数量提升，会有很多重复的编译后代码  
如果页面实现足够复杂，这些重复的代码量可能就会超越像 React 或者 Vue 的 Runtime 依赖包的大小了

参考[Svelte Scaling](https://svelte-scaling.acmion.com/#home)上的分析，该分析使用的是 React 作为对标，可以看到：

- React 因为具有运行时依赖，初始包大小达到 133KB（gzip 之后 42KB）,而 Svelte 的初始包大小近似为 0
- 而两条线交点产生在 266KB 左右（gzip 之后 137KB 左右）

也就是说我们大概可以得到这样的结论：
如果一个应用的大小（gzip 之后）低于 137KB，那么使用 Svelte 打包后的大小会低于 React

那么 137KB 是否足够一个应用使用呢，在 Svelte Scaling 的分析中，衡量了几个实际站点：

- [React News](https://github.com/echenley/react-news): 24.4 KB
- [SoundRedux](https://github.com/andrewngu/sound-redux): 87.5 KB
- [Isomorphic "Quiz Wall" for itsquiz.com](https://github.com/WebbyLab/itsquiz-wall): 145 KB
- [Redux TodoMVC Example](https://github.com/reduxjs/redux/tree/master/examples/todomvc): 23.8 KB
- [Calypso](https://github.com/Automattic/wp-calypso): 3.82 MB
- [sveltestrap](https://github.com/bestguy/sveltestrap): 73.7 KB
- [Svelma](https://github.com/c0bra/svelma): 84.6 KB
- [carbon-components-svelte](https://github.com/IBM/carbon-components-svelte): 418 KB

可以看到 137KB 已经在大多数场合适用

但是，这里讨论的是整个应用的包大小，对于单页应用（SPA）来说，配合代码分割按需加载以及浏览器模块系统，对于一个给定的页面，几乎不太可能达到 130KB

### 总结

Svelte 的优点上面只提到了一些核心，实际上从最常用的组件传值、双向绑定、事件、组件上下文、过渡、动画、动态样式...等等，Svelte 都做到了尽可能的简化

我个人觉得 Svelte 目前只有一个缺点：  
生态相较于 Vue、React 等其他框架来说比较不完善，组件库、工具库、SSR 可能需要自主实现  
不过这一点随着时间的推移可能会越来越不明显

当然也不是说无脑鼓吹 Svelte，我现在还是针对不同的项目会使用不同的框架

- 当需求是编写一个类后台系统时，可能用 Vue 比较好，目前有成熟的诸如：
  - [Element Admin](https://panjiachen.github.io/vue-element-admin-site/zh/)
  - [Vben Admin](https://vvbin.cn/doc-next/)
- 而当需要编写一个移动端 HyBrid 应用时，特别是用作展示或者涉及到一些简单的交互需要**自主实现**时，我则会选 Svelte

### 参考

- [Svelte Scaling](https://svelte-scaling.acmion.com/#home)
- [Svelte3](https://svelte.dev/)
