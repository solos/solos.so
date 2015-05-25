public: yes
tags: [Javascript, 日期时间, 函数]
summary: 

Javascript日期时间函数
========================


- 获取当前日期时间信息

.. code-block:: javascript

    function date(){
        var now = new Date(); //当前日期
        var year = now.getYear(); //年份后两位
        var fullYear = now.getFullYear();//获取完整的年份(4位,1970-????)
        now.getMonth();      // 获取当前月份(0-11,0代表1月)
        now.getDate();       // 获取当前日(1-31)
        now.getDay();        // 获取当前星期X(0-6,0代表星期天)
        now.getTime();       // 获取当前时间(从1970.1.1开始的毫秒数)
        now.getHours();      // 获取当前小时数(0-23)
        now.getMinutes();    // 获取当前分钟数(0-59)
        now.getSeconds();    // 获取当前秒数(0-59)
        now.getMilliseconds();                  //获取当前毫秒数(0-999)
        now.toLocaleDateString();               //获取当前日期
        var mytime=now.toLocaleTimeString();    //获取当前时间
        now.toLocaleString( );                  //获取日期与时间
    }

- 获得日期、星期与时间：

.. code-block:: javascript

    new Date().toLocaleString()+'星期'+'日一二三四五六'.charAt(new Date().getDay());

- 构造日期

.. code-block:: javascript

    var date = new Date(2012, 6, 31); // 2012-07-31
