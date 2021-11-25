var tagHTML = "html";
var vHTML = "vHTML: v0.11";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");
 
o.getServerFiles(tb,v,tagHTML,cbFun4HTML); 

function cbFun4HTML(p1,p2){ 
    p1.inf.vHTML = vHTML;
    p1.inf.toDo = function(myView,myBtn){       
        var s = '<a target="_blank" href="';
        s += "http://localhost:8080/" + p2;
        s += '">' + p2;
        s += '</a>';
        var htmlToolbar = blo0.blDiv(myView,myView.id+"htmlToolbar", s ,"white");   
        _on_off_div(myBtn,myView);        
    } 
}

