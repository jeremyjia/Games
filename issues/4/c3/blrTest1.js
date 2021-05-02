

var v = bl$("id_4_div_i4_c3_blrTest1");
v.b1 = blo0.blBtn(v,v.id+"b1","b1",blGrey[0]);
v.b1.onclick = function(){
    var ta = bl$("id_4_ta_blrRunJS");
    ta.value = this.id;
}

v.b2 = blo0.blBtn(v,v.id+"b2","b2",blGrey[0]);
v.b2.onclick = function(){
    var ta = bl$("id_4_ta_blrRunJS");
    ta.value = this.id;
}

v.b3 = blo0.blBtn(v,v.id+"b3","b3",blGrey[0]);
v.b3.onclick = function(){
    var ta = bl$("id_4_ta_blrRunJS");
    ta.value = "alert(3);";
}
