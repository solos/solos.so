public: yes
tags: [ubuntu, 乱码]
summary: 

ubuntu 10.04 乱码总动员
==============================

用了一年多Ubuntu了，觉得挺不错的，非常方便，Linux确实是user-friendly，不过只是对于懂它的人。玩Linux就得折腾，不折腾就不明白其中的奥妙。正所谓没有折腾就没有发言权。单就乱码来说就有很多花样，以下是我总结的一些，希望能帮到你。

- mp3 歌曲信息乱码：

安装mutagen ：

solos@solos.so:~$ sudo apt-get install python-mutagen

然后转到你的歌曲目录, 输入：

solos@solos.so:~$ cd music

执行以全命令进行转换：

solos@solos.so:~/music$ find . -iname "\*.mp3"″ -execdir mid3iconv -e GBK {};

- PDF 乱码：

Ubuntu自带的文档阅读器Evince查看中文PDF文档有时候会无法显示中文，安装上poppler-data 就行了。

sudo apt-get install poppler-data

另外国产PDF阅读器Foxit Reader有Linux版本，可以考虑安装使用，也挺不错的。

附 ：Ubuntu Foxit Reader 1.1.0 DEB `下载地址 <http://cdn04.foxitsoftware.com/pub/foxit/reader/desktop/linux/1.x/1.1/enu/FoxitReader_1.1.0_i386.deb>`_

- 文本文件乱码

推荐安装 leafpad 文本编辑器，可以另存转码，so easy。

- Wine乱码：

首先下载宋体字体simsun.ttc ，复制到 ~/.wine/drive_c/windows /Fonts/，然后修改注册表文件~/.wine/system.reg。具体方法是 进入.wine目录，然后修改system.rg ，将[Software\Microsoft\Windows NT\CurrentVersion\FontSubstitutes] 中的：“MS Shell Dlg”=”Tahoma”“MS Shell Dlg 2″=”Tahoma”改为：“MS Shell Dlg”=”SimSun”“MS Shell Dlg 2″=”SimSun” 。
