---
title: 日志打印小技巧，MDC 使用指南
date: 2025-05-27 18:18:18
category:
    - 笔记
tag: 
    - Java
    - 日志
    - 后端开发备忘录
description: 日志记录小技巧，MDC(Mapped Diagnostic Context) 
star: true
---
# java 日志 MDC 使用指南

## 背景
在排查问题的时候，总是因为日志记录缺乏操作人信息而无法判断看到的日志是否是导致问题出现的原因。
(这个时候我就恨不得给所有日志加上操作者信息，但是日志特别多，一个个加过去也不现实)
于是就发现了 MDC 这种便捷的操作。

## 简介
MDC（Mapped Diagnostic Context）是 SLF4J 和 Log4j 等日志框架提供的一种机制，用于在日志中添加上下文信息。它基于**线程本地存储（ThreadLocal）**实现，允许你在当前线程的上下文中存储键值对，并在日志输出时自动包含这些信息。
我们可以在 MDC 中添加：
 1. 请求 ID，这样可以追踪整个请求流程。
 2. 记录用户身份信息，方便审计和排查特定用户的问题。
 3. 记录会话或者业务相关信息，有更丰富的上下文。

## 使用方法

### MDC 中设置键值对

::: important
**下面是简单的示例，实际应用中可以在 切面 或者 Filter 等等场景 使用MDC添加键值对**
:::

```java title='使用方法-设置键值对'
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

public class MDCExample {
    private static final Logger logger = LoggerFactory.getLogger(MDCExample.class);

    public static void main(String[] args) {
        // 放入用户信息
        MDC.put("user", "八喜");
        
        try {
            logger.info("处理请求开始");
            processRequest();
            logger.info("处理请求结束");
        } finally {
            // 确保在请求处理完成后移除
            MDC.remove("user")
        }
    }
    
    private static void processRequest() {
        logger.debug("执行具体业务逻辑");
        try {
            // 模拟业务处理
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            logger.error("处理中断", e);
        }
    }
}
```
### 配置日志输出 （示例为 logback 配置）
```xml 
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!-- 添加  %X{user} 来显示 MDC 中设置的信息 -->
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} [%X{user}] - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```
配置之后 可能输出如下
```txt
14:30:45.123 [main] INFO  com.example.MDCExample [八喜] - 处理请求开始
14:30:45.125 [main] DEBUG com.example.MDCExample [八喜] - 执行具体业务逻辑
14:30:46.128 [main] INFO  com.example.MDCExample [八喜] - 处理请求结束
```

### MDC 在异步编程中的注意事项
在使用线程池或异步方法时，需要特别注意 MDC 的传递问题。因为 MDC 是基于 ThreadLocal 的，子线程默认无法访问父线程的 MDC 内容。
::: important
SLF4J MDC 提供了 MDC.copyOfContextMap() 和 MDC.setContextMap() 方法，可以手动复制和设置 MDC 上下文。
:::
#### 提交异步任务时，手动设置 MDC
```java title='线程池提交任务时，手动设置 MDC'
import org.slf4j.MDC;
import java.util.Map;
import java.util.concurrent.*;

public class MDCAsyncExample {
    private static final Logger logger = LoggerFactory.getLogger(MDCAsyncExample.class);
    private static final ExecutorService executor = Executors.newSingleThreadExecutor();

    public static void main(String[] args) {
        MDC.put("requestId", "async-test");
        
        // 捕获当前 MDC 上下文
        Map<String, String> context = MDC.getCopyOfContextMap();
        
        executor.submit(() -> {
            // 设置 MDC 上下文
            if (context != null) {
                MDC.setContextMap(context);
            }
            try {
                logger.info("异步任务执行中");
            } finally {
                MDC.clear();
            }
        });
        
        MDC.clear();
    }
}
```
#### 使用java ThreadPoolExecutor线程池时，可以重写线程池 包装一下submit 方法
先搞个包装工具类
```java  title='设置 MDC 包装工具类'
import org.apache.commons.collections4.MapUtils;
import org.slf4j.MDC;

import java.util.Map;
import java.util.concurrent.Callable;

public class MDCUtil {


    public static <T> Callable<T> wrap(final Callable<T> callable) {
        Map<String, String> context = MDC.getCopyOfContextMap();
        return () -> {
            if (MapUtils.isNotEmpty(context)) {
                MDC.setContextMap(context);
            }
            try {
                return callable.call();
            } finally {
                // 清除子线程的MDC
                MDC.clear();
            }
        };
    }

    public static Runnable wrap(final Runnable r) {
        Map<String, String> context = MDC.getCopyOfContextMap();
        return () -> {
            if (MapUtils.isNotEmpty(context)) {
                MDC.setContextMap(context);
            }
            try {
                r.run();
            } finally {
                // 清除子线程的MDC
                MDC.clear();
            }
        };
    }

}
```
重写 ThreadPoolExecutor 
```java title='重写 ThreadPoolExecutor'

import java.util.concurrent.*;

public class MDCThreadPoolExecutor extends ThreadPoolExecutor {


    public MDCThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
    }

    public MDCThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory);
    }

    public MDCThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, RejectedExecutionHandler handler) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, handler);
    }

    public MDCThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory, handler);
    }


    @Override
    public void execute(Runnable command) {
        super.execute(MDCUtil.wrap(command));
    }

    @Override
    public Future<?> submit(Runnable task) {
        return super.submit(MDCUtil.wrap(task));
    }

    @Override
    public <T> Future<T> submit(Callable<T> task) {
        return super.submit(MDCUtil.wrap(task));
    }

    @Override
    public <T> Future<T> submit(Runnable task, T result) {
        return super.submit(MDCUtil.wrap(task), result);
    }
}
```
这样使用重写之后的线程池 里面线程打印出来的日志也就有了对应的 MDC 信息

#### 使用 Spring 的 ThreadPoolTaskExecutor 时，可以使用 taskDecorator

首先实现一个 taskDecorator，然后包装一下
```java title='实现 taskDecorator'
import org.springframework.core.task.TaskDecorator;

public class MDCTaskDecorator implements TaskDecorator {

    @Override
    public Runnable decorate(Runnable runnable) {
        return MDCUtil.wrap(runnable);
    }

}
```
然后在初始化线程池的时候，设置一下 装饰器
```java title='创建 ThreadPoolTaskExecutor 使用装饰器 示例'
    @Bean(name = "testThreadPoolTaskExecutor")
    public ThreadPoolTaskExecutor testThreadPoolTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //核心线程池大小
        executor.setCorePoolSize(10);
        //最大线程数
        executor.setMaxPoolSize(10);
        //队列容量
        executor.setQueueCapacity(20);
        //活跃时间
        executor.setKeepAliveSeconds(120);
        //设置MDC 装饰器
        executor.setTaskDecorator(new MDCTaskDecorator());
        //线程名字前缀
        executor.setThreadNamePrefix("queryNotEndPitemThreadPool-");
        // setRejectedExecutionHandler：当pool已经达到max size的时候，如何处理新任务
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());

        executor.initialize();
        return executor;
    }
```


# 参考文档

* 豆包
* [让MDC在各种线程间穿梭自如](https://misfork.com/posts/50020.html)
* [logback 第八章 MDC](https://logback.qos.ch/manual/mdc.html)