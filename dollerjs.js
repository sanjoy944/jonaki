 // --- Variables & Config ---
        let currLiveRateValue = null;
        let currLanguage = "en";

        const currTranslations = {
            bn: {
                title: "<i class='fa-solid fa-money-bill-transfer'></i> ডলার ⇄ টাকা কনভার্টার",
                type: "<i class='fa-solid fa-layer-group'></i> ধরন:",
                amount: "<i class='fa-solid fa-calculator'></i> পরিমাণ:",
                btn: "কনভার্ট",
                live: "<span class='pulse-icon' style='display:inline-block; margin-right:10px;'></span> আজকের লাইভ ডলার রেট:",
                res: "<i class='fa-solid fa-square-poll-vertical'></i> ফলাফল:",
                copy: "কপি",
                copied: "কপি হয়েছে!",
                loading: "লোড হচ্ছে...",
                error: "রেট লোড করা যায়নি!",
                unitTaka: " টাকা ",
                unitPoisha: " পয়সা।",
                unitDollar: " ডলার।",
                optUsd: "ডলার ➔ টাকা",
                optBdt: "টাকা ➔ ডলার",
                valError: "বৈধ পরিমাণ লিখুন!",
                usdLabel: "১ ডলার"
            },
            en: {
                title: "<i class='fa-solid fa-money-bill-transfer'></i> Dollar ⇄ Taka Converter",
                type: "<i class='fa-solid fa-layer-group'></i> Type:",
                amount: "<i class='fa-solid fa-calculator'></i> Amount:",
                btn: "Convert",
                live: "<span class='pulse-icon' style='display:inline-block; margin-right:10px;'></span> Today's Live Exchange Rate:",
                res: "<i class='fa-solid fa-square-poll-vertical'></i> Result:",
                copy: "Copy",
                copied: "Copied!",
                loading: "Loading...",
                error: "Rate Load Failed!",
                unitTaka: " Taka ",
                unitPoisha: " Poisha.",
                unitDollar: " Dollar.",
                optUsd: "USD → BDT",
                optBdt: "BDT → USD",
                valError: "Enter valid amount!",
                usdLabel: "1 USD"
            }
        };

        // --- Theme Logic ---
        function toggleTheme() {
            const html = document.documentElement;
            const icon = document.getElementById('theme-icon');
            
            if (html.getAttribute('data-theme') === 'light') {
                html.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                html.setAttribute('data-theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }

        // --- Utility Functions ---
        function formatLangNum(num) {
            if (currLanguage === "en") return num.toString();
            const bengaliDigits = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
            return num.toString().replace(/[0-9]/g, d => bengaliDigits[d]);
        }

        // --- Core Functions ---
        function switchCurrLang(lang) {
            currLanguage = lang;
            document.getElementById("lang-bn").classList.toggle("active", lang === "bn");
            document.getElementById("lang-en").classList.toggle("active", lang === "en");

            const t = currTranslations[lang];
            document.getElementById("curr-title").innerHTML = t.title;
            document.getElementById("lbl-type").innerHTML = t.type;
            document.getElementById("lbl-amount").innerHTML = t.amount;
            document.getElementById("btn-text").innerText = t.btn;
            document.getElementById("lbl-live").innerHTML = t.live;
            document.getElementById("lbl-res").innerHTML = t.res;
            document.getElementById("copy-text").innerText = t.copy;
            document.getElementById("opt-usd-bdt").innerText = t.optUsd;
            document.getElementById("opt-bdt-usd").innerText = t.optBdt;

            if (currLiveRateValue) {
                updateLiveRateDisplay();
                convertCurrency();
            } else {
                document.getElementById("currLiveRate").innerText = t.loading;
            }
        }

        async function loadLiveCurrency() {
            const rateDisplay = document.getElementById("currLiveRate");
            const t = currTranslations[currLanguage];
            
            try {
                rateDisplay.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${t.loading}`;
                const response = await fetch("https://open.er-api.com/v6/latest/USD");
                const data = await response.json();
                
                if (data && data.rates && data.rates.BDT) {
                    currLiveRateValue = data.rates.BDT;
                    updateLiveRateDisplay();
                } else {
                    throw new Error("Invalid data");
                }
            } catch (error) {
                console.error("Error loading rate:", error);
                rateDisplay.innerHTML = `<span style="color: var(--error);"><i class="fa-solid fa-exclamation-triangle"></i> ${t.error}</span>`;
            }
        }

        function updateLiveRateDisplay() {
            const t = currTranslations[currLanguage];
            const rate = currLiveRateValue;
            const takaPart = Math.floor(rate);
            const poishaPart = Math.round((rate - takaPart) * 100);
            document.getElementById("currLiveRate").innerHTML = 
                `${t.usdLabel} = <span style="font-weight:900;">${formatLangNum(takaPart)}</span>${t.unitTaka}<span style="font-weight:900;">${formatLangNum(poishaPart)}</span>${t.unitPoisha}`;
        }

        // Real-time conversion
        function convertCurrency() {
            const amountInput = document.getElementById("currAmount").value;
            const amount = parseFloat(amountInput);
            const direction = document.getElementById("currDirection").value;
            const resultDisplay = document.getElementById("currResult");
            const t = currTranslations[currLanguage];

            if (!amountInput || amountInput.trim() === "" || isNaN(amount) || amount <= 0) {
                resultDisplay.style.opacity = '0.5';
                resultDisplay.innerText = "--";
                return;
            }

            if (!currLiveRateValue) {
                resultDisplay.innerHTML = `<span style="font-size:1rem; color:var(--error);">${t.error}</span>`;
                return;
            }

            let result = "";
            if (direction === "usd-bdt") {
                const totalTaka = amount * currLiveRateValue;
                const takaPart = Math.floor(totalTaka);
                const poishaPart = Math.round((totalTaka - takaPart) * 100);
                result = `<span style="color:var(--accent)">${formatLangNum(takaPart.toLocaleString())}</span>${t.unitTaka}<span style="color:var(--accent)">${formatLangNum(poishaPart)}</span>${t.unitPoisha}`;
            } else {
                const totalDollar = amount / currLiveRateValue;
                result = `<span style="color:var(--accent)">${formatLangNum(totalDollar.toFixed(2))}</span>${t.unitDollar}`;
            }
            
            resultDisplay.style.opacity = '1';
            resultDisplay.innerHTML = result;
        }

        function copyCurrResult() {
            const result = document.getElementById("currResult").innerText;
            const copyBtnText = document.getElementById("copy-text");
            const t = currTranslations[currLanguage];

            if (result === "--" || result.includes("Error") || result.includes("দয়া") || result.includes("Please")) return;

            navigator.clipboard.writeText(result).then(() => {
                const original = copyBtnText.innerText;
                copyBtnText.innerText = t.copied;
                setTimeout(() => copyBtnText.innerText = original, 1500);
            });
        }

        // --- Init ---
        document.addEventListener("DOMContentLoaded", () => {
            loadLiveCurrency();
            document.getElementById("currDirection").addEventListener('change', convertCurrency);
        });