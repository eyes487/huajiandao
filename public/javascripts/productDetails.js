/**
 * Created by Administrator on 2017/10/19 0019.
 */
// 单个产品详情左边
function describe(){
    var describe = document.getElementById("describe");
    var detailsLeftDescribe = document.getElementById("detailsLeftDescribe");
    var pseudo1 = detailsLeftDescribe.getElementsByTagName("i")[0];
    if (describe.style.display=="none") {
        describe.style.display="block";
        pseudo1.style.backgroundPosition="-48px -123px";
    }else{
        describe.style.display="none";
        pseudo1.style.backgroundPosition="-64px -123px";
    }
}
function upkeep(){
    var upkeep = document.getElementById("upkeep");
    var detailsLeftUpkeep = document.getElementById("detailsLeftUpkeep");
    var pseudo2 = detailsLeftUpkeep.getElementsByTagName("i")[0];
    if (upkeep.style.display=="none") {
        upkeep.style.display="block";
        pseudo2.style.backgroundPosition="-48px -123px";
    }else{
        upkeep.style.display="none";
        pseudo2.style.backgroundPosition="-64px -123px";
    }
}
function form(){
    var form = document.getElementById("form");
    var detailsLeftForm = document.getElementById("detailsLeftForm");
    var pseudo3 = detailsLeftForm.getElementsByTagName("i")[0];
    if (form.style.display=="none") {
        form.style.display="block";
        pseudo3.style.backgroundPosition="-48px -123px";
    }else{
        form.style.display="none";
        pseudo3.style.backgroundPosition="-64px -123px";
    }
}
function size(){
    var size = document.getElementById("size");
    var detailsLeftSize = document.getElementById('detailsLeftSize');
    var pseudo4 = detailsLeftSize.getElementsByTagName("i")[0];
    if(size.style.display=="none"){
        size.style.display="block";
        pseudo4.style.backgroundPosition="-48px -123px";
    }else{
        size.style.display="none";
        pseudo4.style.backgroundPosition="-64px -123px";
    }
}
// 单个产品中间大图片
function imga1(){
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    if (img2.style.display=="block" && img1.style.display=="none") {
        img1.style.display="block";
        img2.style.display="none";
    }
}
function imga2(){
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    if (img1.style.display=="block" && img2.style.display=="none") {
        img1.style.display="none";
        img2.style.display="block";
    }
}
//添加购物车
function addCart(){
    var productId = location.href.toString().split('=')[1];
    var userName = sessionStorage.getItem('Key');
    if(userName==null){
        layer.msg('暂未登录，请先登录！',{icon:0});
    }else{
        ajax({
            type:'post',
            url:'addCart',
            data:'userName='+userName+'&productId='+productId+'&value='+unmInput.value,
            success:function(response){
                if(response==1){
                    // alert('添加成功');
                    layer.msg('添加成功，在购物车等你哦~',{icon:1});
                }else{
                    layer.msg('',{icon:2});
                 }
            }    
        });
    }
}

function unmButton1(){
    var unmInput = document.getElementById("unmInput");
    unmInput.value--;
    if (unmInput.value<=0){
        unmInput.value=0;
    }
}
function unmButton2(){
    var unmInput = document.getElementById("unmInput");
        unmInput.value++;
}
//判断是否登录，进入订单页面
function test(){
    var unmInput = document.getElementById("unmInput");
    var value=unmInput.value;
    console.log(value);
    var user = sessionStorage.getItem('Key');//获取是哪个用户登录了
    var id = location.href.toString().split('=')[1];
    if(user!='undifined'&&user!=null){
        location.href = 'order.html?id='+id+'&value='+value;
    }else{
        location.href ='login.html';
    }
}
