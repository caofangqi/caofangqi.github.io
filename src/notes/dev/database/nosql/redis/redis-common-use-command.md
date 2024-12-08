---
date: 2024-12-06 22:50:00
description: 记录日常中高频使用的 Redis 命令语法，方便查看。
title: Redis 常用命令
category:
  - 笔记
tag:
  - Redis
star: true
---
# Redis 常用命令
## Key 操作命令
### DEL 删除Key
```shell title='命令语法'
#删除 key ，返回被删除的数量
DEL KEY_NAME
```
###  Type 命令 
```shell title='命令语法'
#返回 key 所储存的值的类型
TYPE KEY_NAME
```
返回 key 的数据类型，数据类型有：
* none (key不存在)
* string (字符串)
* list (列表)
* set (集合)
* zset (有序集)
* hash (哈希表)
### PEXPIREAT 设置 key 在某个时间过期。
设置 Key 在某个时间过期，参数为 ==毫秒== 值时间戳
```shell title='命令语法'
#设置 Key 在2094-12-06 18:28:06 过期， 参数为毫秒值 unix时间戳
PEXPIREAT KEY_NAME 3942469686000
```
### EXPIREAT 设置 key 在某个时间过期。
设置 Key 在某个时间过期，参数为 ==秒== 值时间戳
```shell title='命令语法'
#设置 Key 在2094-12-06 18:28:06 过期， 参数为秒值 unix时间戳
EXPIREAT KEY_NAME 3942469686
```

### PEXPIRE 设置 key 多少毫秒之后过期
设置 Key 在多少 ==毫秒== 之后过期
```shell title='命令语法'
#设置 Key 10秒后过期， 参数为毫秒值 
PEXPIRE KEY_NAME 10000
```
### EXPIRE 设置 key 多少秒之后过期
设置 Key 在多少 ==秒== 之后过期
```shell title='命令语法'
#设置 Key 10秒后过期， 参数为秒值 
EXPIRE KEY_NAME 10000
```

### Rename 修改Key的名称
修改 Key 的名称
```shell title='命令语法'
Rename KEY_NAME  newKeyName
```
### Renamenx 仅当 newkey 不存在时，将 key 改名为 newkey 
```shell title='命令语法'
Rename KEY_NAME  newKeyName
```
修改成功时，返回 1 。 如果 NEW_KEY_NAME 已经存在，返回 0 。



### TTL命令 以 ==秒== 为单位返回 key 的剩余过期时间。
```shell title='命令语法'
ttl KEY_NAME 
```
当 key 不存在时，返回 -2 。 当 key 存在但没有设置剩余生存时间时，返回 -1 。 否则，以秒为单位，返回 key 的剩余生存时间。
### PTTL命令   以 ==毫秒== 为单位返回 key 的剩余的过期时间。
```shell title='命令语法'
#设置 Key 10秒后过期， 参数为毫秒值 
pttl KEY_NAME 
```
当 key 不存在时，返回 -2 。 当 key 存在但没有设置剩余生存时间时，返回 -1 。 否则，以毫秒为单位，返回 key 的剩余生存时间。

### EXISTS 检查给定 key 是否存在。

```shell title='命令语法'
EXISTS KEY_NAME
```
若 key 存在返回 1 ，否则返回 0 。

### Keys 查找所有符合给定规则( pattern)的 key 。
```shell title='命令语法'
KEYS PATTERN
#获取所有key
keys *
#获取 k 开头的 key
keys k*
```
符合给定模式的 key 列表 (Array)。

## 字符串( String )命令
### SET  设置指定 key 的值

```shell title='命令语法'
#设置字符串值 
SET KEY_NAME VALUE
#设置操作成功完成时，返回 OK
```
### Setnx 只有在 key 不存在时设置 key 的值。
Redis Setnx（SET if Not eXists） 命令在指定的 key 不存在时，为 key 设置指定的值。
```shell title='命令语法'
SETNX KEY_NAME VALUE
```
设置成功，返回 1 。 设置失败，返回 0 。



### Setex 将值 value 关联到 key ，并设置多少 ==秒== 之后过期。
Redis Setex 命令为指定的 key 设置值及其过期时间。如果 key 已经存在， SETEX 命令将会替换旧的值。
```shell title='命令语法'
#设置字符串值 同时设置 过期时间
SETEX KEY_NAME TIMEOUT VALUE
#设置 String key value,并且设置 60s 之后过期
setex myKey 60 'hello sworld'
```
设置操作成功完成时，返回 OK
### Psetex 将值 value 关联到 key ，并设置多少 ==毫秒== 之后过期
Redis Psetex 命令以毫秒为单位设置 key 的生存时间。
```shell title='命令语法'
PSETEX key1 EXPIRY_IN_MILLISECONDS value1 
#设置 String key value,并且设置 1000ms 之后过期
setex myKey 1000 'hello sworld'
```
设置操作成功完成时，返回 OK




