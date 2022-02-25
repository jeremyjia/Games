const i655V = "i655_v0.53 ";
const root = bl$("id_4_userPlxApp");
if(!root.ui){
    root.ui = true;
    root.v = blo0.blMDiv(root,root.id+"v",i655V + ":: v ",111,111,111,111,"grey");
    var c = new Ci655(root.v);  
}
function Ci655(_r){  
    this.blrRecord = function(b,d){ _record(b,d);  };
    this.blrF2 = function(b,d){ _F2(b,d);  };

    var tb  = blo0.blDiv(_r,_r.id+"tb","tb",blGrey[0]);
    var v    = blo0.blDiv(_r,_r.id+"v","v",blGrey[1]); 
    blo0.blShowObj2Div(v,this);

    const _record = function(b,d){
        //blo0.blScript("server.js","https://jeremyjia.github.io/Games/issues/4/server.js");
        const recordBtn = document.querySelector(".record-btn");
        const player = document.querySelector(".audio-player");

if (navigator.mediaDevices.getUserMedia) {
  var chunks = [];
  const constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(
    stream => {
      console.log("授权成功！");

      const mediaRecorder = new MediaRecorder(stream);

      recordBtn.onclick = () => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          recordBtn.textContent = "record";
          console.log("录音结束");
        } else {
          mediaRecorder.start();
          console.log("录音中...");
          recordBtn.textContent = "stop";
        }
        console.log("录音器状态：", mediaRecorder.state);
      };

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = e => {
        var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
      
         let reader= new FileReader();
         reader.onload = function (e) { 
             var audioData = e.target.result;
             alert(audioData);
             addNewGitHubComment(550, audioData, CallBackSubmit2SixPage);
              console.log(audioData);
         }
         reader.readAsDataURL(blob);

        var audioURL = window.URL.createObjectURL(blob);
        player.src = audioURL;
        player.play();
      };
    },
    () => {
      console.error("授权失败！");
    }
  );
} else {
  console.error("浏览器不支持 getUserMedia");
}

        function CallBackSubmit2SixPage(response) {
            if (response.readyState == 4) {
                if (response.status == 200 || response.status == 201) {
                    alert("上传到6号成功!");
                } else {
                    alert("Errors, status=" + response.status);
                }
            }
        }
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }   
    const _F2 = function(b,d){
        d.innerHTML = Date();
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    }     
    const _init = function(){
        bl$("blrRecord").click();
        bl$("blrRecord").click();

        bl$("blrF2").click();
        bl$("blrF2").click();
    }
    _init();
}