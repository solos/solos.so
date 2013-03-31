public: yes
tags: [ubuntu, iso镜像源]
summary: 

Ubuntu 10.04 通过DVD iso镜像源安装软件
=====================================================

想通过DVD iso镜像更新个软件包，找了N个教程，试了N次，终于成功了。。。

挂载iso镜像

solos@solos.so:~ sudo mount ./ubuntu-10.04.3-dvd-i386.iso /media/apt -o loopsudo apt-cdrom -d=/media/apt add

修改源列表

solos@solos.so:~ sudo vi /etc/apt/sources.list

加入以下内容：

deb file:///media/apt/ lucid main universe restricted multiverse

deb file:///media/apt/ stable main universe restricted multiverse

deb file:///media/apt/ unstable main universe restricted multiverse

更新软件列表 

solos@solos.so:~ sudo apt-get update

可以安装了，试试吧，软件包不全哦。。。
