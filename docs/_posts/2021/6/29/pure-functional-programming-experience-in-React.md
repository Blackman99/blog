---
title: 在 React 中获得纯粹的函数式编程体验
author: Zion Dotson
location: Beijing
tags:
  - React
  - Typescript
  - Functional Programming
categories:
  - Front-end
date: 2021-07-01
---

> 使用 React Hooks 以及 Typescript，采用函数式编程风格编写组件

<!-- more -->

## 代码

<Util-CodeTab
  key-prefix="todo"
  :code-types="['children', 'parent']"
  default-active-code-type="children"
/>

::: slot todo-children
```tsx
import React, { useState } from 'react'

interface TodoItem {
  label: string;
  date: string;
}

type TodoList = TodoItem[];

interface TodoPropType {
  todoList: TodoList;
  onTodoListChange: (newTodoList: TodoList) => void;
}

const Todo: React.FC<TodoPropType> = ({ todoList, onTodoListChange }) => {
  const [item, setItem] = useState<TodoItem>({
    label: '',
    date: ''
  })
  const addTodoItem = () => {
    const newTodoList = [...todoList, item]
    onTodoListChange(newTodoList)
  }
  const removeItem = (idx: number) => {
    onTodoListChange([...todoList.slice(0, idx), ...todoList.slice(idx + 1)])
  }
  const itemChange = (prop: keyof TodoItem, value: string) => {
    setItem({
      ...item,
      [prop]: value
    })
  }
  return (
    <>
      <ul>
        {todoList.map(({ label, date }, i) =>
          <li key={i}>
            <strong>
              Label:&nbsp;
            </strong>
            {label} &nbsp;
            <strong>
              Date:&nbsp;
            </strong>
            { date }
            <button onClick={() => removeItem(i)}> - </button>
          </li>
        )}
      </ul>
      <input type="text" value={item.label} onChange={e => itemChange('label', e.target.value)} />
      <input type="date" value={item.date} onChange={e => itemChange('date', e.target.value)} />
      <button onClick={() => addTodoItem()}> + </button>
    </>
  )
}

export {
  Todo,
  TodoItem,
  TodoList
}
```
:::

::: slot todo-parent
```tsx
import React, { useState } from 'react'
import { Todo, TodoList } from './_components/Todo'

const Parent = () => {
  const [todoList, setTodoList] = useState<TodoList>([{
    label: 'Event1',
    date: '2021-07-01'
  }])

  return (
    <>
      <h1>Welcome</h1>
      <Todo todoList={todoList} onTodoListChange={setTodoList} />
    </>
  )
}

export { Parent }
```
:::
