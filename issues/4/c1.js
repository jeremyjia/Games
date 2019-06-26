var s = "id_mdiv_4_issue4_c1: v0.0. 12 - "; 
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c1.js'"
s += " style='color:blue;'";		s +=">"; s += "c1.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c1.js'"
s += " style='color:green;'";		s +=">"; s += "c1.js ";
var d = blo0.blMDiv(document.body,"id_mdiv_4_issue4_c1", s,700,100,500,400, blGrey[5]);  
for(var i = 0; i<10;i++){
    var v = blo0.blDiv(d, d.id+ "v" + i, i, blGrey[0]);
    for(var j = 0; j<10;j++){
        var b = blo0.blBtn(v, v.id + "b" + j, j, blGrey[3]);
    }
}

_on_off_div(this,d);