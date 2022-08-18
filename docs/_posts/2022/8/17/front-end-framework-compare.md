---
title: Svelte, Vue, React生态小结
description: Svelte, Vue, React生态小结
date: 2022-08-17
author: Zion Dotson
location: Beijing
tags:
  - Vue
  - React
  - Svelte
categories:
  - Front-end
---

> 在开发[Casual UI](https://github.com/Blackman99/casual-ui)的过程中，对 Vue3, React17, Svelte3 各自的生态有了一定程度的了解，这里进行一些总结

<!-- more -->

## 框架特性

| 细化         | Vue3                                                                                                            | React17  | Svelte3              |
| ------------ | --------------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| 语法         | 模板语法（SFC） & JSX（借助插件）                                                                               | JSX      | Script + 类 JSX 模板 |
| 响应式 API   | 独立&模板耦合                                                                                                   | JSX 耦合 | 模板耦合             |
| 依赖追踪     | 自动                                                                                                            | 手动     | 半自动               |
| 运行时       | 有                                                                                                              | 有       | 无                   |
| 编译时       | 有（如：[Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html#reactivity-transform)） | 无       | 有                   |
| 数据流       | 可双向                                                                                                          | 单向     | 可双向               |
| Scoped Style | 支持                                                                                                            | 不支持   | 支持                 |

## 创建项目(Starter)

- Vue：[create-vue](https://github.com/vuejs/create-vue)，[init vite](https://vitejs.dev/guide/#getting-started)，[vite-plugin-ssr](https://vite-plugin-ssr.com/scaffold)，[create-nuxt-app](https://nuxtjs.org/docs/get-started/installation#using-create-nuxt-app)
- React：[create-react-app](https://create-react-app.dev/)，[init vite](https://vitejs.dev/guide/#getting-started)，[create-nextjs-app](https://nextjs.org/learn/basics/create-nextjs-app/setup)，[create-remix](https://remix.run/docs/en/v1/tutorials/blog)
- Svelte：[sveltekit](https://kit.svelte.dev/)，[init vite](https://vitejs.dev/guide/#getting-started)

其中：

- vite-plugin-ssr，create-nuxt-app，create-nextjs-app，create-remix，sveltekit 都为 SSR 框架
- init vite 为基于 vite 的生态，可以创建多种基于多种不同 web 框架的项目

## 路由

- Vue：[Vue Router](https://router.vuejs.org/zh/)
- React：[react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
- Svelte：[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)，[svelte-routing](https://github.com/EmilTholin/svelte-routing)

其中，Vue Router 为官方库

## 状态管理

- Vue：[Vuex](https://vuex.vuejs.org/)，[Pinia](https://pinia.vuejs.org/)
- React：[Redux](https://redux.js.org/)，[Mobx](https://mobx.js.org/README.html)，[Recoil](https://recoiljs.org/)，[Jotai](https://jotai.org/)，[Rematch](https://rematchjs.org/)，[Zustand](https://github.com/pmndrs/zustand)
- Svelte：[svelte/store](https://svelte.dev/docs#run-time-svelte-store)

其中：Pinia，Vuex 为官方库，svelte/store 为官方内置支持

## 服务端渲染（SSR）

- Vue：[vite-plugin-ssr](https://vite-plugin-ssr.com/scaffold)，[quasar](https://quasar.dev/security/dos-and-donts#ssr)，[nuxt](https://nuxtjs.org/)
- React：[nextjs](https://nextjs.org/)，[remix](https://remix.run/)
- Svelte：[sveltekit](https://kit.svelte.dev/)

## 文档/静态站点工具

- Vue: [Vuepress](https://vuepress.vuejs.org/)，[Vitepress](https://vitepress.vuejs.org/)，[Storybook](https://storybook.js.org/)
- React: [Docusaurus](https://docusaurus.io/)，[Gatsby](https://www.gatsbyjs.com/docs)，[Storybook](https://storybook.js.org/)
- Svelte：[Svelte Docs](https://github.com/alexxnb/svelte-docs)，[Sveltekit](https://kit.svelte.dev/)，[Storybook](https://storybook.js.org/)

## UI 组件库

- Vue：[Element Plus](https://element-plus.gitee.io/)，[Ant Design Vue](https://www.antdv.com/components/overview)，[Quasar](https://quasar.dev/)，[Vant](https://vant-ui.github.io/vant/v4/#/zh-CN)
- React: [Ant Design](https://ant.design/index-cn)，[MUI](https://mui.com/zh/)
- Svelte: [Svelte Material UI](https://sveltematerialui.com/)

## 总结

可以看到

- React 在社区贡献上的积累非常丰富，每个工具方向都有很多选择可以尝试
- Vue 官方几乎给出了一整套你有可能会用到的库以及工具链，并且 UI 库特别丰富
- Svelte 社区生态还不够完善，但是官方工具 Sveltekit 单页应用、预渲染、服务端渲染都能胜任

除此之外，有一些能够兼容三个框架的工具以及类库，像：[Vite](https://vitejs.dev/)、[Storybook](https://storybook.js.org/)

希望这篇总结可以对新项目的技术栈选型起到一些帮助
