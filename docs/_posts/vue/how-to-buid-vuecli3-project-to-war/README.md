---
title: 将Vue-cli3.0搭建的前端项目构建并打包成war文件
description: 公司新项目采用前后分离，前端Vue，后端SpringBoot，部署平台只接受war包，需求就是把前端build之后的资源打成war包
categories: 
  - Server-side
  - Front-end
tags: 
  - Vue
  - Tomcat
  - Java
author: Zion Dotson
date: 2019-10-05
location: Beijing
---

> 最近需要将vue项目打包的结果构建成war包（部署平台只接受war包），特在此记录步骤

<!-- more -->

### 步骤

#### 搭建一个普通的Java web 工程

#### 目录结构

![image.png](https://img.hacpai.com/file/2019/10/image-9f171cd4.png)

#### 将前端项目构建之后的所有文件放到web根目录下

#### web/WEB-INF/web.xml配置

<Util-CodeTab
    key-prefix="web"
    :code-types="['xml']"
    default-active-code-type="xml"
/>
::: slot web-xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <display-name>Archetype Created Web Application</display-name>
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.html</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.ico</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.jpg</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.gif</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.woff</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.ttf</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.png</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.js</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.css</url-pattern>
    </servlet-mapping>
    <error-page>
        <error-code>404</error-code>
        <location>/</location>
    </error-page>
</web-app>
```
:::

这里的配置含义如下：

* 设置`welcome-file`为`index.html`
* 将静态资源（字体，图片，css，js）使用`tomcat`默认的`servlet`去处理
* 让`404`重定向到`/`

这样一来所有的路由都会走到`index.html`，这样就可以加载前端`js`控制的路由体系，这个项目使用的是`vue-router`

#### 打包war（以IDEA为例）

* 在Project setting -> Artifacts -> 添加 -> Web Application: Exploded
* Build -> Build Artifacts
* 在输出目录找到war包

::: danger 注意

由于这个项目使用的是vue-cli3.0

* **`war`包的名称**

* **`vue.config.js` 文件里的 `publichPath`**

* **`vue-router`的`base`**

需要保持一致！！！

:::
