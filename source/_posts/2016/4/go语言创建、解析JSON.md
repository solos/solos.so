---
title: go语言创建、解析json
date: 2016-04-06 20:29:48
comments: true
tags:
    - Go
    - Json
categories:
    - Go
---

JSON已经成为最流行的数据交换格式，在python里我们可以用json.dumps和json.loads来创建和解析JSON数据，那么在Go语言里是怎么处理JSON的呢？

在Go语言里面，如果要把一个结构体转成JSON，只需要调用json.Marshal即可，类似于json.dumps，返回的是[]byte。在结构体字段后面添加\`json:"name"\`可以指定JSON键名。


``` go

    package main

    import "fmt"
    import "encoding/json"

    type Message struct {
      Name string `json:"name"`
      Body string `json:"body"`
      Time int64 `json:"time"`
    }

    func main() {
      m := Message{"Alice", "Hello", 1294706395881547000}
      b, err := json.Marshal(m)
      if (err == nil){
          fmt.Println(string(b)) // json.Marshal返回的是[]byte
      } else {
          fmt.Println(err)
      }
    }
```

如果要把JSON转成结构体，只需要调用json.Unmarshal，这在静态语言里比较常见，当然要把结构体传进去。如果不知道JSON的格式或者JSON格式不一致，那就不能用这种方法了，这时候可以转成map。


``` go

    package main
    import "fmt"
    import "encoding/json"

    type Message struct {
        Name string `json:"name"`
        Body string `json:"body"`
        Time int64 `json:"time"`
    }

    func main() {
        m := Message{"Alice", "Hello", 1294706395881547000}
        bytes, err := json.Marshal(m)
        if (err == nil){
            fmt.Println(string(bytes)) // json.Marshal返回的是[]byte

            result := map[string]interface{}{}
            err := json.Unmarshal(bytes, &result)
            if (err == nil){
                fmt.Printf("\n%+v", result) // json.Unmarshal转成map
                fmt.Printf("\ntype %T; value %#v\n", result["time"], result["time"])
            } else {
                fmt.Println(err)
            }
      } else {
          fmt.Println(err)
      }
    }
```

输出如下：

``` bash

    {"name":"Alice","body":"Hello","time":1294706395881547000}
    map[name:Alice body:Hello time:1.294706395881547e+18]
    type float64; value 1.294706395881547e+18
```


如果某一个字段的值为长整型，解析的时候可能会丢失精度，JSON都会当作double来存储。
在明确类型的情况下可以使用特定的类型，比如int64，前提是类型相同，类型不同或者类型不明确的话应该当作number解析，使用deocoder.UseNumber()配置。

``` go
    package main

    import (
        "bytes"
        "encoding/json"
        "fmt"
    )

    type Message struct {
        Name string `json:"name"`
        Body string `json:"body"`
        Time int64 `json:"time"`
    }

    func main() {
        m := Message{"Alice", "Hello", 1294706395881547000}
        b, err := json.Marshal(m)
        if (err == nil){
            result := map[string]interface{}{}
            decoder := json.NewDecoder(bytes.NewReader(b))
            decoder.UseNumber()
            err = decoder.Decode(&result)
            if (err == nil){
                fmt.Printf("\n%+v", result)
                fmt.Printf("\ntype %T; value %#v\n", result["time"], result["time"])
            } else {
                fmt.Println(err)
            }
        } else {
            fmt.Println(err)
        }
    }
```

输出如下：

``` bash

    {"name":"Alice","body":"Hello","time":1294706395881547000}

    map[name:Alice body:Hello time:1294706395881547000]
    type json.Number; value "1294706395881547000"
```


参考：

- [After Json unmarshaling big ints become floats](https://groups.google.com/forum/#!topic/golang-nuts/TDuGDJAIuVM)
- [golang json unmarshal int literals as float64](http://grokbase.com/t/gg/golang-nuts/14cfjj4vf0/go-nuts-json-unmarshal-int-literals-as-float64)
