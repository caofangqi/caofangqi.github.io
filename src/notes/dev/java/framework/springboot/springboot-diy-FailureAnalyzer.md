---
title: Spring Boot 自定义启动报错输出信息 FailureAnalyzer
date: 2025-02-18 18:35:00
category:
    - 笔记
tag: 
    - Java 框架
    - 技术笔记
    - Spring Boot
    - Java经验
description: Spring Boot FailureAnalyzer 自定义、提升排查问题的效率
---
# Spring Boot 自定义 启动异常处理器

## FailureAnalyzer 简介

如果 spring boot 启动失败，可能会打印出以下信息:

```text
***************************
APPLICATION FAILED TO START
***************************

Description:

Embedded servlet container failed to start. Port 8080 was already in use.

Action:

Identify and stop the process that is listening on port 8080 or configure this application to listen on another port.
```

异常的描述信息，以及修复异常的 Action。

这部分信息就是 [`FailureAnalyzer`](https://docs.spring.io/spring-boot/3.4.2/api/java/org/springframework/boot/diagnostics/FailureAnalyzer.html) 生成出来进行打印的。

> Spring Boot 内部默认提供了很多 FailureAnalyzer 的实现. 只要命中其中一个FailureAnalyzer就会打印出上面的信息。

启动失败时，会循环所有的 FailureAnalyzer 实现类，并且调用 FailureAnalyzer 的  analyze 方法，只要该方法返回值之后就会停止循环，打印出返回的信息(如果为空就会继续执行下一个 FailureAnalyzer 的 analyze 方法)。

## 自定义 FailureAnalyzer

自定义 FailureAnalyzer 很简单，实现该接口然后 在 **resources/META-INF/spring.factories** 文件里配置如下：

```properties
org.springframework.boot.diagnostics.FailureAnalyzer=\
com.webuy.training.springbootdemo.failureanalyzer.DiyFailureAnalyzer
```

配置多个FailureAnalyzer可以使用 “,” 间隔,如下所示：

```properties
org.springframework.boot.diagnostics.FailureAnalyzer=\
com.webuy.training.springbootdemo.failureanalyzer.DiyFailureAnalyzer, \
com.webuy.training.springbootdemo.failureanalyzer.DiyTwoFailureAnalyzer
```

对比直接实现 FailureAnalyzer 接口，推荐继承 AbstractFailureAnalyzer 抽象类。

AbstractFailureAnalyzer 是 FailureAnalyzer 的一个扩展实现，该扩展会检查要处理的异常的类型中是否存在指定的异常类型(该扩展的子类泛型类型)。如果需要处理指定异常的话，可以继承该抽象类 在子类泛型中指定 需要处理的异常，如果应用启动过程中抛出该异常，会自动匹配到该类进行处理。

如下代码:

```java 

public class DiyFailureAnalyzer extends AbstractFailureAnalyzer<TestException> {

    private Logger logger = LoggerFactory.getLogger(DiyFailureAnalyzer.class);

    private Environment environment;
    private BeanFactory beanFactory;

    /**
     * 如果 需要使用到 Environment 和 BeanFactory 的话，可以像这样使用构造器获取。
     * 如果不需要 使用，可以使用默认构造器
     * @param environment
     * @param beanFactory
     */
    public DiyFailureAnalyzer(Environment environment, BeanFactory beanFactory) {
        this.environment = environment;
        this.beanFactory = beanFactory;
    }

    /**
     * Returns an analysis of the given {@code rootFailure}, or {@code null} if no analysis was
     * possible.
     *
     * @param rootFailure the root failure passed to the analyzer
     * @param cause       the actual found cause
     * @return the analysis or {@code null}
     */
    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, TestException cause) {
        logger.error("测试异常启动失败分析器----------------------------------");
        for (String activeProfile : environment.getActiveProfiles()) {
            logger.error("activeProfile:{}", activeProfile);
        }
        logger.error("beanFactory:{}", beanFactory);
        return new FailureAnalysis("测试异常启动失败分析器,我是报错信息我是报错信息我是报错提示信息", "修复异常，注释掉构造器中的抛异常代码吧", cause);
    }
}
```

```java
@Component
public class TestFacade {


    public TestFacade() {
        throw new TestException("构造器抛个异常");
    }
}
```

```java
public class TestException extends RuntimeException{

    public TestException(String message) {
        super(message);
    }
}
```

在 TestFacade 构造器中抛个自定义异常进行测试,输出如下:

```tex
***************************
APPLICATION FAILED TO START
***************************

Description:

测试异常启动失败分析器,我是报错信息我是报错信息我是报错提示信息

Action:

修复异常，注释掉构造器中的抛异常代码吧
```



## 多个 FailureAnalyzer 执行顺序

默认是按照加载顺序，可以通过  @Order(0) 注解 来调整执行顺序,数字越小，越先执行。

> @Order(0)  先执行 @Order(1)后执行 



## FAQ

###### 自定义不生效怎么办？

> 检查配置文件名称  spring.factories 
>
> 检查配置文件地址  resources/META-INF/spring.factories
>
> 检查配置项   
>
> ```
> org.springframework.boot.diagnostics.FailureAnalyzer=\
> com.webuy.training.springbootdemo.failureanalyzer.DiyFailureAnalyzer
> ```



## 参考文档

* [官方文档-Spring Boot Application-Create Your Own FailureAnalyzer](https://docs.spring.io/spring-boot/how-to/application.html#howto.application.failure-analyzer)
