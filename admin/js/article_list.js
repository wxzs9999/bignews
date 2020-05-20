$(function () {
    //文章分类的数据获取：---------------------------------------
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template('article_list', res);
                $('#selCategory').html(htmlStr);
            }
        }
    })

    //获取主内容数据：---------------------------------------------
    //封装的获取页面数据：--------------------------------------
    function getDate(mypage,callback) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: mypage,
                perpage: 10,
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('Main', res);
                    $('tbody').html(htmlStr);
                    //分页插件调用：-----
                    if(res.data.totalPage==0&&mypage==1){
                 $('#pagination-demo').hide().next().show()
                    }else if(res.data.totalPage!=0 && callback!=null){
                 $('#pagination-demo').show().next().hide()
                   callback(res);
                    // pagination(res)
                    //$('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)

                    }
                }
            }
        })

     }
    getDate(1,pagination)

    //筛选设置事件：---------------------------------------------
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        getDate(1,function(res){
        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)

        })
        //注意：在selection中val()指的是value=""中的值
        // $.ajax({
        //     type: 'get',
        //     url: BigNew.article_query,
        //     data: {
        //         key: $('#key').val(),
        //         type: $('#selCategory').val(),
        //         state: $('#selStatus').val(),
        //         page: 1,
        //         perpage: 10,
        //     },
        //     success: function (res) {
        //         console.log(res);
        //         if (res.code == 200) {
        //             var htmlStr = template('Main', res);
        //             $('tbody').html(htmlStr);
        //             //分页插件再次调用：-----
        //             /*
        //             参数1：changeTotalPages,事件
        //             参数2：动态改变的总页数
        //             参数3：当前起始页
        //              */
        //             if(res.data.totalPage==0){
        //                 $('#pagination-demo').hide().next().show()
        //                    }else if(res.data.totalPage!=0){
        //                 $('#pagination-demo').show().next().hide()
        //                 $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        //                    }
        //         }
        //     }
        // })
    })
    //分页的封装：----------------------
    function pagination(res, visiblePages) {

        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,    //总页数
            visiblePages: visiblePages || 10,   //页数上限
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick:false,
            //page当前的页码值变化的时候，重新渲染页面
            onPageClick: function (event, page) {
                // $('#page-content').text('Page ' + page);
                getDate(page,null)
                 
                // $.ajax({
                //     type: 'get',
                //     url: BigNew.article_query,
                //     data: {
                //         key: $('#key').val(),
                //         type: $('#selCategory').val(),
                //         state: $('#selStatus').val(),
                //         page: page,  //可以使列表随着当前页码值变换
                //         perpage: 10,
                //     },
                //     success: function (res) {
                //         console.log(res);
                //         if (res.code == 200) {
                //             var htmlStr = template('Main', res);
                //             $('tbody').html(htmlStr);

                //         }
                //     }
                // })
            }
        });

    }



    })







