---
title: MySQL修改密码
date: 2012-07-16 00:00:00
comments: true
tags:
    - MySQL
    - 密码
---

## 安装时修改

``` bash
    mysqladmin -u root password new_password
```

## MySQL中修改

``` bash
    mysql> UPDATE user SET password=PASSWORD('new_password') WHERE user=’root’;
    mysql> FLUSH PRIVILEGES;
```

## 忘记密码

    mysqld启动的时候加上 --skip-grant-tables，然后修改密码，去掉skip-grant-tables重启即可。
