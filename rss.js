	
		
        function fetchLatestPosts() {
            const blogUrl = 'https://gsmsanjoy.blogspot.com/feeds/posts/default?alt=json-in-script&callback=handleBlogPosts';
            let script = document.createElement('script');
            script.src = blogUrl;
            document.body.appendChild(script);
        }

        function handleBlogPosts(data) {
            try {
                let posts = data.feed.entry;
                let marqueeContainer = document.querySelector('.marquee-container');
                marqueeContainer.innerHTML = '';  // Clear loading message
                
                posts.slice(0, 10).forEach(post => {
                    let title = post.title.$t;
                    let link = post.link.find(l => l.rel === 'alternate').href;
                    let postElement = document.createElement('div');
                    postElement.classList.add('post-container');
                    postElement.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
                    marqueeContainer.appendChild(postElement);
                });
            } catch (error) {
                console.error('Error processing posts:', error);
                document.querySelector('.marquee-container').innerHTML = '<div class="post-container">Failed to load posts</div>';
            }
        }
        
        fetchLatestPosts();		