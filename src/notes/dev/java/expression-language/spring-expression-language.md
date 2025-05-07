---
title: Spel 表达式
date: 2024-12-03 23:50:00
category:
    - 笔记
tag: 
    - Java
    - Spring
    - 后端开发备忘录
star: true
description: Spring Expression Language（简称SpEL）是一种功能强大的表达式语言
---
# Spel 表达式
## 是什么
Spring Expression Language（简称SpEL）是一种功能强大的表达式语言、用于在运行时查询和操作对象图；语法上类似于Unified EL，但提供了更多的特性，特别是方法调用和基本字符串模板函数。

虽然目前已经有许多其他的Java表达式语言，例如OGNL，MVEL和Jboss EL，SpEL的诞生是为了给Spring社区提供一种能够与Spring生态系统所有产品无缝对接，能提供一站式支持的表达式语言。它的语言特性由Spring生态系统的实际项目需求驱动而来，比如基于eclipse的Spring Tool Suite（Spring开发工具集）中的代码补全工具需求。尽管如此、SpEL本身基于一套与具体实现技术无关的API，在需要的时候允许其他的表达式语言实现集成进来。

## 功能特性
* 字符表达式
* 布尔和关系操作符
* 正则表达式
* 类表达式
* 访问properties，arrays，lists，maps等集合
* 方法调用
* 关系操作符
* 赋值
* 调用构造器
* Bean对象引用
* 创建数组
* 内联lists
* 内联maps
* 三元操作符
* 变量
* 用户自定义函数
* 集合投影
* 集合选择
* 模板表达式

## 使用 Spel 接口进行表达式求值

```java title='解析表达式示例'
  public static void main(String[] args) {
        //创建一个 解析器
        ExpressionParser parser = new SpelExpressionParser();
        //解析表达式 获得表达式 对象
        Expression expression = parser.parseExpression("'hello world'");
        System.out.println("hello world:"+expression.getValue());
        
        //表达式里调用方法
        expression = parser.parseExpression("'hello world'.length()");
        System.out.println("hello world.length():"+expression.getValue());
        //表达式里调用方法
        expression = parser.parseExpression("'hello world'.concat('!')");
        System.out.println("hello world.concat('!'):"+expression.getValue());
        //通过表达式获取 java bean 属性
        expression = parser.parseExpression("'hello world'.bytes");
        System.out.println("hello world.bytes:"+Arrays.toString((byte[]) expression.getValue()));
        //通过表达式 获取属性 的属性 支持及联
        expression = parser.parseExpression("'hello world'.bytes.length");
        System.out.println(expression.getValue());

    }
```
## 使用上下文解析表达式 
```java title='使用上下文，解析表达式示例'
        //上下文环境
        StandardEvaluationContext context = new StandardEvaluationContext();
        Object [] args = new Object[]{"hello","h","star","hey","fuck"};
        //设置变量
        context.setVariable("args",args);
        //注册函数
        context.registerFunction("ituc", StringUtils.class.getMethod("getInitialToUpperCase",String.class));

        ExpressionParser parser = new SpelExpressionParser();
        //解析表达式 调用上面注册的函数 传入 变量 args 的第二个元素
        Expression expression = parser.parseExpression("#ituc(#args[2])");

```

## 主要接口
### 1.ExpressionParser接口：
> 表示解析器，默认实现是org.springframework.expression.spel.standard包中的SpelExpressionParser类，使用parseExpression方法将字符串表达式转换为Expression对象
### 2.ParserContext接口 : 
 > ParserContext接口用于定义字符串表达式是不是模板，及模板开始与结束字符：
```java title='示例'
      //上下文环境
        StandardEvaluationContext context = new StandardEvaluationContext();
        Object [] args = new Object[]{"hello","h","star","hey","fuck"};
        //设置变量
        context.setVariable("args",args);
        //注册函数
        context.registerFunction("ituc", StringUtils.class.getMethod("getInitialToUpperCase",String.class));

        ExpressionParser parser = new SpelExpressionParser();
        //解析表达式 加入 parserContext 之后就发现 将表达式当成字符串输出了
        Expression expression = parser.parseExpression("#ituc(#args[2])",new ParserContextImpl());
        System.out.println("首字母大写:"+expression.getValue(context));

        //解析表达式 加入 parserContext 之后就发现 将表达式当成字符串输出了
        Expression expression1 = parser.parseExpression("%{#ituc(#args[2])}%",new ParserContextImpl());
        System.out.println("首字母大写:"+expression1.getValue(context));
输出如下：
//首字母大写:#ituc(#args[2])
//首字母大写:S
```
::: warning
这里演示了模版的用处，ParserContextImpl 里定义了模版 前缀是 "%{" 后缀是 "}%",如果表达式不符合模版 就会被当作字符串.
:::

