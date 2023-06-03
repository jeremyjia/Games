
const p1Tag = "[plx/p1.js_v0.343]";

const btn4p1 = bl$("plx_p1_btn");

if(btn4p1){ 
    btn4p1.v = blo0.blMD(btn4p1.id+p1Tag,p1Tag,210,11,555,150,blGrey[0]);
    var tb = blo0.blDiv(btn4p1.v,btn4p1.v.id+"tb","tb0",blGrey[1]);
    tb.btnStoryBoard = blo0.blBtn(tb,"btnStoryBoard","storyBoard",blGrey[2]);
    tb.btnStoryBoard.style.float = "left";
    
    tb.btnStoryBoard.onclick = function(){
       if(!this.sb)  this.sb = new CStoryBoard(btn4p1.v);
       this.sb.show(this);
    }
    
    tb.btnPlayground = blo0.blBtn(tb,"btnPlayground","Playground",blGrey[2]);
    tb.btnPlayground.style.float = "left";
    
    tb.btnPlayground.onclick = function(){
        if(!this.pg)  this.pg = new CPlayground(btn4p1.v);
        this.pg.show(this);
    }
    
    tb.btnServer = blo0.blBtn(tb,"btnServer","Server",blGrey[2]);
    tb.btnServer.style.float = "left";
    
    tb.btnServer.onclick = function(){
        if(!this.pg)  this.pg = new CServer(btn4p1.v);
        this.pg.show(this);
    }
    
    btn4p1.onclick = function(){
        var b = this;
        _on_off_div(b,b.v);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    } 
    btn4p1.onclick();
    btn4p1.onclick();
}
 
