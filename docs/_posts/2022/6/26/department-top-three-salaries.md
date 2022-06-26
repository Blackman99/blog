---
title: leetcode 185 - 部门收入前三高的所有员工
description: leetcode 185 - 部门收入前三高的所有员工
date: 2022-06-26
author: Zion Dotson
location: Beijing
tags:
  - MySQL
  - SQL
  - Leetcode
categories:
  - Database
---

> LeetCode练习 - MySQL
<!-- more -->

### 描述
公司的主管们感兴趣的是公司每个部门中谁赚的钱最多。

一个部门的 高收入者 是指一个员工的工资在该部门的**不同**工资中 排名前三 

编写一个SQL查询，找出每个部门中 收入高的员工 。

以 任意顺序 返回结果表。

### 表结构

* employee表
```yaml
id: int （主键）
name: varchar （姓名）
salary: int （收入）
departmentId: int （部门ID）
```
* department表
```yaml
id: int （ID）
name: varchar （部门名称）
```

### 示例

* employee表数据

| id  | name  | salary | departmentId |
| --- | ----- | ------ | ------------ |
| 1   | Joe   | 85000  | 1            |
| 2   | Henry | 80000  | 2            |
| 3   | Sam   | 60000  | 2            |
| 4   | Max   | 90000  | 1            |
| 5   | Janet | 69000  | 1            |
| 6   | Randy | 85000  | 1            |
| 7   | Will  | 70000  | 1            |

* department表数据

| id  | name  |
| --- | ----- |
| 1   | IT    |
| 2   | Sales |

* 期望的结果

| Department | Employee | Salary |
| ---------- | -------- | ------ |
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |

### SQL

```sql
SELECT 
  d.name AS Department, 
  e1.name AS Employee, 
  e1.salary AS Salary 
FROM Employee e1, Department d
WHERE e1.departmentId = d.id
AND e1.salary >= (
  SELECT SSS FROM (
    SELECT salary as SSS 
    FROM (
      SELECT DISTINCT(e2.salary)
      FROM Employee e2
      WHERE e1.departmentId = e2.departmentId
      ORDER BY e2.salary DESC
    ) AS S
    LIMIT 0, 3
  )
  AS SS
  ORDER BY SSS ASC
  LIMIT 0, 1
)
```

::: tip 提示
用了两层子查询，速度不是非常快，只能解决问题，速度更快的方案可以去Leetcode上查看其他解
:::

### 参考

* [185. 部门工资前三高的所有员工 - 力扣（LeetCode）](https://leetcode.cn/problems/department-top-three-salaries)