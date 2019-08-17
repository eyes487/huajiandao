var pageName=1;
window.onload=function(){
  //生成报表
  findStock();
  //用户管理
  userManagement();
  // 库存管理
  stockPro();
  // 联系我们
      touch();
  //订单管理
  search();
  // 立即预约
      subscribe();
    function $(id){return document.getElementById(id)}
    var menu=$("topTags").getElementsByTagName("ul")[0];//顶部菜单容器
    var tags=menu.getElementsByTagName("li");//顶部菜单
    var ck=$("leftMenu").getElementsByTagName("ul")[0].getElementsByTagName("li");//左侧菜单
    var j;
    //点击左侧菜单增加新标签
    for(i=0;i<ck.length;i++){ 
    ck[i].onclick=function(){
    $("welcome").style.display="none"//欢迎内容隐藏
    //循环取得当前索引
    for(j=0;j<8;j++){
    if(this==ck[j]){
    if($("p"+j)==null){
    openNew(j,this.innerHTML);//设置标签显示文字
     }
    clearStyle();
    $("p"+j).style.backgroundColor="#9e9e6f";
    clearContent();
    $("c"+j).style.display="block";
       }
     }
    return false;
      }
     }
    //增加或删除标签
    function openNew(id,name){
    var tagMenu=document.createElement("li");
    tagMenu.id="p"+id;
    tagMenu.innerHTML=name+"   "+"<img src='' style='vertical-align:middle'/>";
    //标签点击事件
    tagMenu.onclick=function(evt){
    clearStyle();
    tagMenu.style.backgroundColor="#9e9e6f";
    clearContent();
    $("c"+id).style.display="block";
    }
    //标签内关闭图片点击事件
    tagMenu.getElementsByTagName("img")[0].onclick=function(evt){
    evt=(evt)?evt:((window.event)?window.event:null);
    if(evt.stopPropagation){evt.stopPropagation()} //取消opera和Safari冒泡行为;
    this.parentNode.parentNode.removeChild(tagMenu);//删除当前标签
    var color=tagMenu.style.backgroundColor;
    //设置如果关闭一个标签时，让最后一个标签得到焦点
    if(color=="rgb(130,123,100)"||color=="#9e9e6f"){//区别浏览器对颜色解释
    if(tags.length-1>=0){
    clearStyle();
    tags[tags.length-1].style.backgroundColor="#9e9e6f";
    clearContent();
    var cc=tags[tags.length-1].id.split("p");
    $("c"+cc[1]).style.display="block";
     }
    else{
    clearContent();
    $("welcome").style.display="block"
       }
      }
    }
    menu.appendChild(tagMenu);
    }
    //清除标签样式
    function clearStyle(){
    for(i=0;i<tags.length;i++){
    menu.getElementsByTagName("li")[i].style.backgroundColor="rgb(130,123,100)";
      }
    }
    //清除内容
    function clearContent(){
    for(i=0;i<7;i++){
    $("c"+i).style.display="none";
     }
    }
      //生成报表
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementsByClassName('contentArea')[0]);
    
    function findStock(){
      ajax({
        type:"post",
        url:"findStock.do",
        data:'',
        dataType:'josn',
        success:function(data){
        var  option = {
            title : {
                text: '库存量',
                subtext: '花间道',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient : 'vertical',
            //     x : 'left',
            //     data:[data[0].mname,data[1].mname,data[2].mname,data[3].mname,data[4].mname,data[5].mname,data[6].mname,data[7].mname,data[8].mname]
            // },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 500
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'库存量',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:data[0].num, name:data[0].mname},
                        {value:data[1].num, name:data[1].mname},
                        {value:data[2].num, name:data[2].mname},
                        {value:data[3].num, name:data[3].mname},
                        {value:data[4].num, name:data[4].mname},
                        {value:data[5].num, name:data[5].mname},
                    ]
                }
            ]
        };
        myChart.setOption(option);
        }
        
      })
      
     
      
    }  
}

