---
title: 被吹嘘过头的“虚拟 DOM”
description: 让我们终止“虚拟 DOM”很快这个虚假的神话
date: 2023-08-08
author: Dongsheng Zhao
location: Beijing
tags:
  - Virtual DOM
  - React
  - Vue
  - Svelte
categories:
  - Front-end
---

> 让我们终结“虚拟 DOM 很快”这个虚假的神话

<!-- more -->

这篇博文是 [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead) 的翻译

如果你在过去的几年中曾今使用过 Javascript 框架，你大概率会听说过“虚拟 DOM 很快”，通常用来描述比**真实 DOM** 更快。这是一个令人惊讶的口口相传的虚假真相——比如，人们往往会问及为何 Svelte 会如此之快，但是它没有用到虚拟 DOM。

是时候来一探究竟了。

## 什么是虚拟 DOM？

在许多框架中，你会需要基于渲染函数 `render()` 来构建应用，就像一个简单的 [React](https://react.dev/) 组件一样：

```jsx
function HelloMessage(props) {
  return <div className="greeting">Hello {props.name}</div>;
}
```  


* 你也可以不编写 JSX：

```js
function HelloMessage(props) {
  return React.createElement('div', { className: 'greeting' }, 'Hello ', props.name)
}
```

但是结果是一样的，一个用于表示当前页面看上去应该是什么样子的对象，这个对象就是虚拟 DOM。  
每一次你应用中的状态发生更改（比如：`name` 属性），将会创建一个新的对象。这个框架的工作就是去协调新旧对象，来得出那些更改是必要的然后将结果应用到真实 DOM 上。

## 这个虚假的神话是如何开始的？

关于虚拟 DOM 性能的误解可以追溯到 React 的诞生。在 [重新思考最佳实践](https://www.youtube.com/watch?v=x7cQ3mrcKaY) 中，在前 React 核心成员 Pete Hunt 2013 年的一次开创性的演讲中，我们了解到这样的事情：

:::tip 原句
这实际上很快，主要因为大多数 DOM 操作都比较慢。  
我们在 DOM 操作的性能上做了很多的工作，但是大多数 DOM 操作会倾向于失帧。
:::

![rethinking-best-practices](./rethinking-best-practices.jpg)
> 截图自 重新思考最佳实践 JSConfEU 2013

但是请等等！虚拟 DOM 是对最终在真实 DOM 操作上的补充。唯一能使得它更快的方法是与一个更低效的框架进行比较（在 2013 年这样的框架有很多！），或者与一个稻草人进行争辩——另一个选择是做一个没人真正做过的事情：

```js
onEveryStateChange(() => {
  document.body.innerHTML = renderMyApp()
})
```

Peter 在之后澄清：

:::tip 原句
React 不是魔法，就像你可以使用 C 进入汇编程序并击败 C 编译器一样，如果你愿意，你可以进入原始 DOM 调用原始 DOM API 来击败 React。  
就像使用 C，Java，Javascript 时可以获得数量级的性能提升，因为你可以不用考虑平台限制。  
使用 React 在构建应用时，你也可以不用考虑性能问题，因为默认状态已经很快了。
:::

...但这不是糟糕的部分。

## 所以，虚拟 DOM 慢吗？

不完全是这样，通常是它足够快，但有一些注意事项：

React 最原始的保证是你可以在不用担心性能的情况下，在每单个状态变更时重新渲染整个应用。在实践中，我认为这并不准确。如果它能做到的话，就不需要像 `shouldComponentUpdate`（一个来告知 React 是否可以安全的跳过一个组件更新的函数）这样的优化函数的出现了。

即使有了 `shouldComponentUpdate` 之后，更新整个应用的虚拟 DOM 也是一个巨量的工作。不久前，React 团队推出了一个叫做 React Fiber 的可以把一次更新拆成更小的更新的手段。这意味着（在其他的情况中）更新将不会长时间阻塞主线程，但是这并没有减少一次完整更新所用的时间损耗。

## 从何处来的吹嘘？

很明显，[diff 不是毫无开销的](https://twitter.com/pcwalton/status/1015694528857047040)。你必须先进行新旧虚拟 DOM 的快照对比，而后才能更新真实 DOM。以上面提到的 `HelloMessage` 举例，假设 `name` 属性从 `'world'` 变成了 `'everybody'`：

1. 新旧快照都只包含一个元素，且都是 div，这意味着我们可以保留同一个 DOM 元素
2. 我们遍历所有新旧 div 上的属性进行对比来判断是否需要更改，添加，或者删除。  
新旧快照都只包含一个 `className` 属性，并且值都为 `"greeting"`
3. 向下查看元素，我们发现文本内容变了，所以我们进行真实 DOM 的文本内容更新

这三个步骤中，只有第三步才是真正有价值的，就像实际场景中更新的情况一样，应用的大部分结构都是未更改的，如果我们直接进行第三步操作将会高效的多，就像这样：

```js
if (changed.name)
  text.data = name
```

（这几乎就是 Svelte 生成的更新代码。不像传统的 UI 框架，Svelte 是一个编译器，在编译时它就知道在你的应用中状态是如何变更的，而不是把工作留待运行时进行。）

## 不仅仅是 diff 

React 以及其他虚拟 DOM 框架所采用的 Diff 算法是很快。可以说，更大的吹嘘是组件自身。你不能编写这样的代码：

```jsx
function StrawManComponent(props) {
  const value = expensivelyCalculateValue(props.foo);
 
  return <p>the value is {value}</p>;
}
```

因为每次组件更新，都会导致 `value` 的重新计算，不论 `props.foo` 是否更改。

但是很常见的是以看似改良了的方式来进行不必要的计算与分配：

```jsx
function MoreRealisticComponent(props) {
  const [selected, setSelected] = useState(null);
 
  return (
    <div>
      <p>Selected {selected ? selected.name : 'nothing'}</p>
 
      <ul>
        {props.items.map((item) => (
          <li>
            <button onClick={() => setSelected(item)}>{item.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

在这里，每次状态变更时，不论 `items` 变了与否，都会生成一组虚拟的 li 元素，每个元素都具有行内的事件处理函数。除非你过于痴迷于性能，否则你将不会进行优化，因为将会毫无意义，速度足够快了。但是你知道怎样会更快吗？**不这样做**

默认做不必要的工作的危险在于，即使它很微小，你的应用将会最终饱受于千万个这样的微小工作的煎熬，而到了需要优化的时候将找不到对应的瓶颈在何处。

Svelte 设计的目的就是为了防止你进入这种局面。

:::tip 然而
[React Hooks](https://reactjs.org/docs/hooks-intro.html) 用 [predictable results](https://twitter.com/thekitze/status/1078582382201131008) 将这种默认不必要的工作翻倍了
:::

## 那为何框架都使用虚拟 DOM 呢？

明白虚拟 DOM **不是一个特性**是非常重要的。它是为了达到声明式的状态驱动的 UI 开发的一种手段。虚拟 DOM 是有价值的因为它能够让你能够在无需担心状态变更的情况下去构建一个**性能一般来说足够快**的应用。这意味着错误代码更少，将更多的时间花费在创造性任务上，而非重复性任务。

但是事实证明，我们也可以不采用虚拟 DOM 来达成类似的编程模型 —— 这就是 Svelte 的用武之地。