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

// Function to check if the selected card forms a valid play
function isValidPlay(selectedCard, lastPlayedCard) {
  // Check if a card is selected and if it is higher than the last played card
  if (!selectedCard || !lastPlayedCard) {
    return false; // No card selected or no last played card, play is invalid
  }

  // Extract the rank of the selected and last played cards
  const selectedRank = selectedCard.split('of')[0];
  const lastPlayedRank = lastPlayedCard.split('of')[0];

  // Compare the ranks of the selected and last played cards
  const rankOrder = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2'];
  if (rankOrder.indexOf(selectedRank) > rankOrder.indexOf(lastPlayedRank)) {
    return true; // Selected card is higher, play is valid
  } else {
    return false; // Selected card is not higher, play is invalid
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const flipButton = document.getElementById('flipbutton');
  const playButton = document.getElementById('playbutton');
  const cardImages = document.querySelectorAll('.playerhand .card img'); 
  const cardPaths = shuffledCards.map(card => card.src);
  let selectedCardsIndexes = [];
  let currentPlayer = 1;

  const playerTag = document.getElementById('playertag');
  playerTag.textContent = 'Player One';
  playerTag.style.color = 'gold';

  function togglePlayer() {
    // Explicitly set initial player to Player One
    if (currentPlayer === 1) {
      const playerTag = document.getElementById('playertag');
      playerTag.textContent = 'Player One';
      playerTag.style.color = 'gold';
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Toggle between player 1 and player 2
    const playerTag = document.getElementById('playertag'); // Select the element with id "playertag"
    playerTag.textContent = `Player ${currentPlayer}`; // Update player tag text
    if (currentPlayer === 2) {
        playerTag.style.color = '#BC1823'; // Change color to red for player 2
    } else {
        playerTag.style.color = 'gold'; // Keep color gold for player 1
    }
    playerTag.style.fontFamily = 'Arial, sans-serif'; // Change font family
  }

  function loadSelectedCards() {
    selectedCardsIndexes.forEach(index => {
      const selectedCardImage = document.createElement('img');
      selectedCardImage.src = cardPaths[index];
      selectedCardImage.alt = 'Selected Card';
      cardplayed.appendChild(selectedCardImage);
    });
    
    if (selectedCardsIndexes.length === 0) {
      cardplayed.innerText = 'Play a hand to begin';
    } else {
      cardplayed.innerText = ''; 
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
      if (selectedCardsIndexes.length < 5) { 
        if (selectedCardsIndexes.includes(index)) {
          selectedCardsIndexes = selectedCardsIndexes.filter(i => i !== index); 
          img.style.transform = 'translateY(0)'; 
        } else {
          selectedCardsIndexes.push(index); 
          img.style.transform = 'translateY(-10px)'; 
        }
        
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
      clonedCard.classList.remove('selected'); 
      clonedCard.style.marginRight = '5px'; 
      cardplayed.appendChild(clonedCard); 
      selectedCard.style.visibility = 'hidden'; 
    }
  });
  togglePlayer(); // Switch to the next player after playing cards
  });

  // Call togglePlayer() to initialize the current player
  togglePlayer();
});