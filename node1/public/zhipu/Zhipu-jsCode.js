const bvJsCode = "jsCode.js_bv0.11";
var upType=3;
$(document).ready(function(){
    var viewType_=localStorage.getItem('viewType');
    if(viewType_){upType=viewType_;}
    var customCode_=localStorage.getItem('customCode');
    if(customCode_){$("textarea[name=customCode]").text(customCode_);}
    var pageConfig_=localStorage.getItem('pageConfig');
    if(pageConfig_){$("textarea[name=pageConfig]").text(pageConfig_);}
    setView(upType);
    if(upType==2){upType=3;}
    var autoJpFormat_=localStorage.getItem('autoJpFormat');
    if(!autoJpFormat_){autoJpFormat_="y";}
    if(autoJpFormat_=="y"){$('#jpFormat').prop("checked",true);}
});

window.onresize=function(){autoSize();autoWinSize();}
document.onkeydown=function(){return setShortcuts(event);}
document.onmousedown=hideMenu;

function setShortcuts(ev){
    if(ev.keyCode==9&&!$(".win").is(':visible')){
        if(winType!=2){upType=winType;setView(2);}
        else{setView(upType);}
        autoSize();return false;
    }
    if(ev.keyCode==27){hideMenu();winClose();return false;}
    if(ev.altKey&&ev.keyCode==70){$("#menuFile").click();return false;}
    if(ev.altKey&&ev.keyCode==85){$("#menuUser").click();return false;}
    if(ev.altKey&&ev.keyCode==72){$("#menuHelp").click();return false;}
    if(ev.ctrlKey&&ev.shiftKey&&ev.keyCode==83){$("#menuSaveAs").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==83){$("#menuSave").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==78){$("#menuNewFile").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==79){$("#menuOpenFile").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==81){$("#menuPlayer").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==72){$("#menuTutorial").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==192){$("#menuSymbol").click();return false;}
    if(ev.ctrlKey&&ev.keyCode==69){$("#menuAddLastSymbol").click();return false;}
    if(ev.keyCode==37||ev.keyCode==38||ev.keyCode==39||ev.keyCode==40||ev.keyCode==46){
        return customShortcuts(ev.keyCode);
    }
}

