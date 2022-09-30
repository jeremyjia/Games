var muziek = '';
var xmlFileName = '';
var abcText = '';
var dlgOpen = 0;
var xml_options = { p:'f' };
var drop_files = null;

function leesFile () {
    //var b = setOptions ();
    //if (b)
    	readFile (readEnc, '');
}


function loadXml (data) {
    var xmldata = $.parseXML (data);
    var res = vertaal (xmldata, xml_options);
    var errtxt = res[1]; abcText = res[0];
    if (errtxt) errtxt += '\n';
    //修改谱子宽度
//    if(location.href.indexOf("ixzds.com")>-1){
//    	abcText = abcText.replace(/%%pagewidth.*\n/,"%%pagewidth 300\n");
//	}else if(location.href.indexOf("xmajd.cn")>-1){
//		abcText = abcText.replace(/%%pagewidth.*\n/,"%%pagewidth 1024\n");
//	}
    abcText = abcText.replace(/%%pagewidth.*\n/,"%%pagewidth 1500\n");
    abcText = abcText.replace(/%%leftmargin.*\n/,"%%leftmargin 2\n");
    abcText = abcText.replace(/%%rightmargin .*\n/,"%%rightmargin 10\n");
    abcText = abcText.replace(/%%scale .*\n/,"");

    
    $('#source').val(abcText);
    abc_change();
    $('#err').text (errtxt);
    //$('#savebtn').attr ('disabled', false);
    if (abcText.indexOf ('percmap') >= 0 || abcText.indexOf ('strings=') >= 0) { // translate again with option t==1
        xml_options ['t'] = 1;  // t==1 -> code with %%map and %%voicemap
        res = vertaal (xmldata, xml_options);
    }
    dolayout (res[0]);
}

function readEnc (data) {
    var xs = data.slice (0, 100);   // only look at the beginning of the file
    if (xs.indexOf ('<?xml') == -1) { alert ('not an xml file'); return; }
    var enc = xs.match (/encoding="([^"]+)"/);
    enc = enc && enc.length == 2 ? enc [1] : 'utf-8'; // extract given encoding and fall back to utf-8
    if (/utf/i.test (enc)) loadXml (data);    // proceed when utf-8
    else readFile (loadXml, enc);   // read again when not utf encoded
}

function readFile (doRes, enc) {
    var file;
    if (drop_files) file = drop_files [0]
    else            file = $('#xmlfile').prop ('files')[0];
    if (!file) return
    var freader = new FileReader ();
    freader.onload = function (e) { doRes (freader.result); }
    xmlFileName = file.name;
    freader.readAsText (file, enc);
}

function dolayout (abctxt) {
	$("#source").val(abctxt);
	abc_change();
}