function CServer(parentDiv){
    var p = parentDiv;
    var ui = null;
    var x = 0;
    var y = 220;
    var w = 500;
    var h = 50;
    var xDbg = 20;
    var yDbg = 55;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "lightgreen";
    
    this.show = function(b){ 
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_server","server",x,y,w,h,blGrey[0]);
            
            ui.inf = {};
            ui.inf.x = 123;
            ui.inf.y = 321;
            ui.inf.l8080 = "http://localhost:8080";  
            ui.inf.href = window.location.href;  
            ui.inf.file = "No file.";  
            ui.inf.text = "CServer.text";   

            var tb = blo0.blDiv(ui, "id_4_tb_server","tb",blGrey[1]);
            var v = blo0.blDiv(ui, "id_4_v_server","v",blGrey[2]);
            tb.b1 = o.dbgBtn(tb,"id_btn_4_dbgServer","dbg");
            var lst = ["json","mp3","mp4","jpg","html"];
            for (i in lst){                 o.getServerFiles(tb,v,lst[i]);            } 

            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    o.text(ctx,ui.id,xDbg,yDbg);
                    o.rendFile(ctx,ui.inf.file,xDbg+20,yDbg+20,192,108);
                }   
            }
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="lightgreen"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "lightgreen";
                    xDbg =x;
                    yDbg = y;
                }
            }
            o.regMousedown(ui);
            o.reg2draw(ui);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];    
    }
}
function CPlayground(parentDiv){
    var p = parentDiv;
    var ui = null;
    var w = 360;
    var h = 240;
    var xDbg = 20;
    var yDbg = 111;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "brown";


    this.show = function(b){
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_playground","playground",555,5,w,111,blGrey[0]);
            ui.inf = {};
            ui.inf.x = 0;
            ui.inf.y = 0;
            ui.inf.click = "no click";
                        
            ui.inf.text = "playground.text";     

            var tb = blo0.blDiv(ui, "id_4_tb_playground","tb",blGrey[1]);
            tb.btnPlay = blo0.blBtn(tb,"id_4_btnPlay","play",blGrey[2]);
            tb.btnPlay.style.float = "left";
            tb.btnPlay.onclick = function(){
                o.play(this);
            }
            tb.b1 = o.dbgBtn(tb,"id_btn_4_dbgPlayground","dbg");

            var vStatus = blo0.blDiv(ui,"id_4_vStatus","status::",blGrey[3]);   
            var v1 = blo0.blDiv(ui,ui.id+"v1","",blGrey[1]);          
                

            var cvs = document.createElement("canvas");
            cvs.width = w;
            cvs.height = h;
            cvs.style.backgroundColor = "grey";
            cvs.style.float = "left";

            v1.appendChild(cvs);
            
            cvs.addEventListener('mousedown', function (e) {
                var x = e.offsetX;
                var y = e.offsetY;
                o.mousedown(cvs.getContext("2d"),x,y);                
            });
            
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="brown"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "brown";
                    xDbg =x;
                    yDbg = y;                    
                }
            }
            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    o.text(ctx,ui.id,xDbg,yDbg);
                    o.text(ctx,ui.inf.click,xDbg,yDbg+20);
                }   
            }
            o.reg2draw(ui);
            o.regMousedown(ui);

            var itv = setInterval(o.ftnTimer, 20,cvs.getContext("2d"),w,h);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }; 
}
function CStoryBoard(parentDiv){

    var v = "CStoryBoard v0.13";
    var ui = null;
    var p = parentDiv; 
       
     
    this.show = function(b){
        if(!ui){           

            var xDbg = 11;
            var yDbg = 222;
            var wDbg = 20;
            var hDbg = 20;
            var cDbg = "lightgreen";
            
            ui=blo0.blDiv(p,p.id+"_StoryBoard",v,blGrey[1]);   
            ui.inf = {};
            ui.inf.x = 17809;
            ui.inf.y = 17809;
            ui.inf.text = "storyBoard.text";   

            var tb =blo0.blDiv(ui,"tb4StoryBoard","tb2",blGrey[1]);
            tb.b1 = o.dbgBtn(tb,"id_btn_4_StoryBoardDbg","dbg");
            tb.btnCurStory = blo0.blBtn(tb,"id_4_btnCurStory","curStory",blGrey[2]);
            tb.btnCurStory.style.float="left";
            tb.btnCurStory.onclick = function(_this){  
                _this.inf={};
                var d = new Date();
                _this.inf.D = d;
                _this.inf.n = 0; 
                _this.inf.v = "0.0.3";
                _this.inf.w = 1920;
                _this.inf.h = 1080;
                _this.inf.music = "1.mp3";
                _this.inf.rate = "1";
                
                _this.inf2JSON = function(_btn){
                    return function(){
                        _btn.inf.n = o.listCards.length;
                        var r = o.newScript(_btn.inf.v,
                                _btn.inf.w,
                                _btn.inf.h,
                                _btn.inf.music,
                                _btn.inf.rate);
                        var n=0;
                        for(i in o.listCards){
                            n++;
                            var c = o.listCards[i].inf.bgColor == "red"?"255,0,0":"125,125,125";
                            c = o.listCards[i].inf.bgColor == "green"?"0,255,0":c;
                            c = o.listCards[i].inf.bgColor == "blue"?"0,0,255":c;
                            var f = o.newFrame(n,1,c); 
                            for(j in o.listCards[i].inf.objects){
                                o.AddObj2Frame(f.objects,o.listCards[i].inf.objects[j]);
                            } 

                            o.AddFrame2Script(r,f);                            
                        }
                        var s = JSON.stringify(r); 
                        return s;
                    }
                }(_this);
                _this.inf.toJSON = function(_btn){
                    return function(v1){        
                        var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                        vta.innerHTML = "";
                        vta.v1 = blo0.blDiv(vta,vta.id+"v1","v1" ,blGrey[1]); 
                        vta.v2 = blo0.blDiv(vta,vta.id+"v2","v2" ,blGrey[2]); 
        
                        var ta = blo0.blTextarea(vta.v1,vta.v1.id+"ta","ta","lightgreen");
                        ta.style.width = 100 + "%";
                        ta.value = _btn.inf2JSON();
        
                        vta.v2.saveAs_v3 = blo0.blBtn(vta.v2,vta.v2.id+"b1","saveAs_v3.json",blGrey[0]);
                        vta.v2.saveAs_v3.onclick = function(){ 
                            var data = ta.value;
                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                            if(this.readyState === 4) {
                                ta.value = this.responseText;
                            }	
                            });
                            xhr.open("POST", "http://localhost:8080/json?fileName=v3.json");
                            xhr.setRequestHeader("Content-Type", "text/plain");
                            xhr.send(data);
                        }
                    }
                }(_this);
                return function(){
                     o.status(this);
                }
            }(tb.btnCurStory);

            tb.btnAddCard = blo0.blBtn(tb,"id_4_btnAddCard","+1",blGrey[2]);
            tb.btnAddCard.style.float="left";
            tb.btnAddCard.onclick = function(){
                o.addCard(this);
            }
            tb.btnAdd2Cards = blo0.blBtn(tb,"id_4_btnAdd2Cards","+2",blGrey[2]);
            tb.btnAdd2Cards.style.float="left";
            tb.btnAdd2Cards.onclick = function(){
                o.addCard(this);o.addCard(this);
            }
            tb.btnAdd5Cards = blo0.blBtn(tb,"id_4_btnAdd5Cards","+5",blGrey[2]);
            tb.btnAdd5Cards.style.float="left";
            tb.btnAdd5Cards.onclick = function(){
                o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);
            }
            tb.btnAdd10Cards = blo0.blBtn(tb,"id_4_btnAdd10Cards","+10",blGrey[2]);
            tb.btnAdd10Cards.style.float="left";
            tb.btnAdd10Cards.onclick = function(){
                o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);
                o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);
            }
            tb.btnAdd100Cards = blo0.blBtn(tb,"id_4_btnAdd100Cards","+100",blGrey[2]);
            tb.btnAdd100Cards.style.float="left";
            tb.btnAdd100Cards.onclick = function(){
                for(var i = 0; i < 100; i++ ){o.addCard(this);}
            }
            
            

            o.addClass(ui,"w3-row");  
            o.addClass(ui,"w3-red");

            o.uiColum(ui);   

            ui.draw = function(ctx){
                if(tb.b1.b)       
                {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);
                    o.text(ctx,ui.id,xDbg,yDbg);

                }  
            }
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="lightgreen"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "lightgreen";
                    xDbg =x;
                    yDbg = y;
                }
            }
            o.regMousedown(ui);
            o.reg2draw(ui);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }; 
} 

