/**
 * Created by Administrator on 2017/8/30.
 */

var user = sessionStorage.getItem('Key');//获取是哪个用户登录了
console.log(user);

cities = new Object(); 

cities['台湾']=new Array('台北','台南','其他'); 

cities['马来西亚']=new Array('Malaysia'); 

cities['北京']=new Array('北京'); 

cities['上海']=new Array('上海'); 

cities['天津']=new Array('天津'); 

cities['重庆']=new Array('重庆'); 

cities['河北省']=new Array('石家庄', '张家口', '承德', '秦皇岛', '唐山', '廊坊', '保定', '沧州', '衡水', '邢台', '邯郸'); 

cities['山西省']=new Array('太原', '大同', '朔州', '阳泉', '长治', '晋城', '忻州', '吕梁', '晋中', '临汾', '运城'); 

cities['辽宁省']=new Array('沈阳', '朝阳', '阜新', '铁岭', '抚顺', '本溪', '辽阳', '鞍山', '丹东', '大连', '营口', '盘锦', '锦州', '葫芦岛'); 

cities['吉林省']=new Array('长春', '白城', '松原', '吉林', '四平', '辽源', '通化', '白山', '延边'); 

cities['黑龙江省']=new Array('哈尔滨', '齐齐哈尔', '黑河', '大庆', '伊春', '鹤岗', '佳木斯', '双鸭山', '七台河', '鸡西', '牡丹江', '绥化', '大兴安'); 

cities['江苏省']=new Array('南京', '徐州', '连云港', '宿迁', '淮阴', '盐城', '扬州', '泰州', '南通', '镇江', '常州', '无锡', '苏州'); 

cities['浙江省']=new Array('杭州', '湖州', '嘉兴', '舟山', '宁波', '绍兴', '金华', '台州', '温州', '丽水'); 

cities['安徽省']=new Array('合肥', '宿州', '淮北', '阜阳', '蚌埠', '淮南', '滁州', '马鞍山', '芜湖', '铜陵', '安庆', '黄山', '六安', '巢湖', '池州', '宣城'); 

cities['福建省']=new Array('福州', '南平', '三明', '莆田', '泉州', '厦门', '漳州', '龙岩', '宁德'); 

cities['江西省']=new Array('南昌', '九江', '景德镇', '鹰潭', '新余', '萍乡', '赣州', '上饶', '抚州', '宜春', '吉安'); 

cities['山东省']=new Array('济南', '聊城', '德州', '东营', '淄博', '潍坊', '烟台', '威海', '青岛', '日照', '临沂', '枣庄', '济宁', '泰安', '莱芜', '滨州', '菏泽'); 

cities['河南省']=new Array('郑州', '三门峡', '洛阳', '焦作', '新乡', '鹤壁', '安阳', '濮阳', '开封', '商丘', '许昌', '漯河', '平顶山', '南阳', '信阳', '周口', '驻马店'); 

cities['湖北省']=new Array('武汉', '十堰', '襄攀', '荆门', '孝感', '黄冈', '鄂州', '黄石', '咸宁', '荆州', '宜昌', '恩施', '襄樊'); 

cities['湖南省']=new Array('长沙', '张家界', '常德', '益阳', '岳阳', '株洲', '湘潭', '衡阳', '郴州', '永州', '邵阳', '怀化', '娄底', '湘西'); 

cities['广东省']=new Array('广州', '清远', '韶关', '河源', '梅州', '潮州', '汕头', '揭阳', '汕尾', '惠州', '东莞', '深圳', '珠海', '江门', '佛山', '肇庆', '云浮', '阳江', '茂名', '湛江'); 

cities['海南省']=new Array('海口', '三亚'); 

cities['四川省']=new Array('成都', '广元', '绵阳', '德阳', '南充', '广安', '遂宁', '内江', '乐山', '自贡', '泸州', '宜宾', '攀枝花', '巴中', '达川', '资阳', '眉山', '雅安', '阿坝', '甘孜', '凉山'); 

cities['贵州省']=new Array('贵阳', '六盘水', '遵义', '毕节', '铜仁', '安顺', '黔东南', '黔南', '黔西南'); 

cities['云南省']=new Array('昆明', '曲靖', '玉溪', '丽江', '昭通', '思茅', '临沧', '保山', '德宏', '怒江', '迪庆', '大理', '楚雄', '红河', '文山', '西双版纳'); 

cities['陕西省']=new Array('西安', '延安', '铜川', '渭南', '咸阳', '宝鸡', '汉中', '榆林', '商洛', '安康'); 

