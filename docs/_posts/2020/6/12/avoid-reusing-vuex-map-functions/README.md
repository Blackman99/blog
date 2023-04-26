---
title: 避免在Vuex中重复使用this.$store以及mapXXX函数
description: Vuex使得在Vue组件中可以跨组件共享同一个或多个状态，但是如何避免在不同的组件中重复引用store呢？
categories: 
  - Front-end
tags: 
  - Vue
  - Vuex
date: 2020-06-12
author: Dongsheng Zhao
location: Beijing
---

> Vuex使得在Vue组件中可以跨组件共享同一个或多个状态，但是如何避免在不同的组件中重复引用store呢？

<!-- more -->

### 定义store结构

<Util-CodeTab 
  key-prefix="define-store" 
  :code-types="['state.js']"
  default-active-code-type="state.js" 
/>

::: slot define-store-state.js
```js
const state = {
  modules: {
    moduleA: {
      state: {
        name: 'moduleA'
      },
      mutations: {
        setName: (state, name) => {
          sate.name = name
        }
      }
    },
    moduleB: {
      state: {
        title: 'moduleB'
      },
      mutations: {
        setTitle: (state, title) => {
          sate.title = title
        }
      }
    }
  }
}
```
:::

### 通过`this.$store.xxx`直接使用

<Util-CodeTab 
  key-prefix="direct-use" 
  :code-types="['直接使用']"
  default-active-code-type="直接使用" 
/>

::: slot direct-use-直接使用
```js
this.$store.state.moduleA.name
this.$store.commit('moduleA/setName')
```
:::

### mapState, mapMutations的使用

<Util-CodeTab 
  key-prefix="map-functions" 
  :code-types="['mapState&mapMutations', '组件中使用']"
  default-active-code-type="mapState&mapMutations" 
/>

::: slot map-functions-mapState&mapMutations
```vue
<style>
</style>
<template>
</template>
<script>
import { mapState, mapMutations } from 'vuex
export default {
  computed: {
    ...mapState('moduleA', [
      'name'
    ])
  },
  methods: {
    ...mapMutations('moduleA, [
      'setName'
    ])
  }
}
</script>
```
:::

::: slot map-functions-组件中使用
```js
this.name // this.$store.state.moduleA.name
this.setName() // this.$store.commit('moduleA/setName') 
```
:::

### 使用`createNamespacedHelpers`简化mapXXX的映射

<Util-CodeTab 
  key-prefix="create-namespace" 
  :code-types="['createNamespacedHelpers']"
  default-active-code-type="createNamespacedHelpers" 
/>
::: slot create-namespace-createNamespacedHelpers
```vue
<style>
</style>
<template>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('moduleA')
export default {
  computed: {
    ...mapState([
      'name'
    ])
  },
  methods: {
    ...mapMutations([
      'setName'
    ])
  }
}
</script>
```
:::

### 使用`mixins`选项

#### moduleAMixin.js

<Util-CodeTab 
  key-prefix="use-mixin" 
  :code-types="['moduleAMixin.js', '组件中使用']"
  default-active-code-type="moduleAMixin.js" 
/>

::: slot use-mixin-moduleAMixin.js
```js
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('moduleA')
export default {
  computed: {
    ...mapState([
      'name'
    ])
  },
  methods: {
    ...mapMutations([
      'setName'
    ])
  }
}
```
:::

::: slot use-mixin-组件中使用
```vue
<style>
</style>
<template>
</template>
<script>
import moduleAMixin from 'path/to/moduleAMixin.js'
export default {
  mixins: [moduleAMixin]
}
</script>
```
:::

对于moduleB或者其他任何你想跨组件共享的store模块，都可以使用类似的方式

::: tip 关于mapGetters与mapActions的使用

* `mapGetters`与`mapState`的使用方式一致
* `mapActions`与`mapMutations`的使用方式一致

:::

### 总结

* 跨组件共享同一个模块的状态，使用mixin选项配合Vuex的createNamespacedHelpers，mapState，mapMutations，mapGetters，mapActions
可以将组件内部的store相关代码量降到很低的程度
* 即使有了Vuex，也并不意味着你需要将所有的数据都放到Store里，我还是认为只有当需要跨组件共享状态时才使用Vuex才是正确的做法，否则就是徒增代码量而已