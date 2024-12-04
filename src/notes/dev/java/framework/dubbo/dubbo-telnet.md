---
title: Dubbo Telnet 
date: 2024-12-01 12:50:00
category:
    - 笔记
tag: 
    - Java 框架
    - 后端开发备忘录
    - Dubbo 
description: Dubbo Telnet 使用姿势记录。
---

# Dubbo Telnet 命令

## ls 显示服务列表
```shell title='使用姿势'
#显示服务详细信息列表
ls -l  
#显示服务的方法列表  
ls XxxService
#显示服务的方法详细信息列表  
ls -l XxxService
```

## ps 显示服务端口列表
```shell title='使用姿势'
#显示服务地址列表 
ps -l 
#显示端口上的连接信息 
ps 20880 
#显示端口上的连接详细信息 
ps -l 20880 
```
 

## cd 改变缺省服务(类似于目录路径)
```shell title='使用姿势'
#改变缺省服务，当设置了缺省服务，凡是需要输入服务名作为参数的命令，都可以省略服务参数  
cd XxxService
#取消缺省服务
cd /
```
## pwd 显示当前缺省服务 （类似于目录路径）
> pwd: 显示当前缺省服务

## trace 跟踪服务调用情况
```shell title='使用姿势'
#跟踪 1 次服务任意方法的调用情况  
trace XxxService
#跟踪 10 次服务任意方法的调用情况
trace XxxService 10
#跟踪 1 次服务方法的调用情况
trace XxxService xxxMethod
#跟踪 10 次服务方法的调用情况
trace XxxService xxxMethod 10
```

## count 统计服务调用情况

```shell title='使用姿势'
#统计 1 次服务任意方法的调用情况
count XxxService
#统计 10 次服务任意方法的调用情况
count XxxService 10
#统计 1 次服务方法的调用情况 
count XxxService xxxMethod
```
## invoke 调用服务的方法
```shell title='使用姿势'
#调用服务的方法
invoke XxxService.xxxMethod(1234, "abcd", {"prop" : "value"})
#调用全路径服务的方法
invoke com.xxx.XxxService.XxxService.xxxMethod(1234, "abcd", {"prop" : "value"})
#调用服务的方法(自动查找包含此方法的服务) 
invoke xxxMethod(1234, "abcd", {"prop" : "value"})
#当有参数重载，或者类型转换失败的时候，可以通过增加class属性指定需要转换类当参数为Map<Integer,T>，key的类型为Integer时，建议指定类型。例如invoke com.xxx.xxxApiService({"3":0.123, "class":"java.util.HashMap"})
invoke xxxMethod({"name":"zhangsan","age":12,"class":"org.apache.dubbo.qos.legacy.service.Person"})

#当 invoke 命令匹配到多个方法时使用，根据提示列表选择需要调用的方法
select 1
```
## status 查看 Dubbo 服务状态
```shell title='使用姿势'
#显示汇总状态，该状态将汇总所有资源的状态，当全部 OK 时则显示 OK，只要有一个 ERROR 则显示 ERROR，只要有一个 WARN 则显示 WARN
status
#显示状态列表
status -l
```
 
## lear
> clear: 清除屏幕上的内容
> clear 100: 清除屏幕上的指定行数的内容
## exit
> exit: 退出当前 telnet 命令行


# 相关文档
[Dubbo Telnet 命令参考手册](https://cn.dubbo.apache.org/zh-cn/docs/references/telnet/)