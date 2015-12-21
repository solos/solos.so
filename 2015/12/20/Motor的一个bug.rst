public: yes
tags: [mongodb, motor, tornado]
summary: 

Motor 0.4的一个bug
==============================

之前发现mongodb连接数猛升猛降，最后定位到motor的一个bug，在高并发情况下会导致死锁。以下是找到的一些测试脚本以及测试结果。
Motor作者在博客里解释了原因并在0.4.1版本修复了这个bug, 这里记录一下。

app.py

.. code-block:: python

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    import json
    import random

    import motor
    from tornado import gen, ioloop, web

    @gen.coroutine
    def get_data():
        cur1 = _client.test.testcol1.find()
        cur2 = _client.test.testcol2.find()
            
        data1, data2 = yield [cur1.to_list(length=None), cur2.to_list(length=None)]
        
        raise gen.Return((data1, data2))

    class MainHandler(web.RequestHandler):
        @gen.coroutine
        def get(self):
            #If I run the code directly in this method this it works fine
    #         cur1 = _client.test.testcol1.find()
    #         cur2 = _client.test.testcol2.find()
    #         
    #         data1, data2 = yield [cur1.to_list(length=None), cur2.to_list(length=None)]

            yield get_data()
            
            self.write("done")
            
    class InsertHandler(web.RequestHandler):
        @gen.coroutine
        def get(self):
            for _ in range(1000):
                docs = []
                
                for _ in range(1000):
                    docs.append({"v": random.random(), "t": random.randint(0, 2**31-1)})
                    
                yield _client.test.testcol1.insert(docs)
                yield _client.test.testcol2.insert(docs)
            
            self.write("done")

    if __name__ == "__main__":
        #http://code.activestate.com/recipes/577334-how-to-debug-deadlocked-multi-threaded-programs/
        import stacktracer
        stacktracer.trace_start("trace.html")
        
        settings = {
            "debug": True,
            "autoreload": True
        }
        
        with open("credentials.json") as f:
            creds = json.load(f)
        
        _client = motor.MotorReplicaSetClient(creds["mongodb_uri"])
        
        application = web.Application([(r"/", MainHandler),
                                       (r"/doinsert", InsertHandler)],
                                      \*\*settings)
        application.listen(8888)
        ioloop.IOLoop.instance().start()


stacktracer.py

.. code-block:: python

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    """Stack tracer for multi-threaded applications.

    Usage:

    import stacktracer
    stacktracer.start_trace("trace.html",interval=5,auto=True) # Set auto flag to always update file!
    ....
    stacktracer.stop_trace()
    """

    import sys
    import traceback
    from pygments import highlight
    from pygments.lexers import PythonLexer
    from pygments.formatters import HtmlFormatter
     
     # Taken from http://bzimmer.ziclix.com/2008/12/17/python-thread-dumps/
     
    def stacktraces():
        code = []
        for threadId, stack in sys._current_frames().items():
            code.append("\n# ThreadID: %s" % threadId)
            for filename, lineno, name, line in traceback.extract_stack(stack):
                code.append('File: "%s", line %d, in %s' % (filename, lineno, name))
                if line:
                    code.append("  %s" % (line.strip()))
     
        return highlight("\n".join(code), PythonLexer(), HtmlFormatter(
          full=False,
          # style="native",
          noclasses=True,
        ))


    # This part was made by nagylzs
    import os
    import time
    import threading

    class TraceDumper(threading.Thread):
        """Dump stack traces into a given file periodically."""
        def __init__(self,fpath,interval,auto):
            """
            @param fpath: File path to output HTML (stack trace file)
            @param auto: Set flag (True) to update trace continuously.
                Clear flag (False) to update only if file not exists.
                (Then delete the file to force update.)
            @param interval: In seconds: how often to update the trace file.
            """
            assert(interval>0.1)
            self.auto = auto
            self.interval = interval
            self.fpath = os.path.abspath(fpath)
            self.stop_requested = threading.Event()
            threading.Thread.__init__(self)
        
        def run(self):
            while not self.stop_requested.isSet():
                time.sleep(self.interval)
                if self.auto or not os.path.isfile(self.fpath):
                    self.stacktraces()
        
        def stop(self):
            self.stop_requested.set()
            self.join()
            try:
                if os.path.isfile(self.fpath):
                    os.unlink(self.fpath)
            except:
                pass
        
        def stacktraces(self):
            fout = file(self.fpath,"wb+")
            try:
                fout.write(stacktraces())
            finally:
                fout.close()


    _tracer = None
    def trace_start(fpath,interval=5,auto=True):
        """Start tracing into the given file."""
        global _tracer
        if _tracer is None:
            _tracer = TraceDumper(fpath,interval,auto)
            _tracer.setDaemon(True)
            _tracer.start()
        else:
            raise Exception("Already tracing to %s"%_tracer.fpath)

    def trace_stop():
        """Stop tracing."""
        global _tracer
        if _tracer is None:
            raise Exception("Not tracing, cannot stop.")
        else:
            _trace.stop()
            _trace = None