//退出登录
function quit(){
  location.href = 'login.html';
}  
// 查询订单页数
function queryIndentPages(userName,category){
  let indentPages = document.getElementById("indentPages");
  let current = 1;
  ajax({
    type:"post",
    url:"queryIndentPages.do",
    data:'userName='+userName+'&category='+category,
    dataType:'josn',
    success:function(responseText){
      var data = responseText.length;
      allPageCount = Math.ceil(data/10);

      pageName==1?indentPages.innerHTML = `
        <li class="disabled">
        <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>`:indentPages.innerHTML = `
        <li ><a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        `;

      for(var i=1;i<=allPageCount;i++){
          //当前页添加样式
          pageName==i?indentPages.innerHTML+= `
          <li class="active"><a href="javascript:void(0)" onclick="changePage(${i})">${i}</a></li>
          `:indentPages.innerHTML+= `
          <li><a href="javascript:void(0)" onclick="changePage(${i})">${i}</a></li>
          `;
      };
      pageName==allPageCount?indentPages.innerHTML += `
      <li class="disabled">
      <a href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
      </a>
      </li>
      `:indentPages.innerHTML += `
      <li>
      <a href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
      </a>
      </li>
      `
    }
  })
}
// 订单管理
function search(){
  let userName = document.getElementById("indent").value;
  let category = document.getElementById("select_k1").value;
  let details = document.getElementById("book");
  queryIndentPages(userName,category);
  ajax({
    type:"post",
    url:"indent.do",
    data:'userName='+userName+'&category='+category+'&pageName='+pageName,
    dataType:'josn',
    success:function(data){
      var operation = '';
        details.innerHTML="" 
        for (var i = 0; i<data.length; i++){
          if (data[i].oi_state==1){
            data[i].oi_state="已处理"
            operation = '---';
          }else if(data[i].oi_state==2){
            data[i].oi_state="未处理"
            operation = `
            <button type="button" class="btn btn-primary" onclick="comeplete(${data[i].oi_id})" id="deleteBtn">完成</button>
            `;
          }
          details.innerHTML+=`<tr>
          <td>${data[i].u_name}</td>
          <td>${data[i].g_name}</td>
          <td>${data[i].ci_id}</td>
          <td>${data[i].oi_phone}</td>
          <td>${data[i].adress}</td>
          <td>${data[i].oi_remark}</td>
          <td>${data[i].oi_state}</td>
          <td>${operation}</td>
        </tr>`
        }
    }
  });
};
//换页
function changePage(obj){
  pageName = obj;
  search();
}

//用户管理
function userManagement(page) {
  var userControlInfo = document.getElementsByClassName('userControlInfo')[0];
  var userControlRank = document.getElementsByName('userControlRank')[0].value;
  var userFuzzy = document.getElementsByName('userFuzzy')[0].value;
  let Pages = document.getElementById("userPages");
  let pageName = page==undefined?1:page;
  ajax({
      type: "post",
      url: "userManagement.do",
      data: "userControlRank="+userControlRank+"&userFuzzy="+userFuzzy,
      // dataType: 'josn',
      success: function (response) {
          let res=JSON.parse(response)
          let data = res.data;
          userControlInfo.innerHTML = "";
          for (var i=0;i<data.length;i++){
              userControlInfo.innerHTML += ` 
                  <tr>
                    <td>${data[i].u_id}</td>
                    <td>${data[i].u_name}</td>
                    <td>${data[i].u_nickName}</td>
                    <td>${data[i].u_sex}</td>
                    <td>${data[i].u_phone}</td>
                    <td>${data[i].u_email}</td>
                    <td>${data[i].u_site}</td>
                  </tr>`;
          }
           //分页
           pageName==1?Pages.innerHTML = `
           <li class="disabled">
             <a href="javascript:void(0)" aria-label="Previous">
               <span aria-hidden="true">&laquo;</span>
             </a>
           </li>`:Pages.innerHTML = `
           <li>
             <a href="javascript:void(0)" aria-label="Previous">
               <span aria-hidden="true">&laquo;</span>
             </a>
           </li>
           `;
           for(var i=1;i<=res.allAmount;i++){
             pageName==i?Pages.innerHTML+= `
             <li class="active"><a href="javascript:void(0)" onclick="userManagement(${i})">${i}</a></li>
             `:Pages.innerHTML+= `
             <li><a href="javascript:void(0)" onclick="userManagement(${i})">${i}</a></li>
             `;
           };
           pageName==res.allAmount?Pages.innerHTML += `
           <li class="disabled">
           <a href="javascript:void(0)" aria-label="Next">
               <span aria-hidden="true">&raquo;</span>
           </a>
           </li>`:Pages.innerHTML += `
           <li>
           <a href="javascript:void(0)" aria-label="Next">
               <span aria-hidden="true">&raquo;</span>
           </a>
           </li>
           `;
      }
  })
}

