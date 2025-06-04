---
title: CompletableFuture 使用指南
date: 2025-06-04 18:18:18
category:
    - 笔记
tag: 
    - Java
    - JUC
    - 后端开发备忘录
description: CompletableFuture 提供了一种强大且灵活的方式来编写异步、非阻塞的代码。在 Java 8 中被引入，由于其易用性和处理复杂异步工作流的能力而广受欢迎。
star: true
---
# CompletableFuture 使用指南
## 基本概念

CompletableFuture 是 Java 8 引入的，它扩展了 Future 接口，支持异步编程的链式操作和事件驱动的编程模型。它代表异步计算的未来结果。它可以被看作是一个容器，其中包含在不同线程中执行的异步操作的结果。它提供了许多方法来对异步计算的结果执行各种操作。与传统 Future 相比，它具有以下核心优势：
- 可主动完成（complete）或异常完成（completeExceptionally）
- 支持链式操作和流式处理异步结果
- 提供丰富的组合操作（allOf、anyOf）
- 无缝集成函数式编程接口


## 核心功能和用法
### 创建 CompletableFuture
```java title='创建 CompletableFuture'
// 1. 异步执行无返回值任务  
CompletableFuture<Void> future1 = CompletableFuture.runAsync(() -> {  
    // 耗时操作  
    System.out.println(Thread.currentThread()+"future1执行异步任务");  
});  
  
// 2. 异步执行有返回值任务  
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {  
    // 模拟耗时计算  
    return "future2计算结果";  
});  
  
// 3. 创建已完成的Future  
CompletableFuture<String> completed = CompletableFuture.completedFuture("completed已完成");
```
###  链式操作
```java title='操作'
CompletableFuture<Void> process = CompletableFuture.supplyAsync(() -> {  
            System.out.println(Thread.currentThread()+"process获取数据...");  
            return "process原始数据";  
        })  
        .thenApplyAsync(data -> {  
            System.out.println(Thread.currentThread()+"1process处理数据: " + data);  
            return data + " process已处理1";  
        }).  
        thenApply(data -> {  
            System.out.println(Thread.currentThread()+"2process处理数据: " + data);  
            return data + " process已处理2";  
        })  
        .thenAccept(result -> {  
            System.out.println(Thread.currentThread()+"process消费结果: " + result);  
        })  
        .thenRun(() -> {  
            System.out.println(Thread.currentThread()+"process所有处理完成");  
        });  
  
// 等待结果（阻塞）  
process.join();
// 获取结果（阻塞）设置超时时间 建议使用 get 增加超时时间控制 防止一直阻塞
process.get(3, TimeUnit.SECONDS);

```

