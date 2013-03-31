public: yes
tags: [python, pylons, sqlalchemy]
summary: 

使用sqlalchemy遇到的一个问题
=======================================

在使用Python WEB框架Pylons 0.9.7自带的sqlalchemy 0.5.8 创建表的时候遇到一个问题，就是如何创建MySQL的包含枚举类型的列。 经过查资料和问别人，弄明白了，分享下写法。另附上sqlalchemy 0.5 support for mysql文档的地址：`http://docs.sqlalchemy.org/en/rel_0_5/reference/dialects/mysql.html <http://docs.sqlalchemy.org/en/rel_0_5/reference/dialects/mysql.html>`_

.. code:: python

    import sqlalchemy as sa
    from sqlalchemy import orm
    from sqlalchemy.databases.mysql import MSEnum
    from testapp.model import meta
    def init_model(engine):
        meta.Session.configure(bind=engine)
        meta.engine = engine

    test_table = sa.schema.Table('test', meta.metadata, \
        sa.schema.Column('id', sa.types.Integer(unsigned=True), primary_key=True), \
        sa.schema.Column('column2', sa.types.VARCHAR(length=255), nullable=False), \
        sa.schema.Column('column3', MSEnum("value1", "value2", "value3")),
    )

    class Test(object):
        pass
    orm.mapper(Test, test_table)

这样就可以了，另外sqlalchemy 0.7的写法不大一样，有兴趣的同学可以看看文档。
