
var tagBAT = "bat"; 
var tagVersion = "_v0.24";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");

var w = {};
w._2do = function(txt){
    //v.innerHTML = txt;
}
blo0.blAjx(w,"http://localhost:8080/download?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjeremyjia%2FGames%2Fmaster%2FSpring%2Fscript%2Fjpg2video.bat&filename=jpg2video.bat");


o.getServerFiles(tb,v,tagBAT,fcbBAT); 

function fcbBAT(p1,p2){
    p1.inf.toDo = function(v1){
        var vta = blo0.blDiv(v1,v1.id+"vta", tagHTML + tagVersion ,"grey"); 
        vta.innerHTML = "";
            var tb = blo0.blDiv(vta,vta.id + "tb","tb",blGrey[0]);
            var v = blo0.blDiv(vta,vta.id + "v","v",blGrey[0]);
            tb.showMe = blo0.blBtn(tb,tb.id+"showMe","showMe",blGrey[1]);
            tb.showMe.style.float="left";
            tb.showMe.onclick = function(){
                var w = {};
                w._2do = function(txt){       
                    v.innerHTML = "";             
                    var ta = blo0.blTextarea(v,v.id+"ta","ta","lightgreen");
                    ta.style.width = 100 + "%";
                    ta.style.height = 100 + "px";
                    ta.value = txt;
                }
                blo0.blAjx(w,"http://localhost:8080/"+p2);
            }
    }
}