var fTest = function(){
    /*--start--
    
<svg width="1000" height="1415" version="1.1" viewBox="0 0 1000 1415" encoding="UTF-8" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" height="100%" width="100%" fill="#ffffff" /><defs>
  <g id="diaohao_fu" transform="translate(-50,-50)"><path d="m63.90001,57.81227l-8.81873,0l0,-1.70001l3.45433,0l0,-11.7568l-3.53561,1.04459l0,-1.80243l5.46599,-1.59762l0,14.11224l3.43402,0l0,1.70001l0,0.00001l0,0.00001z" fill="#1b1b1b"/><rect height="2" width="11" y="46.85897" x="68" stroke-width="33" fill="#1b1b1b"/><rect height="2" width="11" y="51.32479" x="68" stroke-width="33" fill="#1b1b1b"/></g><g id="diaohao_zimu_e" transform="translate(-50,-50)"><path fill="black" d="m54.32501,41.94654l-8.65002,0l0,16.10692l8.28783,0l0,-1.85357l-6.2212,0l0,-5.15593l5.77378,0l0,-1.83226l-5.77378,0l0,-5.4329l6.58339,0l0,-1.83226z"/></g><g id="paihao_xian" transform="translate(-50,-50)"><rect fill="#1b1b1b" stroke-width="33" stroke-linejoin="null" stroke-linecap="null" x="51" y="49" width="21" height="2"/></g><g id="shuzi_c_bian_4" transform="translate(-50,-50)"><path d="m50.13028,53.52836l-4.87848,0l0,-0.95818l6.44669,-9.7574l1.13291,0l0,9.23452l1.9168,0l0,1.48106l-1.9168,0l0,3.65886l-2.70068,0l0,-3.65886l-0.00045,0zm0,-6.79528l-0.08714,0l-3.39743,5.31422l3.48457,0l0,-5.31422l0,0z" fill="black"/></g><g id="shuzi_c_5" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/></g><g id="yanyinfu" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><rect height="3.2" width="11" y="48.4" x="44.5" stroke-width="null" fill="#1b1b1b"/></g><g id="shuzi_c_1" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m51.71225,56.72592c0,0.80306 0.32822,1.2029 0.98409,1.2029l1.85934,0l0,0.98408l-8.96846,0l0,-0.98408l1.74994,0c0.65642,-0.07163 0.98409,-0.43763 0.98409,-1.0935l0,-12.24893c-1.16737,0.65644 -2.26085,1.13125 -3.28105,1.42172l-0.43762,-0.76528c2.18699,-1.09351 4.04689,-2.47802 5.57743,-4.15573l1.53112,0l0,15.63882l0.00111,0l0.00001,0z"/></g><g id="shuzi_c_2" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m44.23404,57.96309c0.29169,-0.36531 0.73117,-0.84104 1.31789,-1.42776c4.61288,-4.68482 6.66194,-7.8705 6.15051,-9.55537c-0.07361,-2.34241 -1.0262,-3.55098 -2.85551,-3.6246c-1.68486,0.14779 -2.74564,1.20857 -3.18512,3.18512l-1.09814,0c0.58504,-3.51473 2.45228,-5.34404 5.60115,-5.49184c3.07526,0.21974 4.72275,1.86723 4.9425,4.94249c0.14612,1.90516 -1.13607,3.99158 -3.84435,6.26038c-1.61124,1.46568 -2.85551,2.70996 -3.73447,3.73448l5.27211,0c1.24426,0.07362 1.93918,-0.6213 2.08697,-2.08698l0.8784,0l-0.54879,5.05236l-10.98313,0l0,-0.98827z"/></g><g id="xiaojiexian" transform="translate(-50,-50)"><rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/><rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#1b1b1b"/></g><g id="shuzi_c_3" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m47.99024,49.51211c1.95488,-1.59247 2.8959,-3.00457 2.8242,-4.23684c-0.0728,-1.30343 -0.72481,-1.99072 -1.95542,-2.06409c-1.08611,0 -1.95543,0.65199 -2.60742,1.95543l-0.86876,-0.326c0.94048,-2.46124 2.60741,-3.72882 4.99694,-3.80218c2.24391,0.14617 3.47619,1.15947 3.69351,3.04153c0,1.44905 -0.97743,2.75303 -2.93286,3.91029l0.10867,0c2.60741,0.14618 4.01951,1.70224 4.23684,4.67096c-0.29015,3.98365 -2.60741,6.08305 -6.95237,6.30038c-2.46288,-0.14618 -3.80218,-0.86932 -4.01951,-2.17275c0.07115,-0.86877 0.57864,-1.33929 1.52076,-1.4121c0.57862,0 1.15781,0.3988 1.73809,1.19532c0.57862,0.86877 1.23064,1.30343 1.95543,1.30343c1.52077,-0.14397 2.31672,-1.4121 2.39009,-3.80218c-0.0728,-2.53405 -1.01495,-3.87334 -2.82475,-4.01951c-0.14618,0 -0.29013,0.03751 -0.43466,0.10866c-0.14618,0.07282 -0.29015,0.10866 -0.43466,0.10866l-0.43411,-0.75899z"/></g><g id="shuzi_c_4" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m50.16211,54.39056l-6.07059,0l0,-1.19232l8.02201,-12.14174l1.40976,0l0,11.49109l2.38519,0l0,1.84297l-2.38519,0l0,4.55295l-3.36062,0l0,-4.55295l-0.00056,0zm0,-8.45579l-0.10844,0l-4.22763,6.61282l4.33606,0l0,-6.61282z"/></g><g id="shuzi_c_6" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m54.20902,41.95901c-3.38233,1.22426 -5.39627,3.56153 -6.04348,7.01512c0.93435,-0.64775 1.90543,-0.97109 2.91377,-0.97109c2.94941,0.14523 4.4959,1.90709 4.64057,5.28833c-0.21591,3.59825 -2.05065,5.46696 -5.50423,5.6122c-3.74183,-0.14524 -5.72017,-2.48251 -5.93554,-7.01512c0.28661,-5.82813 3.41632,-9.42473 9.38911,-10.79202l0.53979,0.86257zm-3.99337,7.33899c-0.79243,0 -1.54814,0.32388 -2.26658,0.97108c0,0.07233 0,0.21592 0,0.43183c-0.07233,0.79243 -0.10796,1.51088 -0.10796,2.15862c0,3.45358 0.75517,5.18037 2.26659,5.18037c1.51086,0.07235 2.19368,-1.40291 2.05066,-4.42466c0.14357,-2.94995 -0.50418,-4.38849 -1.94272,-4.31724z"/></g><g id="shuzi_c_7" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m53.05094,44.17476l-5.65846,0c-0.88795,0 -1.44293,0.111 -1.66436,0.33298c-0.29636,0.1493 -0.51834,0.62934 -0.66595,1.44236l-0.99839,0l0.44398,-4.88206l11.42848,0l0,1.10938l-6.43599,16.75452l-2.88472,0l6.43542,-14.75719z"/></g><g id="shuzi_null" transform="translate(-50,-50)"></g><g id="xiaojiexian_weibu" transform="translate(-50,-50)"><rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/><rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#ffffff"/></g><g id="shuzi_c_0" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m50.00001,41.01781c3.70189,0.36378 5.62417,3.37516 5.77067,9.03637c-0.1465,5.58989 -2.06822,8.56535 -5.77067,8.92801c-3.70135,-0.28914 -5.62582,-3.26625 -5.77068,-8.92801c0.14484,-5.66121 2.06933,-8.67259 5.77068,-9.03637zm-2.1777,12.52045c-0.07297,3.19493 0.65347,4.71915 2.17713,4.57263c1.52478,0.21783 2.24901,-1.45123 2.1777,-5.00828l0,-6.20576c0,-3.33757 -0.72646,-4.9707 -2.1777,-4.89938c-1.52421,-0.14429 -2.2501,1.27101 -2.17713,4.24646l0,7.29433z"/></g><g id="ci_dakuohu_you"><path d="m-3.75,4.82566l0,0.19085c1.38775,-0.08179 2.5127,-0.32488 3.37479,-0.72928s1.29314,-0.85197 1.29314,-1.3427c0,-0.25446 -0.09463,-0.55207 -0.28386,-0.89286s-0.28386,-0.6066 -0.28386,-0.79744c0,-0.25446 0.25232,-0.49301 0.75696,-0.71565s1.19851,-0.36123 2.08165,-0.41576l0,-0.2181c-0.88312,-0.05453 -1.577,-0.19084 -2.08165,-0.40894s-0.75696,-0.45893 -0.75696,-0.72247c0,-0.19084 0.09463,-0.45438 0.28386,-0.79062s0.28386,-0.63614 0.28386,-0.89968c0,-0.48164 -0.43105,-0.92466 -1.29314,-1.32907s-1.98704,-0.64749 -3.37479,-0.72928l0,0.19084c0.96723,0.09996 1.67688,0.26354 2.12895,0.49073s0.67812,0.47256 0.67812,0.7361c0,0.2181 -0.08935,0.49982 -0.26809,0.84515s-0.26808,0.63613 -0.26808,0.8724c0,0.36351 0.30489,0.71565 0.91466,1.05644s1.51392,0.60206 2.71244,0.78381c-1.17749,0.19084 -2.07639,0.45893 -2.69668,0.80425s-0.93042,0.69974 -0.93042,1.06325c0,0.24537 0.08935,0.53844 0.26808,0.87923s0.26809,0.62023 0.26809,0.83833c0,0.27263 -0.22606,0.52027 -0.67812,0.74291s-1.16172,0.38849 -2.12895,0.49755l0,0l0,0.00002l0,-0.00001z" fill="#1b1b1b" stroke-width="0"/></g><g id="xunhuan_you" transform="translate(-50,-50)"><rect height="28.4" width="12.1" y="35.75" x="39.95" stroke-width="0" fill="#ffffff"/><rect height="29" width="1" y="35.5" x="45.65" fill="#1b1b1b"/><rect height="29" width="2.4" y="35.5" x="48.35" fill="#1b1b1b"/><circle r="1.53489" cy="44.15" cx="41.75" fill="#1b1b1b"/><circle r="1.53489" cy="54.8" cx="41.8" fill="#1b1b1b"/></g><g id="dakuohu_zuo_2" transform="translate(-50,-50)"><path d="m55.35585,12.01287l0,-1.51213c-1.92115,0.64801 -3.47848,2.57401 -4.67193,5.77811s-1.79017,6.75013 -1.79017,10.6382c0,2.01608 0.13099,4.37409 0.39296,7.07414s0.39296,4.80609 0.39296,6.31813c0,2.01607 -0.3493,3.90611 -1.04791,5.6701s-1.65918,2.86206 -2.88175,3.29407l0,1.72803c1.22255,0.432 2.18314,1.51202 2.88175,3.24006s1.04791,3.6361 1.04791,5.72411c0,1.51203 -0.13099,3.60004 -0.39296,6.26411s-0.39296,5.04015 -0.39296,7.12814c0,3.81605 0.59673,7.32613 1.79017,10.53022s2.75078,5.13011 4.67193,5.77811l0,-1.51202c-1.339,-0.79198 -2.32142,-2.08801 -2.94724,-3.88807s-0.93877,-3.74411 -0.93877,-5.83212c0,-1.72803 0.1237,-3.96011 0.37113,-6.69612s0.37112,-5.04004 0.37112,-6.91203c0,-2.88009 -0.42207,-5.67011 -1.26622,-8.37016s-2.09582,-4.77013 -3.755,-6.21012c1.63006,-1.51202 2.87447,-3.6361 3.73318,-6.37212s1.28804,-5.54407 1.28804,-8.42416c0,-1.94404 -0.12368,-4.26609 -0.37112,-6.96614s-0.37113,-4.9141 -0.37113,-6.64213c0,-2.16004 0.31294,-4.12211 0.93877,-5.88611s1.60823,-3.07806 2.94724,-3.94208l0,-0.00002z" fill="#1b1b1b"/></g><g id="shengbufu_shang" transform="translate(-50,-50)"><path stroke="#1b1b1b" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" d="m32.1,37c0,0 -1,5.5 -9.40001,7.4"/></g><g id="shengbufu_xia" transform="translate(-50,-50)"><path stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0" d="m32.25,63.39999c0,0 -1,-5.72297 -9.4,-7.69999" stroke="#1b1b1b"/></g><g id="yingao_di" transform="translate(-50,-50)"><ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/></g><g id="fudian" transform="translate(-50,-50)"><ellipse fill="#1b1b1b" cx="62.35" cy="49.75" rx="2.45" ry="2.45"/></g><g id="yingao_gao" transform="translate(-50,-50)"><ellipse ry="1.9" rx="1.9" cy="36" cx="49.3" fill="#1b1b1b"/></g><g id="yiyin_shuzi_5" transform="translate(-50,-50)"><path fill="#1b1b1b" d="m47.48999,52.97866q0.89893,0.58293 1.85624,0.58293q0.9106,0 1.47099,-0.51297t0.56036,-1.35236q0,-0.85104 -0.5662,-1.31738t-1.65194,-0.46633q-0.51368,0 -1.38926,0.08162l0,-4.47676l4.34289,0l0,0.97929l-3.30386,0l0,2.49485q0.49034,-0.02331 0.74717,-0.02331q1.38926,0 2.17144,0.70531t0.78219,1.9411q0,1.2824 -0.83471,2.07515t-2.31739,0.79276q-1.2375,0 -1.86791,-0.37307l0,-1.13085z"/></g><g id="yiyinxian_qian" transform="translate(-50,-50)"><path fill="#1b1b1b" d="m50.16008,57.08764c0,0 -0.818,4.79115 4.44059,5.49229" fill-opacity="0"  stroke="#1b1b1b"/></g><g id="bianyinfu_sheng" transform="translate(-50,-50)"><path stroke-width="33" d="m41.54219,35.03224c0.12982,-0.07418 0.33382,-0.01855 0.408,0.14836c0.03709,0.07418 0.03709,0.12982 0.03709,1.428c0,0.76036 0,1.37236 0.01855,1.37236c0,0 0.16691,-0.07418 0.37091,-0.14837c0.42654,-0.16691 0.48218,-0.18546 0.59345,-0.09272c0.12982,0.09272 0.12982,0.11127 0.12982,0.85309c0,0.63055 0,0.68618 -0.03709,0.74182c-0.01854,0.03709 -0.05563,0.07418 -0.07418,0.09273c-0.03709,0.01854 -0.25964,0.12982 -0.51927,0.22255l-0.46364,0.204l-0.01855,1.50218c0,0.816 0,1.50218 0.01855,1.50218c0,0 0.16691,-0.07418 0.37091,-0.14836c0.42654,-0.16691 0.48218,-0.18546 0.59345,-0.09273c0.12982,0.09273 0.12982,0.11127 0.12982,0.85309c0,0.63055 0,0.68618 -0.03709,0.74182c-0.01854,0.03709 -0.05563,0.07418 -0.07418,0.09273c-0.03709,0.01855 -0.25964,0.12981 -0.51927,0.22254l-0.46364,0.204l-0.01855,1.55782c0,1.40945 -0.01854,1.57637 -0.03709,1.632c-0.12982,0.22255 -0.44509,0.22255 -0.57491,0c-0.01854,-0.05564 -0.03709,-0.204 -0.03709,-1.50218l0,-1.428l-0.79745,0.31528l-0.77891,0.31527l0,1.50218c0,1.59491 0,1.55782 -0.09273,1.65055c-0.03709,0.05564 -0.16691,0.11127 -0.22255,0.11127c-0.07418,0 -0.204,-0.05563 -0.24109,-0.11127c-0.09273,-0.09272 -0.09273,-0.05563 -0.09273,-1.50218c0,-0.76037 0,-1.37236 -0.01854,-1.37236c0,0 -0.16691,0.07418 -0.37091,0.14836c-0.42655,0.16691 -0.48218,0.18546 -0.59346,0.09273c-0.12982,-0.09273 -0.12982,-0.11127 -0.12982,-0.85309c0,-0.63055 0,-0.68618 0.03709,-0.74182c0.01855,-0.03709 0.05564,-0.07418 0.07418,-0.09272c0.03709,-0.01855 0.25964,-0.12982 0.51927,-0.22255l0.48218,-0.204l0,-1.50218c0,-0.816 0,-1.50218 -0.01854,-1.50218c0,0 -0.16691,0.07418 -0.37091,0.14837c-0.42655,0.16691 -0.48218,0.18545 -0.59346,0.09272c-0.12982,-0.09272 -0.12982,-0.11127 -0.12982,-0.85309c0,-0.63055 0,-0.68618 0.03709,-0.74182c0.01855,-0.03709 0.05564,-0.07418 0.07418,-0.09273c0.03709,-0.01854 0.25964,-0.12982 0.51927,-0.22255l0.48218,-0.204l0,-1.55782c0,-1.40945 0.01855,-1.57636 0.03709,-1.632c0.12982,-0.22255 0.44509,-0.22255 0.57491,0c0.01855,0.05564 0.03709,0.204 0.03709,1.50218l0.01854,1.428l0.77891,-0.31527l0.77891,-0.31527l0,-1.50219c0,-1.40945 0,-1.50218 0.03709,-1.57637c0.03709,-0.07418 0.07418,-0.11127 0.16691,-0.14836zm-0.204,6.58364l0,-1.50218l-0.79745,0.31527l-0.77891,0.31527l0,1.52073l0,1.50218l0.05563,-0.01855c0.03709,-0.01855 0.38946,-0.16691 0.79746,-0.31527l0.72327,-0.29673l0,-1.52073z" fill="#1b1b1b"/></g><g id="lianyinxian_zuo" transform="translate(-50,-50)"><path stroke="#1b1b1b" d="m50.75,50.75c0,0 -8.39389,0.56947 -12.21896,8.88383" stroke-linecap="round" stroke-linejoin="null" stroke-width="1.2" fill="none"/></g><g id="lianyinxian_you" transform="translate(-50,-50)"><path stroke="#1b1b1b" d="m50.75,50.75c0,0 7.64178,0.56947 11.12411,8.88383" stroke-linecap="round" stroke-linejoin="null" stroke-width="1.2" fill="none"/></g><g id="qy0_0"><line x1="-3.5" y1="-10.5" x2="3.5" y2="-10.5" stroke-width="1" stroke="#1b1b1b" ></line><use x="0" y="-17" xlink:href="#yiyin_shuzi_5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use><use x="-0.5" y="-17" xlink:href="#yiyinxian_qian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use></g></defs>
  <text x="500" y="110" dy="30.078" text-anchor="middle" fill="#1b1b1b" style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei" >
  同一首歌xdv0.44
  </text>
  <use x="80" y="176" xlink:href="#diaohao_fu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="120" y="176" xlink:href="#diaohao_zimu_e" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="130" y="176" xlink:href="#paihao_xian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="140" y="164" xlink:href="#shuzi_c_bian_4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="140" y="188" xlink:href="#shuzi_c_bian_4" fill="#414141" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="80" y="217" dy="5.368" fill="#1b1b1b" font-size="16" font-family="Microsoft YaHei" >深情地</text>
  <text x="920" y="226" dy="-2.632" text-anchor="end" fill="#1b1b1b" font-size="16" font-family="Microsoft YaHei" >李炳富 编合唱</text>
  <text x="920" y="205" dy="-2.632" text-anchor="end" fill="#1b1b1b" font-size="16" font-family="Microsoft YaHei" >孟卫东 曲</text>
  <text x="920" y="184" dy="-2.632" text-anchor="end" fill="#1b1b1b" font-size="16" font-family="Microsoft YaHei" >陈哲 胡迎节  词</text>
  <use x="83" y="266" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="74.5" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_1" >鲜</text>
  <text x="74.5" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_1" >水</text>
  <use x="111.53006681514" y="266" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="140.06013363029" y="266" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_3" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="131.56013363029" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_3" >花</text>
  <text x="131.56013363029" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_3" >千</text>
  <use x="168.59020044543" y="266" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_1_4" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="160.09020044543" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_4" >曾</text>
  <text x="160.09020044543" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_4" >条</text>
  <use x="195.21826280624" y="266" xlink:href="#xiaojiexian" notepos="0_1_5" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="221.84632516704" y="266" xlink:href="#shuzi_c_3" time="1.5" audio="3" notepos="0_1_6" code="3." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="213.34632516704" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_6" >告</text>
  <text x="213.34632516704" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_6" >山</text>
  <use x="259.8864142539" y="266" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_1_7" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="251.3864142539" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_7" >诉</text>
  <text x="251.3864142539" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_7" >万</text>
  <use x="288.41648106904" y="266" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_1_8" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="279.91648106904" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_8" >我</text>
  <text x="279.91648106904" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_8" >座</text>
  <use x="316.94654788419" y="266" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_9" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="308.44654788419" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_9" >你</text>
  <text x="308.44654788419" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_9" >我</text>
  <use x="343.57461024499" y="266" xlink:href="#xiaojiexian" notepos="0_1_10" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="370.20267260579" y="266" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_1_11" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="361.70267260579" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_11" >怎</text>
  <text x="361.70267260579" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_11" >们</text>
  <use x="398.73273942094" y="266" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_12" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="427.26280623608" y="266" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_13" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="418.76280623608" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_13" >样</text>
  <text x="418.76280623608" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_13" >曾</text>
  <use x="455.79287305122" y="266" xlink:href="#shuzi_c_6" time="1" audio="6," notepos="0_1_14" code="6," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="447.29287305122" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_14" >走</text>
  <text x="447.29287305122" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_14" >走</text>
  <use x="482.42093541203" y="266" xlink:href="#xiaojiexian" notepos="0_1_15" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="509.04899777283" y="266" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_16" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="500.54899777283" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_16" >过</text>
  <text x="517.54899777283" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <text x="500.54899777283" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_16" >过</text>
  <text x="517.54899777283" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <use x="537.57906458797" y="266" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_17" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="566.10913140312" y="266" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_18" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="594.63919821826" y="266" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_19" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="621.26726057906" y="266" xlink:href="#xiaojiexian" notepos="0_1_20" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="647.89532293987" y="266" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_21" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="639.39532293987" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_21" >大</text>
  <text x="639.39532293987" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_21" >每</text>
  <use x="676.42538975501" y="266" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_22" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="704.95545657016" y="266" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_23" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="696.45545657016" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_23" >地</text>
  <text x="696.45545657016" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_23" >一</text>
  <use x="733.4855233853" y="266" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_1_24" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="724.9855233853" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_24" >知</text>
  <text x="724.9855233853" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_24" >次</text>
  <use x="760.1135857461" y="266" xlink:href="#xiaojiexian" notepos="0_1_25" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="786.7416481069" y="266" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_1_26" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="778.2416481069" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_26" >道</text>
  <text x="778.2416481069" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_26" >相</text>
  <use x="815.27171492205" y="266" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_1_27" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="806.77171492205" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_27" >你</text>
  <text x="806.77171492205" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_27" >逢</text>
  <use x="834.29175946548" y="266" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_1_28" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="825.79175946548" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_28" >心</text>
  <text x="825.79175946548" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_28" >和</text>
  <use x="862.82182628062" y="266" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_1_29" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="854.32182628062" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_29" >中</text>
  <text x="854.32182628062" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_29" >笑</text>
  <use x="891.35189309577" y="266" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_30" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="882.85189309577" y="301" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_30" >的</text>
  <text x="882.85189309577" y="326" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_1_30" >脸</text>
  <use x="923" y="266" xlink:href="#xiaojiexian" notepos="0_1_31" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="83" y="381" xlink:href="#shuzi_c_4" time="1.5" audio="4" notepos="0_2_1" code="4." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="74.5" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_1" >每</text>
  <text x="74.5" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_1" >都</text>
  <use x="118.49295774648" y="381" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_2_2" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="109.99295774648" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_2" >一</text>
  <text x="109.99295774648" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_2" >彼此</text>
  <use x="166.80281690141" y="381" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_2_3" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="158.30281690141" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_3" >个</text>
  <text x="158.30281690141" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_3" >铭</text>
  <use x="193.42253521127" y="381" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_2_4" code="2(/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="184.92253521127" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_4" >角</text>
  <use x="211.16901408451" y="381" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_2_5" code="3/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="236.01408450704" y="381" xlink:href="#xiaojiexian" notepos="0_2_6" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="260.85915492958" y="381" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_2_7" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="252.35915492958" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_7" >落</text>
  <text x="269.35915492958" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <text x="252.35915492958" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_7" >刻</text>
  <text x="269.35915492958" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <use x="287.47887323944" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_8" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="314.0985915493" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_9" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="340.71830985915" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_10" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="365.56338028169" y="381" xlink:href="#xiaojiexian" notepos="0_2_11" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="390.40845070423" y="381" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_2_12" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="381.90845070423" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_12" >甜</text>
  <text x="381.90845070423" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_12" >在</text>
  <use x="417.02816901408" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_13" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="443.64788732394" y="381" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_2_14" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="435.14788732394" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_14" >蜜</text>
  <text x="435.14788732394" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_14" >阳</text>
  <use x="470.2676056338" y="381" xlink:href="#shuzi_c_1" time="1" audio="1'" notepos="0_2_15" code="1'" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="461.7676056338" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_15" >的</text>
  <text x="461.7676056338" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_15" >光</text>
  <use x="495.11267605634" y="381" xlink:href="#xiaojiexian" notepos="0_2_16" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="519.95774647887" y="381" xlink:href="#shuzi_c_7" time="1" audio="7" notepos="0_2_17" code="7" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="511.45774647887" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_17" >梦</text>
  <text x="511.45774647887" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_17" >灿</text>
  <use x="546.57746478873" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_18" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="573.19718309859" y="381" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_2_19" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="564.69718309859" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_19" >啊</text>
  <text x="564.69718309859" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_19" >烂</text>
  <use x="599.81690140845" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_20" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="624.66197183099" y="381" xlink:href="#xiaojiexian" notepos="0_2_21" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="649.50704225352" y="381" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_2_22" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="641.00704225352" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_22" >谁</text>
  <text x="641.00704225352" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_22" >欢</text>
  <use x="676.12676056338" y="381" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_2_23" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="667.62676056338" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_23" >都</text>
  <text x="667.62676056338" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_23" >乐</text>
  <use x="693.87323943662" y="381" xlink:href="#shuzi_c_6" time="0.5" audio="6" notepos="0_2_24" code="6/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="685.37323943662" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_24" >不</text>
  <text x="685.37323943662" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_24" >的</text>
  <use x="720.49295774648" y="381" xlink:href="#shuzi_c_7" time="1" audio="7" notepos="0_2_25" code="7" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="711.99295774648" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_25" >会</text>
  <text x="711.99295774648" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_25" >日</text>
  <use x="747.11267605634" y="381" xlink:href="#shuzi_c_6" time="0.5" audio="6" notepos="0_2_26" code="6(/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="738.61267605634" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_26" >错</text>
  <text x="738.61267605634" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_26" >子</text>
  <use x="764.85915492958" y="381" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_2_27" code="5/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="789.70422535211" y="381" xlink:href="#xiaojiexian" notepos="0_2_28" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="814.54929577465" y="381" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_2_29" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="806.04929577465" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_29" >过</text>
  <text x="823.04929577465" y="416" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <text x="806.04929577465" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_2_29" >里</text>
  <text x="823.04929577465" y="441" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <use x="841.16901408451" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_30" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="867.78873239437" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_31" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="894.40845070423" y="381" xlink:href="#yanyinfu" time="1" audio="" notepos="0_2_32" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="923" y="381" xlink:href="#xiaojiexian" notepos="0_2_33" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="83" y="496" xlink:href="#shuzi_c_4" time="1.5" audio="4" notepos="0_3_1" code="4." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="74.5" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_1" >终</text>
  <text x="74.5" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_1" >我</text>
  <use x="118.18987341772" y="496" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_3_2" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="109.68987341772" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_2" >于</text>
  <text x="109.68987341772" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_2" >们</text>
  <use x="144.58227848101" y="496" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_3_3" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="136.08227848101" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_3" >迎</text>
  <text x="136.08227848101" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_3" >手</text>
  <use x="170.9746835443" y="496" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_3_4" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="162.4746835443" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_4" >来</text>
  <text x="162.4746835443" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_4" >拉</text>
  <use x="195.60759493671" y="496" xlink:href="#xiaojiexian" notepos="0_3_5" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="220.24050632911" y="496" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_3_6" code="5(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="211.74050632911" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_6" >今</text>
  <text x="211.74050632911" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_6" >手</text>
  <use x="246.63291139241" y="496" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_3_7" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="264.22784810127" y="496" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_3_8" code="3/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="290.62025316456" y="496" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_3_9" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="282.12025316456" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_9" >天</text>
  <text x="299.12025316456" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <text x="282.12025316456" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_9" >呀</text>
  <use x="317.01265822785" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_10" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="341.64556962025" y="496" xlink:href="#xiaojiexian" notepos="0_3_11" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="366.27848101266" y="496" xlink:href="#shuzi_c_7" time="1" audio="7," notepos="0_3_12" code="7," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="357.77848101266" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_12" >这</text>
  <text x="357.77848101266" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_12" >想</text>
  <use x="392.67088607595" y="496" xlink:href="#shuzi_c_7" time="0.5" audio="7," notepos="0_3_13" code="7,/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="384.17088607595" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_13" >欢</text>
  <text x="384.17088607595" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_13" >说</text>
  <use x="410.26582278481" y="496" xlink:href="#shuzi_c_6" time="0.5" audio="6," notepos="0_3_14" code="6,/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="401.76582278481" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_14" >聚</text>
  <text x="401.76582278481" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_14" >的</text>
  <use x="436.6582278481" y="496" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_3_15" code="5(," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="428.1582278481" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_15" >时</text>
  <text x="428.1582278481" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_15" >太</text>
  <use x="463.05063291139" y="496" xlink:href="#shuzi_c_6" time="1" audio="6," notepos="0_3_16" code="6,)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="487.6835443038" y="496" xlink:href="#xiaojiexian" notepos="0_3_17" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="512.3164556962" y="496" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_3_18" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="503.8164556962" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_18" >刻</text>
  <text x="520.8164556962" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >。</text>
  <text x="503.8164556962" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_18" >多</text>
  <text x="520.8164556962" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >。</text>
  <use x="538.70886075949" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_19" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="565.10126582278" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_20" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="591.49367088608" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_21" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="616.12658227848" y="496" xlink:href="#xiaojiexian" notepos="0_3_22" time="0" audio="" code="|&sbf" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="660.75949367089" y="496" xlink:href="#shuzi_c_1" time="1" audio="1'" notepos="0_3_23" code="1'" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="652.25949367089" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_23" >星</text>
  <text x="652.25949367089" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_23" >阳</text>
  <use x="687.15189873418" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_24" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="713.54430379747" y="496" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_3_25" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="705.04430379747" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_25" >光</text>
  <text x="705.04430379747" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_25" >光</text>
  <use x="739.93670886076" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_26" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="764.56962025317" y="496" xlink:href="#xiaojiexian" notepos="0_3_27" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="789.20253164557" y="496" xlink:href="#shuzi_c_4" time="1.5" audio="4" notepos="0_3_28" code="4." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="780.70253164557" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_28" >洒</text>
  <text x="780.70253164557" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_28" >想</text>
  <use x="824.39240506329" y="496" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_3_29" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="815.89240506329" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_29" >满</text>
  <text x="815.89240506329" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_29" >渗</text>
  <use x="850.78481012658" y="496" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_3_30" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="842.28481012658" y="531" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_30" >了</text>
  <text x="842.28481012658" y="556" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_3_30" >透</text>
  <use x="877.17721518987" y="496" xlink:href="#yanyinfu" time="1" audio="" notepos="0_3_31" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="923" y="496" xlink:href="#xiaojiexian" notepos="0_3_32" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="83" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_1" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="118.18987341772" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_2" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="144.58227848101" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_3" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="170.9746835443" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_4" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="195.60759493671" y="611" xlink:href="#xiaojiexian_weibu" notepos="0_4_5" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="220.24050632911" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_6" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="246.63291139241" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_7" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="290.62025316456" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_8" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="317.01265822785" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_9" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="341.64556962025" y="611" xlink:href="#xiaojiexian_weibu" notepos="0_4_10" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="366.27848101266" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_11" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="392.67088607595" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_12" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="436.6582278481" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_13" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="463.05063291139" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_14" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="487.6835443038" y="611" xlink:href="#xiaojiexian_weibu" notepos="0_4_15" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="512.3164556962" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_16" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="538.70886075949" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_17" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="565.10126582278" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_18" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="591.49367088608" y="611" xlink:href="#shuzi_null" time="0" audio="" notepos="0_4_19" code="8" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="616.12658227848" y="611" xlink:href="#xiaojiexian_weibu" notepos="0_4_20" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="660.75949367089" y="611" xlink:href="#shuzi_c_0" time="1" audio="0" notepos="0_4_21" code="0" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="687.15189873418" y="611" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_4_22" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="678.65189873418" y="646" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_22" >星</text>
  <text x="678.65189873418" y="671" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_22" >阳</text>
  <use x="713.54430379747" y="611" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_4_23" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="705.04430379747" y="646" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_23" >光</text>
  <text x="705.04430379747" y="671" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_23" >光</text>
  <use x="739.93670886076" y="611" xlink:href="#yanyinfu" time="1" audio="" notepos="0_4_24" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="764.56962025317" y="611" xlink:href="#xiaojiexian" notepos="0_4_25" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="789.20253164557" y="611" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_4_26" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="780.70253164557" y="646" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_26" >洒</text>
  <text x="780.70253164557" y="671" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_26" >想</text>
  <use x="824.39240506329" y="611" xlink:href="#yanyinfu" time="1" audio="" notepos="0_4_27" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="850.78481012658" y="611" xlink:href="#yanyinfu" time="1" audio="" notepos="0_4_28" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="877.17721518987" y="611" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_4_29" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="868.67721518987" y="646" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_29" >满</text>
  <text x="868.67721518987" y="671" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_29" >渗</text>
  <use x="894.77215189874" y="611" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_4_30" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="886.27215189874" y="646" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_30" >了</text>
  <text x="886.27215189874" y="671" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_4_30" >透</text>
  <use x="923" y="611" xlink:href="#xiaojiexian" notepos="0_4_31" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="726" xlink:href="#shuzi_c_7" time="1" audio="7" notepos="0_5_1" code="7" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="94.5" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_1" >所</text>
  <text x="94.5" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_1" >所</text>
  <use x="127.95975855131" y="726" xlink:href="#shuzi_c_7" time="0.5" audio="7" notepos="0_5_2" code="7/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="119.45975855131" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_2" >有</text>
  <text x="119.45975855131" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_2" >有</text>
  <use x="144.59959758551" y="726" xlink:href="#shuzi_c_7" time="0.5" audio="7" notepos="0_5_3" code="7/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="136.09959758551" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_3" >的</text>
  <text x="136.09959758551" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_3" >的</text>
  <use x="169.55935613682" y="726" xlink:href="#shuzi_c_7" time="1" audio="7" notepos="0_5_4" code="7(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="161.05935613682" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_4" >童</text>
  <text x="161.05935613682" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_4" >语</text>
  <use x="194.51911468813" y="726" xlink:href="#shuzi_c_6" time="0.5" audio="6" notepos="0_5_5" code="6/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="211.15895372233" y="726" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_5_6" code="5/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="234.45472837022" y="726" xlink:href="#xiaojiexian" notepos="0_5_7" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="257.75050301811" y="726" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_5_8" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="249.25050301811" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_8" >年</text>
  <text x="266.25050301811" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <text x="249.25050301811" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_8" >言</text>
  <text x="266.25050301811" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <use x="282.71026156942" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_9" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="307.67002012072" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_10" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="332.62977867203" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_11" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="355.92555331992" y="726" xlink:href="#xiaojiexian" notepos="0_5_12" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="379.22132796781" y="726" xlink:href="#shuzi_c_1" time="1" audio="1'" notepos="0_5_13" code="1'" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="370.72132796781" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_13" >风</text>
  <text x="370.72132796781" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_13" >春</text>
  <use x="404.18108651911" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_14" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="429.14084507042" y="726" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_5_15" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="420.64084507042" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_15" >雨</text>
  <text x="420.64084507042" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_15" >天</text>
  <use x="454.10060362173" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_16" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="477.39637826962" y="726" xlink:href="#xiaojiexian" notepos="0_5_17" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="500.69215291751" y="726" xlink:href="#shuzi_c_4" time="1.5" audio="4" notepos="0_5_18" code="4." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="492.19215291751" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_18" >走</text>
  <text x="492.19215291751" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_18" >把</text>
  <use x="533.97183098592" y="726" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_5_19" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="525.47183098592" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_19" >遍</text>
  <text x="525.47183098592" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_19" >友</text>
  <use x="558.93158953722" y="726" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_5_20" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="550.43158953722" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_20" >了</text>
  <text x="550.43158953722" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_20" >好</text>
  <use x="583.89134808853" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_21" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="623.82696177062" y="726" xlink:href="#xiaojiexian" notepos="0_5_22" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="650.45070422535" y="726" xlink:href="#shuzi_c_6" time="1" audio="6," notepos="0_5_23" code="6," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="641.95070422535" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_23" >世</text>
  <text x="641.95070422535" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_23" >故</text>
  <use x="678.7384305835" y="726" xlink:href="#shuzi_c_6" time="0.5" audio="6," notepos="0_5_24" code="6,/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="670.2384305835" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_24" >间</text>
  <text x="670.2384305835" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_24" >事</text>
  <use x="695.37826961771" y="726" xlink:href="#shuzi_c_6" time="0.5" audio="6," notepos="0_5_25" code="6,/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="686.87826961771" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_25" >的</text>
  <use x="727.33802816901" y="726" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_5_26" code="6(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="718.83802816901" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_26" >角</text>
  <text x="718.83802816901" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_26" >传</text>
  <use x="755.62575452716" y="726" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_5_27" code="4/#" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="772.26559356137" y="726" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_5_28" code="3/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="798.8893360161" y="726" xlink:href="#xiaojiexian" notepos="0_5_29" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="822.18511066398" y="726" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_5_30" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use cx="0" cy="0" xlink:href="#ci_dakuohu_you" transform ="translate(837.18511066398,772.75)scale(1,3.75)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="813.68511066398" y="761" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_30" >落</text>
  <text x="813.68511066398" y="786" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_5_30" >说</text>
  <use x="847.14486921529" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_31" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="872.1046277666" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_32" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="897.06438631791" y="726" xlink:href="#yanyinfu" time="1" audio="" notepos="0_5_33" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="923" y="726" xlink:href="#xiaojiexian" notepos="0_5_34" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="841" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_6_1" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="94.5" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_1" >所</text>
  <text x="94.5" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_1" >所</text>
  <use x="127.95975855131" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="169.55935613682" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_3" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="194.51911468813" y="841" xlink:href="#shuzi_c_1" time="0.5" audio="1" notepos="0_6_4" code="1/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="186.01911468813" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_4" >有</text>
  <text x="186.01911468813" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_4" >有</text>
  <use x="211.15895372233" y="841" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_6_5" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="202.65895372233" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_5" >的</text>
  <text x="202.65895372233" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_5" >的</text>
  <use x="234.45472837022" y="841" xlink:href="#xiaojiexian" notepos="0_6_6" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="257.75050301811" y="841" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_6_7" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="249.25050301811" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_7" >童</text>
  <text x="249.25050301811" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_7" >语</text>
  <use x="282.71026156942" y="841" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_6_8" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="274.21026156942" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_8" >年</text>
  <text x="291.21026156942" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <text x="274.21026156942" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_8" >言</text>
  <text x="291.21026156942" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <use x="307.67002012072" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_9" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="332.62977867203" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_10" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="355.92555331992" y="841" xlink:href="#xiaojiexian" notepos="0_6_11" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="379.22132796781" y="841" xlink:href="#shuzi_c_0" time="1" audio="0" notepos="0_6_12" code="0" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="404.18108651911" y="841" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_6_13" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="395.68108651911" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_13" >风</text>
  <text x="395.68108651911" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_13" >春</text>
  <use x="429.14084507042" y="841" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_6_14" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="420.64084507042" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_14" >雨</text>
  <text x="420.64084507042" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_14" >天</text>
  <use x="454.10060362173" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_15" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="477.39637826962" y="841" xlink:href="#xiaojiexian" notepos="0_6_16" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="500.69215291751" y="841" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_6_17" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="492.19215291751" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_17" >走</text>
  <text x="492.19215291751" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_17" >把</text>
  <use x="533.97183098592" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_18" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="558.93158953722" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_19" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="583.89134808853" y="841" xlink:href="#shuzi_c_6" time="0.5" audio="6" notepos="0_6_20" code="6/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="575.39134808853" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_20" >遍</text>
  <text x="575.39134808853" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_20" >友</text>
  <use x="600.53118712274" y="841" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_6_21" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="592.03118712274" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_21" >了</text>
  <text x="592.03118712274" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_21" >好</text>
  <use x="623.82696177062" y="841" xlink:href="#xiaojiexian" notepos="0_6_22" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="650.45070422535" y="841" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_6_23" code="4#" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="641.95070422535" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_23" >世</text>
  <text x="641.95070422535" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_23" >故</text>
  <use x="678.7384305835" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_24" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="727.33802816901" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_25" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="755.62575452716" y="841" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_6_26" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="747.12575452716" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_26" >间</text>
  <text x="747.12575452716" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_26" >事</text>
  <use x="772.26559356137" y="841" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_6_27" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="763.76559356137" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_27" >的</text>
  <use x="798.8893360161" y="841" xlink:href="#xiaojiexian" notepos="0_6_28" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="822.18511066398" y="841" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_6_29" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="813.68511066398" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_29" >角</text>
  <text x="813.68511066398" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_29" >传</text>
  <use x="847.14486921529" y="841" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_6_30" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use cx="0" cy="0" xlink:href="#ci_dakuohu_you" transform ="translate(862.14486921529,887.75)scale(1,3.75)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="838.64486921529" y="876" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_30" >落</text>
  <text x="838.64486921529" y="901" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_6_30" >说</text>
  <use x="872.1046277666" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_31" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="897.06438631791" y="841" xlink:href="#yanyinfu" time="1" audio="" notepos="0_6_32" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="923" y="841" xlink:href="#xiaojiexian" notepos="0_6_33" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="956" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_7_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="94.5" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_1" >同</text>
  <use x="129.39240506329" y="956" xlink:href="#yanyinfu" time="1" audio="" notepos="0_7_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="155.78481012658" y="956" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_7_3" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="147.28481012658" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_3" >样</text>
  <use x="182.17721518987" y="956" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_7_4" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="173.67721518987" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_4" >的</text>
  <use x="206.81012658228" y="956" xlink:href="#xiaojiexian" notepos="0_7_5" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="231.44303797468" y="956" xlink:href="#shuzi_c_3" time="1.5" audio="3" notepos="0_7_6" code="3(." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="222.94303797468" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_6" >感</text>
  <use x="266.63291139241" y="956" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_7_7" code="4/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="293.0253164557" y="956" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_7_8" code="3" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="284.5253164557" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_8" >受</text>
  <use x="319.41772151899" y="956" xlink:href="#shuzi_c_1" time="0.5" audio="1" notepos="0_7_9" code="1/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="310.91772151899" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_9" >给</text>
  <use x="337.01265822785" y="956" xlink:href="#shuzi_c_1" time="0.5" audio="1" notepos="0_7_10" code="1/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="328.51265822785" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_10" >了</text>
  <use x="361.64556962025" y="956" xlink:href="#xiaojiexian" notepos="0_7_11" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="386.27848101266" y="956" xlink:href="#shuzi_c_2" time="1.5" audio="2" notepos="0_7_12" code="2." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="377.77848101266" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_12" >我</text>
  <use x="421.46835443038" y="956" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_7_13" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="412.96835443038" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_13" >们</text>
  <use x="447.86075949367" y="956" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_7_14" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="439.36075949367" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_14" >同</text>
  <use x="474.25316455696" y="956" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_7_15" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="465.75316455696" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_15" >样</text>
  <use x="491.84810126582" y="956" xlink:href="#shuzi_c_1" time="0.5" audio="1" notepos="0_7_16" code="1/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="483.34810126582" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_16" >的</text>
  <use x="516.48101265823" y="956" xlink:href="#xiaojiexian" notepos="0_7_17" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="541.11392405063" y="956" xlink:href="#shuzi_c_6" time="1" audio="6," notepos="0_7_18" code="6," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="532.61392405063" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_18" >渴</text>
  <use x="567.50632911392" y="956" xlink:href="#shuzi_c_6" time="1" audio="6," notepos="0_7_19" code="6," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="559.00632911392" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_19" >望</text>
  <text x="576.00632911392" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >，</text>
  <use x="593.89873417722" y="956" xlink:href="#yanyinfu" time="1" audio="" notepos="0_7_20" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="620.29113924051" y="956" xlink:href="#yanyinfu" time="1" audio="" notepos="0_7_21" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="644.92405063291" y="956" xlink:href="#xiaojiexian" notepos="0_7_22" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="669.55696202532" y="956" xlink:href="#shuzi_c_7" time="1" audio="7," notepos="0_7_23" code="7," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="661.05696202532" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_23" >同</text>
  <use x="695.94936708861" y="956" xlink:href="#yanyinfu" time="1" audio="" notepos="0_7_24" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="722.3417721519" y="956" xlink:href="#shuzi_c_7" time="1" audio="7," notepos="0_7_25" code="7," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="713.8417721519" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_25" >样</text>
  <use x="748.73417721519" y="956" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_7_26" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="740.23417721519" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_26" >的</text>
  <use x="773.3670886076" y="956" xlink:href="#xiaojiexian" notepos="0_7_27" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="798" y="956" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_7_28" code="5(," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="789.5" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_28" >欢</text>
  <use x="824.39240506329" y="956" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_7_29" code="6)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="850.78481012658" y="956" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_7_30" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="842.28481012658" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_30" >乐</text>
  <use x="877.17721518987" y="956" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_7_31" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="868.67721518987" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_31" >给</text>
  <use x="894.77215189874" y="956" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_7_32" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="886.27215189874" y="991" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_7_32" >了</text>
  <use x="923" y="956" xlink:href="#xiaojiexian" notepos="0_7_33" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1046" xlink:href="#shuzi_c_3" time="1" audio="3," notepos="0_8_1" code="3(," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="94.5" y="1081" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_8_1" >啊</text>
  <use x="129.39240506329" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="155.78481012658" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_3" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="182.17721518987" y="1046" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_8_4" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="206.81012658228" y="1046" xlink:href="#xiaojiexian" notepos="0_8_5" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="231.44303797468" y="1046" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_8_6" code="1)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="266.63291139241" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_7" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="293.0253164557" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_8" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="319.41772151899" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_9" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="361.64556962025" y="1046" xlink:href="#xiaojiexian" notepos="0_8_10" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="386.27848101266" y="1046" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_8_11" code="6(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="377.77848101266" y="1081" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_8_11" >啊</text>
  <use x="421.46835443038" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_12" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="447.86075949367" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_13" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="474.25316455696" y="1046" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_8_14" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="516.48101265823" y="1046" xlink:href="#xiaojiexian" notepos="0_8_15" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="541.11392405063" y="1046" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_8_16" code="4)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="567.50632911392" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_17" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="593.89873417722" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_18" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="620.29113924051" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_19" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="644.92405063291" y="1046" xlink:href="#xiaojiexian" notepos="0_8_20" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="669.55696202532" y="1046" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_8_21" code="5(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="661.05696202532" y="1081" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_8_21" >啊</text>
  <use x="695.94936708861" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_22" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="722.3417721519" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_23" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="748.73417721519" y="1046" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_8_24" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="740.23417721519" y="1081" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_8_24" ></text>
  <use x="773.3670886076" y="1046" xlink:href="#xiaojiexian" notepos="0_8_25" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="798" y="1046" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_8_26" code="2)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="789.5" y="1081" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_8_26" ></text>
  <use x="824.39240506329" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_27" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="850.78481012658" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_28" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="877.17721518987" y="1046" xlink:href="#yanyinfu" time="1" audio="" notepos="0_8_29" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="923" y="1046" xlink:href="#xiaojiexian" notepos="0_8_30" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1164" xlink:href="#shuzi_c_4" time="1.5" audio="4" notepos="0_9_1" code="4." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="94.5" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_1" >我</text>
  <use x="136.90243902439" y="1164" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_9_2" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="128.40243902439" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_2" >们</text>
  <use x="162.32926829268" y="1164" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_9_3" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="153.82926829268" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_3" >同</text>
  <use x="187.75609756098" y="1164" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_9_4" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="179.25609756098" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_4" >一</text>
  <use x="204.70731707317" y="1164" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_9_5" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="196.20731707317" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_5" >首</text>
  <use x="228.43902439024" y="1164" xlink:href="#xiaojiexian" notepos="0_9_6" time="0" audio="" code="|[++'1.'" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="252.17073170732" y="1164" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_9_7" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="243.67073170732" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_7" >歌</text>
  <text x="260.67073170732" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >。</text>
  <use x="277.59756097561" y="1164" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_8" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="303.0243902439" y="1164" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_9" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="328.4512195122" y="1164" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_10" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="352.18292682927" y="1164" xlink:href="#xunhuan_you" notepos="0_9_11" time="0" audio="" code="|y][++'2.'" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="375.91463414634" y="1164" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_9_12" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="367.41463414634" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_12" >歌</text>
  <text x="384.41463414634" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" >。</text>
  <use x="401.34146341463" y="1164" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_13" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="426.76829268293" y="1164" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_14" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="452.19512195122" y="1164" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_15" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="475.92682926829" y="1164" xlink:href="#xiaojiexian" notepos="0_9_16" time="0" audio="" code="|&dsb_a" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="489.48780487805" y="1164" xlink:href="#dakuohu_zuo_2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="513.21951219512" y="1136" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0__" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="513.21951219512" y="1192" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_9_17" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="504.71951219512" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_17" >阳</text>
  <use x="538.64634146341" y="1136" xlink:href="#yanyinfu" time="1" audio="" notepos="0__" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="538.64634146341" y="1192" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_18" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="564.07317073171" y="1136" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0__" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="564.07317073171" y="1192" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_9_19" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="555.57317073171" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_19" >光</text>
  <use x="589.5" y="1136" xlink:href="#yanyinfu" time="1" audio="" notepos="0__" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="589.5" y="1192" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_20" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="613.23170731707" y="1136" xlink:href="#xiaojiexian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="613.23170731707" y="1192" xlink:href="#xiaojiexian" notepos="0_9_20" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="636.96341463415" y="1136" xlink:href="#shuzi_c_4" time="1.5" audio="4" notepos="0__" code="4." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="636.96341463415" y="1192" xlink:href="#shuzi_c_2" time="1.5" audio="2" notepos="0_9_21" code="2." xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="628.46341463415" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_21" >想</text>
  <use x="670.86585365854" y="1136" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0__" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="670.86585365854" y="1192" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_9_22" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="662.36585365854" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_22" >渗</text>
  <use x="696.29268292683" y="1136" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0__" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="696.29268292683" y="1192" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_9_23" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="687.79268292683" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_23" >透</text>
  <use x="721.71951219512" y="1136" xlink:href="#yanyinfu" time="1" audio="" notepos="0__" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="721.71951219512" y="1192" xlink:href="#yanyinfu" time="1" audio="" notepos="0_9_24" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="762.40243902439" y="1136" xlink:href="#xiaojiexian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="762.40243902439" y="1192" xlink:href="#xiaojiexian" notepos="0_9_24" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="786.13414634146" y="1136" xlink:href="#shuzi_c_7" time="1" audio="7" notepos="0__" code="7" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="786.13414634146" y="1192" xlink:href="#shuzi_c_5" time="1" audio="5" notepos="0_9_25" code="5" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="777.63414634146" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_25" >所</text>
  <use x="811.56097560976" y="1136" xlink:href="#shuzi_c_7" time="0.5" audio="7" notepos="0__" code="7/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="828.51219512195" y="1136" xlink:href="#shuzi_c_7" time="0.5" audio="7" notepos="0__" code="7/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="811.56097560976" y="1192" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_9_26" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="803.06097560976" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_26" >有</text>
  <use x="828.51219512195" y="1192" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0_9_27" code="5/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="820.01219512195" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_27" >的</text>
  <use x="853.93902439024" y="1136" xlink:href="#shuzi_c_7" time="1" audio="7" notepos="0__" code="7" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="853.93902439024" y="1192" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_9_28" code="4(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="845.43902439024" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_28" >语</text>
  <use x="879.36585365854" y="1136" xlink:href="#shuzi_c_6" time="0.5" audio="6" notepos="0__" code="6(/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="896.31707317073" y="1136" xlink:href="#shuzi_c_5" time="0.5" audio="5" notepos="0__" code="5/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="879.36585365854" y="1192" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_9_29" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="870.86585365854" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_29" ></text>
  <use x="896.31707317073" y="1192" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_9_30" code="2/)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="887.81707317073" y="1227" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_9_30" ></text>
  <use x="923" y="1136" xlink:href="#xiaojiexian_weibu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="923" y="1192" xlink:href="#xiaojiexian" notepos="0_9_30" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1282" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_10_1" code="2(" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="94.5" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_1" >啊</text>
  <use x="136.90243902439" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="162.32926829268" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_3" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="187.75609756098" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_4" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="228.43902439024" y="1282" xlink:href="#xiaojiexian" notepos="0_10_5" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="252.17073170732" y="1282" xlink:href="#shuzi_c_3" time="1" audio="3" notepos="0_10_6" code="3)" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="277.59756097561" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_7" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="303.0243902439" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_8" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="328.4512195122" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_9" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="352.18292682927" y="1282" xlink:href="#xunhuan_you" notepos="0_10_10" time="0" audio="" code="|yj" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="375.91463414634" y="1282" xlink:href="#shuzi_c_3" time="1" audio="0" notepos="0_10_11" code="3()" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="401.34146341463" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_12" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="426.76829268293" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_13" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="452.19512195122" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_14" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="475.92682926829" y="1282" xlink:href="#xiaojiexian" notepos="0_10_15" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="513.21951219512" y="1282" xlink:href="#shuzi_c_0" time="1" audio="0" notepos="0_10_16" code="0" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="538.64634146341" y="1282" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_10_17" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="530.14634146341" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_17" >阳</text>
  <use x="564.07317073171" y="1282" xlink:href="#shuzi_c_4" time="1" audio="4" notepos="0_10_18" code="4" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="555.57317073171" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_18" >光</text>
  <use x="589.5" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_19" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="613.23170731707" y="1282" xlink:href="#xiaojiexian" notepos="0_10_20" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="636.96341463415" y="1282" xlink:href="#shuzi_c_6" time="1" audio="6" notepos="0_10_21" code="6" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="628.46341463415" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_21" >想</text>
  <use x="670.86585365854" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_22" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="696.29268292683" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_23" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="721.71951219512" y="1282" xlink:href="#shuzi_c_4" time="0.5" audio="4" notepos="0_10_24" code="4/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="713.21951219512" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_24" >渗</text>
  <use x="738.67073170732" y="1282" xlink:href="#shuzi_c_3" time="0.5" audio="3" notepos="0_10_25" code="3/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="730.17073170732" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_25" >透</text>
  <use x="762.40243902439" y="1282" xlink:href="#xiaojiexian" notepos="0_10_26" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="786.13414634146" y="1282" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_10_27" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="777.63414634146" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_27" >所</text>
  <use x="811.56097560976" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_28" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="853.93902439024" y="1282" xlink:href="#yanyinfu" time="1" audio="" notepos="0_10_29" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="879.36585365854" y="1282" xlink:href="#shuzi_c_1" time="0.5" audio="1" notepos="0_10_30" code="1/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="870.86585365854" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_30" >有</text>
  <use x="896.31707317073" y="1282" xlink:href="#shuzi_c_2" time="0.5" audio="2" notepos="0_10_31" code="2/" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="887.81707317073" y="1317" dy="5.7035" fill="#101010" font-size="17" font-family="Microsoft YaHei" cipos="0_10_31" >的</text>
  <use x="923" y="1282" xlink:href="#xiaojiexian" notepos="0_10_32" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <text x="625.75949367089" y="496" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="625.75949367089" y="611" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="68" y="726" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="68" y="841" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="68" y="956" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="68" y="1046" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="68" y="1164" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <text x="68" y="1282" dy="5.7035" text-anchor="end" fill="#101010" font-size="17" font-family="Microsoft YaHei" ></text>
  <use x="660.75949367089" y="496" xlink:href="#shengbufu_shang" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="660.75949367089" y="611" xlink:href="#shengbufu_xia" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="635.25949367089" y1="489.5" x2="635.25949367089" y2="617.5" stroke-width="4" stroke="#1b1b1b" fill="none" ></line>
  <line x1="639.75949367089" y1="488" x2="639.75949367089" y2="619" stroke-width="2" stroke="#1b1b1b" fill="none" ></line>
  <use x="103" y="726" xlink:href="#shengbufu_shang" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="841" xlink:href="#shengbufu_xia" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="77.5" y1="719.5" x2="77.5" y2="847.5" stroke-width="4" stroke="#1b1b1b" fill="none" ></line>
  <line x1="82" y1="718" x2="82" y2="849" stroke-width="2" stroke="#1b1b1b" fill="none" ></line>
  <use x="103" y="956" xlink:href="#shengbufu_shang" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1046" xlink:href="#shengbufu_xia" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="77.5" y1="949.5" x2="77.5" y2="1052.5" stroke-width="4" stroke="#1b1b1b" fill="none" ></line>
  <line x1="82" y1="948" x2="82" y2="1054" stroke-width="2" stroke="#1b1b1b" fill="none" ></line>
  <use x="103" y="1164" xlink:href="#shengbufu_shang" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1282" xlink:href="#shengbufu_xia" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="77.5" y1="1157.5" x2="77.5" y2="1288.5" stroke-width="4" stroke="#1b1b1b" fill="none" ></line>
  <line x1="82" y1="1156" x2="82" y2="1290" stroke-width="2" stroke="#1b1b1b" fill="none" ></line>
  <line x1="253.8864142539" y1="279" x2="265.8864142539" y2="279" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="809.27171492205" y1="279" x2="840.29175946548" y2="279" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="112.49295774648" y1="394" x2="124.49295774648" y2="394" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="187.42253521127" y1="394" x2="217.16901408451" y2="394" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="670.12676056338" y1="394" x2="699.87323943662" y2="394" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="741.11267605634" y1="394" x2="770.85915492958" y2="394" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="112.18987341772" y1="509" x2="124.18987341772" y2="509" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="240.63291139241" y1="509" x2="270.22784810127" y2="509" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="386.67088607595" y1="509" x2="416.26582278481" y2="509" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="818.39240506329" y1="509" x2="830.39240506329" y2="509" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="871.17721518987" y1="624" x2="900.77215189874" y2="624" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="121.95975855131" y1="739" x2="150.59959758551" y2="739" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="188.51911468813" y1="739" x2="217.15895372233" y2="739" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="527.97183098592" y1="739" x2="539.97183098592" y2="739" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="672.7384305835" y1="739" x2="701.37826961771" y2="739" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="749.62575452716" y1="739" x2="778.26559356137" y2="739" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="188.51911468813" y1="854" x2="217.15895372233" y2="854" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="577.89134808853" y1="854" x2="606.53118712274" y2="854" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="749.62575452716" y1="854" x2="778.26559356137" y2="854" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="260.63291139241" y1="969" x2="272.63291139241" y2="969" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="313.41772151899" y1="969" x2="343.01265822785" y2="969" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="415.46835443038" y1="969" x2="427.46835443038" y2="969" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="468.25316455696" y1="969" x2="497.84810126582" y2="969" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="871.17721518987" y1="969" x2="900.77215189874" y2="969" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="664.86585365854" y1="1149" x2="676.86585365854" y2="1149" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="805.56097560976" y1="1149" x2="834.51219512195" y2="1149" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="873.36585365854" y1="1149" x2="902.31707317073" y2="1149" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="130.90243902439" y1="1177" x2="142.90243902439" y2="1177" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="181.75609756098" y1="1177" x2="210.70731707317" y2="1177" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="664.86585365854" y1="1205" x2="676.86585365854" y2="1205" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="805.56097560976" y1="1205" x2="834.51219512195" y2="1205" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="873.36585365854" y1="1205" x2="902.31707317073" y2="1205" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="715.71951219512" y1="1295" x2="744.67073170732" y2="1295" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <line x1="873.36585365854" y1="1295" x2="902.31707317073" y2="1295" data-type="jianshixian" stroke-width="2" stroke="#1b1b1b" ></line>
  <use x="83" y="267" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="221.84632516704" y="266" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="455.79287305122" y="267" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="647.89532293987" y="267" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="83" y="381" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="470.2676056338" y="381" xlink:href="#yingao_gao" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="83" y="496" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="366.27848101266" y="497" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="392.67088607595" y="501" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="410.26582278481" y="501" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="436.6582278481" y="497" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="463.05063291139" y="497" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="660.75949367089" y="496" xlink:href="#yingao_gao" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="789.20253164557" y="496" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="379.22132796781" y="726" xlink:href="#yingao_gao" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="500.69215291751" y="726" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="650.45070422535" y="727" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="678.7384305835" y="731" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="695.37826961771" y="731" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="715.33802816901" y="726" xlink:href="#qy0_0" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="755.62575452716" y="726" xlink:href="#bianyinfu_sheng" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="650.45070422535" y="841" xlink:href="#bianyinfu_sheng" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="957" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="231.44303797468" y="956" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="386.27848101266" y="956" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="541.11392405063" y="957" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="567.50632911392" y="957" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="669.55696202532" y="957" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="722.3417721519" y="957" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="798" y="957" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1047" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="636.96341463415" y="1136" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="103" y="1164" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="636.96341463415" y="1192" xlink:href="#fudian" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <path d="M 880.36585365854,1120 C 884.4512195122,1110,891.23170731707,1110,895.31707317073,1120 M 895.31707317073,1120 C  891.23170731707,1111,884.4512195122,1111,880.36585365854,1120" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 194.42253521127,365 C 198.74647887324,355,205.84507042254,355,210.16901408451,365 M 210.16901408451,365 C  205.84507042254,356,198.74647887324,356,194.42253521127,365" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 748.11267605634,365 C 752.43661971831,355,759.53521126761,355,763.85915492958,365 M 763.85915492958,365 C  759.53521126761,356,752.43661971831,356,748.11267605634,365" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 221.24050632911,480 C 233.43670886076,470,251.03164556962,470,263.22784810127,480 M 263.22784810127,480 C  251.03164556962,471,233.43670886076,471,221.24050632911,480" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 437.6582278481,480 C 444.57594936709,470,455.13291139241,470,462.05063291139,480 M 462.05063291139,480 C  455.13291139241,471,444.57594936709,471,437.6582278481,480" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 170.55935613682,710 C 182.03923541247,700,198.67907444668,700,210.15895372233,710 M 210.15895372233,710 C  198.67907444668,701,182.03923541247,701,170.55935613682,710" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 728.33802816901,710 C 740.81629778672,700,758.78732394366,700,771.26559356137,710 M 771.26559356137,710 C  758.78732394366,701,740.81629778672,701,728.33802816901,710" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 232.44303797468,940 C 242,930,256.07594936709,930,265.63291139241,940 M 265.63291139241,940 C  256.07594936709,931,242,931,232.44303797468,940" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 799,940 C 805.91772151899,930,816.4746835443,930,823.39240506329,940 M 823.39240506329,940 C  816.4746835443,931,805.91772151899,931,799,940" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 854.93902439024,1176 C 866.65243902439,1166,883.60365853659,1166,895.31707317073,1176 M 895.31707317073,1176 C  883.60365853659,1167,866.65243902439,1167,854.93902439024,1176" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 194.42253521127,365 C 198.74647887324,355,205.84507042254,355,210.16901408451,365 M 210.16901408451,365 C  205.84507042254,356,198.74647887324,356,194.42253521127,365" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 748.11267605634,365 C 752.43661971831,355,759.53521126761,355,763.85915492958,365 M 763.85915492958,365 C  759.53521126761,356,752.43661971831,356,748.11267605634,365" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 221.24050632911,480 C 233.43670886076,470,251.03164556962,470,263.22784810127,480 M 263.22784810127,480 C  251.03164556962,471,233.43670886076,471,221.24050632911,480" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 437.6582278481,480 C 444.57594936709,470,455.13291139241,470,462.05063291139,480 M 462.05063291139,480 C  455.13291139241,471,444.57594936709,471,437.6582278481,480" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 170.55935613682,710 C 182.03923541247,700,198.67907444668,700,210.15895372233,710 M 210.15895372233,710 C  198.67907444668,701,182.03923541247,701,170.55935613682,710" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 728.33802816901,710 C 740.81629778672,700,758.78732394366,700,771.26559356137,710 M 771.26559356137,710 C  758.78732394366,701,740.81629778672,701,728.33802816901,710" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 232.44303797468,940 C 242,930,256.07594936709,930,265.63291139241,940 M 265.63291139241,940 C  256.07594936709,931,242,931,232.44303797468,940" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 799,940 C 805.91772151899,930,816.4746835443,930,823.39240506329,940 M 823.39240506329,940 C  816.4746835443,931,805.91772151899,931,799,940" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <path d="M 854.93902439024,1176 C 866.65243902439,1166,883.60365853659,1166,895.31707317073,1176 M 895.31707317073,1176 C  883.60365853659,1167,866.65243902439,1167,854.93902439024,1176" stroke-width="0.5" stroke="#1b1b1b" ></path>
  <use x="115" y="1020.05" xlink:href="#lianyinxian_zuo" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="219.44303797468" y="1020.05" xlink:href="#lianyinxian_you" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="115.8" y1="1020.8" x2="220.44303797468" y2="1020.8" stroke-width="1.2" stroke="#1b1b1b" fill="none" ></line>
  <use x="398.27848101266" y="1020.05" xlink:href="#lianyinxian_zuo" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="529.11392405063" y="1020.05" xlink:href="#lianyinxian_you" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="399.07848101266" y1="1020.8" x2="530.11392405063" y2="1020.8" stroke-width="1.2" stroke="#1b1b1b" fill="none" ></line>
  <use x="681.55696202532" y="1020.05" xlink:href="#lianyinxian_zuo" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="786" y="1020.05" xlink:href="#lianyinxian_you" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="682.35696202532" y1="1020.8" x2="787" y2="1020.8" stroke-width="1.2" stroke="#1b1b1b" fill="none" ></line>
  <use x="115" y="1256.05" xlink:href="#lianyinxian_zuo" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <use x="240.17073170732" y="1256.05" xlink:href="#lianyinxian_you" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
  <line x1="115.8" y1="1256.8" x2="241.17073170732" y2="1256.8" stroke-width="1.2" stroke="#1b1b1b" fill="none" ></line>
  <line x1="230.43902439024" y1="1124" x2="230.43902439024" y2="1114" stroke-width="1" stroke="#1b1b1b" fill="none" ></line>
  <line x1="230.43902439024" y1="1114" x2="350.18292682927" y2="1114" stroke-width="1" stroke="#1b1b1b" fill="none" ></line>
  <line x1="350.18292682927" y1="1124" x2="350.18292682927" y2="1114" stroke-width="1" stroke="#1b1b1b" fill="none" ></line>
  <text x="233.43902439024" y="1124" dy="4.026" fill="#303030" font-size="12" font-family="Microsoft YaHei" xml:space="preserve" >1.</text>
  <line x1="354.18292682927" y1="1124" x2="354.18292682927" y2="1114" stroke-width="1" stroke="#1b1b1b" fill="none" ></line>
  <line x1="354.18292682927" y1="1114" x2="611.23170731707" y2="1114" stroke-width="1" stroke="#1b1b1b" fill="none" ></line>
  <text x="357.18292682927" y="1124" dy="4.026" fill="#303030" font-size="12" font-family="Microsoft YaHei" xml:space="preserve" >2.</text>
  <g id="custom"><defs><g id="custom_4yPJ2wPA6h" data-type="symbol">
  <rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.600000000000001" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
  <rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.4)"></rect>
  </g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_4yPJ2wPA6h" x="110" y="452" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_4yPJ2wPA6h"></use><defs><g id="custom_m5sXGXicsk" data-type="symbol">
  <rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.75" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
  <rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.5)"></rect>
  </g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_m5sXGXicsk" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_m5sXGXicsk"></use>
  
  </g></svg>
  [fenye]noXD[fenye]
    --end--*/
    }
    
