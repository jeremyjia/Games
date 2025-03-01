const C4UI = function(id,bs){  
    const _md = blo0.blMD(id,"C4UI:" + id,333,50,500,400,"gray");
    _md.makeUI = function(){
        const tb = blo0.blDiv(_md,_md.id+"tb","tb","gray");
        const v = blo0.blDiv(_md,_md.id+"v","v","lightblue");
        const vsb = blo0.blSandBox(_md);
        var n = 0;
        for(i in bs){
            n++;
            var btn = blo0.blBtn(tb,tb.id+bs[i].id,bs[i].name,bs[i].color);
            btn.style.float = bs[i].float;
            btn.onclick = function(_b,_v,_i){
                return function(){
                    bs[_i].click(_b,_v,vsb); 
                }
            }(btn,v,i)
        }
    }
    return _md;

}

const initTest = function(){
    const bar = bl$("ID4TestBar");
    const bt1 = blo0.blBtn(bar,bar.id+"bls2vTest","bls2vTest","gray");
    const bt2 = blo0.blBtn(bar,bar.id+"mp3lrc2blsTest","mp3lrc2blsTest","gray");
    bt2.onclick = function(){
    
    bt1.onclick = function(){
        if(!this.md){
            const btns = [
                {
                    "id":1,
                    "name":"test1",
                    "color": "skyblue",
                    "float": "left",
                    "click":function(_b,_v,vsb){
                        _v.innerHTML = this.name;
                        
                        var url = "http://localhost:3001/bls2v?bls=https://littleflute.github.io/Games/Spring/script/video21.json"; 
                        this._2do = function(txt){        
                            vsb.ta.value = txt;     
                            blo0.blLink(_v,"id4V","video",JSON.parse(txt).vFile,"blue");   
                        };
                        blo0.blAjx(this,url);
                    }
                },
                {
                    "id":2,
                    "name":"test2",
                    "color": "cyan",
                    "float": "left",
                    "click":function(_b,_v,vsb){
                        _v.innerHTML = this.name;
                        
                        var url = "http://localhost:3001/bls2v?bls=http://localhost:3001/bls/v1.json"; 
                        this._2do = function(txt){        
                            vsb.ta.value = txt;     
                            blo0.blLink(_v,"id4V","video",JSON.parse(txt).vFile,"blue");   
                        };
                        blo0.blAjx(this,url);
                    }
                },
            ]            this.nClick = 0

            this.md = new C4UI("id4_bls2v",btns);
            this.md.makeUI();        
        }

        this.nClick++;
        this.innerHTML = "bls2vTest:" + this.nClick;
        
        _on_off_div(this,this.md);
    }
    
    bt2.onclick = function(){
        if(!this.md){
            const btns = [
                {
                    "id":1,
                    "name":"test1",
                    "color": "skyblue",
                    "float": "left",
                    "click":function(_b,_v,vsb){
                        _v.innerHTML = this.name;
                        
                        var url = "http://localhost:3001/bls2v?bls=https://littleflute.github.io/Games/Spring/script/video21.json"; 
                        this._2do = function(txt){        
                            vsb.ta.value = txt;     
                            blo0.blLink(_v,"id4V","video",JSON.parse(txt).vFile,"blue");   
                        };
                        blo0.blAjx(this,url);
                    }
                },
                {
                    "id":2,
                    "name":"test2",
                    "color": "cyan",
                    "float": "left",
                    "click":function(_b,_v,vsb){
                        _v.innerHTML = this.name;
                        
                        var url = "http://localhost:3001/bls2v?bls=http://localhost:3001/bls/v1.json"; 
                        this._2do = function(txt){        
                            vsb.ta.value = txt;     
                            blo0.blLink(_v,"id4V","video",JSON.parse(txt).vFile,"blue");   
                        };
                        blo0.blAjx(this,url);
                    }
                },
            ];
            this.nClick = 0;

            this.md = new C4UI("mp3lrc2blsTest",btns);
            this.md.makeUI();        
        }

        this.nClick++;
        this.innerHTML = "mp3lrc2blsTest:" + this.nClick;
        
        _on_off_div(this,this.md);
    }



}();