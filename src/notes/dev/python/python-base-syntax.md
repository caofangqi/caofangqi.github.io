---
title: Python 基础语法
date: 2024-12-29 22:20:00
category:
    - 笔记
tag: 
    - Python
    - 后端开发备忘录
description: Python 基础语法&类和实例&异常&函数等
---

# python 基础语法

## 变量

变量是可以赋给值的标签，也可以说变量指向特定的值

> 变量名只能包含字母、数字和下划线。变量名能以字母或下划线打头，但不能以数字开头
> 
> 变量名不能包含空格，但能使用下划线来分隔其中的单词。例如，变量名greeting_message可行，但变量名greeting message会引发错误

```python
#定义变量 message ,使用 print 函数打印出变量
message = "Hello Python world!"
print(message)
```

## 变量赋值

```python
#单个变量赋值直接=
message = "Hello Python world!"
```

### 同时给多个变量赋值

将变量x、y和z都初始化为零

```python
>>>x,y,z = 0,0,0
```

用逗号将变量名分开；对于要赋给变量的值，也需同样处理。Python将按顺序将每个值赋给对应的变量。需要变量和值的个数相同。

### 常量

常量类似于变量，但其值在程序的整个生命周期内保持不变。

Python没有内置的常量类型，但通常会使用全大写来指出应将某个变量视为常量，其值应始终不变。

```python
MAX_CONNECTIONS = 5000
```

## 数据类型

### 字符串

字符串就是一系列字符。在Python中，用引号括起的都是字符串，其中的引号可以是单引号，也可以是双引号

```python
"This is a string."
'This is also a string.'

#在字符串中包含单引号和双引号
'I told my friend,"Python is my favorite language!"'
"The language 'Python'is named after Monty Python,not the snake."
"One of Python's strengths is its diverse and supportive community."


#字符串首字母大写
name = "ada lovelace"
print(name.title())
> 输出：Ada Lovelace

name = "Ada Lovelace"
#字符串全部大写
print(name.upper())
#字符串全部小写
print(name.lower())
```

#### 字符串中使用变量

要在字符串中插入变量的值，可在前引号前加上字母f（见❶）​，再将要插入的变量放在花括号内。这种字符串名为f字符串。f是format（设置格式）的简写.

```python
  first_name = "ada"
  last_name = "lovelace"
  full_name = f"{first_name} {last_name}"
  print(full_name)
```

f字符串是Python 3.6引入的。如果使用的是Python 3.5或更早的版本，需要使用format()方法，而非这种f语法.

```python
full_name = "{} {}".format(first_name,last_name)
```

#### 去除字符串首尾空白

```python
message = 'hello '
#去除末尾空白 返回新的字符串
message.rstrip()
#去除开头空白 返回新的字符串
message.lstrip()
#去除两边空白 返回新的字符串
message.strip()
```

### 整数

在Python中，可对整数执行加(+)减(-)乘(*)除(/)运算。

```python
>>>2 + 3
5
>>>3 - 2
1
>>>2 * 3
6
>>>3 / 2
1.5
#Python使用两个乘号表示乘方运算(幂运算)：
>>>3 ** 2 # 3的2次方
9
>>>3 ** 3
27
>>>10 ** 6
1000000
# 使用圆括号来修改运算次序，括号内的先进行运算
>>>2 + 3*4
14
>>>(2 + 3) * 4
20
```

### 浮点数

Python将所有带小数点的数称为浮点数。大多数编程语言使用了这个术语，它指出了这样一个事实：小数点可出现在数的任何位置。

```python
>>>0.1 + 0.1
0.2
>>>0.2 + 0.2
0.4
>>>2 * 0.1
0.2
>>>2 * 0.2
0.4
# 需要注意的是，结果包含的小数位数可能是不确定的：
>>>0.2 + 0.1
0.30000000000000004
>>>3 * 0.1
0.30000000000000004
```

#### 整数和浮点数

将任意两个数相除时，结果总是浮点数，即便这两个数都是整数且能整除：

```python
>>>4/2
2.0
```

其他运算时，只要有操作数是浮点数，Python默认得到的总是浮点数，即便结果原本为整数也是如此。

```python
>>>1 + 2.0
3.0
>>>2 * 3.0
6.0
>>>3.0 ** 2
9.0
```

#### 下划线分隔大数

书写很大的数时，可使用下划线将其中的数字分组，使其更清晰易读

```python
>>>universe_age = 14_000_000_000
```

存储这种数时，Python会忽略其中的下划线。将数字分组时，即便不是将每三位分成一组，也不会影响最终的值。在Python看来，1000与1_000没什么不同，1_000与10_00也没什么不同。这种表示法适用于整数和浮点数，但只有Python 3.6和更高的版本支持。

#### 行与缩进

python最具特色的就是使用缩进来表示代码块，不需要使用大括号 {} 。

缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数。实例如下：

```python
if True:
    print ("True")
else:
    print ("False")
```

```python
#以下代码最后一行语句缩进数的空格数不一致，会导致运行错误：

if True:
    print ("Answer")
    print ("True")
else:
    print ("Answer")
  print ("False")    # 缩进不一致，会导致运行错误
```

```shell
 File "test.py", line 6
    print ("False")    # 缩进不一致，会导致运行错误
                                      ^
IndentationError: unindent does not match any outer indentation level
```