/*
B: 同一首歌0
Q: 5, 
 */
var fTest0 = function(){
    /*--start--
    <svg width="1000" height="1415" version="1.1" viewBox="0 0 1000 1415" encoding="UTF-8" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" height="100%" width="100%" fill="#ffffff" /><defs>
<g id="diaohao_fu" transform="translate(-50,-50)"><path d="m63.90001,57.81227l-8.81873,0l0,-1.70001l3.45433,0l0,-11.7568l-3.53561,1.04459l0,-1.80243l5.46599,-1.59762l0,14.11224l3.43402,0l0,1.70001l0,0.00001l0,0.00001z" fill="#1b1b1b"/><rect height="2" width="11" y="46.85897" x="68" stroke-width="33" fill="#1b1b1b"/><rect height="2" width="11" y="51.32479" x="68" stroke-width="33" fill="#1b1b1b"/></g><g id="shuzi_c_5" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/></g><g id="xiaojiexian_weibu" transform="translate(-50,-50)"><rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/><rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#ffffff"/></g><g id="yingao_di" transform="translate(-50,-50)"><ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/></g></defs>
<text x="500" y="110" dy="30.078" text-anchor="middle" fill="#1b1b1b" style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei" >同一首歌0</text>
<use x="80" y="176" xlink:href="#diaohao_fu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120" y="176" xlink:href="#diaohao_zimu_" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="236" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="118" y="236" xlink:href="#xiaojiexian_weibu" notepos="0_1_2" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="237" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<g id="custom"><defs><g id="custom_4yPJ2wPA6h" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.600000000000001" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.4)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_4yPJ2wPA6h" x="110" y="452" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_4yPJ2wPA6h"></use><defs><g id="custom_m5sXGXicsk" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.75" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.5)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_m5sXGXicsk" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_m5sXGXicsk"></use>

</g></svg>
[fenye]
[fenye]
  [fenye]noXD[fenye]
    --end--*/
    }
  
