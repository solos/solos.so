public: yes
tags: [MySQL, 修改密码, 忘记密码]
summary: 

MySQL修改密码
==================================

- 安装时修改

    mysqladmin -u root password new_password

- MySQL中修改

    mysql>UPDATE user SET password=PASSWORD('new_password') WHERE user=’root’;
    mysql>FLUSH PRIVILEGES;

    或者

    mysql>SET PASSWORD FOR root=PASSWORD('new_password');

- 忘记密码
    mysqld启动的时候加上 --skip-grant-tables，然后修改密码，去掉skip-grant-tables重启即可。
