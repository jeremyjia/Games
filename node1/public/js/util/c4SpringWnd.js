

//c4SpringWnd.js
function CFrame(_number,_time,_backgroundColor){
    this.number = _number;
    this.time = _time;
    this.backgroundColor = _backgroundColor;
    this.objects = [];  
     

    this.addObj = function(_o){
        this.objects.push(_o);
    }; 
};

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
        r.version 		= "blsNode1: v0.22";
        r.width   = oj.width;
        r.height = oj.height;
        r.music = oj.audio;
        r.rate =`${oj.fps}`;
        r.frames = [];
        let n = 0;
        for(i in oj.scenes){
            n++;
            let c = oj.scenes[i].color;
            const makeRGB = function(c) { 
                let hex = c.replace('#', '');
                if (hex.length === 3) {
                    hex = hex.split('').map(function(char) {
                        return char + char;
                    }).join('');
                }
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return r + "," + g + "," + b;
            };
            var f = new CFrame(n,oj.scenes[i].duration,makeRGB(c));
            
            r.frames.push(f);
        }
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
        let sBlsTitle = null;
        const bs = [
            {
                "id":11,
                "name":"originJSON",
                "fn2click":function(c){
                    c.innerHTML = videoEditor.generateVideoJson();
                },
            },
            {
                "id":21,
                "name":"bls",
                "fn2click":function(c){  
                    c.innerHTML =  JSON.stringify( _makeBLS(videoEditor.generateVideoJson()));  
                },
            },
            {
                "id":22,
                "name":"bls2server",
                "fn2click":function(c){
                    const d = new Date(); 
                    const Date2String = function(d) {
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                        const day = String(d.getDate()).padStart(2, '0');
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const seconds = String(d.getSeconds()).padStart(2, '0');
                        
                        return `${year}${month}${day}_${hours}_${minutes}_${seconds}`;
                    };
                    sBlsTitle = Date2String(d);
                    c.innerHTML = this.name;
                    var pl = _makeBLS(videoEditor.generateVideoJson()); 
                    var url = "http://localhost:8080/json?fileName=" + sBlsTitle + ".json"; 

                    _POST(url,pl,function(txt){
                        c.innerHTML = "<a href ='http://localhost:8080/"+sBlsTitle+".json' target='_blank'>"+sBlsTitle+".json</a>";
                    }); 
                },
            },
            {
                "id":33,
                "name":"makeMP4", 
                "fn2click":function(c){ 
                    c.innerHTML = this.name;
                    var url = "http://localhost:8080/image/json2video?script=" + sBlsTitle + ".json&video=" + sBlsTitle + ".mp4"; 
                    c._2do = function(txt){
                        c.innerHTML = txt;
                    }
                    _Ajx(c,url);
                },
            },
            {
                "id":44,
                "name":"jsons_on_server",
                "fn2click":function(c){    
                    var url = "http://localhost:8080/getResourceOnServer?filetype=json" ; 
                    c._2do = function(txt){
                        let o = JSON.parse(txt);
                        let js = o.resource;
                        c.innerHTML = "";
                        const tb = _createToolbar(c,"tb"); 
                        const v = _createToolbar(c,"v"); 
                        for(i in js){
                            const btn = _createBtn(tb,js[i],`id${i}`);
                            btn.onclick = function(_btn,_js,_i,_c){
                                return function(){ 
                                    var url = `http://localhost:8080/image/json2video?script=${_js[_i]}&video=${_i}.mp4`; 
                                    _c._2do = function(txt){
                                        _c.innerHTML = txt;
                                    }
                                    _Ajx(_c,url);
                                }
                            }(btn,js,i,v);
                        }
 
                    }
                    _Ajx(c,url);
                },
            },
        ];
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

