const express = require('express');
const ql = require("./mydb");

const productDetail = function(req,resp){
    var id = req.query.id;
    var sql = "select * from goods_info where ci_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        resp.render("productDetail.html",{data:data});
    })
}
// module.exports = {
//     productDetail:productDetail
// }
module.exports = {
    productDetail
};