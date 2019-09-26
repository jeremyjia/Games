// file: blCChessBoard.js
// by littleflute
// 2017/11/1 11:46am bjt
"use strict";
var _my_ver = "v0.7.151";

function blClass ()
{  
    this.blScript = function (id,src){
            var r = document.getElementById(id);
            if(!r){
                r = document.createElement("script");
                r.id = id;
            }
            r.src = src; 
            document.body.appendChild(r);
            return r;
    }
    this.blDiv = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("div");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gray";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }
    this.blTextarea = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("Textarea");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gray";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }

    this.blBtn = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("button");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"green";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }
    this.blLink = function (oBoss,id,html,href,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("a");
    	    var t = document.createTextNode(html);
    	    r.setAttribute("href", href);
    	    r.setAttribute("target", "_blank");
            r.id = id; 
    	    r.style.backgroundColor = bkClr?bkClr:"blue";
        }
        r.innerHTML = html; 
        oBoss.appendChild(r);
        return r;
    }

    this.blShowObj2Div = function (oDivBoss,obj)
    {
        
        var oBoss = oDivBoss;
        if(!oBoss) {
           oBoss = document.createElement("div");
           oBoss.id = "divBlShowObj";
           oBoss.style.border = "green 1px solid";
           document.body.appendChild(oBoss);
        } 
        if(!oBoss){
            alert("boss error!");return;
        }
        oBoss.innerHTML = "";
        for(i in obj)
        {
          var b = document.createElement("button");
          b.id = b.innerHTML = i;
          if(i[0]=="b"&&i[1]=="l") b.style.backgroundColor = "yellow";
          oBoss.appendChild(b);
          var d = document.createElement("div");
          d.innerHTML = obj[i];
          d.style.border = "blue 1px solid";
          d.style.backgroundColor = "green";
          d.style.color = "yellow";
          oBoss.appendChild(d);
        }
    }    
    this.blMakeDivMovable = function (elmnt) {
      	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var idHeader = document.getElementById(elmnt.id + "Header");
      	if (idHeader) {
        	/* if present, the header is where you move the DIV from:*/
        	idHeader.onmousedown = dragMouseDown;
      	} else {
        	/* otherwise, move the DIV from anywhere inside the DIV:*/
        	elmnt.onmousedown = dragMouseDown;
      	}

      	function dragMouseDown(e) {
        	e = e || window.event;
        	// get the mouse cursor position at startup:
        	pos3 = e.clientX;
        	pos4 = e.clientY;
        	document.onmouseup = closeDragElement;
        	// call a function whenever the cursor moves:
        	document.onmousemove = elementDrag;
		if (idHeader) {
        		idHeader.innerHTML = pos3 + "," + pos4;
      		}	
      	}

      function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
	
    this.v = _my_ver;
}
//END: function blClass ()


var _position_ver = "v0.0.11";

