const tag = "[ws/server4_i201.js_v0.42] ";
const l = require('../logger');
l.tag(tag); 
const eo = {};
var suits = ["spades", "hearts", "clubs", "diams"];
var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
function buildCards() {
    cards = [];
    for (s in suits) {
      var suitNew = suits[s][0].toUpperCase();
      for (n in cardFace) {
        var card = {
          suit: suits[s],
          num: cardFace[n],
          cardValue: parseInt(n) + 2,
          icon: suitNew
        }
        cards.push(card);
      }
    } 
  }

eo.toDo = function(result,clientList){   
    if (result.method === "M_i_201") {  
        
        buildCards();

        const payLoad = {
            "method"        : "M_i_201", 
            "data"          : cards
        }  
         
        var cl = clientList;
        for(i in cl){
            cl[i].connection.send(JSON.stringify(payLoad));  
        }         
    }
}
module.exports = eo;