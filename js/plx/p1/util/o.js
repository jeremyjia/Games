function CP1Util (){
    var _v = "CP1Util_v0.25";
    var _list4Cards = [];
    
    this.listCards = function(){ return _list4Cards;}
    this.getV = function(){return _v;}
    this.text = function(ctx,txt,x,y){ 
        ctx.font= 12 + "px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.fillText(txt, x,y); 
    };
    this.status = function(me){   
        var d = bl$("id_4_vStatus");
        d.innerHTML = o.getV() + " : " + blo0.blTime(0);
        var md = blo0.blMDiv(d,d.id+"md","o._status "+_v+":"+me.style.backgroundColor,222,11,555,100,"lightgreen"); 
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
            bv.style.color="white";
            bv.onclick = function(_this){
                return function(){
                    var uiPG = bl$("id_mdiv_4_playground");
                    uiPG.inf.click = _this.innerHTML;
                }
            }(bv);
            if(i=="text" || i=="c"){
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
            else if(i=="toDraw"){
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
    this.newObj = function(type,left,top,right,bottom,size,color){
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
    this.addCard= function(_ls){
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
            b.inf.version = "0.0.3";
            b.inf.x = 17;
            b.inf.y = 80;
            b.inf.w = 1920;
            b.inf.h = 1080;
            b.inf.music = o.music;//"1.mp3";
            b.inf.duration = o.duration;
            b.inf.rate = "1";
            b.inf.objects = [];
            b.inf.c = "skyblue";
            b.inf.text = "Card.txt"; 
          
            o.AddObj2Frame(b.inf.objects,o.newObj("circle",111,111,222,222,5,"red"));
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
                    var _l = _o.listCards();
                    for(i in _l){
                        if((_this.No-1)==i){
                            _l[i].style.backgroundColor = "yellow";
                            _o.status(_this);
                        }
                        else{
                            _l[i].style.backgroundColor = "grey";
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
                    var c = _this.inf.c;
                    var s = "o.bPlay: " + o.bPlay ;
                    s += " o.list2draw.length=" + o.list2draw.length;
                    s += ": " + o.curCard + "/" + o.listCards().length;
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
    }(_list4Cards);
}
 
var o = new CP1Util();

o.music = "1.mp3";
o.duration = 120;
o.x = 50;
o.y = 30;
o.s = "o.s";
o.s1 = "s1:";
o.list2draw = [];
o.listMousedown = [];
o.listMouseup = [];
o.listMousemove = [];
o.curCard = 0;
o.bPlay = false;

o.AddFrame2Script = function(oScript,oFrame){
    oScript.request.frames.push(oFrame);
}
o.AddObj2Frame = function(ls,oObj){ 
    ls.push(oObj);
}

o.newScript = function(v,w,h,m,r){ 
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
o.newFrame = function(number,time,backgroundColor){
    var r = {};
    r.number = number;
    r.time = time;
    r.objects = [];
    r.backgroundColor = backgroundColor;
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
o.getServerFiles = function(tb,v,ft,fCallBack){o._getServerFiles(tb,v,ft,fCallBack);}
o._getServerFiles = function(tb,v,ft,fCallBack){
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
                    bf.onclick = function(_this,_dbg,_me,_fCallBack){
                        return function(){    
                            _dbg.innerHTML = _me + " : " + blo0.blTime(0) ; 
                            o.makeINF(_this,_me,_fCallBack);
                            o.status(_this);
                        }
                    }(bf,_v.dbg,ro.resource[i],fCallBack);
                }
            }
            var url = 'http://localhost:8080/getResourceOnServer?filetype='+_ft;
            blo0.blAjx(w,url);
        }
    }(v,ft);
}
o.makeINF = function(obj,fileName,fCallBack){
    if(fCallBack){
        fCallBack(obj,fileName);
    }
    obj.inf.file = fileName; 
    var a = fileName.split(".");
    obj.inf.n = a.length;
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
                blo0.blAjx(w,"http://localhost:8080/image/json2video?script="+fileName + "&video=" + a[0] +".mp4");
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
    var _l = o.listCards(); 
    _l[o.curCard-1]._2_draw(ctx);
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
o.regMouseup = function(user){
    o.listMouseup.push(user);
}
o.regMousemove = function(user){
    o.listMousemove.push(user);
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

o.mouseup = function(ctx,x,y){
    o.s = x + ":" + y;
    o.x = x;
    o.y = y;    
    for(i in o.listMouseup){
        o.listMouseup[i].mouseup(x,y);
    }
};
o.mousemove = function(ctx,x,y){
    o.s = x + ":" + y;
    o.x = x;
    o.y = y;    
    for(i in o.listMousemove){
        o.listMousemove[i].mousemove(x,y);
    }
};

o.ftnTimer = function(ctx,w,h){ 
    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = "grey";
    ctx.fillRect(0,0,w,h);
 
    o.text(ctx, o.getV() + " :: xd--" + Date(),15,20);   

    o.draw(ctx);
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