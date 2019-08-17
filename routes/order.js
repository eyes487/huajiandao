/**
 * Created by Administrator on 2017/10/23 0023.
 */
var express = require('express');
var ql=require("./mydb");
var order = function(req,resp){
    var id = req.query.id;
    var sql = "select * from goods_info where ci_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        resp.render('order.html',{data:data});
    })
}
module.exports={
    order
}
