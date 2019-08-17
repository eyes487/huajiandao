const express = require('express');
const ql = require("./mydb");

const pay = function(req,resp){
    var id = req.query.id;
    var sql = "select * from goods_info where ci_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        resp.render("pay.html",{data:data});
    })
}
//支付数据穿到数据库
var payAjax = function(req,resp){
    var id=req.query.id;
    var num = req.query.value;
    var user = req.query.user;
    console.log(id,num,user)
    var arr = [];
    var sql = "select ci_name,ci_price,ci_id from goods_info where ci_id=?";
    var sql1 = "select u_name,u_detAdd from user where u_name=?";
    var sql2 = "insert into orderinfo (u_name,address,oi_phone,oi_state,g_name,ci_id,oi_price,oi_number) values (?,?,?,?,?,?,?,?)";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if (data.length>0){
            for(key in data){
                arr.push(data[key]);
            } 
            ql.dbConn.sqlConnect(sql1,[user],function (err,data) {
                if(data.length>0){
                    for(key in data){
                        arr.push(data[key]);
                        // console.log(arr);
                    }
                    ql.dbConn.sqlConnect(sql2,[arr[1].u_name,arr[1].u_detAdd,arr[1].u_name,2,arr[0].ci_name,arr[0].ci_id,arr[0].ci_price,num],function (err,data) {
                        // console.log(data);
                        if(data!=undefined){
                            
                            resp.send("0");
                        }
                        else{
                            resp.send("1");
                        }
                    })
                }
                else{
                    resp.send("1");
                }
            })
            
        }else{
            resp.send("1");
        }
    })
}
module.exports={
    pay,
    payAjax
}