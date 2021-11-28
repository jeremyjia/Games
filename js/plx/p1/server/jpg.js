var tagJPG = "jpg";
var vJPG = "vJPG_0.55"; 
 
var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");
 

o.getServerFiles(tb,v,tagJPG,cbFun4JPG); 

function cbFun4JPG(p1,p2){ 
    p1.inf.vJPG = vJPG;
    p1.inf.toDo = function(myView,myBtn){ 
        var now = Date();
        var v1 = blo0.blDiv(myView,myView.id+"v1", now + "_" + this.id ,"grey"); 
        var v2 = blo0.blDiv(myView,myView.id+"v2", tagJPG + vJPG ,"white"); 
        var s = '<img src="';
        s += "http://localhost:8080/" + p2;
        s += '" alt="Girl in a jacket" width="500" height="600">';

        v2.innerHTML = s;

        _on_off_div(myBtn,myView);        
    } 
}