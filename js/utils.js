//沙箱模式
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


window.utils=utils;



})()