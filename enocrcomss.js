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
            const translateBtn = document.getElementById('translateBtn');
            const translateLanguage = document.getElementById('translateLanguage');
            const translateResult = document.getElementById('translateResult');
            const translatedText = document.getElementById('translatedText');
            const formatPlain = document.getElementById('formatPlain');
            const formatPreserve = document.getElementById('formatPreserve');
            const formatAuto = document.getElementById('formatAuto');

            let selectedFile = null;
            let extractedText = '';
            let currentFormat = 'auto';

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
            translateBtn.addEventListener('click', translateText);
            
            formatPlain.addEventListener('click', () => setFormat('plain'));
            formatPreserve.addEventListener('click', () => setFormat('preserve'));
            formatAuto.addEventListener('click', () => setFormat('auto'));

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
                translateBtn.disabled = false;
                
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
                    formatText(text);
                    progressText.textContent = 'OCR completed successfully!';
                    
                    // Enable result buttons
                    copyBtn.disabled = false;
                    downloadBtn.disabled = false;
                    clearBtn.disabled = false;
                    translateBtn.disabled = false;
                    
                    showNotification('Text extracted successfully');
                }).catch(err => {
                    console.error(err);
                    progressText.textContent = 'Error during OCR processing';
                    showNotification('Error processing image');
                });
            }

            function formatText(text) {
                switch(currentFormat) {
                    case 'plain':
                        // Remove extra spaces and line breaks
                        resultText.textContent = text.replace(/\s+/g, ' ').trim();
                        break;
                    case 'preserve':
                        // Keep original formatting
                        resultText.textContent = text;
                        break;
                    case 'auto':
                    default:
                        // Smart formatting - preserve paragraphs but clean up
                        let formatted = text;
                        // Replace multiple newlines with double newlines (paragraphs)
                        formatted = formatted.replace(/\n{3,}/g, '\n\n');
                        // Remove spaces at beginning of lines
                        formatted = formatted.replace(/^ +/gm, '');
                        // Remove spaces at end of lines
                        formatted = formatted.replace(/ +$/gm, '');
                        resultText.textContent = formatted;
                        break;
                }
            }

            function setFormat(format) {
                currentFormat = format;
                
                // Update active button
                formatPlain.classList.remove('active');
                formatPreserve.classList.remove('active');
                formatAuto.classList.remove('active');
                
                if (format === 'plain') formatPlain.classList.add('active');
                if (format === 'preserve') formatPreserve.classList.add('active');
                if (format === 'auto') formatAuto.classList.add('active');
                
                if (extractedText) {
                    formatText(extractedText);
                }
            }

            function translateText() {
                if (!extractedText) return;
                
                const targetLang = translateLanguage.value;
                translateBtn.disabled = true;
                translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';
                
                // In a real implementation, you would call the Google Translate API here
                // This is a simulation since we can't make actual API calls from client-side
                simulateTranslation(targetLang);
            }

            function simulateTranslation(targetLang) {
                // Simulate API delay
                setTimeout(() => {
                    // This is just a simulation - in a real app you would use the Google Translate API
                    const languages = {
                        'en': 'English',
                        'es': 'Spanish',
                        'fr': 'French',
                        'de': 'German',
                        'zh-CN': 'Chinese',
                        'ja': 'Japanese',
                        'ko': 'Korean',
                        'ar': 'Arabic',
                        'ru': 'Russian'
                    };
                    
                    // Mock translation by reversing some words to simulate change
                    let mockTranslation = extractedText
                        .split(' ')
                        .map(word => {
                            if (Math.random() > 0.7) {
                                return word.split('').reverse().join('');
                            }
                            return word;
                        })
                        .join(' ');
                    
                    translatedText.textContent = mockTranslation;
                    translateResult.style.display = 'block';
                    translateBtn.disabled = false;
                    translateBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Translate';
                    
                    showNotification(`Text translated to ${languages[targetLang]}`);
                }, 1500);
            }

            function resetTool() {
                fileInput.value = '';
                selectedFile = null;
                processBtn.disabled = true;
                resultText.textContent = 'Extracted text will appear here...';
                extractedText = '';
                imagePreviewContainer.style.display = 'none';
                progressContainer.style.display = 'none';
                translateResult.style.display = 'none';
                
                // Disable result buttons
                copyBtn.disabled = true;
                downloadBtn.disabled = true;
                clearBtn.disabled = true;
                translateBtn.disabled = true;
            }

            function copyText() {
                if (!extractedText) return;
                
                navigator.clipboard.writeText(resultText.textContent).then(() => {
                    showNotification('Text copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    showNotification('Failed to copy text');
                });
            }

            function downloadText() {
                if (!extractedText) return;
                
                const blob = new Blob([resultText.textContent], { type: 'text/plain' });
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
                translateBtn.disabled = true;
                translateResult.style.display = 'none';
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
