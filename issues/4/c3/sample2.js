var v = bl$("id_4_div_i4_c3_blrTest1");
var _ss = new CVoa2Video(); 
var _btn = v.getBtn(1);
_btn.value = _ss.getValue();
_btn.click();


function CVoa2Video (){
    var _v = "CVoa2Video_v0.42";
    var fn = ["blrAsItIs","f2","f3","f4"];
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
                if("error"==txt) {
                    d.innerHTML = "error: " + Date();
                    return;
                }
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
        var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]); tb.bs = [];
        var v1 = blo0.blDiv(d,"id_AsItIs_v1","v1",blGrey[0]);
        var v2 = blo0.blDiv(d,d.id+"v2","v2",blGrey[1]);
        var w = {};
        w._2do = function(txt){
            var a = txt.split(ss[0]);
            for(i in a){ 
                if(0==i) continue;
                var btn = blo0.blBtn(tb,tb.id+i,"b"+i,blGrey[1]);  
                btn.style.color = "white";
                
                var s1 = a[i].replace(/href="/g,'target="_blank" href="https://learningenglish.voanews.com');                                         
                var s2  = s1.replace(/data-src/g,'src');  btn.txt = s2;
                var pos = s2.search("r1.png");
                if(pos>-1) btn.style.backgroundColor = blGrey[3];
                else {
                    btn.style.backgroundColor = blGrey[0];
                }

                btn.onclick = function(_btn,_i,_a,_v1,_v2,_bs){
                    return function(){                         
                        for(i in _bs){
                            if(_btn.id==_bs[i].id){
                                _bs[i].style.color = "yellow";
                            }
                            else{
                                _bs[i].style.color = "white";
                            }
                        }
                        _v1.innerHTML = _btn.txt;
                        var links = _v1.getElementsByTagName( 'a' ); 
                        var url = links[0];
                        os1.f3(_v2,url,_v1);
                    }
                }(btn,i,a,v1,v2,tb.bs);
                tb.bs.push(btn);
            }
        }
        blo0.blAjx(w,url);
    }
    fb.push(f2);

    var f3 = function(d,url,dHTML){
        d.innerHTML = url; 
        var a = dHTML.getElementsByTagName( 'span' ); 
        
        var b = a.length==2? a[1].getInnerHTML() : a[0].getInnerHTML();
        var c = b.replace(',',"_"); 
        var saveFN =  c.replace(' ',"_");

        var w = {};
        w._2do = function(txt){ 
                if("error"==txt) {
                    d.innerHTML = "error: " + Date();
                    return;
                }
                var s = "var o2 = " + txt; 
                eval(s);
                var o1 = {};
                o1.originalURL = url;
                o1.saveasURL = "http://localhost:8080/" + o2.filename;
                o1.ss = ['a',];
                o1.blrParse = function(_o1){
                    return function(b,d){
                        var w = {};
                        w._2do = function(txt){                            
                            os1.f4(d,txt);
                        }
                        blo0.blAjx(w,_o1.saveasURL); 
                    }
                }(o1);
                blo0.blShowObj2Div(d,o1);
        }
        blo0.blAjx(w,"http://localhost:8080/download?url=" + url +"&filename=" + saveFN + ".html");
            
    }
    fb.push(f3);

    
    var f4 = function(d,txt){ 
        var vf4 = "[v0.12] ";
        var o = {};
        o.blrMakePlayScript = function(b,d){ 
            d.innerHTML = vf4 + Math.floor(blo0.getDuration());  
        }
        o.blrGetAudio = function(_d,_txt){
            return function(b,d){  
                var ts = document.getElementsByTagName('textarea');
                var v = bl$("blrTxtDiv");
                var as = v.getElementsByTagName('audio'); 

                d.tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
                d.v = blo0.blDiv(d,d.id+"v","v","green");
                for(var i=0; i<as.length;i++){
                    var btn = blo0.blBtn(d.tb,d.tb.id+i,i,blGrey[1]);
                    btn.onclick = function(_btn,_d,_as,_i){
                        return function(){                     
                            _d.v.innerHTML =  _as[_i].src; 
                            blo0.setPlayerURL(_as[_i].src); 
                        }
                    }(btn,d,as,i);
                } 
            }
        }(d,txt);  
        o.blrGetPS = function(_d,_txt){
            return function(b,d){  
                var ts = document.getElementsByTagName('textarea');
                var v = bl$("blrTxtDiv");
                var ps = v.getElementsByTagName('p');
                var ls = [];
                d.tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
                d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
                for(var i=0; i<ps.length;i++){
                    var btn = blo0.blBtn(d.tb,d.tb.id+i,i,blGrey[1]);
                    btn.onclick = function(_btn,_d,_ps,_i){
                        return function(){                    
                            var cn = _ps[_i].className?_ps[_i].className + "_ " : "xxxx_ ";
                            _d.v.innerHTML = cn + _ps[_i].innerHTML; 
                        }
                    }(btn,d,ps,i);
                } 
            }
        }(d,txt);  
        o.blrTxt = function(_d,_txt){
            return function(b,d){ 
                var ts = document.getElementsByTagName('textarea');
                //ts[0].value = _txt; 
                d.innerHTML = _txt;
            }
        }(d,txt);    
        blo0.blShowObj2Div(d,o);    
    }
    fb.push(f4);
    
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