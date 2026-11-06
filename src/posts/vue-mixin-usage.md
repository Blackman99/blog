---
title: Vue2中的mixin使用方式小结
date: 2021-12-23
excerpt: Vue2中的mixin使用方式小结
author: "Dongsheng Zhao"
cover: /covers/vue-mixin-usage.jpg
category: Front-end
tags:
  - Vue
---
> Vue2中的`mixins`是复用代码非常好用的方式之一，下面据个人使用经历进行总结

### 基础使用

::::code-tabs{active="simpleMxin.js"}
### simpleMxin.js

```js
export default {
  data() {
    return {
      someData: 'someValue'
    }
  }
}
```

### componentA.vue

```vue
<template>
  <p>
    {{ someData }}
  </p>
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

### 结果

```yml
someData: someValue
```
::::

### 多个mixin

::::code-tabs{active="mixin1.js"}
### mixin1.js

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

### mixin2.js

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

### componentA.vue

```vue
<template>
  <p>
    data1: {{ data1 }} <br />
    data2: {{ data2 }} <br />
    otherData: {{ otherData }} <br />
  </p>
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

### 结果

```yml
data1: value1
data2: value2
otherData: innerValue
```
::::

### 嵌套使用

::::code-tabs{active="mixin1.js"}
### mixin1.js

```js
export default {
  data() {
    return {
      someData1: 'someValue1',
      otherData: 'otherValue1',
    }
  }
}
```

### mixin2.js

```js
import mixin1 from 'path/to/mixin1'

export default {
  mixins: [mixin1],
  data() {
    return {
      someData2: 'someValue2',
      otherData: 'otherValue2',
    }
  }
}
```

### componentA.vue

```vue
<template>
  <p>
    someData1: {{ someData1 }} <br />
    someData2: {{ someData2 }} <br />
    otherData: {{ otherData }} <br />
  </p>
</template>
<script>
import mixin2 from 'path/to/mixin2'
export default {
  mixins: [mixin2],
  data() {
    return {
      otherData: 'innerValue'
    }
  }
}
</script>
```

### 结果

```yml
someData1: someValue1
someData2: someValue2
otherData: innerValue
```
::::

### 动态mixin

::::code-tabs{active="createSomeMixin.js"}
### createSomeMixin.js

```js
export default (dataName, dataDefaultValue) => {
  return {
    data() {
      return {
        [dataName]: dataDefaultValue
      }
    }
  }
}
```

### componentA.vue

```vue
<template>
  <h3>
    dynamicData: {{ dynamicData }}
  </h3>
</template>
<script>
import createSomeMixin from 'path/to/createSomeMixin'
export default {
  mixins: [createSomeMixin('dynamicData', 'dynamicValue')],
  data() {
    return {
      
    }
  }
}
</script>
```

### 结果

```yml
dynamicData: dynamicValue
```
::::

### 示例：动态创建需要的`v-model`

假设现在需要写一系列的表单内组件：输入框、单选、下拉...  
在这种情况下，可能需要多次封装组件内部的`v-model`提供给使用者绑定值  
这个时候`mixin`能很好的帮你完成通用的自定义`v-model`实现

下面的示例展示了通过参数自定义`v-model`所需要的一些相关选项，并提供默认`v-model`行为

::::code-tabs{active="createModelMixin.js"}
### createModelMixin.js

```js
const createModelMixin = (
  {
    propName = 'value',
    propType = [String, Number],
    propDefaultValue = '',
    eventName = 'change',
    innerValueName = 'innerValue',
  } = {
    propName: 'value',
    propType: [String, Number],
    propDefaultValue: '',
    eventName: 'change',
    innerValueName: 'innerValue',
  }
) => ({
  model: {
    prop: propName,
    event: eventName,
  },
  props: {
    [propName]: {
      type: propType,
      default: propDefaultValue,
    },
  },
  data() {
    return {
      [innerValueName]: propDefaultValue,
    }
  },
  created() {
    this[innerValueName] = this[propName]
  },
  watch: {
    [propName](newPropValue) {
      this[innerValueName] = newPropValue
    },
    [innerValueName](newInnerValue) {
      this.$emit(eventName, newInnerValue)
    },
  },
})

export default createModelMixin

```

### CustomInput.vue

```vue
<template>
  <input v-model="innerValue" />
</template>
<script>
import createModelMixin from 'path/to/createModelMixin'

export default {
  mixins: [createModelMixin()],
  data() {
    return {
      
    }
  }
}
</script>
```

### CustomCheckbox.vue

```vue
<template>
  <div>
    <!-- 实现逻辑 -->
  </div>
</template>
<script>
import createModelMixin from 'path/to/createModelMixin'

export default {
  mixins: [createModelMixin({ 
    propType: Boolean,
    propDefaultValue: false
   })],
  data() {
    return {
      
    }
  }
}
</script>
```

### 使用

```vue
<template>
  <div>
    <CustomCheckboxm v-model="checked" />
    <CustomInput v-model="value" />
  </div>
</template>
<script>
import CustomCheckbox from 'path/to/CustomCheckbox'
import CustomInput from 'path/to/CustomInput'

export default {
  components: {
    CustomCheckboxm,
    CustomInput
  },
  data() {
    return {
      checked: true,
      value: ''
    }
  }
}
</script>
```
::::

### 参考

* [混入 - Vue.js](https://cn.vuejs.org/v2/guide/mixins.html)
