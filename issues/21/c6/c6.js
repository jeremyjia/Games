var s = "app_in_i21c6_bv0.11";
var d = blo0.blMD("id_"+s, s,    300,100,500,400, "gray"); 
d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
var x= {}; 
x.blrJPEditor= function(b,d){   
    if(!d.tb){
        d.tb = blo0.blDiv(d,d.id+"tb","tb","gray");
        const v = blo0.blDiv(d,d.id+"v","v","green");
        const b1 = blo0.blBtn(d.tb,d.tb.id+"b1","b1","green");
        b1.style.float = "left";
        b1.onclick = function(){
            var s = blo0.blStr2JpSVG2(ta.value,0,0,1000,1415,1);
            v.innerHTML = s;
        }
        const b2 = blo0.blBtn(d.tb,d.tb.id+"b2","b2","green");
        b2.style.float = "left";
        b2.onclick = function(){
            var s = blo0.blStr2JpSVG2(ta.value,0,0,1000,1415,2);
            v.innerHTML = s;
        }
        const e = blo0.blBtn(d.tb,d.tb.id+"e","e","lightblue");
        e.style.float = "left";
        e.onclick = function(){
            var s = blo0.blStr2JpSVG2(ta.value,0,0,1000,1415,2);
            v.innerHTML = s;
        }
        const t = blo0.blBtn(d.tb,d.tb.id+"t","t","brown");
        t.style.float = "left";
        t.onclick = function(){  
           if(!t.t){
              var i = 0;
              t.t =  blo0.blTimer(1000,60*60,function(nLeft){
                i++; 
                var s = blo0.blStr2JpSVG2(ta.value,0,0,1000,1415,i);
                v.innerHTML = s;                  
              });
           }
           else{
                t.t.stop();
                t.t = null;
                v.innerHTML = 0;
           } 
        }

   }
   
      _on_off_div(b,d);
      b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
}

blo0.blShowObj2Div(d.v,x);  
_on_off_div(null,d); 
