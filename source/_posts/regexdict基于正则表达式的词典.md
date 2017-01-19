---
title: regexdict 基于正则表达式的词典
date: 2014-01-22 00:00:00
comments: true
tags:
    -regexdict
    -正则表达式
    -Chrome插件
categories:
    - Hexo
    - GitHub
---

之前写了个用正则表达式查单词的网站 http://regexdict.com ，现在又加了个chrome app，just for fun.

项目地址：[https://github.com/solos/regexdict](https://github.com/solos/regexdict)

chrome app: [https://chrome.google.com/webstore/detail/regexdict/fbaeaihlnmngmbbejjbmjkdhlmimaknf](https://chrome.google.com/webstore/detail/regexdict/fbaeaihlnmngmbbejjbmjkdhlmimaknf)


    - 查询类似于onion的单词
``` javascript 
  ^(\w+)\w\1$
```

    - 查询只有a和b组成的单词
``` javascript 
      ^[ab]+$
```

    - 以h开头的单词
``` javascript 
      ^h.*$
```

    - 查询以tion结尾的单词
``` javascript 
      ^.*tion$
```

    - 查询包含gnu的单词
``` javascript 
      ^.*gnu.*$
```
    - 单词可以拆分成两块一样的部分的单词
``` javascript 
      ^(.*)\1$
```


chrome app demo:

    ![https://chrome.google.com/webstore/detail/regexdict/fbaeaihlnmngmbbejjbmjkdhlmimaknf](../../../../static/pic/regexdict.gif)
