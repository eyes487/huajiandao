const express = require('express');
const ql = require("./mydb");

const customization = function(req,res){
    let name = req.body.name;
    let tel = req.body.tel;
    let kind = req.body.kind; 
    let time = req.body.time;
    let remark = req.body.remark;
    sql = "insert into customization (c_name,c_tel,c_kind,c_time,c_remark)values (?,?,?,?,?)";
    ql.dbConn.sqlConnect(sql,[name,tel,kind,time,remark],function(err,data){
        console.log('错误',err)
        if(err==null){
            res.send('1');
            // res.redirect("customization.html")
            console.log('预约提交成功')
        }
    })
}

module.exports = {
    customization
};