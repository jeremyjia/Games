var _s = "vPlx v0.45"; 
var urlImg = "https://www.w3schools.com/graphics/pic_the_scream.jpg";
 
 
blo0.vPlx = blo0.blMD("id_4_vPlx", _s ,550,150,800,200,blColor[8]);
var v = blo0.vPlx;
v.tb = blo0.blDiv(v,v.id+"tb","tb", blGrey[0]);
v.v0 = blo0.blDiv(v,v.id+"v0","v0", blColor[0]); 
v.v1 = blo0.blDiv(v,v.id+"v1","v1", blColor[2]); 
v.tb.b1 = blo0.blBtn(v.tb,v.tb.id + "b1", "b1",blGrey[1]);
v.tb.b2 = blo0.blBtn(v.tb,v.tb.id + "b2", "b2",blGrey[1]);
v.tb.b3 = blo0.blBtn(v.tb,v.tb.id + "b3", "b3",blGrey[1]);
v.tb.b4 = blo0.blBtn(v.tb,v.tb.id + "b4", "b4",blGrey[1]);
v.tb.b5 = blo0.blBtn(v.tb,v.tb.id + "b5", "b5",blGrey[1]);
v.tb.b1.onclick = function(){
	startGame(v.v1);
}
v.tb.b2.onmousedown = function(){    myGamePiece.speedX = -1; }
v.tb.b3.onmousedown = function(){    myGamePiece.speedX = 1; } 
v.tb.b4.onmousedown = function(){    myGamePiece.speedY = 1; } 
v.tb.b5.onmousedown = function(){    myGamePiece.speedY = -1; } 
v.tb.b4.onmouseup = v.tb.b5.onmouseup =v.tb.b3.onmouseup = v.tb.b2.onmouseup = function(){
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
} 

var myGamePiece;
var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;
var xd1;

function startGame(oBoss) {
    myGamePiece = new component(30, 30, "https://www.w3schools.com/graphics/smiley.gif", 10, 120, "image");
    myUpBtn = new component(30, 30, "blue", 50, 10);
  	myDownBtn = new component(30, 30, "blue", 50, 70);
  	myLeftBtn = new component(30, 30, "blue", 20, 40);
  	myRightBtn = new component(30, 30, "blue", 80, 40);

    xd1 = new component(330, 530, "green", 80, 40);
    
    myGameArea.start(oBoss);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(oBoss) {
        this.canvas.width = 480;
        this.canvas.height = 1270;
        this.context = this.canvas.getContext("2d");
        oBoss.insertBefore(this.canvas, oBoss.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.addEventListener('mousedown', function (e) {
	      myGameArea.x = e.offsetX;//e.pageX;
	      myGameArea.y = e.offsetY;//e.pageY; 
	      myGameArea.d = true;
	    })

	    this.canvas.addEventListener('mouseup', function (e) {
	      myGameArea.x = false;
	      myGameArea.y = false;
	      myGameArea.d = false;
	    })

	    this.canvas.addEventListener('mousemove', function (e) {
	    	if(myGameArea.d){		    	
		      myGameArea.x = e.offsetX;//e.pageX;
		      myGameArea.y = e.offsetY;//e.pageY; 	
	      		v.v0.innerHTML = "myGamePiece: " + myGamePiece.x + ":" + myGamePiece.y ;
	    	}
	    })

        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var ctx = this.context; 
        ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.fillStyle = "red";
		ctx.font = "30px Arial";
		ctx.fillText(Date(), 10, 50);


    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color; 
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    } 
    this.clicked = function() { 
	    var myleft = this.x;
	    var myright = this.x + (this.width);
	    var mytop = this.y;
	    var mybottom = this.y + (this.height);
	    var clicked = true;	    

	    if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
	      clicked = false;
	    }
	    return clicked;
  	}
} 

function updateGameArea() {
    myGameArea.clear();

    if (myGameArea.x && myGameArea.y) {  
	    if (myUpBtn.clicked()) { 
	      myGamePiece.y -= 1;
	    }
	    if (myDownBtn.clicked()) {
	      myGamePiece.y += 1;
	    }
	    if (myLeftBtn.clicked()) {
	      myGamePiece.x += -1;
	    }
	    if (myRightBtn.clicked()) {
	      myGamePiece.x += 1;
	    }
	    if (myGameArea.d) {
	      myGamePiece.x = myGameArea.x;
	      myGamePiece.y = myGameArea.y;	      
	    }
  	}
  	myUpBtn.update();
  	myDownBtn.update();
  	myLeftBtn.update();
    myRightBtn.update();
    xd1.update();

    myGamePiece.newPos();
    myGamePiece.update();
} 
 
 