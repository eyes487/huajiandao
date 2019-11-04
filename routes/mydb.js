var mysql = require('mysql');
var dbConn={
    configure:{
        host:"localhost",//主机地址
        port:"3306",//主机端口
        user:"root",//用户名
        password:"123456",//主机密码
        database:"mye_q"//数据库名
    },
    sqlConnect:function(sql,values,cellback){
        var pool=mysql.createPool(this.configure);
        pool.getConnection(function(error,connection){
            if(error){
                console.log(error)
            }
            connection.query(sql,values,cellback);
            connection.release();
        });
    }
}
module.exports={
    dbConn:dbConn
}