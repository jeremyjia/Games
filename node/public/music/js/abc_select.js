/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
 


var _blr_select=["use strict", //[0]
"selectedCball", //[1]
"isOk",//[2]
"fill",//[3]
"color",//[4]
"#fff",//[5]
"isOpen",//[6]
"first",//[7]
"end",//[8]
"barlineArr",//[9]
"parentSelector",//[10]
"isSelNote",//[11]
"$notes",//[12]
"prototype",//[13]
"close",//[14]
".nobrk svg",//[15]
"svg rect[type=\'note\'], svg rect[type=\'rest\'],svg rect[type=\'splnum_note\'], svg rect[type=\'splnum_rest\']",//[16]
"css",//[17]
"each","length","barline_start","barline_end","line","value","animVal","height","<svg class=\"svg-staff\"><rect data-idx=\"","\" x=\"","\" y=\"","\" width=\"","\" height=\"","\" fill=\"","\" fill-opacity=\"","\"></rect></svg>","append",
"initMoveEvent",//[35]
"reBuild-",//[36]
"log",//[37]
"changedTouches","getEvt","scrollTop","pageX","pageY","mousedown","touchstart","mousemove","touchmove","mouseup","touchend","isPc","offset","istart","attr","node-index","left","top","outerWidth","outerHeight","push",".svg-staff rect","click","shiftKey","that.cStart:","#0F84F5","rect[node-index=\'","\']","that.cEnd:","on","off","data-idx","fill-opacity",".svg-staff rect[data-idx=\'","[type=\"bar\"]","not","preventDefault","stopPropagation","that.first: ","that.end: ","getPageXy","x1","x","x2","y1","y","y2",".svg-staff rect[fill-opacity=\'0\']","remove",".svg-staff","type","4","8","10","bar_index","beam_end","function","seqStart: ",
",",//[96]
"AbcSel"//[97]
];


