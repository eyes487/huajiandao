//封装ajax
var createAjax=function(){
    var xhr=null;
    try{
        xhr=new ActiveXObject("microsoft.XMLHTTP");
    }catch(err){
        try{
            xhr=new XMLHttpRequest();
        }catch(err2){
            window.alert("你的浏览器不支持！");
        }
    }
    return xhr;
}
var ajax=function(obj){
    var type=obj.type;
    var url=obj.url;
    var data=obj.data;
    var dataType=obj.dataType;
    var success=obj.success;
    if(type==null){ 
        type="get";
    }
    if(dataType==null){
        dataType="text";
    }
    var xhr=createAjax();//创建ajax对象
    xhr.open(type,url,true);
    if(type=="get"||type=="GET"){
        xhr.send(null);
    }
    if(type=="post"||type=="POST"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            if(dataType=="text"||dataType=="TEXT"){
                if(success!=null){
                    success(xhr.responseText);
                }
            }else if(dataType=="josn"||dataType=="JOSN"){
                if(success!=null){
                    success(eval( "(" +xhr.responseText+ ")" ));
                }
            }
        }
    }
}