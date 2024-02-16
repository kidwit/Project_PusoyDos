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

document.addEventListener('DOMContentLoaded', function() {
  const flipButton = document.getElementById('flipbutton');
  const playButton = document.getElementById('playbutton');
  const cardImages = document.querySelectorAll('.playerhand .card img'); 
  const cardPaths = shuffledCards.map(card => card.src);
  let selectedCardIndex = -1;

  function loadSelectedCard() {
    if (selectedCardIndex !== -1) {
      cardplayed.innerHTML = '';
      const selectedCardImage = document.createElement('img');
      selectedCardImage.src = cardPaths[selectedCardIndex];
      selectedCardImage.alt = 'Selected Card';
      selectedCardImage.style.width = '200px'; // Adjust width as needed
      selectedCardImage.style.height = 'auto';
      cardPlayed.appendChild(selectedCardImage);
    }
  }

  let isFaceDown = true; 

  flipButton.addEventListener('click', () => {
    isFaceDown = !isFaceDown; 
    cardImages.forEach((img, index) => {
      if (isFaceDown) {
        img.src = backOfCardPath;
      } else {
        img.src = cardPaths[index];
      }
    });
  });

  cardImages.forEach((img, index) => {
    img.src = backOfCardPath; 
    img.addEventListener('click', () => {
        selectedCardIndex = index;
        loadSelectedCard(); // Load the selected card into the cardplayed box
      });
    });
  
    const playerCards = document.querySelectorAll('.playerhand .card');
    playerCards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
      });
    });
  
  // Event listener for the play button
  playButton.addEventListener('click', () => {
      const selectedCard = document.querySelector('.playerhand .card.selected');
      if (selectedCard) {
          cardplayed.innerHTML = ''; // Clear any existing card in the cardplayed box
          cardplayed.appendChild(selectedCard);
          selectedCard.classList.remove('selected');
      }
  });
});