var fTest1 = function(){
    /*--start--
    <svg width="1000" height="1415" version="1.1" viewBox="0 0 1000 1415" encoding="UTF-8" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" height="100%" width="100%" fill="#ffffff" /><defs>
<g id="diaohao_fu" transform="translate(-50,-50)"><path d="m63.90001,57.81227l-8.81873,0l0,-1.70001l3.45433,0l0,-11.7568l-3.53561,1.04459l0,-1.80243l5.46599,-1.59762l0,14.11224l3.43402,0l0,1.70001l0,0.00001l0,0.00001z" fill="#1b1b1b"/><rect height="2" width="11" y="46.85897" x="68" stroke-width="33" fill="#1b1b1b"/><rect height="2" width="11" y="51.32479" x="68" stroke-width="33" fill="#1b1b1b"/></g><g id="shuzi_c_5" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/></g><g id="shuzi_c_1" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m51.71225,56.72592c0,0.80306 0.32822,1.2029 0.98409,1.2029l1.85934,0l0,0.98408l-8.96846,0l0,-0.98408l1.74994,0c0.65642,-0.07163 0.98409,-0.43763 0.98409,-1.0935l0,-12.24893c-1.16737,0.65644 -2.26085,1.13125 -3.28105,1.42172l-0.43762,-0.76528c2.18699,-1.09351 4.04689,-2.47802 5.57743,-4.15573l1.53112,0l0,15.63882l0.00111,0l0.00001,0z"/></g><g id="xiaojiexian_weibu" transform="translate(-50,-50)"><rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/><rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#ffffff"/></g><g id="yingao_di" transform="translate(-50,-50)"><ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/></g></defs>
<text x="500" y="110" dy="30.078" text-anchor="middle" fill="#1b1b1b" style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei" >同一首歌 1</text>
<use x="80" y="176" xlink:href="#diaohao_fu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120" y="176" xlink:href="#diaohao_zimu_" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="236" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120.5" y="236" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_2" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="155.5" y="236" xlink:href="#xiaojiexian_weibu" notepos="0_1_3" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="237" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<g id="custom"><defs><g id="custom_4yPJ2wPA6h" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.600000000000001" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.4)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_4yPJ2wPA6h" x="110" y="452" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_4yPJ2wPA6h"></use><defs><g id="custom_m5sXGXicsk" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.75" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.5)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_m5sXGXicsk" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_m5sXGXicsk"></use>

</g></svg>
[fenye]
  [fenye]noXD[fenye]
    --end--*/
    }
  
