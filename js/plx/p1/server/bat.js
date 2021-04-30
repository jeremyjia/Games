
var tagBAT = "bat"; 
var tagVersion = "_v0.11";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");

o.getServerFiles(tb,v,tagBAT,fcbBAT); 

function fcbBAT(p1,p2){
    p1.inf.toDo = function(v1){
        var vta = blo0.blDiv(v1,v1.id+"vta", tagHTML + tagVersion ,"grey"); 
        vta.innerHTML = "abc" + Date();
    }
}