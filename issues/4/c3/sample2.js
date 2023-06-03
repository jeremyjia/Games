// ...1
var v = bl$("id_4_div_i4_c3_blrTest1");
var _ss = new CVoa2Video(); 
var _btn = v.getBtn(1);
_btn.value = _ss.getValue();
_btn.click();


function CVoa2Video (){
    var _v = "CVoa2Video_bv0.335";

    var fn = ["blrVLE","parseType","downloadPage","parsePage"];
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

    var blrVLE = function(b,d){
        if(!d.load){
            d.load = true;
            b.style.float = "left";
            
            var vles = [];
            var _add = function(t,n){
                var o = {};
                o.type = t;
                o.n = n;
                vles.push(o);
            }; 
            _add("ARTS_CULTURE",986);
            _add("AsItIs",3521);
            _add("EDUCATION",959);
            _add("HEALTH_LIFESTYLE",955);
            _add("SCIENCE_TECHNOLOGY",1579);
            _add("VLE",1689);

            var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);  
            var v1 = blo0.blDiv(d,"id_VLE_v1","v1",blGrey[3]);

            for(i in vles){
                var btn1 = blo0.blBtn(tb,tb.id+"btn" + i, vles[i].type,blGrey[0]);
                //*
                btn1.onclick = function(_v1,_vles,_i){
                    return function(){ 
                        //*
                        var blTypeURL = "http://localhost:8080/download?url=https://learningenglish.voanews.com/z/"+_vles[_i].n+"&filename="+_vles[_i].type+".html";
                        var w = {};
                        w._2do = function(txt){ 
                            if("error"==txt) {
                                _v1.innerHTML = "error: " + blTypeURL;
                                return;
                            }
                            var s = "var o = " + txt; 
                            eval(s);
                            var o1 = {};
                            o1.type = _vles[_i].type;
                            o1.src = "http://localhost:8080/" + o.filename;
                            o1.ss = ['<li class="col-xs-12 col-sm-6 col-md-3 col-lg-3">',];
                            o1.blrTypeParse = function(_o1){
                                return function(b,d){
                                    b.style.float = "left";
                                    os1.parseType(d,_o1,_o1.src,o1.ss);
                                    _on_off_div(b,d);
                                }
                            }(o1);
                            blo0.blShowObj2Div(_v1,o1);
                            bl$("blrTypeParse").click();
                        }
                        blo0.blAjx(w,blTypeURL);
                        //*/
                    }
                }(v1,vles,i);
                //*/
            }

            _on_off_div(b,d);
        }
        else{
            _on_off_div(b,d);
        }
    }
    fb.push(blrVLE);
    
    var parseType = function(d,_o,url,ss){
        var ts = document.getElementsByTagName('textarea');
        var md3 = blo0.blMDiv(d,d.id+"md3","md3",511,11,500,400,"green");
        var tb = blo0.blDiv(md3,md3.id+"tb","tb",blGrey[0]); tb.bs = [];
        var v1 = blo0.blDiv(md3,"id_AsItIs_v1","v1",blGrey[0]);
        var v2 = blo0.blDiv(md3,md3.id+"v2","v2","lightgreen"); 
        var w = {};
        w._2do = function(txt){
            var a = txt.split(ss[0]);
            var btnDbg = blo0.blBtn(tb,tb.id+"btnDbg","btnDbg",blGrey[1]);  
            btnDbg.onclick = function(){
                ts[0].value = _o.type + " : " + a.length;
            }
            tb.idx = 0;
            tb.curDate = "";
            for(i in a){ 
                if(0==i) continue;
                
                var s1 = a[i].replace(/href="/g,'target="_blank" href="https://learningenglish.voanews.com');                                         
                var s2  = s1.replace(/data-src/g,'src');  
                
                var btn = blo0.blBtn(tb,tb.id+i,i,blGrey[1]);  
                btn.style.color = "white";
                btn.txt = s2;  
          
                var t1 = blo0.blTags(s2,"span");
                var pos = s2.search("38CEF907-F6F1-40A7-AC67-CDE6A3271344_w66_r1.png"); 
                if(pos>-1){
                    btn.style.backgroundColor = blGrey[3]; 
                    btn.innerHTML = t1[1].innerHTML;
                } 
                else {
                    btn.style.backgroundColor = blGrey[0];                     
                    btn.innerHTML = t1[0].innerHTML;
                    if(_o.type=="VLE") btn.innerHTML = t1[1].innerHTML;
                }  

                if(tb.curDate!=btn.innerHTML){
                    tb.curDate = btn.innerHTML;
                    tb.idx = 1;
                }
                else{
                    tb.idx++;
                }
                btn.innerHTML = _o.type +"_" + tb.idx + "_" + tb.curDate;


                btn.onclick = function(_btn,_i,_a,_v1,_v2,_bs,_idx,_type){
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
                        ts[0].value = _btn.txt;
                        var links = _v1.getElementsByTagName( 'a' ); 
                        var url = links[0];
                        os1.downloadPage(_v2,url,_v1,_idx,_o.type);
                    }
                }(btn,i,a,v1,v2,tb.bs,tb.idx);
                tb.bs.push(btn);
            }
        }
        blo0.blAjx(w,url);
    }
    fb.push(parseType);

    var downloadPage = function(d,url,dHTML,_idx,_type){
        d.innerHTML = url; 
        var a = dHTML.getElementsByTagName( 'span' ); 
        
        var b = a.length==2? a[1].getInnerHTML() : a[0].getInnerHTML();
        var c = b.replace(',',"_"); 
        var saveFN =  c.replace(' ',"_");
        saveFN = saveFN.replace(' ','_');
        saveFN = _type + "_"+_idx + "_xd_" + saveFN;

        var blURL = "http://localhost:8080/download?url=" + url +"&filename=" + saveFN + ".html";
        var w = {};
        w._2do = function(txt){ 
                if("error"==txt) {
                    d.innerHTML = "error: " + blURL;
                    return;
                }
                var s = "var o2 = " + txt; 
                eval(s);
                var o1 = {};
                o1.originalURL = url;
                o1.saveasURL = "http://localhost:8080/" + o2.filename;
                o1.ss = ['a',];
                o1.blrPageParse = function(_o1,_filename){
                    return function(b,d){
                        d.md4 = blo0.blMDiv(d,d.id+"md4","md4",333,11,500,400,"brown");
                        d.md4.v = blo0.blDiv(d.md4,d.md4.id+"v","v","gray");
                        var w = {};
                        w._2do = function(txt){                            
                            os1.parsePage(d.md4.v,txt,_filename);
                        }
                        blo0.blAjx(w,_o1.saveasURL); 
                    }
                }(o1,saveFN);
                blo0.blShowObj2Div(d,o1);
                bl$("blrPageParse").click();
        }
        blo0.blAjx(w,blURL);
            
    }
    fb.push(downloadPage);

    
    var parsePage = function(d,txt,_filename){ 
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
                var h1 = v.getElementsByTagName('h1'); 

                d.tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
                d.v = blo0.blDiv(d,d.id+"v","v","green");
                for(var i=0; i<as.length;i++){
                    var btn = blo0.blBtn(d.tb,d.tb.id+i,i,blGrey[1]);
                    btn.onclick = function(_btn,_d,_as,_h1,_i){
                        return function(){                     
                            _d.v.innerHTML =  _as[_i].src; 
                            blo0.setTitle4Script(_h1[_i].innerHTML); 
                            blo0.setScriptName(_filename); 
                            var url2Download = "http://localhost:8080/download?url=";
                            url2Download += _as[_i].src;
                            url2Download += "&filename=" + _filename + ".mp3"; 
                            var wMp3 = {};           
                            wMp3._2do = function(txt){
                                _d.v.innerHTML =  txt + ":: " + _filename + ".mp3";    
                                var url1 = "http://localhost:8080/" + _filename + ".mp3";                             
                                blo0.setPlayerURL(url1); 
                                
                                var w2 = {};
                                w2._2do = function(txt2){
                                    d.innerHTML =  txt2 + " :: " + _filename + ".mp3"; 
                                }   
                                var url2 = "http://localhost:3001/downloadImage?url=";
                                url2 += url1;
                                url2 += "&fn=" + "C:\\FFOutput\\"+ _filename + ".mp3";
                                blo0.blAjx(w2,url2);   
                            }           
                            
                            blo0.blAjx(wMp3,url2Download);
                        }
                    }(btn,d,as,h1,i);
                } 
            }
        }(d,txt);  
        
        o.blrImage = function(_d,_txt){
            return function(b,d){  
                var a = _txt.split('"image":{"width":1080,"height":608,"@type":"ImageObject","url":"');
                var b = a[1].split('"},"name":"');
                
                var urlImg = "http://localhost:8080/download?url=";
                urlImg += b[0]; 
                urlImg += "&filename=voa1.jpg";
                var wImg = {};           
                wImg._2do = function(txt1){ 
                   d.innerHTML =  txt1 + " :: voa1.jpg";  

                   var w2 = {};
                   w2._2do = function(txt2){
                    d.innerHTML =  txt2 + " :: voa1.jpg"; 
                   }   
                   var url2 = "http://localhost:3001/downloadImage?url=";
                   url2 += "http://localhost:8080/voa1.jpg";
                   url2 += "&fn=" + "C:\\FFOutput\\voa1.jpg";
                   blo0.blAjx(w2,url2);   
                }           
                            
                blo0.blAjx(wImg,urlImg);

                o.imgTitle = b[0];
            }
        }(d,txt);    
        o.blrGetPS = function(_d,_txt){
            return function(b,d){  
                var ts = document.getElementsByTagName('textarea');
                var v = bl$("blrTxtDiv");
                var s1 = v.innerHTML;
                
                var ps = v.getElementsByTagName('p');
                var ls = [];
                d.tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
                d.v = blo0.blDiv(d,d.id+"v","v",blGrey[3]);
                 
                for(var i=0; i<ps.length;i++){
                    var btn = blo0.blBtn(d.tb,d.tb.id+i,i,blGrey[1]);
                    btn.onclick = function(_btn,_d,_ps,_i,_ls){
                        return function(){              
                            if(_ps[_i].t != undefined) {
                                var btnFrame = bl$("FRAME_ID_"+_ps[_i].t);
                                btnFrame.click();      
                            }
                            var cn = _ps[_i].className?_ps[_i].className + "_ " : "xdxdxxxx_ ";
                            
                            var s1 = _ps[_i].t;
                            s1 += " : " + cn;
                            s1 += _ps[_i].innerText;
                            ts[0].value = s1;

                            _d.v.innerHTML = "" ; 
                            
						    blo0.blMarkBtnInList(_btn,_ls,"yellow","grey"); 
                            
                            var pv = blo0.blDiv(_d.v,_d.v.id+"pv","pv",blGrey[3]);
                            pv.innerHTML = s1;
                            var ptb = blo0.blDiv(_d.v,_d.v.id+"ptb","ptb",blGrey[0]);
                            var btnCur = blo0.blBtn(ptb,ptb.id+"btnCurl","cur",blGrey[1]);
                            btnCur.onclick = function(){
                                _ps[_i].t = Math.floor(blo0.blGetCurTime()); ;
                                var s1 = _ps[_i].t;
                                s1 += " : " + cn;
                                s1 += _ps[_i].innerHTML; 
                                pv.innerHTML = s1;
                            }
                            var btnPlus1 = blo0.blBtn(ptb,ptb.id+"btnPlus1","+1",blGrey[1]);
                            btnPlus1.onclick = function(){
                                _ps[_i].t += 1;
                                var s1 = _ps[_i].t;
                                s1 += " : " + cn;
                                s1 += _ps[_i].innerHTML; 
                                pv.innerHTML = s1;
                            }
                            var btnMinus1 = blo0.blBtn(ptb,ptb.id+"btnMinus1","-1",blGrey[1]);
                            btnMinus1.onclick = function(){
                                _ps[_i].t -= 1;
                                var s1 = _ps[_i].t;
                                s1 += " : " + cn;
                                s1 += _ps[_i].innerHTML; 
                                pv.innerHTML = s1;
                            }
                        }
                    }(btn,d,ps,i,ls);
                    ls.push(btn);
                } 
                
                blo0.blSetPS(ps);

                
                var h1 = v.getElementsByTagName('h1');

                var btnWord = blo0.blBtn(d.tb,d.tb.id+"btnWord","word","green");
                btnWord.onclick = function(){
                    var ta = blo0.blGetTa();
                    var r = "";
                    r += "title=" + h1[0].innerHTML;
                    r += "&";
                    r += "imgTitle=" + o.imgTitle;
                    r += "&";
                    r += "scriptVersion=" + '听力文本—— v:0.23';
                    ta.value = r + blo0.blParsePS();
                    blo0.blWord(ta.value,function(txt){ta.value = txt;});
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
    fb.push(parsePage);
    
    var _addFun2Obj = function(_objName,fnName,fnBody){ 
        var r = _objName + "." +  fnName + "=" + fnBody;
        r += "\n";
        return r;
    }
    var _run = function (_o2show){
        var d = blo0.blMD("id_i4_c3_CVoa2Video", "xd*",444,100,500,400, "lightgreen"); 
        d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        blo0.blShowObj2Div(d.v,_o2show);       
        bl$("blrVLE").click(); 
        _on_off_div(null,d);
    };
}