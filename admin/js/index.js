$(function () {
    //JQ:-------------------------------------------------
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('.user_info span i').html(res.data.nickname);
                $('.user_info img').src = res.data.userPic;
                $('.header_bar img').src = res.data.userPic;
            }
        }


    })

    //原生js方法：--------------------------------------------
    // var xhr = new XMLHttpRequest();
    // xhr.open('get', BigNew.user_info);
    // xhr.setRequestHeader('Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIxOTQ0MjU0MDksImlhdCI6MTU4OTYyNTQwOX0.1v5TcepS5pklFQskczBSyZ_MRqyBYmjRj4xia1mgZasHXjasXSufbITDsV2ZOtytZOI_y2jbCw0O-221CsH1XZfBknePWqH08yBKgIfZ-kqKEmZ7mhazx5qake51EJ98gtAJvzG3sxOn146iUfTt2apUAlZvZWnI3MPhG7IcBB8');
    // xhr.send(null);
    // xhr.onreadystatechange = function () {
    // if (xhr.readyState == 4 && xhr.status == 200) {
    // var nickname=JSON.parse(xhr.responseText).data.nickname;
    // var userPic=JSON.parse(xhr.responseText).data.userPic;
    //      $('.user_info span i').text(nickname);
    //      $('.user_info img').src=userPic;
    //         }
    // }

    //退出登录事件：---------------------------------------
    $('.user_center_link .logout').on('click', function () {
        alert(123)
        //1.删除本地的token：
        window.localStorage.removeItem('token');
        //2.跳转到登陆页面：
        window.location.href = './login.html';
    })



})