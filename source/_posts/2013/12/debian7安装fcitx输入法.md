---
title: Debian7编译安装fcitx输入法
date: 2013-12-01 00:00:00
comments: true
tags:
    - Debian7
    - Fcitx
    - 输入法
categories:
    - Linux
---

记录下Debian7安装fcitx输入法的过程，以后写个脚本搞搞自动化（又不知道得拖到哪天）。

#安装依赖
``` bash
sudo apt-get install automake libtool intltool libxrender-dev libcairo2-dev libpango1.0-dev libgtk2.0-dev
```

#下载fcitx输入法源代码

``` bash
wget `https://github.com/fcitx/fcitx/archive/4.0.1.zip <https://github.com/fcitx/fcitx/archive/4.0.1.zip>`_
unzip 4.0.1.zip
cd fcitx-4.0.1/
./autogen.sh
./configure --prefix=/usr/local/fcitx
sudo make
sudo make install
```

#配置fcitx

    - 将以下配置加入~/.bashrc::

``` bash
        export GTK_IM_MODULE=fcitx
        export XMODIFIERS=@im=fcitx
        export QT_IM_MODULE=fcitx
        export PATH=/usr/local/fcitx/bin/:${PATH}
```

    - 将以下配置加入~/.musca_start::    

``` bash
        exec /usr/local/fcitx/bin/fcitx -d &
```
