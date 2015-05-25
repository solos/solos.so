public: yes
tags: [sphinx, python, 中文搜索]
summary: 

Sphinx文档中文搜索支持
==============================

安装结巴中文分词 
-------------------

    pip install jieba

复制spinx中文搜索插件
_____________________________

https://github.com/bosbyj/sphinx.search.zh_CN

cp sphinx.search.zh_CN.py /Library/Python/2.7/site-packages/sphinx/search/zh_CN.py # 注意一下sphinx安装路径


修改Sphinx代码
----------------------------------

vi /Library/Python/2.7/site-packages/sphinx/search/__init__.py  # 注意一下sphinx安装路径

.. code-block:: python

    from sphinx.search import en, ja

    languages = {
        'en': en.SearchEnglish,
        'ja': ja.SearchJapanese,
    }

改为

.. code-block:: python

    from sphinx.search import en, ja, zh_CN

    languages = {
        'en': en.SearchEnglish,
        'ja': ja.SearchJapanese,
        'zh_CN': zh_CN.SearchChinese
    }

或者

.. code-block:: python

    languages = {
        'da': 'sphinx.search.da.SearchDanish',
        'de': 'sphinx.search.de.SearchGerman',
        'en': SearchEnglish,
        'es': 'sphinx.search.es.SearchSpanish',
        'fi': 'sphinx.search.fi.SearchFinnish',
        'fr': 'sphinx.search.fr.SearchFrench',
        'hu': 'sphinx.search.hu.SearchHungarian',
        'it': 'sphinx.search.it.SearchItalian',
        'ja': 'sphinx.search.ja.SearchJapanese',
        'nl': 'sphinx.search.nl.SearchDutch',
        'no': 'sphinx.search.no.SearchNorwegian',
        'pt': 'sphinx.search.pt.SearchPortuguese',
        'ro': 'sphinx.search.ro.SearchRomanian',
        'ru': 'sphinx.search.ru.SearchRussian',
        'sv': 'sphinx.search.sv.SearchSwedish',
        'tr': 'sphinx.search.tr.SearchTurkish',
        'zh_CN': 'sphinx.search.zh_CN.SearchChinese',
    }


修改sphinx配置文件
------------------------------------------------------------------------------------------------

    在sphinx工程的conf.py中添加language = 'zh_CN'

    make html
