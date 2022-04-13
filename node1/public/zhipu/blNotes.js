
var _notes = function(lsNotes,x,y,dx,cbFun){
        var s = "";
        s += cbFun("notes: v0.11",111, 11,"yellow");
        var l = lsNotes;

        for(i in l){
          var nt = l[i].split(',');

          var ii = "";
          if(nt.length>1){
              ii += "[";
              ii += l[i];
              ii += "]";
          }
          else{
            ii += l[i];
          }
          ii +="";
          s += cbFun(ii, x +  i*dx , y,"brown");
        }
        return s;
}