### Setbit 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。
Redis Setbit 命令用于对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。
```shell title='命令语法'
Setbit KEY_NAME OFFSET
```
指定偏移量原来储存的位。



### Mset 同时设置一个或多个 key-value 对
Redis Mset 命令用于同时设置一个或多个 key-value 对。
```shell title='命令语法'
#设置字符串值 
MSET key1 value1 key2 value2 .. keyN valueN 
#返回 OK
```

### Get 获取指定 key 的值。
Redis Get 命令用于获取指定 key 的值。如果 key 不存在，返回 nil 。如果key 储存的值不是字符串类型，返回一个错误。

```shell title='命令语法'
get keyName
```
返回 key 的值，如果 key 不存在时，返回 nil。 如果 key 不是字符串类型，那么返回一个错误。

### Getbit 对 key 所储存的字符串值，获取指定偏移量上的位(bit)。
Redis Getbit 命令用于对 key 所储存的字符串值，获取指定偏移量上的位(bit)。
```shell title='命令语法'
GETBIT KEY_NAME OFFSET
```
字符串值指定偏移量上的位(bit)。
当偏移量 OFFSET 比字符串值的长度大，或者 key 不存在时，返回 0 。




### Getrange  返回 key 中字符串值的子字符
Redis Getrange 命令用于获取存储在指定 key 中字符串的子字符串。字符串的截取范围由 start 和 end 两个偏移量决定 ==(包括 start 和 end 在内)== 。
```shell title='命令语法'
GETRANGE KEY_NAME start end
```
截取得到的子字符串。

### Setrange 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始。
Redis Setrange 命令用指定的字符串覆盖给定 key 所储存的字符串值，覆盖的位置从偏移量 offset 开始。
```shell title='命令语法'
SETRANGE KEY_NAME OFFSET VALUE
```
返回被修改后的字符串长度。

### Append 如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。
Redis Append 命令用于为指定的 key 追加值。
如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。
如果 key 不存在， APPEND 就简单地将给定 key 设为 value ，就像执行 SET key value 一样。
```shell title='命令语法'
APPEND KEY_NAME NEW_VALUE
```
追加指定值之后， key 中字符串的长度。
### Getset 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
Redis Getset 命令用于设置指定 key 的值，并返回 key 旧的值。

```shell title='命令语法'
GETSET KEY_NAME VALUE
```
返回给定 key 的旧值。 当 key 没有旧值时，即 key 不存在时，返回 nil 。
当 key 存在但不是字符串类型时，返回一个错误



### Decr 将 key 中储存的数字值减一。
Redis Decr 命令将 key 中储存的数字值减一。
如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 DECR 操作。
如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
本操作的值限制在 64 位(bit)有符号数字表示之内
```shell title='命令语法'
DECR KEY_NAME
```
执行命令之后 key 的值。

### Decrby key 所储存的值减去给定的减量值（decrement） 。
Redis Decrby 命令将 key 所储存的值减去指定的减量值。
如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 DECRBY 操作。
如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
本操作的值限制在 64 位(bit)有符号数字表示之内。
```shell title='命令语法'
DECRBY KEY_NAME DECREMENT_AMOUNT
#key=100 , 减去 10 返回 90
decrby key 10
```
### Incr 将 key 中储存的数字值增一。
Redis Incr 命令将 key 中储存的数字值增一。
如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCR 操作。
如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
本操作的值限制在 64 位(bit)有符号数字表示之内。
```shell title='命令语法'
DECR KEY_NAME
```
执行命令之后 key 的值。

### Incrby 将 key 所储存的值加上给定的增量值（increment）
Redis Incrby 命令将 key 中储存的数字加上指定的增量值。
如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCRBY 命令。
如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
本操作的值限制在 64 位(bit)有符号数字表示之内。
```shell title='命令语法'
INCRBY KEY_NAME INCR_AMOUNT
#key=100 , 加上 10 返回 110
incrby key 10
```
加上指定的增量值之后， key 的值。



减去指定减量值之后， key 的值。
### Strlen 返回 key 所储存的字符串值的长度。
Redis Strlen 命令用于获取指定 key 所储存的字符串值的长度。当 key 储存的不是字符串值时，返回一个错误。
```shell title='命令语法'
STRLEN KEY_NAME
```
字符串值的长度。 当 key 不存在时，返回 0。
### Msetnx 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
Redis Msetnx 命令用于所有给定 key 都不存在时，同时设置一个或多个 key-value 对。
```shell title='命令语法'
MSETNX key1 value1 key2 value2 .. keyN valueN
```
当所有 key 都成功设置，返回 1 。 如果所有给定 key 都设置失败(至少有一个 key 已经存在)，那么返回 0 。
== 集群版本不支持该命令 ==

