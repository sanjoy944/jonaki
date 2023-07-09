const urlInput = document.getElementById('url');
const downloadBtn = document.getElementById('download-btn');
const thumbnailContainer = document.getElementById('thumbnail-container');

function generateThumbnailUrl(videoId, format) {
  return `https://img.youtube.com/vi/${videoId}/${format}.jpg`;
}

function downloadThumbnail(url) {
  window.open(url, '_blank');
}

downloadBtn.addEventListener('click', () => {
  const videoUrl = urlInput.value;
  const videoId = videoUrl.split('v=')[1];
  
  if (!videoId) {
    alert('Invalid YouTube video URL');
    return;
  }
  
  const thumbnailFormats = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  thumbnailContainer.innerHTML = '';

  thumbnailFormats.forEach((format) => {
    const thumbnailUrl = generateThumbnailUrl(videoId, format);
    const thumbnailItem = document.createElement('div');
    thumbnailItem.classList.add('thumbnail-item');

    const thumbnailImg = document.createElement('img');
    thumbnailImg.classList.add('thumbnail-img');
    thumbnailImg.src = thumbnailUrl;

    const thumbnailLabel = document.createElement('div');
    thumbnailLabel.classList.add('thumbnail-label');
    thumbnailLabel.textContent = format;

    const downloadLink = document.createElement('a');
    downloadLink.classList.add('download-link');
    downloadLink.href = thumbnailUrl;
    downloadLink.download = `${videoId}_${format}.jpg`;
    downloadLink.textContent = 'Download';
    downloadLink.addEventListener('click', (e) => {
      e.preventDefault();
      downloadThumbnail(thumbnailUrl);
    });

    thumbnailItem.appendChild(thumbnailImg);
    thumbnailItem.appendChild(thumbnailLabel);
    thumbnailItem.appendChild(downloadLink);
    thumbnailContainer.appendChild(thumbnailItem);
  });
});