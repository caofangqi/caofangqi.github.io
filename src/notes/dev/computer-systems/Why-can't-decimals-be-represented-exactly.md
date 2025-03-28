---
title: 为什么有些十进制小数使用二进制无法精确表示
date: 2025-03-18 18:38:18
category:
    - 笔记
tag: 
    - Computer Systems
    - 后端开发备忘录
description: 十进制小数转换二进制精度丢失问题
---
# 为什么有些十进制小数使用二进制无法精确表示

## 十进制小数 部分如何转换成二进制

十进制小数转换成二进制小数采用"**乘2取整，顺序排列"** 法。具体做法是：用2乘十进制小数，可以得到积，将积的整数部分取出，再用2乘余下的小数 部分，又得到一个积，再将积的整数部分取出，如此进行，直到积中的小数部分为零，或者达到所要求的精度为止。

然后把取出的整数部分按顺序排列起来，先取的整数作为二进制小数的高位有效位，后取的整数作为低位有效位。

例如把（0.8125）转换为二进制小数。
```shell
0.8125 * 2 = 1.625  取整数部分 1 小数部分 0.625 
0.625  * 2 = 1.25   取整数部分 1 小数部分 0.25
0.25   * 2 = 0.5    取整数部分 0 小数部分 0.5
0.5    * 2 = 1.0    取整数部分 1 小数部分 0
小数部分为零 停止转换
0.8125 的二进制为 0.1101
```
转换方法如上，可用在线工具验证[在线进制转换器](https://www.jyshare.com/front-end/58/)

上面的数是可以精确表示的，不能精确表示的情况如下:
十进制小数 0.3 转换成 二进制
```shell 
1. 0.3 × 2 = 0.6 → 整数部分为 0，剩余小数部分 0.6
2. 0.6 × 2 = 1.2 → 整数部分为 1，剩余小数部分 0.2
3. 0.2 × 2 = 0.4 → 整数部分为 0，剩余小数部分 0.4
4. 0.4 × 2 = 0.8 → 整数部分为 0，剩余小数部分 0.8
5. 0.8 × 2 = 1.6 → 整数部分为 1，剩余小数部分 0.6
6. 0.6 × 2 = 1.2 → 进入循环（重复步骤2）
```
0.3 转换成二进制就会陷入无限循环，系统里存储是有位数限制的，根据位数截断之后最终存下的就是一个近似值
> 0.299999999999999988897769753748434595763683319091796875

所以在要求精度的场景，需要格外注意。
[使用 BigDecimal 需要注意的](/notes/dev/java/base/BigDecimal-construction-precision.md)

# 参考资料

* [十进制小数转化为二进制小数](https://www.runoob.com/w3cnote/decimal-decimals-are-converted-to-binary-fractions.html)

* [IEEE-754 Floating Point Converter](https://www.h-schmidt.net/FloatConverter/IEEE754.html)