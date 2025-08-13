// floating-button.js
document.addEventListener('DOMContentLoaded', function() {
    // Create main controls container (all buttons on right side)
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'floating-controls-container';
    document.body.appendChild(controlsContainer);

    // Create button group for all buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    controlsContainer.appendChild(buttonGroup);

    // Add connection status indicator
    const connectionStatus = document.createElement('div');
    connectionStatus.className = `connection-status ${navigator.onLine ? 'online' : 'offline'}`;
    connectionStatus.title = navigator.onLine ? 'Online' : 'Offline';
    buttonGroup.appendChild(connectionStatus);

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'control-btn back-btn';
    backBtn.innerHTML = '←';
    backBtn.title = 'Go Back';
    buttonGroup.appendChild(backBtn);
    
    // Add reload button
    const reloadBtn = document.createElement('button');
    reloadBtn.className = 'control-btn reload-btn';
    reloadBtn.innerHTML = '↻';
    reloadBtn.title = 'Reload Page';
    buttonGroup.appendChild(reloadBtn);
    
    // Add popup window button
    const popupBtn = document.createElement('button');
    popupBtn.className = 'control-btn popup-btn';
    popupBtn.innerHTML = '↗';
    popupBtn.title = 'Open in Popup Window (640x500)';
    buttonGroup.appendChild(popupBtn);
    
    // Create main floating button
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-btn';
    floatingBtn.id = 'floatingBtn';
    floatingBtn.innerHTML = '☰';
    buttonGroup.appendChild(floatingBtn);
    
    // Create button container (tools menu)
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.id = 'buttonContainer';
    controlsContainer.appendChild(buttonContainer);
    
    // Add your tool buttons
    const tools = [
        {class: 'c11', name: 'OCR বাংলা', url: 'https://bangla-ocr-online.blogspot.com/'},
        {class: 'c4', name: 'Unicode2Bijoy', url: 'https://unicode-bijoy.blogspot.com/'},
        {class: 'c1', name: 'QR Generator', url: 'https://qrcode-generator-pro.blogspot.com/'},
        {class: 'c6', name: 'PDF Add Watermark', url: 'https://pdf-add-watermark.blogspot.com/'},
        {class: 'c12', name: 'OCR English', url: 'https://english-ocr-online.blogspot.com/'},
        {class: 'c8', name: 'PDF Split-Merge', url: 'https://pdf-split-merge-tool.blogspot.com/'},
        {class: 'c2', name: 'PDF2JPG HQ', url: 'https://pdf-to-jpg-converter-hq.blogspot.com/'},
         {class: 'c13', name: 'Reels Maker Image', url: 'https://reels-maker-pro.blogspot.com/'},
        {class: 'c9', name: 'PDF Page Remover', url: 'https://pdf-page-remover.blogspot.com/'},
        {class: 'c3', name: 'image Converter', url: 'https://universal-image-converter-online.blogspot.com/'},
        {class: 'c5', name: 'YT Thumbnail Downloader', url: 'https://youtube-thumbnail-downloader-4kb.blogspot.com/'},
        {class: 'c7', name: 'Image2PDF Maker', url: 'https://image-2-pdf-converter.blogspot.com/'},
        {class: 'c1', name: 'Video Frame Capture', url: 'https://video-frame-capture-tool.blogspot.com/'},
        {class: 'c8', name: 'RGB COLOR Code', url: 'https://html-rgbcolor-codes.blogspot.com/'},
        {class: 'c13', name: 'image Crop Tool', url: 'https://image-croppro.blogspot.com/'},
        {class: 'c14', name: 'Emoji Universe', url: 'https://emoji-universe.blogspot.com/'},
        {class: 'c10', name: 'Mask url', url: 'https://maskurllink.blogspot.com/'},
        {class: 'c5', name: 'Youtube To MP3', url: 'https://youtube-to2-mp3.blogspot.com/'},
         {class: 'c8', name: 'YT News Thumbnail', url: 'https://youtube-news-thumbnail.blogspot.com/'},
        {class: 'c3', name: 'HTML Parse', url: 'https://html-parse-online.blogspot.com/'},
         {class: 'c4', name: 'Text 2 Voice', url: 'https://text-2-speech-online.blogspot.com/'},
        {class: 'c15', name: '🌐Our Website', url: 'https://gsmsanjoy.com/'}
    ];

    tools.forEach(tool => {
        const btn = document.createElement('button');
        btn.className = `tool-button ${tool.class}`;
        btn.textContent = tool.name;
        btn.addEventListener('click', () => {
            window.location.href = tool.url;
        });
        buttonContainer.appendChild(btn);
    });
    
    // Add CSS styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .floating-controls-container {
            position: fixed;
            bottom: 20px;
            right: 15px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
            z-index: 1000;
        }
        
        .button-group {
            display: flex;
            gap: 10px;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 10px;
            border-radius: 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .connection-status {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            position: relative;
        }
        
        .connection-status.online {
            background-color: #4CAF50;
            box-shadow: 0 0 5px #4CAF50;
        }
        
        .connection-status.offline {
            background-color: #F44336;
            box-shadow: 0 0 5px #F44336;
        }
        
        .control-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #5c6bc0;
            color: white;
            border: none;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.2s;
        }
        
        .control-btn:hover {
            background: #3949ab;
            transform: scale(1.1);
        }
        
        .back-btn {
            background: #ff7043;
        }
        
        .back-btn:hover {
            background: #f4511e;
        }
        
        .reload-btn {
            background: #66bb6a;
        }
        
        .reload-btn:hover {
            background: #43a047;
        }
        
        .popup-btn {
            background: #9c27b0;
        }
        
        .popup-btn:hover {
            background: #7b1fa2;
        }
        
        .floating-btn {
            width: 40px;
            height: 40px;
            background: #4a6baf;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        
        .floating-btn:hover {
            background: #3a5a9f;
            transform: scale(1.1);
        }
        
        .button-container {
            position: absolute;
            bottom: 60px;
            right: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            padding: 15px;
            display: none;
            flex-direction: column;
            gap: 10px;
            width: 200px;
            max-height: 70vh;
            overflow-y: auto;
            z-index: 999;
            opacity: 1;
            transition: opacity 0.5s;
        }
        
        .button-container.hidden {
            opacity: 0.3;
        }
        
        .button-container.hidden:hover {
            opacity: 1;
        }
        
        .tool-button {
            display: block;
            padding: 10px 15px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            text-align: center;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
        }
        
        .tool-button:hover {
            transform: translateX(5px);
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
        }
        
        .c1 { background: #FF6B6B; }
        .c2 { background: #4ECDC4; }
        .c3 { background: #45B7D1; }
        .c4 { background: #FFA07A; }
        .c5 { background: #98D8C8; }
        .c6 { background: #F06292; }
        .c7 { background: #7986CB; }
        .c8 { background: #9575CD; }
        .c9 { background: #64B5F6; }
        .c10 { background: #4DB6AC; }
        .c11 { background: #81C784; }
        .c12 { background: #FFD54F; }
        .c13 { background: #FF8A65; }
        .c14 { background: #A1887F; }
        .c15 { background: #98D8C8; }
    `;
    document.head.appendChild(style);
    
    // Connection status functionality
    function updateConnectionStatus() {
        const isOnline = navigator.onLine;
        connectionStatus.className = `connection-status ${isOnline ? 'online' : 'offline'}`;
        connectionStatus.title = isOnline ? 'Online' : 'Offline';
        
        // Show connection status notification
        const notification = document.createElement('div');
        notification.className = `connection-notification ${isOnline ? 'online' : 'offline'}`;
        notification.textContent = isOnline ? 'You are now online' : 'You are offline';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .connection-notification {
            position: fixed;
            bottom: 80px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1001;
            transition: opacity 0.5s;
        }
        .connection-notification.online {
            background: #4CAF50;
        }
        .connection-notification.offline {
            background: #F44336;
        }
    `;
    document.head.appendChild(notificationStyle);

    // Listen for connection changes
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    // Rest of the existing functionality...
    let hideTimeout;
    
    floatingBtn.addEventListener('click', function() {
        if (buttonContainer.style.display === 'flex') {
            hideSidebar();
        } else {
            showSidebar();
        }
    });
    
    function showSidebar() {
        buttonContainer.style.display = 'flex';
        buttonContainer.classList.remove('hidden');
        resetHideTimeout();
    }
    
    function hideSidebar() {
        buttonContainer.classList.add('hidden');
        setTimeout(() => {
            buttonContainer.style.display = 'none';
        }, 500);
    }
    
    function resetHideTimeout() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            if (buttonContainer.style.display === 'flex') {
                buttonContainer.classList.add('hidden');
            }
        }, 5000);
    }
    
    buttonContainer.addEventListener('mouseenter', () => {
        buttonContainer.classList.remove('hidden');
        resetHideTimeout();
    });
    
    buttonContainer.addEventListener('mouseleave', () => {
        resetHideTimeout();
    });
    
    // Back button functionality
    backBtn.addEventListener('click', function() {
        window.history.back();
    });
    
    // Reload button functionality
    reloadBtn.addEventListener('click', function() {
        window.location.reload();
    });
    
    // Popup window button functionality
    popupBtn.addEventListener('click', function() {
        const width = 640;
        const height = 500;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        window.open(window.location.href, '_blank', 
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt+Left for back
        if (e.altKey && e.key === 'ArrowLeft') {
            window.history.back();
        }
        // Alt+R for reload
        if (e.altKey && e.key === 'r') {
            window.location.reload();
        }
    });
});




