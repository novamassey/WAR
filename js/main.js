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
let shuffledDeck, playerDeck, computerDeck, playerHand, computerHand, playerWarDeck, computerWarDeck, playerWarHand, computerWarHand, playerScore, computerScore, winner;


/*----- cached element references -----*/
const playWar = document.querySelector('.play');
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
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || cardLookup[rank]
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
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
  console.log('cards', playerHand, computerHand, playerDeck, computerDeck);
  if (winner !== null) {
   initialize();
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
  renderScreen();
};

  
function war(e) {
  playerWarDeck.push(...playerDeck.splice(0, 2));
  computerWarDeck.push(...computerDeck.splice(0, 2));
  //... to not just replace the war deck if war happens again, this will push all cards spliced into the war deck
  randomIndex = Math.floor(Math.random() * playerWarDeck.length);
  playerWarHand = playerWarDeck[randomIndex]; //e.target.id;
  computerWarHand = computerWarDeck[randomIndex];
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

 
function renderScreen() {
  console.log(playerHand);
  document.getElementById('player-play').className = `card xlarge ${playerHand.face}`;
  document.getElementById('computer-play').className =`card xlarge ${computerHand.face}`;
  document.getElementById('score-p').innerText = `${playerScore}`;
  document.getElementById('score-c').innerText = `${computerScore}`;
  if (winner !== null) {
    document.querySelector('h2').innerText =  `${winner} wins this round of WAR!`;
    }
  // if (playerHand.value === computerHand.value) {
  //   document.querySelector('.game-container').className = "hidden";
  //   document.querySelector('.first-round').classList.remove("hidden");
  // }else if(playerWarDeck.length > 2) {
  //   document.querySelector('.second-round').classList.remove("hidden");
  // }else if (playerWarDecklength > 4) {
  //   document.querySelector('.third-round').classList.remove("hidden");
  // }else if (playerWarDeck.length >= 6) {
  //   document.querySelector('.fourth-round').classList.remove("hidden");
  // }else{
  //     document.querySelector('.game-container').classList.remove("hidden"); 
  //     document.querySelector('.war-container').className.add("hidden");
  //   }
  }