function binarySearch(vlss, vl) {
  var low = 0;
  var high = vlss.length - 1;
  while (low <= high) {
    var mid = (low + high) >> 1;
    if (vlss[mid][0] < vl) {
      low = mid + 1;
    } else if (vlss[mid][0] > vl) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

var MATE_VALUE = 10000;
var BAN_VALUE = MATE_VALUE - 100;
var WIN_VALUE = MATE_VALUE - 200;
var NULL_SAFE_MARGIN = 400;
var NULL_OKAY_MARGIN = 200;
var DRAW_VALUE = 20;
var ADVANCED_VALUE = 3;

var PIECE_KING = 0;
var PIECE_ADVISOR = 1;
var PIECE_BISHOP = 2;
var PIECE_KNIGHT = 3;
var PIECE_ROOK = 4;
var PIECE_CANNON = 5;
var PIECE_PAWN = 6;

var RANK_TOP = 3;
var RANK_BOTTOM = 12;
var FILE_LEFT = 3;
var FILE_RIGHT = 11;

var ADD_PIECE = false;
var DEL_PIECE = true;

var IN_BOARD_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

var IN_FORT_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

var LEGAL_SPAN = [
                       0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
];

var KNIGHT_PIN_ = [
                              0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,-16,  0,-16,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0, -1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0, -1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0, 16,  0, 16,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,
];

var KING_DELTA = [-16, -1, 1, 16];
var ADVISOR_DELTA = [-17, -15, 15, 17];
var KNIGHT_DELTA = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];
var KNIGHT_CHECK_DELTA = [[-33, -18], [-31, -14], [14, 31], [18, 33]];
var MVV_VALUE = [50, 10, 10, 30, 40, 30, 20, 0];

var PIECE_VALUE = [
  [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  9,  9,  9, 11, 13, 11,  9,  9,  9,  0,  0,  0,  0,
    0,  0,  0, 19, 24, 34, 42, 44, 42, 34, 24, 19,  0,  0,  0,  0,
    0,  0,  0, 19, 24, 32, 37, 37, 37, 32, 24, 19,  0,  0,  0,  0,
    0,  0,  0, 19, 23, 27, 29, 30, 29, 27, 23, 19,  0,  0,  0,  0,
    0,  0,  0, 14, 18, 20, 27, 29, 27, 20, 18, 14,  0,  0,  0,  0,
    0,  0,  0,  7,  0, 13,  0, 16,  0, 13,  0,  7,  0,  0,  0,  0,
    0,  0,  0,  7,  0,  7,  0, 15,  0,  7,  0,  7,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0, 11, 15, 11,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ], [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0, 20,  0,  0,  0, 20,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0, 18,  0,  0, 20, 23, 20,  0,  0, 18,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0, 23,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0, 20, 20,  0, 20, 20,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ], [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0, 20,  0,  0,  0, 20,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0, 18,  0,  0, 20, 23, 20,  0,  0, 18,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0, 23,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0, 20, 20,  0, 20, 20,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ], [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0, 90, 90, 90, 96, 90, 96, 90, 90, 90,  0,  0,  0,  0,
    0,  0,  0, 90, 96,103, 97, 94, 97,103, 96, 90,  0,  0,  0,  0,
    0,  0,  0, 92, 98, 99,103, 99,103, 99, 98, 92,  0,  0,  0,  0,
    0,  0,  0, 93,108,100,107,100,107,100,108, 93,  0,  0,  0,  0,
    0,  0,  0, 90,100, 99,103,104,103, 99,100, 90,  0,  0,  0,  0,
    0,  0,  0, 90, 98,101,102,103,102,101, 98, 90,  0,  0,  0,  0,
    0,  0,  0, 92, 94, 98, 95, 98, 95, 98, 94, 92,  0,  0,  0,  0,
    0,  0,  0, 93, 92, 94, 95, 92, 95, 94, 92, 93,  0,  0,  0,  0,
    0,  0,  0, 85, 90, 92, 93, 78, 93, 92, 90, 85,  0,  0,  0,  0,
    0,  0,  0, 88, 85, 90, 88, 90, 88, 90, 85, 88,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ], [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,206,208,207,213,214,213,207,208,206,  0,  0,  0,  0,
    0,  0,  0,206,212,209,216,233,216,209,212,206,  0,  0,  0,  0,
    0,  0,  0,206,208,207,214,216,214,207,208,206,  0,  0,  0,  0,
    0,  0,  0,206,213,213,216,216,216,213,213,206,  0,  0,  0,  0,
    0,  0,  0,208,211,211,214,215,214,211,211,208,  0,  0,  0,  0,
    0,  0,  0,208,212,212,214,215,214,212,212,208,  0,  0,  0,  0,
    0,  0,  0,204,209,204,212,214,212,204,209,204,  0,  0,  0,  0,
    0,  0,  0,198,208,204,212,212,212,204,208,198,  0,  0,  0,  0,
    0,  0,  0,200,208,206,212,200,212,206,208,200,  0,  0,  0,  0,
    0,  0,  0,194,206,204,212,200,212,204,206,194,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ], [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,100,100, 96, 91, 90, 91, 96,100,100,  0,  0,  0,  0,
    0,  0,  0, 98, 98, 96, 92, 89, 92, 96, 98, 98,  0,  0,  0,  0,
    0,  0,  0, 97, 97, 96, 91, 92, 91, 96, 97, 97,  0,  0,  0,  0,
    0,  0,  0, 96, 99, 99, 98,100, 98, 99, 99, 96,  0,  0,  0,  0,
    0,  0,  0, 96, 96, 96, 96,100, 96, 96, 96, 96,  0,  0,  0,  0,
    0,  0,  0, 95, 96, 99, 96,100, 96, 99, 96, 95,  0,  0,  0,  0,
    0,  0,  0, 96, 96, 96, 96, 96, 96, 96, 96, 96,  0,  0,  0,  0,
    0,  0,  0, 97, 96,100, 99,101, 99,100, 96, 97,  0,  0,  0,  0,
    0,  0,  0, 96, 97, 98, 98, 98, 98, 98, 97, 96,  0,  0,  0,  0,
    0,  0,  0, 96, 96, 97, 99, 99, 99, 97, 96, 96,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ], [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  9,  9,  9, 11, 13, 11,  9,  9,  9,  0,  0,  0,  0,
    0,  0,  0, 19, 24, 34, 42, 44, 42, 34, 24, 19,  0,  0,  0,  0,
    0,  0,  0, 19, 24, 32, 37, 37, 37, 32, 24, 19,  0,  0,  0,  0,
    0,  0,  0, 19, 23, 27, 29, 30, 29, 27, 23, 19,  0,  0,  0,  0,
    0,  0,  0, 14, 18, 20, 27, 29, 27, 20, 18, 14,  0,  0,  0,  0,
    0,  0,  0,  7,  0, 13,  0, 16,  0, 13,  0,  7,  0,  0,  0,  0,
    0,  0,  0,  7,  0,  7,  0, 15,  0,  7,  0,  7,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0, 11, 15, 11,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ],
];

function IN_BOARD(sq) {
  return IN_BOARD_[sq] != 0;
}

function IN_FORT(sq) {
  return IN_FORT_[sq] != 0;
}

function RANK_Y(sq) {
  return sq >> 4;
}

function FILE_X(sq) {
  return sq & 15;
}

function COORD_XY(x, y) {
  return x + (y << 4);
}

function SQUARE_FLIP(sq) {
  return 254 - sq;
}

function FILE_FLIP(x) {
  return 14 - x;
}

function RANK_FLIP(y) {
  return 15 - y;
}

function MIRROR_SQUARE(sq) {
  return COORD_XY(FILE_FLIP(FILE_X(sq)), RANK_Y(sq));
}

function SQUARE_FORWARD(sq, sd) {
  return sq - 16 + (sd << 5);
}

function KING_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 1;
}

function ADVISOR_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 2;
}

function BISHOP_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 3;
}

function BISHOP_PIN(sqSrc, sqDst) {
  return (sqSrc + sqDst) >> 1;
}

function KNIGHT_PIN(sqSrc, sqDst) {
  return sqSrc + KNIGHT_PIN_[sqDst - sqSrc + 256];
}

function HOME_HALF(sq, sd) {
  return (sq & 0x80) != (sd << 7);
}

function AWAY_HALF(sq, sd) {
  return (sq & 0x80) == (sd << 7);
}

function SAME_HALF(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0x80) == 0;
}

function SAME_RANK(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0xf0) == 0;
}

function SAME_FILE(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0x0f) == 0;
}

function SIDE_TAG(sd) {
  return 8 + (sd << 3);
}

function OPP_SIDE_TAG(sd) {
  return 16 - (sd << 3);
}

function SRC(mv) {
  return mv & 255;
}

function DST(mv) {
  return mv >> 8;
}

function MOVE(sqSrc, sqDst) {
  return sqSrc + (sqDst << 8);
}

function MIRROR_MOVE(mv) {
  return MOVE(MIRROR_SQUARE(SRC(mv)), MIRROR_SQUARE(DST(mv)));
}

function MVV_LVA(pc, lva) {
  return MVV_VALUE[pc & 7] - lva;
}

function CHR(n) {
  return String.fromCharCode(n);
}

