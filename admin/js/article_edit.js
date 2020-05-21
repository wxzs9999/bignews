$(function () {

    //可以获取当前页面的URL地址栏当中的？后面的参数
    // console.log(window.location.search);
    //获取到了id
    var str = location.search.slice(1)
    var id = utils.strToObj(str).id;
    // console.log(id);

    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id,
        },
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                $('#form input[name=title]').val(res.data.title);
                //内存底层会自动判断  
                // $('#form select[name="categoryId"]').val(res.data.categoryId);
                $('#form input[name=date]').val(res.data.date);
                $('#form input[name=main]').val(res.data.content);
                $('#form .article_cover').attr('src', res.data.cover);
                var categoryId=res.data.categoryId;

                //获取文章分类：----------------------
                $.ajax({
                    type: 'get',
                    url: BigNew.category_list,
                    success: function (res) {
                        if (res.code == 200) {
                            //js为动态的弱类型语言，可以随时添加属性
                            res.categoryId=categoryId
                            var htmlStr = template('article_list', res);
                            $('.category').html(htmlStr);
                        }
                    }
                })
            }
        }
    })







})