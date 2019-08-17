var formGroup = document.getElementsByTagName("form")[0];
var userName = formGroup.getElementsByTagName("input")[0];  //用户名
var passWord = formGroup.getElementsByTagName("input")[1]; //密码
var checkBox = formGroup.getElementsByTagName("input")[2]; //协议
var lrBtn = document.getElementsByClassName("lrBtn")[0]; //提交按钮
var hint = formGroup.getElementsByClassName("hint");  //提示框
var checkCodeArea = document.getElementById("code");//生成验证码的区域

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");// 清除前后空格
}
// 用户名
function checkName(){
    var nameT = userName.value.trim();
    var layout = /^(-)?\d+(\.\d+)?$/;  // 判断输入是否为数字
    if(nameT!=""){
        if(nameT.length!=11){
            hint[0].innerText="请输入11位数";
        }else if(!layout.test(nameT)){
            hint[0].innerText="请输入正确数字";
        }else{
            hint[0].innerText="";
        }
    }
}
function checkPW(){
    var passWordT = passWord.value.trim();
    // var layout = /^[A-Za-z0-9]{6,12}$/;
    if(passWordT!=""){
        if(passWordT.length<6||passWordT.length>12){
            hint[1].innerText="密码有误";
        }else{
            hint[1].innerText=""
        }
    }
}

function checkEvery(){
    // if(userName.value=="" ||passWord.value=="" || checkBox.checked==false){
    //     lrBtn.setAttribute("disabled",true);
    // }
    // if(userName.value!="" && passWord.value!="" && checkBox.checked==true){
    //     if(hint[0].innerText=="" && hint[1].innerText==""){
    //         lrBtn.removeAttribute("disabled");
    //         clearInterval(subtime);
    //     }
    // }
}
var subtime=setInterval(checkEvery,500);

var lrBtn = document.getElementsByClassName('lrBtn')[0];

lrBtn.onclick =  function(){
    var code = document.getElementById("code").getElementsByTagName('i')[0].innerHTML.toLowerCase();
    var inputCode = document.getElementsByClassName("checkInput")[0].value.toLowerCase();
    var userName = document.forms[0].elements[0].value;
    var pwd = document.forms[0].elements[1].value;
    if(code == inputCode){
        ajax({
            type:'post',
            url:'loginPost.do',
            data:'userName='+userName+'&pwd='+pwd,
            success:function(response){
                if(response==3){
                    location.href = 'backstage.html';
                }else if(response==1){
                    window.sessionStorage.setItem('Key',userName);
                    location.href="myE&Q.html"; 
                }else{
                    hint[0].innerText="用户名或密码错误";
                    document.forms[0].elements[1].value ='';
                }
            }
        })
    }else{
        layer.msg('验证码输入不正确',{icon:2});
    }
    
}

//创建验证码
function createCode(){
    code = "";
    var codeLength = 4;//验证码的长度
    var checkCode = document.getElementById("code").getElementsByTagName('i')[0];
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
        'S','T','U','V','W','X','Y','Z');//随机数
    for(var i = 0; i < codeLength; i++) {//循环操作
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
        code += random[index];//根据索引取得随机数加到code上
    }
    checkCode.innerHTML = code;//把code值赋给验证码
}
createCode();