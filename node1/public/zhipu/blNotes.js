
var _notes = function(lsNotes,x,y,dx,cbFun){
        var s = "";
        s += cbFun("notes: v0.11",111, 11,"yellow");
        var l = lsNotes;
        for(i in l){
          s += cbFun(l[i],x +  i*dx , y,"brown");
        }
        return s;
}