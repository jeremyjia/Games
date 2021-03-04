const tag = "[ws/server4_i201.js_v0.31] ";
const l = require('../logger');
l.tag(tag); 
const eo = {};
 
eo.toDo = function(result,clientList){  
    if (result.method === "M_i_201") {  
        l.tag1(tag,"date="+Date());
        const payLoad = {
            "method"        : "M_i_201", 
            "data"           : "data4-201"
        }  
        
        var b = false;
        var cl = clientList;
        for(i in cl){
            if(!cl[i].isClosed )
            {
                if(i!="undefined")
                {
                   if(i==result.toClientId || "all"==result.toClientId){
                        cl[i].connection.send(JSON.stringify(payLoad));
                        b = true;
                   }     
                } 
            }
        }         
    }
}
module.exports = eo;