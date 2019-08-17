var express = require('express');
var ql = require("./mydb");

// 订单管理
const indent = function(req,res){
    let userName=req.body.userName;
    let category = req.body.category;
    let pageName = req.body.pageName;
    let sql = "select * from orderinfo where 1=1";
    let sqlArr = [];
    if (userName!="" && userName!=undefined){
        userName="%"+userName+"%";
        sql+=" and ci_id like ?";
        sqlArr.push(userName)
    }
    if (category!="" && category!=undefined){
        sql+=" and oi_state=?";
        sqlArr.push(category);
    }
    sql+=" limit ?,10"
    sqlArr.push((pageName-1)*10)
    ql.dbConn.sqlConnect(sql,sqlArr,function(err,data){
        if (data.length>0){
            res.send(data)
        }
    })
}
//查询订单总页数
const queryIndentPages = function(req,resp){
    let sqlstr="select * from orderinfo where 1=1";
    let userName=req.body.userName;
    let category = req.body.category;
    let sqlArr = [];
    if (userName!="" && userName!=undefined){
        userName="%"+userName+"%";
        sqlstr+=" and ci_id like ?";
        sqlArr.push(userName)
    }
    if (category!="" && category!=undefined){
        sqlstr+=" and oi_state=?";
        sqlArr.push(category);
    }

    ql.dbConn.sqlConnect(sqlstr,sqlArr,function(err,data){
        resp.send(data);
    });
}
//完成订单
const completeOrder = function(req,res){
    var id = req.body.id;
    var sql="update orderinfo set oi_state = 1 where oi_id=? ";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if(err==null){
            res.send('1');
        }
    })
}
//用户管理
const userControl=function (req,res) {
    let userControlRank=req.body.userControlRank;//排序查询
    let userFuzzy="%"+req.body.userFuzzy+"%";//模糊查询
    let sqlArr=[];
    let pageArr=[];
    let sql="select * from user where 1=1 ";
    let pageSql = "select * from user where 1=1 ";
    if (req.body.userFuzzy!=""){
        sql+="and u_name like ? ";
        pageSql+="and u_name like ? ";
        sqlArr.push(userFuzzy); 
        pageArr.push(userFuzzy);
    }
    if (userControlRank=="userId"){
        pageSql+="order by u_id ";
        sql+="order by u_id ";
    }
    if (userControlRank=="sex"){
        pageSql+="order by u_sex ";
        sql+="order by u_sex ";
    }
    ql.dbConn.sqlConnect(sql,sqlArr,function(err,data){
        ql.dbConn.sqlConnect(pageSql,pageArr,function(err,page){
            if(page!=undefined){
             let  allAmount = Math.ceil(page.length/8);
                if (data.length>0){
                    res.send({data,allAmount});
                    // console.log(data);
                }
            }
            
        })
    })
}

// 库存管理
// 添加库存
const addProduct=function(req,res){
    let st_id = req.body.st_id;
    let pro_id = req.body.pro_id;
    let pro_name = req.body.pro_name;
    let in_time = req.body.in_time;
    let st_number = req.body.st_number;
    let pro_price = req.body.pro_price;
    let sql = "insert into stock (st_id,pro_id,pro_name,in_time,st_number,pro_price)values (?,?,?,?,?,?)";
    ql.dbConn.sqlConnect(sql,[st_id,pro_id,pro_name,in_time,st_number,pro_price],function(err,data){
        if(data!='undefined'){
            res.redirect("backstage.html");
        }
    })
}
// 查询全部库存数据
const stockPro=function(req,res){
    let fuzzySearch='%'+req.body.fuzzySearch+'%';
    let stockRank=req.body.stockRank;
    let pageName = req.body.pageName;
    let sqlArr=[];
    let pageArr=[];
    let sql="select * from goods_info where 1=1 ";
    let pageSql="select * from goods_info where 1=1 ";
    // 模糊查询
    if(req.body.fuzzySearch!=""){
        sql += "and ci_name like ? ";
        pageSql += "and ci_name like ? "; 
        sqlArr.push(fuzzySearch);
        pageArr.push(fuzzySearch)
    }
    // 排序
    if(stockRank=="ci_id"){
        sql += "order by ci_id ";
    }
    if(stockRank=="int_time"){
        sql += "order by int_time ";
    }
    if(stockRank=="st_number"){
        sql += "order by st_number ";
    }
    if(stockRank=="ci_price"){
        sql += "order by ci_price ";
    }
    sql +="limit ?,8";
    sqlArr.push((pageName-1)*8);
    ql.dbConn.sqlConnect(sql,sqlArr,function(err,data){
        ql.dbConn.sqlConnect(pageSql,pageArr,function(err,page){
            if(page!=undefined){
             let  allAmount = Math.ceil(page.length/8);
                if (data.length>0){
                    res.send({data,allAmount});
                    // console.log(data);
                }
            }
            
        })
    })
}
//根据id查询指定库存数据
const queryOne = function(req,res){
    let id = req.body.id;
    let sql = "select * from goods_info where ci_id =?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if(err==null){
            res.send(data);
        }
    })

}
//更新库存
const updateStock = function(req,res){
    let id = req.body.a;
    // let number = req.body.number;
    console.log(id);
    // let sql = "update goods_info set ci_name = ?,int_time = ?,st_number = ?,ci_price = ? where ci_id =?";
    // ql.dbConn.sqlConnect(sql,[name,time,number,price,id],function(err,data){
    //     if(err==null){
    //         res.send(1);
    //     }
    // })
}