// 库存管理
function stockPro(page){
  var stockControl = document.getElementById('stockControl');
  var fuzzySearch = document.getElementsByName('fuzzySearch')[0].value.trim(); 
  var stockRank = document.getElementsByName('stockRank')[0].value;
  let Pages = document.getElementById("stockPages");
  let pageName = page==undefined?1:page;
  ajax({
      type:'post',
      url:'stockPro.do',
      data:"fuzzySearch="+fuzzySearch+"&stockRank="+stockRank+"&pageName="+pageName,
      success:function(response){
        let res = JSON.parse(response);
          stockControl.innerHTML="";
              let data=res.data;
              for(var i=0;i<data.length;i++){
                  stockControl.innerHTML+=`
                      <tr class="stockRow">
                          <td>${data[i].ci_id}</td>
                          <td>${data[i].ci_name}</td>
                          <td>${data[i].int_time}</td>
                          <td>${data[i].st_number}</td>
                          <td>${data[i].ci_price}</td>
                          <td>
                              <button type="button" class="btn btn-primary theme-login_1" onclick="openUpdateModal(${data[i].ci_id})">修改</button>
                              <button type="button" class="btn btn-danger" onclick="stockDelete(${data[i].ci_id})" id="deleteBtn">删除</button>
                          </td>
                      </tr>
                  `;
            }
            //分页
            pageName==1?Pages.innerHTML = `
            <li class="disabled">
              <a href="javascript:void(0)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>`:Pages.innerHTML = `
            <li>
              <a href="javascript:void(0)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            `;
            for(var i=1;i<=res.allAmount;i++){
              pageName==i?Pages.innerHTML+= `
              <li class="active"><a href="javascript:void(0)" onclick="stockPro(${i})">${i}</a></li>
              `:Pages.innerHTML+= `
              <li><a href="javascript:void(0)" onclick="stockPro(${i})">${i}</a></li>
              `;
            };
            pageName==res.allAmount?Pages.innerHTML += `
            <li class="disabled">
            <a href="javascript:void(0)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>`:Pages.innerHTML += `
            <li>
            <a href="javascript:void(0)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
            `;
      }
  })
}
//添加库存
// function addStock(){
//   var reader = new FileReader();
//   var goodsImg = document.getElementById('goodsImg').value;
//   console.log(reader)
// }

// 删除库存数据
function stockDelete(obj){
  layer.confirm('确认删除该库存吗？',function(){
    ajax({
      type:'post',
      url:'stockDelete.do',
      data:'id='+obj,
      success:function(response){
        if(response==1){
          layer.msg('删除成功！',{icon:1});
          stockPro()
        } 
      }
  })
  }) 
}
// 联系我们
function touch(page){
  let userName = document.getElementsByName("relation")[0].value;
  let details = document.getElementById("we");
  let Pages = document.getElementById("linkPages");
  let pageName = page==undefined?1:page;
  ajax({
      type:"post",
      url:"relation.do",
      data:'userName='+userName+'&pageName='+pageName,
      dataType:'josn',
      success:function(res){
          details.innerHTML="";
          let data = res.data;
          for (var i = 0; i<res.data.length; i++){
            details.innerHTML+=` <tr>
            <td>${data[i].c_name}</td>
            <td>${data[i].c_tel}</td>
            <td>${data[i].c_message}</td>
            <td><button class="btn btn-danger" onclick="touchDelete(${data[i].c_id})" id="deleteBtn">删除</button></td>
          </tr>`;
        }
        //分页
        pageName==1?Pages.innerHTML = `
        <li class="disabled">
          <a href="javascript:void(0)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>`:Pages.innerHTML = `
        <li>
          <a href="javascript:void(0)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        `;
        for(var i=1;i<=res.allAmount;i++){
         
          // Pages.innerHTML +=`
          //       <li><a href="javascript:void(0)" onclick="touch(${i})">${i}</a></li>
          //     `;
          pageName==i?Pages.innerHTML+= `
          <li class="active"><a href="javascript:void(0)" onclick="touch(${i})">${i}</a></li>
          `:Pages.innerHTML+= `
          <li><a href="javascript:void(0)" onclick="touch(${i})">${i}</a></li>
          `;
        };
        pageName==res.allAmount?Pages.innerHTML += `
        <li class="disabled">
        <a href="javascript:void(0)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
        </li>`:Pages.innerHTML += `
        <li>
        <a href="javascript:void(0)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
        </li>
        `;
      }
  })
}
//删除联系我们
function touchDelete(obj){
  layer.confirm('确认删除联系我们?',function(){
    ajax({
      type:'post',
      url:'touchDelete.do',
      data:'id='+obj,
      success:function(response){
        if(response==1){
          layer.msg('删除成功！',{icon:1});
          touch();
        }  
      }
    });
  })
}
// 立即预约
function subscribe(page){
  let userName = document.getElementsByName("order")[0].value;
  let details = document.getElementById("parcel");
  let subscribePages = document.getElementById("subscribePages");
  let pageName = page==undefined?1:page;
  ajax({
    type:"post",
    url:"order.do",
    data:'userName='+userName+'&pageName='+pageName,
    dataType:'josn',
    success:function(res){
        details.innerHTML="";
        let data = res.data;
        for (var i = 0; i<res.data.length; i++){
          details.innerHTML+=`<tr>
          <td>${data[i].c_name}</td>
          <td>${data[i].c_tel}</td>
          <td>${data[i].c_number}</td>
          <td>${data[i].c_time}</td>
          <td>${data[i].c_remark}</td>
          <td><button class="btn btn-danger" onclick="subscribeDelete(${data[i].c_id})" id="deleteBtn">删除</button></td>
        </tr>`;
      };
      //分页
      pageName==1?subscribePages.innerHTML = `
      <li class="disabled">
        <a href="javascript:void(0)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>`:subscribePages.innerHTML = `
      <li>
        <a href="javascript:void(0)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      `;
      for(var i=1;i<=res.allAmount;i++){
        pageName==i?subscribePages.innerHTML+= `
        <li class="active"><a href="javascript:void(0)" onclick="subscribe(${i})">${i}</a></li>
        `:subscribePages.innerHTML+= `
        <li><a href="javascript:void(0)" onclick="subscribe(${i})">${i}</a></li>
        `;
      };
      pageName==res.allAmount?subscribePages.innerHTML += `
      <li class="disabled">
      <a href="javascript:void(0)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
      </a>
      </li>`:subscribePages.innerHTML += `
      <li>
      <a href="javascript:void(0)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
      </a>
      </li>
      `;
    }
})
}
//删除预约
function subscribeDelete(obj){
  layer.confirm('确认删除预约吗？',function(){
    ajax({
      type:'post',
      url:'subscribeDelete.do',
      data:'id='+obj,
      success:function(response){
        if(response==1){
          layer.msg('删除成功',{icon:1});
          subscribe();
        } 
      }
    });
  }) 
}
// 页码

