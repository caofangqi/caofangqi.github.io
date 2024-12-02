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
```shell title='执行结果()'
top - 10:01:36 up 517 days, 16:07,  2 users,  load average: 6.90, 4.85, 3.76
Tasks:  63 total,   1 running,  13 sleeping,   0 stopped,  49 zombie
%Cpu(s): 16.4 us,  4.9 sy,  0.0 ni, 75.8 id,  0.0 wa,  0.0 hi,  2.9 si,  0.0 st
KiB Mem : 12932840+total,  2151768 free, 10807212+used, 19104504 buff/cache
KiB Swap:        0 total,        0 free,        0 used. 18860988 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                                                                                    
      1 tomcat    20   0   14.0g   2.7g  12632 S   6.6  2.1   2122:28 java 
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
top - 10:01:36[当前系统时间],
517 days[系统已经运行了16天],
2 user[个用户当前登录],
load average: 6.90, 4.85, 3.76[分别为 1 分钟、5分钟、15 分钟系统负载，即任务队列的平均长度]
Tasks: 63 total[总进程数],
1 running[正在运行的进程数],
13 sleeping[睡眠的进程数],
0 stopped[停止的进程数],
49 zombie[冻结进程数],
Cpu(s): 16.4%us[用户空间占用CPU百分比],
4.9%sy[内核空间占用CPU百分比],
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
#查看该进程下各个线程占用情况
top -Hp 进程号
```

## 参考文档
* [鸟哥命令大全-top 命令](https://man.niaoge.com/top)