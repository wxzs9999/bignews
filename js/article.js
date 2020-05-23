$(function(){
//获取id，渲染页面
var id= utils.strToObj(location.search.slice(1)).id;

$.ajax({
  type:'get',
  url:BigNew.article_detail,
  data:{
      id:id,
  },
  success:function(res){
    //   console.log(res.data);
    if(res.code==200){
      var htmlStr=template('article',res.data);
      $('.left_con .box').html(htmlStr);  
    }  
  }

})

//文章发表评论：
$('.comment_form').on('submit',function(e){
  e.preventDefault();
$.ajax({
type:'post',
url:BigNew.post_comment,
beforeSend:function(){
 if($('.comment_name').val()==''||$('.comment_input').val()==''){
     alert('内容不能为空');
     return false;
 }
},
data:{
    articleId:id,
    author:$('.comment_name').val(),
    content:$('.comment_input').val(),
},
success:function(res){
    console.log(res);
    if(res.code==201){
  alert('发表成功')      
  $('.comment_form').get(0).reset();
  
    } 
}

})


})























})