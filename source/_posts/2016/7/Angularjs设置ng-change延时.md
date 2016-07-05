---
title: Angularjs设置ng-change延时
date: 2016-07-05 19:27:37
comments: true
tag: 
  - Angularjs
  - Web
categories:
    - Web
---

之前写了一个配置管理的工具，对特定的输入格式做了检查和修正。
例如如果是number格式，则会parseFloat检查一下，如果格式不正确就会停止更新model。
现在有个bug，如果用户输入1.2的时候，输入到.的时候检查到格式不正确，后面的.2都输入不进去了。

以下是ng-change绑定的函数:

``` js

$scope.changeNumberValue = function(key){
    var value = $scope.values[key];
    try {
        var v = parseFloat(value);
        $scope.values[key] = v;
    } catch (err) {
        console.log(err);
    }
};
```

其实只要加个延时就可以了，搜了一下，Angularjs 1.3之后有个选项可以实现ng-change方法的延时。

``` html

<dd ng-if="field.type=='number' && checkChecklist(module.name + '.' + field.name)" class="ng-binding number">
    <input class="number" ng-model="values[module.name + '.' + field.name]" ng-model-options='{ debounce: 1000 }' ng-change="changeNumberValue(module.name + '.' + field.name)" placeholder="{{field.tooltip}}">
    </input>
</dd>
```
Angularjs 1.3之前可以这样写：

``` js
app.controller('MainCtrl', function($scope, $timeout) {
    var _timeout;

    //...
    //...

    $scope.FilterByName = function() {
        if(_timeout) { // if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function() {
            console.log('filtering');
            _timeout = null;
        }, 500);
    }
});
```
加上这个之后就好了 :)

参考：
    [Angular ng-change delay](http://stackoverflow.com/questions/26446681/angular-ng-change-delay)
