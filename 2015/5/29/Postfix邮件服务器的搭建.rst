public: yes
tags: [postfix, 邮件服务器,]
summary: 

Postfix邮件服务器的搭建
==============================


安装postfix
------------------------------------------------------------------------------------ 
sudo apt-get install postfix

安装过程中会有界面要选择配置类型，选择Internet Site
System mail name 或者 domain name 里填你的域名:

假设我的邮箱是用的子域名：mail.example.com，这里就填mail.example.com。

修改postfix配置
------------------------------------------------------------------------------------ 

安装完成后，打开/etc/postfix/main.cf，这是postfix最重要的配置文件，解释一下目前最重要的几个参数:

myorigin = /etc/mailname
这里将myorigin指定到一个文件，这个文件的第一行会作为myorigin的值，如果没错这个/etc/mailname有且只有一行，即刚才安装postfix时配置的值mail.example.com。

myhostname = mail.example.com
mydestination = mail.example.com, 10-10-54-87, localhost.localdomain, localhost
注意以上三行配置应该默认就是这样，不用修改的。这三行配置不是在一起的，也没有必要放在一起。mydestination告诉postfix所有发往这些地址的邮件都存储到本地邮箱。

smtpd_relay_restrictions = permit_mynetworks permit_sasl_authenticated defer_unauth_destination
smtpd_recipient_restrictions = permit_mynetworks permit_sasl_authenticated reject_unauth_destination
以上配置告诉postfix如果是本地局域网发邮件则允许，否则需要先登录才能发邮件。这个配置要根据实际情况做修改。比如假设局域网有很多不能让你放心的电脑，可以修改

mynetworks = 127.0.0.1
这样只有本机才有不登录发邮件的特权。

暂时用不着tls，注释掉关于tls的配置:

# TLS parameters
# smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
# smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
# smtpd_use_tls=yes
# smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
# smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache
配置好这些，再只需要配置好域名的MX记录，就可以发邮件了。每次修改完postfix配置文件后记得


重启postfix
------------------------------------------------------------------------------------ 
service postfix restart


配置域名MX记录
------------------------------------------------------------------------------------ 

域名记录解析里要加两条记录，一条A记录，指向邮件服务器的ip，一条MX记录，指向邮箱域名。如图：

mail  A     1.1.1.1
mail  MX    mail.example.com

配置完等一会后可以通过nslookup检测是否已经生效

nslookup -q=a mail.example.com
如果响应里的Address是你配置的ip则表示已生效。同样

nslookup -q=mx mail.example.com
返回的结果里的mail exchanger应该等于mail.example.com

用telnet测试发信
------------------------------------------------------------------------------------ 

这样的配置已经可以发信了！但是因为还没有配置spf和dkim，发出去的信很可能会被当做垃圾邮件，这个后面会讲到，现在为了测试配置是否成功，先不管了。另外，因为没有配置smtp验证，只能匿名发信。(>号打头的表示是我输入的，但是并不需要输入>号，这样是为了区分哪些是我输入的)


.. code-block:: bash

    $> telnet localhost 25
    Trying ::1...
    Connected to localhost.
    Escape character is '^]'.
    220 mail.example.com ESMTP Postfix
    > HELO mail.example.com
    250 mail.example.com
    > mail from: admin@mail.example.com
    250 2.1.0 Ok
    > rcpt to: your@email.address
    250 2.1.5 Ok
    > data
    354 End data with <CR><LF>.<CR><LF>
    > subject: Test
    >   
    > This is a test mail
    > .
    > 
    250 2.0.0 Ok: queued as B9AD4204C7
    > quit
    221 2.0.0 Bye

注意邮件格式，第一行必须以subject:打头，后面跟邮件标题，然后空一行写邮件正文，最后以换行.换行表示写完了。
现在去邮箱收邮件吧，注意检查垃圾箱。
到这里，postfix已经可以做基本的发信动作了。但是这还不够，因为postfix被配置为远程访问时需要登陆才能发信，当你在一台非局域网的机器，所以接下来需要配置smtp验证。


之前已经配置好了postfix，这里讲怎么配置使Postfix启用smtp验证。


安装dovecot
---------------------------------------
apt-get install dovecot-core

打开/etc/dovecot/conf.d/10-auth.conf，找到然后修改下面这行代码：

auth_mechanisms = plain login
打开/etc/dovecot/conf.d/10-master.conf，找到service auth并修改其中的内容：

.. code-block:: bash

    service auth {

        unix_listener /var/spool/postfix/private/auth {
            mode = 0600
            group = postfix
            user = postfix
        }
    }


改完后重启dovecot:

service dovecot restart

检查private/auth是否被创建:

ls /var/spool/postfix/private/auth
然后修改/etc/postfix/main.cf:

smtpd_sasl_auth_enable = yes
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
broken_sasl_auth_clients = yes

以上几行配置告诉Postfix启用sasl验证并用dovecot来做验证，broken_sasl_auth_clients是为了保证兼容性。

添加用户
以上已经完成了smtp验证的配置，当然这里只是简单的使用了系统用户，而非虚拟用户，对于简单的情况，系统用户已经够用了。简单添加一个用户来测试：

