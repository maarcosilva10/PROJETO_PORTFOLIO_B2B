// ===================================================
// SCRIPT PRINCIPAL
// ===================================================

import { initMenuToggle } from './src/js/nav.js';
import { initTestimonials } from './src/js/testimonials.js';

// ===================================================
// INICIALIZAÇÃO
// ===================================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicializa o menu responsivo
        initMenuToggle();

        // Inicializa os testimonials e aguarda a API
        await initTestimonials();

    } catch (error) {
        console.error(
            'Erro ao inicializar as funcionalidades:',
            error
        );
    }
});