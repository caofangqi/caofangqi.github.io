---
title: 为什么使用 BigDecimal 计算结果会存在误差
date: 2025-03-14 18:28:18
category:
    - 笔记
tag: 
    - Java
    - 问题记录集
    - 后端开发备忘录
description: BigDecimal 使用不当会出精度问题哦
---
# 使用 BigDecimal 计算出现精度问题

## 精度问题怎么出现的
在使用 BigDecimal 的时候，姿势不对 计算结果可能会偏离正确值 出现精度问题
代码如下:
```java title='示例代码'
public static void main(String[] args) {  
  
    BigDecimal bd = new BigDecimal(0.999);  
    System.out.println("使用 double构造 BigDecimal:"+bd.multiply(new BigDecimal(1000)).longValue());  
  
    bd = new BigDecimal("0.999");  
    System.out.println("使用字符串构造 BigDecimal:"+bd.multiply(new BigDecimal("1000")).longValue());  
}
```
使用 1000 乘以 0.999  正常人心算出来结果肯定是 999 。
但是使用 BigDecimal 来计算结果却不是 999，第一个方法计算得出的结果为 998
输出如下
```terimal
使用 double构造 BigDecimal:998
使用字符串构造 BigDecimal:999
```

**这充分说明了 BigDecimal 的构造方法影响着计算精度**
所以，日常中使用 BigDecimal 需要使用 字符串来构造，或者也可以使用 ```valueOf()```  来构造，该方法内部会将 小数转成 string 然后使用构造方法构造,结果是一样的。
```java 
bd = BigDecimal.valueOf(0.999);  
System.out.println("使用valueOf构造 BigDecimal:"+bd.multiply(BigDecimal.valueOf(1000)).longValue());
```

## 为什么会出现这种精度问题

因为 ```new BigDecimal("0.999")``` 字符串是可以准确的表示出十进制小数 0.999的，而 ```newBigDecimal(0.999)``` 中 0.999 是 double 类型，是个近似值，并不能准确的表示出 0.999 这个十进制小数。

### 为什么说 0.999 这个 double 类型是个近似值呢？
因为在计算机系统中根据[IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754)二进制浮点数算术标准是无法精确的表示部分十进制小数的。 比如 0.999 在计算机系统中 其实是 
```0.99899999999999999911182158029987476766109466552734375```这样一个无限近似值的。
所以使用 double 类型来构造 BigDecimal 就是传入这个近似值，而不是 0.999这个精确值。
所以在使用近似值计算之后 出现了误差。

所以切记切记，一定**不要用 double 或者 float  等小数类型直接去构造 BigDecimal 。需要转换成 字符串.** 
