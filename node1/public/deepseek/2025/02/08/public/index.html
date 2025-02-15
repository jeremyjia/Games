<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网站更新监控器</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .monitor-box {
            border: 1px solid #ccc;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .status-indicator {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 10px;
        }
        .online { background-color: #4CAF50; }
        .offline { background-color: #f44336; }
        .updated { background-color: #2196F3; }
    </style>
</head>
<body>
    <h1>网站更新监控器</h1>
    
    <div>
        <input type="url" id="targetUrl" 
               placeholder="输入要监控的网址 (需包含http/https)" 
               style="width: 300px; padding: 8px;">
        <button onclick="startMonitoring()">开始监控</button>
        <button onclick="stopMonitoring()">停止监控</button>
    </div>

    <div id="monitorResults"></div>

    <script>
        let monitoringInterval = null;
        const checkInterval = 60000; // 60秒检查一次

        async function startMonitoring() {
            const url = document.getElementById('targetUrl').value;
            if (!url) return alert('请输入有效网址');
            
            stopMonitoring(); // 停止之前的监控
            
            monitoringInterval = setInterval(async () => {
                try {
                    const response = await fetch(`/check-update?url=${encodeURIComponent(url)}`);
                    const data = await response.json();
                    
                    updateUI({
                        url: url,
                        status: data.status,
                        updated: data.updated,
                        contentHash: data.contentHash
                    });
                    
                    if (data.updated) {
                        showNotification('检测到网站更新！');
                    }
                } catch (error) {
                    console.error('监控错误:', error);
                }
            }, checkInterval);
        }

        function stopMonitoring() {
            clearInterval(monitoringInterval);
            monitoringInterval = null;
        }

        function updateUI(data) {
            const results = document.getElementById('monitorResults');
            let statusBox = document.getElementById(`status-${btoa(data.url)}`);
            
            if (!statusBox) {
                statusBox = document.createElement('div');
                statusBox.className = 'monitor-box';
                statusBox.id = `status-${btoa(data.url)}`;
                results.appendChild(statusBox);
            }

            const statusClass = data.status === 'online' ? 
                (data.updated ? 'updated' : 'online') : 'offline';
            
            statusBox.innerHTML = `
                <div class="status-indicator ${statusClass}"></div>
                <strong>${data.url}</strong>
                <p>状态: ${data.status.toUpperCase()}</p>
                ${data.updated ? '<p class="update-alert">网站内容已更新!</p>' : ''}
                <p>最后检查时间: ${new Date().toLocaleString()}</p>
            `;
        }

        function showNotification(message) {
            if (Notification.permission === 'granted') {
                new Notification(message);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification(message);
                    }
                });
            }
        }
    </script>
</body>
</html>