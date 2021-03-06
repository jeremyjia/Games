const tag = "[ws/server4_i201.js_v0.51] ";
const l = require('../logger');
l.tag(tag); 
const eo = {};
var suits = ["spades", "hearts", "clubs", "diams"];
var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
var overs = [];
var winCard = -1;
var finished = false;

function buildCards() {
    cards = [];
    overs = [];
    finished = false;
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
        overs.push(0);
      }
    } 
}

function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
      var ii = Math.floor(Math.random() * (x + 1));
      var temp = array[x];
      array[x] = array[ii];
      array[ii] = temp;
    }
    return array;
  }
eo.toDo = function(result,clientList){    
  if (result.method=== "M_i_201") {  
    var a = result.gameAction;
    if(a=="action_4_new_game"){
      buildCards();
      shuffleArray(cards);
      winCard = Math.floor(Math.random() * (52));

      const payLoad = {
          "method"        : "M_i_201", 
          "data"          : cards,
          "over"          : overs
      }         
      var cl = clientList;
      for(i in cl){
          cl[i].connection.send(JSON.stringify(payLoad));  
      }  
    }
    else if(a=="action_4_pick_a_card"){  
      l.tag1(tag,"winCard=" + winCard +" : click ="+ result.index);
      if(finished) return;

      if(winCard==result.index) finished=true;

      overs[result.index] = 1;

      const payLoad = {
            "method"        : "M_i_201", 
            "data"          : cards,
            "over"          : overs
      }         
      var cl = clientList;
      for(i in cl){
            cl[i].connection.send(JSON.stringify(payLoad));  
      }  
    }               
  }
}
module.exports = eo;