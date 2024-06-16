import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});


document.addEventListener('DOMContentLoaded', () => {
    const apiKeyNews = '08e6626ab5cb47c2a30a50f8a3f0f655';
    const apiKeyPixabay = '44406953-b12875b762946141c88d640e0';
    const newsContainer = document.getElementById('news-container');
    const usedImages = []; // Array para rastrear as imagens usadas

    function truncateText(text, maxLength) {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text; // Retorna o texto original se não precisar truncar
    }

    async function getPixabayImage(query) {
        const queryLimited = query.length > 88 ? query.substring(0, 88) : query; // Limita a 88 caracteres (100 - 12)

        for (let tentativas = 0; tentativas < 2; tentativas++) {
            const searchQuery = tentativas === 0 ? queryLimited : 'technology'; // Tenta primeiro com a query, depois com "technology"
            const response = await fetch(`https://pixabay.com/api/?key=${apiKeyPixabay}&q=${encodeURIComponent(searchQuery)}&image_type=photo`);
            const data = await response.json();

            if (data.hits.length > 0) {
                for (const hit of data.hits) {
                    if (!usedImages.includes(hit.webformatURL)) {
                        usedImages.push(hit.webformatURL);
                        return hit.webformatURL;
                    }
                }
            }
        }

        // Se não encontrar nenhuma imagem, use um placeholder
        return 'https://via.placeholder.com/600x400?text=Imagem+Indispon%C3%ADvel';
    }

    fetch(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKeyNews}`)
        .then(response => response.json())
        .then(async (data) => {
            if (data.status === 'ok') {
                for (const article of data.articles) {
                    const imageUrl = await getPixabayImage(article.title);

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
                    newsContainer.innerHTML += articleElement;
                }
            } else {
                console.error('Error loading news:', data.message);
                newsContainer.innerHTML = '<p class="text-red-500">Error loading news.</p>';
            }
        })
        .catch(error => {
            console.error('Request error:', error);
            newsContainer.innerHTML = '<p class="text-red-500">Error loading news.</p>';
        });

    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Carregar o tema salvo no localStorage, se houver
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.add(savedTheme === 'dark' ? 'theme-dark' : 'theme-light');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('theme-light')) {
            htmlElement.classList.replace('theme-light', 'theme-dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.replace('theme-dark', 'theme-light');
            localStorage.setItem('theme', 'light');
        }
    });

    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0'); // Inicia a animação
        } else {
            backToTopBtn.classList.add('opacity-0', '-translate-y-8'); // "Esconde" com animação
            setTimeout(() => {
                backToTopBtn.classList.add('hidden');
            }, 300); // Esconde após a animação
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});




