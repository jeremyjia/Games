// 0:五线谱；1：间线混排；2：简谱
var musicType = 0;
// 0: 首调唱名法；1：固定唱名法
var isFixedMode = 0;
// 简谱上边距
var splMarginTop = 10;
// 简线上边距
var spllineMarginTop = 40;
// _间隙
var underlineSpace = 3;
// _下边距
var underlineMarginBottom = -8;
// _长度
var underlineLen = 11;
// 音的上边距
var circleMarginTop = -9;
// 音的下边距
var circleMarginBottom = 3;
// 圆点间隙
var circleSpace = 3.5;
//圆点半径
var circleR = .7;
//圆点宽度
var circleW = 1;
// 滑音大小比例
var graceScale = 0.66;
// 滑音尾巴的长度
var graceLen = 8;
// 用于计算依音的尾巴位置
var firstGraceX = 0;
// 拍号
var tempoMgL = 45;
var tempoMgB = 10;
// 歌词空隙
var lySpace = 10;
// 和弦大小比例
var chordScale = 1;
var chordSpace = 6;
var chordFontSize = 18;
var METER = 'meter';
var dotMarginRight = 2;
// 连线弧度
var radianHei = 6;
var lastBarNumMap = {};

var transYOffset = 0;//y轴居中（在有pos spl center配置时，居中显示）
var splBarHeight = 0;//y轴居中时要用到


// 获取当前的Key
var currKey = "";
var transY_tmp = 0;
var bar_height = 28.6; // 26
var isExistDimByLine = false;
var isSameByline = 0;
var notesArr = ["C,,","D,,","E,,","F,,","G,,","A,,","B,,","C,","D,","E,","F,","G,","A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'","e'","f'","g'","a'","b'","c''","d''","e''","f''","g''","a''","b''"];
// 调号
var toneMarkMap = {
	"^c" : "C#",
	"^f" : "F#",
	"a" : "A",
	"b," : "B",
	"c" : "C",
	"d" : "D",
	"e" : "E",
	"f" : "F",
	"g" : "G",
	"_a," : "Ab",
	"_b," : "Bb",
	"_c" : "Cb",
	"_d" : "Db",
	"_e" : "Eb",
	"_g" : "Gb"
}

var tmVal2key = {}
function setValue2key() {
	for ( var key in toneMarkMap) {
		tmVal2key[toneMarkMap[key]] = key;
	}

	Object.assign(tmVal2key, {
		'CMAJOR' : 'c', // C大调
		'Cmaj' : 'c',// C大调
		'C major' : 'c',// C大调
		'C Major' : 'c',// C大调
		'C Ionian' : 'c',// C伊奥尼亚调式
		'Am' : 'c',// C伊奥尼亚调式

		// G大调
		'C Lydian' : 'g',// C利底亚调式
		'Em' : 'g', // C大调
		'GMAJOR' : 'g', // C大调
		'Gmajor' : 'g',// C大调
		'Gmaj' : 'g',// C大调
		'G major' : 'g',// C大调
		'G Major' : 'g',// C大调
		'G Ionian' : 'g',// C伊奥尼亚调式

		// D大调
		'Bm' : 'd', // C大调
		'DMAJOR' : 'd', // C大调
		'Dmajor' : 'd',// C大调
		'Dmaj' : 'd',// C大调
		'D major' : 'd',// C大调
		'D Major' : 'd',// C大调
		'D Ionian' : 'd',// C伊奥尼亚调式

		// A大调
		'F#m' : 'a', // C大调
		'AMAJOR' : 'a', // C大调
		'Amajor' : 'a',// C大调
		'Amaj' : 'a',// C大调
		'A major' : 'a',// C大调
		'A Major' : 'a',// C大调
		'A Ionian' : 'a',// C伊奥尼亚调式

		// E大调
		'C#m' : 'e', // C大调
		'EMAJOR' : 'e', // C大调
		'Emajor' : 'e',// C大调
		'Emaj' : 'e',// C大调
		'E major' : 'e',// C大调
		'E Major' : 'e',// C大调
		'E Ionian' : 'e',// C伊奥尼亚调式

		// B大调
		'G#m' : 'b,', // C大调
		'BMAJOR' : 'b,', // C大调
		'Bmajor' : 'b,',// C大调
		'Bmaj' : 'b,',// C大调
		'B major' : 'b,',// C大调
		'B Major' : 'b,',// C大调
		'B Ionian' : 'b,',// C伊奥尼亚调式

		// F#调
		'D#m' : '^f', // C大调
		'F#MAJOR' : '^f', // C大调
		'F#major' : '^f',// C大调
		'F#maj' : '^f',// C大调
		'F# major' : '^f',// C大调
		'F# Major' : '^f',// C大调
		'F# Ionian' : '^f',// C伊奥尼亚调式

		// C#调
		'A#m' : '^c', // C大调
		'C#MAJOR' : '^c', // C大调
		'C#major' : '^c',// C大调
		'C#maj' : '^c',// C大调
		'C# major' : '^c',// C大调
		'C# Major' : '^c',// C大调
		'C# Ionian' : '^c',// C伊奥尼亚调式

		// F调
		'C Mixolydian' : 'f',// C混合利底亚调式
		'Dm' : 'f', // C大调
		'FMAJOR' : 'f', // C大调
		'Fmajor' : 'f',// C大调
		'Fmaj' : 'f',// C大调
		'F major' : 'f',// C大调
		'F Major' : 'f',// C大调
		'F Ionian' : 'f',// C伊奥尼亚调式

		// Bb调
		'Gm' : '_b,', // C大调
		'BbMAJOR' : '_b,', // C大调
		'Bbmajor' : '_b,',// C大调
		'Bbmaj' : '_b,',// C大调
		'Bb major' : '_b,',// C大调
		'Bb Major' : '_b,',// C大调
		'Bb Ionian' : '_b,',// C伊奥尼亚调式

		// Eb调
		'Cm' : '_e', // C大调
		'EbMAJOR' : '_e', // C大调
		'Ebmajor' : '_e',// C大调
		'Ebmaj' : '_e',// C大调
		'Eb major' : '_e',// C大调
		'Eb Major' : '_e',// C大调
		'Eb Ionian' : '_e',// C伊奥尼亚调式

		// Ab调
		'Fm' : '_a,', // C大调
		'AbMAJOR' : '_a,', // C大调
		'Abmajor' : '_a,',// C大调
		'Abmaj' : '_a,',// C大调
		'Ab major' : '_a,',// C大调
		'Ab Major' : '_a,',// C大调
		'Ab Ionian' : '_a,',// C伊奥尼亚调式

		// Db调
		'Bbm' : '_d', // C大调
		'DbMAJOR' : '_d', // C大调
		'Dbmajor' : '_d',// C大调
		'Dbmaj' : '_d',// C大调
		'Db major' : '_d',// C大调
		'Db Major' : '_d',// C大调
		'Db Ionian' : '_d',// C伊奥尼亚调式

		// Gb调
		'Ebm' : '_g', // C大调
		'GbMAJOR' : '_g', // C大调
		'Gbmajor' : '_g',// C大调
		'Gbmaj' : '_g',// C大调
		'Gb major' : '_g',// C大调
		'Gb Major' : '_g',// C大调
		'Gb Ionian' : '_g',// C伊奥尼亚调式

		// Cb调
		'Abm' : '_c', // C大调
		'CbMAJOR' : '_c', // C大调
		'Cbmajor' : '_c',// C大调
		'Cbmaj' : '_c',// C大调
		'Cb major' : '_c',// C大调
		'Cb Major' : '_c',// C大调
		'Cb Ionian' : '_c',// C伊奥尼亚调式

		'C Dorian' : '_b',// C多利亚调式
		'C Minor' : '_e', // c小调
		'Cm' : '_e',// c小调
		'C Aeolian' : '_e',// C爱奥利亚调式
		'C Phrygian' : '_a',// C弗里几亚调式
		'C Locrian' : '_d',// C洛克里亚调式

	})
}
setValue2key();

// 休止符按拍子连线
var beatArr = [ [ 6, [ [ 0, 0, 0 ], [ 0, 0, 0 ] ] ], [ 5, [ [ 0, 0 ], [ 0, 0, 0 ] ] ], [ 4, [ [ 0, 0 ], [ 0, 0 ] ] ], [ 3, [ [ 0, 0, 0 ] ] ], [ 2, [ [ 0, 0 ] ] ], [ 1, [ [ 0 ] ] ] ]

// 切换0：五线谱；1：简线混排；2：简谱
function toggleStaff(obj, value) {
	musicType = value;

	src_change();
	$(obj).addClass('active').siblings().removeClass('active');
}

// 五线谱的音符转简谱
function note2number(curnote) {
	curnote = curnote.replace(/\d*/g, '');
	// X'=>x
	curnote = curnote.replace(/([A-Z])\'/g, function($1) {
		// console.log("X'=>x================",arguments)
		if ($1) {
			return $1.replaceAll("\'", '').toLowerCase();
		}
	});
	// x,=>X
	curnote = curnote.replace(/([a-z]),/g, function($1) {
		// console.log('x,=>X================',arguments)
		if ($1) {
			return $1.replaceAll(",", '').toUpperCase();
		}
	})

	return curnote.replace(/[a-zA-Z]/g, function(param) {
		// console.log('param-------------------',param);
		var rNum = "0";
		if (/z/.test(param)) {
			return rNum;
		}

		if (/[cC]/.test(param)) {
			rNum = "1";
		} else if (/[dD]/.test(param)) {
			rNum = "2";
		} else if (/[eE]/.test(param)) {
			rNum = "3";
		} else if (/[fF]/.test(param)) {
			rNum = "4";
		} else if (/[gG]/.test(param)) {
			rNum = "5";
		} else if (/[aA]/.test(param)) {
			rNum = "6";
		} else if (/[bB]/.test(param)) {
			rNum = "7";
		}

		if (rNum) {
			return rNum.toString() + "" + (/[a-z]/.test(param) ? "'" : "");
		}
	})
}

var baseNote = "CDEFGAB";