function CClient(){
    var w = {};
    this.exeCmd = function(v0,v1,v2){
        var ta = bl$("id_ta_4_script_editor");
        if(!ta){
            ta = blo0.blTextarea(v1,"id_ta_4_script_editor","dir",blGrey[0]);
        } 
        {
            ta.value = "exeCmd" + Date();
            var btnRun = blo0.blBtn(v1, v1.id+ "btnRun", "run", "green");
            btnRun.onclick = function(){                    
                w._2do = function(txt){ 
                    v0.innerHTML = txt;        
                } 
                blo0.blAjx(w, "http://localhost:8080/command?cmd="+ta.value ); 
            }
        }
    };
    this.getJSFiles = function(v0,v1,v2){
			w._2do = function(txt){ 
				v0.innerHTML = ""; 
				eval("var o=" + txt);
				for(i in o.resource){
					var b = blo0.blBtn(v0,v0.id+i,i,blGrey[2]);
					b.onclick = function(_this,_jsf){						
						return function(){
							 v1.innerHTML = _this.id;
							 var btnMP4 = blo0.blBtn(v1, v1.id+ "b1", "createMP4", blGrey[2]);
							 v2.innerHTML = _jsf;
							 var vMP4 = blo0.blDiv(v2, v2.id + "vMP4", "vMP4", blGrey[2]);  

							 btnMP4.onclick = function(){
								var url = "http://localhost:8080/image/video?script="+_jsf; 
								var w1 = {};
								w1._2do = function(txt){ 
									vMP4.innerHTML = txt;	
								}
								blo0.blAjx(w1,url);							
							}
						}
					}(b,o.resource[i]);					
				}  
			}
			blo0.blAjx(w, "http://localhost:8080/getResourceOnServer?filetype=json" ); 
    };
    
    this.getMp3Files = function(v0){
        w._2do = function(txt){ 
            eval("var o=" + txt);
            v0.innerHTML = "";
            for(i in o.resource){
                var b = blo0.blBtn(v0,v0.id+i,i,blGrey[2]);
                b.onclick = function(_this,_r){						
                    return function(){
                         alert(_r);                          
                    }
                }(b,o.resource[i]);	                		
            }  
        }
        blo0.blAjx(w, "http://localhost:8080/getResourceOnServer?filetype=mp3" ); 
    };
}