## 注释

在Python中，注释用井号(#)标识。井号后面的内容都会被Python解释器忽略，

```python
#这是注释
message = 'hello world'
#多行注释可以用多个 # 号，还有 ''' 和 """：
 
# 第一个注释
# 第二个注释
 
'''
第三注释
第四注释
'''
 
"""
第五注释
第六注释
"""
print ("Hello, Python!")
```

## 列表

列表由一系列按特定顺序排列的元素组成

在Python中，用方括号([​])表示列表，并用逗号分隔其中的元素

```python
#创建空列表
kong = []
# 创建一个有元素的列表
bicycles = ['trek','cannondale','redline','specialized']
print(bicycles)
>>> ['trek','cannondale','redline','specialized']
```

### 访问列表元素

可以直接根据索引访问，索引从 0 开始

```python
  bicycles = ['trek','cannondale','redline','specialized']
  # 直接根据索引访问 索引从 0 开始 下面访问元素 'trek'
  print(bicycles[0])
  >>> trek
```

输入索引-1 访问最后一个元素

```python
bicycles = ['trek','cannondale','redline','specialized']
print(bicycles[-1])
>>> specialized
```

在不知道列表长度的情况下访问最后的元素。这种约定也适用于其他负数索引。例如，索引-2返回倒数第二个列表元素，索引-3返回倒数第三个列表元素，依此类推。

### 修改列表元素

```python
  bicycles = ['trek','cannondale','redline','specialized']
  bicycles[0]='hahahaha'
  print(bicycles[0])
  >>> hahahaha
```

### 添加元素

#### 在列表末尾添加元素

```python
  motorcycles = ['honda','yamaha','suzuki']
  print(motorcycles)
  # 使用 append 方法在末尾添加元素
  motorcycles.append('ducati')
  print(motorcycles)
  #输出如下
>>> ['honda','yamaha','suzuki']
>>> ['honda','yamaha','suzuki','ducati']
```

#### 在列表中插入元素

使用方法insert()可在列表的任何位置添加新元素

```python
  motorcycles = ['honda','yamaha','suzuki']
   # 在索引 0 的位置插入 值 ducati
  motorcycles.insert(0,'ducati')
  print(motorcycles)
```

方法insert()在索引0处添加空间，并将值'ducati'存储到这个地方。这种操作将列表中既有的每个元素都右移一个位置：

### 删除元素

#### del 根据索引删除元素

```python
  motorcycles = ['honda','yamaha','suzuki']
  print(motorcycles)
# 使用del删除了列表motorcycles中的第一个元素'honda'：
  del motorcycles[0]
  print(motorcycles)
```

使用del可根据索引删除任意位置处的列表元素。

#### 使用方法 pop 删除元素

方法pop()删除列表末尾的元素.

```python
 motorcycles = ['honda','yamaha','suzuki']
# 弹出末尾元素 suzuki 赋值给变量 a
 a = motorcycles.pop()
 print(motorcycles)
 print(a)
```

也可以使用pop()来删除列表中任意位置的元素，在参数中指定要删除元素的索引即可。

```python
  motorcycles = ['honda','yamaha','suzuki']
  first_owned = motorcycles.pop(0)
 print(f"The first motorcycle I owned was a {first_owned.title()}.")
  >>> The first motorcycle I owned was a Honda.
```

#### remove 根据值删除元素

```python
  motorcycles = ['honda','yamaha','suzuki']
  first_owned = motorcycles.remove('honda')
  print(first_owned)
```

方法remove()只删除第一个指定的值。如果要删除的值可能在列表中出现多次，就需要使用循环来确保将每个值都删除。

### 列表排序

方法sort() 会修改列表元素的排列顺序。

```python
  cars = ['bmw','audi','toyota','subaru']
#根据字母顺序 正序排列
  cars.sort()
  # 根据字母顺序逆序排列
  cars.sort(reverse=True)
  print(cars)
```

也可以使用 sorted() 函数排序，该函数不改变原来列表的顺序 返回新的列表。

```python
cars = ['bmw','audi','toyota','subaru']
new_cars = sorted(cars)
#该函数同样支持 reverse 参数进行逆序排列 sorted(cars,reverse=True) 
print(cars)
print(new_cars)
#输出如下
['bmw', 'audi', 'toyota', 'subaru']
['audi', 'bmw', 'subaru', 'toyota']
```

反转列表顺序

```python
cars = ['bmw','audi','toyota','subaru']
print(cars)
cars.reverse()
print(cars)
#输出如下
['bmw', 'audi', 'toyota', 'subaru']
['subaru', 'toyota', 'audi', 'bmw']
```

### 列表长度获取 len

```python
>>>cars = ['bmw','audi','toyota','subaru']
>>>len(cars)
4
```

### 遍历列表

简单遍历所有元素,语法如下：

**for语句末尾有冒号**

> for  变量名  in  列表:

```python
 magicians = ['alice','david','carolina']
 for magician in magicians:
     print(magician)
```

循环打印列表中元素.

```shell
alice
david
carolina
```

在for循环中，想包含多少行代码都可以。在代码行for magician in magicians后面，每个缩进的代码行都是循环的一部分，将针对列表中的每个值都执行一次。因此，可对列表中的每个值执行任意次数的操作

```python
  magicians = ['alice','david','carolina']
  for magician in magicians:
      print(f"{magician.title()},that was a great trick!")
      print(f"I can't wait to see your next trick,{magician.title()}.\n")
```

```shell
#输出如下
Alice,that was a great trick!
I can't wait to see your next trick,Alice.

David,that was a great trick!
I can't wait to see your next trick,David.

Carolina,that was a great trick!
I can't wait to see your next trick,Carolina.
```

### 使用 range() 创建数字列表

要创建数字列表，可使用函数list()将range()的结果直接转换为列表。如果将range()作为list()的参数，输出将是一个数字列表。

```python
numbers = list(range(1,6))
print(numbers)
#输出
[1,2,3,4,5]
```

使用函数range()时，还可指定步长。为此，可给这个函数指定第三个参数，Python将根据这个步长来生成数。

```python
#打印1～10的偶数：
even_numbers = list(range(2,11,2))
print(even_numbers)
#输出如下
[2,4,6,8,10]
```

使用函数range()几乎能够创建任何需要的数集。例如，如何创建一个列表，其中包含前10个整数(1～10)的平方呢？在Python中，用两个星号(**)表示乘方运算。下面的代码演示了如何将前10个整数的平方加入一个列表中：

```python
❶ squares = [] #创建空列表
❷ for value in range(1,11): #定义循环遍历 1～ 11 的值
❸     square = value ** 2 # 计算平方
❹     squares.append(square) # 计算结果添加到空列表

❺ print(squares)
#输出如下
[1,4,9,16,25,36,49,64,81,100]
```

### 列表解析

```python
# value**2 是表达式 ， for value in range(1,11) 是循环，循环执行表达式并且保存表达式计算结果
squares = [value**2 for value in range(1,11)]
print(squares)
#输出如下
[1,4,9,16,25,36,49,64,81,100]
```

### 列表切片

要创建切片，可指定要使用的第一个元素和最后一个元素的索引。与函数range()一样，Python在到达第二个索引之前的元素后停止。

要输出列表中的前三个元素，需要指定索引0和3，这将返回索引为0、1和2的元素。

```python
  players = ['charles','martina','michael','florence','eli']
❶ print(players[0:3])
  #输出
  ['charles','martina','michael']
```

可以使用切片生成列表的任意子集。例如，如果要提取列表的第二、第三和第四个元素，可将起始索引指定为1，并将终止索引指定为4：

```python
players = ['charles','martina','michael','florence','eli']
print(players[1:4])
#输出
['martina','michael','florence']
```

**如果没有指定第一个索引，Python将自动从列表开头开始**

```python
players = ['charles','martina','michael','florence','eli']
print(players[:4])
#输出
['charles','martina','michael','florence']
```

同样，没有制定最后一个索引，将从结尾结束

```python
players = ['charles','martina','michael','florence','eli']
print(players[2:])
#输出如下
['michael','florence','eli']
```

无论列表多长，这种语法都能够让你输出从特定位置到列表末尾的所有元素。上一章说过，负数索引返回离列表末尾相应距离的元素，因此你可以输出列表末尾的任意切片。例如，如果要输出名单上的最后三名队员，可使用切片players[-3:]​：

```python
players = ['charles','martina','michael','florence','eli']
print(players[-3:])
```

**可在表示切片的方括号内指定第三个值。这个值告诉Python在指定范围内每隔多少元素提取一个。**

```python
cars = ['bmw','audi','toyota','subaru','su7']
#0表示开始索引 5 是结束索引 2 是隔多个少元素
print(cars[0:5:2])
#输出
['bmw', 'toyota', 'su7']
```

 可使用切片复制列表

```python
cars = ['bmw','audi','toyota','subaru','su7']
#复制列表 
new_cars = cars[:]
```

### 数字列表统计和计算

```python
>>>digits = [1,2,3,4,5,6,7,8,9,0]
>>>min(digits)
0
>>>max(digits)
9
>>>sum(digits)
45
```

## 元祖

列表是可以修改的，有时候你需要创建一系列不可修改的元素，元组可以满足这种需求

### 定义元祖

```python
❶ dimensions = (200,50)
❷ print(dimensions[0])
  print(dimensions[1])
```

首先定义元组dimensions（见❶）​，使用了**圆括号**圆括号而不是方括号

严格地说，元组是由逗号标识的，圆括号只是让元组看起来更整洁、更清晰。如果你要定义只包含一个元素的元组，必须在这个元素后面加上逗号：

```python
my_t = (3,)
```

元祖遍历方式和列表相同

```python
dimensions = (200,50)
for dimension in dimensions:
    print(dimension)
```

## If 语句

```python
  cars = ['audi','bmw','subaru','toyota']

  for car in cars:
       #如果 == bmw 全大写打印 否则首字母大写
❶     if car == 'bmw':
          print(car.upper())
      else:
          print(car.title())
```

### 条件测试/布尔表达式

每条if语句的核心都是一个值为True或False的表达式，这种表达式称为条件测试。

Python根据条件测试的值为True还是False来决定是否执行if语句中的代码。如果条件测试的值为True,Python就执行紧跟在if语句后面的代码；如果为False,Python就忽略这些代码。

#### 判断是否相等

判断相等可以使用 == 

```python
# 给变量赋值
❶ >>>car = 'bmw'
# 判断是否相等
❷ >>>car == 'bmw'
  True
```

相等运算符在两边的值相等时返回True，否则返回False。

在Python中检查是否相等时区分大小写。例如，两个大小写不同的值被视为不相等：

```python
>>>car = 'Audi'
>>>car == 'audi'
False
```

#### 判断是否不相等

要判断两个值是否不等，可使用(!=)

```python
  requested_topping = 'mushrooms'

❸ if requested_topping != 'anchovies':
      print("Hold the anchovies!")
```

如果不相等，表达式将返回True，如果相等，将返回False，

#### 数值比较

支持数学逻辑运算，如等等于、小于、小于等于、大于、大于等于

```python
>>>age = 18
>>>age == 18
True
>>>age = 19
>>>age <21
True
>>>age <= 21
True
>>>age >21
False
>>>age >= 21
False
```

#### 多个条件运算

支持 and 、 or 运算

```python
❸ >>>age_0 = 22
  >>>age_1 = 18
#其中一个条件为False 结果为 False
❷ >>>age_0 >= 21 and age_1 >= 21
  False
❸ >>>age_1 = 22
#两个条件都为True 结果为 True 
  >>>age_0 >= 21 and age_1 >= 21
  True

❶ >>>age_0 = 22
  >>>age_1 = 18
#有一个条件为True 结果为True  
❷ >>>age_0 >= 21 or age_1 >= 21
  True
❸ >>>age_0 = 18
# 两个条件都为 False 结果为 False
  >>>age_0 >= 21 or age_1 >= 21
  False
```

#### 判断值是否在列表中

使用 in 关键字 可以判断元素是否在列表中

```python
  >>>requested_toppings = ['mushrooms','onions','pineapple']
❶ >>>'mushrooms'in requested_toppings
  True
❷ >>>'pepperoni'in requested_toppings
  False
```

使用 not in 关键字 可以判断元素是否不在列表中

```python
  banned_users = ['andrew','carolina','david']
  user = 'marie'

❶ if user not in banned_users:
      print(f"{user.title()},you can post a response if you wish.")
```

### if 语句语法

#### 简单的 if 语句

```python
if conditional_test:
    do something
```

第一行可包含任何条件测试，而在紧跟在条件测试后面的缩进代码块中，可执行任何操作。如果条件测试的结果为True,就会执行紧跟在if语句后面的代码，否则将忽略这些代码。

#### if-else 语句

```python
if conditional_test:
    do something1
else
    do something2
```

表达式为 True 执行1，表达式为 False 执行 else 后面的代码块。

#### if-elif-else 结构

只执行if-elif-else结构中的一个代码块。它依次检查每个条件测试，直到遇到通过了的条件测试。测试通过后，将执行紧跟在它后面的代码，并跳过余下的测试。

```python
  age = 12

  if age <4:
❶     price = 0
  elif age <18:
❷     price = 25
  else:
❸     price = 40

❹ print(f"Your admission cost is ${price}.")
  #输出
  Your admission cost is $25.
```

elif 可以使用任意个。

#### if 检查空列表

```python
❶ requested_toppings = []

❷ if requested_toppings:
      for requested_topping in requested_toppings:
          print(f"Adding {requested_topping}.")
      print("\nFinished making your pizza!")
❸ else:
      print("Are you sure you want a plain pizza?")
```

在if语句中将列表名用作条件表达式时，Python将在列表至少包含一个元素时返回True，并在列表为空时返回False



## while 循环

```python
current_number = 1
#设置条件 表达式 current_number <= 5 结果为 True 就会一直允许
while current_number <= 5:
    print(current_number)
    current_number += 1
```

### break

```python
current_number = 1
#设置条件 表达式 current_number <= 5 结果为 True 就会一直允许
while current_number <= 5:
    print(current_number)
    current_number += 1
    if current_number > 3 : 
        #break 可以立刻退出 while 循环
        break
```

### continue

要返回循环开头，并根据条件测试结果决定是否继续执行循环，可使用continue语句

```python
  current_number = 0
  while current_number <10:
❶     current_number += 1
      if current_number % 2 == 0:
          #回到 while 开头那一行继续执行
          continue

      print(current_number)
```



## 字典

在Python中，字典是一系列键值对。每个键都与一个值相关联，你可使用键来访问相关联的值。与键相关联的值可以是数、字符串、列表乃至字典.

在Python中，字典用放在花括号({})中的一系列键值对表示，如下所示：

```python
#定义空字典
kong = {}
#定义字典
alien_0 = {'color':'green','points':5}
```

键值对是两个相关联的值。指定键时，Python将返回与之相关联的值。键和值之间用冒号分隔，而键值对之间用逗号分隔。

### 访问字典值

> 字典名[键]

```python
alien_0 = {'color':'green'}
print(alien_0['color'])
#上面访问方式 如果 键不存在 就会报错 
#使用get 访问值，第一个参数是键 第二个参数是键不存在时返回的值.
alien_0.get('color','red')
```

### 新增/修改 键值对

字典是一种动态结构，可随时在其中添加键值对。

> 字典名[键]=值

```python
  alien_0 = {'color':'green','points':5}
  print(alien_0)
#键不存在则新增 存在则修改
❶ alien_0['x_position'] = 0
❷ alien_0['y_position'] = 25
  print(alien_0)
  #输出
{'color':'green','points':5}
{'color':'green','points':5,'x_position':0,'y_position':25}
```

### 删除键值对

使用del语句将相应的键值对彻底删除。使用del语句时，必须指定字典名和要删除的键。

```python
  alien_0 = {'color':'green','points':5}
  print(alien_0)
#删除 key
❶ del alien_0['points']
  print(alien_0)
```

### 遍历字典

#### 遍历所有键值对

```python
  user_0 = {
      'username':'efermi',
      'first':'enrico',
      'last':'fermi',
      }
#使用for循环 key value 为定义的变量，分别对应字典中键和值
for key,value in user_0.items():
     print(f"\nKey:{key}")
     print(f"Value:{value}")
```

### 遍历所有键

```python
  favorite_languages = {
      'jen':'python',
      'sarah':'c',
      'edward':'ruby',
      'phil':'python',
      }
# 字典的 key()函数获取字典所有key 然后可以进行遍历
for name in favorite_languages.keys():
      print(name.title())
 # 可以隐藏 key() 函数 效果是一样的。
 for name in favorite_languages:
   print(name.title())
```

#### 遍历所有值

```python
favorite_languages = {
    'jen':'python',
    'sarah':'c',
    'edward':'ruby',
    'phil':'python',
    }

print("The following languages have been mentioned:")
# 使用 value()函数 获取所有 value
for language in favorite_languages.values():
    print(language.title())
```

## 函数

### 定义函数

```python
#定义函数
 def greet_user():
     """显示简单的问候语。"""
     print("Hello!")

 #调用函数
 greet_user()
```

### 传递参数

代码greet_user('jesse')调用函数greet_user()，并向它提供执行函数调用print()所需的参数

```python
def greet_user(username):
    """显示简单的问候语。"""
    print(f"Hello,{username.title()}!")

greet_user('jesse')
```

#### 实参和形参

在函数greet_user()的定义中，变量username是一个形参(parameter)，即函数完成工作所需的信息。在代码greet_user('jesse')中，值'jesse'是一个实参(argument)，即调用函数时传递给函数的信息

#### 位置实参

调用函数时，Python必须将函数调用中的每个实参都关联到函数定义中的一个形参。为此，最简单的关联方式是基于实参的顺序。这种关联方式称为位置实参。

**位置实参，要求实参的顺序与形参的顺序相同；**

```python
❶ def describe_pet(animal_type,pet_name):
      """显示宠物的信息。"""
      print(f"\nI have a {animal_type}.")
      print(f"My {animal_type}'s name is {pet_name.title()}.")

❷ describe_pet('hamster','harry')
```

以上函数调用中，实参'hamster'被赋给形参animal_type，而实参'harry'被赋给形参pet_name（见❷）​。在函数体内，使用了这两个形参来显示宠物的信息。

执行结果如下:

```shell
I have a hamster.
My hamster's name is Harry.
```

#### 关键字实参

关键字实参是传递给函数的名称值对。因为直接在实参中将名称和值关联起来，所以向函数传递实参时不会混淆。

关键字实参让你无须考虑函数调用中的实参顺序，还清楚地指出了函数调用中各个值的用途。

```python
def describe_pet(animal_type,pet_name):
    """显示宠物的信息。"""
    print(f"\nI have a {animal_type}.")
    print(f"My {animal_type}'s name is {pet_name.title()}.")
#指定参数
describe_pet(animal_type='hamster',pet_name='harry')
```

#### 参数默认值

编写函数时，可给每个形参指定默认值。在调用函数中给形参提供了实参时，Python将使用指定的实参值；否则，将使用形参的默认值。因此，给形参指定默认值后，可在函数调用中省略相应的实参。使用默认值可简化函数调用

```python
def describe_pet(pet_name,animal_type='dog'):
    """显示宠物的信息。"""
    print(f"\nI have a {animal_type}.")
    print(f"My {animal_type}'s name is {pet_name.title()}.")
#调用时 可不传有默认值的参数
describe_pet(pet_name='willie')
```

使用默认值时，形参列表中没有默认值的形参必须在前，有默认值的实参在后。这让Python依然能够正确地解读位置实参。

#### 传递任意参数的实参

```python
def make_pizza(*toppings):
    """打印顾客点的所有配料。"""
    print(toppings)

make_pizza('pepperoni')
make_pizza('mushrooms','green peppers','extra cheese')

#输出
('pepperoni',)
('mushrooms','green peppers','extra cheese')
```

形参名*toppings中的星号让Python创建一个名为toppings的空元组，并将收到的所有值都封装到这个元组中

#### 传递任意参数的关键词实参

```python
  def build_profile(first,last,**user_info):
      """创建一个字典，其中包含我们知道的有关用户的一切。"""
❶     user_info['first_name'] = first
      user_info['last_name'] = last
      return user_info

  user_profile = build_profile('albert','einstein',
                               location='princeton',
                               field='physics')
  print(user_profile)
```

函数build_profile()的定义要求提供名和姓，同时允许根据需要提供任意数量的名称值对。形参**user_info中的两个星号让Python创建一个名为user_info的空字典，并将收到的所有名称值对都放到这个字典中。在这个函数中，可以像访问其他字典那样访问user_info中的名称值对。

输出如下

```python
{'location':'princeton','field':'physics',
'first_name':'albert','last_name':'einstein'}
```







### 返回值

在函数中，可使用return语句将值返回到调用函数的代码行。

```python
❶ def get_formatted_name(first_name,last_name):
      """返回整洁的姓名。"""
❷     full_name = f"{first_name} {last_name}"
❸     return full_name.title()

❹ musician = get_formatted_name('jimi','hendrix')
  print(musician)
```

函数get_formatted_name()的定义通过形参接受名和姓（见❶）​。它将姓和名合而为一，在中间加上一个空格，并将结果赋给变量full_name（见❷）​。然后，将full_name的值转换为首字母大写格式，并将结果返回到函数调用行（见❸）​。



## 模块

模块是一个包含所有你定义的函数和变量的文件，其后缀名是.py。模块可以被别的程序引入，以使用该模块中的函数等功能。这也是使用 python 标准库的方法。

### 导入模块

pizza.py 文件中定义方法

```python
def make_pizza(size,*toppings):
    """概述要制作的比萨。"""
    print(f"\nMaking a {size}-inch pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")
```

```python
#新的文件 导入 pizza 模块
  import pizza

❶ pizza.make_pizza(16,'pepperoni')
  pizza.make_pizza(12,'mushrooms','green peppers','extra cheese')
```

要调用被导入模块中的函数，可指定被导入模块的名称pizza和函数名make_pizza()，并用句点分隔

### 导入模块指定别名

> import module_name as mn

```python
#指定别名为 p
import pizza as p

p.make_pizza(16,'pepperoni')
p.make_pizza(12,'mushrooms','green peppers','extra cheese')
```

### 导入模块中特定方法

```python
#导入 模块中特定方法语法
from module_name import function_name
#通过用逗号分隔函数名，可根据需要从模块中导入任意数量的函数：
from module_name import function_0,function_1,function_2
```

```python
from pizza import make_pizza
# 调用时 可直接根据方法名使用方法
make_pizza(16,'pepperoni')
make_pizza(12,'mushrooms','green peppers','extra cheese')
```

### 给导入的函数指定别名

```python
#语法如下使用关键字 as 
from module_name import function_name as fn
```

### 导入模块中所有函数

使用星号(*)运算符可让Python导入模块中的所有函数：

```python
from pizza import *

make_pizza(16,'pepperoni')
make_pizza(12,'mushrooms','green peppers','extra cheese')
```

由于导入了每个函数，可直接通过函数名称来调用每个函数，而无须使用模块名.函数名 来调用。

## 类与对象

```python
❶ class Dog:
❷     """一次模拟小狗的简单尝试。"""

❸     def __init__(self,name,age):
          """初始化属性name和age。"""
❹         self.name = name
          self.age = age

❺     def sit(self):
          """模拟小狗收到命令时蹲下。"""
          print(f"{self.name} is now sitting.")

      def roll_over(self):
          """模拟小狗收到命令时打滚。"""
          print(f"{self.name} rolled over!")
```

❶处定义了一个名为Dog的类。根据约定，在Python中，首字母大写的名称指的是类。这个类定义中没有圆括号，因为要从空白创建这个类.

### __init__() 方法

**类中的函数称为方法**

方法__init__()是一个特殊方法，每当你根据Dog类创建新实例时，Python都会自动运行它。在这个方法的名称中，开头和末尾各有两个下划线，这是一种约定。

方法__init__()定义成包含三个形参：self、name和age。在这个方法的定义中，形参self必不可少，而且必须位于其他形参的前面

Python调用这个方法来创建Dog实例时，将自动传入实参self。每个与实例相关联的方法调用都自动传递实参self，它是一个指向实例本身的引用，让实例能够访问类中的属性和方法。创建Dog实例时，Python将调用Dog类的方法__init__()。我们将通过实参向Dog()传递名字和年龄，self会自动传递，因此不需要传递它。



❹处定义的两个变量都有前缀self。以self为前缀的变量可供类中的所有方法使用，可以通过类的任何实例来访问

这样可通过实例访问的变量称为属性。



### 创建对象/实例

可将类视为有关如何创建实例的说明(模版)。Dog类是一系列说明，让Python知道如何创建表示特定小狗的实例。

```python
  #创建对象 
❶ my_dog = Dog('Willie',6)

❷ print(f"My dog's name is {my_dog.name}.")
❸ print(f"My dog is {my_dog.age} years old.")
```

创建一条名字为'Willie'、年龄为6的小狗。遇到这行代码时，Python使用实参'Willie'和6调用Dog类的方法__init__()。方法__init__()创建一个表示特定小狗的实例，并使用提供的值来设置属性name和age。

#### 通过对象访问属性&调用方法

```python
#访问属性
my_dog.name
#可直接修改属性值
my_dog.name = 'qi xi'
#调用方法
my_dog.sit()
```

### 继承

一个类继承另一个类时，将自动获得另一个类的所有属性和方法。原有的类称为父类，而新类称为子类。子类继承了父类的所有属性和方法，同时还可以定义自己的属性和方法。

```python
❶ class Car:
      """一次模拟汽车的简单尝试。"""

      def __init__(self,make,model,year):
          self.make = make
          self.model = model
          self.year = year
          self.odometer_reading = 0

      def get_descriptive_name(self):
          long_name = f"{self.year} {self.make} {self.model}"
          return long_name.title()

      def read_odometer(self):
          print(f"This car has {self.odometer_reading} miles on it.")

      def update_odometer(self,mileage):
          if mileage >= self.odometer_reading:
              self.odometer_reading = mileage
          else:
              print("You can't roll back an odometer!")

      def increment_odometer(self,miles):
          self.odometer_reading += miles
#注意定义子类语法
❷ class ElectricCar(Car):
      """电动汽车的独特之处。"""

❸     def __init__(self,make,model,year):
          """初始化父类的属性。"""
❹         super().__init__(make,model,year)

❺ my_tesla = ElectricCar('tesla','model s',2019)
  print(my_tesla.get_descriptive_name())
```

首先是Car类的代码（见❶）​。创建子类时，父类必须包含在当前文件中，且位于子类前面。在❷处，定义了子类ElectricCar。定义子类时，必须在圆括号内指定父类的名称。方法__init__()接受创建Car实例所需的信息（见❸）​。❹处的super()是一个特殊函数，让你能够调用父类的方法。这行代码让Python调用Car类的方法__init__()，让ElectricCar实例包含这个方法中定义的所有属性。父类也称为超类(superclass)，名称super由此而来。

在❺处，创建ElectricCar类的一个实例，并将其赋给变量my_tesla。这行代码调用ElectricCar类中定义的方法__init__()，后者让Python调用父类Car中定义的方法__init__()。我们提供了实参'tesla'、'model s'和2019。

#### 子类特有方法和属性

下面来添加一个电动汽车特有的属性（电瓶）​，以及一个描述该属性的方法。我们将存储电瓶容量，并编写一个打印电瓶描述的方法：

```python
  class Car:
      --snip--

  class ElectricCar(Car):
      """电动汽车的独特之处。"""

      def __init__(self,make,model,year):
          """
          初始化父类的属性。
          再初始化电动汽车特有的属性。
          """
          super().__init__(make,model,year)
❶         self.battery_size = 75

❷     def describe_battery(self):
          """打印一条描述电瓶容量的消息。"""
          print(f"This car has a {self.battery_size}-kWh battery.")

  my_tesla = ElectricCar('tesla','model s',2019)
  print(my_tesla.get_descriptive_name())
  my_tesla.describe_battery()
```

在❶处，添加了新属性self.battery_size，并设置其初始值(75)。根据ElectricCar类创建的所有实例都将包含该属性，但所有Car实例都不包含它。在❷处，还添加了一个名为describe_battery()的方法，打印有关电瓶的信息。

#### 重写父类方法

对于父类的方法，只要它不符合子类模拟的实物的行为，都可以进行重写。为此，可在子类中定义一个与要重写的父类方法同名的方法

```python
class ElectricCar(Car):
    --snip--

    def fill_gas_tank(self):
        """电动汽车没有油箱。"""
        print("This car doesn't need a gas tank!")
```

调用时，将忽略父类方法，直接调用子类方法。



## 错误和异常

Python 有两种错误很容易辨认：语法错误和异常。

Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。

### 语法错误

Python 的语法错误或者称之为解析错误。

```python
>>> while True print('Hello world')
  File "<stdin>", line 1, in ?
    while True print('Hello world')
                   ^
SyntaxError: invalid syntax
```

这个例子中，函数 print() 被检查到有错误，是它前面缺少了一个冒号 : 。

语法分析器指出了出错的一行，并且在最先找到的错误的位置标记了一个小小的箭头。



### 异常

即便 Python 程序的语法是正确的，在运行它的时候，也有可能发生错误。运行期检测到的错误被称为异常。

大多数的异常都不会被程序处理，都以错误信息的形式展现在这里:

```python
>>> 10 * (1/0)             # 0 不能作为除数，触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
ZeroDivisionError: division by zero
>>> 4 + spam*3             # spam 未定义，触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
NameError: name 'spam' is not defined
>>> '2' + 2               # int 不能与 str 相加，触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: can only concatenate str (not "int") to str
```

异常以不同的类型出现，这些类型都作为信息的一部分打印出来: 例子中的类型有 ZeroDivisionError，NameError 和 TypeError。

错误信息的前面部分显示了异常发生的上下文，并以调用栈的形式显示具体信息。

#### 异常处理

##### try/except

异常捕捉可以使用 try/except 语句。



以下例子中，让用户输入一个合法的整数，但是允许用户中断这个程序（使用 Control-C 或者操作系统提供的方法）。用户中断的信息会引发一个 KeyboardInterrupt 异常。

```python
while True:
    try:
        x = int(input("请输入一个数字: "))
        break
    except ValueError:
        print("您输入的不是数字，请再次尝试输入！")
```

try 语句按照如下方式工作；

- 首先，执行 try 子句（在关键字 try 和关键字 except 之间的语句）。

- 如果没有异常发生，忽略 except 子句，try 子句执行后结束。

- 如果在执行 try 子句的过程中发生了异常，那么 try 子句余下的部分将被忽略。如果异常的类型和 except 之后的名称相符，那么对应的 except 子句将被执行。

- 如果一个异常没有与任何的 except 匹配，那么这个异常将会传递给上层的 try 中。

一个 try 语句可能包含多个except子句，分别来处理不同的特定的异常。最多只有一个分支会被执行。

处理程序将只针对对应的 try 子句中的异常进行处理，而不是其他的 try 的处理程序中的异常。

一个except子句可以同时处理多个异常，这些异常将被放在一个括号里成为一个元组，例如:

```python
except (RuntimeError, TypeError, NameError):
#pass语句，可用于让Python在代码块中什么都不要做
    pass
```

最后一个except子句可以忽略异常的名称，它将被当作通配符使用。你可以使用这种方法打印一个错误信息，然后再次把异常抛出。

```python
import sys

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error: {0}".format(err))
except ValueError:
    print("Could not convert data to an integer.")
except:
    print("Unexpected error:", sys.exc_info()[0])
    raise
```

##### try/except...else

try/except 语句还有一个可选的 **else** 子句，如果使用这个子句，那么必须放在所有的 except 子句之后。

else 子句将在 try 子句没有发生任何异常的时候执行。



以下实例在 try 语句中判断文件是否可以打开，如果打开文件时正常的没有发生异常则执行 else 部分的语句，读取文件内容：

```python
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except IOError:
        print('cannot open', arg)
    else:
        print(arg, 'has', len(f.readlines()), 'lines')
        f.close()
```

使用 else 子句比把所有的语句都放在 try 子句里面要好，这样可以避免一些意想不到，而 except 又无法捕获的异常。

异常处理并不仅仅处理那些直接发生在 try 子句中的异常，而且还能处理子句中调用的函数（甚至间接调用的函数）里抛出的异常。例如:

```python
>>> def this_fails():
        x = 1/0
   
>>> try:
        this_fails()
    except ZeroDivisionError as err:
        print('Handling run-time error:', err)
   
Handling run-time error: int division or modulo by zero
```

##### try-finally 语句

try-finally 语句无论是否发生异常都将执行最后的代码。

```python
try:
    runoob()
except AssertionError as error:
    print(error)
else:
    try:
        with open('file.log') as file:
            read_data = file.read()
    except FileNotFoundError as fnf_error:
        print(fnf_error)
finally:
    print('这句话，无论异常是否发生都会执行。')
```

#### 抛出异常

Python 使用 raise 语句抛出一个指定的异常。

raise语法格式如下

```python
raise [Exception [, args [, traceback]]]
```



以下实例如果 x 大于 5 就触发异常:

```python
x = 10
if x > 5:
    raise Exception('x 不能大于 5。x 的值为: {}'.format(x))
```

```shell
#执行以上代码抛出异常
Traceback (most recent call last):
  File "test.py", line 3, in <module>
    raise Exception('x 不能大于 5。x 的值为: {}'.format(x))
Exception: x 不能大于 5。x 的值为: 10
```

raise 唯一的一个参数指定了要被抛出的异常。它必须是一个异常的实例或者是异常的类（也就是 Exception 的子类）。

如果你只想知道这是否抛出了一个异常，并不想去处理它，那么一个简单的 raise 语句就可以再次把它抛出。

```python
>>> try:
        raise NameError('HiThere')  # 模拟一个异常。
    except NameError:
        print('An exception flew by!')
        raise
   
An exception flew by!
Traceback (most recent call last):
  File "<stdin>", line 2, in ?
NameError: HiThere
```

#### 自定义异常

```python
#你可以通过创建一个新的异常类来拥有自己的异常。异常类继承自 Exception 类，可以直接继承，或者间接继承，例如:
>>> class MyError(Exception):
        def __init__(self, value):
            self.value = value
        def __str__(self):
            return repr(self.value)
   
>>> try:
        raise MyError(2*2)
    except MyError as e:
        print('My exception occurred, value:', e.value)
   
My exception occurred, value: 4
>>> raise MyError('oops!')
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
__main__.MyError: 'oops!'
```

#### with 语句

Python 中的 with 语句用于异常处理，封装了 try…except…finally 编码范式，提高了易用性。

**with** 语句使代码更清晰、更具可读性， 它简化了文件流等公共资源的管理。

```python
file = open('./test_runoob.txt', 'w')
file.write('hello world !')
file.close()
```

以上代码如果在调用 write 的过程中，出现了异常，则 close 方法将无法被执行，因此资源就会一直被该程序占用而无法被释放。

接下来我们呢可以使用 **try…except…finally** 来改进代码：

```python
file = open('./test_runoob.txt', 'w')
try:
    file.write('hello world')
finally:
    file.close()
```

以上代码我们对可能发生异常的代码处进行 try 捕获，发生异常时执行 except 代码块，finally 代码块是无论什么情况都会执行，所以文件会被关闭，不会因为执行异常而占用资源。

使用 **with** 关键字：

```python
with open('./test_runoob.txt', 'w') as file:
    file.write('hello world !')
```

使用 **with** 关键字系统会自动调用 f.close() 方法， with 的作用等效于 try/finally 语句是一样的。

with 语句实现原理建立在上下文管理器之上。

上下文管理器是一个实现 __enter__ 和 __exit__ 方法的类。

使用 with 语句确保在嵌套块的末尾调用 __exit__ 方法。



在文件对象中定义了 __enter__ 和 __exit__ 方法，即文件对象也实现了上下文管理器，首先调用 __enter__ 方法，然后执行 with 语句中的代码，最后调用 __exit__ 方法。 即使出现错误，也会调用 __exit__ 方法，也就是会关闭文件流。
