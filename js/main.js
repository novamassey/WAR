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
const startPage = document.querySelector('.start-page');
playerHandCard = document.getElementById('player-play');
computerHandCard = document.getElementById('computer-play');


/*----- event listeners -----*/
playWar.addEventListener('click', play);
startPage.addEventListener('click', removeStartPage);



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
  if (winner !== null) {
   return;
      }else if (playerHand.value > computerHand.value) {
        playerDeck.push(playerHand);
        playerDeck.push(computerHand);
      }else if (playerHand.value < computerHand.value){
        computerDeck.push(playerHand);
        computerDeck.push(computerHand);
      }else{
        war();
  }
  getScore();
  getWinner();
  renderScreen();
};

  
function war(e) {
  playerWarDeck.push(...playerDeck.splice(0, 2));
  computerWarDeck.push(...computerDeck.splice(0, 2));
  //... to not just replace the war deck if war happens again, this will push all cards spliced into the war deck
  randomIndex = Math.floor(Math.random() * playerWarDeck.length);
  playerWarHand = playerWarDeck[randomIndex];
  computerWarHand = computerWarDeck[randomIndex];
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
  if (playerWarDeck.length < 2) {
    playerWarHand = playerWarDeck[0];
    }
  if (computerWarDeck.length < 2) {
    computerWarHand = computerWarDeck[0];
    }
  }
}

function getScore () {
  playerScore = playerDeck.length;
  computerScore = computerDeck.length;
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

function removeStartPage() {
  startPage.classList.add("fade-away");
  setTimeout(function() {
    startPage.remove();
  }, 2000);
}



  function renderScreen() {
    playerHandCard.className = `card xlarge ${playerHand.face}`;
    computerHandCard.className =`card xlarge ${computerHand.face}`;
    document.getElementById('score-p').innerText = `${playerScore}`;
    document.getElementById('score-c').innerText = `${computerScore}`;
  if (winner !== null) {
    document.querySelector('h2').innerText =  `${winner} wins this round of WAR!`;
    document.querySelector('.war').innerText = "";
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