cities['甘肃省']=new Array('兰州', '嘉峪关', '金昌', '白银', '天水', '酒泉', '张掖', '武威', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南'); 

cities['青海省']=new Array('西宁', '海东', '西宁', '海北', '海南', '黄南', '果洛', '玉树', '海西'); 

cities['内蒙古']=new Array('呼和浩特', '包头', '乌海', '赤峰', '呼伦贝尔盟', '兴安盟', '哲里木盟', '锡林郭勒盟', '乌兰察布盟', '鄂尔多斯', '巴彦淖尔盟', '阿拉善盟'); 

cities['广西']=new Array('南宁', '桂林', '柳州', '梧州', '贵港', '玉林', '钦州', '北海', '防城港', '南宁', '百色', '河池', '柳州', '贺州'); 

cities['西藏']=new Array('拉萨', '那曲', '昌都', '林芝', '山南', '日喀则', '阿里'); 

cities['宁夏']=new Array('银川', '石嘴山', '吴忠', '固原'); 

cities['新疆']=new Array('乌鲁木齐', '克拉玛依', '喀什', '阿克苏', '和田', '吐鲁番', '哈密', '博尔塔拉', '昌吉', '巴音郭楞', '伊犁', '塔城', '阿勒泰'); 

cities['香港']=new Array('香港'); 

cities['澳门']=new Array('澳门'); 

function set_city(province, city) 

{ 

var pv, cv; 

var i, ii; 

pv=province.value; 

cv=city.value; 

city.length=1; 

if(pv=='0') return; 

if(typeof(cities[pv])=='undefined') return; 

for(i=0; i<cities[pv].length; i++) 

{ 

ii = i+1; 

city.options[ii] = new Option(); 

city.options[ii].text = cities[pv][i]; 

city.options[ii].value = cities[pv][i]; 

} 

} //省市二级联动

    var a = document.getElementsByClassName("panelwrap")[0];
    function payBtn() {
        if (a.style.display == "none") {
            a.style.display = "block";
        } else {
            a.style.display = "none"
        }
    }
window.onload = function() {
    var personage = document.getElementsByClassName("person-message")[0];
    var Div = document.getElementsByClassName("tab");
    var mt = document.getElementsByClassName("mt-menu-tree")[0].getElementsByTagName("ul")[0];
    var tabLi = mt.getElementsByTagName("li");
    Div[0].style.display = 'block';
    tabLi[0].style.color = 'red';
    for(var i = 0; i<tabLi.length;i++){
        tabLi[i].index = i;
        tabLi[i].onclick= function(){
            for(var i=0;i<tabLi.length;i++){
                Div[i].style.display = 'none';
                tabLi[i].style.color = 'black';
            }
                Div[this.index].style.display = 'block';
                tabLi[this.index].style.color = 'red';
        }
    }
    var num = location.href.toString().split('=')[2];
    if(num==1){
        for(var i = 0; i<Div.length;i++){
            Div[i].style.display = 'none';
            tabLi[i].style.color = 'black';
        } 
        Div[1].style.display = 'block';
        tabLi[1].style.color = 'red';
    }

}

//cavas上传图片
var input1 = document.getElementById("upload"); 

if(typeof FileReader==='undefined'){
　　alert("抱歉，你的浏览器不支持 FileReader"); 
　　input1.setAttribute('disabled','disabled'); 
}else{
　　// console.log(typeof FileReader);
　　input1.addEventListener('change',readFile,false); 
}
function readFile(){
　　var file = this.files[0];//获取上传文件列表中第一个文件
　　console.log('路径',file);
　　if(!/image\/\w+/.test(file.type)){
　　//图片文件的type值为image/png或image/jpg
　　alert("文件必须为图片！");
　　return false; //结束进程
　　} 
　　var reader = new FileReader();//实例一个文件对象
　　reader.readAsDataURL(file);//把上传的文件转换成url
　　//当文件读取成功便可以调取上传的接口
　　reader.onload = function(e){
　　　　var image = new Image();
　　　　// 设置src属性 
　　　　image.src = this.result;
        
　　　　// 绑定load事件，加载完成后执行，避免同步问题
　　　　image.onload = function(){
　　　　　　var canvas = document.getElementById("cvs");
　　　　　　var ctx = canvas.getContext("2d"); 
　　　　　　// canvas清屏 
　　　　　　ctx.clearRect(0, 0, canvas.width, canvas.height);
　　　　　　ctx.drawImage(image, 0, 0, 200, 200);
console.log('2222',image)
　　　　　　};
　　　　}

if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest() //2 dom 浏览器 创建ajax对象
} else if (window.ActiveXObject) {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP"); //2 IE 浏览器的标准
}
// xhr.open("get","personal?file="+"images/"+"personal/"+file.name,true);//3.打开链接
xhr.send(null) //4.发送数据
xhr.onreadystatechange = function () { //
    if (xhr.readyState == 4 && xhr.status == 200) { //readyState:有4种状态，到达4的时候代表响应成功  status:请求的状态码200代表成功
        proBoxUl.innerHTML = "";
        document.getElementsByTagName("input")[1].value="";
        var zhuanhuan = JSON.parse(xhr.responseText); //转换成json数据
        // console.log(zhuanhuan) //返回过来的数据                    
        for (var i = 0; i < zhuanhuan.length; i++) {
            // proBoxUl.innerHTML+=
        }
    }
}
};

function save() {//修改地址信息
    console.log(1)
    var gainName = document.forms[1].elements[0].value;
    var phoneNumber = document.forms[1].elements[1].value;
    var province = document.forms[1].elements[2].value;
    var city = document.forms[1].elements[3].value;
    // var classify = document.forms[0].elements[4].value;
    var aite = document.forms[1].elements[4].value;
    console.log(province,city)
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest() //2 dom 浏览器 创建ajax对象
    } else if (window.ActiveXObject) {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP"); //2 IE 浏览器的标准
    }
    
    xhr.open("get","lanjie?gainName="+gainName+"&phoneNumber="+phoneNumber+"&province="+province+"&city="+city+"&aite="+aite+"&user="+user,true);//3.打开链接
    xhr.send(null) //4.发送数据
}

function submitting() {//修改个人信息
    var yidong = document.getElementById("yidong");
    yidong.style.left="-200px";
    var nickName = document.forms[0].elements[0].value;
    var sex = document.forms[0].elements[1].value;
    var phone = document.forms[0].elements[2].value;
    var email = document.forms[0].elements[3].value;
    console.log(nickName,sex,phone,email)
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest() //2 dom 浏览器 创建ajax对象
    } else if (window.ActiveXObject) {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP"); //2 IE 浏览器的标准
    }
    xhr.open("get","tijiao?nickName="+nickName+"&sex="+sex+"&phone="+phone+"&email="+email+"&user="+user,true);//3.打开链接
    xhr.send(null) //4.发送数据
    
}

function referaa() {
    var yidong = document.getElementById("yidong");
    yidong.style.left=0;
}