function ASC(c) {
  return c.charCodeAt(0);
}

var FEN_PIECE = "        KABNRCP kabnrcp ";

function CHAR_TO_PIECE(c) {
  switch (c) {
  case "K":
    return PIECE_KING;
  case "A":
    return PIECE_ADVISOR;
  case "B":
  case "E":
    return PIECE_BISHOP;
  case "H":
  case "N":
    return PIECE_KNIGHT;
  case "R":
    return PIECE_ROOK;
  case "C":
    return PIECE_CANNON;
  case "P":
    return PIECE_PAWN;
  default:
    return -1;
  }
}

function RC4(key) {
  this.x = this.y = 0;
  this.state = [];
  for (var i = 0; i < 256; i ++) {
    this.state.push(i);
  }
  var j = 0;
  for (var i = 0; i < 256; i ++) {
    j = (j + this.state[i] + key[i % key.length]) & 0xff;
    this.swap(i, j);
  }
}

RC4.prototype.swap = function(i, j) {
  var t = this.state[i];
  this.state[i] = this.state[j];
  this.state[j] = t;
}

RC4.prototype.nextByte = function() {
  this.x = (this.x + 1) & 0xff;
  this.y = (this.y + this.state[this.x]) & 0xff;
  this.swap(this.x, this.y);
  var t = (this.state[this.x] + this.state[this.y]) & 0xff;
  return this.state[t];
}

RC4.prototype.nextLong = function() {
  var n0 = this.nextByte();
  var n1 = this.nextByte();
  var n2 = this.nextByte();
  var n3 = this.nextByte();
  return n0 + (n1 << 8) + (n2 << 16) + ((n3 << 24) & 0xffffffff);
}

var PreGen_zobristKeyPlayer, PreGen_zobristLockPlayer;
var PreGen_zobristKeyTable = [], PreGen_zobristLockTable = [];

var rc4 = new RC4([0]);
PreGen_zobristKeyPlayer = rc4.nextLong();
rc4.nextLong();
PreGen_zobristLockPlayer = rc4.nextLong();
for (var i = 0; i < 14; i ++) {
  var keys = [];
  var locks = [];
  for (var j = 0; j < 256; j ++) {
    keys.push(rc4.nextLong());
    rc4.nextLong();
    locks.push(rc4.nextLong());
  }
  PreGen_zobristKeyTable.push(keys);
  PreGen_zobristLockTable.push(locks);
}

function Position() {
  // sdPlayer, zobristKey, zobristLock, vlWhite, vlBlack, distance;
  // squares, mvList, pcList, keyList, chkList;
}

Position.prototype.clearBoard = function() {
  this.sdPlayer = 0;
  this.squares = [];
  for (var sq = 0; sq < 256; sq ++) {
    this.squares.push(0);
  }
  this.zobristKey = this.zobristLock = 0;
  this.vlWhite = this.vlBlack = 0;
};

Position.prototype.setIrrev = function() {
  this.mvList = [0];
  this.pcList = [0];
  this.keyList = [0];
  this.chkList = [this.checked()];
  this.distance = 0;
}

Position.prototype.addPiece = function(sq, pc, bDel) {
  var pcAdjust;
  this.squares[sq] = bDel ? 0 : pc;
  if (pc < 16) {
    pcAdjust = pc - 8;
    this.vlWhite += bDel ? -PIECE_VALUE[pcAdjust][sq] :
        PIECE_VALUE[pcAdjust][sq];
  } else {
    pcAdjust = pc - 16;
    this.vlBlack += bDel ? -PIECE_VALUE[pcAdjust][SQUARE_FLIP(sq)] :
        PIECE_VALUE[pcAdjust][SQUARE_FLIP(sq)];
    pcAdjust += 7;
  }
  this.zobristKey ^= PreGen_zobristKeyTable[pcAdjust][sq];
  this.zobristLock ^= PreGen_zobristLockTable[pcAdjust][sq];
}

Position.prototype.movePiece = function(mv) {
  var sqSrc = SRC(mv);
  var sqDst = DST(mv);
  var pc = this.squares[sqDst];
  this.pcList.push(pc);
  if (pc > 0) {
    this.addPiece(sqDst, pc, DEL_PIECE);
  }
  pc = this.squares[sqSrc];
  this.addPiece(sqSrc, pc, DEL_PIECE);
  this.addPiece(sqDst, pc, ADD_PIECE);
  this.mvList.push(mv);
}

Position.prototype.undoMovePiece = function() {
  var mv = this.mvList.pop();
  var sqSrc = SRC(mv);
  var sqDst = DST(mv);
  var pc = this.squares[sqDst];
  this.addPiece(sqDst, pc, DEL_PIECE);
  this.addPiece(sqSrc, pc, ADD_PIECE);
  pc = this.pcList.pop();
  if (pc > 0) {
    this.addPiece(sqDst, pc, ADD_PIECE);
  }
}

Position.prototype.changeSide = function() {
  this.sdPlayer = 1 - this.sdPlayer;
  this.zobristKey ^= PreGen_zobristKeyPlayer;
  this.zobristLock ^= PreGen_zobristLockPlayer;
}

Position.prototype.makeMove = function(mv) {
  var zobristKey = this.zobristKey;
  this.movePiece(mv);
  if (this.checked()) {
    this.undoMovePiece(mv);
    return false;
  }
  this.keyList.push(zobristKey);
  this.changeSide();
  this.chkList.push(this.checked());
  this.distance ++;
  return true;
}

Position.prototype.undoMakeMove = function() {
  this.distance --;
  this.chkList.pop();
  this.changeSide();
  this.keyList.pop();
  this.undoMovePiece();
}

Position.prototype.nullMove = function() {
  this.mvList.push(0);
  this.pcList.push(0);
  this.keyList.push(this.zobristKey);
  this.changeSide();
  this.chkList.push(false);
  this.distance ++;
}

Position.prototype.undoNullMove = function() {
  this.distance --;
  this.chkList.pop();
  this.changeSide();
  this.keyList.pop();
  this.pcList.pop();
  this.mvList.pop();
}

