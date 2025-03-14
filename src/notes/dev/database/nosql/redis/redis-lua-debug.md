---
date: 2024-12-05 21:00:00
title: Redis lua 脚本调试详解
description: 写过 lua 复杂脚本的人都知道，找 bug 那是真的难，lua 调试器就很好的解决这个问题了
category:
  - 笔记
tag:
  - Lua
  - Redis
star: true
---

# Redis lua 脚本调试详解
## 概述
从 Redis 3.2 版本开始， Redis 将内置一个完整的 Lua 调试器， 它的存将会让编写复杂的 Lua 脚本变得容易。  

Redis Lua 调试器， 代号 LDB ， 拥有以下主要特性：
* LDB 使用服务器-客户端模型， 它是一个远程调试器。 Redis 服务器将被用作调试服务器， 而默认的调试客户端则是 redis-cli 。 另一方面， 其他客户端也可以通过实现服务器提供的简单协议来让自己成为调试客户端。
* 在默认情况下， 每个调试回话都是一个子进程回话。 这意味着在调试 Lua 脚本的时候， 服务器不会被阻塞并且可以继续进行开发， 又或者同时执行多个调试回话。 这也意味着在调试结束之后， 被调试脚本造成的修改都会被回滚， 因此用户可以随时重启一个新的调试回话， 并在与原来一模一样的数据集上进行调试。
* 如果有需要的话， 用户也可以选择同步调试模式， 这个模式将不会创建子进程， 因此调试过程中对数据库进行的所有修改都会被保留， 并且服务器在整个调试过程中都会被阻塞。
* 支持单步调试。
* 支持静态和动态断点。
* 支持将被调试的脚本载入至调试终端。
* 支持对 Lua 变量进行视察。
* 支持追踪脚本执行的 Redis 命令。
* 支持以美观样式打印 Redis 值以及 Lua 值。
* 能够在无限循环以及长时间执行的步骤中模拟出一个断点。

## 使用方法
::: warning
	请使用开发服务器而不是生产服务器来进行调试。 使用同步调试模式将导致服务器在整个调试过程中都会被阻塞。
:::
### 开启调试会话
1. 使用编辑器创建你的脚本。让我们假设你的脚本位于  script.lua 。
2. 使用以下命令开启调试会话： 
```shell 
 redis-cli --ldb --eval script.lua 。  
```
注意， 在使用 redis-cli 客户端的 -eval 选项的时候， 你可以将需要传递给脚本的键名以及参数一并提供给客户端， 其中键名和参数之间使用一个逗号来进行分割， 就像这样：  
```
 redis-cli --ldb --eval script.lua mykey somekey , arg1 arg2
```
在执行这条命令之后， redis-cli 就会进入特殊的调试模式， 它不再接受普通的 Redis 命令， 而是会打印出一个帮助界面， 并将用户键入的调试命令原原本本地发送给 Redis 服务器。

进入了调试模式的 redis-cli 将提示用户使用以下三个命令：
* quit —— 结束调试回话。 调试器将移除所有断点， 跳过所有未执行语句， 并最终退出 redis-cli 。
* restart —— 重新载入脚本文件， 并重头开始一个新的调试会话。 用户在调试的过程中， 通常会在调试之后对脚本进行修改， 然后通过执行 restart 来对修改后的脚本继续进行调试， 这个步骤一般会迭代发生多次。
* help —— 打印出可用的调试命令。
```shell
lua debugger> help
Redis Lua debugger help:
[h]elp               打印这个帮助
[s]tep               运行当前行然后再次停止
[n]ext               step 的别名，作用相同
[c]continue          运行直到遇到下个断点为止
[l]list              列出当前行附近的代码
[l]list [line]       列出指定行 line 附近的代码
                     line = 0 代表列出当前行附近的代码
[l]list [line] [ctx] 列出位于行 line 附近的 ctx 行代码
[w]hole              列出整个脚本源码，相当于执行 'list 1 1000000'
[p]rint              打印出所有局部变量
[p]rint <var>        打印出指定的局部变量，也可以用于打印全局变量 KEYS 以及 ARGV
[b]reak              列出所有断点
[b]reak <line>       将断点添加至指定行
[b]reak -<line>      移除指定行的断点
[b]reak 0            移除所有断点
[t]race              打印回溯链条（Show a backtrace）
[e]eval <code>       在不同的调用幁中执行指定的 Lua 代码
[r]edis <cmd>        执行给定的 Redis 命令
[m]axlen [len]       将 Redis 的回复以及 Lua 变量转储（dump）截断至指定的长度。
                     将参数 len 的值设置为 0 表示不对长度进行限制。
[a]abort             停止执行脚本。
                     在同步模式下，对数据库的修改将被保留。
```
以下是两个可以在 Lua 脚本中进行调用的调试函数：

* redis.debug()        在调试终端中输出日志。
* redis.breakpoint()   暂停脚本的执行，就像遇到了一个断点一样。

