---
date: 2025-05-07 18:31:00
description: ES Cat 命令记录，方便使用时查询，持续更新
title: ES Cat 命令详解
category:
  - 笔记
tag:
  - elasticsearch
star: true
---
# CAT 命令详解

```bash
#查看 cat 所有命令 
GET _cat

```

## 相关命令
```bash
_cat/allocation         #查看单节点的shard分配整体情况
_cat/shards          #查看各shard的详细情况
_cat/shards/{index}     #查看指定分片的详细情况
_cat/master          #查看master节点信息
_cat/nodes           #查看所有节点信息
_cat/indices         #查看集群中所有index的详细信息
_cat/indices/{index}      #查看集群中指定index的详细信息
_cat/segments        #查看各index的segment详细信息,包括segment名, 所属shard, 内存(磁盘)占用大小, 是否刷盘
_cat/segments/{index}#查看指定index的segment详细信息
_cat/count           #查看当前集群的doc数量
_cat/count/{index}   #查看指定索引的doc数量
_cat/recovery        #查看集群内每个shard的recovery过程.调整replica。
_cat/recovery/{index}#查看指定索引shard的recovery过程
_cat/health          #查看集群当前状态：红、黄、绿
_cat/pending_tasks   #查看当前集群的pending task
_cat/aliases         #查看集群中所有alias信息,路由配置等
_cat/aliases/{alias} #查看指定索引的alias信息
_cat/thread_pool     #查看集群各节点内部不同类型的threadpool的统计信息,
_cat/plugins         #查看集群各个节点上的plugin信息
_cat/fielddata       #查看当前集群各个节点的fielddata内存使用情况
_cat/fielddata/{fields}     #查看指定field的内存使用情况,里面传field属性对应的值
_cat/nodeattrs              #查看单节点的自定义属性
_cat/repositories           #输出集群中注册快照存储库
_cat/templates              #输出当前正在存在的模板信息

```

## 命令公共参数

```bash
# help 查看帮助信息
GET _cat/master?help

# Verbose 显示列名
GET _cat/master?v

# Headers 只显示特定列
GET _cat/master?v&h=host,ip,node

# bytes 设置输出数据大小单位
bytes=kb 以kb输出 bytes=mb 以 mb 输出
GET _cat/indices?v&h=index,docs.count,store.size&bytes=kb

# Format 输出格式
##支持的输出格式有json,test,yaml等 ##默认以text格式输出 ##以json格式输出 format=json&pretty
GET _cat/indices?v&h=index,docs.count,store.size&bytes=kb&format=json&pretty

# sort 排序
##docs.count降序 多个排序规则 使用 ,分隔 例如先根据docs.count降序然后根据store.size 升序 docs.count:desc,store.size
GET _cat/indices?v&h=index,docs.count,store.size&bytes=kb&format=json&pretty&s=docs.count:desc


```

> 可以使用 help 参数查看命令支持的数据列 然后使用 h 命令 指定查询哪些列信息

# 参考文档
* [ES CAT，博客园博客](https://www.cnblogs.com/crazymakercircle/p/15575624.html)
* [Cat 官方文档](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-cat)