function CTmp(){
    this.newScript = function(v,w,h,m,r){ 
        var json = {}; 
        json.request = {}; 
        json.request.version    = v;
        json.request.width      = w;
        json.request.height     = h;
        json.request.music      = m;
        json.request.rate       = r;  
        json.request.frames     = [];
        return json;
    }
    this.getServerFiles = function(tb,v,ft){
        var b = blo0.blBtn(tb,tb.id+ft,ft,blGrey[1]);
        b.style.float = "left";
        b.onclick = function(_v,_ft){
            return function(){
                _v.dbg = blo0.blDiv(_v,_v.id+"dbg","dbg","lightgreen");   
                _v.d = blo0.blDiv(_v,_v.id+"d","d","lightblue");   
                _v.d.style.overflow = "auto";           
                _v.d.innerHTML = Date();
                
                _v.d.v = blo0.blDiv(_v.d,_v.d.id+"v","v","grey");   
                _v.d.v.style.width = 11100 + "px";
    
                var w = {};
                w._2do = function(txt){
                    var s = 'var ro='+txt;
                    eval(s); 
                    for(i in ro.resource){
                        var bf=blo0.blBtn(_v.d.v,_v.d.v.id+"_bf_"+i,ro.resource[i],blGrey[2]);
                        bf.style.float = "left";
                        bf.inf = {};
                        bf.onclick = function(_this,_dbg,_me){
                            return function(){    
                                _dbg.innerHTML = _me ; 
                                o.makeINF(_this,_me);
                                o.status(_this);
                            }
                        }(bf,_v.dbg,ro.resource[i]);
                    }
                }
                var url = 'http://localhost:8080/getResourceOnServer?filetype='+_ft;
                blo0.blAjx(w,url);
            }
        }(v,ft);
    }
    
    this.makeINF = function(obj,fileName){
        obj.inf.file = fileName; 
        var a = fileName.split(".");
        obj.inf.n = a.length;
        
        if(a[1]=="html") _makeInf4HTML(obj.inf,fileName);
        if(a[1]=="json"){
            obj.inf.toDo = function(v1){
                var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                vta.innerHTML = "";
                var tb = blo0.blDiv(vta,vta.id + "tb","tb",blGrey[0]);
                var v = blo0.blDiv(vta,vta.id + "v","v",blGrey[0]);
                tb.showMe = blo0.blBtn(tb,tb.id+"showMe","showMe",blGrey[1]);
                tb.showMe.style.float="left";
                tb.showMe.onclick = function(){
                    var w = {};
                    w._2do = function(txt){       
                        v.innerHTML = "";             
                        var ta = blo0.blTextarea(v,v.id+"ta","ta","lightgreen");
                        ta.style.width = 100 + "%";
                        ta.style.height = 100 + "px";
                        ta.value = txt;
                    }
                    blo0.blAjx(w,"http://localhost:8080/"+fileName);
                }
                tb.makeMP4 = blo0.blBtn(tb,tb.id+"b1","makeMP4",blGrey[1]);
                tb.makeMP4.style.float="left";
                tb.makeMP4.onclick = function(){
                    var w = {};
                    w._2do = function(txt){
                        v.innerHTML = txt;
                    }
                    blo0.blAjx(w,"http://localhost:8080/image/json2video?script="+fileName);
                }
            }
        }
        if(a[1]=="mp4" || a[1]=="mp3"){
            obj.inf.toDo = function(v1){
                var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                vta.innerHTML = "";
                var tb = blo0.blDiv(vta,vta.id + "tb","tb",blGrey[0]);
                var v = blo0.blDiv(vta,vta.id + "v","v",blGrey[0]);
                tb.play = blo0.blBtn(tb,tb.id+"b1","play",blGrey[1]);
                tb.play.style.float="left";
                tb.play.onclick = function(){
                    //*
                    var sss = '<video id="myVideo" width="180" height="120" controls>';
                    sss+= '<source src="'
                    sss+= 'http://localhost:8080/';
                    sss+= fileName;
                    sss+= ' " type="video/mp4">';
                    sss+='Your browser does not support HTML5 video. '
                    sss+='</video>'; 
                    v.v1 = blo0.blDiv(v,v.id+"v1",sss,blGrey[1]);
                    
                }
                tb.getDuration = blo0.blBtn(tb,tb.id+"getDuration","getDuration",blGrey[1]);
                tb.getDuration.style.float="left";
                tb.getDuration.onclick = function(){
                    var p = bl$("myVideo");
                    if(p){
                        o.music = fileName;
                        o.duration = p.duration;
                        alert(o.music);
                    }
                    else{
                        alert("No myVideo");
                    }
                }
            }
        }    
    }
    this.status = function(me){
        var d = bl$("id_4_vStatus");
        d.innerHTML = "";
        var md = blo0.blMDiv(d,d.id+"md","o._status "+me.id+":"+me.style.backgroundColor,3,340,555,100,blGrey[0]); 
        var vs = blo0.blDiv(md,md.id+"vs","",blGrey[1]);
        var v1 = blo0.blDiv(md,md.id+"v1","v1",blGrey[1]);
        var n = 0; 
        for(i in me.inf){
            n++;
            var b = blo0.blBtn(vs,vs.id+"b" + n, i ,blGrey[1]);
            var clr = "brown";
            var bv = blo0.blBtn(vs,vs.id+"bv"+ n, me.inf[i] ,clr);
            if(i=="c") bv.style.backgroundColor = me.inf[i];
            b.style.float="left";
            bv.style.float="left";
            bv.onclick = function(_this){
                return function(){
                    var uiPG = bl$("id_mdiv_4_playground");
                    uiPG.inf.click = _this.innerHTML;
                }
            }(bv);
            if(i=="text" || i=="bgColor"){
                b.style.backgroundColor = "lightblue";
                b.onclick = function(_this,_bv,_me,_i){
                    return function(){ 
                        var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"green"); 
                        vta.innerHTML = "";
                       if(_this.style.backgroundColor=="lightblue"){
                            _this.style.backgroundColor="grey";
                             _bv.ta = blo0.blTextarea(vta,vta.id+"ta",_me.inf[_i],"grey");
                            _bv.ta.style.width= "100%";
                            ta.value = _bv.innerHTML;
                       }
                       else if(_this.style.backgroundColor=="grey"){
                            _this.style.backgroundColor="lightblue";
                            _bv.innerHTML = _bv.ta.value;
                            _me.inf[_i] = _bv.ta.value; 
                            vta.innerHTML = "";
                            o.status(_me);
                       }
                    }
                }(b,bv,me,i);
            }
            else if(i=="toJSON"){
                bv.innerHTML = "fn...";
                b.style.backgroundColor = "green";            
                b.onclick = function(_this,_v1,_me,_i){
                    return function(){ 
                        _me.inf[_i](_v1);
                    }
                }(b,v1,me,i);
            }
            else if(i=="toDo"){
                bv.innerHTML = ".";
                b.style.backgroundColor = "green";            
                b.onclick = function(_this,_v1,_me,_i){
                    return function(){ 
                        _me.inf[_i](_v1);
                    }
                }(b,v1,me,i);
            }
        } 
    }
    this.AddFrame2Script = function(oScript,oFrame){
        oScript.request.frames.push(oFrame);
    }
    this.AddObj2Frame = function(ls,oObj){ 
        ls.push(oObj);
    }    

    function _makeInf4HTML(_inf,_fileName){
        _inf.toDo =  function(v1){
            var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
            var s = "<a target = '_blank' href='";
            s += _fileName;
            s += "'>";
            s += _fileName;
            s += "</a>"
            vta.innerHTML = s;
        }
    }
}
var o = new CTmp();

