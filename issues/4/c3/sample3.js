var v = bl$("id_4_div_i4_c3_blrTest1");
var _s = new CSample3(); 
var _btn = v.getBtn(2);
_btn.value = _s.getValue();
_btn.click();

function CSample3 (){
    var _v = "CSample3_v0.44";
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
            bl$("blrLoadGHI").click();             
            bl$("blrMakeScript").click();
        }
        _on_off_div(null,d);

        function CBlOnlineEditor(){
            this.blrLoadGHI = function(b,d){_loadIssue(1,b,d);} 
            this.blrMakeScript = function(b,d){_loadIssue(2,b,d);}
            const _loadIssue = function(i,b,d){
                if(!d.v){
                    d.tb = blo0.blDiv(d,d.id+s+"tb","i="+i,"gray");
                    d.v1 = blo0.blDiv(d,d.id+s+"v1","v1","grey");
                    d.v2 = blo0.blDiv(d,d.id+s+"v2","-","gray");
                    b.style.float = "left";

                    const b1 = blo0.blBtn(d.tb,d.tb.id+"b1","b1","gray");
                    b1.style.float = "right";
                    b1.onclick = function(){
                        blo0.blGetGithubIssueByNumber("jeremyjia","Games",1,function(o){;
                            blo0.blShowObj2Div(d.v1,o);
                        });
                    }
                }
                _on_off_div(b,d.v1);
                b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
            }
        }
    };
}