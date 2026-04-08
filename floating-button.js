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
        {class: 'url-btn', name: 'Unicode2Bijoy', url: 'https://unicode-bijoy.blogspot.com/'},
        {class: 'url-btn', name: 'ID Card Scan PDF', url: 'https://idcardscantopdf.blogspot.com/'},
        {class: 'url-btn', name: 'Joint Photo Maker', url: 'https://jointphotomaker.blogspot.com/'},
        {class: 'url-btn', name: 'QR Generator', url: 'https://qrcode-generator-pro.blogspot.com/'},
        {class: 'url-btn', name: 'Barcode Suite', url: 'https://barcodegeneratorsc.blogspot.com/'},
        {class: 'url-btn', name: 'OCR Bangla', url: 'https://bangla-ocr-online.blogspot.com/'},
        {class: 'url-btn', name: 'En-Bn Translator', url: 'https://english-bengalitranslator.blogspot.com/'},
        {class: 'url-btn', name: 'Signature BG Remover', url: 'https://signaturebgremover.blogspot.com/'},
        {class: 'url-btn', name: 'Video Snapshot', url: 'https://video-snapshot-manager.blogspot.com/'},
        {class: 'url-btn', name: 'Data To Word', url: 'https://datetowordsconverter.blogspot.com/'},
        {class: 'url-btn', name: 'Bangla To Banglish', url: 'https://bangla2banglishconverter.blogspot.com/'},
        {class: 'url-btn', name: 'Age Calculator', url: 'https://age-calculator94.blogspot.com/'},
        {class: 'url-btn', name: 'Photo MetaClean', url: 'https://photometacleanpro.blogspot.com/'},
        {class: 'url-btn', name: 'Dollar-Taka Rate', url: 'https://dollartakaconverter.blogspot.com/'},
        {class: 'url-btn', name: 'PDF Add Watermark', url: 'https://pdf-add-watermark.blogspot.com/'},
        {class: 'url-btn', name: 'OCR English', url: 'https://english-ocr-online.blogspot.com/'},
        {class: 'url-btn', name: 'Teletalk Photo 300px', url: 'https://teletalkphotosignatureresizer.blogspot.com/'},
        {class: 'url-btn', name: 'PDF Split-Merge', url: 'https://pdf-split-merge-tool.blogspot.com/'},
        {class: 'url-btn', name: 'PDF2JPG HQ', url: 'https://pdf-to-jpg-converter-hq.blogspot.com/'},
        {class: 'url-btn', name: 'Video2PDF', url: 'https://videotopdf.blogspot.com/'},
        {class: 'url-btn', name: 'Reels Maker Image', url: 'https://reels-maker-pro.blogspot.com/'},
        {class: 'url-btn', name: 'videocreator pro', url: 'https://videocreator-pro.blogspot.com/'},
        {class: 'url-btn', name: 'Photo Editor', url: 'https://photoeditor26.blogspot.com/'},
        {class: 'url-btn', name: 'PDF Page Remover', url: 'https://pdf-page-remover.blogspot.com/'},
        {class: 'url-btn', name: 'image Converter', url: 'https://universal-image-converter-online.blogspot.com/'},
        {class: 'url-btn', name: 'YT Thumbnail Downloader', url: 'https://youtube-thumbnail-downloader-4kb.blogspot.com/'},
        {class: 'url-btn', name: 'Image2PDF Maker', url: 'https://image-2-pdf-converter.blogspot.com/'},
        {class: 'url-btn', name: 'Video Frame Capture', url: 'https://video-frame-capture-tool.blogspot.com/'},
        {class: 'url-btn', name: 'RGB COLOR Code', url: 'https://html-rgbcolor-codes.blogspot.com/'},
        {class: 'url-btn', name: 'image Crop Tool', url: 'https://image-croppro.blogspot.com/'},
        {class: 'url-btn', name: 'Emoji Universe', url: 'https://emoji-universe.blogspot.com/'},
        {class: 'url-btn', name: 'Mask url', url: 'https://maskurllink.blogspot.com/'},
        {class: 'url-btn', name: 'Youtube To MP3', url: 'https://youtube-to2-mp3.blogspot.com/'},
        {class: 'url-btn', name: 'YT News Thumbnail', url: 'https://youtube-news-thumbnail.blogspot.com/'},
        {class: 'url-btn', name: 'HTML Parse', url: 'https://html-parse-online.blogspot.com/'},
        {class: 'url-btn', name: 'Text 2 Voice', url: 'https://text-2-speech-online.blogspot.com/'},
        {class: 'url-btn website-btn', name: '🌐Our Website', url: 'https://gsmsanjoy.com/'}
    ];

    tools.forEach(tool => {
        const btn = document.createElement('button');
        btn.className = `tool-button ${tool.class}`;
        btn.innerHTML = `<span class="btn-icon">🔗</span> ${tool.name}`;
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
        
        /* ============================================
           CONTROL BUTTONS (Non-URL buttons)
           Each has unique color
           ============================================ */
        .control-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
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
            transform: scale(1.1);
        }
        
        /* Back Button - Orange/Red */
        .back-btn {
            background: linear-gradient(135deg, #FF6B35, #F7444E);
            box-shadow: 0 2px 8px rgba(247, 68, 78, 0.4);
        }
        .back-btn:hover {
            background: linear-gradient(135deg, #F7444E, #E53935);
        }
        
        /* Reload Button - Green */
        .reload-btn {
            background: linear-gradient(135deg, #43E97B, #38F9D7);
            box-shadow: 0 2px 8px rgba(56, 249, 215, 0.4);
        }
        .reload-btn:hover {
            background: linear-gradient(135deg, #38F9D7, #2ECC71);
        }
        
        /* Popup Button - Purple */
        .popup-btn {
            background: linear-gradient(135deg, #A855F7, #6366F1);
            box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
        }
        .popup-btn:hover {
            background: linear-gradient(135deg, #6366F1, #4F46E5);
        }
        
        /* Floating Menu Button - Dark Blue */
        .floating-btn {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #1E3A5F, #2D5F8A);
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(30, 58, 95, 0.4);
            transition: all 0.3s;
        }
        
        .floating-btn:hover {
            background: linear-gradient(135deg, #2D5F8A, #1E3A5F);
            transform: scale(1.1);
        }
        
        /* ============================================
           BUTTON CONTAINER (Tools Menu)
           ============================================ */
        .button-container {
            position: absolute;
            bottom: 60px;
            right: 0;
            background: linear-gradient(145deg, #1a1a2e, #16213e);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            padding: 15px;
            display: none;
            flex-direction: column;
            gap: 8px;
            width: 220px;
            max-height: 70vh;
            overflow-y: auto;
            z-index: 999;
            opacity: 1;
            transition: opacity 0.5s;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .button-container::-webkit-scrollbar {
            width: 6px;
        }
        .button-container::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
            border-radius: 3px;
        }
        .button-container::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
        }
        
        .button-container.hidden {
            opacity: 0.3;
        }
        
        .button-container.hidden:hover {
            opacity: 1;
        }
        
        /* ============================================
           URL BUTTONS (Tool buttons with links)
           All have same Blue/Cyan gradient color
           ============================================ */
        .tool-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 12px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            font-size: 13px;
            text-align: left;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .tool-button .btn-icon {
            font-size: 14px;
            flex-shrink: 0;
        }
        
        /* URL Buttons - Blue/Cyan Gradient */
        .url-btn {
            background: linear-gradient(135deg, #0EA5E9, #06B6D4);
            box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
        }
        
        .url-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .url-btn:hover::before {
            left: 100%;
        }
        
        .url-btn:hover {
            transform: translateX(5px);
            background: linear-gradient(135deg, #0284C7, #0891B2);
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.5);
        }
        
        /* Website Button - Special Gold Color for "Our Website" */
        .website-btn {
            background: linear-gradient(135deg, #F59E0B, #EF4444);
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
            font-weight: 700;
        }
        
        .website-btn:hover {
            background: linear-gradient(135deg, #EF4444, #DC2626);
            transform: translateX(5px);
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.5);
        }
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

    // Sidebar functionality
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
