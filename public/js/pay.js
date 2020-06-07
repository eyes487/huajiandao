var lis = document.getElementsByTagName('li');
var payPrices = document.getElementsByClassName('payPrice');
var more = document.getElementsByClassName("more")[0];
var radios = document.getElementsByClassName("radio1");
var number=document.getElementById('number');
var price = document.getElementsByClassName('price');
var last = lis[0];


// radios[0].checked = true;
lis[0].style.outline = "5px solid #85a1d4";
payPrices[0].style.display = "block";
for(var i = 1;i<lis.length;i++){
    lis[i].style.display = 'none';
}
more.onclick = function(){
    for(var i = 1;i<lis.length;i++){
        lis[i].style.display = 'block';
    }
}
for(var j= 0;j<lis.length;j++){
    lis[j].index = j;
    lis[j].onclick = function(){
        if(this!= last){
            this.style.outline = "5px solid #85a1d4";
            last.style.outline = "none";
            radios[this.index].checked = true;
            radios[last.index].checked = false;
            payPrices[this.index].style.display = "block";
            payPrices[last.index].style.display = "none";
        }
        last = this;
    }
}
var id = location.href.toString().split('=')[1].split('&')[0];
var value = location.href.toString().split('=')[2].split('&')[0];
var user = location.href.toString().split('=')[3].split('&')[0];
console.log(value+id+user);
number.innerHTML=value;
for(var i=0;i<price.length;i++){
    price[i].innerHTML=parseInt(price[i].innerHTML)*value;
}

var tel=document.getElementById('tel');
tel.innerHTML=user;
function atoncePay(){
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();//2 dom 浏览器 创建ajxa对象
    }else if(window.ActiveXObject){
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");//IE 浏览器的标准
    }
    xhr.open("get","check?id="+id+"&value="+value+"&user="+user,true); 
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200){
            console.log(xhr.responseText);
            if(xhr.responseText==1){
                layer.msg("支付失败",{icon:2});
            }else if(xhr.responseText==0){
                layer.msg("支付成功",{icon:1});
                setTimeout(function(){location.href="index.html";},2000);
            }
        }
    }
}
