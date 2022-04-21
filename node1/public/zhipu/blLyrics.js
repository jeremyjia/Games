var _lyrics1 = function(lsLyrics,x,y,dx,cbFun){
    var s = "";
    s += cbFun("lyrics: v0.12",111, 55,"blue");
    var l = lsLyrics.length;
    for(var i = 0; i<l;i++){
      s += cbFun(lsLyrics[i],x +  i*dx , y,"blue");
    }
    return s;
}