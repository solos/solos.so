public: yes
tags: [Linux, ssh, 出国]
summary: 

Linux VPS SSH出国
=====================

在服务器上建一个 username 的ssh帐号执行：useradd -s /bin/false username 

将用户的shell设置成/bin/false，这样用户就无法与系统进行交互。

设置密码，执行：passwd username 

试试在客户机ssh终端里面输入 ssh -qTfnN -D 7070 username@remote_server，然后在浏览器的代理服务器中，socks代理中添加：localhost 7070,其它为空。

SSH Options 

All the added options are for a ssh  session that’s used for tunneling.

- -q :- be very quite, we are  acting only as a tunnel.
- -T :- Do not allocate a pseudo tty, we are  only acting a tunnel.
- -f :- move the ssh process to background, as  we don’t want to interact with this ssh session directly.
- -N :- Do  not execute remote command.
- -n :- redirect standard input to  /dev/null.

In addition on a slow line you can gain performance by  enabling compression with the -C option. 

搭配Chrome插件Proxy SwitchySharp使用更方便，musca桌面不支持，好可怜。。。

PS: Windows下可以使用mytunnel，此乃居家旅行杀人越货必备良品。
