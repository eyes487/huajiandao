const express = require('express');
const ql = require("./mydb");

//添加购物车 插入数据
var shoppingCart = function(req,resp){
    var userName = req.body.userName;
    var productId = req.body.productId;
    var number=req.body.value;
    // console.log(userName,fruitId,quantity)
    var sql = 'insert into shoppingcart (p_id,sc_quantity,u_name)values (?,?,?)'
    ql.dbConn.sqlConnect(sql,[productId,number,userName],function(err,data){
        console.log(productId,number,userName)
        if(data!='undifined'){
            resp.send('1');
        }else{
            resp.send('0');
        }
    });
}

//渲染购物车页面
var showCart = function(req,resp){
    var userName = req.query.userName;
    console.log(userName);
    var sql = 'select sc_id,ci_name,sc_quantity,sc_size,ci_price,img_src1 from shoppingCart,goods_info where u_name = ? and p_id = ci_id ';
    ql.dbConn.sqlConnect(sql,[userName],function(err,data){
        console.log(err)
        resp.render('shoppingCart',{data:data});
    });
}

//删除购物车数据
var deleteCart = function(req,resp){
    var id = req.body.id;
    var sql = 'delete from shoppingCart where sc_id = ?';
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if(data!=undefined){
            resp.send('1');
        }else{
            resp.send('0');
            
        }
    });
}

module.exports = {
    shoppingCart,
    showCart,
    deleteCart
}