// 获取音符
function getNote(curnote) {
	return curnote.match(/[\_\^\=]*[a-zA-Z][\'\,]*/)[0];
}

// 获取自然音数字
function getNumber(simpleNote) {
	if (!simpleNote){
		return;
	}
	if(/[\u4e00-\u9fa5]/.test(simpleNote)){
		return simpleNote;
	}
	return simpleNote.match(/[\u4e00-\u9fa5X0-9a-zA-Z]/)[0];
}

// 获取音符的高低：【l/h, number】
function getPitchSym(curnote) {
	var matchB = curnote.match(/,+/);
	if (matchB) {
		return [ 'l', matchB ? matchB[0].length : 0 ];
	}

	var matchT = curnote.match(/\'+/);
	if (matchT) {
		return [ 'h', matchT ? matchT[0].length : 0 ];
	}
	return 0;
}

// 获取当前拍号
function getMeter(meter) {
	if (!(meter && meter.top)) {
		return null;
	}

	if ('C|' == meter.top) {
		meter.top = meter.bot = '2';
	} else if ('C' == meter.top) {
		meter.top = meter.bot = '4';
	}
	
	if( !meter.bot){
		return null;
	}
	return meter;
}

// 是否节奏型
function isRhythm(curS){
	return 'p' == curS.clef_type;
}


// 获取音符的时长相关的数据
// [_|-, number, dotNumber]:[显示位置（底部或中部）；"-"或"_"的个数；附点个数]
function getNoteLen(info, curS) {
	var notePos = 'h';
	var noteFailNum = Math.abs(curS.nflags);
	var dots = 0;
	
	// 如果是短依音多一条线
	if (curS.ctype == 'grace' && isShortGlide(info, curS)) {
		curS.nflags += 1;
	}
	// 有尾巴表示八分音符及其以下的音符
	if (curS.nflags > 0) {
		notePos = 'b';
		noteFailNum = curS.nflags;
		dots = curS.dots;
	}
	//这里h音符计算跟原有的不太一样，所以专门写了一个addby hxs 2019-09-30
	var noteStr = info.substring(curS.istart,curS.iend);
	if(noteStr.indexOf("h")>-1){
		var meter = getMeter(curS.p_v.meter.a_meter[0]);
		if (!meter) {
			return;
		}
		var btop = meter.top;
		var bbot = meter.bot;
		if (curS.nflags == -2) {
			return [ notePos, meter.top-1, dots ];
		}
	}
	// 如果是全音符, 那么有几拍就显示几个“-”
	if (curS.nflags == -2) {
		var meter = getMeter(curS.p_v.meter.a_meter[0]);
		if (!meter) {
			return;
		}
		var btop = meter.top;
		var bbot = meter.bot;

		// 大于四分音符的转为四分音符
		if (bbot < 4) {
			btop = 4 / bbot * btop;
			bbot = 4 / bbot * bbot;
		}

		noteFailNum = Number(bbot) - 1;
	}
	return [ notePos, noteFailNum, dots ];
}
function getNoteLenUg(info, curS) {
	var notePos = 'h',dots = 0;
	if (curS.nflags > 0) {
		notePos = 'b';
	}
	// 表示：小于或等于8分音符的尾巴，或 大于4分音符的占位符
	var noteFailNum = Math.abs(curS.nflags);
//	if(curS.ntrem){
//		noteFailNum = noteFailNum - curS.ntrem;//ntrem是震音，要单独处理
//	}
	//if(curS.dots){
		// 1个二音符 + 1个浮点 = 如： 1 -（ -） 
		// 1个二音符 + 2个浮点 = 如： 1 -（ -）.
		// 1个二音符 + 3个浮点 = 如： 1 -（ -）. .
		
		// 1个全音符 + 1个浮点 = 如： 1 - - - （- -）
		// 1个全音符 + 2个浮点 = 如： 1 - - - （- -）（-）
		// 1个全音符 + 3个浮点 = 如： 1 - - - （- -）（-）.
	//}
	switch (curS.nflags) {
		case -1: //二分音符
			noteFailNum = 1 ;
			if(curS.dots > 0){
				noteFailNum = noteFailNum + 1;
				dots = curS.dots - 1;
			}
			break;
		case -2:// 全音符
			noteFailNum = 3 ;
			if(curS.dots > 0){
			//1、全音符第一个附点，可以转为2拍
				noteFailNum = noteFailNum + 2;
				dots = curS.dots - 1;
				if(dots > 0){
				//2、全音符第二个附点，可以转为1拍
					noteFailNum = noteFailNum + 1;
					dots = dots - 1;
				}
				// 全音符第三个以后的附点，在简谱上均显示附点
			}
			//dots = curS.dots;
			break;
		default:
			break;
	}
	return [ notePos, noteFailNum, dots ];
}


// 音符的起始位置
function getNoteStartX(x, wl){
	return splSx(x) + Number(wl || 2);
}

// ------------------------附点相关------------------------------
// lastNoteX [表号，音符，x坐标，_个数]
var graceFirstIndex = 0;
// 绘制音的时值
function drawNoteLen(param) {
	var abcString = param.abcString;
	var voicetb = param.voicetb;
	var curS = param.curS;
	var splnum = param.splnum;
	var lineY = splnum.curPos;
	var w = splnum.sw[0], h = splnum.sw[1], type = splnum.type, stop = splnum.stop;
	
	//var noteLenArr = getNoteLen(abcString, curS);
	var noteLenArr = getNoteLenUg(abcString, curS);
	if (!noteLenArr) {
		return;
	}

	// 获取第一个滑音的x，取首尾音的x差值用于计算滑音尾巴居中位置,官方gr_end参数已经不存在
	if (eq('grace', splnum.type) && graceFirstIndex == 0 &&(!curS.prev || !curS.prev.grace)) {
		firstGraceX = getNoteStartX(splnum.x,curS.wl);
		graceFirstIndex++;
	}

	// 时值类型:_|-
	var lenType = noteLenArr[0];
	// 对应时值类型的个数
	var lenCnt = noteLenArr[1];
	// 浮点数
	var dots = noteLenArr[2];
	// 是否连接音符
	var checkBeamArr =  null;
	// 拍号不显示按散拍子处理
//	if( !voicetb.meter.a_meter.length || abcString.indexOf('散板') >-1){
//		checkBeamArr = checkBeam(splnum.type, abcString, curS);
//	}else{
//		checkBeamArr = beamIns.retBeatBeam(curS);
//	}
	checkBeamArr = checkBeam(splnum.type, abcString, curS);
	// 下一个音符的尾巴数量
	var nnflags = checkBeamArr[0] ? (checkBeamArr[1] ? checkBeamArr[1].nflags : 0) : 0;
	// 短依音多一条尾巴
//	if (eq('grace', splnum.type) && checkBeamArr[0] && isShortGlide(abcString, curS)) 
	if (eq('grace', splnum.type)&& isShortGlide(abcString, curS) ) {
		if(checkBeamArr[0]){
			nnflags+= 1;
		}
		lenCnt = curS.nflags + 1;
	}
	// 音底下“_” 表示八分音符或八分音符以下的音符
	var cx = getNoteStartX(splnum.x,curS.wl);
	var noteStr = abcString.substring(curS.istart,curS.iend);
	// 音符尾巴的位置
	if ('b' == lenType) {
		splnum.tailPos = abc.sh(h) ;
		for (var i = 0; i < lenCnt; i++) {
			// 音的下划线
			splnum.tailPos += underlineSpace; 
			// -4 用于微调，随机改动
			var underlineX = -2 + cx;
			// 注： 一个有尾巴和弦、另外一个有尾巴单音只有冠音相连
			//console.log(' curS.next.notes.length:'+curS.next.notes.length + 'splnum.chordindex:' + splnum.chordindex)
			if(3251 == curS.istart){
				//debugger;
			}
			if ( checkBeamArr[0] && i < nnflags && (!eq('chord', splnum.type) || (eq('chord', splnum.type) && curS.next.notes && (!(isVoiceMerge && curS.next.type == 10)) && ( curS.next.notes.length > param.chordindex))) ) {
				// 绘制连线 : x,y ,l(负值表示反方向绘制)
				drawIns.drawLine(translateValue(type, underlineX), splnum.curPos + splnum.tailPos, translateValue(type, checkBeamArr[1].x  - splnum.x - Number(curS.wl || 2)-2));
			}else{
				// 绘制下划线
				drawIns.drawLine(translateValue(type, underlineX), splnum.curPos + splnum.tailPos, underlineLen);
			}
		}
	} else  { 
		// 默认空隙4
		var space = 4;
		// 非全音的占位符个数(使用新参数)
		//var wtLenCnt = curS.nflags < 0 ? lenCnt + curS.dots : lenCnt;
		var wtLenCnt = lenCnt;
		// 休止符的y
		var restY = splnum.curPos + Number(h);
		
//		if('400' == curS.istart){
//			debugger;
//		}
//		if('403' == curS.istart){
//			debugger;
//		}
		
		// 大于一拍的占位符空隙计算
		if (curS.next && curS.next.x) {
			space = ((splSx(curS.next.x) - splSx(curS.x)- abc.sh(w)) - (lenCnt ) * abc.sh(w)) / (lenCnt + 1);
//			if('400' == curS.istart){
//				console.log('400---params-',splSx(curS.next.x), curS.next.x, w,curS.x ,lenCnt)
//			}
//			if('403' == curS.istart){
//				console.log('403---params-',splSx(curS.next.x), curS.next.x, w,curS.x ,lenCnt)
//			}
			if( curS.next.type == '4' && abc.cfmt().equalbars){
				space = ((splSx(curS.next.ts_next.x) - splSx(curS.x)- abc.sh(w)) - (lenCnt ) * abc.sh(w)) / (lenCnt + 1);
			}
		}else{
			// 没有next的情况
			for(var nextS = curS.ts_next; nextS; nextS = nextS.ts_next){
				if(nextS.ctype == 'bar'){
					space = ((splSx(nextS.x) -  abc.sh(w) - splSx(curS.x)) - (lenCnt ) * abc.sh(w)) / (lenCnt + 1);
//					if('400' == curS.istart){
//						console.log('400----params-', splSx(nextS.x),nextS.x, w,curS.x ,lenCnt)
//					}
//					if('403' == curS.istart){
//						console.log('403----params-', splSx(nextS.x),nextS.x, w,curS.x ,lenCnt)
//					}
					break;
				}
			}
		}
		
//		if('400' == curS.istart){
//			console.log('400----', space)
//		}
//		if('403' == curS.istart){
//			console.log('403----', space)
//		}
		
		// 全音符的休止符
		if (eq('rest', splnum.type) && curS.nflags == -2 && noteStr.indexOf("z")>-1) {
			var restDotX = fullRest(abcString, voicetb.meter.a_meter[0], curS, splnum.type, splnum.sw, restY);
			// 加浮点
			drawIns.drawDot2(restDotX, splnum.curPos + Number(h),dots ,w, 0);
		} else {
			// 如果前一个字符是小节线并有“：”，那么扣掉一“：”的宽度
			if (curS.next && /:/.test(curS.next.bar_type)) {
				space -= Number(4 + 2 + 2) / (lenCnt + 1);
			}
			
			// 补充 大于一拍的占位符
			var dotX = 0
			for (var i = 0; i < wtLenCnt; i++) {
				var noteX = (splnum.splx ||  getNoteStartX(splnum.x,curS.wl)) + space * (i + 1) + abc.sh(w) * (i + 1);
				if (eq('rest', splnum.type) && noteStr.indexOf("z")>-1) {
					drawIns.drawNote('0', noteX, restY, null, i);
				} else {
					drawIns.drawPlaceholder( noteX, splnum.curPos + abc.sh(h)/2);
					// 占位符(width: 6)矩形块
					//drawIns.drawRect( noteX - 2 , splnum.curPos  , 6 + 4, Number(h) + 4, i+1);
					drawIns.drawRect( noteX - 2 , splnum.curPos  , 6 + 4, Number(h) + 4, lastTil.pit == curS.notes[0].pit && lastTil.isTil ? lastTil.istart : curS.istart, i+1,  param.chordindex, null, true);
				}
				if(i == wtLenCnt - 1){
					dotX = noteX  ;
				}
			}
			// 加浮点
			drawIns.drawDot2(dotX, splnum.curPos + Number(h),dots ,w);
		}
	}

	// 依音，官方gr_end参数已经不存在
	if (eq('grace', splnum.type) && (!curS.next ||!curS.next.grace)) {
		var gx = cx;
		var graceWidth = firstGraceX ? (cx - firstGraceX) / 2 : graceLen;
		if (firstGraceX) {
			gx = cx - graceWidth;
		}
		// b:后依音;f:前依音
		//var graceType = abcString.slice(curS.istart, curS.iend).indexOf(')') > -1 ? 'b' : 'f';
		var graceType = checkGracePos(curS) == 'right' ? 'b' : 'f';
		var graceX = translateValue(type, gx);
		var graceY = splnum.curPos + (splnum.tailPos ? splnum.tailPos :  (Number(h) + circleW));
		var underCircleMatch = splnum.simpleNum.match(/,+/g);
		if (underCircleMatch) {
			graceY += (circleR + circleW) * 2 ;
			for (var i = 0; i < underCircleMatch[0].length  ; i++) {
				graceY += circleSpace ;
			}
		}

		// 10用于微调尾巴长度
		var graceLength = (firstGraceX ? graceWidth + 10 : graceWidth);
		drawIns.drawGraceTail(graceType, graceX + Number(curS.wl || 2) , graceY , graceLength);
		firstGraceX = 0;
		graceFirstIndex = 0;
	}
}

function pitchPs(num, isDown, type){
	//按照数字的形态各异，调整数字音高的位置
	var num = getNumber(num), x = 0;
	switch(Number(num)){
		case 1: 
			if(isDown){
				x += 0.9;
			}
			break;
		case 4: 
			if(isDown){
				x += 1;
			}else{
				x += 2.35 ;
				if (eq('grace', type)) {
					x = 1.5;
				}
			}
			break;
		case 6: 
			if(isDown){
				x += 0.6;
			}
			break;
		case 7: 
//			if(isDown){
//				x -=1.5 ;
//			}
			break;
	}
	return x;
}


// 绘制音高（设置音高的圆点）
function drawPitch(splnum, s) {
	var w = splnum.sw[0], h = splnum.sw[1];
	// return [音高类型，个数]
	var pitchSymArr = getPitchSym(splnum.simpleNum);
	if (!pitchSymArr)
		return;

	var circleHei = (circleR + circleW) * 2;
	if ('h' == pitchSymArr[0]) {
		splnum.highpos =  circleHei;
	} else{
		splnum.lowpos =  (splnum.tailPos ? splnum.tailPos : h) + circleHei;
	}
	
	var splx = getNoteStartX(splnum.x,s.wl) ;
	// 小节线对齐时，全音符的x坐标差2像素
	if(s.dur && s.dur == 1536 && abc.cfmt().equalbars){
		splx = splx + 2;
		//如果不是第一行，增还要再缩进4像素
		if(s.my_line!=0 && s.x<60){
			splx = splx + 4;
		}
	}
	var circleX =  splx +  (Number(w) - circleHei)/2 + pitchPs(splnum.simpleNum, 'h' != pitchSymArr[0], splnum.type) ;
	// 依音x坐标，1用于微调
	if (eq('grace', splnum.type)) {
		circleX = (circleX -  1.5) / graceScale; // 1用于微调
	}
	for (var j = 0; j < pitchSymArr[1]; j++) {
		abc.out_svg('<circle cx="' + circleX + '" ');
		if ('h' == pitchSymArr[0]) {// 上圆点
			splnum.highpos -= abc.sh(circleSpace) ;
			abc.out_svg('class="splnum up" cy="' + (splnum.curPos + splnum.highpos) + '"');
		} else {// 下圆点
			if(j > 0){
				splnum.lowpos += abc.sh(circleSpace) ;
			}
			abc.out_svg('class="splnum bottom" cy="' + (splnum.curPos + splnum.lowpos) + '"');
		}
		abc.out_svg(' r="' + circleR + '" stroke="black" stroke-width="' + circleW + '"/>');
	}
}

// 滑音需要转换x，y值
function translateValue(type, val) {
	if (type == 'grace') {
		return val / graceScale;
	}
	else if (type == 'chord') {
		return val / chordScale;
	}
	return val;
}

// 获取abc标签对应的行
function getTag(abcString, tag) {
	if(!abcString){
		console.log('abcString is null')
		return;
	}
	return abcString.match(new RegExp(tag + ":.*(?=\\n)"))[0];
}
// %%splnumscore 1 2
function getSplnumscore(abcString, st) {
	var m = abcString.match(new RegExp("%%splnumscore.*(?=\\n)"));
	if (!m) {
		return true;
	}

	// %%splnumscore x x ：x未配置默认显示简谱
	var splst = m[0].replace(/%%splnumscore\s*/g, '');
	if (!splst) {
		return true;
	}

	return splst.split(" ").find(function(i) {
		return i - 1 == st;
	})
}

// @param key 表示当前的key
function getToneMark(abcString, key, isGetOrgi) {
	if(!abcString){
		console.log('abcString is null')
		return;
	}
	var str = key ? abcString.slice(key.istart, key.iend) : getTag(abcString, "K");
	// 原始的调号
	var strMatch = str.match(/K:\s*[a-zA-Z#]+\s*\w*/g);
	if (!strMatch) {
		return null;
	}
	strMatch = strMatch[0];
	
	var orgiTM = strMatch.replace(/K:\s*/g, '');
	if(eq('bass,treble,alto,tenor', orgiTM)){
		orgiTM = currKey;
	}
	if (!tmVal2key[orgiTM]) {
		orgiTM = orgiTM.split(" ")[0];
	}
	// 只取原始调号
	if (isGetOrgi) {
		currKey = toneMarkMap[tmVal2key[orgiTM]];
		return toneMarkMap[tmVal2key[orgiTM]];
	}
	// 移调后的调号
	var matchS = str.match(/shift=(\^*\w+,*)+/);
	if (matchS) {
		matchS = matchS[0].replace('shift=' + tmVal2key[orgiTM], '').replace(/\s*/, '');
		currKey = toneMarkMap[matchS] || "";
		return toneMarkMap[matchS] || "";
	}
	if (tmVal2key[orgiTM]) {
		currKey = toneMarkMap[tmVal2key[orgiTM]];
		return toneMarkMap[tmVal2key[orgiTM]];
	}
	currKey = orgiTM;
	return orgiTM;
}

// 简谱音符的ymin
function rtnNoteY(start) {
	return getNoteY(start).ymn;
}

function getNoteY(start, st, line){
	var obj = {'key': '0,0','ymn': 0, 'y': 0, 'ymx' : 0, 'st' : 0, 'line': 0, 'crdHei': 0, 'addHei': 0};
	if (!lineyArr || !lineyArr.length) {
		return obj;
	}
	lineyArr.sort(function (obj1, obj2){
		return Number(obj1.key.replace(",","")) - Number(obj2.key.replace(",",""));
	})
	//console.log('start---------',start)
//	console.log('lineyArr---------',lineyArr)
	var notey = lineyArr && lineyArr.find(function(item){
		 var arr = item.key.split(",");
		 // 需加谱表st过滤，防止取到其他谱表的y值而重叠错行
		 return arr[0] <= start && start <= arr[1] && (typeof st == 'undefined' ? true : item.st == st) && (typeof line == 'undefined' ? true : item.line == line);
	})
	
	if(notey){
		return notey;
	}
	return obj;
}
// 获取声部个数
function getVoiceNumByCurrBar(start, v){
//	console.log('barVoiceNumArr----', JSON.stringify(barVoiceNumArr))
	var k1, k2;
	barVoiceNumArr.sort(function (obj1, obj2){
		k1 = obj1.key.split(",");
		k2 = obj2.key.split(",");
		return (k1[1]- k1[0]) - (k2[1]- k2[0]);
	})
	var arr ;
	var bvPos = [].concat(barVoiceNumArr && barVoiceNumArr.filter(function(item){
		arr = item.key.split(",");
		 return arr[0] <= start && start <= arr[1] && item.vMax >= v  && item.vMin <= v;
	}));
	
	if(!(bvPos && bvPos.length)){
		return -1;
	}
	
	bvPos.sort(function (a, b){
		return b.vMax - a.vMax;
	})
	
	//console.log('------', JSON.stringify(bvPos))
	return bvPos[0];
}

// 绘制小节线
function drawAllBar(curnote, ty, mx, my, h,s) {
	var barWidth = 0, barHeight = 24, barMx = 0;
	if ("|" == curnote || "||" == curnote || /\|\d/g.test(curnote)) {
		// 细线
		drawIns.drawBar(ty, mx, my, 1.8, h);
		if(singleline && bar_visible[s.st]==1 && bar_visible[s.st]<max_st_nodenum){
			//这里要查到前一个小节线
			var prev_s = s.ts_prev;
			var prex = 0;
			while(prev_s){
				if(prev_s.type==0 && prev_s.x!=s.x){
					prex = prev_s.x;
					break;
				}
				prev_s = prev_s.ts_prev;
			}
//			drawIns.drawBracket(ty, prex-5, my-2, 24);
//			drawIns.drawBar(ty, prex + 2, my, 1.8, h);
		}
		barWidth = 5;
		barMx = mx;
	}

	if ("||" == curnote) {
		// 细线
		drawIns.drawBar(ty, mx + 3, my, 1.8, h);
		barWidth = 1;
		barMx = mx;
	}

	if ("|]" == curnote || /:\|]?\d?/.test(curnote)) {
		// 细线
		drawIns.drawBar(ty, mx, my, 1, h);
		// 粗线
		drawIns.drawBar(ty, mx + 4, my, 3, h);
		barWidth = 3 + 1 + 3;
		barMx = mx;
	}

	if (/:\|]?\d?/.test(curnote)) {
		// 两点
		abc.out_svg('<use transform="translate(0,' + ty + ')"  x="' + (mx - 4) + '"  y="' + (my + 24) + '" xlink:href="#rdots"></use>');
		barMx = mx - 4;
	}

	if ("|:" == curnote || "[|:" == curnote) {
		// 细线
		drawIns.drawBar(ty, mx, my, 1, h);
		// 粗线
		drawIns.drawBar(ty, mx - 4, my, 3, h);
		abc.out_svg('<use transform="translate(0,' + ty + ')"  x="' + (mx + 4) + '"  y="' + (my + 24) + '" xlink:href="#rdots"></use>');
		barWidth = 4 + 1 + 3;
		barMx = mx - 4;
	}

	if (":||:" == curnote || "::" == curnote || ":][:" == curnote) {
		abc.out_svg('<use transform="translate(0,' + ty + ')"  x="' + (mx - 4) + '"  y="' + (my + 24) + '" xlink:href="#rdots"></use>');
		drawIns.drawBar(ty, mx, my, 3, h);
		drawIns.drawBar(ty, mx + 5, my, 3, h);
		abc.out_svg('<use transform="translate(0,' + ty + ')"  x="' + (mx + 9) + '"  y="' + (my + 24) + '" xlink:href="#rdots"></use>');
		barWidth = 1 + 3 + 3 + 1;
		barMx = mx - 4;
	}

	drawIns.drawRect( barMx.toFixed(2)-6, ty + my - (bar_height-24)*.5, barWidth+10, bar_height, -1);
}

// 是否为短话音
function isShortGlide(abcString, s) {
	var ss = s, cs = null;
	for (; ss; ss = ss.prev) {
		cs = ss;
	}

	var c = abcString.slice(cs.istart - 1, cs.istart);
	if ('/' == c) {
		return true;
	}
	return false;
}

function splerror(msg, p1) {
	var s = abc.getCurS();
	abc.error(1, {
		fname : s.fname,
		istart : s.istart
	}, msg, p1);
}

function splSy(y) {
	return Number(abc.sy(y).toFixed(2));
}
function splSx(x) {
	return Number(abc.sx(x).toFixed(2));
}

// 全休止符的表示
function fullRest(abcString, meter, curS, type, sw, restY) {
	var beat = 0, len = 0;
	// 1、L（如L:1/8）表示最小单位
	var l = getTag(abcString, "L");
	var w = sw[0], h = sw[1];
	if(!meter){
		//没有取到拍号时（散拍子时，会隐藏拍号），自己解析出拍号 add by hxs
		var mstr = getTag(abcString, "M").replace("M:","").replaceAll(" ","");
		meter = new Object();
		meter.top = mstr.split("/")[0];
		meter.bot = mstr.split("/")[1];
	}
	// 2/2
	if(meter.bot == 2){
		meter.bot = 4;
		meter.top = meter.top * 2;
	}
	
	beat = Number(meter.top);
	len = meter.bot;
	if(beat > len){
		// 去掉对拍子的限制
		//beat = Number(len);
	}
	

	var nflags = 0;
	switch (len) {
		case "8":
			nflags = 1;
			break;
		case "16":
			nflags = 2;
			break;
		case "32":
			nflags = 3;
			break;
		case "64":
			nflags = 4;
			break;
	}
	var nx = 0, prevX = Number(curS.prev ? curS.prev.x : 0);
	if(curS.prev && curS.prev.type == 14){
		// 如果碰到tempo，那么再往前取一个
		prevX =	Number(curS.prev.prev ? curS.prev.prev.x : 0)
	}
	if(curS.next){
		nx = Number(curS.next.x) - prevX;
	}else{
		nx = (Number(curS.x) - prevX) * 2;
	}
	space = (nx - 1 - beat * Number(w)) / (beat + 1);
	// 计算全音休止符居中显示的空隙
	// w = w*1.81;
	// 如果前一个字符不是小节线，那么扣掉一字符的宽度
	if (curS.prev && curS.prev.type != 0) {
		space -= Number(w) / (beat + 1);
	}

	// 如果前一个字符是小节线并有“：”，那么扣掉一“：”的宽度
	if (curS.next && /:/.test(curS.next.bar_type)) {
		space -= Number(4 + 2 + 2) / (beat + 1);
	}
	var restBaseX = prevX + 1;
	// 如果前一个字符不是小节线，那么偏移.7的宽度
	if (curS.prev && curS.prev.type != 0) {
		restBaseX += Number(w);
	}

	var lastX = 0;
	for (var beatToal = beat, i = 0; beatToal > 0;) {
		var currBeatArr = [];
		for (var j = 0; j < beatArr.length; j++) {
			if (beatToal >= beatArr[j][0]) {
				currBeatArr = beatArr[j][1];
				beatToal -= beatArr[j][0];
				break;
			}
		}

		for (var n = 0; n < currBeatArr.length; n++) {
			for (var a = 0; a < currBeatArr[n].length; a++) {
				var restX = restBaseX + Number(w) * i + space * (i + 1);
				drawIns.drawNote('0', abc.sx(restX), restY,null,i);
				if(i == 0){
					drawIns.drawRect( abc.sx(restX - 2), restY - abc.sh(h), abc.sh(w + 4), abc.sh(h + 4));
				}
				var lineY = restY;
				for (var m = 0; m < nflags; m++) {
					// 音的下划线
					lineY += underlineSpace; // 
					var underlineX = restX; // -4 用于微调，随机改动
					// 绘制下划线
					drawIns.drawLine(abc.sx(translateValue(type, underlineX)), lineY, underlineLen);
					// 连线
					var linkX = restX;
					if (a < currBeatArr[n].length - 1) {
						// 绘制连线 : x,y ,l(负值表示反方向绘制)
						drawIns.drawLine(abc.sx(translateValue(type, linkX)), lineY, space + Number(w));
					}
				}
				if(n == currBeatArr.length - 1){
					lastX = restX;
				}
				i++;
			}
		}
	}
	return lastX;
}
// 或的关系
function eq(name, val){
	return new RegExp( '(' + name.replace(/\,/g,'\|') + ')').test(val);
}
/**
 * 高低八度变化
 * */
function eightDegreesChange(abcString, curNumNote){
	// 判断是否大写，如果是（X,），
	// 1、降8度时，依次加","（X,,，X,,,...）
	// 2、升8度时，判断“,”的个数，如果等于-1时，则改为小写（x），如果等于-2时，则改为（x'），以此类推...
	var octaveVal = getAbcKeyValue($('#source').val(), 'octave');
	if(!octaveVal){
		return curNumNote;
	}
	octaveVal = octaveVal.replace('=','');
	
	if(octaveVal == 0){
		return curNumNote;
	}
	
	// X'=>x
	curNumNote = curNumNote.replace(/([A-Z])\'/g, function($1) {
		// console.log("X'=>x================",arguments)
		if ($1) {
			return $1.replaceAll("\'", '').toLowerCase();
		}
		;
	});
	// x,=>X
	curNumNote = curNumNote.replace(/([a-z]),/g, function($1) {
		// console.log('x,=>X================',arguments)
		if ($1) {
			return $1.replaceAll(",", '').toUpperCase();
		}
	})

	
	var sub = ",,,,,,,,,";
	var sup = "'''''''''";
	
	if(/[A-Z]/g.test(curNumNote)){
		if(octaveVal < 0){
			// 1、降8度时，依次加","（X,,，X,,,...）
			curNumNote = curNumNote + sub.slice(0, Math.abs(octaveVal));
		}else{
			// 2、升8度时，判断“,”的个数，如果等于-1时，则改为小写（x），如果等于-2时，则改为（x'），以此类推...
			for(var i = 1, j = 0; i <= Math.abs( octaveVal); i++, j++){
				
				var sign = curNumNote.match(/,/g);
				var signNum = sign ? sign.length: 0;
				var diff = signNum - j;
				if(diff > 0){
					curNumNote = curNumNote.slice(0, -1);
				}else{
					
					if(-1 == diff){
						curNumNote = curNumNote.toLowerCase();
					}else{
						curNumNote = curNumNote + "'";
					}
				}
			}
		}
		
	}else{
		// 判断是否大写，如果不是（x）
		// 1、升8度时，依次加"'"（x'，x''...）
		// 2、降8度时，判断“'”的个数，如果等于-1时，则改为大写（X），如果等于-2时，则改为（X,），以此类推...
		if(octaveVal > 0){
			// 1、升8度时，依次加"'"（x'，x''...）
			curNumNote = curNumNote + sup.slice(0, octaveVal);
		}else{
			// 降8度时，判断“'”的个数，如果等于-1时，则改为大写（X），如果等于-2时，则改为（X,），以此类推...
			for(var i = 1, j = 0; i <= Math.abs(octaveVal); i++, j++){
				
				var sign = curNumNote.match(/\'/g);
				var signNum = sign ? sign.length: 0;
				var diff = signNum - j;
				if(diff > 0){
					curNumNote = curNumNote.slice(0, -1);
				}else{
					
					if(-1 == diff){
						curNumNote = curNumNote.toUpperCase();
					}else{
						curNumNote = curNumNote + ",";
					}
				}
			}
		}
	}
	return curNumNote;
}

// 获取简谱的音符
function getSplnum2note(curnote, type, curVoicetb, abcString, s){
	var curNumNote = null, curMode = null;
	if (type != 'rest' && isFixedMode == 0) { // 首调唱名法
		// 通过各种移调后，得到的简谱上的音
		curMode = getToneMark(abcString, curVoicetb.key, true);
		//高低八度变化
		curnote = eightDegreesChange(abcString, getNote(curnote));
		curNumNote = getSimpleNameByKAndStaff(curMode, getNote(curnote), abcString, s.st, s.istart);
		if (!curNumNote) {
			curNumNote = "X"; // 找不到对应的简谱
		}
	} else {
		curNumNote = note2number(curnote);
	}

	// 节奏型谱上的音显示“X”
	if (isRhythm(s )) {
		curNumNote = curNumNote.replace(/\d/, 'X');
	}
	// 打击乐
	if(s.a_stk && s.a_stk.length){
		if(s.a_stk[0].t && s.a_stk[0].t != '{' && s.a_stk[0].t != '}'){
			curNumNote = curNumNote.replace(/\d|X/g, s.a_stk[0].t);
		}
	}
	// 扩展音符处理
	var tmpCurNote = curnote.replaceAll("/","").replaceAll(",","").replaceAll("'","");
	if(abc.isExtendChar(tmpCurNote)){
		curNumNote = curNumNote.replace(/\d/, abc.getExtendObject(tmpCurNote).show_char);
	}
	//140和141音色的所有音符在简谱中显示为X
	if(eq('140,141', s.p_v.instr)){
		curNumNote = curNumNote.replace(/\d/, 'X');
	}
	
	return curNumNote;
}


// 绘制工具
var DrawUtil = function(){}
DrawUtil.prototype = {
		init: function(s){
			this.curS = s;
		},
		// 绘制附点
		drawDot: function( x, y, w){
			var s = this.curS;
			
			if (!(s.dots && s.dots > 0 && s.nflags >= 0)) {
				return;
			}
			for (var i = 0; i < s.dots; i++) {
				abc.out_svg('<circle cx="' + (splSx(x) + Number(s.wl || 2) + Number(w)  + 4 * i +3) + '" ');
				abc.out_svg(' cy="' + (y - abc.sh(1)) + '" r=".7" stroke="black" stroke-width="1"/>');
			}
		},
		// 绘制升降号
		drawSharpSign: function(curnote, x, y){
			if (curnote.match(/\^+|\_+|=/)) {
				var accType = "";
				var accName = curnote.match(/\^+|\_+|=/)[0].replace(/\^+|\_+|=/g, function(x) {
					switch (x) {
						case "^^":
							accType = "acc1";
							return "&#x1d12a;";
						case "^":
							accType = "acc1";
							return "♯";
						case "=":
							accType = "acc3";
							return "♮";
						case "_":
							accType = "acc-1";
							return "♭"
					}
					return "&#x1d12b;"
				})
				// 重升
				var relift = ("&#x1d12a;" == accName);
				abc.out_svg('<text type="'+accType+'" text-anchor="middle" style="font-size: ' + (relift ? "20px":"12px" ) + '" x="' + x + '" ');
				abc.out_svg('y="' + ( relift ? ( y + abc.sh(4) ) : y )+ '" height="24">' + accName + '</text>');
				return 4;
			}
			return 0;
		},
		// 绘制简谱音符
		drawNote: function(numNote, x, y, fontsize,index){
			// 有超链接的音符变成红色
			var color = "";
			if(this.curS.a_gch){
				for(var i=0;i<this.curS.a_gch.length;i++){
					var text = this.curS.a_gch[i].text;
					var urlPattern = /url\((.*)\)/;
					if(urlPattern.test(text)){
						color = "color:red;";
					}
				}
			}
			var selectedClass = "";
//			if(this.curS.istart == update_note_istart){
//				selectedClass = "selected_text";
//			}
			var firstNoteSeq = getFirstNoteSeq();//第一个音符的位置
			if(this.curS.istart == parseInt(update_note_istart)+(parseInt(firstNoteSeq)-parseInt(lastFirstNoteSeq)) && index == update_note_index && musicType==2){
				selectedClass = "selected_text";
			}
    		
			abc.out_svg('<text type="note" istart="'+this.curS.istart+'" class="'+selectedClass+' splnum f1 splfont ' + this.curS.istart+ '_' + this.curS.ctype + '" ');
			abc.out_svg('style="' + color + (numNote == "X" ? "font-size:16px;" : "") + ( fontsize ? ("font-size:" + fontsize + "px;") : "" ) + '" x="' + translateValue(this.curS.ctype, x) + '" ');
			abc.out_svg('y="' + y + '" height="24" update_index="'+index+'">' + numNote + '</text>');
		},
		// 绘制简谱拍号（如：4/4）
		drawSplMeter: function(meter, x, y, scale, w, h, istart){
			// 如果已经绘制过速度，而拍号又没有变化，则直接跳过（这种情况出现在有变速时，也会重新绘制调号和拍号）
			// 如果是首行多个拍号（this.curS.a_meter.length>0）的情况，也需要绘制。
			if(hasTempo && meter==lastMeter && !abc.cfmt().showmeterinstaff && this.curS.a_meter.length == 0){
				lastMeter = meter;
				return;
			}
			var tgls = abc.tgls;
			meter = getMeter(meter);
			if (!meter) {
				return;
			}
			
			abc.out_svg('<g type="meter" class="spl_meter"' );
			abc.out_svg('transform="translate(' + abc.sx(x) + ',' + y + ') ' + (scale ? 'scale(' + scale + ')' : '') + '" ');
			abc.out_svg('text-anchor="middle">');
			abc.out_svg('<text type="meter" y="-17">');
			//top会有多个值吗，先去掉循环，delby huangxs
//			for (var i = 0; i < meter.top.length; i++) {
//				abc.out_svg(tgls[METER + meter.top[i]].c);
//			}
			abc.out_svg(tgls[METER + meter.top].c);
			abc.out_svg('</text>');
			abc.out_svg('<path type="meter" class="stroke" stroke-width="1.2" d="m-6,-8h12z"/>');
			abc.out_svg('<text type="meter" x="-0">' + tgls[METER + meter.bot].c + '</text>');
			// console.log('curS-----', this.curS)
			if(w && h){
				if(istart){
					drawIns.drawRect(-6,-h + this.curS.wr/2, w, h , -1, null, null, istart);
				}else{
					drawIns.drawRect(-w + this.curS.wr/2 + 5,-h + this.curS.wr/2, w, h , -1);
				}
			}
			abc.out_svg('</g>');
			hasTempo = true;
			lastMeter = meter;
		},
		drawSplMeterPlaceholder:function(x, y, length){
			abc.out_svg('<rect type="splplaceholder" x="' + x + '" ');
			abc.out_svg('y="' + y + '" width="' + abc.sh(6) + '" height="' + abc.sh(2) + '" fill="block"/>');
		},
		// 绘制简谱调号（如：1=C）
		drawSplMode: function(x, y, mode, isChangeMode, scale){
			//如果已经绘制过速度，而调号又没有变化，则直接跳过（这种情况出现在有变速时，也会重新绘制调号和拍号）
			if(hasTempo && mode==lastTone){
				return;
			}
			var modeString = "";
			if (!tmVal2key[mode]) {
				splerror("找不到简谱的调号$1", mode);
			} else {
				modeString = tmVal2key[mode].replace(/[,\']*/g, '').toUpperCase();
			}

			if (!isChangeMode) {
				x += tempoMgL;
			}

			var fw = 0;
			if (isChangeMode) {
				fw = abc.setStrwh("转")[0];
			}

			abc.out_svg('<g type="key" class="spl_meter_mode" style="font-family:serif; font-weight:bold; font-size:15px" ');
			abc.out_svg('transform="translate(' + abc.sx(x + fw) + ',' + y + ') ' + (scale ? ' scale(' + scale + ')' : '') + '" ');
			abc.out_svg('text-anchor="middle">');
			abc.out_svg('<text type="key" >' + (isChangeMode ? '转' : '') + '1</text>');
			abc.out_svg('<text type="key" x="' + (10 + fw) + '">=</text>');
			
			var space = this.drawSharpSign(modeString, 18 + fw, -5);
			abc.out_svg('<text type="key" x="' + (18 + fw + space) + '" text-anchor="start">' + modeString.replace(/\^+|\_+|=/g, '') + '</text>');
			abc.out_svg('</g>');
			// 如 1=C在选中框
			if(this.curS.p_v.ckey){
				this.drawRect(abc.sx(x + fw -3), y-abc.setStrwh("0")[1] +3, 28+ space, abc.setStrwh("0")[1], -1, null, null, this.curS.p_v.ckey.istart);
			}
			
			x += 28 + space + abc.setStrwh("2")[0] + 3;
			lastTone = mode;
			return x;
		},
		// 绘制简谱的下划线（x,y, l长度）
		drawLine: function(x, y, length){
			abc.out_svg('<line x1="' + x + '" y1="' + y + '" x2="' + (length + x) + '" y2="' + y + '" class="splnum stroke" stroke-width="1" fill="black"/>');
		},
		// 绘制简谱1拍的占位符（-）
		drawPlaceholder: function(x, y) {
			abc.out_svg('<rect type="splplaceholder" x="' + x + '" ');
			abc.out_svg('y="' + y + '" width="' + abc.sh(6) + '" height="' + abc.sh(2) + '" fill="block"/>');
		},
		// 绘制附点
		drawDot2: function( x, y, n, w, s){
			for (var i = 0; i < n; i++) {
				abc.out_svg('<circle cx="' + (x + Number(w)  + (s || 0) + 4 * i +3) + '" ');
				abc.out_svg(' cy="' + (y - abc.sh(1)) + '" r=".7" stroke="black" stroke-width="1"/>');
			}
		},

		// 绘制简谱滑音的尾巴
		drawGraceTail: function(type, x, y, x1) {
			var y1 = 5;//circleSpace
			abc.out_svg('<g transform="translate(' + x + ',' + y + ')">');
			abc.out_svg('<path class="splnum stroke b-grace" stroke-width="1" stroke-linecap="round" stroke="black" ');
			abc.out_svg('d="m1,1 c' + ('b' == type ? -1 : 1) + ',' + y1 + ' 1,' + y1 + ' ' + ('b' == type ? -x1 + 2 : x1) + ',' + y1 + '"/>');
			abc.out_svg('</g>');
		},
		// 绘制简谱的小节线
		drawBar: function(ty, x, y, size, h){
			abc.out_svg('<path class="splnum stroke" transform="translate(0,' + ty + ')" stroke-width="' + size + '"');
			abc.out_svg(' d="m' + x + ',' + (y + bar_height - (bar_height-24) * .5 ) + 'v-'+(bar_height + (h || 0))+'"/>');
			splBarHeight = bar_height + (h || 0);
		},
		
		drawBracket:function (ty, x, y, h){
			abc.out_svg('<path type="bracket"  transform="translate(0,' + ty + ')" class="fill"\n\td="m' + x.toFixed(2) + " " + y.toFixed(2) + "\n\tc10.5 1 12 -4.5 12 -3.5c0 1 -3.5 5.5 -8.5 5.5\n\tv" + h.toFixed(2) + '\n\tc5 0 8.5 4.5 8.5 5.5c0 1 -1.5 -4.5 -12 -3.5"/>\n');
		},
		// 绘制简谱谱音同步的矩形块
		drawRect: function( x, y, w, h, i, num, chordindex, istart, isPlaceholder) {
			var clickStr = "";
			if(this.curS.ctype=="bar" || this.curS.ctype=="splnum_bar"){
				clickStr = " onclick='clickBar("+this.curS.istart+",event)'";
			}
			
			abc.out_svg('<rect '+clickStr+' ondblclick = "editorAnnot('+this.curS.istart+')" type="splnum_' + this.curS.ctype + '' + (isPlaceholder ? ' ph': '') + '" st="' + this.curS.st + '" v="' + this.curS.st + '" istart="' + this.curS.istart + '" class="abcr _' + (istart || this.curS.istart ) + '_' + (i == -1 ?  '' : (num || (this.curS.istart != i && this.curS.type != '10' ? '0' : ''))) + ' rt_' +  i + '" ');
			abc.out_svg( ( (num!== undefined || this.curS.istart != i) ? ( ' data-index="' + (num|| (this.curS.istart != i ? '0' : ''))+'" '):'' ) + ' data-origindex="'+this.curS.istart+'" data-chordindex="' +chordindex+ '" x="' + x + '" y="' + y + '"')
			
			// 音符的超链接
			if(this.curS.a_gch){
				for(var i=0;i<this.curS.a_gch.length;i++){
					var text = this.curS.a_gch[i].text;
					var urlPattern = /url\((.*)\)/;
					if(urlPattern.test(text)){
						var matchs = text.match(urlPattern);
						if(matchs!=null){
							var url = matchs[1];
							abc.out_svg(' onclick="window.open(\''+url+'\')"');
							abc.out_svg(' style="cursor: pointer;"');
						}
					}
				}
			}
			
			abc.out_svg(' width="' + w + '" height="' + h + '"/>\n');
		},
		// 绘制简谱的特殊符号
		drawDeco: function(x, y, splnum){
			
			var s = this.curS, isExistDim = false;
			if(isSameByline != (s.my_line + '' + s.v)){
				var cs = abc.clone(s) ;
				for(var nextS = cs.next; nextS; nextS = nextS.next){
					//以下是原来的逻辑，判断当前音符是否在渐强、渐弱里 del by hxs 22-3-31
//					if(nextS.a_dd && [].concat(nextS.a_dd).find(function(a){ return a.glyph == 'dim'})){
//						isExistDim = true;
//						//console.log('dim:')
//					}
					//判断音符是否有渐强渐弱包围
					if(checkNoteInDimOrCresc(s)){
						isExistDim = true;
					}
				}
//				isExistDimByLine = isExistDim;
				isSameByline = s.my_line + '' + s.v;
			}
			
			isExistDimByLine = isExistDim;
			// 高音的顶部为初始的top
			var a_dd = abc.clone(s.a_dd);
			
			
			
			
			if(a_dd && a_dd.length){
				//a_dd.reverse(); // 倒叙排列
				var lasth = 0, curX = x;
				for(var i = 0; i < a_dd.length; i++){
					
					var is_dot = false;
					if(!a_dd[i].glyph || a_dd[i].dd_en || a_dd[i].dd_st ){//sfz
						continue;
					}
					//简线混排不显示
					if(musicType==1){
						if(a_dd[i].glyph=="dnb" 
							|| a_dd[i].glyph=="upb"
							|| a_dd[i].glyph=="marcato"
							|| a_dd[i].glyph=="wedge"
							|| a_dd[i].glyph=="accent"
							|| a_dd[i].glyph=="stc"
							|| a_dd[i].glyph=="tenutoup"
							|| a_dd[i].glyph=="opend"
							|| a_dd[i].glyph=="dplus"
							|| a_dd[i].glyph=="snap"
							|| a_dd[i].glyph=="trl"
							|| a_dd[i].glyph=="umrd"
							|| a_dd[i].glyph=="lmrd"
							|| a_dd[i].glyph=="roll"
							|| a_dd[i].glyph=="turn"
							|| a_dd[i].glyph=="invertedturn"
								){
							
						}else{
							return;
						}
					}
					
					if(a_dd[i].name=="dot"){
						// 简谱跳音转成三角形的
						var ori_a_dd = new Object();
						ori_a_dd.func = 0;
						ori_a_dd.glyph = "wedge";
						ori_a_dd.h = 7;
						ori_a_dd.name = "wedge";
						ori_a_dd.wl = 3;
						ori_a_dd.wr = 3;
						xygl(curX + ori_a_dd.wl/2,y - abc.sh(lasth) , ori_a_dd, 1,null,s);
						return;
						
					}
					var tmpY = 0,tmpX = 0;
					// 当前小节线有符号，下一个音符也有符号，小节线的符号抬高
					if(s.type == 0 && s.next && s.next.a_dd){
						var nextAddArr = s.next.a_dd;
						for(var j = 0; j<nextAddArr.length; j++){
							if(eq('f,p',nextAddArr[j].name)){
								lasth += 15;
							}else{
								lasth +=  abc.sh(nextAddArr[j].h) + 5;
							}
						}
					}
					var glyph = a_dd[i].glyph;
					if( eqs('stc', glyph) ){ // .
						curX +=2;
					}if( eqs('wedge', glyph) ){ // .
					//	a_dd[i].h += 4; // todo 井冈山下种南瓜 使用大量的wedge，加这句代码会被拉高，估计是原来wedge高度不够，现在已经够了？
					}else if(eqs('turnx,sphr,turn', glyph)){ // turnx逆回音；turn： 回音
						curX += 2;
						y -= 3;
					}else if(eqs('coda', glyph)){
						curX -= 2;
						y -= 8;
						if(a_dd.find(function(a){return a.glyph == 'dacs'})){
							y -= 18;
						}
						
					}else if(eqs('l_brackets,r_brackets_l,r_brackets_r',glyph)){
						//左右括号
						if('l_brackets' == glyph){
							tmpY = 4;
							tmpX = 1;
						}else if('r_brackets_l' == glyph || 'r_brackets_r' == glyph){
							if('r_brackets_l' == glyph){
								tmpX = -15
								if(s.bar_type && s.bar_type.indexOf(":")>-1){
									tmpX -= 10
								}
							}else{
								tmpX = 3
							}
							tmpY +=2;
						}
					}else if(eq('brth', glyph)){ // 呼吸
						curX += 8;
					}else if(eq('lmrd', glyph)){ // 
						y -= 3;
					}else if(eq('upb', glyph)){ // 换气符
						curX -= a_dd[i].wl + 3;
					}else if(eq('pf',glyph)){
						curX -= a_dd[i].wl;
					}else if('sld'==glyph || 'sld_spl'==glyph){// 滑音 hxs
						curX -= 17;
						y += 10;
						a_dd[i].glyph="sld_spl";
						
					}else if('sldlu'==glyph || 'sldlu_spl'==glyph){// 滑音hxs
						curX -= 17;
						a_dd[i].glyph="sldlu_spl";
					}else if('sldrd'==glyph || 'sldrd_spl'==glyph){// 滑音hxs
						curX += 5;
						y += 5;
						a_dd[i].glyph="sldrd_spl";
					}else if('sldru'==glyph || 'sldru_spl'==glyph){// 滑音hxs
						curX += 5;
						a_dd[i].glyph="sldru_spl";
					}else if(eqs('dacs',glyph)){
						//dc/ds alfine fine等放在小节线下面
						y = y + 40
						// 可能是被下一个音符的符号，抬高了。
						if(s.next && s.next.a_dd &&s.next.a_dd.length > 0){
							y = y + 12;
						}
						curX -= 20;
					}else if(eqs('strong,sec_strong,weak',glyph)){
						if(musicType==1){
							//简线混排时，不显示简谱的强弱标记
							return;
						}
						curX -= 5;
					}else if(eq('arp',glyph)){
						// 琶音
						var offset_x = 10
						// 4拍及以上的琶音会和谱子黏在一起，增加一些距离
						if(s.dur_orig == s.p_v.meter.wmeasure){
							if(s.dur_orig>=1536){
								offset_x = 15;
							}
						}
						out_spl_arp(splSx(s.x) - offset_x + tmpX,y + chordHei * s.notes.length - 10 + tmpY, 0,0,chordHei * s.notes.length - 20);
						continue;
					}else if( eq('emb', glyph)){
						y += 3;
					}else if(eqs('do,re,mi,fa,sol,la,si',glyph)){//"dao", "rui", "mi", "fa", "sou", "la", "si"
						//唱名显示在下面
						y = y + 50;
					}
					
					// f,p 系列的特殊符号，遇到连音线时，向上微调
					if(musicType!=0 && s.type != 0 && eqs('f,ff,fff,ffff,fp,pf,p,pp,ppp,pppp',a_dd && a_dd[i].name)){
						//y -= 8;
					}
					// 后面的参数指是什么
//					if(musicType!=0 && s.type != 0 && eqs('f,ff,fff,ffff,fp,pf,p,pp,ppp,pppp',a_dd && a_dd[0].name) && !eqs('fa',glyph) && s.beam_st && a_dd[i].glyph!="img"){
//						y -= 8;
//					}
					
					if(isExistDimByLine &&!eqs('l_brackets,r_brackets_l,r_brackets_r',glyph)){
						y -= 20;
					}
					// 此处处理的是依音附带的符号
					if(s.grace){
						if(musicType == 2){
							y = 0;
							curX = curX - 2;
						}
						y = translateValue('grace', y);
						curX = translateValue('grace', curX );
					}
					
					if(eq('p',glyph)){ // p相关的符号，微微网上调
						y -= 3;
					}
					
					xygl(curX + a_dd[i].wl/2 + tmpX,y - abc.sh(lasth) + tmpY, a_dd[i], 1,a_dd[i].anchor,s);
					if(!eqs('l_brackets,r_brackets_l,r_brackets_r',glyph)){
						lasth += a_dd[i].h + 2;
					}
					
					curX = x;
					a_dd[i].glyph = glyph;
					splnum && (splnum.decoPos = lasth );
					
					if(splnum && eqs('f,ff,fff,ffff,fp,pf,p,pp,ppp,pppp',a_dd && a_dd[i].name)){
						splnum && (splnum.decoPos -= 12);
					}
					
					//console.log('splnum.decoPos--------',y, s)
					
					//console.log('glyph-----',glyph)
					if(eq('p',glyph)){
						y = y+20;
					}
				}
			}
			//以下处理滑音**********start
			var a_dcn = abc.clone(s.notes[0].a_dcn);
			if(a_dcn && a_dcn.length){
				if("~("==a_dcn[0]){
					if(s.next){
						var x2 = -1;
						var y2 = -1;
						var x1 = s.x;
						var y1 = s.y;
						if(s.next.type==8){
							x2 = s.next.x;
							y2 = s.next.y;
							
						}else if(s.next.type==0){
							//下一个是小节线
							x2 = s.next.next.x;
							y2 = s.next.next.y;
						}
						var ar = -Math.atan2(y2 - y1, x2 - x1),
						a = ar / Math.PI * 180,
						len = (x2 - x1) / Math.cos(ar);
						x1 = s.dots ? 13 + s.xmx: 8;
			            len = (len - x1 - 6) / 6 | 0;
			            if (len < 1) len = 1;
					}
					if(a>0){
						abc.out_svg('<g transform="translate('+(splSx(x)+12)+','+(y+8)+') rotate('+a.toFixed(2)+')">');
					} else {
						abc.out_svg('<g transform="translate('+(splSx(x)+12)+','+(y+20)+') rotate('+a.toFixed(2)+')">');
					}
					var px = 0;
					while (--len >= 0) {
		                abc.out_svg('<use x="' + px + '" y="' + (0) + '" xlink:href="#ltr"/>\n');
		                px += 6;
		            }
					abc.out_svg('</g>')
				}
			}
			//以好处理拨音**********end
			//处理震音
			if(s.trem1){
				abc.out_svg('<use x="' + (splSx(s.x)) + '" y="' + (0) + '" xlink:href="#zy'+s.ntrem+'"/>\n');
			}
			//处理震音结束*************
		},
		// 绘制注释
		drawGch: function(x , y){
			//简线混排不显示指法
			if(musicType==1){
				return;
			}
			var s = this.curS, addHei = 0;
			var a_dd = abc.clone(s.a_dd);
			// 连音符上的注释，应加上连音符高度，否则注释与连音符交叉显示。
//			if((s.a_dd || s.a_gch) && 'sls' in s){
//				addHei = 10; 
//			}
			
			// 注释前方发现简谱显示移调标识，默认值为高度多加5
			if(s.prev && s.prev.splnum_trans_key){
				addHei = 5;
			}
			// add y 坐标已累计过，这边不在处理
//			if(a_dd && a_dd.length){
//				//a_dd.reverse(); // 倒叙排列
//				var lasth = 0, curX = x;
//				for(var j = 0; j < a_dd.length; j++){
//					if(!a_dd[j].glyph || a_dd[j].dd_en || a_dd[j].dd_st ){//sfz
//						continue;
//					}
//					if(eq('f',a_dd[j].name)){
//						addHei += a_dd[j].h/2;
//					}else{
//						addHei += a_dd[j].h;
//					}
//				}
//			}
			var a_gch = abc.clone(s.a_gch);
			if(a_gch && a_gch.length){
				a_gch.reverse();//倒序
				abc.set_font('annotation');
				var lasth = 0, curX = x, h = abc.setStrwh("注")[1] + 2;
				y -= addHei;
				var urlPattern = /url\(.*\)/;
				var regStart = new RegExp(/^\([,']([0-9]+)\-$/);//跨声部连音线
				var regEnd = new RegExp(/^\-([0-9]+)\)$/);//跨声部连音线
				var regArpStart = new RegExp(/^\(arp[0-9]+\-$/);//跨声部琶音
				var regArpEnd = new RegExp(/^\-[0-9]+arp\)$/);//跨声部琶音
				
				// 这个判断原来 写在了for循环，导致成倍数加高。(给没有感情符号的连音线，补充高度)
				if((s.slur_start != null || s.slur_end != null || s.ti1 || 'tie_s' in s || 'sls' in s|| 'sl1' in s || 'tp' in s) && !s.a_dd){
					// 简线混排有点挤，于是设置10，效果最佳
					//musicType == 1 ? y-= 10 : y-= 15;
					y-=10;
				}
				
				// 同一个音符上既有连音线又有渐强渐弱
				if( musicType == 2 && (s.ti1 || 'tie_s' in s || 'sls' in s|| 'sl1' in s || 'tp' in s) && s.a_dd && s.a_dd[0].glyph == 'dim'){
					y-=s.a_dd[0].h;
				}
				
				for(var i = 0; i < a_gch.length; i++){
					// 过滤掉url
					if(urlPattern.test(a_gch[i].text) || regStart.test(a_gch[i].text) || regEnd.test(a_gch[i].text) || regArpStart.test(a_gch[i].text) || regArpEnd.test(a_gch[i].text)){
						continue;
					}
					//如果是简线混排，不显示指法标记
					if(musicType==1){
						if(a_gch[i].text.indexOf("fng:")==0){
							continue;
						}
					}
					// 背景颜色不作为注释
					if(a_gch[i].text && a_gch[i].text.indexOf("rgb")> -1){
						continue;
					}
					var type = a_gch[i].type;
					if( i != 0){
						y -= abc.sh(h); //todo
					}
					
					if(!isChinese2txt(a_gch[i].text)){
						// 字母注释，加高
						y-=6;
					}
					 if(a_gch[i].text && !a_gch[i].text.repeat(/\s/g,'')){ // 空格取一半的高度
						 y += h*.5;
					 }
					
					if(a_gch[i].text=="サ"){
						y += 18;
						x -= 30;
					}
					
					//中文的注释被遮住部分的问题
					if(isChinese2txt((a_gch[i].text ? a_gch[i].text[0] : ''))){ // 中文
						y -= h*.5;//原来是0.3，高音的那个点会被盖住，改成0.52022-3-15
					}
					
//					if(!isChinese2txt((a_gch[i].text ? a_gch[i].text[0] : '')) || (isChinese2txt((a_gch[i].text ? a_gch[i].text[0] : '')) && a_gch.length==1)){ // 中文
//						y += h/2;
//					}
					// 同音换指 指法 add by hxs
					var str = a_gch[i].text;
					var ox = 0,oy=0;
					var kfont = "";
					if(type=="<" || type==">"){
						var omatchs = str.match(/^\[(.[^\[]*)\]/);
						if(omatchs!=null){
							ox = omatchs[1].split(",")[0];
							oy = omatchs[1].split(",")[1];
						}
						str = str.replace(/^\[.[^\[]*\]/,"");
						x += parseInt(ox)+scale;
						if(type=="<"){
							x += scale*1.5;
						}
						
						y += parseInt(oy);
						
						kfont = " splfont ";
						
	                }
					//小节或音符背景色
					if(str.indexOf("-mb-")==0 || nbReg.test(str)){
		            	continue;
		            }
					//中途变换音色
					if(str.indexOf("midi")==0){
						continue;
					}
					if(str.indexOf("x-in:")>-1){
						continue;
					}
					
					
					//设置在单行模式下 添加括号
		            if(str.indexOf("-bk-")==0 || str.indexOf("-v-")==0){
		            	continue;
		            }
		            //连音线弧度
		            if(str.indexOf("sh:")==0){
		            	continue;
		            }
		            //自定义连音线
		            if(str.indexOf("(slur-")>-1 || str.indexOf(")slur-")>-1){
		            	continue;
		            }
		            //自定义带中括号的注释
		            if(/\[-\d/.test(str) || /\d{1,3}\-\]/.test(str)){
		            	continue;
		            }
		            var xcoorMatch = str.match(xcoorGchReg);
		            var ycoorMatch = str.match(ycoorGchReg);
		            var xCoorVal = 0;//注释x方向偏移
		            var yCoorVal = 0;//注释y方向偏移
		            if(xcoorMatch!=null){
		            	xCoorVal = parseInt(xcoorMatch[1]);
		            	//x -= transX;
		            	x += xCoorVal;
		            }
		            if(ycoorMatch!=null){
		            	yCoorVal = parseInt(ycoorMatch[1]);
		            	//y-= transY;
		            	y -= yCoorVal
		            }
		            
					if(str.indexOf("fng:")>-1){
		            	str = str.replace("fng:","");
		            	x+=5;
		            	y+=5
		            	abc.out_svg('<text x="' + splSx(x + a_gch[i].x) + '" y="' + y + '" class="fng">' + str + '</text>\n');
		            }else{
		            	if(a_gch[i].type!="@"){
		            		var style = "";
		            		if(xcoorGchReg.test(str) || ycoorGchReg.test(str)){
				            	str = str.replace(xcoorGchReg,"").replace(ycoorGchReg,"");
				            }
		            		if(str.indexOf("[font-size")>-1){//注释设置字体大小
		                		var fontsizeset = /\[(font-size:.*)\]/.exec(str);
		                		if(fontsizeset!=null){
		                			style += /\[(font-size:.*)\]/.exec(str)[1];
		                			str = str.replace(/\[(font-size:.*)\]/,"");
		                		}
		                	}
		            		
		            		var eventStr = "";
		                	var gchIstartInfo = "";
		                	eventStr = " onmousemove='moveSvgText(event)' onmousedown='mousedownSvgText(event)' onmouseup='mouseupSvgText(event)' onmouseout='mouseoutSvgText(event)'";
		                	var cgch = s.a_gch[i];
		                	gchIstartInfo += ' gch_istart="'+cgch.istart+'" gch_iend="'+cgch.iend+'" '
		                	
		            		abc.out_svg('<text ondblclick="editorAnnot('+s.istart+')" istart="'+s.istart+'" type="zs"'+eventStr + gchIstartInfo+' xml:space="preserve" style="'+style+'" x="' + splSx(x + a_gch[i].x) + '" y="' + y + '" class="'+kfont+'f' + a_gch[i].font.fid + '">' + str + '</text>\n');
		            	}
		            }
					
				}
			}
		},
		drawBarnum: function(x , y, num){
			return;//这里先不自己画，用abc2svg自带的，(问题：在只有x的小节，不会画会小节序号)add by hxs 2021-4-26
			var s = this.curS, addHei = 0;
			while(s.v!=0){
				s = s.ts_prev;
				if(!s){
					return;
				}
			}
			if(!num){ // 如果有值无需考虑s的信息
				if(s.bar_num && !s.next){
					lastBarNumMap[s.my_line] = s.bar_num || '';
				}
				if(!s.bar_num || !s.next){
					return;
				}
			}
			var a_dd = abc.clone(s.a_dd);
			if(a_dd && a_dd.length){
				//a_dd.reverse(); // 倒叙排列
				var lasth = 0, curX = x;
				for(var j = 0; j < a_dd.length; j++){
					if(!a_dd[j].glyph || a_dd[j].dd_en || a_dd[j].dd_st ){//sfz
						continue;
					}
					addHei += a_dd[j].h;
				}
			}			
			abc.set_font('measure');
			abc.out_svg('<text x="' + splSx(x) + '" y="' + (y - addHei - 3 ) + '" class="' +abc.font_class(abc.gene().curfont)+ '">' + (num ? num : s.bar_num) + '</text>\n');
		}
}

// 绘制其他符号
function xygl(x, y, add, isPassRpl,anchor,s) {
	var gl = add.glyph;
	var aDeco = abc.get_deco_str_style[gl];
	///[0-9]/g.test(add.str) sfz
	if(add.str && aDeco ){ 
		if (!aDeco.def) {
			abc.add_style("\n." + gl + " {" + aDeco.style + "}");
		}
		
		 // 如果本身有定义文本对齐方式，对替换掉默认的 add by hxs--------start
        var anchor_str = aDeco.anchor;
        if(anchor){
        	if(anchor_str){
        		anchor_str = anchor_str.replace("middle",anchor); 
        	}
        }
        
        
		abc.out_svg('<text x="' + splSx(x) + '" y="' + y + '" cat="decos" istart="' + s.istart + '" type="' + gl + '" class="' + gl + '" ' + (anchor_str || "")+ '>' + add.str + '</text>\n');
		return;
	}
	
    var tgl = abc.tgls[gl];
    var glyphs = abc.get_glyphs();
    if (tgl && !glyphs[gl]) {
        x += tgl.x * abc.stv_g().scale;
        y += tgl.y;
        if(tgl.sc){
        	abc.out_svg('<text cat="decos" type="' + gl + '" istart="'+s.istart+'" transform="translate(' + splSx(x) + ',' + y + ') scale(' + tgl.sc + ')">' + tgl.c + '</text>\n');
        }else{
        	abc.out_svg('<text x="' + splSx(x) + '" y="' + y + '" cat="decos" type="' + gl + '" istart="'+s.istart+'">' + tgl.c + '</text>\n');
        }
        return
    }
    if (!glyphs[gl]) {
        return
    }
    abc.def_use(gl,add.path);
    if(gl=="img"){//自定义图片特殊处理
    	//out_XYAB('<use type="'+gl+'" x="X" y="Y" xlink:href="#A"/>\n', x, y, gl+"_"+s.curr_dd.path);//图片要自定义多个use
    	if(musicType==2){
    		var pos = add.pos;
    		var offset_x = 0;
    		var offset_y = 0;
    		if(pos == "<"){
    			//在音符前面显示
    			offset_x = -20;
    			offset_y = 35;
    		}
    		abc.out_svg('<use x="' + (splSx(x+offset_x)) + '" y="' + (y+offset_y) + '" cat="decos" type="' + gl + '" istart="'+s.istart+'" xlink:href="#' + gl+"_"+add.path + '"/>\n');
    	}
    }else{
    	if("r_brackets_l"==gl || "r_brackets_r"==gl || "l_brackets"==gl){
    		if(bracketsArr.indexOf(gl+s.istart)>-1){
    			return;
    		}
    		bracketsArr.push(gl+s.istart);
    	}
    	abc.out_svg('<use x="' + splSx(x) + '" y="' + y + '" cat="decos" type="' + gl + '" istart="'+s.istart+'" xlink:href="#' + gl + '"/>\n');
    	
    }
    
    
}


//简谱的
function out_spl_arp(tx,ty,x, y, val) {
	abc.out_svg('<defs><path id="ltr" class="fill"\n\td="m0 -.4c2 -1.5 3.4 -1.9 3.9 .4 0.2 .8 .7 .7 2.1 -.4\n\tv0.8c-2 1.5 -3.4 1.9 -3.9 -.4 -.2 -.8 -.7 -.7 -2.1 .4z"/></defs>');
	abc.out_svg('<g class="arp_spl" transform="translate('+tx+','+ty);
	abc.out_svg(") rotate(270");
//    if (sx) {
//        if (sy) abc.output += ") scale(" + sx.toFixed(2) + ", " + sy.toFixed(2);
//        else abc.output += ") scale(" + sx.toFixed(2)
//    }
	abc.out_svg(')">\n');
    x = 0;
    y = -4;
    val = Math.ceil(val / 6);
    //這是向上的琶音
    //output += '<use x="4" y="'+(val+1)*6+'" xlink:href="#wedge" transform="rotate(-90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';
    //这是向下的琶音
    //output += '<use x="'+y+'" y="6" xlink:href="#wedge" transform="rotate(90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';
    while (--val >= 0) {
//        xygl(x, y, "ltr");
        abc.out_svg('<use x="'+x+'" y="'+y+'" xlink:href="#ltr"></use>');
        x += 6;
    }
    abc.out_svg("</g>\n");
}

//-------------------散拍按空格连接---------------------------

//检查是否需要连音
function checkBeam(type, abcString, curS) {
	if (type == 'grace') {
		return [ curS.next ? isNeedLink(abcString, curS.next.istart) : false, curS.next ];
	}

	var checkNormalBeam = false, nextS = null;
	for (var ts = curS.next; ts; ts = ts.next) {
		// 找出不为依音的音符（不考虑y, type=11）
		if (ts.type != 4 && ts.type != 11 && ts.type != 5) {
			checkNormalBeam = isNeedLink(abcString, ts.istart, true, curS.ctype1 == 'chord');
			nextS = ts;
			break;
		}
	}
	return [ checkNormalBeam, nextS ];
}

// 判断是否需要连音，碰到空格
function isNeedLink(abcString, start, isRmvGrace, isChord) {
	// 去除各种其他符号
	var tmpAbc  = abcString.slice(0, start + 1);
	// 是否去掉依靠音符
	if (isRmvGrace) {
		tmpAbc = tmpAbc.replace(/\{\/?([\^\_]?[a-zA-Z][\'\,\/]*)*\}/g, '');
	}
	if (isChord) {
		tmpAbc = tmpAbc.replace(/\[.*\]/g, 'x');
	}

	//剥去其他符号，只留自然音
	//tmpAbc = tmpAbc.replace(/(![a-zA-Z0-9\>\<\.]*!)|("[a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D]*")|u|v|P|y|\.|\(|\)|{|}|\d|\-|\/|\'|,/g, '');//把引号内的全部替换掉，换成了下面那一行的写法 add by hxs
	tmpAbc = tmpAbc.replace(/(![a-zA-Z0-9\>\<\)\(\.]*!)|\[[a-zA-Z]*\s*:(\s|[a-zA-Z])*\]|("[^\"]*")|u|v|P|y|\.|\(\d*|\)|{|}|\d|\-|\/|\'|,/g, '');
	var prevNote = tmpAbc.slice(tmpAbc.length - 2, tmpAbc.length - 1);

	if (prevNote.replace(/[\s*\:\|\]]/g, '')) {
		return true;
	}
	return false;

}
//----------------------------------------------

// 1、计算当前帕子一拍的时间（八分音符为1拍的复合拍，以3拍（3拍一连接）一击打）
// 2、遇到小节或满一拍或没尾巴的情况不连接
// 3、依音直接连，直到依音结束就不连接
function CheckBeamIns(){}
CheckBeamIns.prototype = {
		beatTime: 0, // 击打一次拍的时间
		beatTimeCount: 0, // 累计击打一次拍的时间
		curS : null, 
		abcString: null,
		lastNoteDot: false, 
		lastNoteNflags: 0,
		currMeter: null,
		isComplex: false, // 是否符合拍
		init: function(abcString, curS){
			this.abcString = abcString;
			this.curS = curS;
		},
		minBeatTime: 0, // 最小单位拍的时值
		currComplexArrPoint: 0, // 当前复合拍数组指针
		complexForm: {
			6 : [3, 3], // 3拍一连、3拍一连
			7 : [3, 2, 2],// 3拍一连、2拍一连、2拍一连
			9 : [3, 3, 3],
			12 : [3, 3, 3, 3],
			16 : [3, 3, 3, 3, 2, 2]
		},
		currComplexArr: null, 
		// 设置1拍的时间
		setBeatTime: function(){
			if(!this.beatTime){
				var currMeter = getMeter( this.curS.p_v.meter.a_meter[0]);
				// 四分音符为1拍的谱子，以1拍一击打
				if(currMeter.bot < 4){ // 如：2/2 => 4/4
					currMeter.bot = 4;
					currMeter.top =( 4 / currMeter.bot ) * currMeter.top;
				}
				this.currMeter = currMeter;
				// 最小单位拍
				var l = getTag(this.abcString, "L");
				 if (!l) {
					 this.beatTime = this.curS.p_v.ulen;
				 }else{
					 var lnum = l.replace(/L:\s*/g, '');
					 
					 this.beatTime = this.minBeatTime = eval("1/" + currMeter.bot)/eval(lnum) * this.curS.p_v.ulen ;
					 
					 // 八分音符为1拍的复合拍谱子，以3拍（3拍一连接）一击打。 5拍除外
					 if(8 == currMeter.bot &&  currMeter.top > 5){
						 this.isComplex = true;
						 this.currComplexArr = this.complexForm[currMeter.top];
						 this.computBeatTime2point(0);
					 }else{
						 this.isComplex = false;
					 }
				 }
			}
		},
		// 如7拍[3,2,2] 
		computBeatTime2point: function(n){
			if(!this.isComplex){
				return;
			}
			
			if(n == 0){
				this.currComplexArrPoint = 0;
			}else{
				this.currComplexArrPoint++;
			}
			this.beatTime =  this.minBeatTime * this.currComplexArr[this.currComplexArrPoint];
		},
		// return 返回是否连接下一个音符
		retBeatBeam: function(){
			var curS = this.curS;
			// 依音直接连，直到依音结束就不往下连
			if(curS.grace ){
				return [!curS.gr_end, !curS.gr_end ?  curS.next : null];
			}
			if(eq('chord', curS.ctype)){
				return [false, null];
			}
			
			this.setBeatTime();
			
			var beatBeamArr = [], that = this;
			// 下一个音符遇到的情形如下：
			for(var nextS = curS.next; nextS; nextS = nextS.next){
				
				// 遇到小节的情况不连接（恢复所有的状态）
				if(!nextS || nextS.type == 0){
					that.clean();
					that.lastNoteDot = false;
					// 当前复合拍数组指针 归零，并重新计算BeatTime
					that.computBeatTime2point(0);
					beatBeamArr = [false, null];
					break;
				}
				
				// 必须为普通音符
				if(!eq("8,10",nextS.type)){
					continue;
				}
				
				// 当正常拍以四分音符为1拍时，碰到四分音符不累计
				// 当复合拍以八分音符为1拍，且三个八分音符击打一次时，碰到四分音符需累计
				if(!that.isComplex && curS.nflags <= 0 && curS.dots == 0){
					beatBeamArr = [false, null];
					break;
				}
				
				// 二分音符的浮点不累计
				if(curS.nflags < 0 && curS.dots > 0){
					beatBeamArr = [false, null];
					break;
				}
				
				that.beatTimeCount += curS.dur;
				if( that.isComplex){ // 复合拍
					if(that.beatTimeCount < that.beatTime){
						beatBeamArr =  [true, nextS];
					}else{
						// 已经满一拍不连接
						that.clean();
						that.lastNoteDot = false;
						beatBeamArr = [false, null];
						// 当前复合拍数组指针指向下一个，并重新计算BeatTime
						that.computBeatTime2point(1);
					}
					break;
				}else{
					
					// 保存上一次出现浮点的状态
					if(curS.dots > 0){
						that.lastNoteDot = true;
						// 如果n分音符为1拍，n加尾巴又加附点，那么按照2拍计算（此处可能有个小问题）
						//that.lastNoteNflags = that.currMeter.bot > 4 ?  curS.nflags - 1 : 1;
						var flags = 0;
						switch(that.currMeter.bot){
							case 4:
							case 2: flags = 0; break;
							default: flags = curS.nflags - 1;break;
						}
						that.lastNoteNflags = flags;
					}
					
					// 累计当前音符时间
					// 特殊情况：浮点与下一个音符刚好结合为一拍的整数倍，那么理论上相连接
					if((that.lastNoteDot && that.beatTimeCount < (2 * Number(that.beatTime) * Math.pow(.5,that.lastNoteNflags))) 
							|| that.beatTimeCount < that.beatTime){
						beatBeamArr =  [true, nextS];
						break;
					}else{
						// 已经满一拍不连接
						that.clean();
						that.lastNoteDot = false;
						beatBeamArr = [false, null];
						break;
					}
				}
			}
			return beatBeamArr;
			
		},
		clean: function(){
			this.beatTimeCount = 0;
		},
		// 变换拍重新计算
		refreshBeat: function(){
			this.beatTime = 0;
			this.beatTimeCount = 0;
			this.currComplexArrPoint = 0;
		}
}
//var chordHei = (circleSpace * 3 + 4 + underlineSpace * 3 + 4 + Number(chordFontSize-8) - circleMarginTop  + chordSpace ) * chordScale;
//间距调整小一点
var chordHei = (circleSpace * 1 + 1 + underlineSpace * 1 + 1 + Number(chordFontSize-8) - circleMarginTop  + chordSpace ) * chordScale;
//占位符高亮参数
var lastTil = { 
	pit : 0, // 音高
	istart: 0, // 音符索引
	index: 0, // 音符占位符索引 
	isTil : 0 // 是否同音连
}

var lastLineNum = -1;
// 实现五线谱转简谱
var showSplNumber =  function(type, start, stop, x, y, w, h, s){
//console.log('anno_stop-sssss-',s.st,s,start,document.getElementById("source").value.slice(start,stop),type);
//console.log('syms====', syms)
//console.log("isStave----", isStave);
//	console.log(syms)
//if(s.nx){
//	console.log('s.nx--',abc.sx(s.nx))
//}
//	console.log('(abc.get_voice_tb())[st]-',(abc.get_voice_tb())[s.st]);
//	console.log('(abc.get_staff_tb())[st]-',(abc.get_staff_tb())[s.st],(abc.get_staff_tb())[s.st].y,abc.sy((abc.get_staff_tb())[s.st].y) );
//	var clef = ((abc.get_staff_tb())[s.st]).clef;
//	
//	console.log('五线谱的初始位置：' + abc.sy((abc.get_staff_tb()[s.st]).y));
//	if(clef){
//		var clef_y = (abc.get_staff_tb()[s.st]).y + clef.ymn +  clef.ymx - clef.ymn + 2;
//		console.log('(abc.get_staff_tb())[st]-clef-', abc.sy(clef_y));
//	}

	if(s.dot_low || type == 'notePic'){
		return;
	}
	
	if(s.a_pic){
		
		var po = s.a_pic.find(function(item){
			return item && item.is_bar_pic == 1
		})
		if(po){
			var picRealWid = 0, picRealx = 0;
			var tsNext = abc.clone(s.next);
			for (var curs = tsNext; curs; curs = curs.next) { 
				if(0 == curs.type){
					picRealWid = curs.x -(s.prev && s.prev.type == 0 ? s.prev.x : (s.x - 5)) ;
					break;
				}
			}
			picRealx = s.prev && s.prev.type == 0 ? s.prev.x : (s.x-5);
			var curSvg = abc.get_svg();
			abc.set_svg(curSvg.replaceAll(po.istart + '_w', picRealWid).replaceAll(po.istart + '_x', abc.sx(picRealx)));
		}
	}

	// todo 
	if(s.a_stk && s.a_stk && s.a_stk[0].t_gr_arr){
		var curSvg = abc.get_svg();
		for(var gr in s.a_stk[0].t_gr_arr){
			curSvg = curSvg.replace(new RegExp('(<text .*' + gr + '_grace\".*>)(.*)(</text>)','g'), function(){
				if(s.a_stk[0].t_gr_arr[gr]){
					return arguments[1] + s.a_stk[0].t_gr_arr[gr] + arguments[3];
				}
			});
		}
		abc.set_svg(curSvg);
	}
	
	if (musicType == 0) {
		return;
	}
	
	// 占位符高亮参数
	// 如果当前存在同音记号，则判断是否上一个音构成同音
	if(s.type == 8 && s.notes[0].ti1 ){
		lastTil.pit = s.notes[0].pit;
		lastTil.istart = s.istart;
		lastTil.isTil = 1;
	}
	

	var st = s.st; // 谱表索引值
	var curS = s; // 当前字符的信息
	var shiftx = 0; // 绘制首调的x偏移
	var tgls = abc.tgls;
	var curStafftb = (abc.get_staff_tb())[st];
	var curVoicetb = (abc.get_voice_tb())[st];
	var abcString = document.getElementById("source").value; // abc字符串
	var curnote = abcString.slice(start, stop); // 当前abs串返回的字符
	var transY = 0, transX = 0; // 简谱<g>:xy的偏移量

	var nMarginTop = 0; // 简谱上边距
	var noteyMap = {};
	curS.ctype = type; // ctype当前类型
	var splnum = {
			highpos: 0, // 高音点的位置
			lowpos: 0, // 低音点的位置
			tailPos: 0, // 音符尾巴的位置
			curPos: 0,  // 当前的位置
			curnote: null, // 当前音符
			stop : stop,
			start : start,
			x : x
	}
	
	// 初始化连线工具
	beamIns.init(abcString, curS);
	// 初始化绘制工具
	drawIns.init(curS);

//	if (eq('clef', type)) {
//		return;
//	}
	
	// 保存当前音符信息（用于错误信息定位使用）
	abc.setCurS(s);
	
	// 第一个拍号是否显示，取决于abc.cfmt().showmeterinstaff
	if (eq('meter', type) && s.time == 0 && (!abc.cfmt().showmeterinstaff && s.a_meter.length == 0)) {// 跳过多个拍子的情况
		// 第一个拍号不显示
		// 多个连续相同的调号只显示一次
		lastKeyMap[st] =  getToneMark(abcString, curVoicetb.key);
		// 重新计算音符连接
		beamIns.refreshBeat();
		lastTil = { pit : 0, istart: 0, index: 0, isTil: 0 }
		return;
	}
	
	// 第一次出现谱号时，置空小节号的存储
//	if(musicType == 2  && eq('clef', type) && curS.my_line == 0){
//		//lastBarNumMap = {};
//	}

	// 用于显示简谱谱表上方的调号、拍号
	if (eq('tempo', type) && !hasTempo ) {//增加了hiddenkey的判断,add by hxs
		var prevChar = document.getElementById("source").value.slice(s.istart, s.iend);
    	if(prevChar.indexOf('[') == -1){ // created by lhj 首调唱名后面的速度，不能显示为变换后的速度（带中括号的速度，系统认为是变换后速度）
			y += -abc.sh(12);
			if(document.getElementById("source").value.indexOf('%%text') == -1){
				y += tempoMgB;
			}
			//y += -abc.sh(15);//这里对y坐标做了一些微调，update by hxs
			var staffInfo = getStaffInfo("source");
			//如果是节奏谱
			if(staffInfo.isRhythmStaff){
				abc.cfmt().hiddenkey = true;
			}
			if(!abc.cfmt().hiddenkey){
				// 绘制简谱调号（如：1=C）
				shiftx = drawIns.drawSplMode(shiftx, splSy(y), getToneMark(abcString));
			}
			if(!abc.cfmt().hiddenmeter){
				if(abc.cfmt().hiddenkey){
					shiftx +=55;
				}
				// 绘制简谱拍号（如：4/4）
				var mw = 0;
				for(var i=0;i<s.p_v.meter.a_meter.length;i++){//add by hxs，有多个拍号时，显示多个拍号
					drawIns.drawSplMeter(s.p_v.meter.a_meter[i], shiftx+mw, splSy(y), 0.75, 15, 42, s.p_v.meter.istart );
					mw += 15;
				}
			}
			
			if(eq('meter', type) && s.time == 0 && !abc.cfmt().showmeterinstaff ){ 
				// 谱表第一个拍号不显示 
				return;
			}
    	}
	}

	// 显示指定谱表的简谱（%%splnumscore 不设置默认都显示）
	if (!getSplnumscore(abcString, st)) {
		return;
	}
	// 针对同样索引值的小节线分布在不同行显示情况，这里加行号过滤
	var myLine = undefined; 
	if('bar' == type){
		myLine = s.my_line; 
	}
	
	if (musicType == 2) {// 简谱
		transY = curStafftb.y + curStafftb.topbar * curStafftb.staffscale ;
		if(isChordScore){ // 和弦谱才获取否则影响加载速度
			if(s.multi == -1&& s.prev && s.prev.dot_low_prev_note){
				noteyMap = getNoteY( s.prev.dot_low_prev_note.istart, st, myLine);
			}else{
				noteyMap = getNoteY(start, st, myLine);
			}
			transY -= (Number(noteyMap.crdHei) + Number(noteyMap.addHei));
		}
		nMarginTop = abc.sh(splMarginTop);
	} else { // 简线混排
		if(s.multi == -1 && s.prev && s.prev.dot_low_prev_note){
			noteyMap = getNoteY(s.prev.dot_low_prev_note.istart, st, myLine);
		}else{
			noteyMap = getNoteY(start, st, myLine);
		}
		transY = curStafftb.y + Number(noteyMap.ymn);
		nMarginTop = abc.sh(spllineMarginTop);
	}
	transY_tmp = transY
	//console.log('noteyMap============',document.getElementById("source").value.slice(start,stop),JSON.stringify(noteyMap));
	nMarginTop = nMarginTop-10;
	if (eq('note,grace,rest', type)) {
		// 设置简谱的字体
		abc.set_font('spl');
		var sw = splnum.sw = abc.setStrwh("0");

		// 简谱音的y坐标
		var numPosy = nMarginTop , transY = splSy(transY) , curNumNote;
		splnum.curPos = numPosy;

		// 简谱的依音微调
		if (musicType == 2 && eq('grace', type)) {
			transY = transY - abc.sh(10);
		}

		var chordStarty = 0, chordTotalHei = 0;
		// 是否和弦
		var isChord = eq("\\[,\\]", curnote), chordX = 0;
		// 检出音符数组（和弦）
		var noteReg = [].concat( curnote.match(/[\=\^\_]*[a-zA-Z][\'\,\/]*/g));
		if(isChord){
			chordX = transX;
//			chordX = transX + translateValue(type, 1.5);
			
			noteReg.sort(function(a,b){
				var a_str = a.replace(/\_|=|\^|\/|[1-9]/g,"");
				var b_str = b.replace(/\_|=|\^|\/|[1-9]/g,"");
				//notesArr变量在abc2svg-1-spl.js中申明
				return notesArr.indexOf(a_str) - notesArr.indexOf(b_str);
			});
		}
		
		var noteList = [], chord_minV, chord_maxV=0 ;
		if(noteReg && noteReg.length){
			for(var n=0, p; n < noteReg.length; n++){
				p ={
					note: noteReg[n],
					s: s,
					v: s.v
				}
				chord_minV = p.v;
				if(isChord){
					p.v = p.v - n;
				}
				if(p.v <0){
					p.v = 0;
				}
				if(chord_minV > p.v){
					chord_minV = p.v;
				}
				if(chord_maxV < p.v){
					chord_maxV = p.v;
				}
				noteList.push(p);
			}
			
			for(var i = 0; i <noteList.length ; i++){
				noteList[i].v = chord_minV + ( noteList.length-1 - i);
				if(chord_maxV < noteList[i].v){
					chord_maxV =  noteList[i].v;
				}
				if(chord_minV > noteList[i].v){
					chord_minV =  noteList[i].v;
				}
			}
			
		}
		
		// [I:staff -1] 标记的音符，按和弦处理
		if(s.dot_low_note && noteReg){
			if(noteReg.indexOf('z')>-1){
				noteReg.splice(noteReg.indexOf('z'),1);//这个代码不知道是干什么用的，注释掉，不然两个声部合并的（1 2），无法正常显示 hxs 2021-4-19
			}
			
			var dotLowNote, newNoteArr ,dls=null, tmpNoteArr = [];
			for(dls = s.dot_low_note; dls; dls = dls.s.dot_low_note){
				dotLowNote = abcString.slice(dls.istart, dls.iend); 
				if(!dotLowNote){
					continue;
				}
				newNoteArr = dotLowNote.match(/[\=\^\_]*[a-zA-Z][\'\,\/]*/g);
				newNoteArr.sort(function(a,b){
					var a_str = a.replace(/\_|=|\^|\/|[1-9]/g,"");
					var b_str = b.replace(/\_|=|\^|\/|[1-9]/g,"");
					//notesArr变量在abc2svg-1-spl.js中申明
					return notesArr.indexOf(a_str) - notesArr.indexOf(b_str);
				});
				if( null != newNoteArr && newNoteArr.length ==1 ){
					
					noteList = noteList.concat({
						note: newNoteArr[0],
						s: dls.s,
						v: dls.s.v
					});
				}else{
					// 和弦
					isChord = true
					for(var n=0, p; n < newNoteArr.length; n++){
						p ={
							note: newNoteArr[n],
							s: dls.s,
							v: dls.s.v
						}
						tmpNoteArr.push(p);
					}
					noteList = tmpNoteArr.concat(noteList);
				}
			}
			
			if(noteList && noteList.length && isChord){
				
				noteList.sort(function(a,b){
					var a_str = a.note.replace(/\_|=|\^|\/|[1-9]/g,"");
					var b_str = a.note.replace(/\_|=|\^|\/|[1-9]/g,"");
					//notesArr变量在abc2svg-1-spl.js中申明
					return notesArr.indexOf(a_str) - notesArr.indexOf(b_str);
				});
				
				for(var i = 0; i <noteList.length ; i++){
					noteList[i].v = chord_minV + ( noteList.length-1 - i);
					if(chord_maxV < noteList[i].v){
						chord_maxV =  noteList[i].v;
					}
					if(chord_minV > noteList[i].v){
						chord_minV =  noteList[i].v;
					}
				}
			}
		}
		
		if(isVoiceMerge){
		
			noteList.sort(function(a, b){
				return a.v - b.v;
			});
			
			// 判断几个声部
			var vJson = getVoiceNumByCurrBar(start, s.v);
			if(-1 == vJson){
				vJson = {
					vMax: 0,	
					vMin: 0	
				};
			}
			var vMin = vJson.vMin;
			// 如何是和弦取和弦最小的声部
			if(isChord){
				vMin = chord_minV;
			}
			var vMax = vJson.vMax;
			if(isChord){
				vMax = chord_maxV;
			}
			
			var noteMap = {};
			if(noteList && noteList.length){
				for( var m = 0, k; m < noteList.length; m++){
					k = noteList[m].v - vMin;
					if( k> vMax){
						k = vMax;
					}
					if(k < 0){
						k =0;
					}
					noteList[m].v = k;
					noteMap[k] = noteList[m];
				}
			}
			
			// 1、取出每个小节的最低声部、最高声部；
			// 2、最低声部显示在底下；
			// 3、音符的位置（音符最终的声部）：音符本身声部（v）-小节内最低声部（v）
			// 4、构建音符数组：最高声部减最低声部作为数组的最大界限，遍历数组从noteMap的key值（音符最终的声部）中 找到对应的索引值，没有对应的元素留空。
			
			//var maxV = noteList[noteList.length - 1].v;
			var tempArr = [];
			for( var i = 0; i <= vMax-vMin ; i++){
				tempArr.push(noteMap[i] || { note: null, v: i});
			}
			noteList = tempArr;
			noteList.sort(function(a, b){
				return b.v - a.v;
			});
		}else{
			//按照音高排序 
			if(noteList ){
				noteList.sort(function(a,b){
					var a_str = a.note.replace(/\_|=|\^|\/|[1-9]/g,"");
					var b_str = b.note.replace(/\_|=|\^|\/|[1-9]/g,"");
					//notesArr变量在abc2svg-1-spl.js中申明
					return notesArr.indexOf(a_str) - notesArr.indexOf(b_str);
				});
			}
		}
		
		drawParam.chordLink = true;
		//居中显示
		if(curS.pos.spl==9 && curS.notes.length==1 && transYOffset==0 && lastLineNum!=curS.my_line){
			transYOffset = parseFloat(splBarHeight)/2 + 7.5*scale
			lastLineNum = curS.my_line;
		}
		if(curS.pos.spl==9 ){
			abc.out_svg('<g type="bar_datas" st="'+curS.st+'" transform="translate(' + transX + ',' + (parseFloat(transY.toFixed(2)) - transYOffset/2) + ') ');
		}else{
			abc.out_svg('<g type="bar_datas" st="'+curS.st+'" transform="translate(' + transX + ',' + transY.toFixed(2) + ') ');
			
		}
		
		abc.out_svg((eq('grace', type)? 'scale(' + graceScale + ')' : ''));
		abc.out_svg('"');
		abc.out_svg((eq('grace', type)? ' isgrace="1" ' : ''))
		abc.out_svg('>')
		
		
		var noteLen = (noteList || "").length;
		// 全音符往左移半个间距
		if(curS.nflags == -2){
			splnum.x -= curS.wl/2;
		}
		
		//noteReg.reverse();
		//按照音高排序 
//		if(noteList && !s.dot_low_note){
//			noteList.sort(function(a,b){
//				var a_str = a.replace(/\_|=|\^|\/|[1-9]/g,"");
//				var b_str = b.replace(/\_|=|\^|\/|[1-9]/g,"");
//				//notesArr变量在abc2svg-1-spl.js中申明
//				return notesArr.indexOf(a_str) - notesArr.indexOf(b_str);
//			});
//		}
		// console.log('noteList----', noteList)
		
	//	console.log('noteList---', s.istart,noteList)
		
		var firstWl = 0;
		if(!noteList ){
			var notePo = noteList.find(function( item){
				return item.note != null;
			})
			
			if(notePo){
				firstWl = notePo.s.wl;
			}
		}
		
		for (var i = 0; i <= noteLen ; i++) {	
			if(!noteList || !noteList[i]){
				break;
			}
			if( noteList[i].note){
				splnum.curnote = curnote = noteList[i].note;
				
				feCurs = noteList[i].s;
				if(isVoiceMerge){
					//保证合并声部的音符在同一列对齐
					feCurs.wl = firstWl;
				}
				
				drawParam.noteHeight = 0;
				// 获取简谱上显示音符
				curNumNote = splnum.simpleNum = getSplnum2note(curnote, type, curVoicetb, abcString, s);
	
				if (isChord) {
					// 第一个按照正常的音符 显示，其他和弦音缩小为原来的chordScale倍
					if (i == 0) {
						feCurs.ctype = type = 'note';
					} else {
						feCurs.ctype = type = 'chord';
					}
					feCurs.ctype = 'chord';
					feCurs.ctype1 = 'chord';
				}
				splnum.type = feCurs.ctype;
				
				if (eq('chord', type)) {
					//abc.out_svg('<g class="jpchord" transform="translate(' + chordX + ',0) scale(' + chordScale + ')">');
				}
				
				if(isVoiceMerge && feCurs.dot_low){
					// 合并后与相连音的对象高度对齐
					feCurs.curPos = splnum.curPos;
				}
				
				// 绘制升降号参数: 当前音、x、y（除了休止符）
				if (!eq('rest', type)) {
					drawIns.drawSharpSign(curNumNote, translateValue(type, (getNoteStartX(splnum.x,feCurs.wl) - abc.sh(sw[0]) * .5)), splnum.curPos + Number(sw[1])*.5 );
				}
	
				// 绘制简谱的音（除了全音符的休止）
				var noteStr = abcString.substring(feCurs.istart,feCurs.iend);
				if (!(eq('rest', type) && feCurs.nflags == -2) || (noteStr.indexOf("z")<0)) {
					var splx = getNoteStartX(splnum.x,feCurs.wl) - 2;
//					 小节线对齐时，全音符的x坐标差2像素
					var xx = 0;
					if(feCurs.dur && feCurs.dur == 1536 && abc.cfmt().equalbars){
						splx = splx + 2;
						xx +=2;
						//如果不是第一行，增还要再缩进4像素
						if(feCurs.my_line!=0 && s.x<60){
							splx = splx + 4;
							xx +=4;
						}
						splnum.splx = splx;
					}
					if(feCurs.slur2s){
						//(x1, y1, x2, y2, dir, height, dotted,up,path, isLowerCase)
					//	spl_slur_out(translateValue(curS.ctype, s.x), splnum.curPos,translateValue(curS.ctype,  s.slur2s.x), splnum.curPos,  false,s.slur2sh, 0, true, null, true);
						spl_slur_out(translateValue(type, getNoteStartX(splnum.x,feCurs.wl) - 4)+4, splnum.curPos - 1,translateValue(type, getNoteStartX(feCurs.slur2s.x,feCurs.wl) - 4) + 4, splnum.curPos - 1, 1,feCurs.slur2s.istart - feCurs.istart > 10 ? feCurs.slur2sh : 10, s.slur_type, true);
						/*splSlur( start, {
							x: splx,
							y: splnum.curPos
						}, {
							x: getNoteStartX(s.slur2s.x,s.slur2s.wl) - splx,
							y: splnum.curPos
						})*/
					}
					drawIns.drawNote(/z/.test(curnote) ? 0 : getNumber(curNumNote),  splx, splnum.curPos  + Number(sw[1]),null,i);
					// 谱音同步的矩形块（abc2svg左右边距4貌似固定的）param : type, start, x, y , w, h
					drawIns.drawRect(translateValue(type, getNoteStartX(splnum.x,feCurs.wl) - 4)+xx, splnum.curPos, abc.sh(sw[0] + 4), abc.sh(sw[1] + 4), lastTil.pit == feCurs.notes[0].pit && lastTil.isTil ? lastTil.istart : feCurs.istart, undefined, i);
				}
				
				// 绘制附点
				var num = getNumber(curNumNote);
				var dotX = (eq('0,2,3,4,5,6', num) ? (x + abc.sh(dotMarginRight)) : x);
				// 如果是有打击乐符号，宽度增加一些，add by hxs
				if(feCurs.a_stk){
					dotX += 5;
				}
				drawIns.drawDot(translateValue(type, dotX), splnum.curPos + Number(sw[1]) , sw[0]);
				
				// 绘制音的时值
				var param = {
					splnum : splnum,
					curS : feCurs,
					voicetb : curVoicetb,
					abcString : abcString,
					chordindex: i
				}
				
				// 音符时值的处理
				drawNoteLen(param);
				
				// 绘制音高（节奏型不存在音高）
				if (eq('note,grace,chord', type) && !isRhythm(feCurs) && !(eq('140,141',feCurs.p_v.instr))) {
					drawPitch(splnum, feCurs);
				}
				
				// 只在最后一个音符上显示
				if(noteLen - 1 == i){
					// 绘制感情符号
					drawIns.drawDeco(x + Number(s.wl || 2), splnum.curPos + splnum.highpos - abc.sh(circleSpace), splnum);
					// 注释
					drawIns.drawGch( x + Number(s.wl || 2), splnum.curPos + splnum.highpos - abc.sh(circleSpace) - (splnum.decoPos || 0), splnum);
				}
			}
			
			// chord
			// 和弦音符从主音的顶部开始
			// 计算和弦音间隔以及音高作为下一个音的起始位置
			if(i == 0){
				splnum.curPos += chordSpace - 3;
				//splnum.curPos = (chordSpace - 3) * (noteLen - curS.v );
			}
			
			if (musicType == 2){
				//splnum.curPos += abc.sh(circleMarginTop) ;
			}
			// 下一个和弦音符的起始位置
			splnum.curPos += -chordHei
			//splnum.curPos = -chordHei * (noteLen - curS.v);
			
			if (eq('chord', type)) {
				//abc.out_svg('</g>');
			}
		}
		
		abc.out_svg('</g>');
		
		// 占位符高亮参数
		// 如果当前音不是同音连
		if(s.type == 8 && !s.notes[0].ti1 ){
			lastTil.pit = s.notes[0].pit;
			lastTil.istart = s.istart;
			lastTil.index = 0;
			lastTil.isTil = 0;
		}
		// chord
		return;
	}

	var mx = splSx(x) + Number(w.toFixed(2)) / 2, my = 0;

	if (musicType == 1) {
		my = nMarginTop ;
	}
	
	if(musicType == 2 && abcString.indexOf("measurenb 1")>-1 && s.st == 0){
		// 下次出现谱号时，把上一行的最后一个小节号绘制于当前行的开头
		if (eq('clef', type) && s.my_line > 0 ) {
			if(lastBarNumMap[s.my_line - 1]){
				drawIns.drawBarnum(s.next.x - Number(s.next.wl || 2) - 12, splSy(transY) + my - 2, lastBarNumMap[s.my_line - 1]);
			}
			return;
		}
	}
	
	// 保存新的调号
	if (curVoicetb.key && !lastKeyMap[st]) {
		lastKeyMap[st] = getToneMark(abcString, curVoicetb.key);
	}

	// 转调
	if (eq('key', type) && eq('\\[', curnote)) {
		if(eq('bass,treble,alto,tenor', curnote)){
			return;
		}
		var curMode = getToneMark(abcString, curVoicetb.key);
		if (curMode != lastKeyMap[st]) {
			// 绘制简谱调式（如：1=C）
			var defaultOffsetH = 5;
			//计算其它装饰音的高度
			if(s.next && s.next.a_dd){
				if(s.next.a_dd.length>0){
					a_dd = s.next.a_dd;
					defaultOffsetH = 0;
					for(var i=0;i<a_dd.length;i++){
						defaultOffsetH += a_dd[i].h;
					}
					defaultOffsetH = defaultOffsetH * 0.7;
				}
			}
			drawIns.drawSplMode(x, splSy(transY) + my - abc.sh(defaultOffsetH), getToneMark(abcString, curVoicetb.key), true, .75);
			lastKeyMap[st] = curMode;
			s.splnum_trans_key = true;
		}
		return;
	}
	
	
	
	// 如果首行是多个拍号， 那么始终显示----这里先不要了，后面李总他们如果有提出要显示，再打开注释----del by hxs 2022-2-10
	/*if (eq('meter', type) && s.time == 0 && s.a_meter.length > 1) {
		//console.log('s.a_meter.length----', s.a_meter.length)
		mt = 15;
		if(musicType == 1){
			mt = 25;
		}
		for(var m = 0; m < s.a_meter.length; m++){
			drawIns.drawSplMeter(s.a_meter[m], x + curS.x_meter[0] + 3 + ( 17 * m), splSy(transY) + nMarginTop + abc.sh(mt), 0, 17, h);
		}
	}*/

	// 显示小节中的变化拍子(如：[M:2/4])||（isStave:单谱表的简谱首部不显示拍号；大谱表的简谱首部要显示拍号且未设置[M:2/2]显示默认拍号）
	if ((eq('meter', type) && eq('\\[', curnote) && s.time != 0) || (eq('meter', type) && s.time == 0 && abc.cfmt().showmeterinstaff)) {
		drawIns.drawSplMeter(s.p_v.meter.a_meter[0], x + curS.x_meter[0] + 3, splSy(transY) + nMarginTop + abc.sh(20), 0, w, h);
		// 重新数拍
		beamIns.refreshBeat();
		return;
	}

	if (eq('bar', type)) {
		// 符号
		drawIns.drawDeco(x + Number(s.wl || 2), splSy(transY) + my - 2);
		drawIns.drawGch(x + Number(s.wl || 2), splSy(transY) + my - 2);
		if(musicType == 2 && abcString.indexOf("measurenb 1")>-1 ){
			drawIns.drawBarnum(x + Number(s.wl || 2), splSy(transY) + my - 2);
		}
		
		var noteLen = 0;
		if(isChordScore){ // 和弦谱才获取否则影响加载速度
			noteLen = parseInt(noteyMap.crdHei / (chordHei - 4));
		}
		
		if(isVoiceMerge){
			//console.log('s.istart----',s.istart)
			noteLen = getVoiceNumByCurrBar(s.istart, s.v);
			if(noteLen < 0){
				noteLen = 0;
			}else{
				noteLen = noteLen.vMax - noteLen.vMin;
			}
			if(isChordScore){ // 和弦谱才获取否则影响加载速度
				noteLen = parseInt(noteyMap.crdHei / (chordHei - 4));
			}
		}
		
		drawAllBar(curS.bar_type, splSy(transY), mx, my, chordHei * noteLen,curS);
		// 小节结束后重新数拍
		beamIns.refreshBeat();
		return;
	}

	if (eq('clef', type)) {
		drawParam = {
			// 当前音符的符尾的y坐标
			curNoteLineY : 0,
			lastNotehy : 0,
		};
	}
}

// 深入复制
function clone(obj){
	if(!obj){
		return obj;
	}
	var s = JSON.stringify(obj);
	return JSON.parse(s);
}

function isChordofNearBar(s){
	var isChord = false, chordLen = 0;
	for(prevs = s; prevs; prevs = s.prev){
		if(!prevs.notes){
			continue;
		}
		if( prevs.notes.length > chordLen){
			chordLen = prevs.notes.length;
		}
		if(prevs.notes.length > 1){
			
		}
	}
}


//单杆蒙版 --- create by lhj
var singleRect = function(type, start, stop, x, y, w, h, s, sw){
}

//给个开始和结束点的xy坐标，画线
function splSlur(istart,startPoint,endPoint){
	var control2 = {};//控制点2
	control2.x = startPoint.x + (endPoint.x-startPoint.x)/2;
	control2.y = startPoint.y + (endPoint.y-startPoint.y)/2 + 10;
	var control1 = {};//控制点1
	control1.x = startPoint.x + 10;
	control1.y = control2.y;
	drawSlur(istart,startPoint,endPoint,control1,control2);
}
function drawSlur(istart,startPoint,endPoint,control1,control2){
	var dStr = "m"+startPoint.x+" "+startPoint.y+" q"+control1.x+ " "+ control1.y+" "+control2.x+" "+control2.y+" t"+endPoint.x+" "+endPoint.y;
	dStr += "m"+startPoint.x+" "+startPoint.y+" q"+control1.x+ " "+ (control1.y+2)+" "+control2.x+" "+(control2.y+2)+" t"+endPoint.x+" "+endPoint.y;
	
	abc.out_svg('<path istart="' + istart + '" stroke-width="0.2" stroke="black" fill="black" fill-rule="evenodd" cat="decos" start="" end="" type="slur" class="fill" d="' + dStr+ '"></path>'); 
}


var spl_slur_out = function(x1, y1, x2, y2, dir, height, dotted,up,path, isLowerCase) {
	
//	console.log("x1:",x1,"  y1:",y1," x2:",x2," y2:",y2)
    var dx, dy, dz, alfa = .3,
        beta = .45;
    dy = y2 - y1
    if (dy < 0)
        dy = -dy;
    dx = x2 - x1
    if (dx > 40. && dy / dx < .7) {
        alfa = .3 + .002 * (dx - 40.)
        if (alfa > .7)
            alfa = .7
    }
    var mx = .5 * (x1 + x2),
        my = .5 * (y1 + y2),
        xx1 = mx + alfa * (x1 - mx),
        yy1 = my + alfa * (y1 - my) + height;
    xx1 = x1 + beta * (xx1 - x1);
    yy1 = y1 + beta * (yy1 - y1)
    var xx2 = mx + alfa * (x2 - mx),
        yy2 = my + alfa * (y2 - my) + height;
    xx2 = x2 + beta * (xx2 - x2);
    yy2 = y2 + beta * (yy2 - y2);
    dx = .03 * (x2 - x1);
    dy = 2 * dir;
    dz = .2 + .001 * (x2 - x1)
    if (dz > .6)
        dz = .6;
    dz *= dir
    var scale_y = 1;
    var startIstart = "";
    var endIstart = "";
//    console.log(path);
    
    if(path){
    	startIstart = path[0].istart;
    	endIstart = path[path.length-1].istart;
    }
     // 简谱的连音线往上画弧
    if (!dotted){
    	abc.out_svg('<path istart="'+startIstart+'" stroke-width="0.2" stroke="black" cat="decos" start="'+startIstart+'" end="'+endIstart+'" type="slur" class="fill" d="M');
    }
    else{
    	abc.out_svg('<path istart="'+startIstart+'" stroke-width="0.2" stroke="black" cat="decos" start="'+startIstart+'" end="'+endIstart+'" type="slur" class="stroke" stroke-dasharray="5,5" d="M');
    }
    var preXIn = 0;
    var sufXIn = 0;
    if(path && path.length>0){
    	preXIn = getXIndent(path[0]);
    	x1 = x1 + preXIn;
    	sufXIn = getXIndent(path[path.length-1]);
    	x2 = x2 + sufXIn;
    }
    abc.out_svg(x1 +' '+ y1 );
    
    var cy1 = ((y1 - yy1) / scale_y).toFixed(2);
    var t = up && radianHei ? radianHei : 0; 
    if(up && cy1 > 0){
    	cy1=-cy1- t;
    }
    var cyy1 = ((y1 - yy2) / scale_y).toFixed(2);
    if(up && cyy1 > 0){
    	cyy1=-cyy1- t;
    }
    var cy2 = ((y2 + dz - yy2 - dy) / scale_y).toFixed(2);
    if(up && cy2 > 0){
    	cy2=-cy2 - t;
    }
    var cyy2 = ((y2 + dz - yy1 - dy) / scale_y).toFixed(2);
    if(up && cyy2 > 0){
    	cyy2=-cyy2 - t;
    }
    abc.out_svg('c' +
        ((xx1 - x1) / abc.stv_g().scale).toFixed(1) + ' ' +
        ((y1 - yy1) / scale_y).toFixed(1) + ' ' +
        ((xx2 - x1) / abc.stv_g().scale).toFixed(1) + ' ' +
        ((y1 - yy2) / scale_y).toFixed(1) + ' ' +
        ((x2 - x1) / abc.stv_g().scale).toFixed(1) + ' ' +
        ((y1 - y2) / scale_y).toFixed(1));
    if (!dotted)
    	abc.out_svg('\n\tv' +
        (-dz).toFixed(1) + 'c' +
        ((xx2 - dx - x2) / abc.stv_g().scale).toFixed(1) + ' ' +
        ((y2 + dz - yy2 - dy) / scale_y).toFixed(1) + ' ' +
        ((xx1 + dx - x2) / abc.stv_g().scale).toFixed(1) + ' ' +
        ((y2 + dz - yy1 - dy) / scale_y).toFixed(1) + ' ' +
        ((x1 - x2) / abc.stv_g().scale).toFixed(1) + ' ' +
        ((y2 + dz - y1) / scale_y).toFixed(1));
    abc.out_svg('"/>\n');
}
//获取渐强、渐弱的匹配项
function getDimOrCrescMatch(){
	var dimArr = [];
	for(var istart in syms){
		var cs = syms[istart];
		if(cs.a_dd){
			var a_dd = cs.a_dd;
			for(var i=0;i<a_dd.length;i++){
				var dd = a_dd[i];
				if(dd.glyph=="dim" || dd.glyph=="cresc"){
					var obj = new Object();
					if(dd.dd_en){
						obj.type = dd.glyph;
						obj.sIstart = cs.istart;
						var name = dd.name;
						var endName = name.replace("(",")")
						//寻找结束符号所在的音符
						for(var ist in syms){
							var cs2 = syms[ist];
							if(ist>istart && cs2.v==cs.v && check_deco(cs2,endName)){
								obj.eIstart = cs2.istart;
								break;
							}
							
						}
						dimArr.push(obj);
					}
				}
			}
		}
	}
	return dimArr;
}
//判断一个音符是否在渐强或渐弱的包围中
function checkNoteInDimOrCresc(s){
	var arr = getDimOrCrescMatch();
	for(var i=0;i<arr.length;i++){
		var obj = arr[i];
		if(s.istart>=obj.sIstart && s.istart<=obj.eIstart){
			return true;
		}
	}
	return false;
}