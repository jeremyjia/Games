var v = bl$("id_4_div_i4_c3_blrTest1");
var _s = new CSample3(); 
var _btn = v.getBtn(2);
_btn.value = _s.getValue();
_btn.click();


function CSample3 (){
    var _v = "CSample3_v0.23";
    this.getValue = function(){
        var s = "// ";
        s += _v;
        s += "\n";
        s += "var os1 ={};\n";
        s += "os1.run="+_fnRun;
        s += "\n";
        s += "os1.run();";
        return s;
    }

    var _fnRun = function (){
        var d = blo0.blMD("id_i4_c3_CSample3", "CSample3",    555,100,500,400, "lightgreen"); 
        d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        var blse = new CBlScritpEditor();
        blo0.blShowObj2Div(d.v,blse);        
        _on_off_div(null,d);

        function CBlScritpEditor(){
            this.blrMakeMp4 = function(b,d){

            }
            this.blrMakeScript = function(b,d){

            }
        }
    };


}