motor 0.4版本测试结果

.. raw:: html

    <div class="highlight" style="background: #f8f8f8">
    <pre style="line-height: 125%"> <span style="color: #408080; font-style: italic"># ThreadID: 4371427328</span> File: <span style="color: #BA2121">&quot;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/threading.py&quot;</span>, line <span style="color: #666666">783</span>, <span style="color: #AA22FF; font-weight: bold">in</span> __bootstrap
    <span style="color: #008000">self</span><span style="color: #666666">.</span>__bootstrap_inner()
    File: <span style="color: #BA2121">&quot;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/threading.py&quot;</span>, line <span style="color: #666666">810</span>, <span style="color: #AA22FF; font-weight: bold">in</span> __bootstrap_inner
    <span style="color: #008000">self</span><span style="color: #666666">.</span>run()
    File: <span style="color: #BA2121">&quot;/Users/solos/stacktracer.py&quot;</span>, line <span style="color: #666666">64</span>, <span style="color: #AA22FF; font-weight: bold">in</span> run
    <span style="color: #008000">self</span><span style="color: #666666">.</span>stacktraces()
    File: <span style="color: #BA2121">&quot;/Users/solos/stacktracer.py&quot;</span>, line <span style="color: #666666">78</span>, <span style="color: #AA22FF; font-weight: bold">in</span> stacktraces
    fout<span style="color: #666666">.</span>write(stacktraces())
    File: <span style="color: #BA2121">&quot;/Users/solos/stacktracer.py&quot;</span>, line <span style="color: #666666">26</span>, <span style="color: #AA22FF; font-weight: bold">in</span> stacktraces
    <span style="color: #008000; font-weight: bold">for</span> filename, lineno, name, line <span style="color: #AA22FF; font-weight: bold">in</span> traceback<span style="color: #666666">.</span>extract_stack(stack):

    <span style="color: #408080; font-style: italic"># ThreadID: 140735321682688</span>
    File: <span style="color: #BA2121">&quot;/Library/Python/2.7/site-packages/motor/__init__.py&quot;</span>, line <span style="color: #666666">683</span>, <span style="color: #AA22FF; font-weight: bold">in</span> call_method
    result <span style="color: #666666">=</span> sync_method(<span style="color: #008000">self</span><span style="color: #666666">.</span>delegate, <span style="color: #666666">*</span>args, <span style="color: #666666">**</span>kwargs)
    File: <span style="color: #BA2121">&quot;/Library/Python/2.7/site-packages/pymongo/collection.py&quot;</span>, line <span style="color: #666666">367</span>, <span style="color: #AA22FF; font-weight: bold">in</span> insert
    client<span style="color: #666666">.</span>_ensure_connected(<span style="color: #008000">True</span>)
    File: <span style="color: #BA2121">&quot;/Library/Python/2.7/site-packages/pymongo/mongo_replica_set_client.py&quot;</span>, line <span style="color: #666666">1318</span>, <span style="color: #AA22FF; font-weight: bold">in</span> _ensure_connected
    <span style="color: #008000">self</span><span style="color: #666666">.</span>__ensure_monitor()
    File: <span style="color: #BA2121">&quot;/Library/Python/2.7/site-packages/pymongo/mongo_replica_set_client.py&quot;</span>, line <span style="color: #666666">1087</span>, <span style="color: #AA22FF; font-weight: bold">in</span> __ensure_monitor
    <span style="color: #008000">self</span><span style="color: #666666">.</span>__monitor_lock<span style="color: #666666">.</span>acquire()
    </pre></div>


