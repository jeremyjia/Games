function CI21C4 (){
  var s = "i21c2_v0.14";
  s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/21/c4/c4.js'"
  s += " style='color:blue;'";		s +=">"; s += " c4.js* ";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c4/c4.js'"
  s += " style='color:green;'";		s +=">"; s += " c4.js ";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c4/index.html'"
  s += " style='color:brown;'";		s +=">"; s += " index.html";
  var ui = blo0.blMD("div_ID_4_I21_C4", s ,    666,100,500,400, "lightgreen"); 
  var tb = blo0.blDiv(ui,ui.id+"tb","Font Test",blGrey[0]);
  var v = blo0.blDiv(ui,ui.id+"v","v",blGrey[1]);
  var v1 = blo0.blDiv(ui,ui.id+"v1","v1",blGrey[1]);
  var v2 = blo0.blDiv(ui,ui.id+"v2","abcv2",blGrey[1]);
  v.ss = [];
  var b1 = blo0.blBtn(tb,tb.id+"b1","b1","brown");
  var b2 = blo0.blBtn(tb,tb.id+"b2","b2","green");
 
  b1.onclick = function(){
    var request = new XMLHttpRequest();
        
    request.addEventListener('readystatechange', function(e) {
      if(request.readyState == 2 && request.status == 200) {
        var s = "Download is being started.";
        v.ss.push(s);         
      }
      else if(request.readyState == 3) {
        var s = "Download is under progress";
        v.ss.push(s);         
      }
      else if(request.readyState == 4) {
        var s = "Downloading has finished";
        v.ss.push(s);          
        // request.response holds the binary data of the font

        var junction_font = new FontFace('MusiSync', request.response);
        junction_font.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
            v2.style.fontFamily = '"MusiSync",  Latin-1 supplement (95)';
        }).catch(function(error) {
          // error occurred
        });
      }
    });

    request.addEventListener('progress', function(e) {
      var percent_complete = (e.loaded / e.total)*100; 
      v1.innerHTML = percent_complete;
    });

    request.responseType = 'arraybuffer';

    // Downloading a font from the path
    request.open('get', 'https://littleflute.github.io/Games/issues/682/demo/MusiSync.ttf'); 

    request.send();
  }
     
  _on_off_div(null,ui);
}
var oI21C2 = new CI21C4();
 
