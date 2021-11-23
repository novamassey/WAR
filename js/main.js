/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
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
const playWar = document.querySelector('button');
const warCards = document.querySelectorAll('.war');
playerHandCard = document.getElementById('player-play');
computerHandCard = document.getElementById('computer-play');


/*----- event listeners -----*/
playWar.addEventListener('click', play);


/*----- functions -----*/
initialize();

function initialize() {
  shuffledDeck = getNewShuffledDeck();
  playerDeck = [];
  computerDeck = [];
  playerHand = {};
  computerHand = {};
  playerWarDeck = [];
  computerWarDeck = [];
  playerScore = 0;
  computerScore = 0;
  winner = null;
  deal();
  
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
  console.log('cards', playerHand, computerHand);
  if (winner !== null) {
   return;
      }else if (playerHand.value > computerHand.value) {
        playerDeck.push(playerHand)
        playerDeck.push(computerHand);
        playerScore++;
      }else if (playerHand.value < computerHand.value){
        computerDeck.push(playerHand)
        computerDeck.push(computerHand);
        computerScore++;
      }else{
        console.log('war happend');
        war();
  }
  getWinner();
  console.log(computerDeck);
  renderScreen();
};

  
function war(e) {
  playerWarDeck.push(...playerDeck.splice(0, 2));
  computerWarDeck.push(...computerDeck.splice(0, 2));
  //... to not just replace the war deck if war happens again, this will push all cards spliced into the war deck
  randomIndex = Math.floor(Math.random() * playerWarDeck.length);
   let playerWarHand = playerWarDeck[randomIndex];
  let computerWarHand = computerWarDeck[randomIndex];
  if (playerWarHand.value > computerWarHand.value) {
      playerDeck.push(...playerWarDeck);
      playerDeck.push(...computerWarDeck);
      playerDeck.push(playerHand);
      playerDeck.push(computerHand);
  }else if (playerWarHand.value < computerWarHand.value) {
    computerDeck.push(...computerWarDeck);
    computerDeck.push(...playerWarDeck);
    computerDeck.push(playerHand);
    computerDeck.push(computerHand);
  }else{
   war();
  }
}

function getWinner() {
  if (playerDeck.length >= 51) {
    winner = 'Player';
  }else if (computerDeck <= 51) {
    winner = 'Computer';
  }else{
    winner = null;
  }
};

function toggleClass() {
  playWar.addEventListener
}

 //need to create a class for WAR that shows a screen that fills with as many cards as necessary if mulitple ties happen 
function renderScreen(e) {
  console.log(playerHand);
  document.getElementById('player-play').classList.toggle("back-red", playerHand.face);
  document.getElementById('computer-play').classList.toggle("back-red", computerHand.face);
  document.getElementById('score-p').innerText = `${playerScore}`;
  document.getElementById('score-c').innerText = `${computerScore}`;
  if (winner !== null) {
    document.querySelector('h2').innerText =  `${winner} wins this round of WAR!`;
    }
  // if (playerHand.value === computerHand.value) {
  //   document.querySelector('.game-container').style.height = 0;
  //   document.querySelector('.war-container').style.opacity = 1;
  //   playWar.innerText = "WAR!";
  //   }else {
  //     document.querySelector('.game-container').style.height = max-content;
  //     document.querySelector('.war-container').style.opacity = 0;
      // playWar.innerText = "Play";
   // }
  }