// 上一页
function prePage(obj){
    if (pageName>1){
        pageName--;
        if(obj==1){
          search();
        }
        if(obj==2){
          userManagement();
        }
        if(obj==3){
          stockPro();
        }
        if(obj==4){
          touch();
        }
        if(obj==5){
          subscribe();
        }
    }else{
        layer.msg('第一页了',{icon:1})
        pageName++;
    }
}
//下一页
function nextPage(obj){
    if (pageName<3){
        pageName++;
        if(obj==1){
          search();
        }
        if(obj==2){
          userManagement();
        }
        if(obj==3){
          stockPro();
        }
        if(obj==4){
          touch();
        }
        if(obj==5){
          subscribe();
        }
    }else{
        layer.msg('没有更多了',{icon:1})
        pageName--;
    }
}

$('#insertTime').buildDate({
  type: 'day',
  format: '-',
  position:'bottom',
  showToday: true,
  select: function(opt){
    // console.log('11111')
  }
})
//打开添加库存、修改库存模态框
function openUpdateModal(id){
  var text = document.getElementById('updateModal');
    ajax({
      type:'post',
      url:'queryOne.do',
      data:'id='+id,
      success:function(response){
        $("#updateModal").modal("show");
        var res = JSON.parse(response);
        var obj = res[0];
        // console.log(obj);
        text.innerHTML = `
       <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        修改库存
                    </h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="goodsName" class="col-md-3 col-md-offset-1">商品名称：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" id="goodsName" value=${obj.ci_name}>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 col-md-offset-1">入库时间：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" id="insertTime" name="insertTime" value="${obj.int_time}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="stockAmount" class="col-md-3 col-md-offset-1">库存数量：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" min="0" id="stockAmount" value="${obj.st_number}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="goodsPrice" class="col-md-3 col-md-offset-1">商品单价：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" min="0" id="goodsPrice" value="${obj.ci_price}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="goodsName" class="col-md-3 col-md-offset-1">商品图片：</label>
                            <div class="col-md-4">
                                <input type="file" id="goodsImg" placeholder="请选择图片地址">
                            </div>
                            <!-- <div class="col-md-2">
                                <button type="button" class="btn btn-default">选择</button>
                            </div> -->
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>
                    <button type="button" class="btn btn-primary" onclick="updateStock()">确定</button>
                </div>
            </div>
        </div>
       `;
      //  var number = document.getElementById('stockAmount').value;
      //  console.log(number);
      } 
  })
  
}
//更新库存
function updateStock(){
  var number = document.getElementById('stockAmount').value;
  // let number = a.num;
  // console.log(number)
  ajax({
    type:'post',
    url:'updateStock.do',
    data:'number'+number,
    dataType:'JSON',
    success:function(response){
      if(response==1){
        stockPro();
        layer.msg('修改成功',{icon:1});
        $("#updateModal").modal("hide");
      } 
    }
  });
}

//完成订单
function comeplete(id){
  // console.log(id)
  ajax({
    type:'post',
    url:'completeOrder.do',
    data:'id='+id,
    success:function(response){
      if(response==1){
        search();
        layer.msg('修改成功',{icon:1});
      } 
    }
  });
}
