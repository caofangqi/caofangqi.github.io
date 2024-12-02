---
title: 复制加密门禁卡记录
date: 2024-12-02 23:30:00
category:
    - 笔记
tag:  
    - 备忘录
    - 记录
description: 记录加密门禁卡复制操作步骤
---

部分门禁系统只认证IC卡的UID。以下为复制 UID 的操作步骤。

# 操作步骤
使用第三方软件[MifareClassicTool](https://github.com/ikarus23/MifareClassicTool/blob/master/README.zh-CN.md)读取UID,
需要一张CUID卡(不能使用UID卡)，某宝上一块多一张；


步骤如下：
1. 先读取加密卡的UID
2. 再读取CUID卡的数据，然后将CUID卡的UID改为加密卡一样的UID
3. 将修改后的数据写回到CUID卡
4. 最后用小米系统自带的门卡模拟功能，复制未加密的CUID卡即可。


## 1.读取加密卡的UID
1. 打开软件Mifare Classic Tool，将加密门禁卡放到手机的NFC感应区域
2. 识别到IC卡后，点击“工具”->“显示标签信息”，可以看到加密门禁卡的8个数字.
3. 接着打开“工具”->“BCC计算器”，输入UID，得到1位BBC(两个数字)校验数据。  
4. 
## 2.读取CUID卡数据
1. 将CUID卡放到手机的NFC感应区域，识别到IC卡后
2. 点击“读标签”->“启动映射并读取标签”，即可得到CUID白卡的所有信息。  
3. 接着修改第一行的前10个数字，改为加密门禁卡的UID（8个数字）和BCC（2个数字），一共10个数字
4. 点右上角保存图标保存。  

## 3.写数据到CUID卡
1. 再将CUID卡放到手机的NFC感应区域，识别到IC卡后，点击“写标签”，勾选“写转储(克隆)”->“显示选项”->“高级:使能厂商块写入”。  
2. 再点击“选择转储”，选择刚才保存的数据，点击“选择转储”。  
3. 在弹出的选择写扇区界面，默认即可，点击“好的”，最后点击“启动映射并写转储数据”。

## 4.NFC手机复制CUID卡
最后，使用手机系统自带的门卡模拟功能，复制刚才写入新UID的CUID卡即可。


# 参考文档
[NFC 手机模拟加密门禁卡](https://blog.csdn.net/pingis58/article/details/125458697)
[MIFARE Classic Tool (MCT)](https://github.com/ikarus23/MifareClassicTool/blob/master/README.zh-CN.md)