var fTest3 = function(){
    /*--start--
 <svg width="1000" height="1415" version="1.1" viewBox="0 0 1000 1415" encoding="UTF-8" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" height="100%" width="100%" fill="#ffffff" /><defs>
<g id="diaohao_fu" transform="translate(-50,-50)"><path d="m63.90001,57.81227l-8.81873,0l0,-1.70001l3.45433,0l0,-11.7568l-3.53561,1.04459l0,-1.80243l5.46599,-1.59762l0,14.11224l3.43402,0l0,1.70001l0,0.00001l0,0.00001z" fill="#1b1b1b"/><rect height="2" width="11" y="46.85897" x="68" stroke-width="33" fill="#1b1b1b"/><rect height="2" width="11" y="51.32479" x="68" stroke-width="33" fill="#1b1b1b"/></g><g id="shuzi_c_5" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/></g><g id="yanyinfu" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><rect height="3.2" width="11" y="48.4" x="44.5" stroke-width="null" fill="#1b1b1b"/></g><g id="shuzi_c_1" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m51.71225,56.72592c0,0.80306 0.32822,1.2029 0.98409,1.2029l1.85934,0l0,0.98408l-8.96846,0l0,-0.98408l1.74994,0c0.65642,-0.07163 0.98409,-0.43763 0.98409,-1.0935l0,-12.24893c-1.16737,0.65644 -2.26085,1.13125 -3.28105,1.42172l-0.43762,-0.76528c2.18699,-1.09351 4.04689,-2.47802 5.57743,-4.15573l1.53112,0l0,15.63882l0.00111,0l0.00001,0z"/></g><g id="shuzi_c_2" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m44.23404,57.96309c0.29169,-0.36531 0.73117,-0.84104 1.31789,-1.42776c4.61288,-4.68482 6.66194,-7.8705 6.15051,-9.55537c-0.07361,-2.34241 -1.0262,-3.55098 -2.85551,-3.6246c-1.68486,0.14779 -2.74564,1.20857 -3.18512,3.18512l-1.09814,0c0.58504,-3.51473 2.45228,-5.34404 5.60115,-5.49184c3.07526,0.21974 4.72275,1.86723 4.9425,4.94249c0.14612,1.90516 -1.13607,3.99158 -3.84435,6.26038c-1.61124,1.46568 -2.85551,2.70996 -3.73447,3.73448l5.27211,0c1.24426,0.07362 1.93918,-0.6213 2.08697,-2.08698l0.8784,0l-0.54879,5.05236l-10.98313,0l0,-0.98827z"/></g><g id="xiaojiexian" transform="translate(-50,-50)"><rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/><rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#1b1b1b"/></g><g id="yingao_di" transform="translate(-50,-50)"><ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/></g></defs>
<text x="500" y="110" dy="30.078" text-anchor="middle" fill="#1b1b1b" style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei" >同一首歌3</text>
<use x="80" y="176" xlink:href="#diaohao_fu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120" y="176" xlink:href="#diaohao_zimu_" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="236" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120.5" y="236" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="158" y="236" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_3" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="195.5" y="236" xlink:href="#shuzi_c_2" time="1" audio="2" notepos="0_1_4" code="2" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="230.5" y="236" xlink:href="#xiaojiexian" notepos="0_1_5" time="0" audio="" code="|" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="237" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<g id="custom"><defs><g id="custom_4yPJ2wPA6h" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.600000000000001" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.4)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_4yPJ2wPA6h" x="110" y="452" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_4yPJ2wPA6h"></use><defs><g id="custom_m5sXGXicsk" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.75" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.5)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_m5sXGXicsk" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_m5sXGXicsk"></use>

</g></svg>
[fenye]
[fenye]
[fenye]
  [fenye]noXD[fenye]
    --end--*/
    }
  
