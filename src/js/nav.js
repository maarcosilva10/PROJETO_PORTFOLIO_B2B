

export function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Verifica se os elementos existem
    if (!menuToggle || !navMenu) {
        return;
    }

    // ===================================================
    // ESTADO INICIAL
    // ===================================================

    menuToggle.setAttribute('aria-expanded', 'false');

    // ===================================================
    // FUNÇÃO PARA FECHAR O MENU
    // ===================================================

    const closeMenu = () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    // ===================================================
    // ABRIR / FECHAR MENU
    // ===================================================

    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');

        menuToggle.setAttribute(
            'aria-expanded',
            String(isActive)
        );
    });

    // ===================================================
    // FECHAR AO CLICAR NOS LINKS
    // ===================================================

    const navLinks = navMenu.querySelectorAll('.nav-links a');

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // ===================================================
    // FECHAR COM A TECLA ESC
    // ===================================================

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
            menuToggle.focus();
        }
    });
}

