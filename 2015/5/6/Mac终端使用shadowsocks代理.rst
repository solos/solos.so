public: no
tags: [shadowsocks, proxychains]
summary: 

Mac终端使用shadowsocks代理
==============================

安装proxychains-ng
------------------------------

    - brew install proxychains-ng

修改配置
------------------------------

    - vi /usr/local/etc/proxychains.conf

    socks5 	127.0.0.1 1080

使用
------------------------------

    - proxychains4 wget twitter.com
