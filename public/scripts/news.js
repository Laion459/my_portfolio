

document.addEventListener('DOMContentLoaded', () => {
    // API keys for News and Pixabay
    const apiKeyNews = '08e6626ab5cb47c2a30a50f8a3f0f655';
    const apiKeyPixabay = '44406953-b12875b762946141c88d640e0';
    // Get the container element for the news articles
    const newsContainer = document.getElementById('news-container');
    // Array to keep track of used images to prevent duplication
    const usedImages = [];

    // Function to truncate text if it exceeds the maximum length
    function truncateText(text, maxLength) {
        // If text is available and longer than maxLength, truncate it and add '...'
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        // Otherwise, return the original text
        return text;
    }

    // Asynchronous function to get an image from Pixabay based on the news title
    async function getPixabayImage(query) {
        // Limit the search query to 88 characters
        const queryLimited = query.length > 88 ? query.substring(0, 88) : query;

        // Attempt to fetch an image 2 times: first with the limited query, then with 'technology'
        for (let tentativas = 0; tentativas < 2; tentativas++) {
            // Construct the search query based on attempts
            const searchQuery = tentativas === 0 ? queryLimited : 'technology';
            // Fetch image data from Pixabay API
            const response = await fetch(`https://pixabay.com/api/?key=${apiKeyPixabay}&q=${encodeURIComponent(searchQuery)}&image_type=photo`);
            const data = await response.json();

            // If images are found, iterate through them and return the first unused image
            if (data.hits.length > 0) {
                for (const hit of data.hits) {
                    if (!usedImages.includes(hit.webformatURL)) {
                        usedImages.push(hit.webformatURL);
                        return hit.webformatURL;
                    }
                }
            }
        }

        // If no image is found, use a placeholder image
        return 'https://via.placeholder.com/600x400?text=Imagem+Indispon%C3%ADvel';
    }

    // Function to show the loading GIF
    function showLoadingGif() {
        const loadingGif = document.createElement('img');
        loadingGif.src = 'img/gifs/conecting.gif'; // Path to your GIF
        loadingGif.classList.add('loading-gif'); // Add a class for styling

        // Style the loading GIF (you can customize this)
        loadingGif.style.position = 'fixed';
        loadingGif.style.top = '60%';
        loadingGif.style.left = '50%';
        loadingGif.style.borderRadius = '15%';
        loadingGif.style.transform = 'translate(-50%, -50%)';
        loadingGif.style.zIndex = '9999';
        loadingGif.style.width = '800px';
        loadingGif.style.height = '450px';


        // Append the loading GIF to the body
        document.body.appendChild(loadingGif);
    }

    // Function to hide the loading GIF
    function hideLoadingGif() {
        const loadingGif = document.querySelector('.loading-gif');
        if (loadingGif) {
            document.body.removeChild(loadingGif);
        }
    }

    // Show the loading GIF before fetching news data
    showLoadingGif();

    fetch(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKeyNews}`)
        .then(response => response.json())
        .then(async (data) => {
            // If the request is successful
            if (data.status === 'ok') {
                // Clear the content of the news container before adding new articles
                newsContainer.innerHTML = '';

                // Variable to store the HTML for all news articles
                let newsHTML = '';

                // Iterate through each news article
                for (const article of data.articles) {
                    // Get an image for the news article
                    const imageUrl = await getPixabayImage(article.title);

                    // Create the HTML for the news article
                    const articleElement = `
            <div class="news-card bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out dark:bg-gray-800">
              <a href="${article.url}" target="_blank">
                <img class="w-full h-48 object-cover" src="${imageUrl}" alt="${article.title}">
              </a>
              <div class="p-6">
                <h2 class="text-xl font-semibold mb-2 line-clamp-2 dark:text-white">${article.title}</h2>
                ${article.description ? `<p class="text-gray-700 text-base line-clamp-3 dark:text-gray-400">${truncateText(article.description, 150)}</p>` : ''}
              </div>
            </div>
            `;

                    // Add the HTML for the article to the newsHTML variable
                    newsHTML += articleElement;
                }

                // Set the news container content to the complete newsHTML
                newsContainer.innerHTML = newsHTML;

                // Hide the loading GIF after the news is loaded
                hideLoadingGif();
            } else {
                // Handle error loading news
                console.error('Error loading news:', data.message);
                newsContainer.innerHTML = '<p class="text-red-500">Error loading news.</p>';
                hideLoadingGif();
            }
        })
        // Handle general fetch error
        .catch(error => {
            console.error('Request error:', error);
            newsContainer.innerHTML = '<p class="text-red-500">Error loading news.</p>';
            hideLoadingGif();
        });
});
