
(function () {
    const worker = new Worker('./worker.js'),
        svgImage = document.getElementById('svgImage'),
        downloadFile = document.getElementById('downloadFile'),
        codeEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
            lineNumbers: true,
            mode:  'javascript',
            theme: 'elegant'
        });
    const btn = bl$("btn4plx");
    btn.onclick = function(_btn,_codeEditor){  
        return function(){   
            const o = _GetObj(_btn,_codeEditor);  
            o.on();
        }
    }(btn,codeEditor);

    codeEditor.on('change', _.debounce(() => {
        worker.postMessage({ code: codeEditor.getValue() });
    }), 500);

    downloadFile.addEventListener('click', ()=> {
        const fileName = `flowchart_${(new Date().toString()).replace(/ /g,'_')}.svg`,
            file = new File([svgImage.innerHTML], fileName, {type: 'image/svg+xml;charset=utf-8'});

        window.saveAs(file, fileName);
    });

    worker.onmessage = function(message) {
        svgImage.innerHTML = message.data.svg;
    };

    worker.postMessage({ code: codeEditor.getValue() });
})();

var _GetObj = function(b,ce){
    if(!b.ui){
        b.ui = blo0.blMD("id_4_plxUI","plxUI_bv0.24",222,50,500,111,"blue");
        const tb = blo0.blDiv(b.ui,b.ui.id,"tb","gray");
        const b0 = blo0.blBtn(tb,tb.id+"b0","cls","white");
        b0.style.float= "left";
        b0.onclick = function(){ 
            ce.setValue("");
        }
        const b1 = blo0.blBtn(tb,tb.id+"b1","b1","green");
        b1.style.float= "left";
        b1.onclick = function(){
            var s = ce.getValue();
            s += "\n";
            s += 1;
            ce.setValue(s);
        }
    }
    var r = {};
    r.on = function(){
        _on_off_div(b,b.ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }
    return r;
}
