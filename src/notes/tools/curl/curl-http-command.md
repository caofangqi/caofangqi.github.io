---
title: Curl Http 请求基础命令 
date: 2025-04-24 18:00:00
category:
    - 笔记
tag:  
    - 备忘录
    - Curl
description:  curl 请求 http 的基本操作，参数介绍 等
---

# Curl Http 请求基础命令 
## curl  的由来
 1996 年起源于为 IRC 机器人获取汇率数据的小工具，历经多次更名和功能扩展。名字源于 “Client URL”，旨在进行可靠的互联网协议数据传输。 [详情点击 How it started](https://everything.curl.dev/project/started.html#how-it-started)

## 自定义请求信息
### 显示指定Request Method(请求方法)
[Everything curl Request Method](https://everything.curl.dev/http/modify/method.html#request-method)

| 序号  | 方法      | 描述                                                                             |
| --- | ------- | ------------------------------------------------------------------------------ |
| 1   | GET     | 从服务器获取资源。用于请求数据而不对数据进行更改。例如，从服务器获取网页、图片等。                                      |
| 2   | POST    | 向服务器发送数据以创建新资源。常用于提交表单数据或上传文件。发送的数据包含在请求体中。                                    |
| 3   | PUT     | 向服务器发送数据以更新现有资源。如果资源不存在，则创建新的资源。与 POST 不同，PUT 通常是幂等的，即多次执行相同的 PUT 请求不会产生不同的结果。 |
| 4   | DELETE  | 从服务器删除指定的资源。请求中包含要删除的资源标识符。                                                    |
| 5   | PATCH   | 对资源进行部分修改。与 PUT 类似，但 PATCH 只更改部分数据而不是替换整个资源。                                   |
| 6   | HEAD    | 类似于 GET，但服务器只返回响应的头部，不返回实际数据。用于检查资源的元数据（例如，检查资源是否存在，查看响应的头部信息）。                |
| 7   | OPTIONS | 返回服务器支持的 HTTP 方法。用于检查服务器支持哪些请求方法，通常用于跨域资源共享（CORS）的预检请求。                        |
| 8   | TRACE   | 回显服务器收到的请求，主要用于诊断。客户端可以查看请求在服务器中的处理路径。                                         |
| 9   | CONNECT | 建立一个到服务器的隧道，通常用于 HTTPS 连接。客户端可以通过该隧道发送加密的数据。                                   |

```shell
#默认会根据选项自动选择请求方法，使用 -X  和 --request 参数可以 显示指定请求方法，
#GET 方法 
curl http://example.com/file
#使用  -X 显示指定请求方法
curl http://example.com/file -X POST
#使用 --request 指定 也是一样的
curl http://example.com/file -X POST

```

### 请求头设置
```shell
# 可以使用 -H 或者 --header 设置请求头 可以设置多个请求头
curl -H "Host: test.example" http://example.com/
# 如下 请求
curl 'https://ug.baidu.com/mcp/pc/pcsearch' \
  -H 'Accept: */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://www.baidu.com' \
  -H 'Referer: https://www.baidu.com/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --data-raw '{"invoke_info":{"pos_1":[{}],"pos_2":[{}],"pos_3":[{}]}}'
```

## HTTP POST
[Everything curl - Simple POST](https://everything.curl.dev/http/post/simple.html#simple-post)
### 简单的 POST 请求
```shell
#可以使用 -d or --data 设置 表单数据 多个键值对使用 & 分隔
curl -d 'name=admin&shoesize=12' http://example.com/
#也可以这么写
curl -d name=admin -d shoesize=12 http://example.com/
#参数过大的时候 可以从文件里读取(从文件读取数据时,-d 选项会跳过回车符和换行符，所以如果您希望这些字符包含在数据中，则需要使用 --data-binary 选项) 
curl -d @filename http://example.com
#-d 选项会去重换行符和回车符 如果要给文件原样请求过去 可以使用  --data-binary
curl --data-binary @filename http://example.com/
#要发送以 @ 符号开头的 POST 请求体，为避免 curl 将其当作文件名加载，请改用 --data-raw。此选项不具备文件加载功能：
curl --data-raw '@string' https://example.com

```
### Content-Type
> 使用 curl 的 - d 选项进行 POST 请求时，包含一个默认的头部 `Content-Type: application/x-www-form-urlencoded`
```shell 
# 请求其他格式时，需要设置对应 ContentType，例如请求 json 数据时 需要设置 
curl -d '{json}' -H 'Content-Type: application/json' https://example.com
```

### JSON

curl 7.82.0 新增了 --json 选项，使用 POST发送 json 数据，等同于下面三个选项
```shell
--data-binary [arg]
--header "Content-Type: application/json"
--header "Accept: application/json"
```
curl 不会处理数据，需要自行保证是 json 数据，例如:
```shell
#简单的 json 请求
curl --json '{"tool": "curl"}' https://example.com/
#使用本地 json 文件请求
curl --json @json.txt https://example.com/
#从输入上取json数据
echo '{"a":"b"}' | curl --json @- https://example.com/
#可以使用多个 --json 选项 curl 会连接选项的内容 并且一次性发送数据,但是 拼接多个选项参数是简单的文本拼接，不会自动处理 json 格式合并，需要自己保证拼接之后是一个 json 格式数据
curl --json @json.txt --json ', "end": "true"}' https://example.com/

#接受 json 数据格式化打印
curl --json '{"tool": "curl"}' https://example.com/ | jq

```

### 多部分表单数据(Multipart/form-data)
一般在上传文件时，都会使用该格式。
使用 `-F` (or `--form`)选项 添加每个单独的部分数据。如下
```shell 
# 提交了两部分数据  一个文本键值对和一个文件
curl -F person=anonymous -F secret=@file.txt http://example.com/submit.cgi
```



# 参考文档
* [curl tutorial ](https://curl.se/docs/tutorial.html)
* [Copy as curl](https://everything.curl.dev/cmdline/copyas.html)
* [Everything curl](https://everything.curl.dev/index.html)
* [菜鸟教程-HTTP 请求方法](https://www.runoob.com/http/http-methods.html)