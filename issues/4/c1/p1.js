const _v_plx_Srt = "v0.113";
var _s = "";
var v=blo0.plxSrt; 
v.tb = blo0.blDiv(v,v.id+"tb","tb",blGrey[0]);
v.v1 = blo0.blDiv(v,v.id+"v1",_v_plx_Srt,blGrey[1]);
v.v1.ta = blo0.blTextarea(v.v1,v.v1.id+"ta",_s,blGrey[1]);
v.v1.ta.style.width = "98%";
v.v1.ta.style.height = "311px";

var tArr = v.ctx.lrcTimeArray;
var lArr = v.ctx.lrcArray;
var _fTime = function ( n ){
    var hh = (n/3600).toFixed(2);
    hh = hh<10?"0"+hh:hh;
    hh = hh.split('.')[0];
    
    var mm = ((n%3600)/60).toFixed(1);
    mm = mm<10?"0"+mm:mm;
    mm = mm.split('.')[0];

    var ss = ((n%3600)%60).toFixed(3);
    ss= ss<10?"0"+ss : ss;
    ss = ss.split('.');

    var r = hh + ":" + mm + ":" + ss[0] + "," + ss[1];

    return r;
}

for(i in tArr){ 
    _s += "\n";
    var ii = i;
    ii++;
    _s += ii;
    _s += "\n"; 
    var dt =  ( ii==tArr.length ) ?  _fTime(tArr[i]+3) : _fTime(tArr[ii]);
    _s += _fTime(tArr[i]) + " --> " + dt;
    _s += "\n";
    _s += lArr[i];
    _s += "\n";

}
v.v1.ta.value = _s;