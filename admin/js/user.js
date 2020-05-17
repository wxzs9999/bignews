$(function () {
    //发送请求，获取信息：-------------------------
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        // headers: {
        //     'Authorization': localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.code == 200) {
                console.log(res.data);
                for (var key in res.data) {
                    $('#form .' + key).val(res.data[key])
                }
                //   $('input[name=username]').val(res.data.username)
                //   $('input[name=email]').val(res.data.email)
                //   $('input[name=nickname]').val(res.data.nickname)
                //   $('input[name=password]').val(res.data.password)
                $('#form .user_pic').attr('src', res.data.userPic)
            }
        }

    })

    //预览图片：----------------------------------------
    $('#exampleInputFile').on('change', function () {
        console.dir(this.files[0]);
        var file = URL.createObjectURL(this.files[0]);
        //会将待上传的图片生成一个模拟的可浏览的图片地址,重新赋值给.user_pic
        $('#form .user_pic').attr('src', file);
    })
    //将修改后的信息发送给服务器：---------------------------------
    //注意：在iframe子页面修改的头像，怎么让父页面的头像也进行更新
    $('#form').on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this); //DOM对象
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            // headers: {
            //     'Authorization': localStorage.getItem('token')
            // },
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    //第一种方法：----------------------
                    // window.location.reload(); //只是让iframe这个单页面重新刷新了，父页面的头像还没更新
                    //   window.parent.window.location.reload();//当前页面的父页面也进行更新
                    // parent.window.location.reload();//可以简写,刷新的是整个页面，会回到首页
                    //第二种方法：--------------推荐---------------------
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        headers: {
                            'Authorization': localStorage.getItem('token'),
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.code == 200) {
                                //user_info是当前页面的父页面的，所以要加parent
                                parent.$('.user_info span i').html(res.data.nickname);
                                parent.$('.user_info img').attr('src', res.data.userPic)
                                parent.$('.user_center_link img').attr('src', res.data.userPic)
                            }
                        }
                    })
                





                }
            }
        })
    })


})