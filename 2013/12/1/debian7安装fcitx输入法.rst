public: yes
tags: [Debian7, Fcitx, 输入法]
summary: 

Debian7编译安装fcitx输入法
=========================================================

 记录下Debian7安装fcitx输入法的过程，以后写个脚本搞搞自动化（又不知道得拖到哪天）。

安装依赖
--------
| sudo apt-get install automake libtool intltool libxrender-dev libcairo2-dev libpango1.0-dev libgtk2.0-dev

下载fcitx输入法源代码
----------------------

| wget `https://github.com/fcitx/fcitx/archive/4.0.1.zip <https://github.com/fcitx/fcitx/archive/4.0.1.zip>`_
| 解压 unzip 4.0.1.zip
| cd fcitx-4.0.1/
| ./autogen.sh
| ./configure --prefix=/usr/local/fcitx
| sudo make
| sudo make install

配置fcitx
-----------------------------

    将以下配置加入~/.bashrc::

        export GTK_IM_MODULE=fcitx
        export XMODIFIERS=@im=fcitx
        export QT_IM_MODULE=fcitx
        export PATH=/usr/local/fcitx/bin/:${PATH}

    将以下配置加入~/.musca_start::    

        exec /usr/local/fcitx/bin/fcitx -d &
