const i655V = "i655_v0.53 ";
const root = bl$("id_4_userPlxApp");
if(!root.ui){
    root.ui = true;
    root.v = blo0.blMDiv(root,root.id+"v",i655V + ":: v ",111,111,111,111,"grey");
    var c = new Ci655(root.v);  
}
function Ci655(_r){  
    this.blrRecord = function(b,d){ _record(b,d);  };
    this.blrF2 = function(b,d){ _F2(b,d);  };

    var tb  = blo0.blDiv(_r,_r.id+"tb","tb",blGrey[0]);
    var v    = blo0.blDiv(_r,_r.id+"v","v",blGrey[1]); 
    blo0.blShowObj2Div(v,this);

    const _record = function(b,d){
        d.innerHTML = Date();
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }   
    const _F2 = function(b,d){
        d.innerHTML = Date();
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }     
    const _init = function(){
        bl$("blrRecord").click();
        bl$("blrRecord").click();

        bl$("blrF2").click();
        bl$("blrF2").click();
    }
    _init();
}