public: yes
tags: [Debian7, 无线网卡, 驱动, iwlwifi, Linux]
summary: 

Debian7 安装无线网卡驱动
=========================================================


| 升级了Debian 7, 结果发现无线网络不能用了，安装了firmware-iwlwifi，还是不能用，应该是驱动的问题， 看来需要重新安装无线网卡驱动。


查看无线网卡型号 
--------------------------

| lspci|grep Network
| 03:00.0 Network controller: Intel Corporation WiFi Link 5100 
| 可以看到型号是intel wifi 5100，好了，去搜这个型号的驱动就可以了。

搜索对应驱动程序
-----------------

| 我搜到了这个 `http://wireless.kernel.org/en/users/Drivers/iwlwifi <http://wireless.kernel.org/en/users/Drivers/iwlwifi>`_
| Intel® Wireless WiFi 5100AGN 这个应该就是。


下载驱动并安装
----------------

wget `'http://wireless.kernel.org/en/users/Drivers/iwlwifi?action=AttachFile&do=get&target=iwlwifi-5000-ucode-5.4.A.11.tar.gz' <http://wireless.kernel.org/en/users/Drivers/iwlwifi?action=AttachFile&do=get&target=iwlwifi-5000-ucode-5.4.A.11.tar.gz>`_

| 解压 tar xf iwlwifi\\?action\\=AttachFile\\&do\\=get\\&target\\=iwlwifi-5000-ucode-5.4.A.11.tar.gz
| cd iwlwifi-5000-ucode-5.4.A.11/
| sudo cp iwlwifi-\*.ucode /lib/firmware
| 好了，重启下就可以了。
