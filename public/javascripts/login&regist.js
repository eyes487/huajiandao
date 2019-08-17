var formGroup = document.getElementsByTagName("form")[0];
var userName = formGroup.getElementsByTagName("input")[0];  //用户名
var code = formGroup.getElementsByTagName("input")[1]; //验证码
var email = formGroup.getElementsByTagName("input")[3]; //邮箱
var passWord = formGroup.getElementsByTagName("input")[4]; //密码
var pWCopy = formGroup.getElementsByTagName("input")[5]; //确认密码
var hint = formGroup.getElementsByClassName("hint");  //提示框
// 登录、注册
//验证用户名
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");// 清除前后空格
}
function checkName(){
    var nameT = userName.value.trim();
    var layout = /^(-)?\d+(\.\d+)?$/;  // 判断输入是否为数字
    if(nameT!=""){
        if(nameT.length!=11){
            hint[0].innerText="请输入11位数";
        }else if(layout.nameT!=null){
            hint[0].innerText="请输入正确数字";
        }else{
            hint[0].innerText="";
        }
    }
}
// 验证码倒计时
// function countTime(){
    var wait=60;  
    function countTime(o) {  
            if (wait == 0) {  
                o.removeAttribute("disabled");            
                o.value="获取验证码";  
                wait = 60;  
            } else {  
                o.setAttribute("disabled", true);  
                o.value=""+wait+"s后重新发送";  
                wait--;  
                setTimeout(function() {  
                    countTime(o)  
                },  
                1000)  
            }
            console.log(document.forms[1].elements[0].value);
        }  
    // document.getElementById("btn").onclick=function(){countTime(this);}
// }

// 验证邮箱格式
function checkEmail(){
    var emailT = email.value.trim();
    var layout = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//邮箱格式
    if(emailT!=""){
        if(!layout.emailT){
            hint[2].innerText="请填写有效的邮箱";
        }else{
            hint[2].innerText="";
        }
    }
}
// 验证密码
function checkPW(){
    var passWordT = passWord.value.trim();
    // var layout = /^[A-Za-z0-9]{6,16}$/;
    if(passWordT!=""){
        console.log(passWordT)
        console.log(passWordT.length)
        if(passWordT.length<6||passWordT.length>12){
            hint[3].innerText="请填写6-12位字符";
        }else{
            hint[3].innerText="";
        }
    }
}
// 确认密码
function copyPW(){
    var pWCopyT = pWCopy.value.trim();
    var passWordT = passWord.value.trim();
    if(pWCopyT!=""){
        if(pWCopyT!=passWordT){
            hint[4].innerText="请输入正确的密码"
        }else{
            hint[4].innerText="";
        }
    }
}
// 验证是否勾选