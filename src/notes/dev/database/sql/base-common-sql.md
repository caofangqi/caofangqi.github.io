---
date: 2024-12-17 20:11:00
description: 记录一些常用 SQL 语法，好记性不如烂笔头
title: SQL(Structured Query Language) 语法备忘录
category:
  - 笔记
tag:
  - SQL
  - MySQL
star: true
---
# SQL(Structured Query Language) 备忘录
> SQL（发音为字母S-Q-L或sequel）是Structured Query Language（结构化查询语言）的缩写。SQL是一种专门用来与数据库沟通的语言。

> 标准SQL由ANSI标准委员会管理，从而称为ANSI SQL。所有主要的DBMS，即使有自己的扩展，也都支持ANSI SQL。各个实现有自己的名称，如Oracle的PL/SQL、微软SQL Server用的Transact-SQL等。

## 数据库术语
* 数据库（database） - 保存有组织的数据的容器（通常是一个文件或一组文件）。
* 数据表（table） - 某种特定类型数据的结构化清单。
* 模式（schema） - 关于数据库和表的布局及特性的信息。模式定义了数据在表中如何存储，包含存储什么样的数据，数据如何分解，各部分信息如何命名等信息。数据库和表都有模式。
* 列（column） - 表中的一个字段。所有表都是由一个或多个列组成的。
* 行（row） - 表中的一个记录。
* 主键（primary key） - 一列（或一组列），其值能够唯一标识表中每一行。
## DDL 数据定义语言（Data Definition Language)
SQL 语言集中负责数据结构定义与数据库对象定义的语言。
DDL 的主要功能是定义数据库对象。
> DDL核心指令是 CREATE、ALTER、DROP
### CREATE DATABASE 创建数据库
```sql title='Syntax'
CREATE DATABASE test;
```
### CREATE TABLE 创建表

```sql title='Example'
--创建表
CREATE TABLE user (
  id int(10) unsigned NOT NULL COMMENT 'Id',
  username varchar(64) NOT NULL DEFAULT 'default' COMMENT '用户名',
  password varchar(64) NOT NULL DEFAULT 'default' COMMENT '密码',
  email varchar(64) NOT NULL DEFAULT 'default' COMMENT '邮箱',
  index idx_username(username)
) COMMENT='用户表';

--根据已有的表创建新表
CREATE TABLE vip_user AS
SELECT * FROM user;
```
### ALTER 修改表、修改索引
```sql title='Syntax'
    ALTER TABLE tablename
    (
      ADD|DROP    column datatype    [NULL|NOT NULL]    [CONSTRAINTS],
      ADD|DROP    column datatype    [NULL|NOT NULL]    [CONSTRAINTS],
        ...
    );
```
```sql title='Example'
-- 新增字段
ALTER TABLE user
ADD age int(3) not null default 18 COMMENT '年龄';
-- 删除字段
ALTER TABLE user
DROP COLUMN age;
-- 修改字段
ALTER TABLE `user`
MODIFY COLUMN age tinyint;
-- 删除索引
ALTER TABLE user
DROP INDEX user_index;
-- 新增索引
ALTER TABLE user
ADD INDEX user_index(user);
```



### DROP 删除表/数据库
DROP永久地删除数据库对象（表、视图、索引等.
```sql title='Syntax'
DROP INDEX|PROCEDURE|TABLE|VIEW indexname|procedurename|tablename|
    viewname;
--删除表没有确认步骤，也不能撤销，执行这条语句将永久删除该表
 DROP TABLE tableName;
 --删除数据库
 DROP DATABASE dbName;
```
### TRUNCATE 清空表数据
TRUNCATE 清空表数据，速度特别快(曾经在 truncate 3 亿+数据大表耗时 500ms 左右。)。会重置自增主键。
```sql title='Syntax'
TRUNCATE tableName
```

##  DML 数据操作语言（Data Manipulation Language)
用于数据库操作，对数据库其中的对象和数据运行访问工作的编程语句。
DML 的主要功能是 访问数据，因此其语法都是以读写数据库为主
> DML 的核心指令是 INSERT、UPDATE、DELETE、SELECT。这四个指令合称 CRUD(Create, Read, Update, Delete)，即增删改查。
### SELECT 查询数据
```sql title='Syntax'
    SELECT columnname, ...
    FROM tablename, ...
    [WHERE ...]
    [UNION ...]
    [GROUP BY ...]
    [HAVING ...]
    [ORDER BY ...];
```

