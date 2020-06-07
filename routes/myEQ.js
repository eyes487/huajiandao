const express = require('express');
const ql = require("./mydb");



const querySpecialProduct = function(res,resp){
    var sql = "select ci_id,img_src1,ci_price,old_price,ci_name from goods_info where cl_id=11";
    ql.dbConn.sqlConnect(sql,[],function(err,data){
        if(err){
            resp.send({
                status: 400,
                message: err
            })
        }else{
            resp.send({
                status: 200,
                data: data,
                message: '查询成功'
            });
        }
    })
}



module.exports = {
    querySpecialProduct
};