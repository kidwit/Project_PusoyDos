// Initialize variables
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2'];
const backOfCardPath = 'http://127.0.0.1:3000/images/cardback/backOftheCard.png';
const cards = [];
let shuffledCards = [];
let player1Hand = [];
let player2Hand = [];
let currentPlayer = 1;


// Function to initialize the deck of cards
function initializeDeck() {
  for (let suit of suits) {
    for (let rank of ranks) {
      const cardName = `${rank}of${suit}`;
      const fileName = `images/${cardName}.png`;
      const image = new Image();
      image.src = fileName;
      cards.push(image);
    }
  }
}


// Function to shuffle the deck of cards
function shuffleDeck() {
  shuffledCards = shuffle(cards);
}


// Function to deal cards to Player 1
function dealPlayer1Hand() {
  player1Hand = shuffledCards.slice(0, 13);
  shuffledCards.splice(0, 13);
}


// Function to deal cards to Player 2
function dealPlayer2Hand() {
  player2Hand = shuffledCards.slice(0, 13);
  shuffledCards.splice(0, 13);
}


// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Function to load player hand in background
function loadPlayerHandInBackground(hand, cardImages) {
  cardImages.forEach((img, index) => {
    img.src = backOfCardPath;
    img.alt = 'Card';
  });
}


// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initializeDeck(); // Initialize the deck of cards
  shuffleDeck(); // Shuffle the deck of cards
  dealPlayer1Hand(); // Deal cards to Player 1
  dealPlayer2Hand(); // Deal cards to Player 2


  const flipButton = document.getElementById('flipButton');
  const playButton = document.getElementById('playbutton');
  const cardImages = document.querySelectorAll('.playerhand .card img');
  let selectedCardsIndexes = [];


  // Function to handle flipping cards
  // Event listener for flipping cards
flipButton.addEventListener('click', () => {
  // Determine whose turn it is and load their hand accordingly
  const currentHand = currentPlayer === 1 ? player1Hand : player2Hand;


  // Loop through the card images and set their source to their respective paths
  cardImages.forEach((img, index) => {
    img.src = currentHand[index].src; // Set the source to the card's path
  });
});
// Event listener for selecting cards
cardImages.forEach((img, index) => {
  img.src = backOfCardPath;
  img.setAttribute('data-index', index);
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
 // Event listener for playing cards
playButton.addEventListener('click', () => {
  // Check if any cards are selected
  if (selectedCardsIndexes.length === 0) {
    // Toggle to the next player's turn
    togglePlayer();
    return;
  }


  // If cards are selected, handle playing cards
  selectedCardsIndexes.forEach(index => {
    const selectedCard = currentPlayer === 1 ? player1Hand[index] : player2Hand[index];
    if (selectedCard) {
      const clonedCard = selectedCard.cloneNode(true);
      clonedCard.classList.remove('selected');
      clonedCard.style.marginRight = '5px';
      cardplayed.appendChild(clonedCard);
      // Remove the played card from the player's hand
      if (currentPlayer === 1) {
        player1Hand.splice(index, 1);
      } else {
        player2Hand.splice(index, 1);
      }
    }
  });


  // Clear the selected cards array
  selectedCardsIndexes = [];


  // Toggle to the next player's turn
  togglePlayer();
});
  // Toggle between players
  function togglePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    loadPlayerHandInBackground(currentPlayer === 1 ? player1Hand : player2Hand, cardImages);
    const playerTag = document.getElementById('playertag');
    playerTag.textContent = currentPlayer === 1 ? 'Player One' : 'Player Two';
    playerTag.style.color = currentPlayer === 1 ? 'gold' : '#BC1823';
  }


  // Initialize the game with Player 1's turn
  loadPlayerHandInBackground(player1Hand, cardImages);
  const playerTag = document.getElementById('playertag');
  playerTag.textContent = 'Player One';
  playerTag.style.color = 'gold';
});
