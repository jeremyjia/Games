var v = bl$("id_4_div_i4_c3_blrTest1");
var _s = new CSample3(); 
var _btn = v.getBtn(2);
_btn.value = _s.getValue();
_btn.click();

function CSample3 (){
    var _v = "CSample3_bv0.112";
    this.getValue = function(){
        var s = "// ";
        s += _v;
        s += "\n";
        s += "var os1 ={};\n";
        s += "os1.run="+_fnRun;
        s += "\n";
        s += "os1.run('"+_v+"');";
        return s;
    }

    var _fnRun = function (s){
        var d = blo0.blMD("id_i4_c3_CSample3",s,555,100,500,400,"gray"); 
        if(!d.v){
            d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
            var blse = new CBlOnlineEditor();
            blo0.blShowObj2Div(d.v,blse);                
            bl$("blrString2JpSVG").click();             
            bl$("blrMakeScript").click();
        }
        _on_off_div(null,d);

        function CBlOnlineEditor(){
            this.blrString2JpSVG = function(b,d){_loadIssue(724,b,d);} 
            this.blrMakeScript = function(b,d){_loadIssue(2,b,d);}

            const _loadIssue = function(i,b,d){
                if(!d.v){
                    d.tb = blo0.blDiv(d,d.id+s+"tb","i="+i,"gray");
                    d.v1 = blo0.blDiv(d,d.id+s+"v1","v1","lightblue");
                    d.v2 = blo0.blDiv(d,d.id+s+"v2","-","gray");
                    b.style.float = "left";

                    const btnReflash = blo0.blBtn(d.tb,d.tb.id+"btnReflash","reflash","gray");
                    btnReflash.style.float = "right";
                    btnReflash.onclick = function(){
                        d.i = blo0.blGetGithubIssueByNumber("jeremyjia","Games",i,function(o){
                            d.o = o;
                            blo0.blShowObj2Div(d.v1,o);
                        });
                    }
                    const btnBody = blo0.blBtn(d.tb,d.tb.id+"btnBody","body","gray");
                    btnBody.style.float = "right";
                    btnBody.onclick = function(){
                        d.v1.innerHTML = btnBody.id;
                        var tb = blo0.blDiv(d.v1,d.v1.id+"tb","tb","lightgray"); 
                        var v = blo0.blDiv(d.v1,d.v1.id+"v","v","gray");
                        const btnCs = blo0.blBtn(tb,tb.id+"btnCs","Cs","lightblue");
                        btnCs.style.float = "left";


                        btnCs.onclick = function(){  
                            v.innerHTML = this.id;
                            
                            var ta = blo0.blGetTa();
                            var tb1 = blo0.blDiv(v,v.id+"tb1","tb1","gray");  
                            var v2 = blo0.blDiv(v,v.id+"v2","v2","lightblue");  
                            var tb2 = blo0.blDiv(v2,v2.id+"tb2","tb2","lightgray");  
                            d.i.cs(function(o){
                                for(j in o){
                                    const btn = blo0.blBtn(tb1,tb1.id+j,j,"gray");
                                    btn.style.float = "left";
                                    const btn2 = blo0.blBtn(tb2,tb2.id+j,j,"green");
                                    btn2.style.float = "left";
                                    
                                    btn.btn2 = btn2;
                                    btn.code = JSON.parse(o[j].body);
                                    btn.cid  = o[j].id;
                                    btn.save2gh = function(){
                                        if( typeof updateGitHubComment == "function"){  
                                            updateGitHubComment(this.cid,this.code); 
                                            var b = bl$(this.btn2.id); 
                                            b.onclick = function(_code){
                                                var s = "var f = " + _code;
                                                eval(s);
                                                return f;
                                            }(this.code);
                                            ta.status (this.id + ": save to i=" + i+ " : c=" + j + " cid="+this.cid);
                                        }
                                        else{
                                            ta.status (this.id + ": can't find function updateGitHubComment");
                                        }
                                    }

                                    btn.onclick = function(_thisBtn,_j){
                                        return function(){
                                            ta.co = _thisBtn;
                                            ta.value = _thisBtn.code;
                                        }
                                    }(btn,j)

                                    
                                    btn2.onclick = function(_thisBtn2,_j){
                                        return function(){ 
                                            ta.value = _thisBtn2.id;
                                        }
                                    }(btn2,j)
                                }
                            });
                        }
                    }
                }
                _on_off_div(b,d.v1);
                b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
            }
        }
    };
}