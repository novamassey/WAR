/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
// const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const ranks = ['02', '02', '02', '02', '02', '02', '02', '02', '02', 'J', 'Q', 'K', 'A'];
const cardLookup = {
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14, 
};

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
console.log(masterDeck);
/*----- app's state (variables) -----*/
let shuffledDeck, playerDeck, computerDeck, playerHand, computerHand, playerWarDeck, computerWarDeck, playerScore, computerScore, winner;


/*----- cached element references -----*/
const playGame = document.querySelector('button');
const warCards = document.querySelectorAll('.war');


/*----- event listeners -----*/
playGame.addEventListener('click', play);


/*----- functions -----*/
initialize();

function initialize() {
  shuffledDeck = getNewShuffledDeck();
  playerDeck = [];
  computerDeck = [];
  playerHand = {};
  computerHand = {};
  playerWarDeck = {};
  computerWarDeck = {};
  playerScore = 0;
  computerScore = 0;
  winner = null;
  deal();
  renderScreen ();
}
function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || cardLookup[rank]
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function deal() {
  shuffledDeck.forEach(function(card, index) {
    if(index % 2 === 0){
      playerDeck.push(card);
    }else{
      computerDeck.push(card);
    }
  });
}

function play(e) {
  playerHand = playerDeck.shift();
  computerHand = computerDeck.shift();
      if (playerHand.value === computerHand.value) {
        war();
      }else if (playerHand.value > computerHand.value) {
            playerDeck.push(playerHand);
            playerDeck.push(computerHand);
            playerScore++;
      }else{ 
        computerDeck.push(playerHand);
        computerDeck.push(computerHand);
        computerScore++;
  }
  console.log(playerHand);
  console.log(computerHand);
};

  
function war() {
  playerWarDeck = playerDeck.splice(0, 2);
  computerWarDeck = computerDeck.splice(0, 2);
  randomIndex = Math.floor(Math.random() * (playerWarDeck.length-1));
  playerHand = playerWarDeck[randomIndex];
  computerHand = computerWarDeck[randomIndex];
  let pValue = playerHand.value;
  let cValue = computerHand.value;
  if (pValue > cValue) {
      playerDeck.push(playerHand);
      playerDeck.push(computerHand);
  }else if (pValue < cValue) {
    computerDeck.push(computerHand);
    computerDeck.push(playerHand);
  }else{
   war();
  }
}

function getWinner() {
  if (playerDeck.length === 52) {
    winner = 'Player';
  }else if (computerDeck === 52) {
    winner = 'Computer';
  }else{
    winner = '';
  }
};

 //need to create a class for WAR that shows a screen that fills with as many cards as necessary if mulitple ties happen 
function renderScreen() {
  document.getElementById('score-p').innerText = playerScore;
  document.getElementById('score-c').innerText = computerScore;
  document.getElementById('player-play').classList.add(playerHand.face);
  document.getElementById('computer-play').classList.add(computerHand.face);
  if (winner !== null) {
    document.querySelector('h2').innerText =  `${winner} wins this round of WAR!`;
}
}
  





