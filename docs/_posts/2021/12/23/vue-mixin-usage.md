---
title: Vue2中的mixin使用方式小结
description: Vue2中的mixin使用方式小结
date: 2021-12-23
author: Zion Dotson
location: Beijing
tags:
  - Vue
categories:
  - Front-end
---

> Vue2中的`mixins`是复用代码非常好用的方式之一，下面据个人使用经历进行总结

<!-- more -->

### 基础使用

<Util-CodeTab
  key-prefix="base"
  :code-types="['simpleMxin.js', 'componentA.vue', '结果']"
  default-active-code-type="simpleMxin.js"
/>

::: slot base-simpleMxin.js
```js
export default {
  data() {
    return {
      someData: 'someValue'
    }
  }
}
```
:::

::: slot base-componentA.vue
```vue
<template>
  <h3>
    {{ someData }}
  </h3>
</template>
<script>
import simpleMxin from 'path/to/simpleMxin'
export default {
  mixins: [simpleMxin],
  data() {
    return {
      
    }
  }
}
</script>
```
:::

::: slot base-结果
<h3>someValue</h3>
:::

### 多个mixin

<Util-CodeTab
  key-prefix="multiple"
  :code-types="['mixin1.js', 'mixin2.js', 'componentA.vue', '效果']"
  default-active-code-type="mixin1.js"
/>

::: slot multiple-mixin1.js
```js
export default {
  data() {
    return {
      data1: 'value1',
      otherData: 'otherValue1'
    }
  }
}
```
:::

::: slot multiple-mixin2.js
```js
export default {
  data() {
    return {
      data2: 'value2',
      otherData: 'otherValue2',
    }
  }
}
```
:::

::: slot multiple-componentA.vue
```vue
<template>
  <h3>
    data1: {{ data1 }} <br />
    data2: {{ data2 }} <br />
    otherData: {{ otherData }} <br />
  </h3>
</template>
<script>
import mixin1 from 'path/to/mixin1'
import mixin2 from 'path/to/mixin2'

export default {
  mixins: [mixin1, mixin2],
  data() {
    return {
      otherData: 'innerValue'
    }
  }
}
</script>
```
:::

::: slot multiple-效果
<h3>
  data1: value1 <br />
  data2: value2 <br />
  otherData: innerValue <br />
</h3>
:::

### 嵌套使用

<Util-CodeTab
  key-prefix="nest"
  :code-types="['mixin1.js', 'mixin2.js', 'componentA.vue', '效果']"
  default-active-code-type="mixin1.js"
/>

::: slot nest-mixin1.js
```js
export default {
  
}
```
  
:::