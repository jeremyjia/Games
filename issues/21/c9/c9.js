var d = blo0.blMD("id_1aaa", s,    300,100,500,400, "lightgreen"); 
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