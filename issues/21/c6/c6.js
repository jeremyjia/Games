var s = "app_in_i21c6_bv0.14";
var d = blo0.blMD("id_"+s, s,    300,100,500,400, "gray"); 
d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
var nRowH = 88;
var x= {}; 
x.blrJPEditor= function(b,d){   
    if(!d.tb){
        d.tb = blo0.blDiv(d,d.id+"tb","tb","gray");
        const v = blo0.blDiv(d,d.id+"v","v","green");
        
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
                var s = blo0.blStr2JpSVG2(ta.value,0,Math.floor(i/16)*nRowH,1000,1415,i);
                v.innerHTML = s;       
                if(i>=96) i=0;           
              });
           }
           else{
                t.t.stop();
                t.t = null;
                v.innerHTML = 0;
           } 
        }
        
        const dhV = blo0.blBtn(d.tb,d.tb.id+"dhV",nRowH,"lightblue");
        dhV.style.float = "right";
        const dhPlus1 = blo0.blBtn(d.tb,d.tb.id+"dhPlus1","+1","gray");
        dhPlus1.style.float = "right";
        dhPlus1.onclick = function(){
          nRowH++;
          dhV.innerText = nRowH;
        }
        const dhMinus1 = blo0.blBtn(d.tb,d.tb.id+"dhMinus1","-1","gray");
        dhMinus1.style.float = "right";
        dhMinus1.onclick = function(){
          nRowH--;
          dhV.innerText = nRowH;
        }

   }
   
      _on_off_div(b,d);
      b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
}

blo0.blShowObj2Div(d.v,x);  
_on_off_div(null,d); 
