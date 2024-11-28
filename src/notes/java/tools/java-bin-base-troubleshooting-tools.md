---
title: Java 基础故障处理、监控常用命令工具
date: 2024-11-28 22:50:00
category:
    - 笔记
tag: 
    - Java
    - Java 命令
    - 后端开发备忘录
description: Jdk bin 目录下的故障处理命令工具、jinfo、jps、jstat、jstack 等
---

# Java 基础故障处理工具
## jps 查看虚拟机进程
JVM Process Status Tool
```shell title='命令格式'
usage: jps [-help]
       jps [-q] [-mlvV] [<hostid>]

Definitions:
    <hostid>:      <hostname>[:<port>]
```
* -q 只输出 LVMID(Local Virtual Machine Identifier,和 PID 相同),省略主类的名称
* -m 输出虚拟机进程启动时传递给主类 main()函数的参数
* -l 输出主类的全名,如果进程执行的是 jar 包，则输出 Jar 路径
* -v 输出虚拟机进程启动时的 JVM 参数
```shell title='例子'
jps -mlv
```
## jstat 监视虚拟机统计信息
jstat(JVM statistics Monitoring Tool )用于监视虚拟机各种运行状态的命令行工具。可以显示本地或远程虚拟机进程中的类加载、内存、垃圾收集、即时编译等运行时数据。
```shell title='命令格式'
Usage: jstat -help|-options
       jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]

Definitions:
  <option>      代表需要查询的虚拟机信息，具体选项值参考下方。
  <vmid>       本地虚拟机进程 ID。远程虚拟机格式参考 jstat -help
  <lines>       输出多少行数据输出一次数据列标题
  <interval>    采样间隔，多久输出一次数据。 <n> ["ms"|"s"] 不指定单位时，默认为毫秒。
  <count>       数据采样多少次。
  -J<flag>      Pass <flag> directly to the runtime system.
```
### jstat 的各个选项
|选项|作用|
|--------------|--------------:|
|-class|监视类装载、卸载数量、总空间以及类装载所耗费的时间|
|-gc|监视Java堆状况,包括Eden区、两个survivor区、老年代、永久代等的容量、已用空间、GC时间合计等信息|
|-gccapacity|监视内容基本与-gc相同，但输出主要关注java堆各个区域使用到的最大最小空间|
|-gcutil|监视内容基本与-gc相同,但输出主要关注已使用空间占总空间的百分比|
|-gccause|与-gcutil功能一样，但是会额外输出导致上一次GC产生的原因
|-gcnew|监视新生代GC状况|
|-gcnewcapacity|监视内容与-gcnew基本相同，输出主要关注使用到的最大、最小空间
|-gcold|监视老年代GC状况
|-gcoldcapacity|监视内容与-gcold基本相同，输出主要关注使用到的最大、最小空间
|-gcpermcapacity | 输出永久代使用到的最大、最小空间（jdk1.8 以后无法使用）
|-compiler|输出JIT编译器编译过的方法、耗时等信息
|-printcompilation|输出已经被JIT编译的方法

### jstat 返回信息各列的含义:
结合选项，有的返回数据是内存容量大小，单位是 kb,有的返回是使用比率。
|列名|描述|
|--------------|--------------|
|S0C|Survivor0的当前容量|
|S1C|Survivor1的当前容量|
|S0U|Survivor0的使用量|
|S1U|Survivor1的使用量|
|EC|Eden区的当前容量|
|EU|Eden区的使用量|
|OC|old区的当前容量|
|OU|old区的使用量|
|MC|元空间的容量|
|MU|元空间的已使用大小|
|PC|方法区的当前容量|
|PU|方法区的使用量|
|YGC|Young GC次数|
|YGCT|Young GC累积耗时|
|FGC|Full GC次数|
|FGCT|Full GC累积耗时|
|GCT|GC总的累积耗时|
|NGCMN|新生代最小容量|
|NGCMX|新生代最大容量|
|NGC|新生代当前容量|
|OGCMN|老年代最小容量|
|OGCMX|老年代最大容量|
|OGC|老年代当前容量|
|PGCMN|方法区最小容量|
|PGCMX|方法区最大容量|
|PGC|方法区当前容量|
|PC|方法区的当前容量|
|PU|方法区使用量|
|CCSC|压缩类的容量，单位为KB。|
|CCSU|压缩类已使用大小，单位为KB。|
|LGCC|上一次GC发生的原因|
|GCC|当前GC发生的原因|
|TT|存活阀值，如果对象在新生代移动次数超过此阀值，则会被移到老年代|
|MTT|	最大存活阀值，如果对象在新生代移动次数超过此阀值，则会被移到老年代|
|DSS|survivor区的理想容量|

```shell title='jstat 常用命令格式'
#查看类加载信息
jstat -class -t -h 5 69610 500ms 5
#各个堆空间状况 输出使用百分比
jstat -gcutil -t -h 5 69610 500ms 5
#各个堆空间状况 输出使用百分比 还有上一次触发GC 原因
jstat -gccause -t -h 5 69610 500ms 5

```

## jinfo Java 配置信息工具
jinfo 可以实时查看和调整虚拟机各项参数。
```shell title='命令格式'
Usage:
    jinfo [option] <pid>
        (to connect to running process)
    jinfo [option] <executable <core>
        (to connect to a core file)
    jinfo [option] [server_id@]<remote server IP or hostname>
        (to connect to remote debug server)

where <option> is one of:
    -flag <name>         to print the value of the named VM flag
    -flag [+|-]<name>    to enable or disable the named VM flag
    -flag <name>=<value> to set the named VM flag to the given value
    -flags               to print VM flags
    -sysprops            to print Java system properties
    <no option>          to print both of the above
    -h | -help           to print this help message
```
