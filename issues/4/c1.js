//i4c1
var s= "v0.0. 42 ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c1.js'"
s += " style='color:blue;'";		s +=">"; s += "c1.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c1.js'"
s += " style='color:green;'";		s +=">"; s += "c1.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c18Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c1Test.html";

var md = blo0.blDiv(document.body, "div_ID_4_I4C1", s ,blGrey[0]);  
if(!md.run){
        md.run = true; 
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 400px";
	style += "top: 40px";
	md .style =style;

	var title = blo0.blDiv(md , "div_ID_4_I4C1" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;

	ftnPlayer(md);

        blo0.blMakeDivMovable(md );
	md.style.left = "400px";
	md.style.top = "40px";
}
_on_off_div(this,md);

function ftnPlayer( oDiv ){
	var v = blo0.blDiv(oDiv, oDiv.id + "Player", "Player",blGrey[0]);
	var str4V = '<video id="myVideo" width="320" height="240" controls> ';				
	str4V += '<source src=';
	str4V += 'https://littleflute.github.io/ted1/docs/61/v0.mp4';
	str4V +=' type="video/mp4">Your browser does not support HTML5 video.'; 	
	str4V += '</video>';  										
	var vPlayer = blo0.blDiv( v ,"id_div_4_myVideo" , str4V , 300,100,500,400,blColor[1]); 	
	var vid = document.getElementById("myVideo"); 
	vid.controls = false;

	v.tb = blo0.blDiv(v, v.id + "tb", "tb",blGrey[3]);
	v.tb.b1 = blo0.blBtn(v.tb, v.tb+"b1","b1",blGrey[0]);
	v.tb.b1.onclick = function(){
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "v4b1","v4b1",blColor[3]);
		}
		_on_off_div(this,this.v);
	}
	v.tb.b2 = blo0.blBtn(v.tb, v.tb+"b2","b2",blGrey[0]);
	v.tb.b2.onclick = function(){
		if(!this.run){
			this.run = true;
			this.style.backgroundColor = "green";
			vid.play();
		} 
		else{
			this.run = false;
			this.style.backgroundColor = "brown";
			vid.pause();
		}
	}
}
