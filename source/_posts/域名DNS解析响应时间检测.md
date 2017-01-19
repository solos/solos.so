---
title: 域名DNS解析响应时间检测
date: 2016-07-20 18:38:37
comments: true
tag: 
  - Go
  - DNS
categories:
    - Go
---

最近需要查一个用户登录失败的问题，怀疑是DNS有问题。网上找了一些公开的DNS服务器检测了一下，公开的服务器列表在 http://public-dns.info
刚开始使用python同步跑，那个慢啊，想用gevent跑又没有搜到dnspython配合gevent的栗子。
最后找了个go的改了改竟然跑通了，我加上了channel控制并发，速度快还稳定，go好帅！

``` go

package main

import (
    "fmt"
    "time"
    "log"
    "bufio"
    "os"
    "strings"
    "github.com/miekg/dns"
)

var (
    maxRoutineNum = 10
)

  
func lookup(domain string, server string, channel chan string, total chan int) {
    c := dns.Client{}
    m := dns.Msg{}
    m.SetQuestion(domain +".", dns.TypeA)
    r, t, err := c.Exchange(&m, server+":53")
    <- total
    if r == nil {
        seconds := 0
        fail_time := time.Duration(seconds)*time.Second
        channel <- server + " " + fail_time.String()
    } else {
        if err != nil {
            //log.Fatal(err)
            seconds := 0
            fail_time := time.Duration(seconds)*time.Second
            channel <- server + " " + fail_time.String()
        } else {
            channel <- server + " " + t.String()
        }
    }
    /*
    for _, ans := range r.Answer {
        //Arecord := ans.(*dns.CNAME)
        //Arecord := ans.(*dns.CNAME)
        fmt.Println(ans) 
    }
    */
}

func main() {
    domain := "solos.so"
    total := make(chan int, maxRoutineNum)
    channel := make(chan string)
    lines := 0

    if file, err := os.Open("nameservers.csv"); err == nil {

        defer file.Close()

        scanner := bufio.NewScanner(file)
        for scanner.Scan() {
            line := scanner.Text()
            s := strings.Split(line, ",")
            server := s[0]
            if strings.Contains(server, ":") {
                continue
            }
            total <- -1
            lines += 1
            go lookup(domain, server, channel, total)
        }

        if err = scanner.Err(); err != nil {
          log.Fatal(err)
        }

    } else {
        log.Fatal(err)
    }

    resultFile := "result.txt"
    fout, err := os.Create(resultFile)
    defer fout.Close()
    if err != nil {
            fmt.Println(resultFile,err)
            return
    }

    i := 0
    for i < lines {
        i += 1
        resp := <- channel
        fout.WriteString(resp)
        fout.WriteString("\n")
    }
}

```

参考：
    [Why golang Lookup*** function can't provide a server parameter](http://stackoverflow.com/questions/30043248/why-golang-lookup-function-cant-provide-a-server-parameter)
