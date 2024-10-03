document.addEventListener("DOMContentLoaded", function() {
    const startRecordButton = document.getElementById('start-record');
    const stopRecordButton = document.getElementById('stop-record');
    const uploadButton = document.getElementById('upload-audio');
    const audioPlayback = document.getElementById('audio-playback');
    const status = document.getElementById('status');

    let mediaRecorder;
    let audioChunks = [];

    // 请求用户权限
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        // 当有音频数据可用时，将其保存在数组中
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        // 录音停止时，创建一个Blob对象
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
            uploadButton.disabled = false;

            // 将Blob对象转换为文件
            const audioFile = new File([audioBlob], 'recording.wav', {
                type: 'audio/wav'
            });

            // 保存文件引用以便上传
            uploadButton.file = audioFile;
        };

        startRecordButton.addEventListener('click', () => {
            startRecordButton.disabled = true;
            stopRecordButton.disabled = false;
            mediaRecorder.start();
        });

        stopRecordButton.addEventListener('click', () => {
            startRecordButton.disabled = false;
            stopRecordButton.disabled = true;
            uploadButton.disabled = true;
            mediaRecorder.stop();
            audioChunks = [];
        });

        uploadButton.addEventListener('click', () => {
            const formData = new FormData();
            formData.append('audio', uploadButton.file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                status.innerHTML = '上传成功: ' + data.message ;
            })
            .catch(error => {
                console.error('上传失败:', error);
                alert('上传失败');
            });
        });
    })
    .catch(err => {
        console.error('无法访问麦克风:', err);
        alert('无法访问麦克风，请配置麦克风权限');
    });
});