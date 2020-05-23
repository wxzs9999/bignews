$(function () {
    //获取id，渲染页面
    var id = utils.strToObj(location.search.slice(1)).id;

    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id,
        },
        success: function (res) {
              console.log(res.data);
            if (res.code == 200) {
                var htmlStr = template('article', res.data);
                $('.left_con .box').html(htmlStr);
                //渲染评论：
                commitList();
            }
        }

    })

    //文章发表评论：
    $('.comment_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            beforeSend: function () {
                if ($('.comment_name').val() == '' || $('.comment_input').val() == '') {
                    alert('内容不能为空');
                    return false;
                }
            },
            data: {
                articleId: id,
                author: $('.comment_name').val(),
                content: $('.comment_input').val(),
            },
            success: function (res) {
                console.log(res);
                if (res.code == 201) {
                    alert('发表成功')
                    $('.comment_form').get(0).reset();

                }
            }

        })


    })


    //评论列表：评论列表是根据文章生成的，最好要等文章渲染出来之后，在渲染评论
  function commitList(){
    $.ajax({
        type: 'get',
        url: BigNew.comment_list,
        data: {
            articleId: id,
        },
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template('commit', res)
                $('.comment_list_con').html(htmlStr);
                $('.comment_count').html(res.data.length+'条评论')
            }
        }
    })
  }























})