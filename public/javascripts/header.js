var enroll = document.getElementById('enroll');//第二个头部的登录区域
var user = sessionStorage.getItem('Key');//获取是哪个用户登录了
// console.log(user);
if(user!='undifined'&&user!=null){
    enroll.innerHTML =  `
    <a href="personal.html?user=${user}" id="user">${user}</a>
    <a onclick="myQuit()" style="cursor:pointer">退出</a>
    <a href="shoppingCart.html?userName=${user}"><span class="fa fa-cart-plus"></span></a>
    `;
}else{
    enroll.innerHTML = `
    <a href="login.html" id="user">登录</a>
    <a href="regist.html">注册</a>
    `;
}
function myQuit(){
    window.sessionStorage.setItem('Key','undifined');
    window.location.href="login.html";
    // console.log(window.sessionStorage)
}
function sous(){
    // console.log(1)
    window.location.href="productList.html";
}