### EvaluationContext接口：
> 表示上下文环境，默认实现是org.springframework.expression.spel.support包中的StandardEvaluationContext类，使用setRootObject方法来设置根对象，使用setVariable方法来注册自定义变量，使用registerFunction来注册自定义函数等等。
使用方法 参照 第二个示例.
### Expression接口：
表示表达式对象，默认实现是org.springframework.expression.spel.standard包中的SpelExpression，提供getValue方法用于获取表达式值，提供setValue方法用于设置对象值。

## Spel 语法
### 算术运算表达式
> 支持加减乘除.  
> SpEL支持加(+)、减(-)、乘(*)、除(/)、求余（%）、幂（^）运算。  
> SpEL还提供求余（MOD）和除（DIV）两个运算符，与“%”和“/”等价，不区分大小写。
### 关系表达式
> 等于（==）、不等于(!=)、大于(>)、大于等于(>=)、小于(<)、小于等于(<=)
>   
> 区间（between）运算，between运算符右边操作数必须是列表类型，且只能包含2个元素。第一个元素为开始，第二个元素为结束，区间运算是包含边界值的，相当于 xxx>=list.get(0) && xxx<=list.get(1)。  
> SpEL同样提供了等价的“EQ” 、“NE”、 “GT”、“GE”、 “LT” 、“LE”来表示等于、不等于、大于、大于等于、小于、小于等于，不区分大小写。  
### 逻辑表达式
> 且（and）、或(or)、非(!或NOT)。  
> 逻辑运算符不支持 Java中的 && 和 || 。  
### 三目运算及Elivis运算表达式
> 三目运算符 :“表达式1?表达式2:表达式3”用于构造三目运算表达式，如“2>1?true:false”将返回true；  
> Elivis运算符“表达式1?:表达式2”  如“true?:false”将返回true；
### 类相关表达式
> 使用“T(Type)”来表示java.lang.Class实例，“Type”必须是类全限定名，“java.lang”包除外，即该包下的类可以不指定包名

```java title='语法代码示例'
 public static void main(String[] a) throws NoSuchMethodException {
        //上下文环境
        StandardEvaluationContext context = new StandardEvaluationContext();
        Object [] args = new Object[]{1,2,3,4,6};
        //设置变量
        context.setVariable("args",args);

        ExpressionParser parser = new SpelExpressionParser();
        //表达式  加减乘除
        Expression expression = parser.parseExpression("#args[0]+#args[1]-#args[2]*#args[3]/#args[0]");
        System.out.println("加减乘除:"+expression.getValue(context));
        //表达式 求余
        expression = parser.parseExpression("#args[0]%#args[1]");
        System.out.println("求余%:"+expression.getValue(context));
        //表达式 求余 mod
        expression = parser.parseExpression("#args[0]mod#args[1]");
        System.out.println("求余mod:"+expression.getValue(context));
        //关系表达式 以及逻辑表达式
        expression = parser.parseExpression("#args[0]==#args[1]and#args[0]==#args[2]");
        System.out.println("关系表达式:"+expression.getValue(context));
        //关系表达式 between
        expression = parser.parseExpression("#args[0]between{1,3}");
        System.out.println("关系表达式between:"+expression.getValue(context));
        //关系表达式 以及逻辑表达式  三木运算符
        expression = parser.parseExpression("#args[0]==#args[1]and#args[0]==#args[2]?#args[1]!=#args[2]:#args[3]>#args[2]");
        System.out.println("关系表达式加上三目运算符:"+expression.getValue(context));
        //Elivis运算
        expression = parser.parseExpression("#args[0]!=#args[1]?:#args[1]!=#args[2]");
        System.out.println("Elivis运算:"+expression.getValue(context));
        //类相关表达式 获取 类对象 java.lang 下 直接类名 其他包下 需要全限定名
        expression = parser.parseExpression("T(String).getName()");
        System.out.println("类相关表达式 :"+expression.getValue(context));
        //instanceof 表达式
        expression = parser.parseExpression("#args[1] instanceof T(String)");
        System.out.println("instanceof 表达式:"+expression.getValue(context));


    }
```


## 参考文档
* [官方文档](https://docs.spring.io/spring-framework/reference/core/expressions.html)
* [官方文档译文](http://ifeve.com/spring-6-spel/)

