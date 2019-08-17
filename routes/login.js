var express = require('express');
var mydb = require('./mydb');

var loginPost = function(req,resp){
    let userName=req.body.userName;
    let pwd=req.body.pwd;
    // console.log(userName+pwd)
    var sql = "select * from user where u_name=? and u_pwd=?";
    mydb.dbConn.sqlConnect(sql,[userName,pwd],function(err,data){
        // console.log(data);
        if(data.length>0){
            if(data[0].u_name == 'admin'){
                resp.send('3');

            }else{
                resp.send('1');
            }
        }else{
            resp.send('0');
        }
    })
}

module.exports = {
    loginPost
}