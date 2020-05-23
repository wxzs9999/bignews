// 判断用户是如何来到当前list.html页面的
//1.如果直接输入域名没有参数，则让用户跳转到index.html(主页面) 为空不可以直接访问，要么跳到主页面，要么跳到默认的页面
//list页面是要根据参数来获取数据渲染页面的，不管是id或是关键词
//2.如果有参数，则可以访问当前页面  ?id=2   searchTxt=华为，
$(function () {
  var params = location.search;
  if (!$.trim(params)) {
    window.location.href = './index.html';
    return;
  }
  //2要根据参数进行判断：
  //如果有参数的话： //截取：slice 切割：split
  var str = params.slice(1)
  var obj = utils.strToObj(str);
  console.log(obj);
  //2.1判断参数为id还是关键词
  if (obj.id) {
    var data = { type: obj.id };  //找不到id就是undefined
  } else {
    data = { key: decodeURI(obj.searchTxt) };
  }
  //2.2开始发送ajax请求，渲染页面
  $.ajax({
    type: 'get',
    url: BigNew.artilce_list,
    data: data,
    success: function (res) {
      console.log(res);
      if (res.code == 200) {
        //设置标题:
        if (res.data.data.length == 0) {
          $('.setfr').html(`<div class="list_title">
    <h3>暂无数据</h3>
  </div>`)
        } else {
          if (obj.id) {
            var str = `<div class="list_title">
    <h3>${res.data.data[0].category}</h3>
  </div>`
          } else {   //ES6模板字符串里面可以进行直接的运算
            var str = `<div class="list_title">
     <h3>${decodeURI(obj.searchTxt)}</h3>     
   </div>`
          }
          var htmlStr = template('listMain', res.data)
          $('.left_con').html(str + htmlStr)
        }
      }
    }
  })








})
