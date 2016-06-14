---
title: go语言如何使用关键字参数
date: 2016-04-02 00:00:00
comments: true
tags:
    - Go
    - 关键字参数
categories:
    - Go
---

最近打算写一个golang版本的requests库用，遇到一个问题是如何模拟python函数的关键字参数。

举个栗子，我需要实现一个设置timeout和headers的功能，requests可以这样设置

``` python

    requests.get(url, headers={"content-type": "application/json"}, timeout=10)

```
    

那用go如何实现呢？其实只需要写两个函数设置headers和timeout，然后作为可变参数传到发送请求的函数里就行了。


``` go


    func (r *Request) setHeaders(headers map[string]string) error {
        r.Args["headers"] = headers
        return nil
    }


    func Headers(headers map[string]string) func(*Request) error {
        return func(r *Request) error {
            return r.setHeaders(headers)
        }
    }

    func (r *Request) MakeRequest(method string, uri string, options ...func(*Request) error) (*Response, error) {
    }

```


附完整代码实现：

``` go

    package main

    import "fmt"

    import "time"
    import "net/http"
    import "io/ioutil"

    type M map[string]interface{}

    type Request struct {
        Url  string
        Args M
    }

    type Response struct {
        Content string
    }

    func (r *Request) setHeaders(headers map[string]string) error {
        r.Args["headers"] = headers
        return nil
    }

    func Headers(headers map[string]string) func(*Request) error {
        return func(r *Request) error {
            return r.setHeaders(headers)
        }
    }

    func (r *Request) setTimeout(timeout int) error {
        r.Args["timeout"] = int(timeout)
        return nil
    }

    func Timeout(timeout int) func(*Request) error {
        return func(r *Request) error {
            return r.setTimeout(timeout)
        }
    }

    func (r *Request) MakeRequest(method string, uri string, options ...func(*Request) error) (*Response, error) {

        req, err := http.NewRequest(method, uri, nil)

        for _, option := range options {
            err := option(r)
            if err != nil {
                panic(err)
            }
        }

        transport := &http.Transport{}
        client := &http.Client{
            Transport: transport,
        }

        timeoutSeconds := r.Args["timeout"].(int)
        timeout := time.Duration(0) * time.Second
        if timeoutSeconds > 0 {
            timeout = time.Duration(timeoutSeconds) * time.Second
        }
        client.Timeout = timeout

        resp, err := client.Do(req)
        if err != nil {
            panic(err)
        }
        defer resp.Body.Close()
        body, err := ioutil.ReadAll(resp.Body)
        response := &Response{}
        if err != nil {
            panic(err)
        } else {
            response.Content = string(body)
        }
        return response, nil
    }

    func main() {
        kwargs := M{}
        headers := map[string]string{
            "content-Type": "application/json",
            "user-agent": "Golang requests",
        }

        req := &Request{Args: kwargs}
        resp, _ := req.MakeRequest("GET", "http://www.example.com", Timeout(10), Headers(headers))
        fmt.Println(resp.Content)
        resp, _ = req.MakeRequest("GET", "http://www.example.com", Timeout(1), Headers(headers))
        fmt.Println(resp.Content)
    }
```


参考：

    - [different ways to simulate keyword arguments](https://www.reddit.com/r/golang/comments/3gi0pf/different_ways_to_simulate_keyword_arguments)
    - [self referential functions and design](http://commandcenter.blogspot.nl/2014/01/self-referential-functions-and-design.html)
    - [functional options for friendly apis] (http://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis)
