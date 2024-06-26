var tag_storyBoard = "storyBoard.js_bv0.135";
var tb = bl$("id_p1_tb"); 

tb.btnStoryBoard = blo0.blBtn(tb,"btnStoryBoard","storyBoard",blGrey[2]);
tb.btnStoryBoard.style.float = "left";

tb.btnStoryBoard.onclick = function(){
   if(!this.sb)  this.sb = new CStoryBoard(btn4p1.v);
   this.sb.show(this);
}

function CStoryBoard(parentDiv){

    var v = tag_storyBoard;
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
                _this.inf.v = "v0.12";
                _this.inf.w = 1920;
                _this.inf.h = 1080;
                _this.inf.music = "1.mp3";
                _this.inf.rate = "1";
                _this.inf.superObjFile = "firework.js";//"so646a.js";
                
                _this.inf2JSON = function(_btn){
                    return function(){
                        var listCards = o.listCards();
                        _btn.inf.n = listCards.length;
                        var r = o.newScript(_btn.inf.v,
                                _btn.inf.w,
                                _btn.inf.h,
                                _btn.inf.music,
                                _btn.inf.rate); 
                        var n=0;
                        for(i in listCards){                                                    
                            n++;
                            
                            var f = o.newFrame(listCards[i].inf.index,listCards[i].inf.duration,
                                listCards[i].inf.c
                                );
                            f.objects = listCards[i].inf.objects;
                            o.AddFrame2Script(r,f);     
                            
                            
                        } 
                        var so = {
                            "type": "javascript",
                            "frameRange": "(1,1250)",
                            "attribute": {
                                "script": _btn.inf.superObjFile,
                                "function": "animateFrame",
                                "start": 1
                            },
                            "layer": 1
                        };

                        o.addSuperObj2Script(r,so);
                        var s = JSON.stringify(r); 
                        return s;
                    }
                }(_this);
                _this.inf.makeBLS = function(_btn){
                    return function(v1){        
                        var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                        vta.innerHTML = "";
                        vta.v1 = blo0.blDiv(vta,vta.id+"v1","v1" ,blGrey[1]); 
                        vta.v2 = blo0.blDiv(vta,vta.id+"v2","v2" ,blGrey[2]); 
        
                        var ta = blo0.blTextarea(vta.v1,vta.v1.id+"ta","ta","lightgreen");
                        ta.style.width = 100 + "%";
                        ta.style.height = "130px";
                        ta.value = _btn.inf2JSON();
        
                        vta.v2.saveAsBLS = blo0.blBtn(vta.v2,vta.v2.id+"b1","saveAsBLS",blGrey[0]);
                        vta.v2.saveAsBLS.onclick = function(){ 
                            var data = ta.value;
                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                                if(this.readyState === 4) {
                                    var _this_vta = vta;
                                    if(!_this_vta.v3){
                                        _this_vta.v3 = blo0.blDiv(_this_vta.v2,_this_vta.v2.id+"v3","v3",blGrey[3]);
                                        var btnMakeMP4 = blo0.blBtn(_this_vta.v2,_this_vta.v2.id+"btnMakeMP4","makeMP4",blGrey[0]);
                                        var v4MP4 = blo0.blDiv(_this_vta.v2,_this_vta.v2.id+"v4MP4","v4MP4",blGrey[4]);
                                        btnMakeMP4.onclick = function(_v4MP4,_url){
                                            return function(){
                                                var w = {};
                                                w._2do = function(txt){
                                                    _v4MP4.innerHTML = txt;
                                                }
                                                blo0.blAjx(w,_url);                                                                         
                                            }         
                                        }(v4MP4,"http://localhost:8080/image/json2video?script=wholeStory" + ".json&video=wholeStory" +".mp4");
                                    }
                                    var s = "<a target='_blank' href='http://localhost:8080/wholeStory";
                                    s += ".json'>wholeStory"+".json</a>";

                                    _this_vta.v3.innerHTML = s;
                                }	
                            });
                            xhr.open("POST", "http://localhost:8080/json?fileName=wholeStory.json");
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
                for(var i = 0; i < 5; i++ ){o.addCard(this);}
            }
            tb.btnAdd10Cards = blo0.blBtn(tb,"id_4_btnAdd10Cards","+10",blGrey[2]);
            tb.btnAdd10Cards.style.float="left";
            tb.btnAdd10Cards.onclick = function(){                
                for(var i = 0; i < 10; i++ ){o.addCard(this);}
            }
            tb.btnAdd100Cards = blo0.blBtn(tb,"id_4_btnAdd100Cards","+100",blGrey[2]);
            tb.btnAdd100Cards.style.float="left";
            tb.btnAdd100Cards.onclick = function(){
                for(var i = 0; i < 100; i++ ){o.addCard(this);}
            } 
            
            tb.blAddCard = function (_inBtn){
                o.addCard(_inBtn);
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