useradd -s /usr/sbin/nologin admin -p admin
以上创建了一个账号密码均为admin的用户，而且出于安全考虑这个用户不能登录到这台服务器。接着在控制台输入:

perl -MMIME::Base64 -e 'print encode_base64("admin");'
YWRtaW4=
返回的这一段文本是admin经base64加密后的样子，这在后面的登录测试里会用到。

用telnet测试配置是否成功

.. code-block:: bash

    $> telnet localhost 25
    Trying ::1...
    Connected to localhost.
    Escape character is '^]'.
    220 mail.example.com ESMTP Postfix
    > EHLO  mail.example.com
    250-m mail.example.com
    250-PIPELINING
    250-SIZE 10240000
    250-VRFY
    250-ETRN
    250-AUTH PLAIN LOGIN
    250-AUTH=PLAIN LOGIN
    250-ENHANCEDSTATUSCODES
    250-8BITMIME
    250 DSN

注意之前我们测试是用的HELO命令，现在因为要做登录操作，所以要用EHLO命令，后者是对前者的扩展（加入了身份认证）。

当看到250-AUTH PLAIN LOGIN即表示之前的配置生效了。

.. code-block:: bash

    > auth login
    334 VXNlcm5hbWU6 # Username:
    > YWRtaW4=
    334 UGFzc3dvcmQ6 # Password:
    > YWRtaW4=
    235 2.7.0 Authentication successful

看到Authentication successful表示我们的账号配置成功。

到了这一步，已经可以用任何语言（Java、Ruby、NodeJS）在任何接入互联网的电脑上通过这台服务器发邮件了（记得防火墙打开25端口）。但是发出去的邮件会极大概率被当做垃圾邮件，这是因为还有非常重要的SPF和DKIM没有配置。


配置SPF
------------------------------------------------------------------------------------ 

什么是SPF，先看看SPF长什么样：

v=spf1 ip4:xxx.xx.xxx.xx -all
这条记录配置在域名解析里，就是说我这个域名的邮件全都是来自这个服务器发送的，其他ip发出来的都是仿冒的。通过设置这条记录，可以很大程度上提高域名的信誉。在域名解析里添加一条TXT记录即可：

配置完成后稍等一会，用

nslookup -q=txt mail.example.com
来测试，返回结果里包含设置的psf结果就表示已经生效。

可以尝试给gmail发一封邮件，收到邮件后show origin，可以看到spf: pass

配置DKIM
------------------------------------------------------------------------------------ 

apt-get install opendkim opendkim-tools
打开/etc/opendkim.conf，加上以下代码:

Domain          mail.example.com
KeyFile         /etc/postfix/dkim.key
Selector        default
SOCKET          inet:8891@localhost
打开/etc/default/opendkim，加上:

SOCKET="inet:8891@localhost"
打开/etc/postfix/main.cf，加上:

# DKIM
milter_default_action = accept
milter_protocol = 2
smtpd_milters = inet:localhost:8891
non_smtpd_milters = inet:localhost:8891
生成DKIM Key

opendkim-genkey -t -d mail.example.com
这个命令会在当前目录下生成default.private和default.txt，将default.private移动到我们配置的路径:

mv default.private /etc/postfix/dkim.key
启动opendkim

service opendkim start
service postfix restart
设置域名解析

cat mail.txt
你将会看到类似：

default._domainkey  IN  TXT ( "v=DKIM1; k=rsa; "
  "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1tUwIQPaFVDGYFIe18HTRYYW5OQAS7LYLD1atDW1uphvs19yk7dYp30jI+CI/xNeCje4en0umd5eVTaYxQV2h6va0lqBtD6xCYqvUbVnjAcf+6iyyiQzzN6rOYcVsBmsX/0IjxDBqQDYD5L9JDXiwkI6pPiOMKAwqtUXoFm6sCQIDAQAB" )  ; ----- DKIM key default for example.com
  将从v=DKIM1开始的到最后一个双引号之前的字符串拷贝出来，并去掉其中k=rsa;之后的双引号和双引号之间的空白内容，处理后如下

  v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1tUwIQPaFVDGYFIe18HTRYYW5OQAS7LYLD1atDW1uphvs19yk7dYp30jI+CI/xNeCje4en0umd5eVTaYxQV2h6va0lqBtD6xCYqvUbVnjAcf+6iyyiQzzN6rOYcVsBmsX/0IjxDBqQDYD5L9JDXiwkI6pPiOMKAwqtUXoFm6sCQIDAQAB
  然后新建一个DNS记录，类型为TXT，主机记录值为default._domainkey.mail，记录值为刚才处理后的长串文本。

  测试DKIM

  你可以用你配置好的邮箱给你的gmail邮箱发一封信，然后看是否有signed-by标记以及其值是否为mail.example.com。可以参考这个：http://www.appmaildev.com/en/dkim/

  全面测试
  有一个网站http://www.mail-tester.com/，可以很方便的、全方位的检查你的邮件有哪些问题，并给出建议。按照建议一条条改，争取拿到10分，保证更大的概率不被当做垃圾邮件。

  但是这些配置做得再好，如果发送的内容确实是垃圾邮件，也是于事无补的。关键是内容，这些技术只是铺垫。怎么发邮件可以参考http://www.zhihu.com/question/19574247，讲得已经很详细了！
