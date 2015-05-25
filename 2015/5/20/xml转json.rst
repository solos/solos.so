public: yes
tags: [xml转json]
summary: 

xml转json
==============================

最近要把以前写的xml文档释义转成json，写了一个脚本来转换，记录一下。
主要难点在于处理注释和转换列表元素。

.. code-block:: python

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    from xml.etree.ElementTree import  Element
    from lxml import etree

    def xml2dict(element):
        d = {}
        is_comment = False
        tag = element.tag
        items = []
        for child in element:
            if child.tag == 'item':
                children = element.xpath('item')
                item = {}
                if children:
                    child = children[0]
                    for c in child.getchildren():
                        item.update(xml2dict(c))
                    if item:
                        items.append(item)
            elif child.tag == etree.Comment:
                has_siblings = False
                for i in child.itersiblings():
                    has_siblings = True
                    break
                if not has_siblings:
                    is_comment = True
                    d[tag] = child.text.strip()
            else:
                v = xml2dict(child)
                value = v[child.tag]
                d[child.tag] = value
        if not d:
            d = element.text
        if items:
            return {tag: items}
        if is_comment:
            return d
        else:
            return {tag: d}

    if __name__ == '__main__':
        element = '''<?xml version="1.0" encoding="utf-8" ?>
        <root>
            <version><!-- 服务接口版本信息 --></version>
            <result><!-- true / false, 是否请求成功 --></result>
            <code><!-- 错误代码 --></code>
            <ts>服务器时间戳</ts>
            <test>
                <child><!-- 含义 --></child>
            </test>
            <element_list>
                <item>
                    <no>1</no>
                    <name>hello</name>
                </item>
                <item>
                    <no>2</no>
                    <name>world</name>
                </item>
            </element_list>
        </root>
        '''

        import json
        el = etree.fromstring(element)
        print json.dumps(xml2dict(el), indent=4, ensure_ascii=False)
