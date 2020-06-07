/**
 * Created by Administrator on 2017/10/19 0019.
 */
var cartAddLineChoiceInput=document.getElementsByClassName("cartAddLineChoiceInput");
var checkAll=document.getElementById("checkAll");
var userLogin=document.getElementById("user");
var priceAll=document.getElementById("priceAll");
var price=document.getElementsByClassName("price");
var minusNum = document.getElementById('minus');
var addNum = document.getElementById('add')
var num = document.getElementById('num');
var balance=document.getElementById("balance");
// minusNum.onclick = function(){
//     if(num.value!=1){
//         num.value--;
//     }
// }
// addNum.onclick = function(){
//         num.value++;
// }
function deleteCart(obj){
    layer.confirm('确认删除该商品吗？',function(){
        var userName =sessionStorage.getItem('Key');
        console.log(obj);
        ajax({
            type:'post',
            url:'deleteCart',
            data:'id='+obj,
            success:function(response){
                var res = JSON.parse(response)
                console.log('res-------',res)
                if(res.code == 200){
                    location.href = 'shoppingCart.html?userName='+userName;
                }
            }
        })
    })
}

$('#checkAll').removeAttr("checked");
//购物车选择功能
// console.log($('#priceAll').next());
$('#checkAll').click(function (){
    priceAll.innerHTML=0
    if(this.checked==true){//当全选==true
        $(".cartAddLineChoiceInput").each(function(index,item){
            $(item).prop("checked",true); //所有的checkbox==true
        });
        for(var i=0;i<price.length;i++){//所有的商品的价格相加
            priceAll.innerHTML=parseInt(priceAll.innerHTML)+parseInt(price[i].innerHTML)
            // if(parseInt(priceAll.innerHTML)>0){
                // balance.style.backgroundColor='red';
                console.log($('#priceAll').next())
                $('#priceAll').next().css({"background-color":"red"});
            // }
        }
        
    }
    else{//反之==false
        $(".cartAddLineChoiceInput").each(function(index,item){
            $(item).prop("checked",false);
            // console.log(item.checked)  
            priceAll.innerHTML=0;
            $('#priceAll').next().css({"background-color":"#B0B0B0"});
        });
    } 
});
$(".cartAddLineChoiceInput").click(function(){
    var money=$(this).parent().siblings().find('.price').html();
    // console.log(parseInt(money));
    if(this.checked==true){//当checkbox==true,商品加值
        priceAll.innerText=parseInt(priceAll.innerText)+parseInt(money);
        $('#priceAll').next().css({"background-color":"red"});
    }else{
        priceAll.innerText=parseInt(priceAll.innerText)-parseInt(money);
        if(parseInt(priceAll.innerText)==0){
            $('#priceAll').next().css({"background-color":"#B0B0B0"});
        }
    }
    $(".cartAddLineChoiceInput").each(function(index,item){
        if(item.checked==false){//当任意一个checkbox==false
            checkAll.checked=false;//全选==false
            console.log(item.checked);
        }
    });
});

