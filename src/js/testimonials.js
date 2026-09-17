
        const users = await response.json();

        const testimonials =
            users.slice(0, MAX_TESTIMONIALS);

        if (!testimonials.length) {
            throw new Error(
                'Nenhum depoimento encontrado.'
            );
        }

        cardsContainer.innerHTML = '';

        testimonials.forEach((user, index) => {
            cardsContainer.insertAdjacentHTML(
                'beforeend',
                createCardHTML(user, index)
            );
        });

        initCarouselFocus(cardsContainer);

        return true;

    
        console.error(
            'Erro na seção de depoimentos:',
            error
        );

        cardsContainer.innerHTML = `
       
        `;

        return false;
    



/* ===================================================
   CRIAR CARD
=================================================== */

function createCardHTML(user, index) {
    const avatarUrl =
        avatarImages[index] ||
        createFallbackAvatar(user.name);

    const companyName =
        user.company?.name || 'Empresa';

    const catchPhrase =
        user.company?.catchPhrase ||
        'Experiência excelente.';

    const businessDescription =
        user.company?.bs || '';

    const city =
        user.address?.city || 'Brasil';

    return `

    `;
}


/* ===================================================
   AVATAR DE FALLBACK
=================================================== */

function createFallbackAvatar(name) {
    return (
        'https://ui-avatars.com/api/?name=' +
        encodeURIComponent(name) +
        '&size=150'
    );
}


/* ===================================================
   ESCAPAR HTML
=================================================== */

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


/* ===================================================
   CONTROLES DO CARROSSEL
=================================================== */

function initCarouselControls(
    cardsContainer,
    prevBtn,
    nextBtn
) {
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollToCard(
                cardsContainer,
                -1
            );
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollToCard(
                cardsContainer,
                1
            );
        });
    }
}


/* ===================================================
   NAVEGAR ENTRE CARDS
=================================================== */

function scrollToCard(
    cardsContainer,
    direction
) {
    const cards =
        cardsContainer.querySelectorAll(
            '.testimonial-card'
        );

    if (!cards.length) {
        return;
    }

    const currentIndex =
        getClosestCardIndex(cardsContainer);

    let targetIndex =
        currentIndex + direction;

    targetIndex = Math.max(
        0,
        Math.min(
            targetIndex,
            cards.length - 1
        )
    );

    const targetCard =
        cards[targetIndex];

    if (!targetCard) {
        return;
    }

    const containerCenter =
        cardsContainer.clientWidth / 2;

    const cardCenter =
        targetCard.offsetLeft +
        targetCard.offsetWidth / 2;

    const scrollPosition =
        cardCenter - containerCenter;

    cardsContainer.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
    });
}


/* ===================================================
   ENCONTRAR CARD MAIS PRÓXIMO DO CENTRO
=================================================== */

function getClosestCardIndex(cardsContainer) {
    const cards =
        cardsContainer.querySelectorAll(
            '.testimonial-card'
        );

    if (!cards.length) {
        return 0;
    }

    const containerRect =
        cardsContainer.getBoundingClientRect();

    const containerCenter =
        containerRect.left +
        containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
        const cardRect =
            card.getBoundingClientRect();

        const cardCenter =
            cardRect.left +
            cardRect.width / 2;

        const distance =
            Math.abs(
                containerCenter -
                cardCenter
            );

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}


/* ===================================================
   ATUALIZAR CARD ATIVO
=================================================== */

function updateActiveCard(cardsContainer) {
    const cards =
        cardsContainer.querySelectorAll(
            '.testimonial-card'
        );

    if (!cards.length) {
        return;
    }

    const activeIndex =
        getClosestCardIndex(cardsContainer);

    cards.forEach((card, index) => {
        card.classList.toggle(
            'active',
            index === activeIndex
        );
    });
}


/* ===================================================
   INICIALIZAR FOCO DO CARROSSEL
=================================================== */

function initCarouselFocus(cardsContainer) {
    const cards =
        cardsContainer.querySelectorAll(
            '.testimonial-card'
        );

    if (!cards.length) {
        return;
    }

    // Centraliza inicialmente o terceiro card
    if (cards.length >= 3) {
        centerCard(
            cardsContainer,
            cards[2],
            false
        );
    }

    updateActiveCard(cardsContainer);

    // Atualiza o card ativo durante o scroll
    cardsContainer.addEventListener(
        'scroll',
        () => {
            updateActiveCard(cardsContainer);
        },
        {
            passive: true
        }
    );

    // Recalcula o card ativo ao redimensionar
    window.addEventListener(
        'resize',
        () => {
            updateActiveCard(cardsContainer);
        },
        {
            passive: true
        }
    );
}


/* ===================================================
   CENTRALIZAR CARD
=================================================== */

function centerCard(
    cardsContainer,
    card,
    smooth = true
) {
    if (!card) {
        return;
    }

    const containerWidth =
        cardsContainer.clientWidth;

    const cardCenter =
        card.offsetLeft +
        card.offsetWidth / 2;

    const scrollPosition =
        cardCenter -
        containerWidth / 2;

    cardsContainer.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: smooth
            ? 'smooth'
            : 'auto'
    });
}