o.music = "1.mp3";
o.duration = 120;
o.x = 50;
o.y = 30;
o.s = "o.s";
o.s1 = "s1:";
o.list2draw = [];
o.listMousedown = [];
o.listCards = [];
o.curCard = 0;
o.bPlay = false;



o.newFrame = function(number,time,backgroundColor){
    var r = {};
    r.number = number;
    r.time = time;
    r.objects = [];
    r.backgroundColor = backgroundColor;
    return r;
}
o.newObj = function(type,left,top,right,bottom,size,color){
    var r = {};
    r.graphic = type; 
    r.attribute = {};
    r.attribute.left = left; 
    r.attribute.top = top;
    r.attribute.right = right;
    r.attribute.bottom = bottom;
    r.attribute.size = size;
    r.attribute.color = color;  
    return r;
}

o.newTextObj = function(txt,x,y,size,color){
    var r = {};
    r.text = txt; 
    r.x = x;
    r.y = y; 
    r.size = size;
    r.color = color; 
    return r;
}

o.drawObj = function(ctx,obj){
    o.text(ctx, obj.graphic , obj.attribute.left,150);

    if(obj.graphic=="line"){
        ctx.moveTo(obj.attribute.left,obj.attribute.top);
        ctx.lineTo(obj.attribute.right,obj.attribute.bottom);
        ctx.stroke();
    }
    else if(obj.graphic=="circle"){
        ctx.beginPath();
        ctx.arc(obj.attribute.left + (obj.attribute.right-obj.attribute.left)/2,
                obj.attribute.top + (obj.attribute.bottom-obj.attribute.right)/2,
                20,
                0, 2 * Math.PI);
        ctx.stroke();
    }
    else if(obj.graphic=="rect"){
        ctx.strokeRect(obj.attribute.left, obj.attribute.top, obj.attribute.right, obj.attribute.bottom);
    }
    else if(obj.graphic=="text"){
        o.text(ctx,"TEXT",obj.attribute.left, obj.attribute.top);
    }
}
o.img = function(ctx,f,x,y,w,h){
    var i = new Image();
    i.src = "http://localhost:8080/"+f; 
    o.text(ctx,i.src,x,y);
    ctx.drawImage(i,x,y,w,h);
}
o.rendFile = function(ctx,f,x,y,w,h){
    o.img(ctx,f,x,y,w,h);
}  
 

