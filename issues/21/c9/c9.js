var s = "i21c9_v0.12";
  s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/21/c9/c9.js'"
  s += " style='color:blue;'";		s +=">"; s += " c9.js* ";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c9/c9.js'"
  s += " style='color:green;'";		s +=">"; s += " c9.js ";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c9/index.html'"
  s += " style='color:brown;'";		s +=">"; s += " index.html";

var d = blo0.blMD("id_4_MDiv_I21_C9", s,    300,100,500,400, "lightgreen"); 
d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
var ts = document.getElementsByTagName('textarea');

var x= {}; 
x.blrYoutubeSubtitle2Srt = function(b,d){ 
 var v1 = blo0.blDiv(d,"id_4_v1",blo0.blMakeScript(),blGrey[0]);
 var v2 = blo0.blDiv(d,d.id+"v2","v2","green"); 
 var s1 = ts[0].value;
 var s2 = s1.split("\n");
 var sr = "";
 for(var i = 0; i<s2.length; ){
    s2[i] = "00:" + s2[i] + ",000  --> 00:" + s2[i+2] + ",000";    
    i++;i++;
 }
 var n=0;
 for(var i = 0; i<s2.length;i++,i++ ){
    n++;
    sr+= n;
    sr+= "\n";
    sr+= s2[i];
    sr+= "\n";
    sr+= s2[i+1];
    sr+= "\n";
    sr+= "\n";
 }
 ts[0].value = sr;
}
x.bll1 = "-1-";
x.blrTest = function(b,d){ 
 var ls = blo0.blTags(bl$("blrF1Div").innerHTML,"DIV"); 
 blo0.blShowObj2Div(d,ls);
 _on_off_div(b,d);
}
x.bll1 = "-1-";
x.blr_get_blog_i6702_1_txt = function(b,d){ 
 var url = "https://littleflute.github.io/blog/i/i6702/1.txt"; 
 b._2do = function(txt){ ts[0].value =  txt};
 blo0.blAjx(b,url);
}

blo0.blShowObj2Div(d.v,x);
   
_on_off_div(null,d);