Position.prototype.fromFen = function(fen) {
  this.clearBoard();
  var y = RANK_TOP;
  var x = FILE_LEFT;
  var index = 0;
  if (index == fen.length) {
    this.setIrrev();
    return;
  }
  var c = fen.charAt(index);
  while (c != " ") {
    if (c == "/") {
      x = FILE_LEFT;
      y ++;
      if (y > RANK_BOTTOM) {
        break;
      }
    } else if (c >= "1" && c <= "9") {
      x += (ASC(c) - ASC("0"));
    } else if (c >= "A" && c <= "Z") {
      if (x <= FILE_RIGHT) {
        var pt = CHAR_TO_PIECE(c);
        if (pt >= 0) {
          this.addPiece(COORD_XY(x, y), pt + 8);
        }
        x ++;
      }
    } else if (c >= "a" && c <= "z") {
      if (x <= FILE_RIGHT) {
        var pt = CHAR_TO_PIECE(CHR(ASC(c) + ASC("A") - ASC("a")));
        if (pt >= 0) {
          this.addPiece(COORD_XY(x, y), pt + 16);
        }
        x ++;
      }
    }
    index ++;
    if (index == fen.length) {
      this.setIrrev();
      return;
    }
    c = fen.charAt(index);
  }
  index ++;
  if (index == fen.length) {
    this.setIrrev();
    return;
  }
  if (this.sdPlayer == (fen.charAt(index) == "b" ? 0 : 1)) {
    this.changeSide();
  }
  this.setIrrev();
}

Position.prototype.toFen = function() {
  var fen = "";
  for (var y = RANK_TOP; y <= RANK_BOTTOM; y ++) {
    var k = 0;
    for (var x = FILE_LEFT; x <= FILE_RIGHT; x ++) {
      var pc = this.squares[COORD_XY(x, y)];
      if (pc > 0) {
        if (k > 0) {
          fen += CHR(ASC("0") + k);
          k = 0;
        }
        fen += FEN_PIECE.charAt(pc);
      } else {
        k ++;
      }
    }
    if (k > 0) {
      fen += CHR(ASC("0") + k);
    }
    fen += "/";
  }
  return fen.substring(0, fen.length - 1) +
      (this.sdPlayer == 0 ? " w" : " b");
}

Position.prototype.generateMoves = function(vls) {
  var mvs = [];
  var pcSelfSide = SIDE_TAG(this.sdPlayer);
  var pcOppSide = OPP_SIDE_TAG(this.sdPlayer);
  for (var sqSrc = 0; sqSrc < 256; sqSrc ++) {
    var pcSrc = this.squares[sqSrc];
    if ((pcSrc & pcSelfSide) == 0) {
      continue;
    }
    switch (pcSrc - pcSelfSide) {
    case PIECE_KING:
      for (var i = 0; i < 4; i ++) {
        var sqDst = sqSrc + KING_DELTA[i];
        if (!IN_FORT(sqDst)) {
          continue;
        }
        var pcDst = this.squares[sqDst];
        if (vls == null) {
          if ((pcDst & pcSelfSide) == 0) {
            mvs.push(MOVE(sqSrc, sqDst));
          }
        } else if ((pcDst & pcOppSide) != 0) {
          mvs.push(MOVE(sqSrc, sqDst));
          vls.push(MVV_LVA(pcDst, 5));
        }
      }
      break;
    case PIECE_ADVISOR:
      for (var i = 0; i < 4; i ++) {
        var sqDst = sqSrc + ADVISOR_DELTA[i];
        if (!IN_FORT(sqDst)) {
          continue;
        }
        var pcDst = this.squares[sqDst];
        if (vls == null) {
          if ((pcDst & pcSelfSide) == 0) {
            mvs.push(MOVE(sqSrc, sqDst));
          }
        } else if ((pcDst & pcOppSide) != 0) {
          mvs.push(MOVE(sqSrc, sqDst));
          vls.push(MVV_LVA(pcDst, 1));
        }
      }
      break;
    case PIECE_BISHOP:
      for (var i = 0; i < 4; i ++) {
        var sqDst = sqSrc + ADVISOR_DELTA[i];
        if (!(IN_BOARD(sqDst) && HOME_HALF(sqDst, this.sdPlayer) &&
            this.squares[sqDst] == 0)) {
          continue;
        }
        sqDst += ADVISOR_DELTA[i];
        var pcDst = this.squares[sqDst];
        if (vls == null) {
          if ((pcDst & pcSelfSide) == 0) {
            mvs.push(MOVE(sqSrc, sqDst));
          }
        } else if ((pcDst & pcOppSide) != 0) {
          mvs.push(MOVE(sqSrc, sqDst));
          vls.push(MVV_LVA(pcDst, 1));
        }
      }
      break;
    case PIECE_KNIGHT:
      for (var i = 0; i < 4; i ++) {
        var sqDst = sqSrc + KING_DELTA[i];
        if (this.squares[sqDst] > 0) {
          continue;
        }
        for (var j = 0; j < 2; j ++) {
          sqDst = sqSrc + KNIGHT_DELTA[i][j];
          if (!IN_BOARD(sqDst)) {
            continue;
          }
          var pcDst = this.squares[sqDst];
          if (vls == null) {
            if ((pcDst & pcSelfSide) == 0) {
              mvs.push(MOVE(sqSrc, sqDst));
            }
          } else if ((pcDst & pcOppSide) != 0) {
            mvs.push(MOVE(sqSrc, sqDst));
            vls.push(MVV_LVA(pcDst, 1));
          }
        }
      }
      break;
    case PIECE_ROOK:
      for (var i = 0; i < 4; i ++) {
        var delta = KING_DELTA[i];
        var sqDst = sqSrc + delta;
        while (IN_BOARD(sqDst)) {
          var pcDst = this.squares[sqDst];
          if (pcDst == 0) {
            if (vls == null) {
              mvs.push(MOVE(sqSrc, sqDst));
            }
          } else {
            if ((pcDst & pcOppSide) != 0) {
              mvs.push(MOVE(sqSrc, sqDst));
              if (vls != null) {
                vls.push(MVV_LVA(pcDst, 4));
              }
            }
            break;
          }
          sqDst += delta;
        }
      }
      break;
    case PIECE_CANNON:
      for (var i = 0; i < 4; i ++) {
        var delta = KING_DELTA[i];
        var sqDst = sqSrc + delta;
        while (IN_BOARD(sqDst)) {
          var pcDst = this.squares[sqDst];
          if (pcDst == 0) {
            if (vls == null) {
              mvs.push(MOVE(sqSrc, sqDst));
            }
          } else {
            break;
          }
          sqDst += delta;
        }
        sqDst += delta;
        while (IN_BOARD(sqDst)) {
          var pcDst = this.squares[sqDst];
          if (pcDst > 0) {
            if ((pcDst & pcOppSide) != 0) {
              mvs.push(MOVE(sqSrc, sqDst));
              if (vls != null) {
                vls.push(MVV_LVA(pcDst, 4));
              }
            }
            break;
          }
          sqDst += delta;
        }
      }
      break;
    case PIECE_PAWN:
      var sqDst = SQUARE_FORWARD(sqSrc, this.sdPlayer);
      if (IN_BOARD(sqDst)) {
        var pcDst = this.squares[sqDst];
        if (vls == null) {
          if ((pcDst & pcSelfSide) == 0) {
            mvs.push(MOVE(sqSrc, sqDst));
          }
        } else if ((pcDst & pcOppSide) != 0) {
          mvs.push(MOVE(sqSrc, sqDst));
          vls.push(MVV_LVA(pcDst, 2));
        }
      }
      if (AWAY_HALF(sqSrc, this.sdPlayer)) {
        for (var delta = -1; delta <= 1; delta += 2) {
          sqDst = sqSrc + delta;
          if (IN_BOARD(sqDst)) {
            var pcDst = this.squares[sqDst];
            if (vls == null) {
              if ((pcDst & pcSelfSide) == 0) {
                mvs.push(MOVE(sqSrc, sqDst));
              }
            } else if ((pcDst & pcOppSide) != 0) {
              mvs.push(MOVE(sqSrc, sqDst));
              vls.push(MVV_LVA(pcDst, 2));
            }
          }
        }
      }
      break;
    }
  }
  return mvs;
}