o.addCard= function(_ls){
    return function(btn){
        var n = _ls.length;
        var v=bl$("id_4_cardV");
        s = btn.id + ":" + n;
        var b = blo0.blBtn(v,v.id+"_"+n,n+1,"grey");
        b.style.float="left";
        b.No = n+1;
        b.inf = {};
        b.inf.type = "t_Card";
        b.inf.index = n; 
        b.inf.toJSON = function(_btn){
            return function(v1){        
                var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                vta.innerHTML = "";
                vta.v1 = blo0.blDiv(vta,vta.id+"v1","v1" ,blGrey[1]); 
                vta.v2 = blo0.blDiv(vta,vta.id+"v2","v2" ,blGrey[2]); 

                var ta = blo0.blTextarea(vta.v1,vta.v1.id+"ta","ta","lightgreen");
                ta.style.width = 100 + "%";
                ta.value = _btn.inf2JSON();

                vta.v2.saveAs_v3 = blo0.blBtn(vta.v2,vta.v2.id+"b1","saveAs_v3.json",blGrey[0]);
                vta.v2.saveAs_v3.onclick = function(){ 
                    var data = ta.value;
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    xhr.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                        ta.value = this.responseText;
                    }	
                    });
                    xhr.open("POST", "http://localhost:8080/json?fileName=v3.json");
                    xhr.setRequestHeader("Content-Type", "text/plain");
                    xhr.send(data);
                }
                vta.v2.setMusic = blo0.blBtn(vta.v2,vta.v2.id+"setMusic","setMusic",blGrey[0]);
                vta.v2.setMusic.onclick = function(){ 
                    o.music = "a.mp3";
                }
            }
        }(b);
        b.inf.version = "0.0.11";
        b.inf.x = 17;
        b.inf.y = 80;
        b.inf.w = 1920;
        b.inf.h = 1080;
        b.inf.music = o.music;//"1.mp3";
        b.inf.duration = o.duration;
        b.inf.rate = "1";
        b.inf.objects = [];
        b.inf.bgColor = "skyblue";
        b.inf.text = "Card.txt"; 
      //  o.AddObj2Frame(b.inf.objects,o.newObj("circle",111,111,222,222,5,"red"));
      // o.AddObj2Frame(b.inf.objects,o.newObj("rect",111,10,100,100,5,"blue"));
       // o.AddObj2Frame(b.inf.objects,o.newTextObj("test",10,10,60,"0,255,255"));
        o.AddObj2Frame(b.inf.objects,o.newObj("text",15,110,333,222,5,"255,255,1"));
        o.AddObj2Frame(b.inf.objects,o.newObj("line",15,110,333,222,5,"255,255,1"));
        o.AddObj2Frame(b.inf.objects,o.newObj("line",15,222,333,111,5,"255,1,1"));
        b.inf2JSON = function(_this){
            return function(){
                var r = o.newScript(b.inf.version,
                            b.inf.w,
                            b.inf.h,
                            b.inf.music,
                            b.inf.rate);
                var f = o.newFrame(1,120,"1,100,200");                
                for(i in b.inf.objects){
                    o.AddObj2Frame(f.objects,b.inf.objects[i]);
                }
                //o.AddObj2Frame(f.objects,o.newObj("line",111,111,333,111,5,"255,0,0"));
                o.AddFrame2Script(r,f);
                
                var s = JSON.stringify(r); 
                return s;
            }
        }(b);
        b.onclick = function(_o,_this){
            return function(){
                _o.curCard = _this.No;
                for(i in _o.listCards){
                    if((_this.No-1)==i){
                        _o.listCards[i].style.backgroundColor = "yellow";
                        _o.status(_this);
                    }
                    else{
                        _o.listCards[i].style.backgroundColor = "grey";
                    }
                }
            }
        }(o,b);
        b._2_draw = function(_this){
            return function(ctx){
                var x = _this.inf.x;
                var y = _this.inf.y;
                var w = _this.inf.w;
                var h = _this.inf.h;
                var c = _this.inf.bgColor;
                var s = "o.bPlay: " + o.bPlay ;
                s += " o.list2draw.length=" + o.list2draw.length;
                s += ": " + o.curCard + "/" + o.listCards.length;
                o.text(ctx,s,x,y);        
                o.rect(ctx,x,y,w,h,c);
                s = _this.inf.text + ": N[Obj]=" + _this.inf.objects.length;
                o.text(ctx,s,x ,y+h/2);       
                for(i in _this.inf.objects){
                    var a = _this.inf.objects[i]; 
                    o.drawObj(ctx,a);                    
                } 

            }
        }(b);
        _ls.push(b);
    }
}(o.listCards);

