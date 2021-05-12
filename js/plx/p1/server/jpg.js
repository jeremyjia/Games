var tagJPG = "jpg";
var tagVersion = "_v0.33";
 
var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");

o.getServerFiles(tb,v,"jpg"); 

o.getServerFiles(tb,v,tagJPG,fcbBAT); 

function fcbBAT(p1,p2){
    p1.inf.toDo = function(v1){
        var vta = blo0.blDiv(v1,v1.id+"vta", tagJPG + tagVersion ,"grey"); 
        var s = '<img src="';
        s += "http://localhost:8080/" + p2;
        s += '" alt="Girl in a jacket" width="500" height="600">';

        vta.innerHTML = s;
    }
}