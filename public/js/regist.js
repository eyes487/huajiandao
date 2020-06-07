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
var captcha = ''
// 登录、注册
//验证用户名
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");// 清除前后空格
}
function checkName(){
    var nameT = userName.value.trim();
    // var layout = /^(-)?\d+(\.\d+)?$/;  // 判断输入是否为数字
    // if(nameT!=""){
    //     if(nameT.length!=11){
    //         hint[0].innerText="请输入11位数";
    //     }else if(!layout.test(nameT)){
    //         hint[0].innerText="请输入正确数字";
    //     }else if(nameT.length==11){
            ajax({
                type:'post',
                url:'enroll',
                data:'nameT='+nameT,
                dataType:'text',
                success:function(responseText){
                    hint[0].innerText=responseText;
                }
            });
    //     }
    // }
}
   
// }  
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
    var pwd = $.md5(passWord.value)
    if(checkCode.toUpperCase() === captcha.toUpperCase()){
        ajax({
            type:'post',
            url:'register',
            data:'userName='+userName+'&email='+email.value+'&pwd='+pwd,
            dataType:'text',
            success:function(res){
                if(res==1){
                    layer.msg('注册成功,2s后自动跳转登录页',{icon:1});
                    setTimeout(function(){
                        location.href="login.html";
                    },2000);
                }else{
                    layer.msg('注册失败',{icon:2});
                }
            }
        });
    }else{
        layer.msg('验证码输入不正确',{icon:2});
    }
    
}

//创建验证码
function createCode(){
    var checkCode = document.getElementById("code")
    ajax({
        type:'get',
        url:'captcha',
        data:'',
        success:function(response){
            var data = JSON.parse(response)
            captcha = data.text;
            checkCode.innerHTML = data.code
            console.log(data)
        }
    })
}

createCode()