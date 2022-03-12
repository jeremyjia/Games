const i655V = "i655_v0.121 ";
const root = bl$("id_4_userPlxApp");
if(!root.ui){
    root.ui = true;
    root.v = blo0.blMDiv(root,root.id+"v",i655V + ":: v ",111,111,111,111,"grey");
    var c = new Ci655(root.v);  
}
function Ci655(_r){  
    this.blrAddC2I98 = function(b,d){ _addC2I98(b,d);  };
    this.blrGetAllCsInI98 = function(b,d){ _getAllI98Cs(b,d);  };    


    const _init = function(_this){
        var tb  = blo0.blDiv(_r,_r.id+"tb","tb",blGrey[0]);
        var v    = blo0.blDiv(_r,_r.id+"v","v",blGrey[1]); 
        blo0.blShowObj2Div(v,_this);
        blo0.blScript("server.js","https://jeremyjia.github.io/Games/issues/4/server.js"); 
        bl$("blrAddC2I98").click();
        bl$("blrAddC2I98").click();

        bl$("blrGetAllCsInI98").click();
        bl$("blrGetAllCsInI98").click();
    }
    const _addC2I98 = function(b,d){        
        if(!d.load){
            d.load = true;
            d.innerHTML = "-";
            d.tb    = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
            d.v     = blo0.blDiv(d,d.id+"v","v","lightblue");
            var b1  = blo0.blBtn(d.tb,d.tb.id+"b1","b1","grey");
            b1.onclick = function(){
                var ja = Date();
                addNewGitHubComment(98,ja,function(response){                            
                    if (response.readyState == 4) {
                        if (response.status == 200 || response.status == 201) {
                            d.v.innerHTML = Date();
                        } else {
                            d.v.innerHTML = "Errors, status=" + response.status;
                        }
                    }
                }); 
            }
        }
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }     
    
    const _getAllI98Cs = function(b,d){ 
        if(!d.load){
            d.load = true;
            d.innerHTML = "-";
            d.tb    = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
            d.v     = blo0.blDiv(d,d.id+"v","v","lightblue");
            var btnGetAC  = blo0.blBtn(d.tb,d.tb.id+"btnGetAC","GetAC","grey");
            btnGetAC.onclick = function(){
                d.v.innerHTML = "";
                var _src = "https://api.github.com/repos/jeremyjia/Games/issues/98/comments";
                w3.getHttpObject(_src, function _Comments(o) {
                    var _i = 0; 
                    var btnLs = [];
                    var _v = blo0.blDiv(d.v,d.v.id+"tb","tb","gray");
                    var dbg     = blo0.blDiv(d.v,d.v.id+"dbg","dbg","lightblue");
                    var btnDel = blo0.blBtn(_v, _v.id+"btnDel","-",blGrey[2]);
                    for(i in o){
                        _i++; 
                        var btnJS = blo0.blBtn(_v, _v.id+"btnJS"+i,_i,blGrey[2]);
                        btnJS.onclick = function(_oi,_btn,_ls){
                                return function(){                                    
						            blo0.blMarkBtnInList(_btn,_ls,"yellow","grey");                                    
                                    _ls.curBtn = _btn;
                                    _btn.c = _oi;
                                    blo0.blShowObj2Div(dbg,_oi);
                                }
                        }(o[i],btnJS,btnLs);
                        btnLs.push(btnJS);
                    }
                    btnDel.onclick = function(){
                        btnGetAC.innerHTML = btnLs.curBtn.c.id;
                    }
                });
            }
        }
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }   
    _init(this);
}