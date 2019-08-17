var express = require('express');
var ql=require("./mydb");
var queryAll = function(req,resp){
    var sqlstr="select * from goods_info gi,clothing c,classify cs where cs.s_id=c.s_id and c.cl_id=gi.cl_id ";
    var sex=req.body.sex;
    var clothing =req.body.clothing;
    var pageCount = (req.body.pageCount-1)*6;
    var arr = [];
    
    if(clothing!='undefined'){
        if(sex=='枝数'){
            sqlstr = "select * from goods_info where number = ? ";
            arr.push(parseInt(clothing));
        }else{
            sqlstr+='and c.cl_name = ? ' ;
            arr.push(clothing);
        }
    }
    sqlstr+='limit ?,6';
    arr.push(pageCount);
    
    ql.dbConn.sqlConnect(sqlstr,arr,function(err,data){
        if(data.length>0){
            resp.send(data);
        }
    });
}

var queryPage = function(req,resp){
    var sqlstr="select count(*) as allCount from goods_info gi,clothing c,classify cs where cs.s_id=c.s_id and c.cl_id=gi.cl_id ";
    var sex=req.body.sex;
    var clothing =req.body.clothing;
    var arr = [];
    if(sex!='undefined'){
       
    }
    if(clothing!='undefined'){
        if(sex=='枝数'){
            sqlstr = "select count(*) as allCount from goods_info where number = ? ";
            arr.push(parseInt(clothing));
        }else{
            sqlstr+='and c.cl_name = ? ' ;
            arr.push(clothing);
        }
    }
  
    ql.dbConn.sqlConnect(sqlstr,arr,function(err,data){
        resp.send(data);
    });
}

var queryHotProduct = function(res,resp){
    var  sql = "select ci_id,ci_name,ci_price,img_src1 from goods_info where ci_id%5=0";
    ql.dbConn.sqlConnect(sql,[],function(err,data){
        if(data.length>0){
            resp.send(data);
        }
    })
}
module.exports={
    queryAll,
    queryPage,
    queryHotProduct
}
