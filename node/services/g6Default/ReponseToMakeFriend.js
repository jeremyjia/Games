const tag = "[g6Default/ReponseToMakeFriend.js_v0.21]";
const rSQL = require('../../sql/SQL.js'); 
const config = require('../../config'); 
const l = require('../../logger');
const ULID = require('ulid');

 l.tag(tag);
 
exports.ReponseToMakeFriend = async function(oBody,resolve,Service){ 
    l.tag1(tag,JSON.stringify(oBody));
    var o = {};
    o.code = 1;
    o.ReqID = oBody.ReqID;
    o.FromID = oBody.FromID;
    o.ToID = oBody.ToID;
    o.str = "...";

    var rTime = Date();
    var sql1 = "UPDATE PendingFriends SET status='" + oBody.status +"' WHERE toID ='" + oBody.ToID+"';";
    var sql2 = "";
    if(oBody.status=="Yes"){      
      sql2 = "INSERT INTO Friends( RequestID,fromID,toID,response_time )VALUES ('";
      sql2 += oBody.ReqID+ "','"+oBody.FromID+"','"+oBody.ToID+"','"+rTime + "')" ;
    }
    var ls = [];
    ls.push(sql1);
    ls.push(sql2);
    await rSQL._2RunSQLList(ls); 
    resolve(Service.successResponse(o));	
   // rSQL._2RunSQL(sql1);        
   // rSQL._2RunSQL(sql2);               
}
