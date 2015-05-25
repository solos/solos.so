public: yes
tags: [MySQL, 远程登录]
summary: 

MySQL远程登录
==============

默认情况下，MySQL只允许本地登录，远程登录需要修改/etc/mysql/my.cnf文件，并赋予用户权限。

- 注释掉bind-address

    bind-address=127.0.0.1 ==> #bind-address=127.0.0.1

- 授权用户远程登录:

    mysql> GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "passwd";
    mysql> flush privileges;
