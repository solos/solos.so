public: yes
tags: [Debian, VPS, php-fpm]
summary: Linux，你的别名叫折腾

Debian VPS安装php-fpm
=====================

Debian源里面没有php-fpm，安个php都得编译，偏偏VPS内存还不够，编译的时候提示内存不够，不分配了，openvz的VPS不是内存用光直接死机吗？什么时候能提前检测了？坑爹啊。

搜了一下，找到解决方案了，就是用dotdeb.org的软件源。

solos@solos.so:~ sudo vi /etc/apt/sources.list

把之前的软件源注释掉，加上下面这个：

deb http://packages.dotdeb.org stable all

solos@solos.so:~ wget http://www.dotdeb.org/dotdeb.gpg

solos@solos.so:~ cat dotdeb.gpg | sudo apt-key add -

solos@solos.so:~ sudo apt-get update

安装php, nginx

solos@solos.so:~ sudo apt-get install php5-common php5-cli php5-fpm php5-mysql

用这个源安装mysql老是出错，最后没办法，又把源改回去了，然后再安mysql，折腾啊。
