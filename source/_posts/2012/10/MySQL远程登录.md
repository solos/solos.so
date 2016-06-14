---
title: MySQL远程登录
date: 2012-10-28 00:00:00
comments: true
tags:
    - MySQL
    - 远程登录
categories:
    - MySQL
---

默认情况下，MySQL只允许本地登录，远程登录需要修改/etc/mysql/my.cnf文件，并赋予用户权限。

## 注释掉bind-address

``` bash
    bind-address=127.0.0.1 ==> #bind-address=127.0.0.1
```

## 授权用户远程登录:

``` bash
    mysql> GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "passwd";
    mysql> flush privileges;
```
