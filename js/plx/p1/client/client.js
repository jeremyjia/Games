

var vc = bl$("id_tb4Client"); 
vc.vtb = blo0.blDiv(vc, vc.id+"vtb","client-vtb","lightgreen");
vc.v0 = blo0.blDiv(vc, vc.id+"v0","client-v0","lightblue");
vc.v1 = blo0.blDiv(vc, vc.id+"v1","client-v1","grey");
vc.btnClientUI = blo0.blBtn(vc.vtb,vc.vtb.id+"btnClientUI","btnClientUI",blGrey[0]);

vc.btnClientUI.onclick = function(_v0,_v1){
    var c = new CClient();
    return function(){
        c.exeCmd(_v0,_v1);
    }
}(vc.v0,vc.v1)




function CClient(){
    var w = {};
    this.exeCmd = function(v0,v1){
        var ta = bl$("id_ta_4_script_editor");
        if(!ta){
            ta = blo0.blTextarea(v0,"id_ta_4_script_editor","dir",blGrey[0]);
            ta.style.width = "98%";
            ta.style.height = "30px";
        } 
        {
            ta.value = "exeCmd" + Date();
            var btnRun = blo0.blBtn(v0, v0.id+ "btnRun", "runShellScript", "green");
            btnRun.onclick = function(){                    
                w._2do = function(txt){ 
                    v1.innerHTML = txt;        
                } 
                blo0.blAjx(w, "http://localhost:8080/command?cmd="+ta.value ); 
            }
        }
    };
    this.getJSFiles = function(v0,v1,v2){
			w._2do = function(txt){ 
				v0.innerHTML = ""; 
				eval("var o=" + txt);
				for(i in o.resource){
					var b = blo0.blBtn(v0,v0.id+i,i,blGrey[2]);
					b.onclick = function(_this,_jsf){						
						return function(){
							 v1.innerHTML = _this.id;
							 var btnMP4 = blo0.blBtn(v1, v1.id+ "b1", "createMP4", blGrey[2]);
							 v2.innerHTML = _jsf;
							 var vMP4 = blo0.blDiv(v2, v2.id + "vMP4", "vMP4", blGrey[2]);  

							 btnMP4.onclick = function(){
								var url = "http://localhost:8080/image/video?script="+_jsf; 
								var w1 = {};
								w1._2do = function(txt){ 
									vMP4.innerHTML = txt;	
								}
								blo0.blAjx(w1,url);							
							}
						}
					}(b,o.resource[i]);					
				}  
			}
			blo0.blAjx(w, "http://localhost:8080/getResourceOnServer?filetype=json" ); 
    };
    
    this.getMp3Files = function(v0){
        w._2do = function(txt){ 
            eval("var o=" + txt);
            v0.innerHTML = "";
            for(i in o.resource){
                var b = blo0.blBtn(v0,v0.id+i,i,blGrey[2]);
                b.onclick = function(_this,_r){						
                    return function(){
                         alert(_r);                          
                    }
                }(b,o.resource[i]);	                		
            }  
        }
        blo0.blAjx(w, "http://localhost:8080/getResourceOnServer?filetype=mp3" ); 
    };
}
