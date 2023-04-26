---
title: Less中的循环（each方式）
date: 2021-06-06
tags:
  - Less
  - CSS
categories:
  - Front-end
author: Dongsheng Zhao
location: Beijing
---


> 用搜索工具得到的结果基本都是使用 `when`的方式，其实自从*3.7.0* 起官方提供了 `each`函数来遍历

<!-- more -->

### Less

```less
@primary: blue;
@danger: red;
@warning: yellow;
@success: green;
@colors: primary, danger, warning, success;
each(@colors, {
  .bg-@{value} {
    background-color: @@value;
  }
})
```

### 大概相当于CSS

```css
.bg-primary {
  background-color: blue;
}
.bg-danger {
  background-color: red;
}
.bg-warning{
  background-color: yellow;
}
.bg-success {
  background-color: green;
}
```

### 参考

* [less官方文档](https://lesscss.org/functions/?utm_source=ld246.com#list-functions-each)