Position.prototype.legalMove = function(mv) {
  var sqSrc = SRC(mv);
  var pcSrc = this.squares[sqSrc];
  var pcSelfSide = SIDE_TAG(this.sdPlayer);
  if ((pcSrc & pcSelfSide) == 0) {
    return false;
  }

  var sqDst = DST(mv);
  var pcDst = this.squares[sqDst];
  if ((pcDst & pcSelfSide) != 0) {
    return false;
  }

  switch (pcSrc - pcSelfSide) {
  case PIECE_KING:
    return IN_FORT(sqDst) && KING_SPAN(sqSrc, sqDst);
  case PIECE_ADVISOR:
    return IN_FORT(sqDst) && ADVISOR_SPAN(sqSrc, sqDst);
  case PIECE_BISHOP:
    return SAME_HALF(sqSrc, sqDst) && BISHOP_SPAN(sqSrc, sqDst) &&
        this.squares[BISHOP_PIN(sqSrc, sqDst)] == 0;
  case PIECE_KNIGHT:
    var sqPin = KNIGHT_PIN(sqSrc, sqDst);
    return sqPin != sqSrc && this.squares[sqPin] == 0;
  case PIECE_ROOK:
  case PIECE_CANNON:
    var delta;
    if (SAME_RANK(sqSrc, sqDst)) {
      delta = (sqDst < sqSrc ? -1 : 1);
    } else if (SAME_FILE(sqSrc, sqDst)) {
      delta = (sqDst < sqSrc ? -16 : 16);
    } else {
      return false;
    }
    var sqPin = sqSrc + delta;
    while (sqPin != sqDst && this.squares[sqPin] == 0) {
      sqPin += delta;
    }
    if (sqPin == sqDst) {
      return pcDst == 0 || pcSrc - pcSelfSide == PIECE_ROOK;
    }
    if (pcDst == 0 || pcSrc - pcSelfSide != PIECE_CANNON) {
      return false;
    }
    sqPin += delta;
    while (sqPin != sqDst && this.squares[sqPin] == 0) {
      sqPin += delta;
    }
    return sqPin == sqDst;
  case PIECE_PAWN:
    if (AWAY_HALF(sqDst, this.sdPlayer) && (sqDst == sqSrc - 1 || sqDst == sqSrc + 1)) {
      return true;
    }
    return sqDst == SQUARE_FORWARD(sqSrc, this.sdPlayer);
  default:
    return false;
  }
}

Position.prototype.checked = function() {
  var pcSelfSide = SIDE_TAG(this.sdPlayer);
  var pcOppSide = OPP_SIDE_TAG(this.sdPlayer);
  for (var sqSrc = 0; sqSrc < 256; sqSrc ++) {
    if (this.squares[sqSrc] != pcSelfSide + PIECE_KING) {
      continue;
    }
    if (this.squares[SQUARE_FORWARD(sqSrc, this.sdPlayer)] == pcOppSide + PIECE_PAWN) {
      return true;
    }
    for (var delta = -1; delta <= 1; delta += 2) {
      if (this.squares[sqSrc + delta] == pcOppSide + PIECE_PAWN) {
        return true;
      }
    }
    for (var i = 0; i < 4; i ++) {
      if (this.squares[sqSrc + ADVISOR_DELTA[i]] != 0) {
        continue;
      }
      for (var j = 0; j < 2; j ++) {
        var pcDst = this.squares[sqSrc + KNIGHT_CHECK_DELTA[i][j]];
        if (pcDst == pcOppSide + PIECE_KNIGHT) {
          return true;
        }
      }
    }
    for (var i = 0; i < 4; i ++) {
      var delta = KING_DELTA[i];
      var sqDst = sqSrc + delta;
      while (IN_BOARD(sqDst)) {
        var pcDst = this.squares[sqDst];
        if (pcDst > 0) {
          if (pcDst == pcOppSide + PIECE_ROOK || pcDst == pcOppSide + PIECE_KING) {
            return true;
          }
          break;
        }
        sqDst += delta;
      }
      sqDst += delta;
      while (IN_BOARD(sqDst)) {
        var pcDst = this.squares[sqDst];
        if (pcDst > 0) {
          if (pcDst == pcOppSide + PIECE_CANNON) {
            return true;
          }
          break;
        }
        sqDst += delta;
      }
    }
    return false;
  }
  return false;
}

