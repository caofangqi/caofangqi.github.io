---
title: Git 清理大文件 BFG
date: 2024-12-04 23:20:00
category:
    - 笔记
tag: 
    - Git
    - 技术笔记
description: Git仓库特别大怎么办，试试 BFG 吧
---

# Git 清理大文件 
公司有个项目2G 大小，每次 clone 得等待半天才行，研究了一下发现是有人给dump 文件提交进去了。那个文件就1.xG，然后就找到了 bfg 清理非常成功。

## 清理步骤
### step 1 克隆仓库需要清理的仓库 使用 --mirror 
```shell
git clone --mirror git://example.com/some-big-repo.git
```
### step 2 开始清理
> bfg.jar 可以去下面的链接里下载
> 清理之前建议先备份一下
```shell title='删除commit历史中，文件大小大于100M的文件。'
java -jar bfg.jar --strip-blobs-bigger-than 100M some-big-repo.git
```
### step 3 清理不必要的文件

 ```shell title='清理不必要的文件，缩小本地仓库'
 cd some-big-repo.git
 git reflog expire --expire=now --all && git gc --prune=now --aggressive
 ```

 ### step 4 推送远程
 ```shell
 git push
 ```
 ## 参考文档
 * [bfg 文档](https://rtyley.github.io/bfg-repo-cleaner/#download)