var v = bl$("id_4_div_i4_c3_blrTest1");
var _s = new CSample3(); 
var _btn = v.getBtn(2);
_btn.value = _s.getValue();
_btn.click();

function CSample3 (){
    var _v = "CSample3_bv0.133";
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
            this.blrI3 = function(b,d){blo0.blLoadGhIssue("jeremyjia","Games",3,b,d);}
            this.blrMakeScript = function(b,d){blo0.blLoadGhIssue("jeremyjia","Games",2,b,d);}
            this.blrString2JpSVG = function(b,d){blo0.blLoadGhIssue("jeremyjia","Games",724,b,d);} 
        }
    };
}