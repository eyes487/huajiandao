var formGroup = document.getElementsByTagName("form")[0];
var userName = formGroup.getElementsByTagName("input")[0];  //用户名
var code = document.getElementById("code"); //验证码
var email = formGroup.getElementsByTagName("input")[2]; //邮箱
var passWord = formGroup.getElementsByTagName("input")[3]; //密码
var pWCopy = formGroup.getElementsByTagName("input")[4]; //确认密码
// var checkBox = formGroup.getElementsByTagName("input")[5]; //协议
var checkBox = document.getElementsByClassName("port")[0]; //协议
var hint = formGroup.getElementsByClassName("hint");  //提示框
var lrBtn = document.getElementsByClassName("lrBtn")[0]; //提交按钮
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
        }else if(!layout.test(nameT)){
            hint[0].innerText="请输入正确数字";
        }else if(nameT.length==11){
            ajax({
                type:'post',
                url:'enroll',
                data:'nameT='+nameT,
                dataType:'text',
                success:function(responseText){
                    hint[0].innerText=responseText;
                }
            });
        }
    }
}
// 验证码倒计时
var wait=60;  
var buttom=true;
function countTime(o) { 
    
    if(buttom==true){
        console.log('aaa')
       userName=userName.value;
       ajax({
           type:'post',
           url:'verify',
           data:'userName='+userName,
           dataType:'JSON',
           success:function(data){
               console.log("手机验证码发送成功");
           }
       });
        buttom=false;
    }
    if (wait == 0) {  
        o.removeAttribute("disabled");            
        o.innerHTML="获取验证码";  
        buttom==true;
        wait = 60;  
    } else {  
        o.setAttribute("disabled", true);
        o.innerHTML=""+wait+"s后重新发送";  
        wait--;  
        setTimeout(function() {  
            countTime(o)  
        },  
        1000)  
    } 
   
}  
// 验证邮箱格式
function checkEmail(){ 
    var emailT = email.value.trim();
    // console.log(emailT)
    ajax({
        type:'post',
        url:'mailbox',
        data:'emailT='+emailT,
        dataType:'JSON',
        success:function(data){
            console.log(data);
        }
    });
    var layout = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;//邮箱格式
    if(emailT!=""){
        console.log(layout.test(emailT))
        if(!layout.test(emailT)){
            hint[2].innerText="请填写有效的邮箱";
        }else{
            hint[2].innerText="";
        }
    }
}
// 验证密码
function checkPW(){
    var passWordT = passWord.value.trim();
    // var layout = /^[A-Za-z0-9]{6,12}$/;
    if(passWordT!=""){
        if(passWordT.length<6||passWordT.length>12){
            hint[3].innerText="请填写6-12位字符";
        }else{
            hint[3].innerText=""
        }
    }
}
// 确认密码
function copyPW(){
    var passWordT = passWord.value.trim();
    var pWCopyT = pWCopy.value.trim();
    // console.log(pWCopyT)
    if(pWCopyT!=""){
        if(pWCopyT!=passWordT){
            hint[4].innerText="两次密码不一致"
        }else{
            hint[4].innerText="";
        }
    }
}
// 验证是否勾选checkBox.checked

// 验证信息是否完全填写提交
function checkEvery(){
    if(userName.value=="" || email.value=="" || passWord.value=="" || pWCopy.value=="" || checkBox.checked==false){
        lrBtn.setAttribute("disabled",true);
        lrBtn.style.background = '#6f6969';
    }
    if(userName.value!="" && email.value!="" && passWord.value!="" && pWCopy.value!="" && checkBox.checked==true){
        if(hint[0].innerText=="可以注册" && hint[1].innerText=="" && hint[2].innerText=="" && hint[3].innerText=="" && hint[4].innerText==""){
            lrBtn.removeAttribute("disabled");
            lrBtn.style.background = '#ef4b28';
            clearInterval(subtime);
        }
    }
}
var subtime=setInterval(checkEvery,500);
function register(){
    var checkCode = document.getElementsByClassName('code')[0].value;
    var userName = document.getElementsByClassName('userName')[0].value;
    
    ajax({
        type:'post',
        url:'login.do',
        data:'userName='+userName+'&code='+checkCode+'&email='+email.value+'&pwd='+passWord.value,
        dataType:'text',
        success:function(res){
            // console.log('144',res)
            if(res==1){
                layer.msg('注册成功',{icon:1});
                setTimeout(function(){
                    location.href="login.html";
                },2000);
            }else{
                layer.msg('注册失败',{icon:2});
            }
        }
    });
    
}