const tag = "[ws/index.js_v0.233]"; 
const http = require("http");
const mb = require("../old/js49/ws/msgBox.js");
const l = require('../logger');
l.tag(tag);  
 
const clientList = {};
const gameList = {};


const websocketServer = require("websocket").server
const httpServer = http.createServer();

const wsServer = new websocketServer({ "httpServer": httpServer});

wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"))

    connection.on("close", () =>{
        for(i in clientList){
            if(clientList[i].connection == connection){
                console.log("-------------closed: clientId= " + i);
                clientList[i].isClosed = true;
            }
        }
         console.log("closed! " +Date());
    });

    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
         

        //I have received a message from the client
        //a user want to create a new game
        if (result.method === "create") {
            const clientId = result.clientId;
            const gameId = guid();
            gameList[gameId] = {
                "id": gameId,
                "balls": 20,
                "clients": []
            }

            const payLoad = {
                "method": "newGame",
                "game" : gameList[gameId]
            }
 
            //const con = clientList[clientId].connection;
            //con.send(JSON.stringify(payLoad));

            var cl = clientList;
            for(i in cl){
                if(!cl[i].isClosed )
                {
                    if(i!="undefined") cl[i].connection.send(JSON.stringify(payLoad));
                }
            }
        }

        if (result.method === "M_i_201") {  
            l.tag1(tag,"------------------- " + result.clientId);

            const payLoad = {
                "method": "M_i_201",
                "data": "data_4_201"
            }
            game.clients.forEach(c => {
                clientList[c.clientId].connection.send(JSON.stringify(payLoad))
            })
        }
        l.tag1(tag,mb);
        const ch = require("../old/js49/ws/chatHandle.js");
        ch.toDo(result,clientList,mb);
        
        const s201 = require("./server4_i201.js");
        s201.toDo(result,clientList);

        //a client want to join
        if (result.method === "join") { 

            const clientId = result.clientId;
            const gameId = result.gameId;
            const game = gameList[gameId];
            if (game.clients.length >= 3) 
            {
                //sorry max players reach
                return;
            }
            const color =  {"0": "Red", "1": "Green", "2": "Blue"}[game.clients.length]
            game.clients.push({
                "clientId": clientId,
                "color": color
            })
            //start the game
            if (game.clients.length === 3) updateGameState();

            const payLoad = {
                "method": "join",
                "game": game
            }
            
            game.clients.forEach(c => {
                clientList[c.clientId].connection.send(JSON.stringify(payLoad))
            })
        }
        //a user plays
        if (result.method === "play") {             
            const gameId = result.gameId;
            const ballId = result.ballId;
            const color = result.color;
            let state = gameList[gameId].state;
            if (!state)
                state = {}
            
            state[ballId] = color;
            gameList[gameId].state = state;            
        }

    })


    const query = request.resourceURL.query;
     console.log(tag + " userID = "+  query.userID);
 
    const clientId = query.userID;
    clientList[clientId] = {
        "connection":  connection,
        "isClosed": false
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId  
    }    
    connection.send(JSON.stringify(payLoad));  
    l.tag1(tag,"to check msg ...");   
    mb.checkMsg(clientId,clientList);
}) 


function updateGameState(){ 
    //{"gameid", fasdfsf}
    for (const g of Object.keys(gameList)) {
        const game = gameList[g]
        const payLoad = {
            "method": "update",
            "game": game
        }

        game.clients.forEach(c=> {
            clientList[c.clientId].connection.send(JSON.stringify(payLoad))
        })
    }

    setTimeout(updateGameState, 500);
}



function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();


exports.wsRun = function(port){
    httpServer.listen(port, () => {
        console.log( Date() + " ___________ websocket listening ... on " + port);
        const bc = require("../old/js49/ws/broadCast.js");
        bc.run(clientList); 
    });
} 