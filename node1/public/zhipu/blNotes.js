
var _notes1 = function(lsNotes,x,y,dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id){    
        const _getNoteId = function(c){
            var sID = "";
            if(c=='1'|| c=='2'|| c=='3'|| c=='4'|| c=='5'|| c=='6'|| c=='7'){
                sID = "shuzi_c_" + c;
            }
            else if(c=='|'){
                sID = "xiaojiexian";
            } 
            else if(c=='-'){
                sID = "yanyinfu";
            }
            else{
                sID = "yingao_di";
            }
            return sID;
        }
        var s = "";
        s += _makeText("notes: v0.13",111, 11,"yellow");
        var l = lsNotes;

        for(i in l){            
            var idNote = _getNoteId(l[i][0]);
            s += _use_shuzi_by_id(idNote,x + i*dx,y);  
          
            var nt = l[i].split(',');
 

            if(nt.length>1){
                for(var j = 0; j < (nt.length -1);j++){
                    s += _use_yingao_by_id("yingao_di",x + i*dx,y + j*8);
                }
            }
        }
        return s;
}