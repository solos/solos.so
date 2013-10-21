public: yes
tags: [PhantomJs, 网页截图, 字体]
summary: 

使用PhantomJS进行网页截图
============================

PhantomJS(http://phantomjs.org)是一个无界面的Webkit内核浏览器，对DOM操作、CSS选择器、JSON、Canvas和SVG等WEB标准有非常快的、原生的支持。总之PhantomJS就是一个有API的浏览器，可以用来进行网页截图、自动化测试等。

安装
--------

- 安装依赖

  - debian/ubuntu
      solos@solos.so:~ sudo apt-get install build-essential chrpath libssl-dev libfontconfig1-dev

  - centos
      sudo yum install gcc gcc-c++ make openssl-devel freetype-devel fontconfig-devel

- 下载源码编译安装

   - solos@solos.so:~ cd pkgs
   - solos@solos.so:~/pkgs wget https://phantomjs.googlecode.com/files/phantomjs-1.9.2-source.zip
   - solos@solos.so:~/pkgs unzip phantomjs-1.9.2-source.zip && cd phantomjs-1.9.2
   - solos@solos.so:~/pkgs/phantomjs-1.9.2 ./build.sh
   - solos@solos.so:~/pkgs/phantomjs-1.9.2 sudo cp phantomjs /usr/bin/phantomjs

使用PhantomJS截图
-------------------

- 截图

   - solos@solos.so:~/pkgs/phantomjs-1.9.2 wget https://raw.github.com/ariya/phantomjs/master/examples/rasterize.js
   - solos@solos.so:~/pkgs/phantomjs-1.9.2 phantomjs rasterize.js http://solos.so solos.so.png

如果中文显示不出来的话说明没有安装对应的字体，debian/ubuntu可以安装xfonts-wqy，centos的话可以安装wqy-bitmapfont(需下载）或者bitmap
-fonts和bitmap-fonts-cjk，安装完之后中文应该就可以正常显示了。
