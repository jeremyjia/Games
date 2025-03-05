//c4SpringWnd.js
function C4SpringWnd(videoEditor){
    let tb = videoEditor.playToolbar;
    let divContent = document.createElement('div');
    divContent.id = "id_4_div_spring_server";
    divContent.className = 'springServer-content';
    divContent.style.cssText = `
            padding: 10px;
            max-height: 200px;
            overflow: auto;
            margin: 0;
            background: white;
        `;
    let o = new C4DraggableWindow('C4SpringWnd-v0.11', divContent, 120, 333);
 
    const addToggleBtn = function(){
        const btnToggle = document.createElement('button');
        btnToggle.textContent = 'toggleSpringWnd';
        btnToggle.style.color = 'white';
        
        // Track visibility state
        let isWindowVisible = true;
        btnToggle.style.background = '#2196F3'; // Blue when visible
        
        btnToggle.onclick = () => {
            o.toggleVisibility();
            isWindowVisible = !isWindowVisible;
            btnToggle.style.background = isWindowVisible ? '#2196F3' : '#808080';
        };
        tb.appendChild(btnToggle); 
    }();
    const _createToolbar = function(parentElement,textContent){
        let tb = document.createElement('div');
        tb.id = parentElement.id + "tb" + Date();
        tb.textContent = textContent;
        tb.style.cssText = `
                padding: 10px;
                max-height: 200px;
                overflow: auto;
                margin: 0;
                background: brown;
            `;
        parentElement.appendChild(tb);
        return tb;
    }
    const _createClient = function(parentElement,textContent){
        let c = document.createElement('div');
        c.id = parentElement.id + "c" + Date();
        c.textContent = textContent;
        c.style.cssText = `
                padding: 10px;
                max-height: 200px;
                overflow: auto;
                margin: 0;
                background: lightblue;
            `;
        parentElement.appendChild(c);
        return c;
    }
    const _createBtn = function(parentElement,textContent,id){
        let b = document.createElement('button');
        b.id = id;
        b.textContent = textContent;
        b.style.cssText = `
                padding: 10px;
                max-height: 200px;
                overflow: auto;
                margin: 0;
                background: "gay";
            `;
        parentElement.appendChild(b);
        return b;
    }
    const _POST = function(_url,_jsonData,_cb){  
		var r = {};
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
			if(this.readyState === 4 && this.status==200) {
				r.responseText = this.responseText;
				r.status = 1;
				_cb(r);
			}	
			else{
				r.error = "error: " + this.readyState + "," + this.status;
				r.status = 0;
				_cb(r);
			}
		});
		xhr.open("POST", _url);
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(JSON.stringify(_jsonData));
	}	
    const _makeBLS = function(jsonTxt){
        let oj = JSON.parse(jsonTxt);
        
		var s = {};
        let r = {};
        r.version 		= "blsNode1: v0.21";
        r.width   = oj.width;
        r.height = oj.height;
        r.music = oj.audio;
        r.rate = "1";
		s.request 		= r;		
        return s;
    }
    const _Ajx = function(worker,href)
    {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
               worker._2do(xmlhttp.responseText);
            }
			else{    
				if (xmlhttp.readyState >= 1 && xmlhttp.readyState < 4) {
					worker._2do("Task is in progress");
				}
				else {
					worker._2do("error xd 11");
				}
			}
        }
        xmlhttp.open("GET",href,true);
        xmlhttp.send();
    };
    const ui4Server = function(){ 
		const tbServer = _createToolbar(divContent,"tb");
		const client = _createClient(divContent,"ui");
        const bs = [
            {
                "id":1,
                "name":"createBLS",
                "fn2click":function(c){
                    c.innerHTML = videoEditor.generateVideoJson();
                },
            },
            {
                "id":2,
                "name":"bls2server",
                "fn2click":function(c){
                    const sBlsTitle = "node1";
                    c.innerHTML = this.name;
                    var pl = _makeBLS(videoEditor.generateVideoJson()); 
                    var url = "http://localhost:8080/json?fileName=" + sBlsTitle + ".json"; 

                    _POST(url,pl,function(txt){
                        c.innerHTML = "<a href ='http://localhost:8080/"+sBlsTitle+".json' target='_blank'>"+sBlsTitle+".json</a>";
                    }); 
                },
            },
            {
                "id":3,
                "name":"makeMP4", 
                "fn2click":function(c){
                    const sBlsTitle = "node1";
                    c.innerHTML = this.name;
                    var url = "http://localhost:8080/image/json2video?script=" + sBlsTitle + ".json&video=" + sBlsTitle + ".mp4"; 
                    c._2do = function(txt){
                        c.innerHTML = txt;
                    }
                    _Ajx(c,url);
                },
            },];
        for(i in bs){
            const btn = _createBtn(tbServer,bs[i].name,bs[i].id);
            btn.onclick = function(_btn,_bs,_i,_c){
                return function(){
                    _c.innerHTML = _bs[_i];
                    if(_bs[_i].fn2click) _bs[_i].fn2click(_c);
                }
            }(btn,bs,i,client);
        }
    }();
    return o;
}