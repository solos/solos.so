public: no
tags: [jQuery, POST]
summary: 

jQuery发送POST请求
========================

.. code-block:: javascript

    var data = {"user": "me"};
    $.ajax({
        type: "POST",
        url: "/api/user/create",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(r) {
        });
    });
