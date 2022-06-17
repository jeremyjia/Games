
    var _notes = function(lsNotes,x,y,dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id){     
        
        var s = "";
        s += _makeText("notes: xv0.221",222, 11, 36, "blue");
        var l = lsNotes;

        for(i in l){            
            var idNote = "";
            if(l[i][0]=='('){
                idNote = blo0._getNoteId(l[i][1]);
                s += _use_shuzi_by_id("bl_lianYinXian_1",x + i*dx -30,y-81);  
            }
            else{
                idNote = blo0._getNoteId(l[i][0]);
            }
            s += _use_shuzi_by_id(idNote,x + i*dx,y);  
          
            var nt = l[i].split(',');
            if(nt.length>1){
                for(var j = 0; j < (nt.length -1);j++){
                    s += _use_yingao_by_id("yingao_di",x + i*dx,y + j*8);
                }
            }

            var nt = l[i].split("'");
            if(nt.length>1){
                for(var j = 0; j < (nt.length -1);j++){
                    s += _use_yingao_by_id("yingao_di",x + i*dx,y - j*8 -28);
                }
            } 

            var fdNt = l[i].split('.');    
            if(fdNt.length>1){
                for(var j = 0; j < (fdNt.length -1);j++){
                    s += _use_yingao_by_id("fudian",x + i*dx,y - j*8);
                }
            }
            var jsNt = l[i].split('/');    
            if(jsNt.length>1){
                for(var j = 0; j < (jsNt.length -1);j++){
                    s += _use_yingao_by_id("jianShi",x + i*dx,y - j*8); 
                }
            }
            var ly = l[i].split('_');    
            if(ly.length>1){
                for(var j = 0; j < (ly.length -1);j++){
                    s += _makeText(ly[j+1],x + i*dx,y + j*24 + 10, 20, "black");
                }
            }
        }
        return s;
}
