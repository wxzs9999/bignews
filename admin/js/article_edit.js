$(function () {
    //启用日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 20999,
    })
    //启用富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    editor.create()


    //可以获取当前页面的URL地址栏当中的？后面的参数
    // console.log(window.location.search);
    //获取到了id
    var str = location.search.slice(1)
    var id = utils.strToObj(str).id;
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id,
        },
        success: function (res) {
            if (res.code == 200) {
                $('#form input[name=id]').val(res.data.id);
                $('#form input[name=title]').val(res.data.title);
                //内存底层会自动判断  
                // $('#form select[name="categoryId"]').val(res.data.categoryId);
                $('#form input[name=date]').val(res.data.date);
                //设置内容：
                editor.txt.html(res.data.content)
                $('#form .article_cover').attr('src', res.data.cover);
                var categoryId = res.data.categoryId;

                //获取文章分类：----------------------
                $.ajax({
                    type: 'get',
                    url: BigNew.category_list,
                    success: function (res) {
                        if (res.code == 200) {
                            //js为动态的弱类型语言，可以随时添加属性
                            //方法2：1.在响应回来的数据里，将对应id作为一个属性添加进来
                            //2.在模板字符串里添加判断
                            res.categoryId = categoryId
                            var htmlStr = template('article_list', res);
                            $('.category').html(htmlStr);
                        }
                    }
                })
            }
        }
    })

    //设置上传图片预览功能：
    $('#inputCover').on('change', function () {
        var file = this.files[0]
        var url = URL.createObjectURL(file);//创建了一个图片模拟链接
        $('.article_cover').attr('src', url);
    })

//优化修改，存为草稿事件：
$('#form').on('click', '.btn',function (e) {
    e.preventDefault();
    //1.准备数据：
    var form = document.querySelector('#form');
    var data = new FormData(form)  //，传入必须是一个DOM对象，获取到form里面所有带name属性的值,转成二进制
    data.append('content', editor.txt.html())
    
    console.log(e.target);
    if($(e.target).hasClass('btn-edit')){
        data.append('state', '已发布');
    }else{
        data.append('state', '草稿');
    }
    $.ajax({
        type: 'post',
        url: BigNew.article_edit,
        data: data,
        contentType: false, //不使用原来的编码方式
        processData: false,  //不使用字符串的拼接
        success: function (res) {
            if (res.code == 200) {
                // window.history.back();//回退到上一页
                window.location.href='./article_list.html'
            }
        }
    })

})



})