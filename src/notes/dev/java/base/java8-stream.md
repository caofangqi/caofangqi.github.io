---
title: Java Stream 使用指南
date: 2025-05-29 18:50:00
category:
    - 笔记
tag: 
    - Java
    - lambda
    - 后端开发备忘录
star: true
description: Stream 使用指南(基于 java 8），更简洁更高效处理集合数据
---
# 简介

Java 8 引入的 Stream API 是 Java 编程中一次重要的革新，它带来了函数式编程的思想，让我们可以以更简洁、更高效的方式处理集合数据。Stream API 允许我们以声明式的方式处理数据，就像在流水线中处理物品一样，让数据在各种操作中流动并转换，最终得到我们想要的结果。

## 什么是 Stream​
Stream 是一组支持连续的、函数式操作的元素序列。需要注意的是，Stream 并不是数据结构，它不存储数据，而是通过数据源（如集合、数组等）生成。Stream 具有以下特点：​

- 惰性求值：**只有在终端操作时才会执行实际的计算**​
- 流水线操作：中间操作可以链式调用，最后由终端操作触发执行​
- 支持并行处理：可以轻松利用多核 CPU 进行并行计算


## 与传统循环操作集合数据对比

在 Java 8 之前，处理集合数据通常需要大量的循环和条件判断。例如，过滤列表中的偶数：

```java title='过滤列表中的偶数'
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5); 
List<String> result = new ArrayList<>(); 
for (Integer num : numbers) {
	if (num % 2 == 0) {
		 result.add(String.valueOf(num)); 
	} 
}
```

这段代码包含了**数据遍历**（for 循环）、**条件判断**（if 语句）和**结果收集**（add 操作），逻辑分散且难以扩展。Java 8 引入的 Stream API 通过**声明式编程**和**链式调用**，可以简化为：
```java title='使用 stream 过滤列表中的偶数'
List<String> result = numbers
	.stream()
	.filter(n -> n % 2 == 0)
	.collect(Collectors.toList());
```
代码可读性可扩展性显著提升。写起来很快，看起来也很简介。

# 使用 Stream


## 创建 Stream

```java 
// 1. 从集合创建  
List<String> list = Arrays.asList("a", "b", "c");  
Stream<String> stream = list.stream();// 串行流  
Stream<String> parallelStream = list.parallelStream(); // 并行流  
// 2. 从数组创建  
int[] nums = {1, 2, 3, 4};  
IntStream intStream = Arrays.stream(nums);  
// 3. 从静态工厂方法创建  
Stream<String> ofStream = Stream.of("one", "two");  
IntStream rangeStream = IntStream.range(1, 10);// [1,9]  
// 4. 从文件创建  
try (Stream<String> lines = Files.lines(Paths.get("data.txt"))) {  
    lines.forEach(System.out::println);  
}  
// 5. 生成无限流  
Stream<Integer> infiniteStream =  
        Stream.iterate(0, n -> n + 2)  
                .limit(5); // 0,2,4,6,8
// 6. 随机数流                
Stream<Double> randoms = Stream.generate(Math::random);
```


## Stream 核心操作
Stream 操作分为中间操作 (Intermediate Operations) 和终端操作 (Terminal Operations)。中间操作可以链式调用，不会立即执行，只有当终端操作调用时，整个流水线才会执行。​

::: important
⚠️注意！！！ 流只有终端操作才会执行！
中间操作（如`filter`、`map`）不会立即执行，直到终端操作（如`sum`、`forEach`）触发时才会执行。
:::

### Stream 中间操作 (Intermediate operations)
中间操作会返回一个新的 Stream，允许链式调用多个中间操作。常见的中间操作包括：​

|方法​|描述​|示例​|
|---|---|---|
|filter(Predicate)​|过滤元素，保留符合条件的元素​|stream.filter(e -> e > 5)​|
|map(Function)​|将元素映射为新的元素​|stream.map(e -> e * 2)​|
|flatMap(Function)​|将多个 Stream 合并为一个 Stream​|stream.flatMap(e -> Arrays.stream(e))​|
|distinct()​|去重，根据元素的 equals 方法​|stream.distinct()​|
|sorted()​|按自然顺序排序​|stream.sorted()​|
|sorted(Comparator)​|按自定义比较器排序​|stream.sorted(Comparator.reverseOrder())​|
|limit(long)​|截取前 n 个元素​|stream.limit(10)​|
|skip(long)​|跳过前 n 个元素​|stream.skip(5)​|
|peek(Consumer)​|对每个元素执行操作，主要用于调试​|stream.peek(e -> System.out.println(e))​|


```java title='流的中间操作示例'
//创建随机字符串流  
Stream<UUID> generate = Stream.generate(UUID::randomUUID);  
//截取前 10个字符串  
List<String> uuidList = generate.limit(10)  
        //跳过前 3个字符串  
        .skip(3)  
        //转换为字符串流  
        .map(UUID::toString)  
        //过滤出包含 a 的字符串  
        .filter(s -> s.contains("a"))  
        //去重  
        .distinct()  
        //排序  
        .sorted()  
        //打印  
        .peek(System.out::println)  
        //收集为列表  
        .collect(Collectors.toList());
        
//flatMap 的示例
List<String> l1 = Arrays.asList("a", "b", "c");  
List<String> l2 = Arrays.asList("d", "e", "f");  
Stream<List<String>> stream = Stream.of(l1, l2);  
List<String> res = stream
		//将多个流合并为一个流
		.flatMap(Collection::stream)  
        .collect(Collectors.toList());  
System.out.println(res);
//输出 [a, b, c, d, e, f]
```

### Stream 终端操作​(Terminal Operations)

终端操作会触发流水线的执行，并返回结果。常见的终端操作包括：​

|方法​|描述​|示例​|
|---|---|---|
|forEach(Consumer)​|遍历每个元素​|stream.forEach(System.out::println)​|
|collect(Collector)​|收集元素到集合或进行复杂聚合​|stream.collect(Collectors.toList())​|
|reduce(BinaryOperator)​|归约操作，将元素逐步合并​|stream.reduce((a, b) -> a + b)​|
|count()​|计算元素数量​|long count = stream.count()​|
|min(Comparator)​|获取最小值​|Optional min = stream.min(Comparator.naturalOrder())​|
|anyMatch(Predicate)​|判断是否存在匹配的元素​|boolean hasMatch = stream.anyMatch(e -> e > 10)​|
|allMatch(Predicate)​|判断所有元素是否都匹配​|boolean allMatch = stream.allMatch(e -> e > 0)​|
|noneMatch(Predicate)​|判断所有元素是否都不匹配​|boolean noneMatch = stream.noneMatch(e -> e > 0)​|
|toArray()​|转换为数组​|Object[] array = stream.toArray()​|

```java title='终端操作示例'

//创建随机数字流 取前 10个  
Stream<Double> generate = Stream.generate(Math::random).limit(10);  
//遍历输出 流中元素  
generate.forEach(System.out::println);  
//统计流中元素个数  
long count = generate.count();  
//收集成 List
List<Double> collect = generate.collect(Collectors.toList());  
//获取最大值  
Optional<Double> max = generate.max(Double::compareTo);  
//获取最小值  
Optional<Double> min = generate.min(Double::compareTo);  
//获取平均值  
OptionalDouble average = generate.mapToDouble(Double::doubleValue).average();  
//获取总和  
double sum = generate.mapToDouble(Double::doubleValue).sum();  
//收集成 Set
Set<Double> set = generate.collect(Collectors.toSet());  
//合并 将元素依次合并  这里是合并出了所有元素之和  
Optional<Double> reduce = generate.reduce(Double::sum);  
//任意一个元素满足条件返回 true
boolean b = generate.anyMatch(d -> d > 0.5);  
//所有元素满足条件返回 true
boolean b1 = generate.allMatch(d -> d > 0.5);  
//没有元素满足条件返回 true
boolean b2 = generate.noneMatch(d -> d > 0.5);  
//对流中元素汇总统计 count、min、max、sum和average  
DoubleSummaryStatistics stats = generate.mapToDouble(Double::doubleValue).summaryStatistics();  
//获取第一个元素  
Optional<Double> findFirst = generate.findFirst();  
//获取任意一个元素  
Optional<Double> findAny = generate.findAny();
```

## Stream 高级特性
### 并行流 
Stream API 最强大的特性之一就是支持并行处理，只需简单地将顺序流转换为并行流，就可以利用多核 CPU 提高处理性能：
```java title='示例'
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);  
  
// 顺序流计算  
long sequentialSum = numbers.stream()  
        .mapToInt(Integer::intValue)  
        .sum();  
  
// 并行流计算  
long parallelSum = numbers.parallelStream()  
        .mapToInt(Integer::intValue)  
        .sum();
```
需要注意的是，并行流并不总是比顺序流快，在以下情况下并行流效果更好：​

- 数据集较大​
- 操作复杂度高​
- 任务可以分解为独立的子任务​
- 没有复杂的同步需求

并行流基于 `Fork/Join` 框架实现，它将一个大任务分解为多个小任务，然后在多个线程上并行执行，最后合并结果。默认情况下，并行流使用公共的 `ForkJoinPool`，其线程数等于处理器核心数。
可以通过以下方式自定义并行流的线程池：
```java
ForkJoinPool customPool = new ForkJoinPool(4); // 创建一个包含4个线程的线程池  
customPool.submit(  
        () -> numbers.parallelStream().map(n -> n * n)  
        .forEach(s -> System.out.println(Thread.currentThread()+">>>>>>>>>>>:"+s))  
).join();
```

### 收集器 (Collectors)​
Collectors 类提供了强大的收集器，让我们可以进行复杂的数据聚合操作：​
```java title='示例'
List<Person> people = getPeople();  
  
// 按年龄分组  
Map<Integer, List<Person>> peopleByAge = people.stream()  
        .collect(Collectors.groupingBy(Person::getAge));  
  
// 计算平均年龄  
Double averageAge = people.stream()  
        .collect(Collectors.averagingInt(Person::getAge));  
  
// 按年龄分组并计算每组人数  
Map<Integer, Long> countByAge = people.stream()  
        .collect(Collectors.groupingBy(  
                Person::getAge,  
                Collectors.counting()  
        ));  
  
// 转换为Map，键为姓名，值为Person对象  
Map<String, Person> personMap = people.stream()  
        .collect(Collectors.toMap(  
                Person::getName,  
                p -> p,  
                (p1, p2) -> p1 // 解决key冲突的策略 否则冲突时会抛出异常  
        ));
```
### 归约操作 (Reduce)
归约操作可以将 Stream 中的元素逐步合并成一个结果：​
```java title='示例'
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);  
  
// 计算总和  
Integer sum = numbers.stream()  
        .reduce(0, (a, b) -> a + b);  
  
// 寻找最大值  
Optional<Integer> max = numbers.stream()  
        .reduce((a, b) -> a > b ? a : b);  
  
// 复杂对象的归约  
List<Order> orders = getOrders();  
//求和  
BigDecimal totalAmount = orders.stream()  
        .map(Order::getAmount)  
        .reduce(BigDecimal.ZERO, BigDecimal::add);
```

# 最佳实践
## Stream 的一次性使用​
Stream 只能被使用一次，一旦调用了终端操作，就不能再使用该 Stream 了：​
```java title='示例'
Stream<String> stream = Stream.of("a", "b", "c");  
  
// 第一次使用  
long count = stream.count();  
  
// 第二次使用会抛出异常  
stream.forEach(System.out::println); // 抛出IllegalStateException : stream has already been operated upon or closed
```
## 行为参数的无状态性​
传递给 Stream 操作的 lambda 表达式应该是无状态的，避免修改外部变量：​
```java
// 反例：修改外部集合   错误示范
List<String> result = new ArrayList<>();  
stream.filter(s -> {  
    result.add(s); // 避免在lambda中修改外部状态  
    return s.length() > 3;  
});  
  
// 正确做法：使用收集器  
List<String> validStrings = stream  
        .filter(s -> s.length() > 3)  
        .collect(Collectors.toList());
```

## 装箱与拆箱的性能影响​
尽量使用基本类型特化的 Stream（如 IntStream、LongStream、DoubleStream），避免自动装箱拆箱的性能开销：​
```java title='示例'
// 反例：使用Stream<Integer>，会有装箱开销

int sum = numbers.stream()
	.mapToInt(Integer::intValue)
	.sum();

// 推荐：直接使用IntStream

int sum = Arrays.stream(numbers)
	.sum();
```

## 短路操作的使用​

利用短路操作（如 anyMatch、findFirst 等）可以提前终止 Stream 处理，提高性能：
```java title='示例'
// 检查是否存在满足条件的元素，找到第一个就返回  
boolean hasValid = list.stream()  
        .anyMatch(e -> e.isValid());  
  
// 找到第一个满足条件的元素  
Optional<Element> firstValid = list.stream()  
        .filter(Element::isValid)  
        .findFirst();
```
## 资源管理​

对于需要关闭的 Stream（如从文件创建的 Stream），应该使用 try-with-resources 来确保资源被正确释放：
```java title='示例'
try (Stream<String> lines = Files.lines(Paths.get("data.txt"))) {  
    lines.forEach(System.out::println);  
} catch (IOException e) {  
    e.printStackTrace();  
}
```

# 总结
使用 Stream API 可以写出更简洁、更高效、更易读的代码。在实际应用中，我们需要根据数据量大小、操作类型和性能需求，合理选择顺序流或并行流，正确使用各种操作符和收集器，避免常见的陷阱。


# 参考文档
* [Stream java8 docs](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
* [Stream in java](https://www.geeksforgeeks.org/stream-in-java/)
* [java 8 Stream 流操作详解](https://www.cnblogs.com/cuijinlong/p/17463667.html)
* [廖雪峰-使用 Stream](https://liaoxuefeng.com/books/java/functional/stream/index.html)