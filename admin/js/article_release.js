$(function(){
//获取分类的数据：----------------------------
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
        if (res.code == 200) {
            var htmlStr = template('article_list', res);
            $('.form-control').html(htmlStr);
        }
    }
})
//实现图片预览功能：----------------------
$('#inputCover').on('change',function(){
 var file=this.files[0]
 var url=URL.createObjectURL(file);
 $('.article_cover').attr('src',url)
})

//引入日期插件：-----------------------------
jeDate("#testico",{
    format:"YYYY-MM-DD",
    isTime:false,
    minDate:"2014-09-19 00:00:00",
    zIndex:20999,
})
//引入富文本编辑器插件：
var E = window.wangEditor
var editor = new E('#editor')
editor.create()

//文章发布和存为草稿：-----------------------------
$('#form').on('click','.btn',function(e){
 e.preventDefault();
 var data=new FormData(document.querySelector('#form'));
 data.append('content',editor.txt.html())

 if($(e.target).hasClass('btn-success')){
 data.append('state','已发布')
 }else{
 data.append('state','草稿')
 }

 $.ajax({
     type:'post',
     url:BigNew.article_publish,
     data:data,
     processData: false, 
     contentType: false,
     success:function(res){
       if(res.code==200){
           window.location.href='./article_list.html'
       }
         
     }
 })






})







})