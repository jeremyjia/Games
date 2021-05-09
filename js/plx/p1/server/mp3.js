
var tagMP3 = "mp3"; 
var tagVersion = "_v0.25";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");


var w = {};
w._2do = function(txt){    
   // v.innerHTML = txt;
}
blo0.blAjx(w,"http://localhost:8080/download?url=https%3A%2F%2Flittleflute.github.io%2Fenglish%2FNewConceptEnglish%2FBook2%2F1.mp3&filename=1.mp3");


o.getServerFiles(tb,v,tagMP3,fcbMP3); 

function fcbMP3(p1,p2)
{
    p1.inf.toDo = function(v1){
        var vta = blo0.blDiv(v1,v1.id+"vta", tagMP3 + tagVersion ,"grey"); 
        vta.innerHTML = Date();
    }
}