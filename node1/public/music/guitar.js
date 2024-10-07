 

const fnGuitar = function(m){
    console.log(Date()); 
    
    // 创建一个Transport实例，用于控制播放的节奏 
    Tone.Transport.bpm.set(120);

    // 在特定的时间点播放和弦
    Tone.Transport.schedule(() => {
        console.log("1a")
    }, '+0:0:2'); // 在2秒后播放C和弦

    // 启动Transport，开始播放
    Tone.Transport.start();  

}