Position.prototype.isMate = function() {
  var mvs = this.generateMoves(null);
  for (var i = 0; i < mvs.length; i ++) {
    if (this.makeMove(mvs[i])) {
      this.undoMakeMove();
      return false;
    }
  }
  return true;
}

Position.prototype.mateValue = function() {
  return this.distance - MATE_VALUE;
}

Position.prototype.banValue = function() {
  return this.distance - BAN_VALUE;
}

Position.prototype.drawValue = function() {
  return (this.distance & 1) == 0 ? -DRAW_VALUE : DRAW_VALUE;
}

Position.prototype.evaluate = function() {
  var vl = (this.sdPlayer == 0 ? this.vlWhite - this.vlBlack :
      this.vlBlack - this.vlWhite) + ADVANCED_VALUE;
  return vl == this.drawValue() ? vl - 1 : vl;
}

Position.prototype.nullOkay = function() {
  return (this.sdPlayer == 0 ? this.vlWhite : this.vlBlack) > NULL_OKAY_MARGIN;
}

Position.prototype.nullSafe = function() {
  return (this.sdPlayer == 0 ? this.vlWhite : this.vlBlack) > NULL_SAFE_MARGIN;
}

Position.prototype.inCheck = function() {
  return this.chkList[this.chkList.length - 1];
}

Position.prototype.captured = function() {
  return this.pcList[this.pcList.length - 1] > 0;
}

Position.prototype.repValue = function(vlRep) {
  var vlReturn = ((vlRep & 2) == 0 ? 0 : this.banValue()) +
      ((vlRep & 4) == 0 ? 0 : -this.banValue());
  return vlReturn == 0 ? this.drawValue() : vlReturn;
}

Position.prototype.repStatus = function(recur_) {
  var recur = recur_;
  var selfSide = false;
  var perpCheck = true;
  var oppPerpCheck = true;
  var index = this.mvList.length - 1;
  while (this.mvList[index] > 0 && this.pcList[index] == 0) {
    if (selfSide) {
      perpCheck = perpCheck && this.chkList[index];
      if (this.keyList[index] == this.zobristKey) {
        recur --;
        if (recur == 0) {
          return 1 + (perpCheck ? 2 : 0) + (oppPerpCheck ? 4 : 0);
        }
      }
    } else {
      oppPerpCheck = oppPerpCheck && this.chkList[index];
    }
    selfSide = !selfSide;
    index --;
  }
  return 0;
}

Position.prototype.mirror = function() {
  var pos = new Position();
  pos.clearBoard();
  for (var sq = 0; sq < 256; sq ++) {
    var pc = this.squares[sq];
    if (pc > 0) {
      pos.addPiece(MIRROR_SQUARE(sq), pc);
    }
  }
  if (this.sdPlayer == 1) {
    pos.changeSide();
  }
  return pos;
}

Position.prototype.bookMove = function() {
  if (typeof BOOK_DAT != "object" || BOOK_DAT.length == 0) {
    return 0;
  }
  var mirror = false;
  var lock = this.zobristLock >>> 1; // Convert into Unsigned
  var index = binarySearch(BOOK_DAT, lock);
  if (index < 0) {
    mirror = true;
    lock = this.mirror().zobristLock >>> 1; // Convert into Unsigned
    index = binarySearch(BOOK_DAT, lock);
  }
  if (index < 0) {
    return 0;
  }
  index --;
  while (index >= 0 && BOOK_DAT[index][0] == lock) {
    index --;
  }
  var mvs = [], vls = [];
  var value = 0;
  index ++;
  while (index < BOOK_DAT.length && BOOK_DAT[index][0] == lock) {
    var mv = BOOK_DAT[index][1];
    mv = (mirror ? MIRROR_MOVE(mv) : mv);
    if (this.legalMove(mv)) {
      mvs.push(mv);
      var vl = BOOK_DAT[index][2];
      vls.push(vl);
      value += vl;
    }
    index ++;
  }
  if (value == 0) {
    return 0;
  }
  value = Math.floor(Math.random() * value);
  for (index = 0; index < mvs.length; index ++) {
    value -= vls[index];
    if (value < 0) {
      break;
    }
  }
  return mvs[index];
}

Position.prototype.historyIndex = function(mv) {
  return ((this.squares[SRC(mv)] - 8) << 8) + DST(mv);
}


var RESULT_UNKNOWN = 0;
var RESULT_WIN = 1;
var RESULT_DRAW = 2;
var RESULT_LOSS = 3;

var BOARD_WIDTH = 521;
var BOARD_HEIGHT = 577;
var SQUARE_SIZE = 57;
var SQUARE_LEFT = (BOARD_WIDTH - SQUARE_SIZE * 9) >> 1;
var SQUARE_TOP = (BOARD_HEIGHT - SQUARE_SIZE * 10) >> 1;
var THINKING_SIZE = 32;
var THINKING_LEFT = (BOARD_WIDTH - THINKING_SIZE) >> 1;
var THINKING_TOP = (BOARD_HEIGHT - THINKING_SIZE) >> 1;
var MAX_STEP = 8;
var xdPIECE_NAME = [
  "oo", null, null, null, null, null, null, null,
  "rk", "ra", "rb", "rn", "rr", "rc", "rp", null,
  "bk", "ba", "bb", "bn", "br", "bc", "bp", null,
];

function SQ_X(sq) {
  return SQUARE_LEFT + (FILE_X(sq) - 3) * SQUARE_SIZE;
}

