---
title: Spring Boot Banner 自定义、为什么没有输出到日志
date: 2025-02-17 18:25:00
category:
    - 笔记
tag: 
    - Java 框架
    - 后端开发备忘录
    - Spring Boot
    - 经验
    - 问题记录集
description: Spring Boot Banner 怎么配置、为什么没有输出到日志文件
---

# Spring Boot 启动  Banner 图 为什么没有输出到日志文件
最近给项目设置了一下启动 Banner 图，发现日志文件里没有，仔细看了一下 控制台里有输出。
翻了一下官方文档，发现这个图是默认输出到控制台的，但是可以设置输出模式输出到日志文件里 
如下配置:
```properties 
#不输出
spring.main.banner-mode=off
#输出到日志文件
spring.main.banner-mode=log
#默认值 输出到控制台
spring.main.banner-mode=console
```
设置成 log 模式，就可以在日志文件里看到 Banner 了。

# 自定义 Banner
新建一个 banner.txt 文件，放到 classpath 下面，就会输出这个文件的内容了。
放到别的路径下面也可以使用下面参数配置指定 banner 路径
> spring.banner.location

# 生成 Banner ASCII
可以去这个网站根据文字生成
https://www.bootschool.net/ascii

也可以复制下面的佛祖保佑🙏
```txt
————————————————————————————————————————————————————————————————————
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
//            佛祖保佑       永不宕机     永无BUG                  //
————————————————————————————————————————————————————————————————————
                 无善无恶心之体    知善知恶是良知
                 有善有恶意之动    为善去恶是格物
————————————————————————————————————————————————————————————————————
```

# 参考文档
* [官方文档-Customizing the Banner](https://docs.spring.io/spring-boot/reference/features/spring-application.html)