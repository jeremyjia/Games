const d = {};
d.v = "v0.111";
d.nTestNumber = "207";
d.nTest1 = 5;
d.getUserDatas = function(n){
    var os = []; 
    for(var i = 0; i<n; i++){
        var o = {};
        var strUser = "q";
        o.UserName = strUser+i;
        o.Password = strUser+i;
        o.DateOfBirth = i;
        o.EmailAddress = strUser + i + "@group6.io";
        o.AgreeTerms = "No";
        o.ReceiveNews = "No";
        o.IconID = i;
        os.push(o);
    }
    return os;
}
d.getUserDatas1 = function(n){
    var os = []; 
    var now = Date();
    for(var i = 0; i<n; i++){
        var o = {};        
        var strUser = "q_"+now+ "_";
        o.UserName = strUser+i;
        o.Password = strUser+i;
        o.DateOfBirth = i;
        o.EmailAddress = strUser + i + "@group6.io";
        o.AgreeTerms = "No";
        o.ReceiveNews = "No";
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
    },
    {
        "ID": 4,
        "sql": "Drop table MessageBox"
    }
];


d.reqReset_create_tables = [
    {
        "ID": 2,
        "sql": "CREATE TABLE if not exists Group6Users(ReceiveNews varchar(255), AgreeTerms varchar(255),IsVerified varchar(255), VerifyCode varchar(255),UserID varchar(255), UserName varchar(255), Password varchar(255), DateOfBirth varchar(255), IconID int, Coin int, Gem int, FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, is_Active boolean, is_Delete boolean, PRIMARY KEY (UserID), UNIQUE (UserName))"
    },
    {
        "ID": 4,
        "sql": "CREATE TABLE if not exists PendingFriends(RequestID varchar(255),fromID varchar(255),toID varchar(255),status varchar(255), request_time varchar(255),PRIMARY KEY (RequestID))"
    },
    {
        "ID": 6,
        "sql": "CREATE TABLE if not exists Friends(RequestID varchar(255),fromID varchar(255),toID varchar(255), response_time varchar(255),PRIMARY KEY (RequestID))"
    },
    {
        "ID": 8,
        "sql": "CREATE TABLE if not exists MessageBox(MessageID varchar(255),fromID varchar(255),toID varchar(255), time varchar(255),Message varchar(255),PRIMARY KEY (MessageID))"
    }
];

d.resReset = { code: 1 };

d.tables_4_init = [  
    "CREATE TABLE if not exists Group6Users(AgreeTerms varchar(255),IsVerified varchar(255), VerifyCode varchar(255),UserID varchar(255), UserName varchar(255), Password varchar(255), DateOfBirth varchar(255), IconID int, Coin int, Gem int, FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, is_Active boolean, is_Delete boolean, PRIMARY KEY (UserID), UNIQUE (UserName))",
    "CREATE TABLE if not exists PendingFriends(RequestID varchar(255),fromID varchar(255),toID varchar(255),status varchar(255), request_time varchar(255),PRIMARY KEY (RequestID))",
    "CREATE TABLE if not exists Friends(RequestID varchar(255),fromID varchar(255),toID varchar(255), response_time varchar(255),PRIMARY KEY (RequestID))",
    'CREATE TABLE if not exists tb2( Id int, Name varchar(100))', 
    'alter table Group6Users add column ReceiveNews varchar(255)',
    'alter table tb2 add column Age int,add column Address varchar(300)',
    "ALTER TABLE 'Group6Users' MODIFY UserID varchar NOT NULL",
    "ALTER TABLE Group6Users DROP PRIMARY KEY"
];

module.exports = d;
