---
title: Mac终端下使用shadowsocks代理
date: 2015-05-06 00:00:00
comments: true
tags:
    - shadowsocks
    - proxychains
categories:
    - shadowsocks
---

#安装proxychains-ng

``` bash
    brew install proxychains-ng
```

#修改配置

``` bash
    
    vi /usr/local/etc/proxychains.conf

    socks5 	127.0.0.1 1080

#使用

``` bash
    proxychains4 wget twitter.com
```
