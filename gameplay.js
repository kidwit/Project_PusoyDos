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

const player1Hand = Array(13).fill(backOfCardPath);


// Function to deal cards to Player 2
function dealPlayer2Hand() {
  const player2Hand = shuffledCards.slice(0, 13); // Take the first 13 cards from the shuffled deck
  shuffledCards.splice(0, 13); // Remove those cards from the deck
  return player2Hand;
}

const player2Hand = Array(13).fill(backOfCardPath);

function isValidPlay(selectedCard, lastPlayedCard) {
  if (!lastPlayedCard || !isFirstHandPlayed) {
    return { isValid: true, errorMessage: null }; // First hand or no last played card, any card can be played
  }

  if (!selectedCard) {
    return { isValid: false, errorMessage: "No card selected" }; // No card selected, play is invalid
  }

  const selectedRank = selectedCard.split('of')[0];
  const lastPlayedRank = lastPlayedCard.split('of')[0];

  const rankOrder = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2'];

  if (rankOrder.indexOf(selectedRank) > rankOrder.indexOf(lastPlayedRank)) {
    return { isValid: true, errorMessage: null }; // Selected card is higher, play is valid
  } else { 
    return { isValid: false, errorMessage: "Selected card is not higher, play is invalid" };
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const flipButton = document.getElementById('flipbutton');
  const playButton = document.getElementById('playbutton');
  const cardImages = document.querySelectorAll('.playerhand .card img'); 
  const cardPaths = shuffledCards.map(card => card.src);
  let selectedCardsIndexes = [];
  let currentPlayer = 2; // Set initial currentPlayer to 2 so that "Player One" is displayed first

  const playerTag = document.getElementById('playertag');
  playerTag.textContent = 'Player One'; // Set initial player tag to Player One
  playerTag.style.color = 'gold'; // Set initial color to gold

  togglePlayer();

  cardImages.forEach(img => {
    img.src = backOfCardPath; // Set the source to the back of the card image path
    img.alt = 'Card';
});

  function loadPlayerHand(hand) {
    cardImages.forEach((img, index) => {
      img.src = hand[index].src;
      img.alt = 'Card';   
    });
   // Update player tag text and color based on currentPlayer
  playerTag.textContent = currentPlayer === 1 ? 'Player One' : 'Player Two';
  playerTag.style.color = currentPlayer === 1 ? 'gold' : '#BC1823';
}  
  function togglePlayer() {
    // Toggle between player 1 and player 2
    currentPlayer = currentPlayer === 1 ? 2 : 1;

     // If it's Player 2's turn, load their hand
  if (currentPlayer === 2) {
    loadPlayerHand(player2Hand);
  } else {
    // If it's not Player 2's turn, load Player One's hand
    loadPlayerHand(player1Hand);
  }
  }
   
  

  // Call togglePlayer() to initialize the current player
  togglePlayer();


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

  // Event listener for the "Reveal the Cards" button
flipButton.addEventListener('click', () => {
  if (currentPlayer === 1) {
    loadPlayerHand(player1Hand); // If it's Player One's turn, reveal Player One's cards
  } else {
    loadPlayerHand(player2Hand); // If it's Player Two's turn, reveal Player Two's cards
  }
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
  if (selectedCardsIndexes.length === 0) {
    togglePlayer();
    return;
  }

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
  togglePlayer();
});

togglePlayer();
});