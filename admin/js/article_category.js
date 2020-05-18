$(function () {
    //获取数据：---------------------------------
    function render() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template('catagory', res);
                    $('tbody').html(htmlStr);
                }
            }
        })
    }
    render();

    

    //删除数据：------------------------------------------
    //注意：动态创建的标签不能直接注册事件
    $('tbody').on('click', '.btn-danger', function () {
        $('.removeModal').modal('show');
        window.id = $(this).data('id');
        console.log(id);

    })
    $('.removeModal .btn-primary').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: id,
            },
            success: function (res) {
                console.log(res);
                if (res.code == 204) {
                    $('.removeModal').modal('hide');
                    render();
                }
            }
        })
    })
    //增加数据：------------------------------------
    $('#xinzengfenlei').on('click', function () {
        // alert(123)
        // $('.modal:eq(0)').modal('show');
        $('.addModal').modal('show');
        $('#form input[name]').val('')
        $('.modal-title:eq(0)').text('新增文章');
        window.id = $(this).data('id');
        console.log(id);
    })
    // $('.modal-footer .btn-primary:eq(0)').on('click', function () {
    //     $.ajax({
    //         type: 'post',
    //         url: BigNew.category_add,
    //         data: {
    //             name: $('#exampleInputEmail1').val(),
    //             slug: $('#exampleInputPassword1').val(),
    //         },
    //         success: function (res) {
    //             console.log(res);
    //             if (res.code == 201) {
    //                 $('.modal:eq(0)').modal('hide');
    //                 render();
    //             }
    //         }
    //     })
    // })

    //修改数据：---------------------------------------------
    $('tbody').on('click', '.btn-info', function () {
        $('.addModal').modal('show');
        $('.modal-title:eq(0)').text('修改文章');
        id = $(this).data('id');
        console.log(id);
        $.ajax({
            type: 'get',
            url: BigNew.category_search,
            data: {
                id: id
            },
            success: function (res) {
                if(res.code==200){
                   $('#exampleInputEmail0').val(res.data[0].id)
                   $('#exampleInputEmail1').val(res.data[0].name)
                   $('#exampleInputPassword1').val(res.data[0].slug)
                }
            },
        })
    })

        $('.btn-primary:eq(0)').on('click', function () {
            $.ajax({
                type: 'post',
                url: id?BigNew.category_edit:BigNew.category_add,
                data: $('#myform'). serialize(),
                success: function (res) {
                    console.log(res);
                    if(res.code==200||res.code==201){
                      $('.addModal').modal('hide');
                      render();
                    
                    }
                }
            })
        })

 
        
        

    })




