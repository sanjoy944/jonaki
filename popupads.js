 // List of ad URLs
        const adUrls = [
            {
                base: "//encampmentgreyestdesiring.",
                path: "monster/Aprh27ffd7d591b1d5bf0bd06bc4be178e89655898300?file+download"
            },
            {
                fullUrl: "//zqvee2re50mr.com/zx441jd6z?key=d0dd9610d6ea49c1a6e6a513a3d08d22"
            }
        ];

        // Random ad selector
        function getRandomAdUrl() {
            const randomIndex = Math.floor(Math.random() * adUrls.length);
            const ad = adUrls[randomIndex];
            
            if (ad.fullUrl) {
                return ad.fullUrl;
            } else {
                return `${ad.base}${ad.path}?title=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`;
            }
        }

        let clickedLink = null;

        function showPopup(event) {
            event.preventDefault();
            clickedLink = event.currentTarget.href;
            document.getElementById('popupOverlay').style.display = 'block';
            
            const adIframe = document.getElementById('adIframe');
            adIframe.src = getRandomAdUrl();
        }

        function closePopupAndNavigate() {
            document.getElementById('popupOverlay').style.display = 'none';
            if (clickedLink) window.location.href = clickedLink;
        }

        document.addEventListener('DOMContentLoaded', function() {
            const links = document.querySelectorAll('a:not(.no-popup)');
            links.forEach(link => link.addEventListener('click', showPopup));
            document.getElementById('closePopup').addEventListener('click', closePopupAndNavigate);
            document.getElementById('popupOverlay').addEventListener('click', function(e) {
                if (e.target === this) closePopupAndNavigate();
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === "Escape") closePopupAndNavigate();
            });
        });