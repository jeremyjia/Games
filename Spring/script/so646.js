var tagSO646 = "[so646.js]_v0.31";

var a="\n";
var max0=0;
function tlist() {
    max0=tlist.arguments.length;
    for (i=0; i<max0; i++){
      this[i]=tlist.arguments[i];
    }    
}
function init(){
  return new tlist(
    "   o"+a+
"  /|\\"+a+
" */ \\*        "+a,

"   o_"+a+
"  \<| *"+a+
"  *\>\\         "+a,

"  _o/*"+a+
" * |"+a+
"  / \\         "+a,

" *\o_"+a+
"  /  *"+a+
" \<\\           "+a,

"  _o/*"+a+
" * |"+a+
"  / \\         "+a,

" *\\c/*"+a+
"   )"+a+
"  / \>         "+a,

"     *"+a+
"  \\__/c"+a+
"   \> \\*       "+a,

"   __/"+a+
"    (o_*"+a+
"     \\*       "+a,

"      \\ /"+a+
"       |"+a+
"     */o\\*    "+a,

"       \\_"+a+
"       ("+a+
"     */o\\*    "+a,

"        \<_"+a+
"      __("+a+
"     * o|*    "+a,

"         /_"+a+
"      __("+a+
"     * o|*   "+a,

"         ___"+a+
"      *\/ \>"+a+
"       o|*    "+a,

"        *"+a+
"       o|_/"+a+
"      */  \\   "+a,

"        *"+a+
"      _o|_"+a+
"     *   \>\\   "+a,

"       _o/*"+a+
"      * |"+a+
"       / \\    "+a,

"      *\\o/*"+a+
"        |"+a+
"       / \\    "+a,

"      c/*"+a+
"      \<\\"+a+
"      */\\     "+a,

"      c__"+a+
"      \<\ *"+a+
"      */\\     "+a,

"      c__"+a+
"      /\ *"+a+
"     * /\>     "+a,

"      c/*"+a+
"     /(__"+a+
"    * /       "+a,

"    __o/*"+a+
"    * (__"+a+
"      \<       "+a,

"      __o_"+a+
"     * /  *"+a+
"      \<\\      "+a,

"     *_o_"+a+
"       | *"+a+
"      \< \\     "+a,

"     *_c_*"+a+
"       |"+a+
"       \>\\     "+a,

"     *_c_*"+a+
"       |__"+a+
"       \>      "+a,

"     *_c_*"+a+
"     __|__"+a+
"              "+a,

" "+a+
"     *_c_*"+a+
"     __)__    "+a,

" "+a+
"     *\\c/*"+a+
"     __)__    "+a
  );
}
tl0 = init();

var x0=0;
function tick(t) {
    var r1 = tl0[x0];
	var r2 = r1.split(a);
	if(t%12==0)    x0++;
    if (x0 >= max0)     x0 = 0;
	return r2;
}


function animateFrame2(time) {     
	const _sn = sn;
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');  
	
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'red';
    ctx.font = "30px Verdana";
    ctx.fillText( tagSO646 + " _sn=" + _sn + " time=" + time, 110, 144);
	 
	var l = tick(time);
	for(i in l){
			ctx.fillText( l[i], 110, 244+i*30);
	}
	    
}