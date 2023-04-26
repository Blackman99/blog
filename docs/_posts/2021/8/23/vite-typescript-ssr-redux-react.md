---
title: Vite + typescript + redux + react + Hooks + SSR的使用
description: Vite + typescript + redux + react + Hooks + SSR的使用
date: 2021-08-23
author: Dongsheng Zhao
location: Beijing
tags:
  - React
  - Redux
  - Typescript
  - SSR
categories:
  - Front-end
---

在Vite项目中，基于`vite-plugin-ssr`，使用`Typescript`, `SSR`, `Redux`进行整合

<!-- more -->

::: tip 兼容性注意
Vite 需要 Node.js 版本 >= 12.0.0
:::

## 创建基于`vite-plugin-ssr`的项目

* `npm init vite-plugin-ssr@latest`
* 选择`react-ts`即可

## 引入`Redux`

### 安装依赖

```sh
npm install --save @reduxjs/toolkit react-redux redux
```

### 创建store文件夹，并添加`index.ts`与`todo.ts`，内容如下：

<Util-CodeTab
  key-prefix="store"
  :code-types="['todo.ts', 'index.ts']"
  default-active-code-type="todo.ts"
/>

::: slot store-todo.ts
```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoItem, TodoList } from '@components/Todo'

export const initialState: TodoList = [{
  label: 'Event1',
  date: '2021-07-01'
}]

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoItem>) => [
      ...state,
      action.payload
    ],
    del: (state, action: PayloadAction<number>) => ([
      ...state.slice(0, action.payload),
      ...state.slice(action.payload + 1)
    ])
  }
})

export const { add, del } = todoSlice.actions

export default todoSlice.reducer
```
:::

::: slot store-index.ts
```ts
import { createStore, combineReducers } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import todo from './todo'

export const createAppStore = () => createStore(combineReducers({
  todo
}))

const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
```
:::

这里主要是创建一个包含`todo`模块的store状态

### 更改`pages/_default/_default.page.server.ts`与`pages/_default/_default.page.ts`

<Util-CodeTab
  key-prefix="page"
  :code-types="['_default.page.server.ts', '_default.page.client.ts', 'types.ts']"
  default-active-code-type="_default.page.server.ts"
/>

::: slot page-_default.page.server.ts
```ts
import { renderToString } from 'react-dom/server'
import React from 'react'
import { PageLayout } from './PageLayout'
import { html } from 'vite-plugin-ssr'
import { PageContext } from './types'
import logoUrl from './logo.svg'
import { Provider } from 'react-redux'
import { createAppStore } from '@store'

const passToClient = ['pageProps']

function render(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  const store = createAppStore()

  const pageHtml = renderToString(
    <Provider store={store}>
      <PageLayout>
        <Page {...pageProps} />
      </PageLayout>
    </Provider>
  )

  const { documentProps } = pageContext
  const title = documentProps?.title || 'Vite SSR app'
  const desc = documentProps?.description || 'App using Vite + vite-plugin-ssr'

  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <link href="/basscss.min.css" rel="stylesheet">
      </head>
      <body>
        <div id="page-view">${html.dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`
}

export { render, passToClient }
```
:::

::: slot page-_default.page.client.ts
```ts
import ReactDOM from 'react-dom'
import React from 'react'
import { getPage } from 'vite-plugin-ssr/client'
import { Provider } from 'react-redux'
import { createAppStore } from '@store'

hydrate()

async function hydrate() {
  const pageContext = await getPage()
  const { Page, pageProps } = pageContext

  ReactDOM.hydrate(
    <Provider store={createAppStore()}>
      <Page {...pageProps} />
    </Provider>
    ,
    document.getElementById('page-view')
  )
}
```
:::

::: slot page-types.ts
```ts
export type ReactComponent = (pageProps: PageProps) => JSX.Element;
export interface PageProps {
  [propName: string]: any;
}
export interface PageContext {
  Page: ReactComponent;
  pageProps: PageProps;
  documentProps?: {
    title?: string;
    description?: string;
  };
  url: string;
  pageHtml: string;
}
```
:::

## 在某个组件中使用

<Util-CodeTab
  key-prefix="usage"
  :code-types="['todo.ts']"
  default-active-code-type="todo.ts"
/>

::: slot usage-todo.ts
```ts
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store'
import { add, del } from '@store/todo'

interface TodoItem {
  label: string;
  date: string;
}

type TodoList = TodoItem[];

const Todo = () => {
  const [item, setItem] = useState<TodoItem>({
    label: '',
    date: ''
  })
  const todoList = useAppSelector(state => state.todo)
  const dispatch = useAppDispatch()
  const addTodoItem = () => {
    dispatch(add(item))
  }
  const removeItem = (idx: number) => {
    dispatch(del(idx))
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
            <button onClick={() => removeItem(i)}>
              remove
            </button>
          </li>
        )}
      </ul>
      <input
        type="text"
        placeholder="Label"
        value={item.label}
        onChange={value => itemChange('label', value)}
      />
      <input
        type="date"
        value={item.date}
        onChange={e => itemChange('date', e.target.value)}
      />
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

## 参考

* [Vite官方文档](https://cn.vitejs.dev/)
* [vite-plugin-ssr官方文档](https://vite-plugin-ssr.com/)
* [Redux + Typescript官网指引](https://react-redux.js.org/tutorials/typescript-quick-start)
* [Redux Toolkit createSlice 官方示例](https://redux-toolkit.js.org/api/createSlice#examples)