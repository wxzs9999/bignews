$(function () {

  $('.input_sub').on('click', function (e) {
    e.preventDefault()
    //验证不为空：
    var userName = $('.input_txt').val();
    var pwd = $('.input_pass').val();
    if ($.trim(pwd) == '' || $.trim(userName) == '') {
      $('.modal').modal('show');
      $('.modal-body p').html('内容不能为空');
      return; //阻止代码向下进行
    }
    $.ajax({
      type: 'post',
      // url: 'http://localhost:8080/api/v1/admin/user/login',
      url: BigNew.user_login,
      data: {
        username: userName,
        password: pwd
      },
      success: function (res) {
        console.log(res);
        $('.modal').modal('show');
        $('.modal-body p').html(res.msg);
        if (res.code == 200) {
          $('.modal').on('hidden.bs.modal', function (e) {
            window.location.href = './index.html'
          })
        }
      }

    });

  })





})