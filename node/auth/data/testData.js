const d = {};
d.v = "v0.14";
d.getUserDatas = function(n){
    var os = [];
    for(var i = 0; i<n; i++){
        var o = {};
        o.UserName = "u"+i;
        o.Password = "u"+i;
        os.push(o);
    }
    return os;
}
d.getUserID = function(_uName,_ls){
    var id = "id_getUserID_Test";
    for(i in _ls){
        if(_ls[i].UserName==_uName){
            id = _ls[i].UserID;
        }
    }
    return id;
}
d.getReqID = function(_FromID,_ToID,_ls){
    var reqID = "mock_reqID";
    for(i in _ls){
        console.log("---------xdtest------------ " + JSON.stringify( _ls[i]));
        if(_ls[i].fromID==_FromID &&_ls[i].toID==_ToID){
            reqID = _ls[i].RequestID;
        }
    }
    return reqID;
}
d.reqReset1 = [
    {
        "ID": 1,
        "sql": "Drop table Group6Users"
    },
    {
        "ID": 2,
        "sql": "CREATE TABLE if not exists Group6Users(UserID varchar(255), UserName varchar(255), Password varchar(255), Coin int, Gem int, FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, is_Active boolean, is_Delete boolean, PRIMARY KEY (UserID), UNIQUE (UserName))"
    },
    {
        "ID": 3,
        "sql": "Drop table PendingFriends"
    },
    {
        "ID": 4,
        "sql": "CREATE TABLE if not exists PendingFriends(RequestID varchar(255),fromID varchar(255),toID varchar(255),status varchar(255), request_time varchar(255),PRIMARY KEY (RequestID))"
    },
    {
        "ID": 5,
        "sql": "Drop table Friends"
    },
    {
        "ID": 6,
        "sql": "CREATE TABLE if not exists Friends(RequestID varchar(255),fromID varchar(255),toID varchar(255), response_time varchar(255),PRIMARY KEY (RequestID))"
    }
];

d.reqReset_drop_tables = [
    {
        "ID": 1,
        "sql": "Drop table Group6Users"
    },
    {
        "ID": 2,
        "sql": "Drop table PendingFriends"
    },
    {
        "ID": 3,
        "sql": "Drop table Friends"
    }
];
 

d.reqReset_create_tables = [ 
    {
        "ID": 2,
        "sql": "CREATE TABLE if not exists Group6Users(UserID varchar(255), UserName varchar(255), Password varchar(255), Coin int, Gem int, FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, is_Active boolean, is_Delete boolean, PRIMARY KEY (UserID), UNIQUE (UserName))"
    }, 
    {
        "ID": 4,
        "sql": "CREATE TABLE if not exists PendingFriends(RequestID varchar(255),fromID varchar(255),toID varchar(255),status varchar(255), request_time varchar(255),PRIMARY KEY (RequestID))"
    }, 
    {
        "ID": 6,
        "sql": "CREATE TABLE if not exists Friends(RequestID varchar(255),fromID varchar(255),toID varchar(255), response_time varchar(255),PRIMARY KEY (RequestID))"
    }
];
 

d.resReset = { code: -1 };

module.exports = d;