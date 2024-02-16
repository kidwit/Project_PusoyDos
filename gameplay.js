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
  let selectedCardsIndexes = [];

  function loadSelectedCards() {
    selectedCardsIndexes.forEach(index => {
      const selectedCardImage = document.createElement('img');
      selectedCardImage.src = cardPaths[index];
      selectedCardImage.alt = 'Selected Card';
      cardplayed.appendChild(selectedCardImage);
    });
  
    // Update text content based on selected cards
    if (selectedCardsIndexes.length === 0) {
      cardplayed.innerText = 'Play a hand to begin';
    } else {
      cardplayed.innerText = ''; // Clear text content
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

  // Event listener for selecting cards
  cardImages.forEach((img, index) => {
    img.src = backOfCardPath; 
    img.addEventListener('click', () => {
      if (selectedCardsIndexes.length < 5) { // Limit selection to 5 cards
        if (selectedCardsIndexes.includes(index)) {
          selectedCardsIndexes = selectedCardsIndexes.filter(i => i !== index); // Deselect if already selected
          img.style.transform = 'translateY(0)'; // Reset the transform
        } else {
          selectedCardsIndexes.push(index); // Add index to selected cards
          img.style.transform = 'translateY(-10px)'; // Raise the card slightly
        }
        // Do not load selected cards here
      }
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
  selectedCardsIndexes.forEach(index => {
    const selectedCard = document.querySelector(`.playerhand .card:nth-child(${index + 1})`);
    if (selectedCard) {
      const clonedCard = selectedCard.cloneNode(true);
      clonedCard.classList.remove('selected'); // Remove 'selected' class from cloned card
      clonedCard.style.marginRight = '5px'; // Add margin between cards
      cardplayed.appendChild(clonedCard); // Append cloned card to cardplayed area
      selectedCard.style.visibility = 'hidden'; // Hide selected card in the player's hand
    }
  });
});

});