
var moveTop = document.getElementById('move-top');
var loginArea = document.getElementsByClassName('login')[0];//获取到显示登录的区域
var banner = document.getElementsByClassName('banner')[0];//获取到banner元素
var enroll = document.getElementById('enroll');//第二个头部的登录区域
var user = sessionStorage.getItem('Key');//获取是哪个用户登录了
var timer = 0;
var isTop = true;
var i = 1;
window.onscroll = function(){
    var osTop = document.documentElement.scrollTop||document.body.scrollTop;
    // console.log(osTop);
   
    if(osTop>628){
        moveTop.style.display = 'block';
    }else{
        moveTop.style.display = 'none';
    }
    if(!isTop){
        clearInterval(timer);
    }
    isTop = false;
}
moveTop.onclick = function(){
    //获取到滚动条的高度，并添加点击事件，减少高度
    timer = setInterval(function(){
        var osTop = document.documentElement.scrollTop || document.body.scrollTop ;
        //设置每次减少的高度

        var ispeed = Math.floor(-osTop/5);
        document.documentElement.scrollTop =document.body.scrollTop= osTop +ispeed;
            isTop = true;
        if(osTop==0){
            clearInterval(timer);
        }
    },30);
}
var blindArray = [
    ['./images/myE&QImg/index-banner1.jpg', '小行星', 'javascript:;'],
    ['./images/myE&QImg/index-banner2.jpg', '红枫叶', 'javascript:;'],
    ['./images/myE&QImg/index-banner3.jpg', '璀璨星空', 'javascript:;'],
    ['./images/myE&QImg/index-banner4.jpg', '回家', 'javascript:;'],
    ['./images/myE&QImg/index-banner5.jpg', '浪漫', 'javascript:;'],
];
var blindBox = new blind ({
    arr: blindArray,
    autoPlay: true,
    animationTime: 5000, 
    bladeNum: 10,
    callback: function(num) {
        // console.log(num);
    }
});

//添加购物车
function addCart(id){
    var userName = sessionStorage.getItem('Key');
    if(userName==null){
        layer.msg('暂未登录，请先登录！',{icon:0});
    }else{
        ajax({
            type:'post',
            url:'addCart',
            data:'userName='+userName+'&productId='+id+'&value=1',
            success:function(response){
                if(response==1){
                    layer.msg('添加成功，在购物车等你哦~',{icon:1});
                }else{
                    layer.msg('',{icon:2});
                 }
            }    
        }); 
    }
}