### 异常处理
```java title='异常处理示例'
//设置超时时间 并且处理超时异常
CompletableFuture<String> exceptionally = CompletableFuture.supplyAsync(() -> {  
            sleep(1500);  
            System.out.println(Thread.currentThread() + "188执行开始");  
            return "188执行结束了";  
        }).thenApply(a -> {  
            sleep(1600);  
            System.out.println(Thread.currentThread() + "188thenApply处理结果: " + a);  
            return "188thenApply处理结果结束了";  
        })  
        //orTimeout 是 java9 之后增加的 jdk1.8是没有这个方法的
        .orTimeout(1000, TimeUnit.MILLISECONDS)  
        .exceptionally(ex -> {  
            System.out.println(Thread.currentThread() + "188orTimeout捕获异常: " + ex);  
            return "188捕获异常,异常默认值";  
        });  
String join = exceptionally.join();  
System.out.println("188exceptionally结果: " + join);  
  

CompletableFuture<String> exceptionHandling = CompletableFuture.supplyAsync(() -> {  
            if (true) {  
                throw new RuntimeException("exceptionHandling处理异常");  
            }  
            return "exceptionHandling正常结果";  
        })  
        // 处理异常情况并且返回默认结果  有异常才会执行 
        .exceptionally(ex -> {  
            System.out.println(Thread.currentThread()+"exceptionHandling捕获异常: " + ex.getMessage());  
            return "exceptionHandling异常默认值";  
        })  
        // 无论是否异常都执行  没有返回值 
        .whenComplete((result, ex) -> {  
            if (ex != null) {  
                System.out.println(Thread.currentThread()+"exceptionHandling最终处理异常: " + ex.getMessage());  
            } else {  
                System.out.println(Thread.currentThread()+"exceptionHandling最终结果: " + result);  
            }  
        });  
  
// 处理异常并且返回默认值 
CompletableFuture<String> complexHandling = CompletableFuture.<String>supplyAsync(() -> {  
            System.out.println(Thread.currentThread()+"complexHandling准备抛出异常");  
            throw new RuntimeException("complexHandling操作失败");  
        })  
        //无论是否发生异常都会执行
        .handle((result, ex) -> {  
            if (ex != null) {  
                System.out.println(Thread.currentThread()+"complexHandling捕获异常: " + ex.getMessage());  
                // 可以转换异常或返回默认值  
                return "complexHandling错误: " + ex.getMessage();  
            }  
            return result;  
        });
```
### 多个 CompletableFuture 组合使用
```java title='多个CompletableFuture组合使用示例'
// 等待所有任务完成（allOf）  
CompletableFuture<Void> allTasks = CompletableFuture.allOf(  
        CompletableFuture.runAsync(() ->{  
            sleep(1000);  
            System.out.println(Thread.currentThread()+"任务1");}),  
        CompletableFuture.runAsync(() -> {  
            sleep(1000);  
            System.out.println(Thread.currentThread()+"任务2");  
        })  
);  
// 等待所有任务完成  可能会一直阻塞 建议使用 get 方法设置超时时间  
allTasks.join();  
  
// 任意任务完成即继续（anyOf）  
CompletableFuture<Object> anyTask = CompletableFuture.anyOf(  
        CompletableFuture.supplyAsync(() -> {  
            sleep(2000);  
            System.out.println(Thread.currentThread()+"anyTask任务A完成");  
            return "任务A完成";  
        }),  
        CompletableFuture.supplyAsync(() -> {  
            sleep(1000);  
            System.out.println(Thread.currentThread()+"anyTask任务B完成");  
            return "任务B先完成";  
        })  
);  
// 获取第一个完成的任务结果  
Object result = (String) anyTask.join();  
System.out.println("anyTask第一个完成的任务: " + result);  

//接受前一个任务的结果作为第二个任务的参数 ，并返回一个新任务  
CompletableFuture<String> completableFuture = CompletableFuture  
        .supplyAsync(() -> "Hello")  
        .thenCompose(  
                s -> CompletableFuture.supplyAsync(() -> s + " World")  
        );  
System.out.println(">>completableFuture:" + completableFuture.join());

//对两个任务的结果进行处理 不返回结果值 CompletableFuture<Void> future = CompletableFuture  
        .supplyAsync(() -> "Hello")  
        .thenAcceptBoth(  
                CompletableFuture.supplyAsync(() -> " World"),  
                (s1, s2) -> System.out.println(s1 + s2)  
        );
  
// 组合两个任务的结果  
CompletableFuture<Integer> task1 = CompletableFuture.supplyAsync(() -> 10);  
CompletableFuture<Integer> task2 = CompletableFuture.supplyAsync(() -> 20);  
  
CompletableFuture<Integer> combined = task1.thenCombine(task2, (a, b) -> a + b);  
Integer join = combined.join();  
// 输出结果 30
System.out.println("----------combinedRes"+join);
```

## 最佳实践
### 合理选择线程池
::: info 注意
所有带 `Async` 后缀的方法都可以指定线程池
:::
CompletableFuture 默认使用 ForkJoinPool 线程池，建议不同的任务使用不同的线程池。
```java title='设置线程池示例'
// 避免使用默认线程池（ForkJoinPool.commonPool()）  
// 建议为不同类型的任务创建专用线程池  
ExecutorService executor = Executors.newFixedThreadPool(10,  
        r -> new Thread(r, "completable-future-pool"));  
  
// 使用自定义线程池  
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {  
    // 任务逻辑  
    return "结果";  
}, executor);
```
### 避免无限阻塞

```java title='避免无限阻塞'
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {  
    // 模拟耗时操作  
    sleep(6000);  
    return "结果";  
});  
// 避免在主线程中无限制阻塞  
try {  
    // 使用带超时的get方法  
    String result = future.get(5, TimeUnit.SECONDS);  
} catch (TimeoutException e) {  
    // 处理超时  
    } catch (Exception e) {  
    // 处理其他异常  
}
```
### 异常处理最佳实践
需要处理异常，避免异常被吃掉。
```java title='异常处理'
// 确保异常被正确捕获，避免异步任务中异常丢失  
CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {  
            // 可能抛出异常的代码  
            throw new RuntimeException("异步任务异常");  
        })  
        // 必须处理异常，否则异常会被吞噬  
        .exceptionally(ex -> {  
            System.err.println("捕获异步任务异常: " + ex);  
            return null;  
        });  
  
// 处理链式调用中的异常传播  
CompletableFuture<String> chain = CompletableFuture.supplyAsync(() -> {  
            return "data";  
        })  
        .thenApply(data -> {  
            // 可能抛出异常  
            return process(data);  
        })  
        // 可以再链的最后处理整个链的异常 前面任意节点有异常都会被处理
        .exceptionally(ex -> {  
            log.error("处理链异常", ex);  
            return "default";  
        });
```

## 避坑

1. **异常丢失问题**：异步任务中未处理的异常会被吞噬，建议在每个阶段添加异常处理。
2. **线程池耗尽**：避免使用默认线程池处理大量任务，应根据业务场景使用专用线程池。
3. **阻塞死锁**：在异步任务中避免调用会阻塞当前线程的方法（如无超时的 get ()）。
4. **内存泄漏**：长时间运行的任务应正确处理资源释放，避免资源占用。

## 参考文档
* [CompletableFuture 指南](https://www.baeldung.com/java-completablefuture)
* [java8-docs-CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html)