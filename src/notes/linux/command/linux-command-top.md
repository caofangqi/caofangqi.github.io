---
title: Linux Top 命令
date: 2024-12-01 23:50:00
category:
    - 笔记
tag: 
    - Linux 
    - 命令
    - 后端开发备忘录
description: Top 命令使用详解
---
# Top 命令
top命令实时对系统处理器的状态监视.它将显示系统中CPU最“敏感”的任务列表.该命令可以按CPU使用.内存使用和执行时间对任务进行排序；

> top [选项]
```shell title='执行结果(Mac 系统下执行，和 Linux 有所区别)'
Processes: 708 total, 2 running, 706 sleeping, 3632 threads                                                                                                                         23:35:18
Load Avg: 3.46, 3.03, 2.98  CPU usage: 4.67% user, 2.14% sys, 93.17% idle  SharedLibs: 526M resident, 56M data, 37M linkedit.
MemRegions: 738801 total, 15G resident, 192M private, 4033M shared. PhysMem: 31G used (3742M wired, 2547M compressor), 746M unused.
VM: 76T vsize, 3570M framework vsize, 15712284(0) swapins, 17316364(0) swapouts. Networks: packets: 27920551/45G in, 36163976/63G out. Disks: 24495502/351G read, 10914774/214G written.

PID    COMMAND      %CPU TIME     #TH    #WQ  #PORT MEM    PURG   CMPRS  PGRP  PPID  STATE    BOOSTS           %CPU_ME %CPU_OTHRS UID  FAULTS    COW      MSGSENT    MSGRECV    SYSBSD
166    WindowServer 26.6 09:23:08 15     5    3769  1343M- 3080K  177M   166   1     sleeping *0[1]            0.42035 0.42632    88   43069198+ 986154   221849888+ 206665037+ 389680871+
43525  top          9.5  00:01.68 1/1    0    29+   8588K+ 0B     0B     43525 
```
## 命令选项
```shell title='选项'
-b：以批处理模式操作；
-c：显示完整的治命令；
-d：屏幕刷新间隔时间；
-I：忽略失效过程；
-s：保密模式；
-S：累积模式；
-i<时间>：设置间隔时间；
-u<用户名>：指定用户名；
-p<进程号>：指定进程；
-n<次数>：循环显示的次数。
```
## 交互命令
```shell title='交互命令'
h：显示帮助画面，给出一些简短的命令总结说明；
k：终止一个进程；
i：忽略闲置和僵死进程，这是一个开关式命令；
q：退出程序；
r：重新安排一个进程的优先级别；
S：切换到累计模式；
s：改变两次刷新之间的延迟时间（单位为s），如果有小数，就换算成ms。输入0值则系统将不断刷新，默认值是5s；
f或者F：从当前显示中添加或者删除项目；
o或者O：改变显示项目的顺序；
l：切换显示平均负载和启动时间信息；
m：切换显示内存信息；
t：切换显示进程和CPU状态信息；
c：切换显示命令名称和完整命令行；
M：根据驻留内存大小进行排序；
P：根据CPU使用百分比大小进行排序；
T：根据时间/累计时间进行排序；
w：将当前设置写入~/.toprc文件中。
```
## 显示字段解释
```shell title='字段解释'
top - 09:44:56[当前系统时间],
16 days[系统已经运行了16天],
1 user[个用户当前登录],
load average: 9.59, 4.75, 1.92[系统负载，即任务队列的平均长度]
Tasks: 145 total[总进程数],
2 running[正在运行的进程数],
143 sleeping[睡眠的进程数],
0 stopped[停止的进程数],
0 zombie[冻结进程数],
Cpu(s): 99.8%us[用户空间占用CPU百分比],
0.1%sy[内核空间占用CPU百分比],
0.0%ni[用户进程空间内改变过优先级的进程占用CPU百分比],
0.2%id[空闲CPU百分比], 0.0%wa[等待输入输出的CPU时间百分比],
0.0%hi[],
0.0%st[],
Mem: 4147888k total[物理内存总量],
2493092k used[使用的物理内存总量],
1654796k free[空闲内存总量],
158188k buffers[用作内核缓存的内存量]
Swap:  5144568k total[交换区总量],
56k used[使用的交换区总量],
5144512k free[空闲交换区总量],
2013180k cached[缓冲的交换区总量],
```
## 常用参数
```shell title='常用参数'
#查看该进程下线程状态
top -Hp 进程号

```
## 参考文档
* [鸟哥命令大全-top 命令](https://man.niaoge.com/top)