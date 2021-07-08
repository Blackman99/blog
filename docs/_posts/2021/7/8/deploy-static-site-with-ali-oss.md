---
title: 使用阿里云OSS部署你的静态站点
description: 使用阿里云OSS部署你的静态站点
date: 2021-07-08
author: Zion Dotson
location: Beijing
tags:
  - OSS
  - Deploy
categories:
  - Front-end
---

> 使用阿里OSS部署静态站点，保持访问速度的情况下，最小化站点维护成本

<!-- more -->

## 背景

已知的很多免费静态站点部署方式，例如：
* github pages
国内访问速度极其慢
* gitee pages
现在这个功能已经关闭  

可以看到都有一定的缺点与不足  
阿里云对象存储的价格非常便宜，40G三年的价格30RMB左右  
此博客站点就是部署在OSS上，以下步骤也为亲身实践得出，希望可以帮到有需要的人

## 阿里云对象存储OSS介绍

[阿里云对象存储官网](https://www.aliyun.com/product/oss)

## 准备工作

### 购买域名

域名可以在阿里云上购买或者其他平台均可

### https证书申请（可选）

如果不需要https访问您的站点，则不需要这项工作

### 开通OSS并新建Bucket

* 注册阿里云账号
* 开通OSS服务
* 购买资源包
* 新建bucket

::: tip 提示
新建的Bucket需要设置成**公共读**权限
:::

### 对Bucket进行一些必要设置


#### 静态托管

* 点击基础设置 -> 静态页面
* 设置默认首页，例如本站点设置的是`index.html`
* 设置文件404规则，本站点采用[Vuepress(v1)](https://vuepress.vuejs.org/zh/)开发，vuepress使用了[vue-router](https://router.vuejs.org/zh/)作为spa路由  
所以此项配置需要设置为：`index.html`  
您则需要根据情况设置您站点的404页面  
* 开通子目录首页，文件404规则设置为`Index`

#### 域名绑定

* 您需要在您的域名购买平台上增加您需要绑定的域名的CNAME解析
* 点击传输管理 -> 域名管理
* 将您的域名进行绑定

::: tip 提示
您可以参考[阿里云官方静态托管文档](https://help.aliyun.com/document_detail/31872.html)进行设置
:::

## 部署

### 手动部署

* 进入阿里云OSS控制台
* 找到需要部署的bucket，点击进入
* 点击上传文件
* 将需要部署的所有文件全部上传至bucket中

### 自动部署

本人写了一个小工具，可以快速清空bucket并上传你的静态站点文件  
使用前置条件是需要阿里云RAM用户的AccessKey ID和AccessKey Secret  
详情可以参考[阿里云RAM文档](https://help.aliyun.com/product/28625.html)

* 安装
<Util-CodeTab
  key-prefix="deploy-ali-oss"
  :code-types="['npm', 'yarn']"
  default-active-code-type="npm"
/>
::: slot deploy-ali-oss-npm
```sh
npm install ali-oss-static-web-deploy
```
:::

::: slot deploy-ali-oss-yarn
```sh
yarn add ali-oss-static-web-deploy
```
:::
* 使用
<Util-CodeTab
  key-prefix="deploy-ali-oss"
  :code-types="['demo']"
  default-active-code-type="demo"
/>
::: slot deploy-ali-oss-demo
```js
const aliOSSStaicWebDeploy = require('ali-oss-static-web-deploy')
aliOSSStaicWebDeploy({
  region: 'Your region',
  accessKeyId: 'Your access key',
  accessKeySecret: 'Your access key secret',
  bucket: 'Your bucket name',
  staticWebAppPath: 'Your local path to deploy', // for example: require('path').resolve(process.cwd(), 'dist')
})
```
:::

::: warning 注意
该工具会在清空bucket之后
并将`staticWebAppPath`中的所有文件上传至bucket中
:::

## 参考

* [阿里云对象存储官网介绍](https://www.aliyun.com/product/oss)
* [Vuepress(v1)](https://vuepress.vuejs.org/zh/)
* [vue-router](https://router.vuejs.org/zh/)
* [阿里云官方静态托管文档](https://help.aliyun.com/document_detail/31872.html)
* [阿里云RAM文档](https://help.aliyun.com/product/28625.html)