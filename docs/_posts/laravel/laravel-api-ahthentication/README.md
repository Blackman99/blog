---
title: Laravel 框架学习——多表 api 认证
description: Laravel提供了API认证，但是只支持一张表，如何完成多表API认证呢
categories: 
  - Server-side
tags: 
  - PHP
  - Laravel
author: Dongsheng Zhao
location: Beijing
date: 2019-09-01
---

> 根据Laravel官方文档：[api认证](https://laravel.com/docs/6.0/api-authentication)
> `api`认证支持`Eloquent`与`database`方式，我这里的配置选用的是`database`方式

<!-- more -->

<img src="https://laravel.com/img/logotype.min.svg"/>

## 单表api认证  

### 数据库  

* 表名：`user`
* 字段：`api_token`为必须，其它自选

#### config/auth.php  

<Util-CodeTab
  key-prefix="auth"
  :code-types="['php']"
  default-active-code-type="php"
/>
::: slot auth-php
```php
'guards' => [
        'api' => [
            'driver' => 'token',
            'provider' => 'users',
            'hash' => false
        ]
],
'providers' => [
        'users' => [
            'driver' => 'database',
            'table' => 'user'
        ]
]
```
:::


## 多表api认证  

### 新增中间件  

运行

```sh
php artisan make:middleware EmployeeToken
```

该命令会在`App\Http\Middleware`目录下新增一个`EmployeeToken.php`文件

### 注册路由中间件  

在`App\Http\Kernel`类中：

```php
protected $routeMiddleware = [
  // 其它中间件...
  'employeeToken' => \App\Http\Middleware\EmployeeToken::class,
  // 其它中间件...
];
```
### 中间件代码  

EmployeeToken的代码如下

<Util-CodeTab
  key-prefix="middleware"
  :code-types="['php']"
  default-active-code-type="php"
/>
::: slot middleware-php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class EmployeeToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($req, Closure $next)
    {
        $api_token = $req->input('api_token');
        if($api_token == null){
          return response()->json([
            false,
            'Token无效！'
          ]);
        }
        $couriers = DB::select('SELECT * FROM employee WHERE api_token = ?', [ $api_token ]);
        if(count($couriers) != 1){
          return response()->json([
            false,
            'Token无效！'
          ]);
        }
        // api_token转换到courier表
        $req->setUserResolver(function() use ($couriers){
          return $couriers[0];
        });
        return $next($req);
    }
}
```
:::

* 检查请求输入参数`api_token`是否存在
* 并检查在表`employee `中是否存在`api_token`=输入参数`api_token`的记录
* 不存在则直接返回json，附带错误信息
* 通过`setUserResolver`方法，传递一个闭包，使得`Request`的`user()`方法返回`employee`表中`api_token`=输入参数的`api_token`的一条记录

### 指定路由使用中间件  

```php
Route::middleware('employeeToken')->prefix('employee')->group(function(){

});
```
* `/api/employee/**/*`路由都使用`employeeToken`
* 在`/api/employee/**/*`下路由对应的`Controller`中直接使用`request->user()`方法即可获取对应的访问`employee`表记录
