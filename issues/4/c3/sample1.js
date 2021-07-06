var v = bl$("id_4_div_i4_c3_blrTest1");
var _s1 = new CSample1(); 
var _btn = v.getBtn(0);
_btn.value = _s1.getValue();
_btn.click();


function CSample1 (_id){
    var _v = "CSample1_v0.111 (auto test framework)";
    this.getValue = function(){
        var s = "// ";
        s += _v;
        s += "\n";
        s += "var os1 ={};\n";
        s += _addFun2Obj("os1","blrTest_getServerInfo",blrTest_getServerInfo);
        s += _addFun2Obj("os1","bll0","'-0-'");
        s += _addFun2Obj("os1","bll1","'-1-'");
        s += _addFun2Obj("os1","blrTest_combine",blrTest_combine);
        s += _addFun2Obj("os1","bll2","'-2-'");
        s += _addFun2Obj("os1","blrTest_download",blrTest_download);
        s += _addFun2Obj("os1","bll3","'-3-'");
        s += "var toRun="+_fn4_run;
        s += "\n";
        s += "toRun(os1,'" + _v + "');";
        return s;
    }

    var _addFun2Obj = function(_objName,fnName,fnBody){ 
        var r = _objName + "." +  fnName + "=" + fnBody;
        r += "\n";
        return r;
    }
    var blrTest_getServerInfo = function(b,d){
        if(!d.load){
            d.load = true;
            d.tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
            d.v = blo0.blDiv(d,d.id+"v","v",blGrey[1]);            
            d.v.style.float = "left";

            var btnServerHomePage = blo0.blBtn(d.tb,d.tb.id+"btnServerHomePage","btnServerHomePage",blGrey[1]);
            btnServerHomePage.style.float = "right";
            
            var btnServerInfo = blo0.blBtn(d.tb,d.tb.id+"btnServerInfo","serverInfo",blGrey[1]);
            btnServerInfo.style.float = "right";
            

            btnServerInfo.onclick = function(){
                var w = {};
                w._2do = function(txt){  
                    var s = "var r =" + txt;
                    eval(s);
                    blo0.blShowObj2Div(d.v,r);    
                }
                blo0.blAjx(w,"http://localhost:8080/getServerInfo");                 
            }
            btnServerHomePage.onclick = function(){
                var s = "<a target='_blank' href='http://localhost:8080/'>http://localhost:8080</a>"; 
                d.v.innerHTML = s;                 
            }

            _on_off_div(b,d);
            b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];     
        }
        else{
            _on_off_div(b,d);
            b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];     
        }
    }
    
    var blrTest_combine = function(b,d){
        if(!d.load){
            d.load = true;
            var urlTest = "http://localhost:8080/image/combine?subtitlefile=https://littleflute.github.io/english/NewConceptEnglish/Book2/1.srt&audiofile=https://littleflute.github.io/english/NewConceptEnglish/Book2/1.mp3";
            var w = {};
            w._2do = function(txt){ 
                d.innerHTML = txt; 
            }
            blo0.blAjx(w,urlTest);
            _on_off_div(b,d);
        }
        else{
            _on_off_div(b,d);
        }
    }
    var blrTest_download = function(b,d){
        if(!d.load){
            d.load = true;
            
            var urlTest = "http://localhost:8080/download?url=https://learningenglish.voanews.com/z/986&filename=acType.html";
            var w = {};
            w._2do = function(txt){ 
                d.innerHTML = txt; 
            }
            blo0.blAjx(w,urlTest);

            _on_off_div(b,d);
        }
        else{
            _on_off_div(b,d);
        }
    }
    var _fn4_run = function (_o2show,_uiName){
        var d = blo0.blMD(_uiName, _uiName,555,100,500,400, "lightgreen"); 
        d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        blo0.blShowObj2Div(d.v,_o2show);        

        var btn_blr1 = bl$("blrTest_getServerInfo");
        btn_blr1.style.float = "left";
        btn_blr1.click();

        
        _on_off_div(null,d);
    };
}