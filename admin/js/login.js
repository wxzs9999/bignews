$(function(){

$('.input_sub').on('click',function(e){
  e.preventDefault()
//验证不为空：
var userName=$('.input_txt').val();
var pwd=$('.input_pass').val();
if($.trim(pwd)==''||$.trim(userName)==''){
  alert('内容不能为空'); 
  return; //阻止代码向下进行
}
$.ajax({
  type:'post',
  url:'http://localhost:8080/api/v1/admin/user/login',
  data:{
    username:userName,
    password:pwd
  },
  success:function(res){
  console.log(res);
  if(res.code==200){
  window.location.href = './index.html'
  }else{
    alert(res.msg)
  }
  }

});

})





})