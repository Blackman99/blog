---
title: 前端工程中的自动化导入
description: 学会使用前端工程中的自动化导入
date: 2021-08-18
author: Dongsheng Zhao
location: Beijing
tags:
  - Automation
categories:
  - Front-end
---

> 在前端项目开发过程中，在很多地方都会遇到需要导入某一个文件夹下的某些文件，而且通常最后组织的方式跟文件的目录结构一致，在这种时候，也许我们就需要使用
<Badge vertical="middle" text="自动化导入" />

<!-- more -->

## 场景描述

* 假设现有如下的Vue项目结构
<q-tree default-expand-all :nodes="fileConstructure" node-key="label" />
* 现在需要将这些Vue文件注册为路由，并且路由路径与文件路径一致
* 例如：`/src/views/user/profile/basic.vue`应当注册为`/user/profile/basic`
* 如果使用最基础的方式，就得一个个的导入，下面是手动导入的示例
<Util-CodeTab
  key-prefix="manual-import"
  :code-types="['手动导入']"
  default-active-code-type="手动导入"
/>
::: slot manual-import-手动导入
```js
const routes = [
  {
    path: '/user/profile/basic',
    component: () => import('@/views/user/profile/basic.vue')
  },
  // ...其他的路由
]
```
:::

::: tip 提示
这里假设已将`@/**/*`路径指向了`src/**/*`  
下文中的示例代码假设都与`src`位于同一个层级
:::

## Webpack中的自动化导入

### `require.context`介绍

```js
require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync')
```

该方法接受四个参数：
* directory：需要自动导入的目录
* useSubdirectories：是否解析子目录
* regExp：需要导入的文件名匹配规则
* mode：同步（sync）或者异步（async）

## Vite中的自动导入

### `import.meta.glob`介绍

该方法接收一个需要导入的文件匹配规则参数

## 示例

<Util-CodeTab
  key-prefix="auto"
  :code-types="['webpack自动导入示例', 'vite自动导入示例']"
  default-active-code-type="webpack自动导入示例"
/>

::: slot auto-webpack自动导入示例
```js
const importViews = require.context('./src/views', true, /\.vue$/)
const routes = importViews.keys().map(filePath => ({
  path: filePath.repalce(/((^\.\/src\/views)|(\.vue$))/g, ''),
  component: importViews(filePath)
}))
```
:::

::: slot auto-vite自动导入示例
```js
const modules = import.meta.glob('./src/views/**/*.vue')

const routes = Object.entries(modules).map(([filePath, importFunction]) => ({
  path: filePath.repalce(/((^\.\/src\/views)|(\.vue$))/g, ''),
  component: importFunction
}))
```
:::

## 总结

这里只提及`Webpack`以及`Vite`的自动导入方式，实际上你需要根据你的项目使用对应的API  
这取决于你的项目基于何种工具构建，你可能需要去查阅对应的工具文档，或者自己编写细节实现  
本文中只针对自动注册路由进行了示例说明，实际上可以运用自动注册的场景相当多，读者可以根据自己的开发情况进行运用

## 参考

* [Vite自动导入](https://cn.vitejs.dev/guide/features.html#glob-import)
* [Webpack自动导入](https://webpack.docschina.org/guides/dependency-management/#requirecontext)

<script>
export default {
  data() {
    return {
      fileConstructure: [
        {
          label: 'src',
          icon: 'folder',
          children: [
            { 
              label: 'views',
              icon: 'folder',
              children: [
                { 
                  label: 'user',
                  icon: 'folder',
                  children: [
                    { 
                      label: 'profile', 
                      icon: 'folder',
                      children: [
                        { label: 'basic.vue', img: '/logos/vue-logo.png' },
                        { label: 'vip.vue', img: '/logos/vue-logo.png' }
                      ] 
                    },
                    { label: 'orders.vue', img: '/logos/vue-logo.png' },
                    { label: 'settings.vue', img: '/logos/vue-logo.png' }
                  ]
                },
                {
                  label: 'system',
                  icon: 'folder',
                  children: [
                    { label: 'user.vue', img: '/logos/vue-logo.png' },
                    { label: 'role.vue', img: '/logos/vue-logo.png' },
                    { label: 'authority.vue', img: '/logos/vue-logo.png' },
                  ]
                },
                {
                  label: 'login.vue',
                  img: '/logos/vue-logo.png'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped lang="stylus">
>>> .q-tree__img {
  height: 20px;
}
</style>