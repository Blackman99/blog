---
title: 使用阿里云OSS部署你的静态站点
description: 使用阿里云OSS部署你的静态站点
date: 2021-07-08
author: Dongsheng Zhao
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
目前gitee pages已经关闭开通，官方声称在维护中
* 阿里云OSS静态站点方案  
阿里云OSS对象存储的价格相对购买服务器来说较为划算  
以40G资源包为例（**40G为最小的资源包购买单位**）：  
40G/3年：30RMB左右

::: danger 访问流量额外计费
资源包仅可用作存储空间费用  
站点浏览的流量是另计费，如果站点访问量并不是很大，总体上一定比单独购买服务器划算  
如果站点访问量比较大，还是自购服务器比较合适
:::

并且40G的容量意味着可以部署非常多的静态站点，比如此篇博客更新后本站点的大小在5M左右
::: danger 警告
更多的站点意味着更高的访问流量，请确保了解后果
:::  
本站点就是部署在OSS上，以下步骤也为亲身实践得出，希望可以帮到有需要的人  

## 阿里云对象存储OSS介绍

[阿里云对象存储官网](https://www.aliyun.com/product/oss)

## 准备工作

### 购买域名

域名可以在阿里云上购买或者其他平台均可

### https证书申请（可选）

如果不需要https访问站点，则不需要这项工作

### 开通OSS并新建Bucket


* 注册阿里云账号
* 开通OSS服务
* 购买资源包
* 新建bucket


::: tip 提示
新建的Bucket需要设置成**公共读**<Badge text="重要" type="" />权限
:::


### 对Bucket进行一些必要设置


#### 静态托管

* 点击基础设置 -> 静态页面
* 设置默认首页，例如本站点设置的是`index.html`
* 设置文件404规则，本站点采用[Vuepress(v1)](https://vuepress.vuejs.org/zh/)开发，vuepress使用了[vue-router](https://router.vuejs.org/zh/)作为spa路由  
所以此项配置需要设置为：`index.html`  
不同的站点则需要根据情况设置404页面  
* 开通子目录首页，文件404规则设置为`Index`

#### 域名绑定

* 增加域名的CNAME解析，解析值为`[bucket].[region]`
* 点击传输管理 -> 域名管理
* 将域名绑定到bucket上
* 上传的https证书（如果有需要的话）

::: tip 提示
详细步骤可以参考[阿里云官方静态托管文档](https://help.aliyun.com/document_detail/31872.html)
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
该工具会在清空bucket之后将`staticWebAppPath`中的所有文件上传至bucket中
:::

## 参考

* [阿里云对象存储官网介绍](https://www.aliyun.com/product/oss)
* [Vuepress(v1)](https://vuepress.vuejs.org/zh/)
* [vue-router](https://router.vuejs.org/zh/)
* [阿里云官方静态托管文档](https://help.aliyun.com/document_detail/31872.html)
* [阿里云RAM文档](https://help.aliyun.com/product/28625.html)
* [ali-oss-static-web-deploy](https://github.com/Blackman99/ali-oss-static-web-deploy)