// 删除库存
const stockDelete=function(req,res){
    let id = req.body.id;
    let sql = "delete from goods_info where ci_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        res.send('1')
    })
}
//查询库存生成报表
const findStock = function(req,res){
    let sql = 'SELECT c.cl_name AS mname,SUM(s.st_number) AS num FROM stock s,goods_info g,clothing c WHERE g.cl_id=c.cl_id AND g.ci_id=pro_id GROUP BY c.cl_id';
    ql.dbConn.sqlConnect(sql,[],function(err,data){
        res.send(data);
    })
}
// 联系我们
const relation = function (req,res){
    let userName=req.body.userName;
    let pageName=req.body.pageName;
    let sql="select * from contact where 1=1";
    let pageSql = "select * from contact where 1=1"
    let sqlArr = [];
    let pageArr = [];
    if (userName!="" && userName!=undefined){
        userName="%"+userName+"%";
        sql+=" and c_name like ?";
        pageSql+=" and c_name like ?";
        sqlArr.push(userName)
        pageArr.push(userName)
    }
    sql+=" limit ?,8"
    sqlArr.push((pageName-1)*8)
    // ql.dbConn.sqlConnect(sql,sqlArr,function(err,data){
    //     if (data.length>0){
    //         res.send(data);
    //     }
    // })
    ql.dbConn.sqlConnect(sql,sqlArr,function(err,data){
        ql.dbConn.sqlConnect(pageSql,pageArr,function(err,page){
            if(page!=undefined){
             let  allAmount = Math.ceil(page.length/8);
                if (data.length>0){
                    res.send({data,allAmount});
                    // console.log(data);
                }
            }
            
        })
    })
}
//删除联系我们
const deleteRelation = function(req,res){
    let id = req.body.id;
    let sql = "delete from contact where c_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if(data!=undefined){
            res.send('1');
        }else{
            res.send('0');
        }
    })
}
// 立即预约
const order = function(req,res){
    let userName=req.body.userName;
    let pageName=req.body.pageName;
    let sql = "select * from customization where 1=1"
    let pageSql = "select * from customization where 1=1"
    let sqlArr = [];
    let pageArr = [];
    if (userName!="" && userName!=undefined){
        userName="%"+userName+"%";
        sql+=" and c_name like ?";
        pageSql+="and c_name like ?";
        sqlArr.push(userName)
        pageArr.push(userName)
    }
    sql+=" limit ?,8"
    sqlArr.push((pageName-1)*8)
    ql.dbConn.sqlConnect(sql,sqlArr,function(err,data){
        ql.dbConn.sqlConnect(pageSql,pageArr,function(err,page){
            if(page!=undefined){
             let  allAmount = Math.ceil(page.length/8);
                if (data.length>0){
                    res.send({data,allAmount});
                    // console.log(data);
                }
            }
            
        })
    })
}
//删除预约
const deleteOrder = function(req,res){
    let id = req.body.id;
    let sql = "delete from customization where c_id=?";
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if(data!=undefined){
            res.send('1');
        }else{
            res.send('0');
        }
       
    })
}
module.exports={
    indent,
    addProduct,
    stockDelete,
    stockPro,
    relation:relation,
    order:order,
    userControl,
    findStock,
    deleteRelation,
    deleteOrder,
    queryIndentPages,
    queryOne,
    updateStock,
    completeOrder
};