var v = bl$("id_4_div_i4_c3_blrTest1");
var _ss = new CVoa2Video(); 
var _btn = v.getBtn(1);
_btn.value = _ss.getValue();
_btn.click();


function CVoa2Video (){
    var _v = "CVoa2Video_v0.42";
    var fn = ["blrAsItIs","f2"];
    var fb = [];
    this.getValue = function(){
        var s = "// ";
        s += _v;
        s += "\n";
        s += "var os1 ={};\n";
        for(i in fn){
            s += "os1."+fn[i] + "=" + fb[i] + "\n";
            s += _addFun2Obj("os1","bll"+fn[i],"'===='");
        }
        s += "var run="+_run;
        s += "\n";
        s += "run(os1);";
        return s;
    }

    var blrAsItIs = function(b,d){
        if(!d.load){
            d.load = true;
            var w = {};
            w._2do = function(txt){ 
                var s = "var o = " + txt; 
                eval(s);
                var o1 = {};
                o1.id = "indexAsItIs";
                o1.src = "http://localhost:8080/" + o.filename;
                o1.ss = ['<li class="col-xs-12 col-sm-6 col-md-3 col-lg-3">',];
                o1.blrParse = function(_o1){
                    return function(b,d){
                        os1.f2(d,_o1.src,o1.ss);
                    }
                }(o1);
                blo0.blShowObj2Div(d,o1);
            }
            blo0.blAjx(w,"http://localhost:8080/download?url=https%3A%2F%2Flearningenglish.voanews.com%2Fz%2F3521&filename=as.html");
            _on_off_div(b,d);
        }
        else{
            _on_off_div(b,d);
        }
    }
    fb.push(blrAsItIs);
    
    var f2 = function(d,url,ss){
        var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
        var v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        var w = {};
        w._2do = function(txt){
            var a = txt.split(ss[0]);
            for(i in a){ 
                if(0==i) continue;
                var btn = blo0.blBtn(tb,tb.id+i,"b"+i,blGrey[1]);
                btn.onclick = function(_btn,_i,_a,_v){
                    return function(){
                        _v.innerHTML = _a[_i];
                    }
                }(btn,i,a,v);
            }
        }
        blo0.blAjx(w,url);
    }
    fb.push(f2);
    
    var _addFun2Obj = function(_objName,fnName,fnBody){ 
        var r = _objName + "." +  fnName + "=" + fnBody;
        r += "\n";
        return r;
    }
    var _run = function (_o2show){
        var d = blo0.blMD("id_i4_c3_CVoa2Video", "CVoa2Video",    555,100,500,400, "lightgreen"); 
        d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        blo0.blShowObj2Div(d.v,_o2show);        
        _on_off_div(null,d);
    };
}