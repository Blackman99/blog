---
title: Vue3使用初体验
date: 2021-02-03
author: Zion Dotson
location: Beijing
categories:
  - Front-end
tags:
  - Vue
  - Composition-API
  - TypeScript
cover: /logos/vue-logo.png
---

> Vue3已经发布beta版，作为一个紧跟时事的前端开发，选择在Beta版时就直接将Vue3应用到开发中，使用了也有4个月的时间了，谈谈Vue3的一些个人使用体验

<!-- more -->

### Composition-API 对比 Option-API

我们现在来写一个简单的todo-list，用Quasar组件，不熟悉的童鞋可以看下官方文档：[Quasar官网](https://quasar.dev/)

#### 效果如下

<Demo-TodoList />


#### 选项式（Option-API）

<Util-CodeTab key-prefix="optionapi" />

::: slot optionapi-template
```html
<div class="todo-list">
  <ul>
    <li v-for="(item, i) in todoItems" :key="i" class="todo-item">
      <span class="item-name">
        名称：{{ item.name }}
      </span>
      &nbsp;
      <span class="item-date">
        日期：{{ item.date }}
      </span>
      <q-btn padding="2px" size="10px" icon="remove" round color="red-7" unelevated class="q-ml-sm" @click="removeItem(i)" />
    </li>
  </ul>
  <div class="row items-center q-gutter-md">
    <q-input v-model="newItem.name" label="名称" dense filled rounded />
    <q-input v-model="newItem.date" label="日期" dense rounded filled />
    <div>
      <q-btn padding="2px" size="10px" icon="add" round color="primary" unelevated class="q-ml-sm" @click="addItem" />
    </div>
  </div>
</div>
```
:::

::: slot optionapi-script
```js
export default {
  data() {
    return {
      todoItems: [
        { name: '事项一', date: '2020-02-02' },
        { name: '事项二', date: '2020-02-03' },
        { name: '事项三', date: '2020-02-04' },
        { name: '事项四', date: '2020-02-05' },
      ],
      newItem: {
        name: '',
        date: ''
      }
    }
  },
  methods: {
    removeItem(idx) {
      this.todoItems.splice(idx, 1)
    },
    addItem() {
      this.todoItems.push({ ...this.newItem })
      this.newItem.name = ''
      this.newItem.date = ''
    }
  }
}
```
:::

::: slot optionapi-style
```stylus
.todo-list {
  .todo-item {
    .item-name {
      font-size: 16px;
      font-weight: bold;
    }
    .item-date {
      font-size: 14px;
      color: #666;
    }
  }
}
```
:::

#### 组合式（Composition-API）

组合式在template与style上没有什么差异，下面只写script部分

<Util-CodeTab 
  key-prefix="composition-api" 
  :code-types="['script']"
  default-active-code-type="script" 
/>

::: slot composition-api-script
```js
import { reactive, ref } from 'vue'

const useTodo = () => {
  const newItem = ref({
    name: '',
    date: ''
  })

  const items = reactive([
    { name: '事项一', date: '2020-02-02' },
    { name: '事项二', date: '2020-02-03' },
    { name: '事项三', date: '2020-02-04' },
    { name: '事项四', date: '2020-02-05' },
  ])

  const removeItem = idx => {
    items.splice(idx, 1)
  }

  const addItem = () => {
    items.push({ ...newItem.value })
    newItem.value = {
      name: '',
      date: ''
    }
  }

  return {
    removeItem,
    addItem,
    items
  }
}

export default {
  setup: () => {
    return {
      ...useTodo()
    }
  }
}
```
:::

#### 对比

> 可以看到：    
> * 在Composition-API中，数据与对数据的操作是可以写到一起的，这意味着你可以把完整的逻辑（数据，对数据的操作）提取到一个单独的函数里，以供其他组件或者文件复用  
> * 而在Option-API中，如果你想复用某个组件的某些数据以及对这些数据的操作，只能用`Mixin`的方式，但是`Mixin`溯源比较困难，有断层，且命名极大可能会出现冲突  
> * 而且，在Option-API中，会大量出现`this`的使用，且所有的`methods`都是function形式的
> * 而在Composition-API中，完全不需要使用`function`以及`this`，可以享受纯粹的函数式编程体验


### v-model的使用区别


<Util-CodeTab
  key-prefix="v-model"
  :code-types="['vue2', 'vue3']"
  hide-copy
  default-active-code-type="vue2"
/>

::: slot v-model-vue2
<Util-CodeTabVertical
  key-prefix="v-model-vue2"
  :code-types="['子组件', '父组件']"
  default-active-code-type="子组件"
/>
:::

::: slot v-model-vue2-子组件
```vue
<template>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'value-change'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerValue: ''
    }
  },
  watch: {
    innerValue(newInnerValue) {
      this.$emit('value-change', newInnerValue)
    },
    value(newValue) {
      this.innerValue = newValue
    }
  },
  created() {
    this.innerValue = this.value
  }
}
</script>
<style>
</style>
```
:::

::: slot v-model-vue2-父组件
```vue
<template>
  <Child v-model="outerValue" />
</template>
<script>
export default {
  components: {
    Child: () => import('path/to/child.vue')
  },
  data() {
    return {
      outerValue: ''
    }
  }
}
</script>
<style>
</style>
```
:::

::: slot v-model-vue3
<Util-CodeTabVertical
  key-prefix="v-model-vue3"
  :code-types="['子组件', '父组件']"
  default-active-code-type="子组件"
/>
:::

::: slot v-model-vue3-子组件
```vue
<template>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup: (props, { emit }) => {
    const innerValue = ref(props.value)
    watch(() => props.value, newValue => {
      innerValue.value = value
    })
    watch(innerValue, newInnerValue => {
      emit('update:value', newInnerValue)
    })
    return {
      innerValue
    }
  }
}
</script>
<style>
</style>
```
:::

::: slot v-model-vue3-父组件
```vue
<template>
  <Child v-model="outerValue" />
</template>
<script>
import { ref } from 'vue'
export default {
  components: {
    Child: () => import('path/to/child.vue')
  },
  setup: () => {
    const outerValue = ref('')
    return {
      outerValue
    }
  }
}
</script>
<style>
</style>
```
:::

### 参考

* [Vue3](https://v3.vuejs.org/guide/introduction.html)
* [Quasar](https://quasar.dev)