;;
(function(_window,_document,_xdTest){
    alert(_xdTest);
    _blr_select[0];
    var _0x1131E=function(_0x113FA,_0x113CE){
        this[_blr_select[1]]= _0x113FA?_0x113FA:null;
        this[_blr_select[2]]= true;
        this[_blr_select[3]]= 0.85;
        this[_blr_select[4]]= _blr_select[5];
        this[_blr_select[6]]= false;
        this[_blr_select[7]]= null;
        this[_blr_select[8]]= null;
        this[_blr_select[9]]= [];
        this[_blr_select[10]]= _0x113CE|| null;
        this[_blr_select[11]]= true;
        this[_blr_select[12]]= null
    };
    _0x1131E[_blr_select[13]]= {
        open:function(){
            if(this[_blr_select[6]]){
                this[_blr_select[14]]();
                return
            };
            this[_blr_select[6]]= true;
            var _0x11426=getBarLineCoor(scale,0,9);
            if(!_0x11426){return};
            this[_blr_select[9]]= [];
            var _0x11586=$(_blr_select[15]);
            var _0x11502;
            if(this[_blr_select[11]]){
                var _0x115B2=this;
                this[_blr_select[12]]= $(_blr_select[16]);
                this[_blr_select[12]][_blr_select[18]](function(){
                    $(this)[_blr_select[17]]({
                        'fill-opacity':_0x115B2[_blr_select[3]],
                        'fill':_0x115B2[_blr_select[4]]
                    }
                    )
                })
            }
            else {
                for(var _0x114D6=0;_0x114D6< _0x11426[_blr_select[19]];_0x114D6++){
                    _0x11502= _0x11426[_0x114D6];
                    var _0x1152E=_0x11502[_blr_select[20]];
                    var _0x11452=_0x11502[_blr_select[21]];
                    var _0x1155A=_0x11586[_0x11502[_blr_select[22]]];
                    var _0x1147E=_0x1155A[_blr_select[25]][_blr_select[24]][_blr_select[23]];
                    var _0x115DE=_0x11452[0]- _0x1152E[0];
                    var _0x1160A=0;
                    if(_0x11502[_blr_select[22]]== 0){
                        _0x1160A= _0x1152E[1]- 20;
                        _0x1147E= _0x1147E- _0x1160A
                    };
                    var _0x114AA=_blr_select[26]+ _0x114D6+ _blr_select[27]+ _0x1152E[0]+ _blr_select[28]+ _0x1160A+ _blr_select[29]+ _0x115DE+ _blr_select[30]+ _0x1147E+ _blr_select[31]+ this[_blr_select[4]]+ _blr_select[32]+ this[_blr_select[3]]+ _blr_select[33];
                    $(_0x1155A)[_blr_select[34]](_0x114AA)
                }
            };
            this[_blr_select[35]](true);
            this[_blr_select[35]](false)
        },
        reBuild:function(){
            console[_blr_select[37]](_blr_select[36]);
            this[_blr_select[35]](true);
            this[_blr_select[35]](false)
        },
        getEvt:function(_0x11636,_0x11662){if(!_0x11662&& _0x11636[_blr_select[38]] && _0x11636[_blr_select[38]][_blr_select[19]]> 0){return (_0x11636[_blr_select[38]])[0]};return _0x11636},getPageXy:function(_0x11636,_0x11662){var _0x11636=this[_blr_select[39]](_0x11636,_0x11662);var _0x1168E=this[_blr_select[10]]?$(this[_blr_select[10]])[0][_blr_select[40]]:0;
            return {
                x:_0x11636[_blr_select[41]],
                y:_0x11636[_blr_select[42]]+ _0x1168E
            }
        },
        initMoveEvent:function(_0x11662){
            var _0x115B2=this;
            var _0x11796=this[_blr_select[3]];
            var _0x1197A=_0x11662?_blr_select[43]:_blr_select[44];
            var _0x118CA=_0x11662?_blr_select[45]:_blr_select[46];
            var _0x1176A=_0x11662?_blr_select[47]:_blr_select[48];
            var _0x1194E,_0x11452;
            var _0x117C2=false;
            _0x115B2[_blr_select[49]]= true;
            var _0x11922={};
            var _0x118F6= new Array();
            var _0x11872,_0x1189E,_0x1181A,_0x11846;
            var _0x117EE;
            var _0x1168E=this[_blr_select[10]]?$(this[_blr_select[10]])[0][_blr_select[40]]:0;
            this[_blr_select[12]]= $(_blr_select[16]);
            if(this[_blr_select[11]]){
                this[_blr_select[12]][_blr_select[18]](function(_0x119A6,_0x119FE){
                    var _0x11A2A=$(this)[_blr_select[50]]();
                    var _0x119D2=$(this)[_blr_select[52]](_blr_select[51]);
                    $(this)[_blr_select[52]](_blr_select[53],_0x119A6);
                    _0x118F6[_blr_select[58]]({
                        x1:_0x11A2A[_blr_select[54]],
                        y1:_0x11A2A[_blr_select[55]]+ _0x1168E,
                        x2:_0x11A2A[_blr_select[54]]+ $(this)[_blr_select[56]]()+ 2,
                        y2:_0x11A2A[_blr_select[55]]+ $(this)[_blr_select[57]]()+ _0x1168E,
                        istart:_0x119D2,
                        index:_0x119A6
                    }
                    )
                }
                )
            }
            else {
                $(_blr_select[59])[_blr_select[18]](function(_0x119A6,_0x119FE){
                    var _0x11A2A=$(this)[_blr_select[50]]();
                    _0x118F6[_blr_select[58]]({
                        x1:_0x11A2A[_blr_select[54]],
                        y1:_0x11A2A[_blr_select[55]]+ _0x1168E,
                        x2:_0x11A2A[_blr_select[54]]+ $(this)[_blr_select[56]]()+ 2,
                        y2:_0x11A2A[_blr_select[55]]+ $(this)[_blr_select[57]]()+ _0x1168E
                    }
                    )
                }
                )
            };
            var _0x1173E=null,_0x11712=null,_0x116E6=0;
            if(this[_blr_select[11]]){
                var $tnotes=this[_blr_select[12]];
                $tnotes[_blr_select[68]](_blr_select[60])[_blr_select[67]](_blr_select[60],
                    function(_0x11636){
                        if(_0x11636[_blr_select[61]]){
                            $tnotes[_blr_select[17]]({
                                "fill-opacity":_0x11796,
                                "fill":_0x115B2[_blr_select[4]]
                            });
                            if(_0x116E6++ == 0){
                                _0x1173E= $(this)[_blr_select[52]](_blr_select[53])- 0;
                                console[_blr_select[37]](_blr_select[62],_0x1173E);
                                $(_blr_select[64]+ _0x1173E+ _blr_select[65])[_blr_select[17]](
                                    {
                                        "fill-opacity":0.2,
                                        "fill":_blr_select[63]
                                    })
                            }
                            else {
                                _0x11712= $(this)[_blr_select[52]](_blr_select[53])- 0;
                                console[_blr_select[37]](_blr_select[66],_0x11712);
                                if(_0x115B2[_blr_select[1]]&& _0x11712!== null){
                                    var _0x11AAE=_0x1173E> _0x11712?_0x11712:_0x1173E;
                                    var _0x11A82=_0x11712> _0x1173E?_0x11712:_0x1173E;
                                    for(var _0x11A56=_0x11AAE;_0x11A56<= _0x11A82;_0x11A56++){
                                        $(_blr_select[64]+ _0x11A56+ _blr_select[65])[_blr_select[17]]({
                                            "fill-opacity":0.2,
                                            "fill":_blr_select[63]
                                        })
                                    };
                                    _0x115B2[_blr_select[1]](Number(_0x11AAE),Number(_0x11A82));
                                    _0x1173E= null;
                                    _0x116E6= 0
                                }
                            }
                        }
                    })
            }
            else {
                $(_blr_select[59])[_blr_select[68]](_blr_select[60])[_blr_select[67]](_blr_select[60],function(_0x11636){
                    if(_0x11636[_blr_select[61]]){
                        if(_0x116E6++ == 0){
                            _0x1173E= $(this)[_blr_select[52]](_blr_select[69]);
                            $(_blr_select[59])[_blr_select[52]](_blr_select[70],_0x11796)[_blr_select[52]](_blr_select[3],_0x115B2[_blr_select[4]]);$(_blr_select[71]+ _0x1173E+ _blr_select[65])[_blr_select[52]](_blr_select[70],0.2)[_blr_select[52]](_blr_select[3],_blr_select[63])}else {_0x11712= $(this)[_blr_select[52]](_blr_select[69]);console[_blr_select[37]](_blr_select[66],_0x11712);if(_0x115B2[_blr_select[1]]&& _0x11712!== null){var _0x11AAE=_0x1173E> _0x11712?_0x11712:_0x1173E;var _0x11A82=_0x11712> _0x1173E?_0x11712:_0x1173E;for(var _0x11A56=_0x11AAE;_0x11A56<= _0x11A82;_0x11A56++){$(_blr_select[71]+ _0x11A56+ _blr_select[65])[_blr_select[73]](_blr_select[72])[_blr_select[52]](_blr_select[70],0.2)[_blr_select[52]](_blr_select[3],_blr_select[63])};_0x115B2[_blr_select[1]](Number(_0x11AAE),Number(_0x11A82));_0x1173E= null;_0x116E6= 0}}}})};if(this[_blr_select[11]]){return};$(_blr_select[59])[_blr_select[68]](_0x1197A)[_blr_select[67]](_0x1197A,function(_0x11636){_0x11636[_blr_select[74]]();_0x11636[_blr_select[75]]();_0x117C2= true;_0x1194E= null;_0x11452= null;_0x115B2[_blr_select[7]]= null;_0x115B2[_blr_select[8]]= null;$(_blr_select[85])[_blr_select[52]](_blr_select[70],_0x11796)})[_blr_select[68]](_0x118CA)[_blr_select[67]](_0x118CA,function(_0x11636){_0x11636[_blr_select[74]]();_0x11636[_blr_select[75]]();if(!_0x117C2){return};_0x11636= _0x115B2[_blr_select[39]](_0x11636,_0x11662);var _0x11B06=_0x115B2[_blr_select[78]](_0x11636,_0x11662);var _0x11ADA=$(this)[_blr_select[52]](_blr_select[69]);if(!_0x1194E){_0x1194E= _0x11ADA}else {var _0x11A2A;for(var _0x114D6=0;_0x114D6< _0x118F6[_blr_select[19]];_0x114D6++){_0x11A2A= _0x118F6[_0x114D6];if(_0x11A2A[_blr_select[79]]<= _0x11B06[_blr_select[80]]&& _0x11B06[_blr_select[80]]<= _0x11A2A[_blr_select[81]]&& _0x11A2A[_blr_select[82]]<= _0x11B06[_blr_select[83]]&& _0x11B06[_blr_select[83]]<= _0x11A2A[_blr_select[84]]){_0x11ADA= _0x114D6}}};if(!_0x11452|| _0x11452!= _0x11ADA){$(_blr_select[59])[_blr_select[52]](_blr_select[70],_0x11796)[_blr_select[52]](_blr_select[3],_0x115B2[_blr_select[4]]);var _0x11AAE=_0x1194E< _0x11ADA?_0x1194E:_0x11ADA;var _0x11A82=_0x1194E> _0x11ADA?_0x1194E:_0x11ADA;for(var _0x11A56=_0x11AAE;_0x11A56<= _0x11A82;_0x11A56++){$(_blr_select[71]+ _0x11A56+ _blr_select[65])[_blr_select[52]](_blr_select[70],0.2)[_blr_select[52]](_blr_select[3],_blr_select[63])}};_0x11452= _0x11ADA})[_blr_select[68]](_0x1176A)[_blr_select[67]](_0x1176A,function(_0x11636){_0x11636[_blr_select[74]]();_0x11636[_blr_select[75]]();_0x117C2= false;_0x115B2[_blr_select[7]]= parseInt(_0x1194E< _0x11452?_0x1194E:_0x11452);_0x115B2[_blr_select[8]]= parseInt(_0x1194E> _0x11452?_0x1194E:_0x11452);console[_blr_select[37]](_blr_select[76],_0x115B2[_blr_select[7]]);console[_blr_select[37]](_blr_select[77],_0x115B2[_blr_select[8]]);if(_0x115B2[_blr_select[1]]){_0x115B2[_blr_select[1]](_0x115B2[_blr_select[7]],_0x115B2[_blr_select[8]])}})},close:function(){this[_blr_select[6]]= false;this[_blr_select[7]]= null;this[_blr_select[8]]= null;$(_blr_select[87])[_blr_select[86]]()},getSeq:function(_0x11B32,_0x11B5E){var _0x115B2=this;var _0x11C92,_0x11C66;var _0x11C3A=all_s(true);var _0x11502;var _0x11B8A=0;var _0x11BE2=null;var _0x11C0E=_0x11C3A[_blr_select[19]];for(var _0x114D6=0;_0x114D6< _0x11C0E;_0x114D6++){_0x11502= _0x11C3A[_0x114D6];var _0x11BB6=(_0x11502[_blr_select[88]]== _blr_select[89]|| _0x11502[_blr_select[88]]== _blr_select[90]|| _0x11502[_blr_select[88]]== _blr_select[91]);if(!_0x11BB6){continue};if(_0x11BE2!= null&& _0x11502[_blr_select[92]]!= _0x11BE2){_0x11B8A++};if(!_0x11C92&& _0x11B8A== _0x115B2[_blr_select[7]]){_0x11C92= _0x11502[_blr_select[51]]};if(_0x11B8A== _0x115B2[_blr_select[8]]&& _0x11502[_blr_select[93]]){_0x11C66= _0x11502[_blr_select[51]]};_0x11BE2= _0x11502[_blr_select[92]]};if( typeof _0x11B5E== _blr_select[94]&& _0x11C92&& _0x11C66){_0x11B5E(_0x11C92,_0x11C66)}},getSeqByTime:function(_0x11B32,_0x11B5E){var _0x115B2=this;getAbcParams(_0x11B32,function(_0x11CBE,_0x11DF2){var _0x11D42=_0x11CBE* _0x11DF2;var _0x11D16=_0x115B2[_blr_select[7]]* _0x11D42;var _0x11CEA=(_0x115B2[_blr_select[8]]+ 1)* _0x11D42;var _0x11C92,_0x11C66;var _0x11D6E;var _0x11D9A=getNoteData();for(var _0x114D6=0;_0x114D6< _0x11D9A[_blr_select[19]];_0x114D6++){_0x11D6E= _0x11D9A[_0x114D6];if(_0x11D6E[6]!= 0){continue};var _0x11DC6=_0x11D6E[0];var _0x11E1E=_0x11D6E[1];
                    if(!_0x11C92&& _0x11E1E>= _0x11D16){_0x11C92= _0x11DC6};
                    if(_0x11E1E< _0x11CEA){
                        _0x11C66= _0x11DC6
                    }
                };
                if( typeof _0x11B5E== _blr_select[94]){
                    console[_blr_select[37]](_blr_select[95]+ _0x11C92+ _blr_select[96]+ _0x11C66);
                    _0x11B5E(_0x11C92,_0x11C66)
                }    
            })
        }
    };
     _window[_blr_select[97]]= _0x1131E
}(window,document,_blr_select[35]))
