// ==========================================
// INITIALIZATION
// ==========================================
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Set default theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Theme Toggle Logic
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

themeToggle.addEventListener('click', toggleTheme);

// ==========================================
// DOM ELEMENTS
// ==========================================
const mainInput = document.getElementById('mainInput');
const mainOutput = document.getElementById('mainOutput');
const outputWrapper = document.getElementById('outputWrapper');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const conversionSpeed = document.getElementById('conversionSpeed');
const copyText = document.getElementById('copyText');
const copyIcon = document.getElementById('copyIcon');
const checkIcon = document.getElementById('checkIcon');
const modeSlider = document.getElementById('modeSlider');
const btnBnToEn = document.getElementById('btnBnToEn');
const btnEnToBn = document.getElementById('btnEnToBn');
const inputLabelText = document.getElementById('inputLabelText');
const outputLabelText = document.getElementById('outputLabelText');

let currentMode = 'bn-to-en';
const placeholderText = 'Your conversion will appear here...';

// ==========================================
// CONVERSION LOGIC
// ==========================================

// Mapping using Unicode Escapes to prevent encoding issues
const bnToEnMap = {
  // Vowels
  '\u0985': 'o', '\u0986': 'a', '\u0987': 'i', '\u0988': 'i', 
  '\u0989': 'u', '\u098A': 'u', '\u098B': 'ri', '\u098F': 'e', 
  '\u0990': 'oi', '\u0993': 'o', '\u0994': 'ou',
  // Vowel Signs (Kars)
  '\u09BE': 'a', '\u09BF': 'i', '\u09C0': 'i', '\u09C1': 'u', 
  '\u09C2': 'u', '\u09C3': 'ri', '\u09C7': 'e', '\u09C8': 'oi', 
  '\u09CB': 'o', '\u09CC': 'ou',
  // Consonants
  '\u0995': 'k', '\u0996': 'kh', '\u0997': 'g', '\u0998': 'gh', '\u0999': 'ng',
  '\u099A': 'ch', '\u099B': 'ch', '\u099C': 'j', '\u099D': 'jh', '\u099E': 'n',
  '\u099F': 't', '\u09A0': 'th', '\u09A1': 'd', '\u09A2': 'dh', '\u09A3': 'n',
  '\u09A4': 't', '\u09A5': 'th', '\u09A6': 'd', '\u09A7': 'dh', '\u09A8': 'n',
  '\u09AA': 'p', '\u09AB': 'f', '\u09AC': 'b', '\u09AD': 'v', '\u09AE': 'm',
  '\u09AF': 'j', '\u09B0': 'r', '\u09B2': 'l', 
  '\u09B6': 's', '\u09B7': 's', '\u09B8': 's', '\u09B9': 'h',
  // Others
  '\u09DC': 'r', '\u09DD': 'r', '\u09DF': 'y', '\u09CE': 't',
  '\u0982': 'ng', '\u0983': 'h', '\u0981': '', '\u09CD': '', '\u09BC': '',
  '\u0964': '.'
};

function convertBanglaToBanglish(input) {
  if (!input) return '';
  
  // Normalize to NFC to handle decomposed characters
  let text = input.normalize('NFC');
  let output = '';
  let i = 0;

  while (i < text.length) {
    let char = text[i];
    
    // Handle Ya-phala (্য) - Skip Hasant logic for simplicity or add specific logic
    // Basic mapping approach:
    if (bnToEnMap[char] !== undefined) {
      output += bnToEnMap[char];
    } else {
      output += char;
    }
    i++;
  }

  // Post-processing cleanup
  let finalOutput = output
    .replace(/aa/g, 'a')
    .replace(/ii/g, 'i')
    .replace(/uu/g, 'u')
    .replace(/oo/g, 'o')
    .replace(/jnj/g, 'jonno')
    .replace(/valbasi/g, 'valobasi');

  if (finalOutput.length > 0) {
    finalOutput = finalOutput.charAt(0).toUpperCase() + finalOutput.slice(1).toLowerCase();
  }
  return finalOutput;
}