### INSERT 插入数据
```sql title='Syntax'
    INSERT INTO tablename (columns, ...)...
    VALUES(values, ...)...;

    -- 插入查询出来的数据
    INSERT INTO tablename [(columns, ...)]
    SELECT columns, ... FROM tablename, ...
    [WHERE ...];
```
### UPDATE 更新数据
```sql title='Syntax'
    UPDATE tablename
    SET columname = value, ...
    [WHERE ...];
```
### DELETE 物理删除数据
使用 DELETE 一定要注意后面携带 where 条件，如果不带 where 条件，delete tableName 相当于清空数据表。
```sql title='Syntax'
    DELETE FROM tablename
    [WHERE ...];
```
## 子查询
子查询是嵌套在较大查询中的 SQL 查询。子查询也称为内部查询或内部选择，而包含子查询的语句也称为外部查询或外部选择。
* 子查询可以嵌套在 SELECT，INSERT，UPDATE 或 DELETE 语句内或另一个子查询中。
* 子查询通常会在另一个 SELECT 语句的 WHERE 子句中添加。
* 可以使用比较运算符，如 >，<，或 =。比较运算符也可以是多行运算符，如 IN，ANY 或 ALL。
* 子查询必须被圆括号 () 括起来。
* 内部查询首先在其父查询之前执行，以便可以将内部查询的结果传递给外部查询。
```sql title='Example'
SELECT cust_name, cust_contact
FROM customers
WHERE cust_id IN (SELECT cust_id
                  FROM orders
                  WHERE order_num IN (SELECT order_num
                                      FROM orderitems
                                      WHERE prod_id = 'RGAN01'));

```
## 连接&组合
### 内连接（INNER JOIN）
内连接又称等值连接，使用 INNER JOIN 关键字。在没有条件语句的情况下返回笛卡尔积。
自连接可以看成内连接的一种，只是连接的表是自身而已。
```sql title='Example'
SELECT vend_name, prod_name, prod_price
FROM vendors INNER JOIN products
ON vendors.vend_id = products.vend_id;
```
### 自连接
```sql title='Example'
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM customers c1, customers c2
WHERE c1.cust_name = c2.cust_name
AND c2.cust_contact = 'Jim Jones';
```
### 自然连接 （NATURAL JOIN）
自然连接是把同名列通过 = 测试连接起来的，同名列可以有多个。
```sql title='Example'
SELECT *
FROM Products
NATURAL JOIN Customers;

```
### 左连接（LEFT JOIN ）
返回左表中的所有行，即使右表中没有满足条件的行也是如此。
```sql title='Example'
SELECT customers.cust_id, orders.order_num
FROM customers LEFT JOIN orders
ON customers.cust_id = orders.cust_id;
```
### 右连接（RIGHT JOIN）
返回右表中的所有行，即使左表中没有满足条件的行也是如此。

```sql title='Example'
SELECT customers.cust_id, orders.order_num
FROM customers RIGHT JOIN orders
ON customers.cust_id = orders.cust_id;

```
### 组合（UNION）
UNION 运算符将两个或更多查询的结果组合起来，并生成一个结果集，其中包含来自 UNION 中参与查询的提取行。
UNION 基本规则
* 所有查询的列数和列顺序必须相同。
* 每个查询中涉及表的列的数据类型必须相同或兼容。
* 通常返回的列名取自第一个查询。
  
默认会去除相同行，如果需要保留相同行，使用 UNION ALL。
只能包含一个 ORDER BY 子句，并且必须位于语句的最后。
应用场景：
* 在一个查询中从不同的表返回结构数据。
* 对一个表执行多个查询，按一个查询返回数据。

## 函数
### CASE 函数 数据统计分析必备
case when 可以根据某个条件来执行不同的SQL语句。例如，当某个字段的值为1时执行某条SQL语句，当字段值为2时执行另一条SQL语句.

```sql title='Syntax'
--写法一 返回第一个value=compare_value为true的分支的结果。
CASE value
    WHEN compare_value THEN result
    WHEN compare_value THEN result
    ...
    ELSE result
END
--写法二 返回第一个condition为true的分支的结果
CASE
    WHEN condition THEN result
    WHEN condition THEN result
    ...
    ELSE result]
END
-- 如果没有一个value=compare_value或者condition为true，那么就会返回ELSE对应的结果，如果没有ELSE分支，那么返回NULL。
```





## 参考文档
* [Flow Control Functions](https://dev.mysql.com/doc/refman/8.0/en/flow-control-functions.html#operator_case)
*  [SQL 必知必会](https://weread.qq.com/web/reader/f7632a30720befadf7636bbka8b3222028ea8baa56554b9#outline?noScroll=1)
*  [JavaGuide SQL 语法基础知识总结](https://javaguide.cn/database/sql/sql-syntax-summary.html)
*  [掘金 SQL 语法速成手册](https://juejin.cn/post/6844903790571700231)
*  [掘金 Case When 用法和注意事项](https://juejin.cn/post/6971040309065187342)
