---
title: 使用Dropbox同步Linux配置文件
date: 2012-03-04 00:00:00
comments: true
tags:
    - Dropbox
    - Ubuntu
categories:
    - Linux
---

方法很简单，只需要在Dropbox 主文件夹下建一个文件夹（不要建在Public文件夹下），例如config，然后建个符号链接就行了,以后打开Dropbox就会自动同步配置文件了，Dropbox确实非常好用。

## vim  
``` bash
    - ln -s ~/.vim  ~/Dropbox/config; 
    - ln -s ~/.vim.rc  ~/Dropbox/config
```

## 星际译王
``` bash
    ln -s ~/.stardict  ~/Dropbox/config
```

## KeePassX
``` bash
    ln -s ~/.keepassx  ~/Dropbox/config
```

## audacity
``` bash
    ln -s ~/.audacity-data  ~/Dropbox/config
```

## Bash
``` bash
    ln -s ~/.bashrc  ~/Dropbox/config ; ln -s ~/.bash_profile  ~/Dropbox/config
```

## 头像（呵呵）
``` bash
    ln -s ~/.face  ~/Dropbox/config
```

## Gnome桌面配置
``` bash
    ln -s ~/.gconf  ~/Dropbox/config
```

## Gnote笔记
``` bash
    ln -s ~/.gnote  ~/Dropbox/gnote
```