需要注意的是， 在默认情况下， 调试器在启动之后将处于单步调试模式。 调试器会停在脚本第一行具有实际作用的代码之前， 然后等待用户的指令。  
这时， 用户可以通过执行 step 命令来让调试器执行当前行的代码， 并移动到下一行具有实际作用的代码之前。 在执行 step 命令时， 服务器将会展示出服务器执行的所有命令， 就像这样：
```shell
(base) ➜  lua redis-cli --ldb --eval script.lua mykey somekey , 0 3 1
Lua debugging session started, please use:
quit    -- End the session.
restart -- Restart the script in debug mode again.
help    -- Show Lua script debugging commands.

* Stopped at 1, stop reason = step over
-> 1   local zsetKey = KEYS[1]
lua debugger> step
* Stopped at 2, stop reason = step over
-> 2   redis.call("GET",zsetKey)
lua debugger> step
<redis> GET mykey
<reply> NULL
* Stopped at 3, stop reason = step over
-> 3   local scopeLeft = tonumber(ARGV[1])

#其中 <redis> 和 <reply> 分别展示了被执行的Redis命令以及服务器返回的回复。 注意， 这种情况只会出现在单步调试模式中。 如果用户使用 continue 命令， 让调试器一直执行代码直到碰到断点为止， 那么为了防止信息输出过多， 调试器将不会显示出相关的命令信息。
```

### **终止调试会话**  
* 当脚本自然终止时， 调试会话将结束， redis-cli 将返回至正常的非调试状态。 用户可以通过 restart 命令来重新开始一个调试会话。  
* 按下 CTRL + C ， 手动终止 redis-cli 。 
* redis-cli 和 redis-server 服务器因为任何原因而断开连接时， 调试会话也会终止。  
* 当服务器关闭时， 所有子进程调试会话都会被终止。  
### 调试命令缩写
	每个 Redis 调试命令都以不同的字符为开始， 用户可以通过键入这些单个字符来代替键入整个命令。

比如说， 用户可以通过只键入 s 来代替键入 step 。  
### 断点
#### 添加断点
> 执行命令 b 1 2 3 4 即可以在第 1 、2 、3 、 4 行分别加上断点。
#### 移除断点
> 执行命令 b 0 则会移除所有断点。     
> 执行命令 b -3 就可以移除第 3 行的断点。  
::: warning
向 Lua 不会执行的那些行，比如声明局部变量的行以及注释行添加断点是无效的： 虽然断点会添加到这些行上面， 但用于这些行不会被执行， 所以调试器将不会在这些行上面停止。
::: 

### 动态断点
在 Lua 脚本中使用 redis.breakpoint() 函数， 这个函数将在接下来将要被执行的代码行前面模拟一个断点。  

以下是一个使用动态断点的例子：
```lua
if counter > 10 then redis.breakpoint() end
```
这个特性在调试时非常有用， 它可以避免我们为了遇到特定的条件而一直手动地控制脚本的执行进程。

### 同步模式
LDB 在默认情况下将使用子进程来创建调试会话， 并且在调试完成之后， 脚本对数据库进行的任何修改都将会被回滚。 因此后续的调试会话不需要重置数据库就可以直接启动.

**在一些特殊情况下**， 为了追踪特定的 bug ， 用户可以会想要保留每个调试会话对数据库所做的修改。 想要这么做的用户可以在启动调试器时， 向 redis-cli 客户端给定 **ldb-sync-mode** 选项：
```shell
redis-cli --ldb-sync-mode --eval script.lua
```
::: warning
注意， 运行在这一调试模式下的服务器在进行调试的过程中将不可用， 所以请小心使用这一选项。 
::: 

当处于这一模式时， abort 命令可以在中途停止那些已经对数据库进行过修改的脚本。 使用 abort 命令来终止调试会话与正常地终止调试会话是不同的： 如果用户只是简单地用 CTRL + C 来停止 redis-cli ， 那么调试会话将在整个脚本都执行完毕之后终止； 而 abort 则会中途停止脚本并在有需要时启动一个新的调试会话。


### 在脚本中进行日志记录
redis.debug() 函数是一个非常强力的调试手段， 它可以在 Lua 脚本内部调用， 并将日志写入至调试终端：
```shell
lua debugger> list
-> 1   local a = {1,2,3}
   2   local b = false
   3   redis.debug(a,b)
lua debugger> continue
<debug> line 3: {1; 2; 3}, false
```
如果脚本不是在调试会话中执行， 那么 redis.debug() 函数将不会引起任何效果。    

> redis.debug() 可以接受多个参数， 这些参数在输出中将由逗号以及空格进行分隔。  

### 查看程序状态

print 函数可以从当前行开始向之前的行进行回溯并查找指定的变量， 一直到顶层（top-level）为止。 

即使调试器位于 Lua 脚本的一个嵌套函数之内， 它仍然可以使用 print foo 来查找位于当前被调用函数上下文中的 foo 变量的值。

> 如果用户以无参数的方式调用 print 命令， 那么 print 将打印出所有变量以及它们的值。

eval 命令可以在当前调用幁之外的上下文中执行指定的一小段 Lua 脚本,用户可以通过这个命令来测试 Lua 函数：
```shell
lua debugger> e redis.sha1hex('foo')
<retval> "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33"
```



## 参考文档
[Debugging Lua scripts in Redis](https://redis.io/docs/latest/develop/interact/programmability/lua-debugging/)
