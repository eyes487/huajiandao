/**
 * Created by Administrator on 2017/8/29.
 */
var number1=document.getElementById('number1');
var number=document.getElementById('number');//数量
var monenyAll=document.getElementById('moneyAll');//价格
var total=document.getElementById('total');
var ubtotal=document.getElementById('ubtotal');
var a = document.getElementsByClassName("panelwrap")[0];
var receiveAddress=document.getElementById('receiveAddress');//地址
var tel=document.getElementById('tel');//联系电话
var remarks=document.getElementById('remarks');//备注id
// console.log(user);
function btn(){
    if (a.style.display=="none"){
        a.style.display="block";
    }else{
        a.style.display="none"
    }
}

var value = location.href.toString().split('=')[2];
console.log(value);
number1.innerHTML=value;
number.innerHTML=value;
monenyAll.innerHTML=parseInt(monenyAll.innerHTML)*value;
total.innerHTML=parseInt(total.innerHTML)*value;
ubtotal.innerHTML=parseInt(ubtotal.innerHTML)*value;

function pay(){
    var user = sessionStorage.getItem('Key');
    var num=number.innerHTML;
    var priceAll=monenyAll.innerHTML;
    var phone=tel.innerHTML;
    var addr=receiveAddress.innerHTML;
    var remark=remarks.innerHTML;
    // var productName=product.innerHTML;
    var id = location.href.toString().split('=')[1];
    location.href = 'pay.html?id='+id+'='+value+'&user='+user;
    // location.href = 'pay.html?id='+id+'='+value+'='+priceAll+'='+addr+'='+remark+'='+productName;
}
