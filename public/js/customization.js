
function showCustomization(){
    $('#addModal').modal('show');
}
$('#time').buildDate({
    type: 'day',
    format: '-',
    position:'bottom',
    showToday: true,
    select: function(opt){
    }
  })
function subscribe(){
   var name = document.getElementById("name").value;
   var tel = document.getElementById("tel").value;
   var kind = document.getElementById("kind").value;
   var time = document.getElementById("time").value;
   var remark = document.getElementById("remark").value;
   ajax({
    type:'post',
    url:'customization.do',
    data:'name='+name+'&kind='+kind+'&tel='+tel+'&time='+time+'&remark='+remark,
    success:function(response){
        if(response==1){
            $('#addModal').modal('hide');
            layer.msg('提交成功',{icon:1});
        }else{
            layer.msg('',{icon:2});
         }
    }    
}); 
}