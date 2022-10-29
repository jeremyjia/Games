var speed = 60;
var sp = 60;
var arr;
var cxt;
var cxt2; 
//定时器
var inverId, inverId2;
var currIndex = 0;
var nextIndex = 1;
//画图的起始x坐标
var x = 0;
//画图的起始y坐标
var y = 0;
//画图的宽度
var w = 0;
//画图的高度
var h = 0;
//图片实际宽度
var imgWidth;
var imgNaturalWidth;
//图片高度
var imgHeight;
//图片显示宽度
var screenWidth;
var screenHeight;
//比例(图片显示的宽度/图片实际的宽度)
var persent;
//图片的起始坐标
var offsetLeft;
var offsetTop;
//滚动条
var scrollTop = 0;
var lastY = 0;
var posY = 0;
//当前页数
var currPage = 0;
var lastPage = 0;
//画布对像
var canvas = null;

let staff = function (page, cxt,cxt2,arr,canvas) {
  this.page = page
  this.cxt = cxt;
  this.cxt2 = cxt2;
  this.arr = arr;
  this.canvas = canvas
}

staff.prototype = {
  //开始
  start:function(){
    var that = this;
    if (inverId) {
      clearInterval(inverId);
    }
    persent = imgWidth / imgNaturalWidth;
    
    if(persent>1){
    	persent=1;
    }
    //初始化变量
    currIndex = 0;
    nextIndex = 0;

    this.run();
    inverId = setInterval(function () {

      that.run();
    }, speed);
  },
  run: function(){
    var that = this;
    this.cxt.beginPath();
    if (currIndex < this.arr.length) {
        x = this.arr[currIndex].barline_start[0] * persent;
        y = this.arr[currIndex].barline_start[1] * persent;
        w = (this.arr[currIndex].barline_end[0] - this.arr[currIndex].barline_start[0]) * persent;
        h = (this.arr[currIndex].barline_start[3] - this.arr[currIndex].barline_start[1]) * persent;
        if (w < 0) {
          currIndex++;
          this.run(cxt);
          return;
        }
    } else {
    	console.log("结束")
        this.stop();
    	this.stopCallback();
        return;
    }

    //滚动条
    if (lastY != y) {
      currPage = parseInt((y + h) / (screenHeight - offsetTop));
      if (lastPage != currPage) {
        scrollTop = y;
        //that.setData({ scrollTop });
//        wx.pageScrollTo({
//          scrollTop: y,
//          duration: 0
//        })

      }
      lastPage = currPage;
    }
    
    this.cxt.clearRect(0,0, 10000, 10000);  
    console.log("x:"+x+" y:"+y+" w:"+w+" h:"+h)
    this.cxt.fillStyle = "#f0f";
    this.cxt.globalAlpha = 0.3;
    this.cxt.fillRect(x, y, w, h);
    //this.cxt.draw();
    currIndex++;
    lastY = y;
  },
  //倒计时
  countDown: function(cnum) {
	  var b = cnum;
    var that = this;
    this.drawCycle(cnum--);
    if (inverId) {
      clearInterval(inverId);
    }
    if (inverId2) {
      clearInterval(inverId2);
    }
    inverId2 = setInterval(function () {


      that.drawCycle(cnum--);
      if (cnum < 0) {
        clearInterval(inverId2);
        myplay();
        playcallback();
        return;
      }
    }, speed/b);
  },
  //画圆
  drawCycle: function(num) {
	  console.log("num:"+num)
    this.cxt2.beginPath();
    this.cxt2.fillStyle = "red";//填充颜色,默认是黑色
    var startx = 20;
    this.cxt2.clearRect(0,0, 1000, 1000);  
    for (var i = 0; i < num; i++) {
      this.cxt2.arc(startx, 20, 10, 0, 360, false);
      startx = startx + 25;
      this.cxt2.fill();
    }
  },
  //图片加载成功后设置宽高
  imageLoad: function(obj){
	imgNaturalWidth = $(obj)[0].naturalWidth;
	var imgNaturalHeight = $(obj)[0].naturalHeight;
    imgWidth = $(obj).css("width").replace("px","");
    if(imgWidth==0){
    	imgWidth = imgNaturalWidth;
    }
    imgHeight = $(obj).css("height").replace("px","");
    if(imgHeight==0){
    	imgHeight = imgNaturalHeight;
    }
    offsetLeft = $(obj).css("left").replace("px","");
    offsetTop = $(obj).css("top").replace("px","");
    this.canvas.width = imgWidth;
	this.canvas.height = imgHeight;
    //this.page.setData({ offsetLeft, offsetTop, imgHeight: imgHeight * screenWidth / imgWidth });
  },
  //这里根据节拍设置速度（需要公式？60/输入的速度 *节拍的分子*1000）
  //如： 2/4拍，速度默认就是4分音符为一拍的时间，速度为60的话，说明一分钟60拍，每小节2拍
  //参数flag为1时表进需要倒计时，0时不需要倒计时，beat为节拍的分子即每小节几拍
  setSpeed: function (flag,beat) {
    speed = 60 / sp * beat * 1000;//这里*2表示2/4的分子
    if(flag==1){
      //倒计时
      this.countDown(beat)
    }else{
      //不倒计时
      this.start();
    }
  },
  setSpeedVal: function (speed) {
    sp = speed;
  },
  stopCallback:function(fn){
	  if(fn){
		  fn();
	  }
  },
  stop:function(){
    if (inverId) {
      clearInterval(inverId);
    }
    if (inverId2) {
      clearInterval(inverId2);
    }
    this.cxt.clearRect(0,0, 10000, 10000);  
  },
  setArr:function(arr){
	  this.arr = arr;
  }

}

