public: yes
tags: [MongoDB,auth,权限控制]
summary: 

MongoDB 3.0用户权限控制
==============================

MongoDB 3.0之前auth很不完善，而且耗时比较长。3.0版本完善了这一块，支持按数据库、读写权限分别验证，我们来看下怎么做读写权限控制。

- 如何开启auth

    可以在mongod配置文件中配置, security下面的authorization改为enabled即可

.. code-block:: shell

        # mongod.conf

        # for documentation of all options, see:
        #   http://docs.mongodb.org/manual/reference/configuration-options/

        # where to write logging data.
        systemLog:
          destination: file
          logAppend: true
          path: /var/log/mongodb/mongod.log

        # Where and how to store data.
        storage:
          dbPath: /data/db
          journal:
            enabled: true
          engine: wiredTiger
        #  mmapv1:

        # how the process runs
        processManagement:
          fork: true  # fork and run in background
          pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile

        # network interfaces
        net:
          port: 27017
          bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.

        security:
            authorization: enabled   # 开启auth的选项

        #operationProfiling:

        #replication:

        #sharding:

        ## Enterprise-Only Options

        #auditLog:

        #snmp:

- 创建管理员用户

    启用auth之后需要创建一个管理员用户，用于创建和删除其它用户。创建管理员用户之前暂时是不需要密码的。
    这里的role是userAdminAnyDatabase，db是admin，创建成功之后就可以继续创建其它用户了。

.. code-block:: shell

    solos@world:$ mongo

    MongoDB shell version: 3.0.2
    connecting to: test
    > use admin
    > db.createUser(
      {
        user: "solos",
        pwd: "solos's password",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
      }
    )

    > db.auth("solos", "solos's password")  # auth成功返回1
    1

- 创建只读用户和读写用户

    在auth之后就可以切到对应的数据库继续创建只读用户和读写用户了，两者只是roles不同，只读的是read, 可读可写的是readWrite。

.. code-block:: shell
        
        > use admin
        > db.auth('solos', '')
        use test
        db.createUser(
        {
            user: "readUser",
            pwd: "password",
            roles: [ {role: "read", db: "test"}]
        })

        use test
        db.createUser(
        {
            user: "readWriteUser",
            pwd: "password",
            roles: [ {role: "readWrite", db: "test"}]
        })


- 查看所有用户

   通过show users或者db.system.users.find()可以查看创建的所有用户

.. code-block:: shell
        
        > use admin
        > db.auth('solos', "solos's password")
        1
        > db.system.users.find()
        { "_id" : "admin.solos", "user" : "solos", "db" : "admin",
            "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "xxx", "storedKey" : "xxx", "serverKey" : "xxx" } },
            "roles" : [ { "role" : "userAdminAnyDatabase", "db" : "admin" } ] }
        { "_id" : "test.readUser", "user" : "readUser", "db" : "test",
            "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "xxx", "storedKey" : "xxx", "serverKey" : "xxx" } },
            "roles" : [ { "role" : "read", "db" : "test" } ] }
        { "_id" : "test.readWriteUser", "user" : "readWriteUser", "db" : "test",
            "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "xxx", "storedKey" : "xxx", "serverKey" : "xxx" } },
            "roles" : [ { "role" : "readWrite", "db" : "test" } ] }
