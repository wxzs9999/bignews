$(function(){
    // 文章类型获取到导航栏上：-------------
    $.ajax({
        type:'get',
        url:BigNew.category_list,
        success:function(res){
          if(res.code==200){
            var htmlStr = template('article_nav',res)
            $('.menu .level_two').html('<li class="up"></li>'+htmlStr)
            $('.menu .left_menu').html(htmlStr)
          }
        }
      })

//获取热点图：--------------------
$.ajax({
   type:'get',
   url:BigNew.hotPic_news,
   success:function(res){
       if(res.code==200){
        var htmlStr=template('hotPic',res)
        $('.focus_list').html(htmlStr)
       }
   }
})
//一周热门排行：----------------------------
$.ajax({
    type:'get',
    url:BigNew.hotrank_list,
    success:function(res){
       if(res.code==200){
        var htmlStr=template('weekHot',res)
        $('.hotrank_list').html(htmlStr);   
       } 
    }
})

//最新资讯：----------------------------
$.ajax({
    type:'get',
    url:BigNew.latest_news,
    success:function(res){
       if(res.code==200){
        var htmlStr=template('news',res)
        $('.common_news').html(htmlStr);   
       } 
    }
})

//最新评论“---------------------
$.ajax({
    type:'get',
    url:BigNew.latest_comment,
    success:function(res){
        console.log(res);
       if(res.code==200){
        var htmlStr=template('newCommit',res)
        $('.comment_list').html(htmlStr);   
       } 
    }
})

//焦点关注---------------------
$.ajax({
    type:'get',
    url:BigNew.attention_news,
    success:function(res){
        console.log(res);
       if(res.code==200){
        var htmlStr=template('focus',res)
        $('.guanzhu_list').html(htmlStr);   
       } 
    }
})

//设置搜索框输入内容不为空：------------------------------
$('.search_btn').on('click',function(){
 
var txt=$('.search_txt').val();

if(!$.trim(txt)){
  alert('输入内容不能为空');
  return;  //阻止代码乡下进行
}
window.location.href='./list.html?searchTxt='+txt;
$('.search_txt').val('');

})























})