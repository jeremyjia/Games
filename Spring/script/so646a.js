const tagSO646a = "[so646a.js]_v0.44";

var a="\n";
var max=0;
function tlist(s) {
    max=s.length;
    for (i=0; i<max; i++){
      this[i]=s[i];
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

var x=0;
function tick(t) {
    var r1 = tl0[x];
	var r2 = r1.split(a);
	if(t%12==0)    x++;
    if (x >= max)     x = 0;
	return r2;
}

   
function animateFrame(time) {     
	var _sn = "sn";
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');  
	
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(0, 0, 1920, 1080);

    ctx.fillStyle = 'purple';
    ctx.font = "30px Verdana";
    ctx.fillText( tagSO646a + " _sn=" + _sn + " time=" + time, 110, 144);
	 
	var l = tick(time);
	for(i in l){
			ctx.fillText( l[i], 110, 244+i*30);
	}
	    
}