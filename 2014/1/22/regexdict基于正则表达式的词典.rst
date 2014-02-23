public: yes
tags: [regexdict, regex, dict, 正则表达式, 词典, chrome, 插件]
summary: 

regexdict 基于正则表达式的词典
==============================

之前写了个用正则表达式查单词的网站 http://regexdict.com ，现在又加了个chrome app，just for fun.

项目地址：https://github.com/solos/regexdict

chrome app: https://chrome.google.com/webstore/detail/regexdict/fbaeaihlnmngmbbejjbmjkdhlmimaknf

使用方法: ::

    - 查询类似于onion的单词
      ^(\w+)\w\1$

    - 查询只有a和b组成的单词
      ^[ab]+$

    - 以h开头的单词
      ^h.*$

    - 查询以tion结尾的单词
      ^.*tion$

    - 查询包含gnu的单词
      ^.*gnu.*$

    - 单词可以拆分成两块一样的部分的单词
      ^(.*)\1$

chrome app demo:
   .. image:: ../../../../static/pic/regexdict.gif
      :width: 90%
      :target: https://chrome.google.com/webstore/detail/regexdict/fbaeaihlnmngmbbejjbmjkdhlmimaknf
