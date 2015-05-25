public: yes
tags: [Dropbox, Ubuntu]
summary: 

使用Dropbox同步Linux配置文件
======================================

方法很简单，只需要在Dropbox 主文件夹下建一个文件夹（不要建在Public文件夹下），例如config，然后建个符号链接就行了,以后打开Dropbox就会自动同步配置文件了，Dropbox确实非常好用。

- vim  
    - ln -s ~/.vim  ~/Dropbox/config; 
    - ln -s ~/.vim.rc  ~/Dropbox/config

- 星际译王
    ln -s ~/.stardict  ~/Dropbox/config

- KeePassX
    ln -s ~/.keepassx  ~/Dropbox/config

- audacity
    ln -s ~/.audacity-data  ~/Dropbox/config

- Bash
    ln -s ~/.bashrc  ~/Dropbox/config ; ln -s ~/.bash_profile  ~/Dropbox/config

- 头像（呵呵）
    ln -s ~/.face  ~/Dropbox/config

- Gnome桌面配置
    ln -s ~/.gconf  ~/Dropbox/config

- Gnote笔记
    ln -s ~/.gnote  ~/Dropbox/gnote
