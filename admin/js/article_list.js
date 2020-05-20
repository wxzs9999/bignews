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

    //封装的获取页面数据：--------------------------------------
    var current=1;
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
                    //分页插件调用：目的:重新渲染页面数-----
                    if(res.data.totalPage==0&&mypage==1){
                 $('#pagination-demo').hide().next().show()
                    }else if(res.data.totalPage!=0 && callback!=null){
                 $('#pagination-demo').show().next().hide()
                   callback(res);
                    }else if(res.data.totalPage!=0 && res.data.data.length==0){
                    //针对于最后一页
                     current-=1
                     $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, current)

                    }
                }
            }
        })

     }
    //获取主内容数据：----------------------
    getDate(1,pagination)

    //筛选设置事件：---------------------------------------------
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        getDate(1,function(res){
        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        })
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
                current =page;
                getDate(page,null)
            }
        });

    }

    //删除事件：---------------------------------------
   $('.removeModal').on('show.bs.modal', function (e) {
    window.id=$(e.relatedTarget).data('id');
    console.log(id);
     })
    //确定删除按钮：---------------------------------------
   $('.btn-primary').on('click',function(){
      $.ajax({
          type:'post',
          url:BigNew.article_delete,
          data:{
              id:id
          },
         success:function(res){
         if(res.code==204){
        $('.removeModal').modal('hide');
        //因为是当前页，所以最后一页删除最后一项时，最后一页没有数据了，还是停在最后一页，所以在封装的函数中，添加判断条件
            getDate(current,null)
         }
         } 
      }) 
   })

    })







