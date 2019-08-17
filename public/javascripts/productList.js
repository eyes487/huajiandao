var sexClass = document.getElementById('list_main').getElementsByTagName('li');
var clothingClassArea = document.getElementById('list_mainal');
var clothingClass = document.getElementById('list_mainal').getElementsByTagName('button');
var pageCounts = document.getElementById('pageCounts');
var list_interior=document.getElementById("list_interior");//商品展示区
var pageBtn = document.getElementById('pageCounts').getElementsByTagName('span');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var pageCount = 1;
//查询总页数
function queryAllPage(){
    ajax({
        type:"post",
        url:"queryPage.do",
        data:'sex='+sexClassValue+'&clothing='+clothingClassValue,
        dataType:"text",
        success:function(responseText){
            var data = JSON.parse(responseText);
            // console.log(responseText)
            allPageCount = Math.ceil(data[0].allCount/6);
            // console.log(allPageCount)
            pageCounts.innerHTML = '';  
            for(var i=1;i<=allPageCount;i++){
                pageCounts.innerHTML +=`
                    <span>${i}</span>
                `;
            }
            // changePage(sex,clothing);
            changePage();
            //给当前页码添加颜色
            if(allPageCount!=0){
                for(var i=0;i<allPageCount;i++){
                    pageBtn[i].setAttribute('class','');
                }
                pageBtn[pageCount-1].setAttribute('class','on');
            }      
        }
    });
}
//查询热门推销
function queryHotProduct(){
    var hotProduct = document.getElementById('hotProduct');
    ajax({
        type:"post",
        url:"hotProduct.do",
        data:{},
        dataType:"text",
        success:function(response){
            let data = JSON.parse(response);
            hotProduct.innerHTML = '';
            for(var i=0;i<6;i++){
                hotProduct.innerHTML+=`
                <li>
                    <div class="goods-pic"><a href="productDetail.html?id=${data[i].ci_id}"><img src=${data[i].img_src1} alt=""></a></div>
                    <div class="goods-info">
                        <p>${data[i].ci_name}</p>
                        <p class="price">￥${data[i].ci_price}</p>
                    </div>
                </li>
                `;
            }
        }
        
    })
}
//查询商品
function queryProduct(){
    sexClassValue = document.getElementsByClassName('onChecked')[0].innerHTML;//大的分类
    console.log(sexClassValue);
    clothingClassV = document.getElementsByClassName('onChecked1')[0];//细的分类
    if(clothingClassV){
        // console.log(clothingClassValue.innerHTML)
        clothingClassValue = clothingClassV.innerHTML;
    }else{
        clothingClassValue = 'undefined';
    }
    queryAllPage();
    ajax({
        type:"post",
        url:"productList.do",
        data:'sex='+sexClassValue+'&clothing='+clothingClassValue+'&pageCount='+pageCount,
        dataType:"text",
        success:function(responseText){
            var data=JSON.parse(responseText);
            list_interior.innerHTML="";
            for(var i=0;i<data.length;i++){
                list_interior.innerHTML+=`
                <div class="list_content">
                    <img src=${data[i].img_src1} alt="">
                    <p class="productName">${data[i].ci_name}</p>
                    <p class="productPrice">￥${data[i].ci_price}</p>
                    <button class="list_add_cart">
                        <a href="productDetail.html?id=${data[i].ci_id}">立即购买</a>
                    </button>
                </div>
                `  
            }
   
        }
    });
}
//上一页
function prevPage(){
    if(pageCount>1){
     pageCount--;
    queryProduct();
    }else{
        layer.msg('已经是第一页了',{icon:0});
    }               
}  
//下一页
function nextPage(){
    if(pageCount<allPageCount){
     pageCount++;
     queryProduct();
    }else{
        layer.msg('已经是最后一页了',{icon:0});
    }              
}
//点击对应的页码，跳到具体的页数
function changePage(){
     for(var j=0;j<=allPageCount-1;j++){
          pageBtn[j].index = j;
     pageBtn[j].onclick=function(){
         pageCount = this.index+1;  
         queryProduct();
         
     }
     }
}   

//加载的时候先调用一下

queryProduct();
queryHotProduct();

for(var i =0 ;i<sexClass.length;i++){
    sexClass[i].index =i;
    //1.点击分类
    sexClass[i].onclick = function(){
        pageCount = 1;//重置页数为1
        for(var i =0 ;i<sexClass.length;i++){
            sexClass[i].setAttribute('class','');
        }
        sexClass[this.index].setAttribute('class','onChecked');
        
        for(var j=0;j<clothingClass.length;j++){
            clothingClass[j].setAttribute('class','');
            //移除其他兄弟的类
        }
        if(this.index==0){
            clothingClassArea.style.opacity = '0';
           
            for(var i=0;i<clothingClass.length;i++){
                clothingClass[i].innerHTML = '';
            }
        }else if(this.index==1){
            clothingClassArea.style.opacity = '1';
            clothingClass[0].innerHTML = '恋人';
            clothingClass[1].innerHTML = '朋友';
            clothingClass[2].innerHTML = '父母';
            clothingClass[3].innerHTML = '老师';
            clothingClass[4].innerHTML = '病人';
            clothingClass[5].innerHTML = '领导';
        }else if(this.index==2){
            clothingClassArea.style.opacity = '1';
            clothingClass[0].innerHTML = '9朵';
            clothingClass[1].innerHTML = '11朵';
            clothingClass[2].innerHTML = '13朵';
            clothingClass[3].innerHTML = '19朵';
            clothingClass[4].innerHTML = '21朵';
            clothingClass[5].innerHTML = '33朵';
        }
        
        // console.log(sexClassValue);
        queryProduct();
        for(var j=0;j<clothingClass.length;j++){
            clothingClass[j].index = j;
            //2.点击详细分类按钮
            clothingClass[j].onclick = function(){
                pageCount = 1;//重置页数为1
                for(var j=0;j<clothingClass.length;j++){
                    clothingClass[j].setAttribute('class','');
                    //移除其他兄弟的类
                }
                //给点击的按钮添加类
                clothingClass[this.index].setAttribute('class','onChecked1');            
                // console.log(clothingClassValue);
                queryProduct();
               
            }
        }
    }
}
prev.onclick = function(){
    prevPage();
}
next.onclick = function(){
    nextPage();
}
