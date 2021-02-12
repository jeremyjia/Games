const tag = "[plx11.js_v0.53]";
var v1 = bl$("id_div_4_Plx1_v1");
v1.innerHTML = tag+new Date;
//*
v1.g = null; 
v1.g = new classGame();
v1.g.startGame();
//*/

function classGame(){  
    var myGamePiece;
    var myObstacles = [];
    var myScore;
    var myGameArea = {
      canvas : null,
      start : function() {    
        //*
        if(!this.canvas){

          this.canvas = document.createElement("canvas");
          this.canvas.width = 480;
          this.canvas.height = 270;
          this.context = this.canvas.getContext("2d");      
          v1.appendChild(this.canvas);
          var b1 = blo0.blBtn(v1,v1.id+"b1","b1",blGrey[1]);
          b1.onmousedown = function(){
            accelerate(-0.2);
          }  
          b1.onmouseup = function(){
            accelerate(0.05);
          }  
          
        }
          this.frameNo = 0;
          this.interval = setInterval(updateGameArea, 20);
          //*/
      },
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    this.startGame = function () {  
      myGamePiece = new component(30, 30, "red", 10, 120);
      myGamePiece.gravity = 0.05;
      myScore = new component("30px", "Consolas", "black", 280, 40, "text");
      
    myGameArea.start();
  };


    function component(width, height, color, x, y, type) {
      this.type = type;
      this.score = 0;
      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;    
      this.x = x;
      this.y = y;
      this.gravity = 0;
      this.gravitySpeed = 0;
      this.update = function() {
          ctx = myGameArea.context;
          if (this.type == "text") {
              ctx.font = this.width + " " + this.height;
              ctx.fillStyle = color;
              ctx.fillText(this.text, this.x, this.y);
          } else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);
          }
      }
      this.newPos = function() {
          this.gravitySpeed += this.gravity;
          this.x += this.speedX;
          this.y += this.speedY + this.gravitySpeed;
          this.hitBottom();
      }
      this.hitBottom = function() {
          var rockbottom = myGameArea.canvas.height - this.height;
          if (this.y > rockbottom) {
              this.y = rockbottom;
              this.gravitySpeed = 0;
          }
      }
      this.crashWith = function(otherobj) {
          var myleft = this.x;
          var myright = this.x + (this.width);
          var mytop = this.y;
          var mybottom = this.y + (this.height);
          var otherleft = otherobj.x;
          var otherright = otherobj.x + (otherobj.width);
          var othertop = otherobj.y;
          var otherbottom = otherobj.y + (otherobj.height);
          var crash = true;
          if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
              crash = false;
          }
          return crash;
      }
    }

    function updateGameArea() {
      var x, height, gap, minHeight, maxHeight, minGap, maxGap;
      for (i = 0; i < myObstacles.length; i += 1) {
          if (myGamePiece.crashWith(myObstacles[i])) {
              return;
          } 
      }
      myGameArea.clear();
      myGameArea.frameNo += 1;
      if (myGameArea.frameNo == 1 || everyinterval(150)) {
          x = myGameArea.canvas.width;
          minHeight = 20;
          maxHeight = 200;
          height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
          minGap = 50;
          maxGap = 200;
          gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
          myObstacles.push(new component(10, height, "green", x, 0));
          myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
      }
      for (i = 0; i < myObstacles.length; i += 1) {
          myObstacles[i].x += -1;
          myObstacles[i].update();
      }
      myScore.text="SCORE: " + myGameArea.frameNo;
      myScore.update();
      myGamePiece.newPos();
      myGamePiece.update();
    }

    function everyinterval(n) {
      if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
      return false;
    }

    function accelerate(n) {
      myGamePiece.gravity = n;
    }
}