var fTest2 = function(){
    /*--start--
    <svg width="1000" height="1415" version="1.1" viewBox="0 0 1000 1415" encoding="UTF-8" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" height="100%" width="100%" fill="#ffffff" /><defs>
<g id="diaohao_fu" transform="translate(-50,-50)"><path d="m63.90001,57.81227l-8.81873,0l0,-1.70001l3.45433,0l0,-11.7568l-3.53561,1.04459l0,-1.80243l5.46599,-1.59762l0,14.11224l3.43402,0l0,1.70001l0,0.00001l0,0.00001z" fill="#1b1b1b"/><rect height="2" width="11" y="46.85897" x="68" stroke-width="33" fill="#1b1b1b"/><rect height="2" width="11" y="51.32479" x="68" stroke-width="33" fill="#1b1b1b"/></g><g id="shuzi_c_5" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/></g><g id="yanyinfu" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><rect height="3.2" width="11" y="48.4" x="44.5" stroke-width="null" fill="#1b1b1b"/></g><g id="shuzi_c_1" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/><path fill="black" d="m51.71225,56.72592c0,0.80306 0.32822,1.2029 0.98409,1.2029l1.85934,0l0,0.98408l-8.96846,0l0,-0.98408l1.74994,0c0.65642,-0.07163 0.98409,-0.43763 0.98409,-1.0935l0,-12.24893c-1.16737,0.65644 -2.26085,1.13125 -3.28105,1.42172l-0.43762,-0.76528c2.18699,-1.09351 4.04689,-2.47802 5.57743,-4.15573l1.53112,0l0,15.63882l0.00111,0l0.00001,0z"/></g><g id="xiaojiexian_weibu" transform="translate(-50,-50)"><rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/><rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#ffffff"/></g><g id="yingao_di" transform="translate(-50,-50)"><ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/></g></defs>
<text x="500" y="110" dy="30.078" text-anchor="middle" fill="#1b1b1b" style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei" >同一首歌2</text>
<use x="80" y="176" xlink:href="#diaohao_fu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120" y="176" xlink:href="#diaohao_zimu_" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="236" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="120.5" y="236" xlink:href="#yanyinfu" time="1" audio="" notepos="0_1_2" code="-" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="158" y="236" xlink:href="#shuzi_c_1" time="1" audio="1" notepos="0_1_3" code="1" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="193" y="236" xlink:href="#xiaojiexian_weibu" notepos="0_1_4" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<use x="83" y="237" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
<g id="custom"><defs><g id="custom_4yPJ2wPA6h" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.600000000000001" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.4)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_4yPJ2wPA6h" x="110" y="452" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_4yPJ2wPA6h"></use><defs><g id="custom_m5sXGXicsk" data-type="symbol">
<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.75" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.5)"></rect>
</g></defs><use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_m5sXGXicsk" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_m5sXGXicsk"></use>

</g></svg>
[fenye]
[fenye]
  [fenye]noXD[fenye]
    --end--*/
    }
  
var blo0_blfHTML = function(fn2Parse){
    var a = "to_Parse:"+fn2Parse;
    var b = a.split('--start--');
    var c = b[1].split('--end--');  
    return c[0];	
}
function xdf1(re,p2){
    var arr=re.split('[fenye]'); 
    var arrLen=arr.length;
    var pageNum=-1;
    for(var i=0;i<arrLen;i++){
        var pageObj=$("#page_"+i);
        if(arr[i]!=''){
            if(pageObj.length==0){
                $(".preview .svgList").append('<div class="page" id="page_'+i+'">'+arr[i]+'</div>');
             }
             else{
                 if(arr[i]!='noXD'){
                   pageObj.html(arr[i]);
                 }
             }
             pageNum++;
         }
     }
     $(".page").each(function(index,element){
         if(index>pageNum){
             $(element).remove();
         }
     });
     if(pageNum==-1){
         $(".preview .svgList").append('<div class="page" id="page_0"></div>');
     }
     var svgWidth=$("#page_0 svg").attr('width');
     var svgHeight=$("#page_0 svg").attr('height');
     $(".svgList").css({'width':svgWidth,'height':svgHeight});
     $(".page").css({'width':svgWidth,'height':svgHeight});
     $('use[notepos]').click(function(e){
         window.frames["editFrame"].setPos($(this).attr('notepos'));        
     });
     if(p2=='editor'){
         window.frames["editFrame"].getGbInfo();
     }
     setLockCustom();

} 
//xddbg
function redraw(pNum,xdSrc){     
    var re = blo0_blfHTML(fTest);  
    xdf1(re,xdSrc);
} 
function xdShowJP(d){
    var re = blo0_blfHTML(d);  
    xdf1(re,"xdShowJP");
}
var winType;
function autoSize(){
    if(winType==1){
        $(".preview").hide();
        $(".editor").show();
        $(".editor .line").hide();
        $(".editor").height($(window).height()-65);
        $(".editor .body").height($(".editor").height());
    }
    else if(winType==2){
        $(".editor").hide();
        $(".preview").show();
        $(".preview").height($(window).height()-65);
    }else{
        $(".preview").show();
        $(".editor .line").show();
        $(".editor").show();
        var bodyHeight=$(window).height()-65;
        $(".preview").height((bodyHeight/3)*2);
        $(".editor").height(bodyHeight/3);
        $(".editor .body").height($(".editor").height()-5);
    }
    $(".mask").width($(window).width());$(".mask").height($(window).height());
    $("#filename").css('left',($(window).width()-$("#filename").width())/2+80);
}

function setView(type){$(".viewBut li").removeClass('current');$(".viewBut"+type).addClass('current');winType=type;autoSize();$("#menuSetView1").html('编码');$("#menuSetView3").html('拆分');$("#menuSetView2").html('<i>Tab</i>预览');$("#menuSetView"+type).append(' ●');hideMenu();localStorage.setItem('viewType',type);}
function showMenu(obj){
    hideMenu();
    $(obj).addClass('current');
    $(obj).parent().find("ul").fadeIn(200);
}
function hideMenu(){
    $(".menu li ul").fadeOut(200);
    $(".fileBrowsMenu").fadeOut(200);
    $(".menu li span").removeClass('current');
}
function noHideMenu(){oEvent=window.event;if(document.all){oEvent.cancelBubble=true;}else{oEvent.stopPropagation();}}
function newJP(){
    if($("#biaoti").val()==''){
        alert("【错误提示】简谱的主标题必须要填写。");return false;
    }
    var tempStr="#============================以下为描述头定义==========================\n";
    tempStr+="V: 1.0\n";
    tempStr+='B: '+$("#biaoti").val()+"\n";
    if($("#fubiaoti").val()!=''){
        tempStr+='B: '+$("#fubiaoti").val()+"\n";
    }
    if($("#zuoci").val()!=''){
        tempStr+='Z: '+$("#zuoci").val()+" 词\n";
    }
    if($("#zuoqu").val()!=''){
        tempStr+='Z: '+$("#zuoqu").val()+" 曲\n";
    }
    if($("#qitazuozhe").val()!=''){
        tempStr+='Z: '+$("#qitazuozhe").val()+"\n";
    }
    tempStr+='D: '+$("#diaoshi2").val()+$("#diaoshi1").val()+"\n";
    tempStr+='P: '+$("#paihao1").val()+"/"+$("#paihao2").val()+"\n";
    if($("#jiepai").val()!=''){
        tempStr+='J: '+$("#jiepai").val()+"\n";
    }
    tempStr+="#============================以下开始简谱主体==========================\n";
    tempStr+="Q: 1 2 3 4 | \n";
    tempStr+="C: 这是歌词 \n";$("textarea[name=customCode]").text('');initPageConfig();
    localStorage.setItem('customCode','');
    editorSetVal(tempStr);
    //redraw(-1,'newFile');
    winClose();
    setFileName('未保存');
    opernFileId=0;
}