o.play = function(btn){
    if(o.bPlay){
        o.bPlay = false;
        btn.innerHTML = "play";
    }
    else{
        o.bPlay = true;
        btn.innerHTML = "stop";
    }
}
o.inRect = function(x,y,x0,y0,w,h){
    var b = false;
    if(x<x0 || x>(x0+w) || y<y0 || y>(y0+h)){
        b = false;
    }
    else{
        b = true;
    }
    return b;
}
o._2drawCurCard = function(ctx){
     
    o.listCards[o.curCard-1]._2_draw(ctx);
}
 
o.draw = function(ctx){
    o._2drawCurCard(ctx);

    for(i in o.list2draw){
        o.list2draw[i].draw(ctx);
    }

}
o.reg2draw  = function(user){
    o.list2draw.push(user);
}
o.regMousedown = function(user){
    o.listMousedown.push(user);
}
o.dbgBtn = function(tb,id,html){
    var btn = blo0.blBtn(tb,id,html,"grey"); 
           
    btn.style.float = "left";
       
    btn.onclick = function(_tb){ 
        return function(){
                if("grey"==this.style.backgroundColor){
                    this.style.backgroundColor = "green";
                    this.b = true;
                }
                else{
                    this.style.backgroundColor = "grey";
                    this.b = false;
                }
            }
    }(tb); 
    return btn;            
}
o.mousedown = function(ctx,x,y){
    o.s = x + ":" + y;
    o.x = x;
    o.y = y;    
    for(i in o.listMousedown){
        o.listMousedown[i].mousedown(x,y);
    }
};
o.ftnTimer = function(ctx,w,h){ 
    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = "grey";
    ctx.fillRect(0,0,w,h);
 
    o.text(ctx,"xd--" + Date(),15,20);   

    o.draw(ctx);
};
o.text = function(ctx,txt,x,y){ 
    ctx.font= 12 + "px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText(txt, x,y); 
};
o.rect = function(ctx,x,y,w,h,c){ 
    ctx.fillStyle = c;
    ctx.fillRect(x,y,w,h); 
};
    o.uiCards = function(_p,_c){  
        _p.style.overflow = "auto";        
        var cardV = blo0.blDiv(_p,"id_4_cardV","cardV",blGrey[2]);
        cardV.style.width = 20*111 +"px";
        cardV.style.height = "50px";
        cardV.style.backgroundColor = "lightblue";
        cardV.style.float = "left";
    };
    o.uiColum = function(ui){           
        var s = '<div class="w3-col s3 w3-green w3-center"><p>s6</p></div>';
        s+='<div class="w3-col s9 w3-dark-grey w3-center" id="uiRight">   </div>';
        var v1 = blo0.blDiv(ui,ui.id+"v1",s,blGrey[2]);
       
        o.addClass(v1,"w3-row"); 
        var r = bl$("uiRight");  
        o.uiCards(r,"red");  
    };
    o.addClass = function (d,cn) {        d.classList.add(cn);    };
      

    var b = bl$("btnStoryBoard");    
    o.addClass(b,"w3-button"); 
    o.addClass(b,"w3-blue"); 
 

    var b = bl$("btnPlayground");    
    o.addClass(b,"w3-button"); 
    o.addClass(b,"w3-green"); 

    var b = bl$("btnServer");    
    o.addClass(b,"w3-button"); 
    o.addClass(b,"w3-brown"); 