// Banglish to Bangla Logic
function convertBanglishToBangla(text) {
  const consMap = {
      'khy': 'খ্য', 'khh': 'ক্ষ', 'sh': 'শ', 'Sh': 'ষ', 'kh': 'খ', 'gh': 'ঘ', 
      'chh': 'ছ', 'ch': 'ছ', 'jh': 'ঝ', 'ng': 'ঙ', 'Th': 'ঠ', 'Dh': 'ঢ', 
      'th': 'থ', 'dh': 'ধ', 'ph': 'ফ', 'bh': 'ভ', 'Rh': 'ঢ়', 
      'k': 'ক', 'g': 'গ', 'c': 'চ', 'j': 'জ', 'T': 'ট', 'D': 'ড', 
      'N': 'ণ', 't': 'ত', 'd': 'দ', 'n': 'ন', 'p': 'প', 'f': 'ফ', 
      'b': 'ব', 'v': 'ভ', 'm': 'ম', 'z': 'য', 'r': 'র', 'l': 'ল', 
      'R': 'ড়', 's': 'স', 'h': 'হ', 'y': 'য়', 'Y': 'য'
  };

  const vowelMap = { 'a': 'আ', 'i': 'ই', 'u': 'উ', 'e': 'এ', 'o': 'ও', 'aa': 'আ', 'ii': 'ঈ', 'uu': 'ঊ', 'ee': 'ঈ', 'oo': 'ও', 'oi': 'ঐ', 'ou': 'ঔ' };
  const karMap = { 'a': 'া', 'i': 'ি', 'u': 'ু', 'e': 'ে', 'o': 'ো', 'aa': 'া', 'ii': 'ী', 'uu': 'ূ', 'ee': 'ী', 'oo': 'ো', 'oi': 'ৈ', 'ou': 'ৌ' };

  let result = '';
  let i = 0;
  let prevWasConsonant = false;

  while (i < text.length) {
    if (/\s|\d|[.,!?;:'"()]/.test(text[i])) {
      result += text[i];
      prevWasConsonant = false;
      i++;
      continue;
    }

    let sub3 = text.substring(i, i + 3);
    let sub2 = text.substring(i, i + 2);
    let sub1 = text[i];

    // Consonants
    if (consMap[sub3]) { result += consMap[sub3]; i += 3; prevWasConsonant = true; continue; }
    if (consMap[sub2]) { result += consMap[sub2]; i += 2; prevWasConsonant = true; continue; }
    if (consMap[sub1]) { result += consMap[sub1]; i += 1; prevWasConsonant = true; continue; }

    // Vowels
    let vowelMatch = '';
    if (vowelMap[sub2]) vowelMatch = sub2;
    else if (vowelMap[sub1]) vowelMatch = sub1;

    if (vowelMatch) {
        if (prevWasConsonant) result += karMap[vowelMatch];
        else result += vowelMap[vowelMatch];
        i += vowelMatch.length;
        prevWasConsonant = false;
        continue;
    }

    result += sub1;
    i++;
    prevWasConsonant = false;
  }
  return result;
}

// ==========================================
// FONT & UI LOGIC
// ==========================================

function setMode(mode) {
  currentMode = mode;
  mainInput.value = '';
  mainOutput.innerHTML = '<span class="output-placeholder">' + placeholderText + '</span>';
  outputWrapper.classList.remove('has-content');
  copyBtn.disabled = true;
  clearBtn.classList.remove('visible');
  
  if (mode === 'bn-to-en') {
    // UI State
    modeSlider.classList.remove('right');
    btnBnToEn.classList.add('active');
    btnEnToBn.classList.remove('active');
    inputLabelText.textContent = 'Type Bangla';
    outputLabelText.textContent = 'Banglish Result';
    mainInput.placeholder = 'আমার সোনার বাংলা...';

    // Font Switching Logic
    mainInput.classList.remove('font-english');
    mainInput.classList.add('font-bangla');
    mainOutput.classList.remove('font-bangla');
    mainOutput.classList.add('font-english');

  } else {
    // UI State
    modeSlider.classList.add('right');
    btnBnToEn.classList.remove('active');
    btnEnToBn.classList.add('active');
    inputLabelText.textContent = 'Type Banglish';
    outputLabelText.textContent = 'Bangla Result';
    mainInput.placeholder = 'Amar sonar Bangla...';

    // Font Switching Logic
    mainInput.classList.remove('font-bangla');
    mainInput.classList.add('font-english');
    mainOutput.classList.remove('font-english');
    mainOutput.classList.add('font-bangla');
  }
  updateStats('', performance.now());
}

function handleInput() {
  const startTime = performance.now();
  const input = mainInput.value;
  clearBtn.classList.toggle('visible', input.length > 0);

  if (!input) {
    mainOutput.innerHTML = '<span class="output-placeholder">' + placeholderText + '</span>';
    outputWrapper.classList.remove('has-content');
    copyBtn.disabled = true;
    updateStats('', startTime);
    return;
  }

  let result = '';
  if (currentMode === 'bn-to-en') {
    result = convertBanglaToBanglish(input);
  } else {
    result = convertBanglishToBangla(input);
  }

  mainOutput.textContent = result;
  outputWrapper.classList.add('has-content');
  copyBtn.disabled = false;
  updateStats(input, startTime);
}

function updateStats(text, startTime) {
  const endTime = performance.now();
  charCount.textContent = text.length;
  wordCount.textContent = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  conversionSpeed.textContent = Math.round(endTime - startTime) + 'ms';
}

function copyResult() {
  const text = mainOutput.textContent;
  if (!text || text === placeholderText) return;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.classList.add('copied');
    copyIcon.style.display = 'none';
    checkIcon.style.display = 'block';
    copyText.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyIcon.style.display = 'block';
      checkIcon.style.display = 'none';
      copyText.textContent = 'Copy Result';
    }, 2000);
  });
}

function clearInput() {
  mainInput.value = '';
  mainOutput.innerHTML = '<span class="output-placeholder">' + placeholderText + '</span>';
  outputWrapper.classList.remove('has-content');
  copyBtn.disabled = true;
  clearBtn.classList.remove('visible');
  updateStats('', performance.now());
  mainInput.focus();
}

// Event Listeners
mainInput.addEventListener('input', handleInput);
copyBtn.addEventListener('click', copyResult);
clearBtn.addEventListener('click', clearInput);

btnBnToEn.addEventListener('click', () => setMode('bn-to-en'));
btnEnToBn.addEventListener('click', () => setMode('en-to-bn'));

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (!copyBtn.disabled) copyResult();
  }
  if (e.key === 'Escape' && mainInput.value) clearInput();
});

// Initialize
setMode('bn-to-en');