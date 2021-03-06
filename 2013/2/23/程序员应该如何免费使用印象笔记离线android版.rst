public: yes
tags: [Evernote, Android, 印象笔记, 离线笔记]
summary: 

程序员应该如何使用印象笔记android版
=========================================================


前言
----

本文假设读者是程序员并且用过印象笔记，包括桌面版和android手机版，iOS高富帅用户请绕行。

缘起
----

印象笔记android手机版默认没有离线浏览的功能，在联网状态下浏览后会缓存，但需要挨个去点一遍，笔记多了就没办法了。而离线笔记本功能只提供给付费用户，30元一月的价格对本人来说暂时无法接受，所以有了这篇教程。

我想用印象笔记手机版离线浏览笔记，但没有money，所以我想看看有没有变通的办法。

经过
----

我看了下印象笔记的文件夹，发现笔记都在/mnt/sdcard/Evernote/user-xxxxx/notes里面，以笔记的guid前三个字符为父文件夹名，以笔记guid为子文件夹名，子文件夹里面都有一个笔记文件content.enml，enml就是evernote markup language的缩写，其实也是个xml文件。所以只要按照这样的方式建好文件夹，写好文件，就可以离线浏览了。

于是我就想办法导出笔记，按照这篇文章 `http://richardzhao.me/?p=313 <http://richardzhao.me/?p=313>`_ 的方法在evernote sandbox中导出了手动创建的笔记，但是还没法用，因为没有办法将笔记导入到sandbox（sandbox帐号没法使用桌面版登录，应该可以使用api创建笔记到sandbox，略疼）。

之后我看到/mnt/sdcard/Evernote/user-xxxxx/下面有个.external-xxxxx.db，肯定是sqlite数据库，使用sqliteman打开后看到有notes表，所有的信息都在这里了，哈哈，我太有才了，原谅我在这紧要关头先自恋一番 : ) .

只要根据笔记的某个信息查出guid，一切问题就迎刃而解了。刚开始我使用的是创建时间，后来发现这个时间格式有问题，对不起来，改用笔记标题，查出了guid，我把写好的notes文件夹拷贝到手机里，发现还是不能用，还要联网。

我又看了下notes表结构，发现有一个cached字段（大部分为0，有一些为1），好了，只要把这个字段都改成1就行了。我把cached字段改完了之后又把这个sqlite数据库拷贝到手机里覆盖掉原先的文件（不放心可以先备份）。然后就是见证奇迹的时刻了。

附上代码地址：https://gist.github.com/solos/5018772

如果你有更好的方法（除了付费），欢迎跟我交流，印象笔记做得挺好，不差钱的话不用这麽折腾，付费支持吧，等我逆袭了我也升级到pro版。
