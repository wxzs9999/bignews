$(function () {
    //渲染页面：-----------------------------------------------
    getData(1, function (res) {
        pagination(res)
    })
    //封装函数：-----------------------------------------------
    function getData(page, callback) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: page,
                perpage: 7,
            },
            success: function (res) {
                if (res.code == 200) {
                    console.log(res);
                    var htmlStr = template('commitList', res.data)
                    $('tbody').html(htmlStr);
                    if (res.data.totalPage !== 0 && callback != null) {
                        $('#pagination-demo').show().next().hide();
                        // pagination(res)
                        callback(res);
                    } else if (res.data.totalPage == 0 && page == 1) { //连1都没有，说明没有数据
                        $('#pagination-demo').hide().next().show();
                    } else if (res.data.totalPage !== 0 && res.data.data.length == 0) {
                        count -= 1;
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, count)
                    }
                }
            }
        })
    };

    //分页插件：------------------------------------------------
    var count = 1
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                count = page
                getData(count, null);
            }
        });
    }

    //评论审核通过：-------------------------------------------------
    $('tbody').on('click', '.btn-pass', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: id,
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                  $(e.target).parent().prev().text(res.msg)
                  $(e.target).parent().parent().removeClass('danger')
                 
                }

            }
        })
    })
    //评论审核不通过：-------------------------------------------------
    $('tbody').on('click', '.btn-warning', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: id,
            },
            success: function (res) {
                if (res.code == 200) {
             $(e.target).parent().prev().text(res.msg)
             $(e.target).parent().parent().addClass('danger')
                }
            }
        })
    })

  //评论删除：-------------------------------------------------
  $('tbody').on('click', '.btn-danger', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    $.ajax({
        type: 'post',
        url: BigNew.comment_delete,
        data: {
            id: id,
        },
        success: function (res) {
            if (res.code == 200) {
            getData(count, null)
            }
        }
    })



})





})