var formGroup = document.getElementsByTagName("form")[0];
var userName = formGroup.getElementsByTagName("input")[0];  //用户名
var passWord = formGroup.getElementsByTagName("input")[1]; //密码
var checkBox = formGroup.getElementsByTagName("input")[2]; //协议
var lrBtn = document.getElementsByClassName("lrBtn")[0]; //提交按钮
var hint = formGroup.getElementsByClassName("hint");  //提示框
var checkCodeArea = document.getElementById("code");//生成验证码的区域
var remember = document.getElementById('remember')
var captcha = ''
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
function init(){
    var checked = localStorage.getItem('remember')
    if(checked){
        var userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo) || {}
        userName.value = userInfo.userName
        passWord.value = userInfo.passWord
        remember.checked = true
    }
}

var lrBtn = document.getElementsByClassName('lrBtn')[0];

lrBtn.onclick =  function(){
    var inputCode = document.getElementsByClassName("checkInput")[0].value.toLowerCase();
    var userName = document.forms[0].elements[0].value;
    var pwd = document.forms[0].elements[1].value;

    if(remember.checked){
        localStorage.setItem('userInfo',JSON.stringify({
            userName: userName,
            passWord: pwd
        }))
        localStorage.setItem('remember',remember.checked)
    }
    if(captcha.toUpperCase() == inputCode.toUpperCase()){
        ajax({
            type:'post',
            url:'loginPost.do',
            data:'userName='+userName+'&pwd='+$.md5(pwd),
            success:function(response){
                var res = JSON.parse(response)
                if(res.code==200){
                    if(res.data.userName == "admin"){
                        location.href = 'backstage.html';
                    }else{
                        window.sessionStorage.setItem('Key',res.data.userName);
                        window.sessionStorage.setItem('token',res.data.token);
                        location.href="index.html"; 
                    }
                }else{
                    layer.msg('用户名或密码错误',{icon:2});
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
init()
createCode();