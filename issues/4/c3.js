//i4c3 
var s= "v0.0. 53 ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c3.js'"
s += " style='color:blue;'";		s +=">"; s += "c3.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c3.js'"
s += " style='color:green;'";		s +=">"; s += "c3.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c3Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c3Test.html";

var md = blo0.blDiv(document.body, "div_ID_4_I4C3", s ,blGrey[0]);  
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

	var title = blo0.blDiv(md , "div_ID_4_I4C3" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;
 

    blo0.blMakeDivMovable(md );
	md.style.left = "400px";
	md.style.top = "40px";
}
_on_off_div(this,md);
 