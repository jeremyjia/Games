// c4VideoSetWnd.js

function C4VideoSetWnd(videoEditor){

    const _createAudioPresetWindow = function(ve) {
        let audioPresetContent = document.createElement('div');
        audioPresetContent.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
        `;

        const baseURL = 'https://littleflute.github.io/english/NewConceptEnglish/Book2/';
        for (let i = 1; i <= 36; i++) { 
            const btn = document.createElement('button');
            btn.textContent = `第 ${i} 课`;
            btn.style.cssText = `
                padding: 4px 8px;
                background: #9C27B0;
                color: white;
                font-size: 12px;
            `;
            btn.onclick = () => {
                const url = `${baseURL}${i}.mp3`;
                ve.audioUrlInput.value = url;
                ve.audio.src = url;
                ve.updateJson();
            };
            audioPresetContent.appendChild(btn);
        }

        return new C4DraggableWindow(
            'setAudio',
            audioPresetContent,
            400,  
            20,
            false
        );
    };
    return _createAudioPresetWindow(videoEditor); 
}