function toClose(){
    hideMenu();
    setTimeout(function(){
        if(confirm('您确定关闭本软件吗？\n提示：当前未保存的内容可能会丢失。')){
            window.opener=null;
            window.open('','_self');
            window.close();
        }
    },200);
}
function toPng(){
    return false;
    hideMenu();
    winTip("导出PNG图片","PNG图片生成中，请稍等...");
    if(window.canvg){
        setTimeout(function(){createPng();},300);
    }else{
        $.getScript('/Public/js/canvg/rgbcolor.js',function(){
            $.getScript('/Public/js/canvg/canvg.js',
            function(){
                setTimeout(function(){
                    createPng();
                },300);
            });
        });
    }
}
var pngHtml;
function createPng(){
    pngHtml='';
    $(".page").each(function(index,element){
        var svgHtml=$(element).html();
        var can=document.createElement("canvas");
        canvg(can,svgHtml,{
            renderCallback:function(){
                var datauri=can.toDataURL('image/png');
                pngHtml+='<img style="border:1px #ccc solid; width:800px; height:1132px; " src="'+datauri+'">';
            }
        });
    });
    pngHtml='<div style="text-align:center;"><div style="padding:10px 0 20px 0;">以下为PNG格式的图片，您可以在图片上按鼠标右键，然后选择“图片另存为...”将图片保存到您的电脑中。</div>'+pngHtml+'</div>';
    var pForm=$("#postForm")[0];
    pForm.action='/zhipu-toPng';
    pForm.method='POST';
    pForm.target="_blank";
    $("#postContent").val(pngHtml);
    pForm.submit();winClose();
}
function toSvg(){showWin('导出SVG格式图片','zhipu-toSvg-num-'+$(".page").length);}
function downSvg(num){var svgHtml=$(".page").eq(num).html();var pForm=$("#postForm")[0];pForm.action='/zhipu-toSvg';pForm.method='POST';pForm.target="postwin";$("#postContent").val(svgHtml);pForm.submit();}
function updateUserInfo(){$.post('/Zhipu-userInfo',null,function(re){winClose();$(".userInfo").html(re);});}
function toSave(){if(opernFileId>0){saveFile(opernFileId);}else{showWin('保存','Zhipu-fileBrowsing?type=save');}}
function tip(strs){$("#tip").html(strs);$("#tip").css('left',($(window).width()-$("#tip").width())/2);$("#tip").css('top',($(window).height()-$("#tip").height())/2);$("#tip").fadeIn(500,function(){setTimeout(function(){$("#tip").fadeOut(500);},500);});}
function editorSetVal(code_){
    window.frames["editFrame"].document.getElementById("editor_text").value=code_;
    window.frames["editFrame"].formatJP();
    window.frames["editFrame"].autoSize();
    $(".preview").scrollTop(0);
    window.frames["editFrame"].updateJPcode();
}
function refreshFolderList(){$(".newFolderDiv").hide();$(".reFolderDiv").hide();$(".name:input").val('');$.get('/Zhipu-folderList',null,function(re){$(".fileCateList .list").html(re);selectFolder(currentFolderId);$(".fileCateList .list ul li span").bind('contextmenu',function(event){if(document.all){window.event.returnValue=false;}else{event.preventDefault();}
$(".folderMenu").css({'top':event.clientY-($('.win').css('top').replace(/px/g,"")*1),'left':event.clientX-($('.win').css('left').replace(/px/g,"")*1)});$(".folderMenu").fadeIn(200);$(".fileMenu").fadeOut(200);}).bind('mousedown',function(event){if(event.button==2){noHideMenu();}selectFolder($(this).parent().attr('data-id'));});});}
var currentFolderId=0;function selectFolder(ids){$(".fileCateList .current").removeClass('current');$("#folder_"+ids+' .name').addClass('current');currentFolderId=ids;refreshFileList();}
function folderReName(){hideMenu();$(".reFolderDiv .id").val(currentFolderId);$(".reFolderDiv .name").val($("#folder_"+currentFolderId+" .name").text());$(".reFolderDiv").show();$(".reFolderDiv .name").focus().select();}
function folderDel(){hideMenu();setTimeout(function(){if(confirm("您确认要删除此文件夹吗？\n此操作将同时删除此文件夹里的内容，并且不可恢复。")==true){$("#postwin").attr('src','/zhipu-folderDel?id='+currentFolderId);}},100);}
function folderOrder(type){$("#postwin").attr('src','/zhipu-folderOrder?type='+type+'&id='+currentFolderId);}
function refreshFileList(){$(".folderDiv").hide();$.get('/Zhipu-fileList?fid='+currentFolderId,null,function(re){$(".fileList .list").html(re);$(".fileList .list ul li .select").bind('contextmenu',function(event){if(document.all){window.event.returnValue=false;}else{event.preventDefault();}
$(".fileMenu").css({'top':event.clientY-($('.win').css('top').replace(/px/g,"")*1),'left':event.clientX-($('.win').css('left').replace(/px/g,"")*1)});$(".fileMenu").fadeIn(200);$(".folderMenu").fadeOut(200);}).bind('mousedown',function(event){if(event.button!=2){hideMenu();}
noHideMenu();selectFile($(this).parent().attr('data-id'));}).dblclick(function(){if($("#saveName").length>0){saveFile();}else{openFile();}});});}
var currentFileId=0;function selectFile(ids){$(".fileList .current").removeClass('current');$("#file_"+ids+' .name').addClass('current');currentFileId=ids;$(".fileInfo .filename").html($("#file_"+ids+' .name').text());$("#saveName").val($("#file_"+ids+' .name').text());}
function cancelSelectFile(){currentFileId=0;$(".fileList .current").removeClass('current');$(".fileInfo .filename").html('');}
function fileDel(){hideMenu();setTimeout(function(){if(confirm("您确认要删除此文件吗？文件删除后不可恢复。")==true){$("#postwin").attr('src','/zhipu-fileDel?id='+currentFileId);}},100);}
function fileReName(){hideMenu();var name_=$("#file_"+currentFileId+" .name").text();$(".reFileDiv").show();$(".reFileDiv .id").val(currentFileId);$(".reFileDiv .name").val(name_);$(".reFileDiv .name").focus().select();}
function fileMove(){hideMenu();$(".fileMoveDiv").show();$(".fileMoveDiv .id").val(currentFileId);$(".fileMoveDiv .fid").html("");$(".fileCateList .list ul li").each(function(index,element){$(".fileMoveDiv .fid").append("<option value='"+$(element).attr('data-id')+"'>"+$(element).find(".name").text()+"</option>");});}
var opernFileId=0;function openFile(){if(currentFileId==0){alert('您没有选择任何文件');return false;}
winClose();editorSetVal('');winTip("载入文件","文件正在载入中，请稍等...");$.getJSON("/zhipu-getFile?id="+currentFileId,function(data){opernFileId=currentFileId;setFileName(data.name);$("textarea[name=customCode]").text(data.custom_code);localStorage.setItem('customCode',data.custom_code);$("textarea[name=pageConfig]").text(data.page_config);localStorage.setItem('pageConfig',data.page_config);$('#lockCustom').prop("checked",true);editorSetVal(data.code);winClose();});}
function saveFile(ids){if($("#saveName").length>0){$("#saveName")[0].disabled=true;}
var jpcode_=window.frames["editFrame"].document.getElementById("editor_text").value;jpcode_=jpcode_.replace(/\n/g,"&hh&");var savename_=$("#saveName").val();if(savename_==''){alert('文件名不能为空');return false;}
customCode=$("textarea[name=customCode]").text();pageConfig=$("textarea[name=pageConfig]").text();$.post('/Zhipu-saveFile',{code:jpcode_,savename:savename_,fid:currentFolderId,id:ids,customCode:customCode,pageConfig:pageConfig},function(re){arr=re.split('|');if(arr[0]=="cover"){if(confirm("当前文件夹已存在相同文件名的文件，需要覆盖此文件吗？")==true){saveFile(arr[1]);return false;}else{$("#saveName")[0].disabled=false;}}else if(arr[0]=='error'){alert(arr[1]);}else{saveSuccess(arr[0],arr[1]);}});}
function saveSuccess(id,name){opernFileId=id;setFileName(name);if($("#playBut").length==0){winClose();}
hideMenu();tip("文件保存成功！");}
function setFileName(names){$("#filename").html(names+'.jps');$("#filename").css('left',($(window).width()-$("#filename").width())/2);}
var exampleFileId=0;function openExampleFile(){if(exampleFileId==0){alert('您没有选择任何文件');return false;}
winClose();editorSetVal('');winTip("载入文件","文件正在载入中，请稍等...");$.getJSON("/zhipu-getExampleFile?id="+exampleFileId,function(data){opernFileId=0;$("textarea[name=customCode]").text(data.custom_code);localStorage.setItem('customCode',data.custom_code);$("textarea[name=pageConfig]").text(data.page_config);localStorage.setItem('pageConfig',data.page_config);$('#lockCustom').prop("checked",true);setFileName(data.name);editorSetVal(data.code);winClose();});}
var win_drag_state=0;
function show_drag(){
    var showTable=$(".win");
    var handle=$(".win .titleBar");
    handle.find("span").css("cursor","move");
    handle.bind("mousedown",function(event){
        win_drag_state=1;
        var showTop=parseInt(showTable.css('top'));
        var showLeft=parseInt(showTable.css('left'));
        var mouse_x=event.pageX;
        var mouse_y=event.pageY;
        $(document).bind("mousemove",function(ev){
            if(win_drag_state==1){
                var _x=ev.pageX-mouse_x;
                var _y=ev.pageY-mouse_y;
                var nowLeft=(showLeft+_x)+"px";
                var nowTop=(showTop+_y)+"px";
                showTable.css({top:nowTop,left:nowLeft});
            }
        });
    });
    $(document).bind("mouseup",function(){win_drag_state=0;});
}
function showWin(title,url,width,height){
    if($("#playBut").length>0){
        stopPlay();
    }
    hideMenu();
    $(".win .titleBar span").html(title);
    $(".win .body").html("<div class=\"winLoad\">xd加载中，请稍等...");
    autoWinSize();
    $(".mask").fadeIn(300);
    $(".win").fadeIn(300);
    $.get(url,null,function(data){
        if(width){
            data='<div style="width:'+width+'px; height:'+height+'px; overflow:auto; margin-right:1px;">'+data+'</div>'    
        }
        $(".win .body").html(data);autoWinSize();
    });
}
function autoWinSize(){var left=($(window).width()-$(".win").width())/2;var Top=($(window).height()-$(".win").height())/2;$(".win").css({'left':left,'top':Top});}
function winClose(){
    if($("#playBut").length>0){
        stopPlay();
    }
    $(".win").fadeOut(300);
    $(".mask").fadeOut(300);
}
function winTip(title,str){
    $(".win .body").html("<div class=\"winLoad\">"+str+"");
    $(".win .titleBar span").html(title);
    autoWinSize();$(".mask").fadeIn(300);
    $(".win").fadeIn(300);
}
$(document).ready(function(){
    show_drag();
});
var isfullscreen=0;
function toFullscreen(){
    hideMenu();
    setTimeout(function(){
        alert("提示：请按键盘上的“F11”键，即可进入或退出全屏模式。");
    },300);
    return false;
    if(isfullscreen==0){
        fullscreen();
        isfullscreen=1;
        $("#menuFullscreen").html("<i>F11</i>退出全屏");
    }else{
        qiutFullscreen();
        isfullscreen=0;
        $("#menuFullscreen").html("<i>F11</i>全屏");
    }
}
function fullscreen(){
    var docElm=document.documentElement;
    if(docElm.requestFullscreen){
        docElm.requestFullscreen();
    }else if(docElm.mozRequestFullScreen){
        docElm.mozRequestFullScreen();
    }else if(docElm.webkitRequestFullScreen){
        docElm.webkitRequestFullScreen();
    }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }else{
        alert("很抱歉，您的浏览器不支持自动全屏，请按快捷键“F11”进入全屏")
    }
}
function qiutFullscreen(){
    if(document.exitFullscreen){document.exitFullscreen();}
    else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}
    else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen();}
    else if(document.msExitFullscreen){document.msExitFullscreen();}
}
var cfDefault=new Array();
cfDefault['page']='A4';
cfDefault['margin_top']='80';
cfDefault['margin_bottom']='80';
cfDefault['margin_left']='80';
cfDefault['margin_right']='80';
cfDefault['biaoti_font']='Microsoft YaHei';
cfDefault['shuzi_font']='b';
cfDefault['geci_font']='Microsoft YaHei';
cfDefault['height_quci']='13';
cfDefault['height_cici']='10';
cfDefault['height_ciqu']='40';
cfDefault['height_shengbu']='0';
cfDefault['biaoti_size']='36';
cfDefault['fubiaoti_size']='20';
cfDefault['geci_size']='18';
cfDefault['body_margin_top']='40';
cfDefault['lianyinxian_type']='0';
var TCF=new Object();
function savePageConfig(){
    var tempJson=JSON.stringify(TCF);
    $("textarea[name=pageConfig]").text(tempJson);localStorage.setItem('pageConfig',tempJson);
    //redraw(-1,'savePageConfig');
    winClose();
}
function initPageConfig(){TCF.page=cfDefault['page'];TCF.margin_top=cfDefault['margin_top'];TCF.margin_bottom=cfDefault['margin_bottom'];TCF.margin_left=cfDefault['margin_left'];TCF.margin_right=cfDefault['margin_right'];TCF.biaoti_font=cfDefault['biaoti_font'];TCF.shuzi_font=cfDefault['shuzi_font'];TCF.geci_font=cfDefault['geci_font'];TCF.height_quci=cfDefault['height_quci'];TCF.height_cici=cfDefault['height_cici'];TCF.height_ciqu=cfDefault['height_ciqu'];TCF.height_shengbu=cfDefault['height_shengbu'];TCF.biaoti_size=cfDefault['biaoti_size'];TCF.fubiaoti_size=cfDefault['fubiaoti_size'];TCF.geci_size=cfDefault['geci_size'];TCF.body_margin_top=cfDefault['body_margin_top'];TCF.lianyinxian_type=cfDefault['lianyinxian_type'];savePageConfig();}
function pageConfigInit(){var jsonStr=$("textarea[name=pageConfig]").text();if(jsonStr!=''){var tempTCF=JSON.parse(jsonStr);if(tempTCF){TCF=tempTCF;}}
if(!TCF.page){TCF.page=cfDefault['page'];}
if(!TCF.margin_top){TCF.margin_top=cfDefault['margin_top'];}
if(!TCF.margin_bottom){TCF.margin_bottom=cfDefault['margin_bottom'];}
if(!TCF.margin_left){TCF.margin_left=cfDefault['margin_left'];}
if(!TCF.margin_right){TCF.margin_right=cfDefault['margin_right'];}
if(!TCF.biaoti_font){TCF.biaoti_font=cfDefault['biaoti_font'];}
if(!TCF.shuzi_font){TCF.shuzi_font=cfDefault['shuzi_font'];}
if(!TCF.geci_font){TCF.geci_font=cfDefault['geci_font'];}
if(!TCF.height_quci){TCF.height_quci=cfDefault['height_quci'];}
if(!TCF.height_cici){TCF.height_cici=cfDefault['height_cici'];}
if(!TCF.height_ciqu){TCF.height_ciqu=cfDefault['height_ciqu'];}
if(!TCF.height_shengbu){TCF.height_shengbu=cfDefault['height_shengbu'];}
if(!TCF.biaoti_size){TCF.biaoti_size=cfDefault['biaoti_size'];}
if(!TCF.fubiaoti_size){TCF.fubiaoti_size=cfDefault['fubiaoti_size'];}
if(!TCF.geci_size){TCF.geci_size=cfDefault['geci_size'];}
if(!TCF.body_margin_top){TCF.body_margin_top=cfDefault['body_margin_top'];}
if(!TCF.lianyinxian_type){TCF.lianyinxian_type=cfDefault['lianyinxian_type'];}
$("#cf_page").val(TCF.page);$("#cf_margin_top").val(TCF.margin_top);$("#cf_margin_bottom").val(TCF.margin_bottom);$("#cf_margin_left").val(TCF.margin_left);$("#cf_margin_right").val(TCF.margin_right);$("#cf_biaoti_font").val(TCF.biaoti_font);$("#cf_shuzi_font").val(TCF.shuzi_font);$("#cf_geci_font").val(TCF.geci_font);$("#cf_height_quci").val(TCF.height_quci);$("#cf_height_cici").val(TCF.height_cici);$("#cf_height_ciqu").val(TCF.height_ciqu);$("#cf_height_shengbu").val(TCF.height_shengbu);$("#cf_biaoti_size").val(TCF.biaoti_size);$("#cf_fubiaoti_size").val(TCF.fubiaoti_size);$("#cf_geci_size").val(TCF.geci_size);$("#cf_body_margin_top").val(TCF.body_margin_top);$("#cf_lianyinxian_type").val(TCF.lianyinxian_type);if(TCF.heights){for(var p in TCF.heights){var pNum=TCF.heights[p][0];$("#cf_height_page").append('<option value="'+pNum+'">第'+pNum+'页</option>');}}}
function setHeightPage(){var pNum=$("#cf_height_page").val();if(pNum>-1){var temp=TCF.heights['a'+pNum];$("#cf_height_quci").val(temp[1]);$("#cf_height_cici").val(temp[2]);$("#cf_height_ciqu").val(temp[3]);$("#cf_height_shengbu").val(temp[4]);}else{$("#cf_height_quci").val(TCF.height_quci);$("#cf_height_cici").val(TCF.height_cici);$("#cf_height_ciqu").val(TCF.height_ciqu);$("#cf_height_shengbu").val(TCF.height_shengbu);}}
var tempHeights=new Array();function setTempHeight(){var cfPageNum=$("#cf_height_page").val();var t1=$("#cf_height_quci").val();var t2=$("#cf_height_cici").val();var t3=$("#cf_height_ciqu").val();var t4=$("#cf_height_shengbu").val();if(cfPageNum>-1){if(!TCF.heights){TCF.heights=Object();}
TCF.heights['a'+cfPageNum]=[cfPageNum,t1,t2,t3,t4];}else{TCF.height_quci=t1;TCF.height_cici=t2;TCF.height_ciqu=t3;TCF.height_shengbu=t4;}}
var cf_height_pages=new Object;function add_cf_height_page(){var pageNum=prompt('请输入页码：');if(pageNum===null){return false;}
var r=/^[0-9]*[1-9][0-9]*$/;　　
if(r.test(pageNum)==false){alert("页码必须是一个整数。");add_cf_height_page();return false;}
pageNum=pageNum*1;if($('#cf_height_page option[value='+pageNum+']').length>0){alert("对不起，已经存在此页面的针对页。")}else{$("#cf_height_page").append("<option value='"+pageNum+"'>第"+pageNum+"页</option>");}
$('#cf_height_page option').sort(function(a,b){var aText=$(a).attr('value')*1;var bText=$(b).attr('value')*1;if(aText>bText)return 1;if(aText<bText)return-1;return 0;}).appendTo('#cf_height_page');$("#cf_height_page").find("option[value="+pageNum+"]").attr("selected",true);setTempHeight();}
function del_cf_height_page(){var pNum=$("#cf_height_page").val();if(pNum>-1){$("#cf_height_page").find("option[value="+pNum+"]").remove();delete TCF.heights['a'+pNum];setHeightPage();}else{alert("不能移除“所有页”的配置。")}}
function notNum(str){return isNaN(parseInt(str,10));}
function setJpFormat(){
    if($("#jpFormat").prop("checked")){
        localStorage.setItem('autoJpFormat',"y");
    }
    else{
        localStorage.setItem('autoJpFormat',"n");
    }
}
var clickCustom=0;var clickSelect=0;
var cSelectState=0
$(document).ready(function(){
    $(document).bind("mousemove",moveElement);
    $(document).bind("mouseup",
        function(){
            custom_drag_state=0;
            if(clickCustom==0&&clickSelect==0){
                $("#custom defs g rect[mask]").attr({'stroke-width':"0"});
                $("#customAttribute").hide();
                cSelectState=0;
            }
            if(clickSelect==1){clickSelect=0;}
    });
    $("#customAttribute").bind("mousedown",
        function(){
            clickCustom=1;
            $("#customAttribute").bind("mouseup",function(){
                setTimeout(function(){clickCustom=0;},100);
            });
        }
    );
    $(".preview").scroll(function(){updateCustomAttributePos();});
});
    
function customShortcuts(keyCode){
    if(cSelectState==0){return true;}
    if(keyCode==46){removeCustom();}
    if(keyCode==37){lightMove('x',-1);}
    if(keyCode==38){lightMove('y',-1);}
    if(keyCode==39){lightMove('x',1);}
    if(keyCode==40){lightMove('y',1);}
    return false;
}
var selectedElement=0;
var currentX=0;
var currentY=0;
var scaleX=1;
var scaleY=1;
var custom_drag_state=0;
function addText(text,family,size,color,weight){
    var text=$("#custom_text").val();
    var family=$("#custom_family").val();
    var size=$("#custom_size").val();
    var color=$("#custom_color").val();
    var weight=$("#custom_weight").val();
    if(text==''){alert("请输入文本");return false;}
    custom_code='<g id="customID" data-type="text"><rect mask="true" height="10" width="10" x="-5" y="-5" stroke-width="0" fill="#ffff00"/><text x="0" y="0" fill="'+color+'" font-family="'+family+'" font-size="'+size+'" style="font-weight:'+weight+';">'+text+'</text></g>';
    addToSvg('text',custom_code);
    winClose();
}
var lastAddSymbol=0;
function addSymbol(num){
    hideMenu();
    if(num==0){alert('您本次运行后还未插入过自定义符号。');return false;}
    lastAddSymbol=num;
    var getUrl='/Public/symbol/'+num+'.txt';
    $.get(getUrl,function(re){
        addToSvg('path',re);
        winClose();
    });
}

function addToSvg(type,svgCode){
    $("#addCustomTip").css('left',($(window).width()-$("#addCustomTip").width())/2);
    $("#addCustomTip").fadeIn(200);
    $("svg").click(function(e){
        svgCode='<defs>'+svgCode+'</defs><use onmousedown="selectElement(this)"  style="cursor:move;" id="use_customID" x="{x}" y="{y}" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#customID"></use>';
        getScale(svgCode);
        var clickX=(e.pageX-$(this).offset().left)/scaleX-5;
        var clickY=(e.pageY-$(this).offset().top)/scaleY-5;
        
        var customID=randomString(10);
        svgCode=svgCode.replace('{x}',clickX);
        svgCode=svgCode.replace('{y}',clickY);svgCode=svgCode.replace(/customID/g,customID);
        
        xdl("xd2Svg: " + customID + " ; xy = " + clickX + "," + clickY);
        $(this).find('#custom')[0].appendChild(parseSVG(svgCode));
        if(type=='text'){
            var textWidth=$("#"+customID).find("text")[0].getComputedTextLength();
            var textHeight=$("#"+customID).find("text").attr('font-size')*1;

            $("#"+customID).find("rect").attr({width:textWidth+10,height:textHeight+10});
            $("#"+customID).find("text").attr('dy',textHeight*0.88);
        }
        var maskObj=$("#"+customID).find("rect[mask]");
        if(lockCustomState==1){
            $("#use_"+customID).css('cursor','default');
            maskObj.attr({x:-5555,y:-5555});
        }
        maskObj.attr({'data-width':maskObj.attr('width'),
                       'data-height':maskObj.attr('height'),
                       'opacity':0.8});
        $("#addCustomTip").fadeOut(200);$('#lockCustom').prop("checked",false);
        setLockCustom();
        updateCustomCode();
        $("svg").unbind("click");
    });
}

