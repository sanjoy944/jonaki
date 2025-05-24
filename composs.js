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
            const notification = document.getElementById('notification');
            const qualityAuto = document.getElementById('qualityAuto');
            const qualityHigh = document.getElementById('qualityHigh');
            const qualityLow = document.getElementById('qualityLow');

            let selectedFile = null;
            let extractedText = '';
            let currentQuality = 'auto';

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
            
            qualityAuto.addEventListener('click', () => setQuality('auto'));
            qualityHigh.addEventListener('click', () => setQuality('high'));
            qualityLow.addEventListener('click', () => setQuality('low'));

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
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(file.type)) {
                    showNotification('Please upload a valid image file (JPG, PNG)');
                    return;
                }
                
                // Check file size (10MB max)
                if (file.size > 10 * 1024 * 1024) {
                    showNotification('File size ১০MB এর বেশি হতে পারবে না');
                    return;
                }
                
                selectedFile = file;
                processBtn.disabled = false;
                
                // Show preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    imagePreviewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
                
                showNotification('Image ready for processing');
            }

            function setQuality(quality) {
                currentQuality = quality;
                
                // Update active button
                qualityAuto.classList.remove('active');
                qualityHigh.classList.remove('active');
                qualityLow.classList.remove('active');
                
                if (quality === 'auto') qualityAuto.classList.add('active');
                if (quality === 'high') qualityHigh.classList.add('active');
                if (quality === 'low') qualityLow.classList.add('active');
            }

            function processImage() {
                if (!selectedFile) return;
                
                progressContainer.style.display = 'block';
                progressBar.style.width = '0%';
                progressText.textContent = 'Initializing OCR engine...';
                
                const language = languageSelect.value;
                
                // Configure based on quality setting
                let config = {
                    logger: m => updateProgress(m),
                    tessedit_pageseg_mode: currentQuality === 'high' ? 6 : (currentQuality === 'low' ? 11 : 3),
                    tessedit_char_whitelist: language === 'ben' ? 
                        'ংঃঅআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়০১২৩৪৫৬৭৮৯' : ''
                };
                
                Tesseract.recognize(selectedFile, language, config)
                    .then(({ data: { text } }) => {
                        extractedText = cleanBanglaText(text);
                        resultText.textContent = extractedText;
                        progressText.textContent = 'Text Converted successfully!';
                        
                        // Enable result buttons
                        copyBtn.disabled = false;
                        downloadBtn.disabled = false;
                        clearBtn.disabled = false;
                        
                        showNotification('Bangla text Converted successfully');
                    }).catch(err => {
                        console.error(err);
                        progressText.textContent = 'Error processing image';
                        showNotification('Error: Failed to Converte text');
                    });
            }

            function cleanBanglaText(text) {
                // Common OCR errors in Bangla and their corrections
                const replacements = {
                    'o5': 'ো',
                    '33': 'ৃ',
                    'A': 'আ',
                    'T': 'ট',
                    'R': 'র',
                    'e': 'ে',
                    'S': 'স',
                    'W': 'ও',
                    'N': 'ন',
                    'f': 'ফ',
                    'y': 'য়',
                    'i': 'ি',
                    'u': 'ু',
                    'r': '্র',
                    'g': 'গ',
                    'a': 'া',
                    'n': 'ন',
                    'm': 'ম',
                    'd': 'দ',
                    'h': 'হ',
                    'k': 'ক',
                    'l': 'ল',
                    'b': 'ব',
                    'v': 'ভ',
                    's': 'স',
                    'p': 'প',
                    't': 'ত',
                    'c': 'চ',
                    'j': 'জ',
                    '0': '০',
                    '1': '১',
                    '2': '২',
                    '3': '৩',
                    '4': '৪',
                    '5': '৫',
                    '6': '৬',
                    '7': '৭',
                    '8': '৮',
                    '9': '৯'
                };
                
                // Apply replacements
                let cleanedText = text;
                for (const [key, value] of Object.entries(replacements)) {
                    cleanedText = cleanedText.replace(new RegExp(key, 'g'), value);
                }
                
                // Fix common joined characters
                cleanedText = cleanedText.replace(/([ক-হ])([া-ৌ])/g, '$1$2');
                cleanedText = cleanedText.replace(/([ক-হ])([়-ৄ])/g, '$1$2');
                
                // Remove unwanted spaces before punctuation
                cleanedText = cleanedText.replace(/\s+([।,])/g, '$1');
                
                return cleanedText;
            }

            function updateProgress(m) {
                if (m.status === 'recognizing text') {
                    const percent = Math.round(m.progress * 100);
                    progressBar.style.width = `${percent}%`;
                    progressText.textContent = `Processing: ${percent}%`;
                    
                    // Special handling for Bangla to show more descriptive status
                    if (languageSelect.value === 'ben' || languageSelect.value === 'ben+eng') {
                        if (percent < 30) {
                            progressText.textContent = `Detecting Bangla text... ${percent}%`;
                        } else if (percent < 70) {
                            progressText.textContent = `Analyzing Bangla text... ${percent}%`;
                        } else {
                            progressText.textContent = `Processing Bangla text... ${percent}%`;
                        }
                    }
                } else {
                    progressText.textContent = m.status;
                }
            }

            function resetTool() {
                fileInput.value = '';
                selectedFile = null;
                processBtn.disabled = true;
                resultText.textContent = 'এখানে টেক্সট দেখানো হবে...';
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
                    showNotification('টেক্সট কপি করা হয়েছে!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    showNotification('Failed to টেক্সট কপি');
                });
            }

            function downloadText() {
                if (!extractedText) return;
                
                const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'bangla_text.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showNotification('টেক্সট Download successfully');
            }

            function clearText() {
                extractedText = '';
                resultText.textContent = 'এখানে টেক্সট দেখানো হবে...';
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
        });