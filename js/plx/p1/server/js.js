var tagJS = "js";
var vJS = "v0.25";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");

o.getServerFiles(tb,v,tagJS,cbFun4JS); 

function cbFun4JS(p1,p2){ 
    p1.inf.vJS = vJS;
    p1.inf.toDo = function(myView,myBtn){       
        var s = '<a target="_blank" href="';
        s += "http://localhost:8080/" + p2;
        s += '">' + p2;
        s += '</a>';
        var jsToolbar = blo0.blDiv(myView,myView.id+"jsToolbar", s ,"white");  
        var btnLoadJSFile = blo0.blBtn(jsToolbar,jsToolbar.id + "loadJSFile","+","grey");
        var jsView = blo0.blDiv(myView,"id_4_blxJSView", "jsView" ,"white");  
        btnLoadJSFile.onclick = function(){
            jsView.innerHTML = p2;
            if(!this.load){  
                blo0.blScript("id_4_js_load_test","Spring/script/blx_51voa.js"); 
                blo0.load= 1;
              }
        }  
        _on_off_div(myBtn,myView);        
    } 
}

