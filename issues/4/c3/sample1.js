var v = bl$("id_4_div_i4_c3_blrTest1");
var _s1 = new CSample1(); 
var _btn = v.getBtn(0);
_btn.value = _s1.getValue();
_btn.click();


function CSample1 (_id){
    var _v = "CSample1_v0.25";
    this.getValue = function(){
        var s = "// ";
        s += _v;
        s += "\n";
        s += "var os1 ={};\n";
        s += "os1.run="+_f1;
        s += "\n";
        s += "os1.run(os1,'" + _v + "');";
        return s;
    }

    var _f1 = function (_o2show,_uiName){
        var d = blo0.blMD(_uiName, _uiName,555,100,500,400, "lightgreen"); 
        d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        blo0.blShowObj2Div(d.v,_o2show);        
        _on_off_div(null,d);
    };
}