function SQ_Y(sq) {
  return SQUARE_TOP + (RANK_Y(sq) - 3) * SQUARE_SIZE;
}
function MOVE_PX(src, dst, step) {
  return Math.floor((src * step + dst * (MAX_STEP - step)) / MAX_STEP + .5) + "px";
}
function xdBoardClass(oContainer, images, sounds) {
  this.drawSquare = function(sq, selected) {
      var img = this.imgSquares[sq];
      img.src = this.images + xdPIECE_NAME[this.pos.squares[sq]] + ".gif";
      img.style.backgroundImage = selected ? "url(" + this.images + "oos.gif)" : "";
  }
  this.images = images;
  this.sounds = sounds;
  this.pos = new Position();
//  this.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1");//原始红先
  this.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C4/9/RNBAKABNR b - - 0 1");//炮二平五

  this.animated = true;
  this.sound = true;
  this.search = null;
  this.imgSquares = [];
  this.sqSelected = 0;
  this.mvLast = 42922;//0; //42922 炮二平五
  this.millis = 0;
  this.computer = -1;
  this.result = RESULT_UNKNOWN;
  this.busy = false;

  var style = oContainer.style;
  style.position = "relative";
  style.width = BOARD_WIDTH + "px";
  style.height = BOARD_HEIGHT + "px";
  style.background = "url(" + images + "board.jpg)";
  var this_ = this;
  for (var sq = 0; sq < 256; sq ++) {
    if (!IN_BOARD(sq)) {
      this.imgSquares.push(null);
      continue;
    }
    var img = document.createElement("img");
    var style = img.style;
    style.position = "absolute";
    style.left = SQ_X(sq);
    style.top = SQ_Y(sq);
    style.width = SQUARE_SIZE;
    style.height = SQUARE_SIZE;
    style.zIndex = 0;
    img.onmousedown = function(sq_) {
      return function() {
        this_.clickSquare(sq_); 
      }
    } (sq);

    oContainer.appendChild(img);
    this.imgSquares.push(img);
  }

  this.flushBoard();

}



xdBoardClass.prototype.flushBoard = function() {
  this.mvLast = this.pos.mvList[this.pos.mvList.length - 1];
  for (var sq = 0; sq < 256; sq ++) {
    if (IN_BOARD(sq)) {
      this.drawSquare(sq, sq == SRC(this.mvLast) || sq == DST(this.mvLast));
    }
  }
}

xdBoardClass.prototype.clickSquare = function(sq_) {

  if (this.busy || this.result != RESULT_UNKNOWN) {

    return;
  } 
  var sq = sq_;//this.flipped(sq_);
  var pc = this.pos.squares[sq];
  if ((pc & SIDE_TAG(this.pos.sdPlayer)) != 0) {
    this.playSound("click"); 

    if (this.mvLast != 0) {
      this.drawSquare(SRC(this.mvLast), false);
      this.drawSquare(DST(this.mvLast), false);
    }
    if (this.sqSelected) {
      this.drawSquare(this.sqSelected, false);
    }
    this.drawSquare(sq, true);
    this.sqSelected = sq;
  } 
  else if (this.sqSelected > 0) { 
    this.addMove(MOVE(this.sqSelected, sq), false);
  }
}

xdBoardClass.prototype.playSound = function(soundFile) {
  if (!this.sound) {
    return;
  }
  try {
    new Audio(this.sounds + soundFile + ".wav").play();
  } catch (e) {
    this.dummy.innerHTML= "<embed src=\"" + this.sounds + soundFile +
        ".wav\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
  }
}

xdBoardClass.prototype.flipped = function(sq) {
  return this.computer == 0 ? SQUARE_FLIP(sq) : sq;
}
xdBoardClass.prototype.XD_postAddMove = function(mv, computerMove) { 
  if (this.mvLast > 0) {
    this.drawSquare(SRC(this.mvLast), false);
    this.drawSquare(DST(this.mvLast), false);
  }
  this.drawSquare(SRC(mv), true);
  this.drawSquare(DST(mv), true);
  this.sqSelected = 0;
  this.mvLast = mv;
 
  if (this.pos.isMate()) {
    this.playSound(computerMove ? "loss" : "win");
    this.result = computerMove ? RESULT_LOSS : RESULT_WIN;

    var pc = SIDE_TAG(this.pos.sdPlayer) + PIECE_KING;
    var sqMate = 0;
    for (var sq = 0; sq < 256; sq ++) {
      if (this.pos.squares[sq] == pc) {
        sqMate = sq;
        break;
      }
    }
    if (!this.animated || sqMate == 0) {
      this.postMate(computerMove);
      return;
    }

    sqMate = this.flipped(sqMate);
    var style = this.imgSquares[sqMate].style;
    style.zIndex = 256;
    var xMate = SQ_X(sqMate);
    var step = MAX_STEP;
    var this_ = this;
    var timer = setInterval(function() {
      if (step == 0) {
        clearInterval(timer);
        style.left = xMate + "px";
        style.zIndex = 0;
        this_.imgSquares[sqMate].src = this_.images +
            (this_.pos.sdPlayer == 0 ? "r" : "b") + "km.gif";
        this_.postMate(computerMove);
      } else {
        style.left = (xMate + ((step & 1) == 0 ? step : -step) * 2) + "px";
        step --;
      }
    }, 50);
    return;
  }
 
  var vlRep = this.pos.repStatus(3);
  if (vlRep > 0) {
    vlRep = this.pos.repValue(vlRep);
    if (vlRep > -WIN_VALUE && vlRep < WIN_VALUE) {
      this.playSound("draw");
      this.result = RESULT_DRAW;
      alertDelay("双方不变作和，辛苦了！");
    } else if (computerMove == (vlRep < 0)) {
      this.playSound("loss");
      this.result = RESULT_LOSS;
      alertDelay("长打作负，请不要气馁！");
    } else {
      this.playSound("win");
      this.result = RESULT_WIN;
      alertDelay("长打作负，祝贺你取得胜利！");
    }
    this.postAddMove2();
    this.busy = false;
    return;
  }
 
  if (this.pos.captured()) {
    var hasMaterial = false;
    for (var sq = 0; sq < 256; sq ++) {
      if (IN_BOARD(sq) && (this.pos.squares[sq] & 7) > 2) {
        hasMaterial = true;
        break;
      }
    }
    if (!hasMaterial) {
      this.playSound("draw");
      this.result = RESULT_DRAW;
      alertDelay("双方都没有进攻棋子了，辛苦了！");
      this.postAddMove2();
      this.busy = false;
      return;
    }
  } else if (this.pos.pcList.length > 100) {
    var captured = false;
    for (var i = 2; i <= 100; i ++) {
      if (this.pos.pcList[this.pos.pcList.length - i] > 0) {
        captured = true;
        break;
      }
    }
    if (!captured) {
      this.playSound("draw");
      this.result = RESULT_DRAW;
      alertDelay("超过自然限着作和，辛苦了！");
      this.postAddMove2();
      this.busy = false;
      return;
    }
  }

  if (this.pos.inCheck()) {
    this.playSound(computerMove ? "check2" : "check");
  } else if (this.pos.captured()) {
    this.playSound(computerMove ? "capture2" : "capture");
  } else {
    this.playSound(computerMove ? "move2" : "move");
  }
   
  this.postAddMove2();
  this.response();
}
xdBoardClass.prototype.postAddMove2 = function() {
  if (typeof this.onAddMove == "function") {
    this.onAddMove();
  }
}
xdBoardClass.prototype.response = function() {
  if (this.search == null || !this.computerMove()) {
    this.busy = false;
    return;
  }
  this.thinking.style.visibility = "visible";
  var this_ = this;
  this.busy = true;
  setTimeout(function() {
    this_.XD_addMove(board.search.searchMain(LIMIT_DEPTH, board.millis), true);
    this_.thinking.style.visibility = "hidden";
  }, 250);
}

