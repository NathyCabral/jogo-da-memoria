const cards = [];
let firstCard = null;
let secondCard = null;
let canFlip = true;
let matches = 0;

const emojis = ['😀', '😍', '🎉', '🌟', '🍀', '🐶', '🐱', '🚀', ];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = 'ElasNaTech';


    card.addEventListener('click', () => flipCard(card));

    return card;
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('matched')) return;

    card.classList.add('back');
    card.textContent = card.dataset.emoji;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        canFlip = false;
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches++;

        if (matches === emojis.length) {
            alert('Parabéns, você venceu!');
        }
    } else {
        firstCard.classList.remove('back');
        firstCard.textContent = 'ElasNaTech';
        secondCard.classList.remove('back');
        secondCard.textContent = 'ElasNaTech';
    }

    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function resetGame() {
    const board = document.querySelector('.memory-board');
    board.innerHTML = '';
    cards.length = 0;
    matches = 0;

    const uniquePairs = [...emojis, ...emojis];
    shuffle(uniquePairs);

    uniquePairs.forEach(emoji => cards.push(createCard(emoji)));

    shuffle(cards);

    cards.forEach(card => board.appendChild(card));
}

document.getElementById('resetButton').addEventListener('click', resetGame);

resetGame();
