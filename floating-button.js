// floating-button.js
document.addEventListener('DOMContentLoaded', function() {
    // Create floating button element
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-btn';
    floatingBtn.id = 'floatingBtn';
    floatingBtn.innerHTML = '☰';
    document.body.appendChild(floatingBtn);
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.id = 'buttonContainer';
    document.body.appendChild(buttonContainer);
    
    // Add your existing buttons HTML to the container
    buttonContainer.innerHTML = `
        <a class="tool-button c11" href="https://bangla-ocr-online.blogspot.com/">বাংলা OCR Only</a>
        <a class="tool-button c4" href="https://unicode-bijoy.blogspot.com/">Unicode To Bijoy</a>
        <a class="tool-button c6" href="https://pdf-add-watermark.blogspot.com/">PDF Add Watermark</a>
        <a class="tool-button c12" href="https://english-ocr-online.blogspot.com/" target="_blank">English OCR Only</a>
        <a class="tool-button c8" href="https://pdf-split-merge-tool.blogspot.com/">PDF Split-Merge</a>
        <a class="tool-button c2" href="https://pdf-to-jpg-converter-hq.blogspot.com/">PDF to JPG HQ</a>
        <a class="tool-button c9" href="https://pdf-page-remover.blogspot.com/">PDF Page Remover</a>
        <a class="tool-button c3" href="https://universal-image-converter-online.blogspot.com/">Universal image Converter</a>
        <a class="tool-button c5" href="https://youtube-thumbnail-downloader-4kb.blogspot.com/">YT Thumbnail Downloader</a>
        <a class="tool-button c7" href="https://image-2-pdf-converter.blogspot.com/">Image2PDF Maker</a>
        <a class="tool-button c10" href="https://maskurllink.blogspot.com/">Mask url</a>
        <a class="tool-button c1" href="https://video-frame-capture-tool.blogspot.com/">Video Frame Capture</a>
        <a class="tool-button c13" href="https://image-croppro.blogspot.com/">image Crop Tool</a>
        <a class="tool-button c14" href="https://emoji-universe.blogspot.com/">Emoji Universe</a>
		 <a class="tool-button c15" href="https://gsmsanjoy.com/">🌐 Official website</a>
    `;
    
    // Add CSS styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .floating-btn {
            position: fixed;
            bottom: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            background: #4a6baf;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: all 0.3s;
        }
        
        .floating-btn:hover {
            background: #3a5a9f;
            transform: scale(1.1);
        }
        
        .button-container {
            position: fixed;
            bottom: 40px;
            right: 10px;
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
            text-decoration: none;
            color: white;
            font-weight: bold;
            text-align: center;
            transition: all 0.2s;
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
		.c15 { background: #64B5F6; }
    `;
    document.head.appendChild(style);
    
    // Functionality
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
});