## Redis 有序集合(sorted set)
### Zcard 获取有序集合的成员数
Redis Zcard 命令用于计算集合中元素的数量。
```shell title='命令语法'
ZCARD KEY_NAME
```
当 key 存在且是有序集类型时，返回有序集的基数。 当 key 不存在时，返回 0 。

### Zadd 向有序集合添加一个或多个成员，或者更新已存在成员的分数
Redis Zadd 命令用于将一个或多个成员元素及其分数值加入到有序集当中。

如果已存在那么更新这个成员的分数值

分数值可以是整数值或双精度浮点数。

如果有序集合 key 不存在，则创建一个空的有序集并执行 ZADD 操作。

当 key 存在但不是有序集类型时，返回一个错误。
```shell title='命令语法'
ZADD KEY_NAME SCORE1 VALUE1.. SCOREN VALUEN
```
### Zcount 计算在有序集合中指定区间分数的成员数
Redis Zcount 命令用于计算有序集合中指定分数区间的成员数量。
```shell title='命令语法'
ZCOUNT key min max
```
分数值在 min 和 max 之间的成员的数量。

### Zrange 通过索引区间返回有序集合成指定区间内的成员
Redis Zrange 返回有序集中，指定区间内的成员。

其中成员的位置按分数值递增(从小到大)来排序。

具有相同分数值的成员按字典序(lexicographical order )来排列。

如果你需要成员按

值递减(从大到小)来排列，请使用 ZREVRANGE 命令。

下标参数 start 和 stop 都以 0 为底，也就是说，以 0 表示有序集第一个成员，以 1 表示有序集第二个成员，以此类推。

你也可以使用负数下标，以 -1 表示最后一个成员， -2 表示倒数第二个成员，以此类推。
```shell title='命令语法'
ZRANGE key start stop [WITHSCORES]
#按照分数从小到大返回所有成员和分数值
ZRANGE myKey 0 -1 WITHSCORES
#按照分数从小到大返回所有成员(分数不返回)
ZRANGE myKey 0 -1 
```
指定区间内，带有分数值(可选)的有序集成员的列表。
### Zrevrange 返回有序集中指定区间内的成员，通过索引，分数从高到底
Redis Zrevrange 命令返回有序集中，指定区间内的成员。

其中成员的位置按分数值递减(从大到小)来排列。

具有相同分数值的成员按字典序的逆序(reverse lexicographical order)排列。

除了成员按分数值递减的次序排列这一点外， ZREVRANGE 命令的其他方面和 ZRANGE 命令一样。
```shell title='命令语法'
ZREVRANGE key start stop [WITHSCORES]
#按照分数递减排序 返回所有成员和分数值
ZRANGE myKey 0 -1 WITHSCORES
#按照分数递减排序 返回所有成员(分数不返回)
ZRANGE myKey 0 -1 
```
指定区间内，带有分数值(可选)的有序集成员的列表。

## Redis 列表(List)
### Llen 获取列表长度
Redis Llen 命令用于返回列表的长度。 如果列表 key 不存在，则 key 被解释为一个空列表，返回 0 。 如果 key 不是列表类型，返回一个错误。
```shell title='命令语法'
LLEN KEY_NAME 
```
返回列表的长度(列表中元素的数量)
###  Lrange 获取列表指定范围内的元素
Redis Lrange 返回列表中指定区间内的元素，区间以偏移量 START 和 END 指定。 其中 0 表示列表的第一个元素， 1 表示列表的第二个元素，以此类推。 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。
```shell title='命令语法'
LRANGE KEY_NAME START END
```
一个列表，包含指定区间内的元素。
### Lpush 将一个或多个值插入到列表头部
Redis Lpush 命令将一个或多个值插入到列表头部。 如果 key 不存在，一个空列表会被创建并执行 LPUSH 操作。 当 key 存在但不是列表类型时，返回一个错误。
```shell title='命令语法'
LPUSH KEY_NAME VALUE1.. VALUEN
```
执行 LPUSH 命令后，列表的长度。
### Rpush 在列表中添加一个或多个值
Redis Rpush 命令用于将一个或多个值插入到列表的尾部(最右边)。

如果列表不存在，一个空列表会被创建并执行 RPUSH 操作。 当列表存在但不是列表类型时，返回一个错误。
```shell title='命令语法'
RPUSH KEY_NAME VALUE1..VALUEN
```
执行 RPUSH 操作后，列表的长度。
### Lpop 移出并获取列表的第一个元素
Redis Lpop 命令用于移除并返回列表的第一个元素。
```shell title='命令语法'
Lpop KEY_NAME  
```
列表的第一个元素。 当列表 key 不存在时，返回 nil 。
### Rpop 移除并获取列表最后一个元素
Redis Rpop 命令用于移除并返回列表的最后一个元素。
```shell title='命令语法'
RPOP KEY_NAME 
```
列表的最后一个元素。 当列表不存在时，返回 nil 。








## 参考文档
* [Redis 官网](https://redis.io/docs/latest/commands/)