motor 0.4.1版本测试结果

.. raw:: html

    <div class="highlight" style="background: #f8f8f8"><pre style="line-height: 125%"><span style="color: #408080; font-style: italic"># ThreadID: 4464951296</span>
    File: <span style="color: #BA2121">&quot;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/threading.py&quot;</span>, line <span style="color: #666666">783</span>, <span style="color: #AA22FF; font-weight: bold">in</span> __bootstrap
    <span style="color: #008000">self</span><span style="color: #666666">.</span>__bootstrap_inner()
    File: <span style="color: #BA2121">&quot;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/threading.py&quot;</span>, line <span style="color: #666666">810</span>, <span style="color: #AA22FF; font-weight: bold">in</span> __bootstrap_inner
    <span style="color: #008000">self</span><span style="color: #666666">.</span>run()
    File: <span style="color: #BA2121">&quot;/Users/solos/stacktracer.py&quot;</span>, line <span style="color: #666666">64</span>, <span style="color: #AA22FF; font-weight: bold">in</span> run
    <span style="color: #008000">self</span><span style="color: #666666">.</span>stacktraces()
    File: <span style="color: #BA2121">&quot;/Users/solos/stacktracer.py&quot;</span>, line <span style="color: #666666">78</span>, <span style="color: #AA22FF; font-weight: bold">in</span> stacktraces
    fout<span style="color: #666666">.</span>write(stacktraces())
    File: <span style="color: #BA2121">&quot;/Users/solos/stacktracer.py&quot;</span>, line <span style="color: #666666">26</span>, <span style="color: #AA22FF; font-weight: bold">in</span> stacktraces
    <span style="color: #008000; font-weight: bold">for</span> filename, lineno, name, line <span style="color: #AA22FF; font-weight: bold">in</span> traceback<span style="color: #666666">.</span>extract_stack(stack):

    <span style="color: #408080; font-style: italic"># ThreadID: 140735321682688</span>
    File: <span style="color: #BA2121">&quot;mo.py&quot;</span>, line <span style="color: #666666">78</span>, <span style="color: #AA22FF; font-weight: bold">in</span> <span style="color: #666666">&lt;</span>module<span style="color: #666666">&gt;</span>
    ioloop<span style="color: #666666">.</span>IOLoop<span style="color: #666666">.</span>instance()<span style="color: #666666">.</span>start()
    File: <span style="color: #BA2121">&quot;/Library/Python/2.7/site-packages/tornado/ioloop.py&quot;</span>, line <span style="color: #666666">815</span>, <span style="color: #AA22FF; font-weight: bold">in</span> start
    event_pairs <span style="color: #666666">=</span> <span style="color: #008000">self</span><span style="color: #666666">.</span>_impl<span style="color: #666666">.</span>poll(poll_timeout)
    File: <span style="color: #BA2121">&quot;/Library/Python/2.7/site-packages/tornado/platform/kqueue.py&quot;</span>, line <span style="color: #666666">66</span>, <span style="color: #AA22FF; font-weight: bold">in</span> poll
    kevents <span style="color: #666666">=</span> <span style="color: #008000">self</span><span style="color: #666666">.</span>_kqueue<span style="color: #666666">.</span>control(<span style="color: #008000">None</span>, <span style="color: #666666">1000</span>, timeout)
    </pre></div>
