 // Initialize variables first
    let ageLanguage = 'en';
    let calculatedResult = { years: 0, months: 0, days: 0, totalMonths: 0, totalWeeks: 0, totalDays: 0, totalHours: 0 };

    // Translations
    const translations = {
      bn: {
        title: 'বয়স ক্যালকুলেটর',
        birthLbl: 'জন্ম তারিখ (দিন/মাস/বছর)',
        btn: 'বয়স হিসাব করুন',
        resultLbl: 'আপনার ফলাফল',
        copy: 'ফলাফল কপি করুন',
        copied: 'কপি করা হয়েছে!',
        error: 'দয়া করে সঠিক তারিখ দিন!',
        years: 'বছর',
        months: 'মাস',
        days: 'দিন',
        totalMonths: 'মোট মাস',
        totalWeeks: 'মোট সপ্তাহ',
        totalDays: 'মোট দিন',
        totalHours: 'মোট ঘন্টা'
      },
      en: {
        title: 'Age Calculator',
        birthLbl: 'Date of Birth (dd/mm/yyyy)',
        btn: 'Calculate Age',
        resultLbl: 'Your Result',
        copy: 'Copy Result',
        copied: 'Copied!',
        error: 'Please enter a valid date!',
        years: 'Years',
        months: 'Months',
        days: 'Days',
        totalMonths: 'Total Months',
        totalWeeks: 'Total Weeks',
        totalDays: 'Total Days',
        totalHours: 'Total Hours'
      }
    };

    // Create floating particles
    function createParticles() {
      const container = document.getElementById('particles');
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const colors = isLight 
        ? ['rgba(13, 148, 136, 0.2)', 'rgba(59, 130, 246, 0.15)', 'rgba(139, 92, 246, 0.15)'] 
        : ['rgba(20, 184, 166, 0.15)', 'rgba(59, 130, 246, 0.12)', 'rgba(139, 92, 246, 0.1)'];
      
      container.innerHTML = ''; 
      
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${Math.random() * 8 + 4}px;
          height: ${Math.random() * 8 + 4}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-delay: ${Math.random() * 5}s;
          animation-duration: ${15 + Math.random() * 10}s;
        `;
        container.appendChild(particle);
      }
    }

    // Convert numbers to Bengali
    function toBengaliNum(num) {
      if (ageLanguage === 'en') return num.toString();
      const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return num.toString().replace(/[0-9]/g, d => bengaliDigits[parseInt(d)]);
    }

    // Show toast notification
    function showToast(message, type = 'error') {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      
      toast.className = 'toast ' + type;
      toastText.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // Theme Toggle
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      if (newTheme === 'dark') {
        html.removeAttribute('data-theme');
      } else {
        html.setAttribute('data-theme', 'light');
      }
      
      localStorage.setItem('theme', newTheme);
      createParticles(); 
    }

    // Initialize Theme
    function initTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      createParticles();
    }

    // Switch language
    function switchAgeLang(lang) {
      ageLanguage = lang;
      
      document.getElementById('lang-bn').classList.toggle('active', lang === 'bn');
      document.getElementById('lang-en').classList.toggle('active', lang === 'en');
      
      const t = translations[lang];
      document.getElementById('title-text').textContent = t.title;
      document.getElementById('lbl-birth').textContent = t.birthLbl;
      document.getElementById('btn-text').textContent = t.btn;
      document.getElementById('lbl-result').textContent = t.resultLbl;
      document.getElementById('copy-text').textContent = t.copy;
      document.getElementById('pill-years-label').textContent = t.years;
      document.getElementById('pill-months-label').textContent = t.months;
      document.getElementById('pill-days-label').textContent = t.days;
      
      document.getElementById('stat-total-months').textContent = t.totalMonths;
      document.getElementById('stat-total-weeks').textContent = t.totalWeeks;
      document.getElementById('stat-days').textContent = t.totalDays;
      document.getElementById('stat-hours').textContent = t.totalHours;
      
      if (document.getElementById('resultBox').style.display !== 'none' && calculatedResult.totalDays > 0) {
        updateResultDisplay();
      }
    }

    // --- Fast Date Input Logic ---
    const dateInput = document.getElementById('birthDate');

    // Auto-formatting (dd/mm/yyyy)
    dateInput.addEventListener('input', function (e) {
      let input = e.target.value.replace(/\D/g, ''); // Remove non-digits
      let formatted = '';
      
      // Format logic: dd/mm/yyyy
      if (input.length > 0) {
        formatted = input.substring(0, 2); // Day
      }
      if (input.length >= 2) {
        formatted += '/';
      }
      if (input.length > 2) {
        formatted += input.substring(2, 4); // Month
      }
      if (input.length >= 4) {
        formatted += '/';
      }
      if (input.length > 4) {
        formatted += input.substring(4, 8); // Year
      }
      
      e.target.value = formatted;
    });

    // Enter Key Trigger
    dateInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission if in a form
        calculateAge();
      }
    });

    // Parse date string (dd/mm/yyyy or dd/mm/yy)
    function parseDate(dateStr) {
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;

        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);

        // Handle 2-digit year (fast entry)
        if (year < 100) {
            const currentYear = new Date().getFullYear();
            const cutoff = currentYear - 2000 + 10; // e.g., in 2024, cutoff is 34. 25 -> 2025, 50 -> 1950
            if (year <= cutoff) {
                year += 2000;
            } else {
                year += 1900;
            }
        }

        // Basic validation
        if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
        
        // Month is 0-indexed in JS
        return new Date(year, month - 1, day);
    }

    // Calculate age
    function calculateAge() {
      const birthDateValue = document.getElementById('birthDate').value;
      const t = translations[ageLanguage];
      
      if (!birthDateValue || birthDateValue.length < 6) { // Allow dd/mm/yy (8 chars) or dd/mm/yyyy (10 chars)
        showToast(t.error, 'error');
        return;
      }
      
      const birthDate = parseDate(birthDateValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

      // Validate date object
      if (!birthDate || birthDate > today) {
        showToast(t.error, 'error');
        return;
      }
      
      // Calculate years, months, days
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();
      
      if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Calculate totals
      const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = (years * 12) + months;
      const totalHours = totalDays * 24;
      
      // Store results
      calculatedResult = { years, months, days, totalMonths, totalWeeks, totalDays, totalHours };
      
      // Show result
      updateResultDisplay();
      document.getElementById('resultBox').style.display = 'block';
    }

    // Update result display
    function updateResultDisplay() {
      const { years, months, days, totalMonths, totalWeeks, totalDays, totalHours } = calculatedResult;
      
      document.getElementById('pill-years').textContent = toBengaliNum(years);
      document.getElementById('pill-months').textContent = toBengaliNum(months);
      document.getElementById('pill-days').textContent = toBengaliNum(days);
      
      document.getElementById('val-total-months').textContent = toBengaliNum(totalMonths.toLocaleString());
      document.getElementById('val-total-weeks').textContent = toBengaliNum(totalWeeks.toLocaleString());
      document.getElementById('val-days').textContent = toBengaliNum(totalDays.toLocaleString());
      document.getElementById('val-hours').textContent = toBengaliNum(totalHours.toLocaleString());
    }

    // Copy result
    function copyResult() {
      const t = translations[ageLanguage];
      const { years, months, days, totalMonths, totalWeeks, totalDays, totalHours } = calculatedResult;
      
      let resultText = '';
      if (ageLanguage === 'bn') {
        resultText = `${toBengaliNum(years)} বছর, ${toBengaliNum(months)} মাস, ${toBengaliNum(days)} দিন\n`;
        resultText += `মোট মাস: ${toBengaliNum(totalMonths.toLocaleString())}\n`;
        resultText += `মোট সপ্তাহ: ${toBengaliNum(totalWeeks.toLocaleString())}\n`;
        resultText += `মোট দিন: ${toBengaliNum(totalDays.toLocaleString())}\n`;
        resultText += `মোট ঘন্টা: ${toBengaliNum(totalHours.toLocaleString())}`;
      } else {
        resultText = `${years} Years, ${months} Months, ${days} Days\n`;
        resultText += `Total Months: ${totalMonths.toLocaleString()}\n`;
        resultText += `Total Weeks: ${totalWeeks.toLocaleString()}\n`;
        resultText += `Total Days: ${totalDays.toLocaleString()}\n`;
        resultText += `Total Hours: ${totalHours.toLocaleString()}`;
      }
      
      navigator.clipboard.writeText(resultText).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const copyText = document.getElementById('copy-text');
        
        copyBtn.classList.add('copied');
        copyText.textContent = t.copied;
        
        showToast(t.copied, 'success');
        
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyText.textContent = t.copy;
        }, 2000);
      }).catch(() => {
        showToast(ageLanguage === 'bn' ? 'কপি করতে ব্যর্থ হয়েছে!' : 'Failed to copy!', 'error');
      });
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', function() {
      initTheme();
      switchAgeLang('en'); // Set initial language
    });