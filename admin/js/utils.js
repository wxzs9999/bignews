//沙箱
//获取url地址栏中的？后面的参数值;
(function(){
var utils={
  strToObj:function(str){
     var arr=str.split('$');
     var obj={};
     for(var i=0;i<arr.length;i++){
       var temp=arr[i].split('=');
       obj[temp[0]]=temp[1];  
     } 
     return obj;
  }
}

//向外暴露，要不然使用不了
window.utils=utils;
})()