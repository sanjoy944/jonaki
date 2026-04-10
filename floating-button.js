// floating-button.js
document.addEventListener('DOMContentLoaded', function() {
    // Create main controls container (all buttons on right side)
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'floating-controls-container';
    document.body.appendChild(controlsContainer);

    // Create drag handle indicator
    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle';
    dragHandle.title = 'Drag to move toolbar';
    controlsContainer.appendChild(dragHandle);

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
    
    // Random color palettes for hover effects
    const colorPalettes = [
        { bg: 'linear-gradient(135deg, #FF6B6B, #EE5A24)', shadow: 'rgba(255, 107, 107, 0.6)', border: '#FF6B6B' },
        { bg: 'linear-gradient(135deg, #F9CA24, #F0932B)', shadow: 'rgba(249, 202, 36, 0.6)', border: '#F9CA24' },
        { bg: 'linear-gradient(135deg, #6AB04C, #BADC58)', shadow: 'rgba(106, 176, 76, 0.6)', border: '#6AB04C' },
        { bg: 'linear-gradient(135deg, #22A6B3, #7ED6DF)', shadow: 'rgba(34, 166, 179, 0.6)', border: '#22A6B3' },
        { bg: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', shadow: 'rgba(108, 92, 231, 0.6)', border: '#6C5CE7' },
        { bg: 'linear-gradient(135deg, #E84393, #FD79A8)', shadow: 'rgba(232, 67, 147, 0.6)', border: '#E84393' },
        { bg: 'linear-gradient(135deg, #00B894, #55E6C1)', shadow: 'rgba(0, 184, 148, 0.6)', border: '#00B894' },
        { bg: 'linear-gradient(135deg, #0984E3, #74B9FF)', shadow: 'rgba(9, 132, 227, 0.6)', border: '#0984E3' },
        { bg: 'linear-gradient(135deg, #D63031, #FF7675)', shadow: 'rgba(214, 48, 49, 0.6)', border: '#D63031' },
        { bg: 'linear-gradient(135deg, #E17055, #FAB1A0)', shadow: 'rgba(225, 112, 85, 0.6)', border: '#E17055' },
        { bg: 'linear-gradient(135deg, #00CEC9, #81ECEC)', shadow: 'rgba(0, 206, 201, 0.6)', border: '#00CEC9' },
        { bg: 'linear-gradient(135deg, #FDCB6E, #FFEAA7)', shadow: 'rgba(253, 203, 110, 0.6)', border: '#FDCB6E' },
        { bg: 'linear-gradient(135deg, #A29BFE, #DFE6E9)', shadow: 'rgba(162, 155, 254, 0.6)', border: '#A29BFE' },
        { bg: 'linear-gradient(135deg, #FF9FF3, #F368E0)', shadow: 'rgba(255, 159, 243, 0.6)', border: '#FF9FF3' },
        { bg: 'linear-gradient(135deg, #48DBFB, #0ABDE3)', shadow: 'rgba(72, 219, 251, 0.6)', border: '#48DBFB' },
        { bg: 'linear-gradient(135deg, #FF6348, #FF4757)', shadow: 'rgba(255, 99, 72, 0.6)', border: '#FF6348' },
        { bg: 'linear-gradient(135deg, #2ED573, #7BED9F)', shadow: 'rgba(46, 213, 115, 0.6)', border: '#2ED573' },
        { bg: 'linear-gradient(135deg, #1E90FF, #70A1FF)', shadow: 'rgba(30, 144, 255, 0.6)', border: '#1E90FF' },
        { bg: 'linear-gradient(135deg, #FFA502, #ECCC68)', shadow: 'rgba(255, 165, 2, 0.6)', border: '#FFA502' },
        { bg: 'linear-gradient(135deg, #FF4757, #FF6B81)', shadow: 'rgba(255, 71, 87, 0.6)', border: '#FF4757' }
    ];

    // Random transform effects
    const randomEffects = [
        'translateX(5px) scale(1.03)',
        'translateX(-3px) scale(1.02)',
        'translateX(8px) scale(1.04)',
        'translateX(3px) translateY(-2px) scale(1.02)',
        'translateX(6px) translateY(2px) scale(1.03)',
        'translateX(4px) scale(1.05)',
        'translateX(-2px) translateY(-3px) scale(1.02)',
        'translateX(7px) translateY(-1px) scale(1.03)'
    ];

    // Function to get random color palette
    function getRandomColor() {
        return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    }

    // Function to get random effect
    function getRandomEffect() {
        return randomEffects[Math.floor(Math.random() * randomEffects.length)];
    }

    // Add your tool buttons
    const tools = [
        {class: 'url-btn', name: 'Unicode2Bijoy', url: 'https://unicode-bijoy.blogspot.com/'},
        {class: 'url-btn', name: 'ID Card Scan PDF', url: 'https://idcardscantopdf.blogspot.com/'},
        {class: 'url-btn', name: 'Joint Photo Maker', url: 'https://jointphotomaker.blogspot.com/'},
        {class: 'url-btn', name: 'QR Generator', url: 'https://qrcode-generator-pro.blogspot.com/'},
         {class: 'url-btn', name: 'Multi-image PDF', url: 'https://multi-imagetopdf.blogspot.com/'},
        {class: 'url-btn', name: 'Barcode Suite', url: 'https://barcodegeneratorsc.blogspot.com/'},
        {class: 'url-btn', name: 'OCR Bangla', url: 'https://bangla-ocr-online.blogspot.com/'},
        {class: 'url-btn', name: 'En-Bn Translator', url: 'https://english-bengalitranslator.blogspot.com/'},
         {class: 'url-btn', name: 'Signature Maker', url: 'https://digitalsignaturemakerpad.blogspot.com/'},
        {class: 'url-btn', name: 'Signature Editor', url: 'https://signaturebgremover.blogspot.com/'},
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
        {class: 'url-btn', name: 'YT Thumbnail', url: 'https://youtube-thumbnail-downloader-4kb.blogspot.com/'},
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
        {class: 'url-btn', name: '🌐Our Website', url: 'https://gsmsanjoy.com/'}
    ];

    tools.forEach((tool) => {
        const btn = document.createElement('button');
        btn.className = `tool-button ${tool.class}`;
        // NO ANIMATION DELAY - removed
        btn.innerHTML = `<span class="btn-icon">🔗</span> <span class="btn-text">${tool.name}</span>`;
        
        // Random hover effects with background color change
        btn.addEventListener('mouseenter', function() {
            const randomColor = getRandomColor();
            const randomEffect = getRandomEffect();
            
            this.style.background = randomColor.bg;
            this.style.boxShadow = `0 4px 20px ${randomColor.shadow}, 0 0 30px ${randomColor.shadow}`;
            this.style.borderColor = randomColor.border;
            this.style.transform = randomEffect;
            
            // Random icon animation
            const icon = this.querySelector('.btn-icon');
            const rotations = ['-10deg', '15deg', '-15deg', '20deg', '-20deg', '10deg'];
            const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
            icon.style.transform = `scale(1.3) rotate(${randomRotation})`;
            
            // Random text shadow color
            const text = this.querySelector('.btn-text');
            text.style.textShadow = `0 0 10px ${randomColor.shadow}, 0 0 20px ${randomColor.shadow}`;
            text.style.fontWeight = '700';
        });
        
        btn.addEventListener('mouseleave', function() {
            // Reset to default styles
            this.style.background = '';
            this.style.boxShadow = '';
            this.style.borderColor = 'transparent';
            this.style.transform = '';
            
            const icon = this.querySelector('.btn-icon');
            icon.style.transform = '';
            
            const text = this.querySelector('.btn-text');
            text.style.textShadow = '';
            text.style.fontWeight = '';
        });
        
        btn.addEventListener('click', () => {
            window.location.href = tool.url;
        });
        buttonContainer.appendChild(btn);
    });
    
    // Add CSS styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        /* ============================================
           KEYFRAME ANIMATIONS
           ============================================ */
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes iconBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.3) rotate(-10deg); }
            50% { transform: scale(1.1) rotate(10deg); }
            75% { transform: scale(1.2) rotate(-5deg); }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .floating-controls-container {
            position: fixed;
            bottom: 20px;
            right: 15px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            z-index: 1000;
            user-select: none;
            transition: none;
        }
        
        .floating-controls-container.dragging {
            cursor: grabbing !important;
            opacity: 0.9;
            transition: none;
        }
        
        .floating-controls-container.dragging .button-group {
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
            transform: scale(1.02);
        }
        
        .floating-controls-container.dragging .drag-handle {
            background: rgba(255, 255, 255, 0.6);
        }
        
        /* Drag Handle */
        .drag-handle {
            width: 100%;
            height: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
            padding: 4px 15px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.15);
            transition: all 0.2s;
            position: relative;
        }
        
        .drag-handle::before {
            content: '';
            display: block;
            width: 30px;
            height: 3px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 2px;
            transition: all 0.2s;
        }
        
        .drag-handle:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .drag-handle:hover::before {
            background: rgba(255, 255, 255, 0.8);
            width: 40px;
        }
        
        .drag-handle:active {
            cursor: grabbing;
        }
        
        .button-group {
            display: flex;
            gap: 10px;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 10px;
            border-radius: 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.2s;
            cursor: grab;
        }
        
        .button-group:active {
            cursor: grabbing;
        }
        
        .connection-status {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            position: relative;
            pointer-events: none;
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
            bottom: 70px;
            right: 0;
            background: linear-gradient(145deg, #1a1a2e, #16213e);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            padding: 15px;
            display: none;
            flex-direction: column;
            gap: 8px;
            width: 240px;
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
           RANDOM HOVER EFFECTS WITH JS
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
            transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid transparent;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            animation: slideInLeft 0.5s ease-out both;
        }
        
        .tool-button .btn-icon {
            font-size: 14px;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        
        .tool-button .btn-text {
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        
        /* URL Buttons - Default State */
        .url-btn {
            background: linear-gradient(135deg, #0EA5E9, #06B6D4);
            box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
        }
        
        /* Shimmer Effect on hover */
        .url-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        /* Second shimmer layer for extra effect */
        .url-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 60%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        /* Show shimmer on hover */
        .url-btn:hover::before {
            opacity: 1;
            animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .url-btn:hover::after {
            opacity: 1;
            animation: shimmer 1.5s ease-in-out infinite 0.75s;
        }
        
        /* ============================================
           SPECIAL WEBSITE BUTTON STYLES
           ============================================ */
        .website-btn {
            background: linear-gradient(135deg, #F59E0B, #EF4444);
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
            font-weight: 700;
        }
        
        /* Position indicator dots */
        .position-indicator {
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .position-indicator.visible {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // DRAG FUNCTIONALITY
    // ============================================
    let isDragging = false;
    let isClick = true;
    let dragStartX, dragStartY;
    let initialLeft, initialTop;
    let hasMoved = false;
    const DRAG_THRESHOLD = 5;
    
    function getInitialPosition() {
        const rect = controlsContainer.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top
        };
    }
    
    function switchToTopLeft() {
        const rect = controlsContainer.getBoundingClientRect();
        controlsContainer.style.bottom = 'auto';
        controlsContainer.style.right = 'auto';
        controlsContainer.style.left = rect.left + 'px';
        controlsContainer.style.top = rect.top + 'px';
    }
    
    function onDragStart(e) {
        if (e.target.closest('.control-btn') || e.target.closest('.floating-btn') || e.target.closest('.tool-button')) {
            return;
        }
        
        isDragging = false;
        hasMoved = false;
        isClick = true;
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        dragStartX = clientX;
        dragStartY = clientY;
        
        switchToTopLeft();
        
        const rect = controlsContainer.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        
        e.preventDefault();
    }
    
    function onDragMove(e) {
        if (dragStartX === undefined) return;
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;
        
        if (!hasMoved && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
            hasMoved = true;
            isDragging = true;
            isClick = false;
            controlsContainer.classList.add('dragging');
        }
        
        if (isDragging) {
            e.preventDefault();
            
            let newLeft = initialLeft + deltaX;
            let newTop = initialTop + deltaY;
            
            const containerWidth = controlsContainer.offsetWidth;
            const containerHeight = controlsContainer.offsetHeight;
            
            const maxX = window.innerWidth - containerWidth;
            const maxY = window.innerHeight - containerHeight;
            
            newLeft = Math.max(10, Math.min(newLeft, maxX - 10));
            newTop = Math.max(10, Math.min(newTop, maxY - 10));
            
            controlsContainer.style.left = newLeft + 'px';
            controlsContainer.style.top = newTop + 'px';
            
            updateMenuPosition();
        }
    }
    
    function onDragEnd(e) {
        if (isDragging) {
            controlsContainer.classList.remove('dragging');
            snapToEdge();
            savePosition();
        }
        
        isDragging = false;
        hasMoved = false;
        dragStartX = undefined;
        dragStartY = undefined;
    }
    
    function snapToEdge() {
        const rect = controlsContainer.getBoundingClientRect();
        const snapThreshold = 80;
        
        if (rect.left < snapThreshold) {
            controlsContainer.style.left = '10px';
        } else if (rect.right > window.innerWidth - snapThreshold) {
            controlsContainer.style.left = (window.innerWidth - rect.width - 10) + 'px';
        }
        
        if (rect.top < snapThreshold) {
            controlsContainer.style.top = '10px';
        } else if (rect.bottom > window.innerHeight - snapThreshold) {
            controlsContainer.style.top = (window.innerHeight - rect.height - 10) + 'px';
        }
    }
    
    function updateMenuPosition() {
        const rect = controlsContainer.getBoundingClientRect();
        const menuHeight = 400;
        
        if (rect.top > menuHeight + 20) {
            buttonContainer.style.bottom = '70px';
            buttonContainer.style.top = 'auto';
        } else {
            buttonContainer.style.top = '70px';
            buttonContainer.style.bottom = 'auto';
        }
        
        if (rect.left < 240) {
            buttonContainer.style.left = '0';
            buttonContainer.style.right = 'auto';
        } else {
            buttonContainer.style.right = '0';
            buttonContainer.style.left = 'auto';
        }
    }
    
    function savePosition() {
        const rect = controlsContainer.getBoundingClientRect();
        const position = {
            left: rect.left,
            top: rect.top
        };
        localStorage.setItem('toolbarPosition', JSON.stringify(position));
    }
    
    function loadPosition() {
        const saved = localStorage.getItem('toolbarPosition');
        if (saved) {
            try {
                const position = JSON.parse(saved);
                const containerWidth = controlsContainer.offsetWidth;
                const containerHeight = controlsContainer.offsetHeight;
                
                const maxX = window.innerWidth - containerWidth;
                const maxY = window.innerHeight - containerHeight;
                
                if (position.left >= 0 && position.left <= maxX && 
                    position.top >= 0 && position.top <= maxY) {
                    controlsContainer.style.bottom = 'auto';
                    controlsContainer.style.right = 'auto';
                    controlsContainer.style.left = position.left + 'px';
                    controlsContainer.style.top = position.top + 'px';
                    return true;
                }
            } catch (e) {
                console.log('Invalid saved position');
            }
        }
        return false;
    }
    
    function resetPosition() {
        controlsContainer.style.left = '';
        controlsContainer.style.top = '';
        controlsContainer.style.bottom = '20px';
        controlsContainer.style.right = '15px';
        localStorage.removeItem('toolbarPosition');
    }
    
    controlsContainer.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    
    controlsContainer.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
    
    controlsContainer.addEventListener('dblclick', function(e) {
        if (!e.target.closest('.control-btn') && !e.target.closest('.floating-btn') && !e.target.closest('.tool-button')) {
            resetPosition();
            showNotification('Toolbar position reset!');
        }
    });
    
    loadPosition();
    
    window.addEventListener('resize', function() {
        const rect = controlsContainer.getBoundingClientRect();
        const containerWidth = controlsContainer.offsetWidth;
        const containerHeight = controlsContainer.offsetHeight;
        
        if (rect.right > window.innerWidth) {
            controlsContainer.style.left = (window.innerWidth - containerWidth - 10) + 'px';
        }
        if (rect.bottom > window.innerHeight) {
            controlsContainer.style.top = (window.innerHeight - containerHeight - 10) + 'px';
        }
    });
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #1E3A5F, #2D5F8A);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    function updateConnectionStatus() {
        const isOnline = navigator.onLine;
        connectionStatus.className = `connection-status ${isOnline ? 'online' : 'offline'}`;
        connectionStatus.title = isOnline ? 'Online' : 'Offline';
        
        const notification = document.createElement('div');
        notification.className = `connection-notification ${isOnline ? 'online' : 'offline'}`;
        notification.textContent = isOnline ? 'You are now online' : 'You are offline';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

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

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    // Sidebar functionality
    let hideTimeout;
    
    floatingBtn.addEventListener('click', function() {
        if (buttonContainer.style.display === 'flex') {
            hideSidebar();
        } else {
            showSidebar();
            updateMenuPosition();
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
        }, 300);
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
        if (e.altKey && e.key === 'ArrowLeft') {
            window.history.back();
        }
        if (e.altKey && e.key === 'r') {
            window.location.reload();
        }
    });
});