xdBoardClass.prototype.addMove = function(mv, computerMove) {
  if (!this.pos.legalMove(mv)) {
    return;
  }
  if (!this.pos.makeMove(mv)) {
    this.playSound("illegal");
    return;
  }
  this.busy = true; 
  if (!this.animated) {
    this.XD_postAddMove(mv, computerMove);
    return;
  }
   
  var sqSrc = this.flipped(SRC(mv));
  var xSrc = SQ_X(sqSrc);
  var ySrc = SQ_Y(sqSrc);
  var sqDst = this.flipped(DST(mv));
  var xDst = SQ_X(sqDst);
  var yDst = SQ_Y(sqDst);

  var style = this.imgSquares[sqSrc].style; 
  style.zIndex = 256;
  var step = MAX_STEP - 1;
  var this_ = this;
  var timer = setInterval(function() {
    if (step == 0) {
      clearInterval(timer);
      style.left = xSrc + "px";
      style.top = ySrc + "px";
      style.zIndex = 0;
      this_.XD_postAddMove(mv, computerMove);
    } else {
      style.left = MOVE_PX(xSrc, xDst, step);
      style.top = MOVE_PX(ySrc, yDst, step);
      step --;
    }
  }, 16);
}


// Test       
  
var _run	= function(id,x,y){
	var o = new blClass; 
	var idBody = id;
	var idHead = id + "Header";
  var s= _my_ver; 
  s += " <a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c7.js'"
  s += " style='color:blue;'";    s +=">"; s += "c7.js* "; s+="</a>";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c7.js'"
  s += " style='color:green;'";   s +=">"; s += "c7.js ";  s+="</a>";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c7Test.html'"
  s += " style='color:brown;'";   s +=">"; s += "c7Test.html";  s+="</a>";
  s += " <button id='id_div_4_cmd'>+</button>"

	var main = o.blDiv(document.body,idBody, s, blGrey[0]);
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 400px";
	style += "top: 140px";
	main.style =style;
	var title = o.blDiv(main,idHead,"========");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;

	o.blMakeDivMovable(main);

	main.style.left 	= x +"px";
	main.style.top		= y +"px";
	var d4b = o.blDiv(main, "id_4_board","div4board"); 
  d4b.board = new xdBoardClass(d4b, "https://jeremyjia.github.io/Games/issues/4/images/", "https://jeremyjia.github.io/Games/issues/4/sounds/");

  bl$("id_div_4_cmd").onclick = function(){
    var b = this;
    if(!this.cmd){
      this.cmd = blo0.blMDiv(d4b, d4b.id + "cmd","cmd",450,-50,330,50,blGrey[0]);
      this.cmd.v = blo0.blDiv(this.cmd, this.cmd.id + "v",blGrey[5]);
      blo0.blShowObj2Div(this.cmd.v, new _cmdClass(d4b));

      if(bl$("blrCmd1")){bl$("blrCmd1").click();} 
      if(bl$("blrCmd2")){bl$("blrCmd2").click();} 

      this.n = 1;
    }
    else{
      if(this.n==1){
        _on_off_div(this,this.cmd);
        this.n++;
      }
      _on_off_div(this,this.cmd);
      b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }
  }

}
function _cmdClass(_o){        
    this.bll0=  "<div id = 'id_div_4__cmdClass' title = 'title: _cmdClass'> _cmdClass: v0.0.13</div>";
 
  this.blrCmd1 = function(b,d){
    if(!d.v){
      d.v = blo0.blDiv(d,d.id+"v","test1",blGrey[5]);
      d.v.b1 = blo0.blBtn( d.v,"id_4_Go", "Go",blColor[2]);
      d.v.b1.onclick = function(){
        alert(_o.board.pos.toFen());
      }
    }
    _on_off_div(b,d); 
    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];

  }
  this.blline = "----";
  this.blrCmd2 = function(b,d){
    if(!d.v){
      d.v = blo0.blDiv(d,d.id+"v","test1",blGrey[5]);
      d.v.b1 = blo0.blBtn( d.v, "id_4_Get","Get",blColor[2]);

      d.v.b1.onclick = function(){
        _o.board.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C4/9/RNBAKABNR b");
        _o.board.flushBoard();
      }

    }
    _on_off_div(b,d); 
    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];

  }
}
_run("id_4_div_c7",100,100);  