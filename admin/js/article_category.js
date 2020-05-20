// 动态方法：-------------------------------------------------
$(function () {

    //获取数据：------------------------------------------
function render(){
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template('catagory', res)
                $('tbody').html(htmlStr);
            }
        }
    })
}
render();

//新增或修改数据上：--------------------------------
$('.addModal').on('show.bs.modal', function (e) {
    window.addId=$(e.relatedTarget).data('id')
    console.log(addId);
    
if($(e.relatedTarget).attr('id')=='xinzengfenlei'){
   $('.addModal h4').text('新增文章');
   $('#myform')[0].reset();
}else{
   $('.addModal h4').text('修改文章');
   $.ajax({
       type:'get',
       url:BigNew.category_search,
       data:{
           id:$(e.relatedTarget).data('id')
       },
       success:function(res){
     if(res.code==200){
     $('#myform input[name=id]').val(res.data[0].id)
     $('#myform input[name=name]').val(res.data[0].name)
     $('#myform input[name=slug]').val(res.data[0].slug)
     }
       }
   }) 
}


    })

//新增或修改数据下：--------------------------------
$('.btn-primary').on('click',function(){
    // var id=$('#myform input[name=id]').val();

 $.ajax({
     type:'post',
     url:addId? BigNew.category_edit:BigNew.category_add,
     data:$('#myform').serialize(),
     success:function(res){
         console.log(res);
         $('.addModal').modal('hide');
         render();
     }

 })

})

//删除数据上：-------------------------------------
$('.removeModal').on('show.bs.modal', function (e) {
   window.romoveId=$(e.relatedTarget).data('id');
    })
//删除数据下：-------------------------------------
$('.removeModal .btn-primary').on('click',function(){
  $.ajax({
      type:'post',
      url:BigNew.category_delete,
      data:{
          id:romoveId,
      },
    success:function(res){
     if(res.code==204){
        $('.removeModal').modal('hide');
        render();
     }        
    }
  })

})






















})


