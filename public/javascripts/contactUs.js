

//高德地图
var map = new AMap.Map('allmap', {
      zoom:15,//级别
      center: [104.06577,30.657515],//中心点坐标
    });
var marker = new AMap.Marker({
           
            position: [104.06577,30.657515],
            offset: new AMap.Pixel(-13, -30)
        });
map.add(marker);
var submitBtn = document.getElementById('submit');//获取到提交按钮
submitBtn.onclick = function(){
    var name = document.forms[0].elements[0].value;
    var tel =  document.forms[0].elements[1].value;
    var msg = document.getElementById('message').value;
    console.log(name +tel+ msg)
    ajax({
        type:"post",
        url:"contactUs.do",
        data:'name='+name+'&tel='+tel+'&msg='+msg,
        dataType:"text",
        success:function(responseText){
            // console.log(responseText)
            if(responseText==1){
                layer.msg('发送成功',{icon:1});
                document.forms[0].elements[0].value='';
                document.forms[0].elements[1].value='';
                document.getElementById('message').value='';
            }
        }
    })
}
