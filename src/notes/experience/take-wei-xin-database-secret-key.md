---
title: Mac 下读取微信聊天记录(获取微信聊天记录db 文件访问密钥)
date: 2025-03-04 22:32:00
category:
    - 笔记
tag:  
    - 备忘录
    - 微信
description: 分析本地的微信聊天记录第一步，先获取本地消息数据库密钥
---
# 获取密钥
## 关闭 SIP
> **需要提前关闭 SIP，不然会报错**
1. mac电脑关机
2. 按住电源键10s【M系列】直到出现恢复模式界面(inter 芯片是关机之后开机 按 command+R 按钮进入恢复模式)
3. 点击顶部菜单,然后打开终端
4. 在终端中输入csrutil disable，以关闭系统完整性保护（SIP）
```shell
#查看 SIP状态
csrutil status
> System Integrity Protection status: disabled.
# 关闭 SIP ,需要进入 MAC 恢复模式 终端执行
csrutil disable
# 开启 SIP
ccsrutil enable
```
## lldb 断点获取 密钥信息
1. 打开终端输入
```shell title="命令"
 sudo lldb -p $(pgrep WeChat)
```
输出如下
```shell title="输出"
(lldb) process attach --pid 3011
Process 3011 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = signal SIGSTOP
    frame #0: 0x00007ff8092e7f0e libsystem_kernel.dylib`mach_msg2_trap + 10
libsystem_kernel.dylib`mach_msg2_trap:
->  0x7ff8092e7f0e <+10>: retq
    0x7ff8092e7f0f <+11>: nop

libsystem_kernel.dylib`macx_swapon:
    0x7ff8092e7f10 <+0>:  movq   %rcx, %r10
    0x7ff8092e7f13 <+3>:  movl   $0x1000030, %eax ; imm = 0x1000030
Target 0: (WeChat) stopped.
Executable module set to "/Applications/WeChat.app/Contents/MacOS/WeChat".
Architecture set to: x86_64-apple-macosx-.
```
2. 设置断点
```shell title="命令"
br set -n sqlite3_key
```
设置成功输出如下
```shell title="输出"
(lldb) br set -n sqlite3_key
Breakpoint 1: 2 locations.
```
3. 输入 c 回车 
4. 这时候会弹出微信登录界面，登录即可
5. 继续执行下面命令 输出密钥
```shell
   memory read --size 1 --format x --count 32 $rsi
```
输出如下
```shell title="输出"
(lldb) memory read --size 1 --format x --count 32 $rsi
0x6000029147e0: 0x6f 0x4a 0x95 0x30 0x04 0x5d 0x4d 0xbe
0x6000029147e8: 0xb3 0x02 0xdd 0xa3 0x7d 0x9f 0x46 0xa7
0x6000029147f0: 0x47 0x4b 0x80 0x74 0xc9 0xfe 0x44 0xb0
0x6000029147f8: 0xb3 0x10 0xa5 0x16 0x41 0xe7 0xf5 0x39
```
到这里为止 密钥已经获取到了。
## 使用 python 脚本 处理密钥
```python title="处理密钥 python 脚本"
source = """
0x6000029147e0: 0x6f 0x4a 0x95 0x30 0x04 0x5d 0x4d 0xbe
0x6000029147e8: 0xb3 0x02 0xdd 0xa3 0x7d 0x9f 0x46 0xa7
0x6000029147f0: 0x47 0x4b 0x80 0x74 0xc9 0xfe 0x44 0xb0
0x6000029147f8: 0xb3 0x10 0xa5 0x16 0x41 0xe7 0xf5 0x39
"""
key = '0x' + ''.join(i.partition(':')[2].replace('0x', '').replace(' ', '') for i in source.split('\n')[1:5])
print(key)
```
输出如下
> 0x6f4a9530045d4dbeb302dda37d9f46a7474b8074c9fe44b0b310a51641e7f539

这就是可以用的密钥了

## 微信聊天记录存储地址

> ~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\ Support/com.tencent.xinWeChat/xxx/yyy/Message/*.db

> xxx 是版本号  

> yyy 是登录微信号的一个编码可能是 ID，如果登录多个微信 可能有多个文件夹 需要一个个查看下 可以根据最近更新时间来判断。

> 所有的微信聊天记录就保存在这个Message 目录下的db数据库文件

使用 SQLite 进行存储的，可以使用 Sqlite 查看工具查看 比如[sqlitebrowser](https://sqlitebrowser.org/) 也可以使用代码直接连接读取数据进行分析[sqlite-python](https://www.runoob.com/sqlite/sqlite-python.html)



# 相关文档
* [获取WeChat聊天记录并用photon分析](https://github.com/JIaDLu/WeChat-Records-Analysis)
* [微信数据库解析总结](https://developer.aliyun.com/article/1265761)