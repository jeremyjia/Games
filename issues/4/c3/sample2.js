var v = bl$("id_4_div_i4_c3_blrTest1");
var _ss = new CVoa2Video(); 
var _btn = v.getBtn(1);
_btn.value = _ss.getValue();
_btn.click();


function CVoa2Video (){
    var _v = "CVoa2Video_v0.33";
    var fn = ["blrf1","blrf2"];
    var fb = [];
    this.getValue = function(){
        var s = "// ";
        s += _v;
        s += "\n";
        s += "var os1 ={};\n";
        for(i in fn){
            s += "os1."+fn[i] + "=" + fb[i] + "\n";
        }
        s += "var run="+_run;
        s += "\n";
        s += "run(os1);";
        return s;
    }

    var f1 = function(b,d){
        d.innerHTML = b.id;
    }
    fb.push(f1);
    
    var f2 = function(b,d){
        var url = "https://learningenglish.voanews.com/z/3521";
        var w = {};
        w._2do = function(txt){
            d.innerHTML = txt;
        }
        blo0.blAjx(w,url);
    }
    fb.push(f2);
    
    var _run = function (_o2show){
        var d = blo0.blMD("id_i4_c3_CVoa2Video", "CVoa2Video",    555,100,500,400, "lightgreen"); 
        d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
        blo0.blShowObj2Div(d.v,_o2show);        
        _on_off_div(null,d);
    };
}