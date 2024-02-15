const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2'];
const backOfCardPath = 'images/cardback/backOftheCard.png';

const cards = [];
for (let suit of suits) {
  for (let rank of ranks) {
    const cardName = `${rank}of${suit}`;
    const fileName = `images/${cardName}.png`;

    const image = new Image();
    image.src = fileName;

    cards.push(image);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledCards = shuffle(cards);

const cardImages = document.querySelectorAll('.playerhand .card img');
cardImages.forEach((img, index) => {
  img.src = backOfCardPath; 
  img.addEventListener('load', () => {
    console.log(`Image ${index} loaded successfully.`);
  });
  img.addEventListener('error', () => {
    console.error(`Error loading image ${index}.`);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const playerCards = document.querySelectorAll('.playerhand .card');
  
  playerCards.forEach(card => {
      card.addEventListener('click', () => {
          card.classList.toggle('selected');
      });
  });
});
