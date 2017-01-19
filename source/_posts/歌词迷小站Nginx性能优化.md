---
title: 歌词迷小站Nginx性能优化
date: 2016-08-13 13:07:43
comments: true
tag: 
  - Nginx
  - Linux
categories:
  - Nginx
---

最近我的歌词小站来了很多流量，我的VPS差点没抗住。吓得我赶紧改了改系统参数，优化了一下，记录下。
PS. Vultr的VPS CPU性能不错，安利一下[vultr](http://www.vultr.com/?ref=6804560)

# Nginx

由于我的VPS只有一个核，所以那种开多个worker，分别绑定各个核的用不了(worker_cpu_affinity)，原谅我太穷了 :( 

## 启用epoll 增大worker_connections

``` bash
    events {
        use epoll;
        worker_connections  65535;
    }
```

## 增大backlog

``` bash

  server {
        listen   80 backlog=8192; # 写一次就行
        listen 443 ssl;

  ...

  }
```

## Gzip

``` bash

    gzip  on;
    gzip_comp_level  2;
    gzip_http_version 1.0;
    gzip_min_length  1000;

```

## Buffer

``` bash
    client_body_buffer_size 10K;
    client_header_buffer_size 4k;
    client_max_body_size 2m;
    large_client_header_buffers 2 4k;
```

## Expires

``` bash

    location / {
        root   /var/www/statics;
        index  index.html index.htm;
        if ($request_filename ~* \.(jpg|jpeg|gif|png|css|js)$)
        {
            expires      max;
        }
    }

```

# 内核

## 查看状态

``` bash
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'

FIN_WAIT2 3004
CLOSING 49
SYN_RECV 207
TIME_WAIT 528
ESTABLISHED 11011
LAST_ACK 616
FIN_WAIT1 2475
```

## 修改配置

```
sudo vi /etc/sysctl.conf

net.ipv4.tcp_syncookies = 1 # 
net.core.somaxconn = 8192 #定义了系统中每一个端口最大的监听队列的长度 默认128
net.ipv4.tcp_tw_reuse = 1 #表示是否允许将处于TIME-WAIT状态的socket用于新的TCP连接
net.ipv4.tcp_tw_recycle = 1 #能够更快地回收TIME-WAIT套接字
net.ipv4.tcp_keepalive_time = 60 # TCP发送keepalive探测消息的间隔时间（秒），用于确认TCP连接是否有效。
net.ipv4.ip_local_port_range = 10000 65000 # 表示TCP/UDP协议允许使用的本地端口号
net.ipv4.tcp_max_syn_backlog = 8192 # 对于还未获得对方确认的连接请求，可保存在队列中的最大数目。如果服务器经常出现过载，可以尝试增加这个数字。
net.ipv4.tcp_max_tw_buckets = 8000 # 表示系统同时保持TIME_WAIT套接字的最大数量，如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。
net.ipv4.tcp_fin_timeout = 5 对于本端断开的socket连接，TCP保持在FIN-WAIT-2状态的时间（秒）。对方可能会断开连接或一直不结束连接或不可预料的进程死亡。

```

## 使配置生效

``` bash
　/sbin/sysctl -p
```

## 查看TIME_WAIT

``` bash
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'

```

参考：
    [Nginx性能优化](https://mos.meituan.com/library/30/how-to-optimize-nginx/)
    [鸡鸡哥的nginx优化参数一backlog=8192](http://www.hardwork.cn/html/archives/630.html)
    [读书笔记之linux内核参数优化](http://blog.edagarli.com/2016/01/18/linux%E5%86%85%E6%A0%B8%E5%8F%82%E6%95%B0%E4%BC%98%E5%8C%96/)
