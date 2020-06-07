var express = require('express');
var router = express.Router();
var ql = require("./mydb");
var myEQ = require('./myEQ');
var pro = require('./productList');
var login = require('./login');
var dateils=require('./productDetail');
var shoppingCart = require('./shoppingCart');
var contactUs = require('./contactUs');
var customization = require('./customization');


var backstage = require("./backstage");
var orderRoutes = require("./order.js");
var payRoutes = require("./pay.js");
var productDetailRoutes = require("./productDetail.js");


var nodemailer = require('nodemailer');
var http = require('http');
var https = require('https');
var qs = require('querystring');
var authCodec='';


// 邮箱验证
router.post("/mailbox",function(req,res){
    var emailT = req.body.emailT;
    var transporter = nodemailer.createTransport({  
        service: 'qq',  
        port:'465',
            auth: {  
                user: '659721336@qq.com',  
                pass: 'lulawkbgslvxbejf' //授权码,通过QQ获取  
            }  
    });  
    var mailOptions = {  
        from: '659721336@qq.com', // 发送者  
        to: emailT, // 接受者,可以同时发送多个,以逗号隔开  
        subject: '【花间道】邮件发送', // 标题  
        //text: 'Hello world', // 文本  
        html: `<h3>  
        <a href="">您正在注册【花间道】会员</a></h3>`   
    };  
    transporter.sendMail(mailOptions, function (err, info) {  
        if (err) {    
            return console.log(err);
        }  
        console.log('发送成功');  
    });  
})
// ajax判断
router.post("/enroll",function(req,res){
    let userName = req.body.nameT;
    let sql = "select * from user where u_name=?";
    ql.dbConn.sqlConnect(sql,[userName],function(err,data){
        if (data.length>0) {
            res.send("用户名已存在")
        }else{
            res.send("可以注册")
        }
    });
});
// 注册拦截
router.post("/register",function(req,res){ 
    let userName=req.body.userName;
    let Pwd = req.body.pwd;
    let email = req.body.email;
    let code = req.body.code;
    let sql="INSERT INTO user(u_name,u_pwd,u_email) VALUES(?,?,?)";
    ql.dbConn.sqlConnect(sql,[userName,Pwd,email],function(err,data){
        if (data!=undefined){
            console.log('a')
            res.send('1');
        }else{
            res.send('0');
        }
    });
});

//拦截首页
router.get('/index.html',function(req,resp){
  var sql = "select ci_id,img_src1,ci_price,details,ci_name from goods_info limit 6";

    ql.dbConn.sqlConnect(sql,[],function(err,data){
        resp.render('index.html',{data:data});
    })
})
//拦截首页
router.get('/',function(req,resp){
    var sql = "select ci_id,img_src1,ci_price,details,ci_name from goods_info limit 6";

    ql.dbConn.sqlConnect(sql,[],function(err,data){
        resp.render('index.html',{data});
    })
})
//拦截详情页
router.get("/productDetail.html",productDetailRoutes.productDetail);
//拦截订单页面
router.get('/order.html',orderRoutes.order);
//拦截产品列表页
router.get('/productList.html', function(req, res, next) {
    res.render('productList.html');
});
//拦截支付页面
router.get("/pay.html",function(req,resp){
    var id = req.query.id;
    var sql = "select * from goods_info where ci_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        resp.render("pay.html",{data:data});
    })
})

router.get("/pay.html",payRoutes.pay);
//尺码页面
router.get('/taglia.html',function(res,resp){
    resp.render('taglia');
});
//礼服资讯
router.get('/dressInformation.html',function(res,resp){
    resp.render('dressInformation');
});
//新闻页面
router.get('/news.html',function(res,resp){
    resp.render('news');
});
//定制页面
router.get('/customization.html',function(res,resp){
    resp.render('customization');
});
router.post('/customization.do',customization.customization)
//联系我们页面
router.get('/contactUs.html',function(res,resp){
    resp.render('contactUs');
});
router.post('/contactUs.do',contactUs.contactUs)//提交联系我们页面的留言



router.get('/shoppingCart.html',shoppingCart.showCart);//购物车
router.get('/personal.html',function(req,resp){//个人中心
    var user = req.query.user;
    sql = "select * from user where u_name = ?";
    
    ql.dbConn.sqlConnect(sql, [user], function (err,data) {
        console.log(data);
        resp.render("personal", {sendData:data})
    })    
});
router.get('/lanjie',function(req,resp){//修改地址
    var user = req.query.user;
    var gainName =req.query.gainName;
    var phoneNumber = req.query.phoneNumber;
    var province = req.query.province;
    var city = req.query.city;
    var aite = req.query.aite;
    sql = "update user set u_consignee = ?,u_cellPhone = ?,u_province= ? ,u_city= ? ,u_detAdd= ? where u_name = ?;";

    ql.dbConn.sqlConnect(sql, [gainName,phoneNumber,province,city,aite,user], function (err, data) {
        if (data!=undefined) {
            resp.redirect("productList.html");
        }
    })
    
});

router.get("/tijiao",function(req,resp){//修改用户信息
    var nickName = req.query.nickName;
    var sex =req.query.sex;
    var phone = req.query.phone;
    var email = req.query.email;
    var user = req.query.user;

    sql = "update user set u_nickName = ?,u_sex = ?,u_phone = ?,u_email = ? where u_name = ?;";
    ql.dbConn.sqlConnect(sql, [nickName,sex,phone,email,user], function (err, data) {
        if (data!=undefined) {
            resp.redirect("productList.html");
        }
    })
});

router.get("/personal",function (req,resp) {
    var a =req.query.file;
})



router.get('/captcha',login.captcha);//验证码
router.post('/loginPost.do',login.loginPost);//全部
router.post('/addCart',shoppingCart.shoppingCart);//添加购物车
router.post('/deleteCart',shoppingCart.deleteCart);//删除购物车

//查询特价商品
router.get("/querySpecialProduct",myEQ.querySpecialProduct);
//查询全部
router.post("/productList.do",pro.queryAll);
router.post("/hotProduct.do",pro.queryHotProduct);

//查询总页数
router.post("/queryPage.do",pro.queryPage); 
// router.post("/proMiuse.do",dateils.productDetail); 

// 后台管理
router.post("/findStock.do",backstage.findStock)//库存的报表生成
router.post("/indent.do",backstage.indent);//订单管理
router.post("/queryIndentPages.do",backstage.queryIndentPages);//订单管理查询页数
router.post('/addProduct.do',backstage.addProduct);//库存管理添加数据
router.post('/stockPro.do',backstage.stockPro);//库存管理表格渲染
router.post('/stockDelete.do',backstage.stockDelete);//删除库存数据
router.post("/userManagement.do",backstage.userControl);//用户管理
router.post("/queryOne.do",backstage.queryOne);//查询单条数据
router.post("/updateStock.do",backstage.updateStock);//更新库存
router.post("/completeOrder.do",backstage.completeOrder);//更新库存

// 联系我们
router.post("/relation.do",backstage.relation);
router.post("/touchDelete.do",backstage.deleteRelation);
// 立即预约
router.post("/order.do",backstage.order);
router.post("/subscribeDelete.do",backstage.deleteOrder);
//拦截订单页面
router.get("/check",payRoutes.payAjax);

module.exports = router;

