public: yes
tags: [Ubuntu, MySQL, 编码]
summary: 

Ubuntu下修改Mysql默认编码
=========================

MySQL的默认编码是Latin1，不支持中文，在用Python框架进行WEB开发的时候，经常遇到乱码的问题。最好的解决方法就是统一使用UTF-8编码。操作步骤如下：
    - 中止MySQL服务  sudo /etc/init.d/mysql stop
    - 修改配置文件my.cnf（/etc/mysql/my.cnf 或者/etc/my.cnf)，在[client]和[mysqld]下面加上一句default-character-set=utf8，保存并关闭。
    - 启动MySQL服务（sudo /etc/init.d/mysql start）
    - 用mysql -u root -p命令进入数据库系统，用SHOW VARIABLES LIKE ‘character_set_%’;命令查看字符集。
