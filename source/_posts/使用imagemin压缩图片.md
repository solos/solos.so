---
title: 使用imagemin压缩图片
tags: []
categories:
  - Linux
date: 2017-01-19 16:23:11
---

# 前言

我们使用了七牛的图片CDN服务，随着文章越来越多，图片也越来越多，流量翻倍，成本飙升，于是我们开始找图片压缩方案。七牛自带了一个图片瘦身服务，我们试用了下，发现有些图片没有瘦身成功。提工单问了下，说是是压缩耗时超过5s 就直接返回了，让我们先转 jpg 然后再瘦身，我试了下，失真比较严重。不得不找别的方案。
后来发现了 imagemin 这个库，换上了，感觉还不错，记录下安装使用过程。


# 安装

## 安装 libpng
``` bash
yum install libpng-devel
```
## 安装 imagemin
``` bash
npm install --save imagemin
```
## 安装 glibc-2.14

- 查看 glibc 版本

``` bash
strings /lib64/libc.so.6 |grep GLIBC_
```
- 下载 glibc-2.14

``` bash 
wget http://ftp.gnu.org/gnu/glibc/glibc-2.14.tar.gz
```
- 安装glibc-2.14

``` bash
tar -zxvf glibc-2.14.tar.gz && cd glibc-2.14 && mkdir build && cd build
../configure --prefix=/opt/glibc-2.14
make -j 4
make install
``` 
- 增加配置到~/.bashrc

``` bash
vi ~/.bashrc
export LD_LIBRARY_PATH=/opt/glibc-2.14/lib:$LD_LIBRARY_PATH
source ~/.bashrc
```

# 使用

只要在压缩成功的回调函数里上传图片到七牛就可以了。

``` bash

var EventProxy = require('eventproxy');
var qiniu = require('qiniu');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

module.exports = function(req, res, app) {
    var ep = new EventProxy();
    ep.fail(function(err) {
        res.send(JSON.stringify({
            success: false,
            msg: '上传没有成功'
        }));
    });
    ep.once('response', function(data) {
        ep.unbind();
        res.json(data);
    });
    //应用配置
    var logger = app.get('logger');
    //请求参数
    var file = req.files;
    qiniu.conf.ACCESS_KEY = app.get('cfg').qiniu.AK;
    qiniu.conf.SECRET_KEY = app.get('cfg').qiniu.SK;
    var bucketNews = app.get('cfg').qiniu.bucketNews;
    //生成上传token
    var putPolicy = new qiniu.rs.PutPolicy(bucketNews);
    var token = putPolicy.token();
    //上传文件
    var extra = new qiniu.io.PutExtra();

    imagemin([file.upload_file.path], [], {
        plugins: [
                imageminMozjpeg(),
                imageminPngquant({quality: '75-80'})
        ]
    }).then(files => {
        if (files.length > 0) {
            var body = files[0].data;
            qiniu.io.put(token, null, body, extra, ep.done(function(ret) {
                fs.unlink(file.upload_file.path);
                var bucketNewsDomain = app.get('cfg').qiniu.bucketNewsDomain;
                var download_url = downloadUrl(bucketNewsDomain, ret.key);
                    ep.emit('response', {
                        success: true,
                        file_path: download_url,
                        msg: '上传成功'
                    });
            }));
        } else {
            ep.emit('response', {
                success: false,
                msg: '上传失败'
            });
        }
    });

    function downloadUrl(domain, key) {
        var baseUrl = qiniu.rs.makeBaseUrl(domain, key);
        var policy = new qiniu.rs.GetPolicy();
        return policy.makeRequest(baseUrl);
    }
};

```

# 备注

    安装 glibc-2.14之后时区错了，要替换下时区文件 /opt/glibc-2.14/etc/localtime