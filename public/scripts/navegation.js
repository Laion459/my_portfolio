document.addEventListener('DOMContentLoaded', function () {
    // Este código será executado após o carregamento completo do DOM do componente.

    // -----------------------------
    // Botão Voltar ao Topo
    // -----------------------------
    const backToTopBtn = document.getElementById('back-to-top-btn'); // Seleciona o botão pelo ID.

    // Adiciona um evento de rolagem à janela.
    window.addEventListener('scroll', () => {
        // Verifica a posição vertical da rolagem.
        if (window.scrollY > 580) {
            // Se a rolagem for maior que 580 pixels, mostra o botão.
            backToTopBtn.classList.remove('hidden', 'opacity-0', '-translate-y-8');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            // Se a rolagem for menor ou igual a 580 pixels, oculta o botão.
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            backToTopBtn.classList.add('opacity-0', '-translate-y-8');
            setTimeout(() => {
                backToTopBtn.classList.add('hidden');
            }, 300); // Aguarda 300 milissegundos antes de adicionar a classe 'hidden'.
        }
    });

    // Adiciona um evento de clique ao botão.
    backToTopBtn.addEventListener('click', () => {
        // Define a duração da rolagem suave (em milissegundos).
        const scrollDuration = 2000;

        // Calcula o passo da rolagem para um efeito suave.
        const scrollStep = -window.scrollY / (scrollDuration / 15);

        // Define um intervalo para rolar a página suavemente.
        const scrollInterval = setInterval(() => {
            // Verifica se a posição de rolagem atual não é zero.
            if (window.scrollY !== 0) {
                // Se não for zero, rola a página verticalmente pelo valor do passo.
                window.scrollBy(0, scrollStep);
            } else {
                // Se for zero (chegou ao topo), limpa o intervalo para parar a rolagem.
                clearInterval(scrollInterval);
            }
        }, 15); // O intervalo é executado a cada 15 milissegundos.

        // Define um tempo limite para garantir que a página role até o topo.
        setTimeout(() => {
            // Rola a página para o topo com comportamento suave.
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, scrollDuration); // O tempo limite é definido para a duração total da rolagem suave.
    });
});
