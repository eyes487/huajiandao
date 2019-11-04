//  var setInterval;
var prev=0,next=0;
var sliderLeft;
var sliderRight
function slider(){
    if(next==2){
        next=0;
    }else{
        next++;
    }
    
    sliderLeft=document.getElementById("slider"+prev);
    sliderRight=document.getElementById("slider"+next);
    sliderLeft.style.cssText="position:absolute;left:-1206px;z-index:15;transition:all 1s linear";
    sliderRight.style.cssText="position:absolute;left:0px;z-index:8;transition:all .6s linear";
    setTimeout(function(){
        sliderLeft.style.left="1206px";
        sliderLeft.style.transition="";
        sliderRight.style.transition="all .7s linear";
    },2000)
    prev=next;
}
var x = setInterval(slider,5000);
    