function parseSVG(s){
    var div=document.createElementNS('http://www.w3.org/1999/xhtml','div');
    div.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
    var frag=document.createDocumentFragment();
    while(div.firstChild.firstChild){
        frag.appendChild(div.firstChild.firstChild);
    }
    return frag;
}
function selectElement(obj){  
    selectedElement=obj;
    if(lockCustomState==0){
        custom_drag_state=1;
        currentX=window.event.clientX;
        currentY=window.event.clientY;
        var transform=$(selectedElement).attr('transform');
        if(transform){getScale(transform);}
        var customID=$(selectedElement).attr('xlink:href');
        $("#custom defs g rect[mask]").attr({'stroke-width':"0"});
        $(customID+" rect[mask]").attr({'stroke-width':"1",stroke:"#ff0000",'stroke-dasharray':"5,5"});
        showCustomAttributeDiv();
    }
    clickCustom=1;
    $(selectedElement).bind("mouseup",function(){setTimeout(function(){clickCustom=0;},100);});
}
function moveElement(){
    if(custom_drag_state==1){
        var s0bj=$(selectedElement);
        var dx=(window.event.clientX-currentX)/scaleX;
        var dy=(window.event.clientY-currentY)/scaleY;
        var newX=s0bj.attr('x')*1+dx;
        var newY=s0bj.attr('y')*1+dy;
        s0bj.attr('x',newX);
        s0bj.attr('y',newY);
        currentX=window.event.clientX;
        currentY=window.event.clientY;
        updateCustomAttributePos();
        updateCustomCode();
    }
}
function getScale(transform){
    var scaleStart=transform.indexOf('scale');
    if(transform.indexOf('scale')>-1){
        var scale=transform.substring(scaleStart+6,transform.length);
        scale=scale.substring(0,scale.indexOf(')'));
        if(scale.indexOf(',')>-1){
            var temArr=scale.split(',');   
            scaleX=temArr[0];scaleY=temArr[1];
        }else{
            scaleX=scale;scaleY=scale;
        }
    }else{
        scaleX=1;scaleY=1;
    }
}
function randomString(len){
    len=len||32;
    var $chars='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos=$chars.length;
    var pwd='';
    for(i=0;i<len;i++){
        pwd+=$chars.charAt(Math.floor(Math.random()*maxPos));
    }
    return'custom_'+pwd;
}
var lockCustomState=1;
function setLockCustom(){
    if($("#lockCustom").prop("checked")){
        $("#custom use").css('cursor','default');
        $("#custom defs g rect[mask]").attr({x:-5555,y:-5555});
        $("#custom defs g rect[mask]").attr({'stroke-width':"0"});
        lockCustomState=1;
    }else{
        $("#custom use").css('cursor','move');
        $("#custom defs g rect[mask]").attr({x:-5,y:-5});
        lockCustomState=0;
    }
}
function updateCustomCode(){
    var customCode='';
    $('.page').each(function(i){
        var pageHtml_=$(this).html();
        var temArr=pageHtml_.split('<g id="custom">');
        var temp=temArr[1].replace("</g></svg>","");
        customCode=customCode+temp+'[fenye]';
    });
    $("textarea[name=customCode]").text(customCode);
    localStorage.setItem('customCode',customCode);
}
function getSelectedObj(){return $($(selectedElement).attr('xlink:href'));}
function showCustomAttributeDiv(){
    cSelectState=1;
    var customObj=getSelectedObj();
    var type=customObj.attr('data-type');
    $(".attributes").hide();
    $(".attributes_"+type).show();
    if(type=='text'){
        $("#custom_text_size").val(customObj.find("text").attr('font-size'));
        $("#custom_text_family").val(customObj.find("text").attr('font-family'));
        $("#custom_text_color").val(customObj.find("text").attr('fill'));
        $("#custom_text_weight").val(customObj.find("text").css('font-weight'));
        $("#custom_text_text").val(customObj.find("text").text());
    }
    if(type=='symbol'){
        $("#custom_symbol_fill").val(customObj.find("[fill]:eq(1)").attr('fill'));
        var scaleX=1;
        var scaleY=1;
        var transform=customObj.find("[transform]").attr('transform');
        if(transform){
            var scaleStart=transform.indexOf('scale');
            if(transform.indexOf('scale')>-1){
                var scale=transform.substring(scaleStart+6,transform.length);
                scale=scale.substring(0,scale.indexOf(')'));
                if(scale.indexOf(',')>-1){
                    var temArr=scale.split(',');
                    scaleX=temArr[0];
                    scaleY=temArr[1];
                }else{
                    scaleX=scale;
                    scaleY=scale;
                }
            }
        }
        $("#custom_symbol_width").val(scaleX);
        $("#custom_symbol_height").val(scaleY);
    }
    updateCustomAttributePos();
    $("#customAttribute").show();
}
function updateCustomAttributePos(){
    if(cSelectState==1){
        var customObj=getSelectedObj();
        var svgObj_=customObj.parents("svg");
        var top_=svgObj_.offset().top+$(selectedElement).attr('y')*1-7;
        var left_=svgObj_.offset().left+$(selectedElement).attr('x')*1-($("#customAttribute").width()+20);$("#customAttribute").css({top:top_,left:left_});
    }
}
function updateTextSize(){var customObj=getSelectedObj();var textWidth=customObj.find("text")[0].getComputedTextLength();var textHeight=customObj.find("text").attr('font-size')*1;customObj.find("rect").attr({width:textWidth+10,height:textHeight+10});customObj.find("text").attr('dy',textHeight*0.88);}

function lightMove(type,num){
    var customObj=$(selectedElement);
    customObj.attr(type,customObj.attr(type)*1+num);
    updateCustomAttributePos();
    //updateCustomCode();
}

function removeCustom(){
    if(cSelectState==0){return false;}
    var customObj=getSelectedObj();
    $(selectedElement).remove();
    customObj.parent().remove();
    $("#customAttribute").hide();
    updateCustomCode();
    cSelectState=0;
}

$(document).ready(function(){
    $("#customAttribute select").bind("click",function(){
        clickSelect=1;
    });
    $("#customAttribute select").bind("change",function(){
            var customObj=getSelectedObj();
            var val=this.value;
            var selectId=$(this).attr('id');
            switch(selectId){
                case'custom_text_size':customObj.find("text").attr('font-size',val);break;
                case'custom_text_family':customObj.find("text").attr('font-family',val);break;
                case'custom_text_color':customObj.find("text").attr('fill',val);break;
                case'custom_text_weight':customObj.find("text").css('font-weight',val);break;
                case'custom_symbol_fill':customObj.children('[mask!=true]').attr('fill',val);break;
            }
            if(selectId.indexOf('_text_')>-1){updateTextSize();}
            setTimeout(function(){clickSelect=0;},200);
            updateCustomCode();
    });
    $("#custom_text_text").bind("input",function(){
            var customObj=getSelectedObj();
            var val=this.value;customObj.find("text").text(val);
            updateTextSize();
            updateCustomCode();
    });
    $("#custom_symbol_width,#custom_symbol_height").bind("input",function(){
            var customObj=getSelectedObj();
            var widthR=$("#custom_symbol_width").val();
            var heightR=$("#custom_symbol_height").val();
            customObj.children('[mask!=true]').attr('transform','scale('+widthR+','+heightR+')');
            var maskObj=customObj.children('[mask=true]');
            var newWidth=maskObj.attr('data-width')*widthR-((widthR-1)*10);
            var newHeight=maskObj.attr('data-height')*heightR-((heightR-1)*10);
            maskObj.attr({width:newWidth,height:newHeight});
            updateCustomCode();
    });
});
            
function nobr(e){var et=e||window.event;var keycode=et.charCode||et.keyCode;if(keycode==13){if(window.event){window.event.returnValue=false;}else{e.preventDefault();}}}function thisMovie(movieName){return document[movieName];var isIE=navigator.appName.indexOf("Microsoft")!=-1;return(isIE)?window[movieName]:document[movieName];}
var countTime=0,currentPlay=0,playInterval;var plays=new Array();var xunhuan=new Array();var playState=0;function toPlay(){if(playState!=1){var jpcode=window.frames["editFrame"].document.getElementById("editor_text").value;if(jpcode.indexOf('Q2')>-1||jpcode.indexOf('{bz')>-1||jpcode.indexOf('{dsb')>-1){alert("不很抱歉，程序目前不支持包含多声部的简谱试听。");return false;}
playAll();playState=1;$("#playBut").val('暂停');$("#speed")[0].disabled=true;$("#adjust")[0].disabled=true;$("#hulvFanfu")[0].disabled=true;}else{pausePlay();playState=2;$("#playBut").val('播放');}}
function stopPlay(){countTime=0;currentPlay=0;plays=[];againState=[];fanfuNum=1;datiaoyueNum=1;clearInterval(playInterval);playState=0;$("#playBut").val('播放');$("#speed")[0].disabled=false;$("#adjust")[0].disabled=false;$("#hulvFanfu")[0].disabled=false;$("#playerLine").hide();}
function pausePlay(){clearInterval(playInterval);}
var topPY,leftPY,Pindex;var fanfuNum=1,datiaoyueNum=1,zIndex,lastHS=0,tyNum=0,lastTy=0;var tiaofangziWeiJieShu=['',''];function playAll(){if(plays.length==0){zIndex=0;firstKuohu=true;topPY=55-$(".preview").scrollTop()+10;leftPY=$("#page_0").offset().left;$("svg use[time]").each(function(index,element){var time=Math.round($(element).attr('time')*$("#speed").val()*$("#adjust").val());nextObj=$("svg use[time]:eq("+(index+1)+")");gotos=new Array;if(nextObj.attr('code')){if(nextObj.attr('code').indexOf('&ykh')!=-1&&firstKuohu==true){zIndex=index+2;firstKuohu=false;}
if(nextObj.attr('code').indexOf("|y")!=-1||nextObj.attr('code').indexOf("|l")!=-1){gotos.push(['fanfu',zIndex,'']);}
if(nextObj.attr('code').indexOf("|z")!=-1||nextObj.attr('code').indexOf("|l")!=-1){zIndex=index+2;}
if(nextObj.attr('code').indexOf("&hs")!=-1){lastHS=index+2;}
if(nextObj.attr('code').indexOf("&ds")!=-1){gotos.push(['dafanfu',lastHS,'']);}
if(nextObj.attr('code').indexOf("]")!=-1){if(nextObj.attr('code').indexOf("]/")!=-1){tiaofangziWeiJieShu=[lastFangZiStart,lastFangZiCode];}else{plays[lastFangZiStart][4].push(['tiaofangzi',index+1,lastFangZiCode]);}}
if(nextObj.attr('code').indexOf("[")!=-1){lastFangZiStart=index+1;lastFangZiCode=$("svg use[time]:eq("+(index+1)+")").attr('code');if(tiaofangziWeiJieShu[0]!==''){plays[tiaofangziWeiJieShu[0]][4].push(['tiaofangzi',index+1,tiaofangziWeiJieShu[1]]);tiaofangziWeiJieShu=['',''];}}
next2Obj=$("svg use[time]:eq("+(index+2)+")");if(next2Obj.length==0){if(tiaofangziWeiJieShu[0]!==''){plays[tiaofangziWeiJieShu[0]][4].push(['tiaofangzi',index+1,tiaofangziWeiJieShu[1]]);tiaofangziWeiJieShu=['',''];}}
if(nextObj.attr('code').indexOf("&ty")!=-1){tyNum++;if(tyNum==2){plays[lastTy][4].push(['datiaoyue',index+1,'']);tyNum=0;}else{lastTy=index;}}
if(nextObj.attr('code').indexOf("&dc")!=-1){gotos.push(['dc',0,'']);}
if(nextObj.attr('code').indexOf("&fine")!=-1){gotos.push(['fine','','']);}}
plays[index]=[time,$(element).attr('audio'),$(element).offset().top-topPY,$(element).offset().left-leftPY,gotos];$(element).attr('data-pIndex',index);$(element).click(function(e){if(playState!=0){currentPlay=$(this).attr('data-pIndex')*1;$("#playerLine").css({'margin-top':plays[index][2]-4,'margin-left':plays[index][3]-4,'display':'block'});}});});}
playInterval=setTimeout(playIntervalFun,10);}
var againState=new Array();function playIntervalFun(){if(plays.hasOwnProperty(currentPlay)){var note=plays[currentPlay];if(note[1]!=''){if($("#playAutoRoll").attr("checked")){if(($(".preview").scrollTop()+$(".preview").height()-55)<note[2]+20||$(".preview").scrollTop()>note[2]-20){$(".preview").animate({'scrollTop':note[2]-50},1000);}}
thisMovie("Fplay").playAge(note[1]);$("#playerLine").css({'margin-top':note[2]-4,'margin-left':note[3]-4,'display':'block'});}
if(note[4].length>0&&!$("#hulvFanfu").attr("checked")){for(var i=0;i<note[4].length;i++){if(note[4][i][0]!==''){type=note[4][i][0];toIndex=note[4][i][1];qita=note[4][i][2];if(type=='fanfu'){if(!againState[currentPlay]){againState[currentPlay]=true;currentPlay=toIndex-1;fanfuNum++;break;}else if(againState[currentPlay]==true){fanfuNum=1;}}
if(type=='tiaofangzi'){if(toIndex!==''){if(qita.indexOf(fanfuNum)==-1){jumpObj=plays[toIndex-1];if(jumpObj[4].length>0){for(var x=0;x<note[4].length;x++){if(jumpObj[4][x][1]!==''){if(jumpObj[4][x][2].indexOf(fanfuNum)==-1&&jumpObj[4][x][2].indexOf(":|")!=-1){currentPlay=jumpObj[4][x][1];}else{currentPlay=toIndex;}}else{currentPlay=toIndex;}}}else{currentPlay=toIndex;}
break;}}}
if(type=='dafanfu'){if(!againState[currentPlay]){againState=[];againState[currentPlay]=true;currentPlay=toIndex-1;fanfuNum=1;datiaoyueNum++;break;}}
if(type=='datiaoyue'){if(datiaoyueNum>1){currentPlay=toIndex-1;break;}}
if(type=='dc'){if(!againState[currentPlay]){againState=[];againState[currentPlay]=true;currentPlay=toIndex-1;fanfuNum=1;datiaoyueNum++;break;}}
if(type=='fine'){if(datiaoyueNum>1){setTimeout(function(){stopPlay();},1000);return false;}}}}}
currentPlay++;currentObj=$("svg use[time]:eq("+(currentPlay-1)+")");if(currentObj.length>0){currentCode=currentObj.attr('code');if(currentCode.indexOf('[')!=-1){if(currentCode.indexOf('1')!=-1){fanfuNum=1;}
if(currentCode.indexOf('2')!=-1){fanfuNum=2;}
if(currentCode.indexOf('3')!=-1){fanfuNum=3;}
if(currentCode.indexOf('4')!=-1){fanfuNum=4;}}}
if(plays.hasOwnProperty(currentPlay)){playInterval=setTimeout(playIntervalFun,note[0]);}else{setTimeout(function(){stopPlay();},1000);}}}