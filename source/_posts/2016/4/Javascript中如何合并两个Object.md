---
title: Javascript中如何合并两个Object
date: 2016-04-18 00:00:00
comments: true
tags:
    - Javascript
    - Object
categories:
    - Javascript
---


如果存在子object，使用新值替代旧值。

``` javascript

    function merge(target, source) {

        if ((typeof target !== 'object') || (typeof source !== 'object')) {
            return {}
        }

        for (var property in source) {
            if (target.hasOwnProperty(property)){
                var targetProperty = target [ property ];
                var sourceProperty = source[ property ];
                if (typeof sourceProperty === 'object') {
                    target[ property ] = merge( target[ property ], sourceProperty );
                    continue;
                } else {
                    target[property] = sourceProperty;
                }
            } else {
                var sourceProperty = source[property];
                target[property] = sourceProperty;
            }
        }
        return target;
    };


    console.log(merge({"a": 1, "b": 2, "hello": {"world": 1}}, {"a": 2, "b": 3, "hello": "world"}));

    > {a: 2, b: 3, hello: "world"}

```

如果存在子object，则合并子object，而不是替代。

``` javascript

    function merge(target, source) {

        if (typeof target !== 'object') {
            target = {};
        }

        for (var property in source) {
            if (target.hasOwnProperty(property)){
                var targetProperty = target [ property ];
                var sourceProperty = source[ property ];
                if (typeof sourceProperty === 'object') {
                    target[ property ] = merge( target[ property ], sourceProperty );
                    continue;
                } else {
                    target[property] = sourceProperty;
                }
            } else {
                var sourceProperty = source[property];
                target[property] = sourceProperty;
            }
        }
        return target;
    };

    console.log(merge({"hello": {"world": 1, "a": 1, "b": 2}}, {"hello": {"world": 1, "foo": "bar"}}));
    > {"hello": {"a": 1, "b": 2, "foo": "bar", "world": 1}}

```
