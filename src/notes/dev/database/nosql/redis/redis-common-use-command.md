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
EXPIRE KEY_NAME 10
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


## 字典 Hashes 键值对
> 每个哈希最多可以存储 4,294,967,295（2^32-1）个字段值对。哈希值仅受托管 Redis 部署的 VM 上的整体内存的限制。

### HLEN  获取 hash 中字段数量
```shell title='Syntax'
HLEN key
```
返回 hash 中 fields 的数量
```shell title='Examples'
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HLEN myhash
(integer) 2
```

### HSET: 设置 Hash 上一个或多个字段值
```shell title='Syntax'
HSET key field value [field value ...]
```
返回 设置成功的字段数量
```shell title='Examples'
> HSET myhash field1 "Hello"
(integer) 1
> HGET myhash field1
"Hello"
> HSET myhash field2 "Hi" field3 "World"
(integer) 2
> HGET myhash field2
"Hi"
> HGET myhash field3
"World"
> HGETALL myhash
1) "field1"
2) "Hello"
3) "field2"
4) "Hi"
5) "field3"
6) "World"
```
### HGETALL 
```shell title='Syntax'
HGETALL key
```
返回存储在 key 的哈希的所有字段和值。在返回值中，每个字段名称后面都跟着它的值。

```shell title='Examples'
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HGETALL myhash
1) "field1"
2) "Hello"
3) "field2"
4) "World"
```
### HKEYS 获取hash所有字段
```shell title='Syntax'
HKEYS key
```
返回所有字段
```shell title='Examples'
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HKEYS myhash
1) "field1"
2) "field2"
```
### HVALS 返回 hash 所有值
```shell title='Syntax'
HVALS key
```
返回 hash 所有值

```shell title='Examples'
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HVALS myhash
1) "Hello"
2) "World"
```

### HGET 查询 Hash 指定字段值
```shell title='Syntax'
HGET key field
```
返回 Hash 指定字段值
```shell title='Examples'
> HSET myhash field1 "foo"
(integer) 1
> HGET myhash field1
"foo"
> HGET myhash field2
(nil)
```
### HMGET 查询 Hash 中多个字段值
```shell title='Syntax'
HMGET key field [field ...]
```
返回 Hash 中多个指定字段值
```shell title='Examples'
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HMGET myhash field1 field2 nofield
1) "Hello"
2) "World"
3) (nil)
```
### HINCRBY 指定字段增加指定的数值
```shell title='Syntax'
HINCRBY key field increment
```
返回增加之后的值  
由于增量字段是有符号的，所以可以增加或者减少
```shell title='Examples'
redis> HSET myhash field 5
(integer) 1
redis> HINCRBY myhash field 1
(integer) 6
redis> HINCRBY myhash field -1
(integer) 5
redis> HINCRBY myhash field -10
(integer) -5
```

## Sets 无序集合
Redis 集合是唯一字符串的无序集合，使用 Redis 集合，可以在 O（1）时间内添加、删除和测试是否存在（换句话说，无论集合元素的数量如何）。

### SADD 新增指定成员到集合中
```shell title='Syntax'
SADD key member [member ...]
```
将指定的成员添加到存储在 key 的集合中。已经是该集合成员的指定成员将被忽略。如果 key 不存在，则在添加指定成员之前创建一个新集合。
```shell title='Examples'
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SADD myset "World"
(integer) 0
redis> SMEMBERS myset
1) "Hello"
2) "World"
```

### SREM 删除集合成员
```shell title='Syntax'
SREM key member [member ...]
```
从存储在 key 的集合中删除指定的成员。不是该集合成员的指定成员将被忽略。如果 key 不存在，则将其视为空集.
```shell title='Examples'
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SREM myset "one"
(integer) 1
redis> SREM myset "four"
(integer) 0
redis> SMEMBERS myset
1) "two"
2) "three"
```
### SISMEMBER  判断成员是否存在集合
```shell title='Syntax'
SISMEMBER key member
```
如果存在，返回 1，不存在返回 0
```shell title='Examples'
redis> SADD myset "one"
(integer) 1
redis> SISMEMBER myset "one"
(integer) 1
redis> SISMEMBER myset "two"
(integer) 0
```
### SINTER 获取给定集合的交集成员
```shell title='Syntax'
SINTER key [key ...]
```
返回给定集合的交集
> key1 = {a,b,c,d}
> key2 = {c}
> key3 = {a,c,e}
> SINTER key1 key2 key3 = {c}

```shell title='Examples'
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SINTER key1 key2
1) "c"
```
### SDIFF 查询差集
```shell title='Syntax'
SDIFF key [key ...]
```
返回第一个集合和其他集合之间的差集
> key1 = {a,b,c,d}
key2 = {c}
key3 = {a,c,e}
SDIFF key1 key2 key3 = {b,d}
```shell title='Examples'
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SDIFF key1 key2
1) "a"
2) "b"
redis> SDIFF key2 key1
1) "d"
2) "e"
```
### SUNION 获取并集
```shell title='Syntax'
SUNION key [key ...]
```
返回由所有给定集合的并集产生的集合成员。
> key1 = {a,b,c,d}
key2 = {c}
key3 = {a,c,e}
SUNION key1 key2 key3 = {a,b,c,d,e}
```shell title='Examples'
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SUNION key1 key2
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
```

### SCARD 查询集合数量
```shell title='Syntax'
SCARD key
```
返回集合数量。
```shell title='Examples'
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SCARD myset
(integer) 2
```
### SMEMBERS 查询所有成员
```shell title='Syntax'
SMEMBERS key
```
返回存储在 key 的设置值的所有成员。
```shell title='Examples'
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SMEMBERS myset
1) "Hello"
2) "World"
```






## 参考文档
* [Redis 官网](https://redis.io/docs/latest/commands/)
