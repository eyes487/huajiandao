var express = require('express');
var mydb = require('./mydb');
var svgCaptcha = require('svg-captcha')
var {success, fail, secret} = require('./util')
const jwt = require('jsonwebtoken');


var captcha = function(req,res){
    const code = svgCaptcha.create({
        size: 4,
        fontSize: 40,
        width: 100,
        height: 34,
        noise: 3,
    })
    
    res.setHeader('type','image/svg+xml')
    res.send({
        text: code.text,
        code: code.data
    })
}
var loginPost = function(req,resp){
    let userName=req.body.userName;
    let pwd=req.body.pwd;
    var sql = "select * from user where u_name=? and u_pwd=?";
    mydb.dbConn.sqlConnect(sql,[userName,pwd],function(err,data){
        if(data.length>0){
            let token = jwt.sign({
                data: userName,
                exp: Math.floor(Date.now()/1000)+60*60*24
            },secret)
            resp.send(success({
                userName: userName,
                token: token
            }));
        }else{
            resp.send(fail());
        }
    })
}

module.exports = {
    loginPost,captcha
}