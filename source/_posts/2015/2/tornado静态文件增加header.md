---
title: tornado静态文件加header
date: 2015-02-11 00:00:00
comments: true
tags:
    - tornado
    - firefox
    - fontawesome
categories:
    - python
---

一个tornado的项目用了fontawesome，发现firefox浏览器下乱码了，查了一下需要加header

``` python

    import tornado.web
    import tornado.ioloop
    import tornado.autoreload

    class ExtStaticFileHandler(tornado.web.StaticFileHandler):

        def set_extra_headers(self, path):
            self.set_header('Access-Control-Allow-Origin', '*')

    settings = {
        "debug": True,
    }

    application = tornado.web.Application([
        (r'/static/(.*)', ExtStaticFileHandler, {'path': 'static'}),
    ], **settings)

    if __name__ == "__main__":
        application.listen(8888)
        instance = tornado.ioloop.IOLoop.instance()

        tornado.autoreload.start(instance)
        instance.start()

```
