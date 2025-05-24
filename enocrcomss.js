  document.addEventListener('DOMContentLoaded', function() {
            // DOM elements
            const fileInput = document.getElementById('fileInput');
            const uploadArea = document.getElementById('uploadArea');
            const browseBtn = document.getElementById('browseBtn');
            const processBtn = document.getElementById('processBtn');
            const resetBtn = document.getElementById('resetBtn');
            const copyBtn = document.getElementById('copyBtn');
            const downloadBtn = document.getElementById('downloadBtn');
            const clearBtn = document.getElementById('clearBtn');
            const resultText = document.getElementById('resultText');
            const previewImage = document.getElementById('previewImage');
            const imagePreviewContainer = document.getElementById('imagePreviewContainer');
            const progressContainer = document.getElementById('progressContainer');
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            const languageSelect = document.getElementById('languageSelect');
            const enhanceRange = document.getElementById('enhanceRange');
            const notification = document.getElementById('notification');
            const darkModeToggle = document.getElementById('darkModeToggle');

            let selectedFile = null;
            let extractedText = '';

            // Event listeners
            browseBtn.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', handleFileSelect);
            uploadArea.addEventListener('dragover', handleDragOver);
            uploadArea.addEventListener('dragleave', handleDragLeave);
            uploadArea.addEventListener('drop', handleDrop);
            
            processBtn.addEventListener('click', processImage);
            resetBtn.addEventListener('click', resetTool);
            copyBtn.addEventListener('click', copyText);
            downloadBtn.addEventListener('click', downloadText);
            clearBtn.addEventListener('click', clearText);
            darkModeToggle.addEventListener('click', toggleDarkMode);

            // Functions
            function handleFileSelect(e) {
                const file = e.target.files[0];
                if (file) {
                    validateAndSetFile(file);
                }
            }

            function handleDragOver(e) {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.add('drag-over');
            }

            function handleDragLeave(e) {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-over');
            }

            function handleDrop(e) {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-over');
                
                const file = e.dataTransfer.files[0];
                if (file) {
                    validateAndSetFile(file);
                }
            }

            function validateAndSetFile(file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    showNotification('Please upload a valid image (JPG, PNG) or PDF file');
                    return;
                }
                
                // Check file size (10MB max)
                if (file.size > 10 * 1024 * 1024) {
                    showNotification('File size exceeds 10MB limit');
                    return;
                }
                
                selectedFile = file;
                processBtn.disabled = false;
                
                // Show preview for images (not for PDFs)
                if (file.type.includes('image')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                        imagePreviewContainer.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                } else {
                    imagePreviewContainer.style.display = 'none';
                }
                
                showNotification('File ready for processing');
            }

            function processImage() {
                if (!selectedFile) return;
                
                progressContainer.style.display = 'block';
                progressBar.style.width = '0%';
                progressText.textContent = 'Initializing OCR engine...';
                
                const language = languageSelect.value;
                
                Tesseract.recognize(
                    selectedFile,
                    language,
                    {
                        logger: m => {
                            if (m.status === 'recognizing text') {
                                progressBar.style.width = `${Math.round(m.progress * 100)}%`;
                                progressText.textContent = `Processing: ${Math.round(m.progress * 100)}%`;
                            } else {
                                progressText.textContent = m.status;
                            }
                        }
                    }
                ).then(({ data: { text } }) => {
                    extractedText = text;
                    resultText.textContent = text;
                    progressText.textContent = 'OCR completed successfully!';
                    
                    // Enable result buttons
                    copyBtn.disabled = false;
                    downloadBtn.disabled = false;
                    clearBtn.disabled = false;
                    
                    showNotification('Text extracted successfully');
                }).catch(err => {
                    console.error(err);
                    progressText.textContent = 'Error during OCR processing';
                    showNotification('Error processing image');
                });
            }

            function resetTool() {
                fileInput.value = '';
                selectedFile = null;
                processBtn.disabled = true;
                resultText.textContent = 'Extracted text will appear here...';
                extractedText = '';
                imagePreviewContainer.style.display = 'none';
                progressContainer.style.display = 'none';
                
                // Disable result buttons
                copyBtn.disabled = true;
                downloadBtn.disabled = true;
                clearBtn.disabled = true;
            }

            function copyText() {
                if (!extractedText) return;
                
                navigator.clipboard.writeText(extractedText).then(() => {
                    showNotification('Text copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    showNotification('Failed to copy text');
                });
            }

            function downloadText() {
                if (!extractedText) return;
                
                const blob = new Blob([extractedText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'extracted_text.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showNotification('Text downloaded as TXT file');
            }

            function clearText() {
                extractedText = '';
                resultText.textContent = 'Extracted text will appear here...';
                copyBtn.disabled = true;
                downloadBtn.disabled = true;
                clearBtn.disabled = true;
            }

            function showNotification(message) {
                notification.textContent = message;
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }

            function toggleDarkMode() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                
                if (isDark) {
                    document.body.style.backgroundColor = '#0f0f0f';
                    document.body.style.color = '#f1f1f1';
                    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
                } else {
                    document.body.style.backgroundColor = '';
                    document.body.style.color = '';
                    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
                }
            }
        });