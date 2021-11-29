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
// const warCards = document.querySelectorAll('.war');
const startPage = document.querySelector('.start-page');
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
      playerScore = playerDeck.length;
    }else{
      computerDeck.push(card);
      computerScore = computerDeck.length;
    }
  });
}

function play(e) {
  playerHand = playerDeck.shift();
  computerHand = computerDeck.shift();
  if (winner !== null) {
   return;
      }else if (playerHand.value > computerHand.value) {
        playerDeck.push(playerHand)
        playerDeck.push(computerHand);
        playerScore = playerDeck.length;
      }else if (playerHand.value < computerHand.value){
        computerDeck.push(playerHand)
        computerDeck.push(computerHand);
        computerScore = computerDeck.length;
      }else{
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
  let playerWarHand = playerWarDeck[randomIndex];
  let computerWarHand = computerWarDeck[randomIndex];
  if (playerWarHand.value > computerWarHand.value) {
      playerDeck.push(...playerWarDeck);
      playerDeck.push(...computerWarDeck);
      playerDeck.push(playerHand);
      playerDeck.push(computerHand);
      playerWarDeck = [];
      computerWarDeck =[];
  }else if (playerWarHand.value < computerWarHand.value) {
    computerDeck.push(...computerWarDeck);
    computerDeck.push(...playerWarDeck);
    computerDeck.push(playerHand);
    computerDeck.push(computerHand);
    playerWarDeck = [];
    computerWarDeck =[];
  }else{
   war();
  }
}

function getWinner() {
  if (playerDeck.length > 51) {
    winner = 'Player';
  }else if (computerDeck < 51) {
    winner = 'Computer';
  }else{
    winner = null;
  }
};

function toggleClass() {
  playWar.addEventListener
}

  function renderScreen() {
    if (winner ===null && playerScore === 0 && computerScore === 0) {
      startPage.addEventListener('click' () =>  
      })
    }
  document.getElementById('player-play').className = `card xlarge ${playerHand.face}`;
  document.getElementById('computer-play').className =`card xlarge ${computerHand.face}`;
  document.getElementById('score-p').innerText = `${playerScore}`;
  document.getElementById('score-c').innerText = `${computerScore}`;
  if (winner !== null) {
    document.querySelector('h2').innerText =  `${winner} wins this round of WAR!`;
    document.querySelector('h1').innerText = "";
    initialize();
    }
  if (playerHand.value === computerHand.value) {
    document.getElementById('player-war').classList.remove("hidden");
    document.getElementById('computer-war').classList.remove("hidden");
    playerHandCard.className = "card xlarge back-red";
    computerHandCard.className = "card xlarge back-red";
    document.querySelector('.war').innerText= "PLAY WAR!";
    playWar.innerText = "WAR";
  }else{
    document.getElementById('player-war').classList.add("hidden");
    document.getElementById('computer-war').classList.add("hidden"); 
    document.querySelector('.war').innerText= "";
    playWar.innerText = "PLAY";
    }
  }