const express = require('express');
const ql = require("./mydb");

const contactUs=function(req,res){
    console.log(req.body)
    let name = req.body.name;
    let tel = req.body.tel;
    let message = req.body.message;
    sql = "insert into contact (c_name,c_tel,c_message)values (?,?,?)";
    ql.dbConn.sqlConnect(sql,[name,tel,message],function(err,data){
        if(data!='undefined'){
            // res.redirect("contactUs.html")
            res.send('1');
            console.log('联系我们提交成功') 
        }
    })
}
module.exports={
    contactUs
}